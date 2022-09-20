import { Node } from "..";
import { ERROR_IDLE_TIME, sleep } from "../utils";

export async function canPropose(
  this: Node,
  createdAt: number
): Promise<boolean> {
  while (true) {
    await this.syncPoolState();

    if (+this.pool.bundle_proposal!.created_at > createdAt) {
      return false;
    }

    if (this.pool.bundle_proposal!.next_uploader !== this.staker) {
      return false;
    }

    try {
      const fromHeight =
        +this.pool.bundle_proposal!.to_height ||
        +this.pool.data!.current_height;

      const { possible, reason } = await this.lcd.kyve.query.v1beta1.canPropose(
        {
          pool_id: this.poolId.toString(),
          staker: this.staker,
          proposer: this.client.account.address,
          from_height: fromHeight.toString(),
        }
      );

      this.prom.query_can_propose_successful.inc();

      if (possible) {
        this.logger.info(`Node is able to propose a new bundle\n`);
        return true;
      } else if (reason.endsWith("upload interval not surpassed")) {
        await sleep(1000);
        continue;
      } else {
        this.logger.info(`Skipping upload. Reason: ${reason}\n`);
        return false;
      }
    } catch (error: any) {
      this.logger.warn(
        ` Failed to request can_propose query. Retrying in 10s ...\n`
      );
      this.logger.debug(error?.response ?? error);
      this.prom.query_can_propose_failed.inc();

      await sleep(ERROR_IDLE_TIME);
    }
  }
}
