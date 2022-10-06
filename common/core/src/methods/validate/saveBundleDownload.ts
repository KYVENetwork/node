import { Node } from "../..";
import { callWithBackoffStrategy, VOTE } from "../../utils";
import BigNumber from "bignumber.js";

/**
 * saveBundleDownload downloads a bundle from the storage provider.
 * The download should be aborted if the pool is not
 * active anymore or a new bundle proposal has been found
 * or the node is the current uploader and the upload interval
 * has passed.
 *
 * If there is an error retrieving the bundle from the storage provider
 * the node instantly votes with abstain and continues to try to retrieve
 * the bundle.
 *
 * @method saveBundleDownload
 * @param {Node} this
 * @param {number} createdAt
 * @return {Promise<Buffer | undefined>}
 */
export async function saveBundleDownload(
  this: Node,
  createdAt: number
): Promise<Buffer | undefined> {
  return await callWithBackoffStrategy(
    async () => {
      await this.syncPoolState();

      const unixNow = new BigNumber(Date.now());
      const unixIntervalEnd = new BigNumber(
        this.pool.bundle_proposal!.created_at
      )
        .plus(this.pool.data!.upload_interval)
        .multipliedBy(1000);

      // check if new proposal is available in the meantime
      if (+this.pool.bundle_proposal!.created_at > createdAt) {
        return;
      }

      // check if pool got inactive in the meantime
      if (this.shouldIdle()) {
        return;
      }

      // check if validator needs to upload
      if (
        this.pool.bundle_proposal!.next_uploader === this.staker &&
        unixNow.gte(unixIntervalEnd)
      ) {
        return;
      }

      // calculate download timeout for storage provider
      // the timeout should always be 20 seconds less than the upload interval
      // so that the node still has enough time to vote abstain when the
      // download timeout is reached
      let downloadTimeoutSec = Math.max(
        0,
        +this.pool.data!.upload_interval - 20
      );

      this.logger.debug(
        `Attempting to download bundle from StorageProvider:${this.storageProvider.name} with a download timeout of ${downloadTimeoutSec}s`
      );

      const storageProviderResult = await this.storageProvider.retrieveBundle(
        this.pool.bundle_proposal!.storage_id,
        downloadTimeoutSec * 1000
      );

      this.m.storage_provider_retrieve_successful.inc();

      this.logger.info(
        `Successfully downloaded bundle of id ${
          this.pool.bundle_proposal!.storage_id
        } from StorageProvider:${this.storageProvider.name}`
      );

      return storageProviderResult;
    },
    { limitTimeoutMs: 5 * 60 * 1000, increaseByMs: 10 * 1000 },
    async (error: any, ctx) => {
      this.logger.debug(
        `Failed to retrieve bundle from StorageProvider:${
          this.storageProvider.name
        }. Retrying in ${(ctx.nextTimeoutInMs / 1000).toFixed(2)}s ...\n`
      );
      this.logger.debug(error);

      this.m.storage_provider_retrieve_failed.inc();

      // vote abstain if bundle could not be retrieved from storage
      // provider. With voting abstain the network knows that the node
      // is still online but just could not vote
      if (!this.pool.bundle_proposal?.voters_abstain.includes(this.staker)) {
        await this.voteBundleProposal(
          this.pool.bundle_proposal!.storage_id,
          VOTE.ABSTAIN
        );
      }
    }
  );
}
