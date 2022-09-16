import { Node } from "..";

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

      if (this.metrics) {
        this.metricsTotalSuccessfulTxs.inc();
      }

      return true;
    } else {
      this.logger.info(`Could not claim uploader role. Continuing ...\n`);

      if (this.metrics) {
        this.metricsTotalUnsuccessfulTxs.inc();
      }

      return false;
    }
  } catch (error) {
    this.logger.warn(" Failed to claim uploader role. Continuing ...\n");
    this.logger.debug(error);

    if (this.metrics) {
      this.metricsTotalFailedTxs.inc();
    }

    return false;
  }
}
