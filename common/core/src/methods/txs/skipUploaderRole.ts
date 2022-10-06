import { Node } from "../..";

/**
 * skipUploaderRole is called by the current next uploader of the
 * current bundle proposal and is called when the node is not able
 * to create a valid bundle proposal. This can be due to not having
 * enough data collected or the storage provider being offline for
 * some reason.
 *
 * The fromHeight of the current bundle proposal is
 * included so that the chain can check if the next uploader
 * still wants to skip his role on his specified proposal,
 * because in rare instances while the tx is mining the next
 * proposal can start, thus resulting in an unwanted skip.
 *
 * @method skipUploaderRole
 * @param {Node} this
 * @param {number} fromHeight
 * @return {Promise<boolean>}
 */
export async function skipUploaderRole(
  this: Node,
  fromHeight: number
): Promise<boolean> {
  try {
    this.logger.debug(`Attempting to skip uploader role`);

    const tx = await this.client.kyve.bundles.v1beta1.skipUploaderRole({
      staker: this.staker,
      pool_id: this.poolId.toString(),
      from_height: fromHeight.toString(),
    });

    this.logger.debug(`SkipUploaderRole = ${tx.txHash}`);

    const receipt = await tx.execute();

    if (receipt.code === 0) {
      this.logger.info(`Successfully skipped uploader role\n`);
      this.m.tx_skip_uploader_role_successful.inc();

      return true;
    } else {
      this.logger.info(`Could not skip uploader role. Continuing ...\n`);
      this.m.tx_skip_uploader_role_unsuccessful.inc();

      return false;
    }
  } catch (error) {
    this.logger.warn(" Failed to skip uploader role. Continuing ...\n");
    this.logger.debug(error);
    this.m.tx_skip_uploader_role_failed.inc();

    return false;
  }
}
