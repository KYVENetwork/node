import { Node } from "../..";

/**
 * submitBundleProposal submits a bundle proposal to the
 * network. By submitting a new bundle proposal the current
 * one gets finalized and the next uploader is automatically
 * chosen.
 *
 * @method submitBundleProposal
 * @param {Node} this
 * @param {string} storageId the storage id of the data stored in storage provider
 * @param {number} byteSize the raw byte size of the data stored in storage provider
 * @param {number} fromHeight the height from where the bundle was created
 * @param {number} toHeight the height to the bundle was created
 * @param {string} fromKey the current key the bundle got create from
 * @param {string} toKey the key of the last data item in the bundle
 * @param {string} toValue the formatted value of the last data item in the bundle
 * @param {string} bundleHash the sha256 hash of the raw data stored in storage provider
 * @return {Promise<boolean>}
 */
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
      this.m.tx_submit_bundle_proposal_successful.inc();
      this.m.bundles_proposed.inc();

      this.m.bundles_amount.inc();
      this.m.bundles_data_items.set(toHeight - fromHeight);
      this.m.bundles_byte_size.set(byteSize);

      return true;
    } else {
      this.logger.info(`Could not submit bundle proposal. Continuing ...\n`);
      this.m.tx_submit_bundle_proposal_unsuccessful.inc();

      return false;
    }
  } catch (error) {
    this.logger.warn(" Failed to submit bundle proposal. Continuing ...\n");
    this.logger.debug(error);
    this.m.tx_submit_bundle_proposal_failed.inc();

    return false;
  }
}
