import { Node } from "..";
import { ERROR_IDLE_TIME, sleep } from "../utils";

export async function submitBundleProposal(
  this: Node,
  storageId: string,
  byteSize: number,
  fromHeight: number,
  toHeight: number,
  fromKey: string,
  toKey: string,
  toValue: string,
  bundleHash: string
): Promise<boolean> {
  try {
    this.logger.debug(`Attempting to submit bundle proposal`);

    const tx = await this.client.kyve.bundles.v1beta1.submitBundleProposal({
      staker: this.staker,
      pool_id: this.poolId.toString(),
      storage_id: storageId,
      byte_size: byteSize.toString(),
      from_height: fromHeight.toString(),
      to_height: toHeight.toString(),
      from_key: fromKey,
      to_key: toKey,
      to_value: toValue,
      bundle_hash: bundleHash,
    });

    this.logger.debug(`SubmitBundleProposal = ${tx.txHash}`);

    const receipt = await tx.execute();

    if (receipt.code === 0) {
      this.logger.info(
        `Successfully submitted bundle proposal with Storage Id "${storageId}"\n`
      );
      this.prom.tx_submit_bundle_proposal_successful.inc();
      this.prom.bundles_proposed.inc();

      this.prom.bundles_amount.setToCurrentTime();
      this.prom.bundles_data_items.set(toHeight - fromHeight);
      this.prom.bundles_byte_size.set(byteSize);

      return true;
    } else {
      this.logger.info(
        `Could not submit bundle proposal. Continuing in 10s ...\n`
      );
      this.prom.tx_submit_bundle_proposal_unsuccessful.inc();

      await sleep(ERROR_IDLE_TIME);

      return false;
    }
  } catch (error) {
    this.logger.warn(
      " Failed to submit bundle proposal. Continuing in 10s ...\n"
    );
    this.logger.debug(error);
    this.prom.tx_submit_bundle_proposal_failed.inc();

    await sleep(ERROR_IDLE_TIME);

    return false;
  }
}
