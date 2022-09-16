import { Node } from "..";
import { ERROR_IDLE_TIME, sleep } from "../utils";

export async function skipUploaderRole(
  this: Node,
  fromHeight: number
): Promise<void> {
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
    } else {
      this.logger.info(`Could not skip uploader role. Continuing in 10s ...\n`);

      await sleep(ERROR_IDLE_TIME);
    }
  } catch (error) {
    this.logger.warn(" Failed to skip uploader role. Continuing in 10s ...\n");
    this.logger.debug(error);

    await sleep(ERROR_IDLE_TIME);
  }
}
