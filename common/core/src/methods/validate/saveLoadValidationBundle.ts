import { Node } from "../..";
import BigNumber from "bignumber.js";
import { callWithBackoffStrategy, VOTE } from "../../utils";
import { DataItem } from "../../types";

/**
 * saveLoadValidationBundle loads the bundle from the local
 * cache for validation with the proposed bundle. If there is
 * an error loading the bundle from cache the node instantly votes
 * with abstain and continues to try to load the bundle
 *
 * @method saveLoadValidationBundle
 * @param {Node} this
 * @param {number} updatedAt
 * @return {Promise<DataItem[] | undefined>}
 */
export async function saveLoadValidationBundle(
  this: Node,
  updatedAt: number
): Promise<DataItem[] | undefined> {
  return await callWithBackoffStrategy(
    async () => {
      await this.syncPoolState();

      const unixNow = new BigNumber(Date.now());
      const unixIntervalEnd = new BigNumber(
        this.pool.bundle_proposal!.updated_at
      )
        .plus(this.pool.data!.upload_interval)
        .multipliedBy(1000);

      // check if new proposal is available in the meantime
      if (+this.pool.bundle_proposal!.updated_at > updatedAt) {
        return;
      }

      // check if pool got inactive in the meantime
      if (this.validateIsPoolActive()) {
        return;
      }

      // check if validator needs to upload
      if (
        this.pool.bundle_proposal!.next_uploader === this.staker &&
        unixNow.gte(unixIntervalEnd)
      ) {
        return;
      }

      // load bundle from current pool current index to proposed index
      const proposalStartIndex = parseInt(this.pool.data!.current_index);
      const proposalTargetIndex =
        proposalStartIndex + parseInt(this.pool.bundle_proposal!.bundle_size);

      // attempt to load bundle from cache
      const bundle: DataItem[] = [];

      // in order to get the same bundle for validation as the one
      // proposed the bundle is loaded with the proposed heights
      for (let i = proposalStartIndex; i < proposalTargetIndex; i++) {
        try {
          // try to get the data item from local cache
          const item = await this.cache.get(i.toString());
          bundle.push(item);
        } catch {
          // if a request data item can not be found abort and
          // try again after a backoff time
          throw new Error(
            `Requested bundle could not be loaded from cache yet.`
          );
        }
      }

      this.logger.info(
        `Successfully loaded validation bundle from Cache:${this.cache.name}`
      );

      return bundle;
    },
    { limitTimeoutMs: 5 * 60 * 1000, increaseByMs: 10 * 1000 },
    async (error: any, ctx) => {
      this.logger.debug(
        `Failed to load validation bundle from Cache:${
          this.cache.name
        }. Retrying in ${(ctx.nextTimeoutInMs / 1000).toFixed(2)}s ...\n`
      );
      this.logger.debug(error);

      // vote abstain if validation bundle could not be loaded from cache.
      // With voting abstain the network knows that the node
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
