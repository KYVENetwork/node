import { ERROR_IDLE_TIME, Node, sleep } from "..";

// TODO: idle here if canVote can not be called
export async function canVote(this: Node, createdAt: number): Promise<boolean> {
  while (true) {
    await this.syncPoolState();

    if (+this.pool.bundle_proposal!.created_at > createdAt) {
      return false;
    }

    if (!this.pool.bundle_proposal!.uploader) {
      this.logger.info(
        `Skipping vote. Reason: Node can not vote on empty bundle\n`
      );
      return false;
    }

    if (this.pool.bundle_proposal!.uploader === this.staker) {
      return false;
    }

    try {
      const { possible, reason } = await this.lcd.kyve.query.v1beta1.canVote({
        pool_id: this.poolId.toString(),
        staker: this.staker,
        voter: this.client.account.address,
        storage_id: this.pool.bundle_proposal!.storage_id,
      });

      this.prom.query_can_vote_successful.inc();

      if (possible) {
        this.logger.info(`Node is able to vote on bundle proposal\n`);
        return true;
      } else {
        this.logger.info(`Skipping vote. Reason: ${reason}\n`);
        return false;
      }
    } catch (error) {
      this.logger.warn(
        ` Failed to request can_vote query. Retrying in 10s ...\n`
      );
      this.logger.debug(error);
      this.prom.query_can_vote_failed.inc();

      await sleep(ERROR_IDLE_TIME);
    }
  }
}
