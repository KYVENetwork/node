import { Node } from "..";

// tries to claim the uploader role for the next bundle proposal
// round. If successfully claimed it returns true, otherwise it will
// return false. Additionally metrics are tracked.
export async function claimUploaderRole(this: Node): Promise<boolean> {
  // check if next uploader is free to claim
  if (this.pool.bundle_proposal!.next_uploader) {
    return false;
  }

  try {
    this.logger.debug(`Attempting to claim uploader role`);

    const tx = await this.client.kyve.bundles.v1beta1.claimUploaderRole({
      staker: this.staker,
      pool_id: this.poolId.toString(),
    });

    this.logger.debug(`ClaimUploaderRole = ${tx.txHash}`);

    const receipt = await tx.execute();

    if (receipt.code === 0) {
      this.logger.info(`Successfully claimed uploader role\n`);
      this.prom.tx_claim_uploader_role_successful.inc();

      return true;
    } else {
      this.logger.info(`Could not claim uploader role. Continuing ...\n`);
      this.prom.tx_claim_uploader_role_unsuccessful.inc();

      return false;
    }
  } catch (error) {
    this.logger.warn(" Failed to claim uploader role. Continuing ...\n");
    this.logger.debug(error);
    this.prom.tx_claim_uploader_role_failed.inc();

    return false;
  }
}
