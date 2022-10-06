import { Node } from "../..";

/**
 * claimUploaderRole tries to claim the uploader role for the next bundle proposal
 * round. If successfully claimed it returns true, otherwise it will
 * return false. The claim is only successful if there is currently no next
 * uploader on the bundle proposal, otherwise if already claimed by another
 * node the tx will just be ignored.
 *
 * @method claimUploaderRole
 * @param {Node} this
 * @return {Promise<boolean>}
 */
export async function claimUploaderRole(this: Node): Promise<boolean> {
  try {
    // if next uploader is already defined abort
    if (this.pool.bundle_proposal!.next_uploader) {
      return false;
    }

    this.logger.debug(`Attempting to claim uploader role`);

    const tx = await this.client.kyve.bundles.v1beta1.claimUploaderRole({
      staker: this.staker,
      pool_id: this.poolId.toString(),
    });

    this.logger.debug(`ClaimUploaderRole = ${tx.txHash}`);

    const receipt = await tx.execute();

    if (receipt.code === 0) {
      this.logger.info(`Successfully claimed uploader role\n`);
      this.m.tx_claim_uploader_role_successful.inc();

      return true;
    } else {
      this.logger.info(`Could not claim uploader role. Continuing ...\n`);
      this.m.tx_claim_uploader_role_unsuccessful.inc();

      return false;
    }
  } catch (error) {
    this.logger.warn(" Failed to claim uploader role. Continuing ...\n");
    this.logger.debug(error);
    this.m.tx_claim_uploader_role_failed.inc();

    return false;
  }
}
