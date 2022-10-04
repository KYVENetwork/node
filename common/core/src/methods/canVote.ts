import { callWithBackoffStrategy, ERROR_IDLE_TIME, Node, sleep } from "..";

/**
 * canVote checks if the node is able to vote on the current
 * bundle proposal by calling a special chain query called "canVote".
 * It runs indefinitely until the query returns a valid response
 *
 * @method canVote
 * @param {Node} this
 * @param {number} createdAt the creation time of the current bundle proposal
 * @return {Promise<boolean>}
 */
export async function canVote(this: Node, createdAt: number): Promise<boolean> {
  try {
    const { possible, reason } = await callWithBackoffStrategy(
      async () => {
        await this.syncPoolState();

        // abort if staker is the current uploader
        if (this.pool.bundle_proposal!.uploader === this.staker) {
          return {
            possible: false,
            reason: "Node is uploader of this bundle proposal",
          };
        }

        // abort if bundle proposal is empty
        if (!this.pool.bundle_proposal!.storage_id) {
          return {
            possible: false,
            reason: "Current bundle proposal is empty",
          };
        }

        // abort if a new bundle proposal was found
        if (+this.pool.bundle_proposal!.created_at > createdAt) {
          return {
            possible: false,
            reason: "New bundle proposal was found",
          };
        }

        return await this.lcd.kyve.query.v1beta1.canVote({
          pool_id: this.poolId.toString(),
          staker: this.staker,
          voter: this.client.account.address,
          storage_id: this.pool.bundle_proposal!.storage_id,
        });
      },
      { limitTimeoutMs: 5 * 60 * 1000, increaseByMs: 10 * 1000 },
      async (error: any, ctx) => {
        this.logger.debug(
          `Failed to request canVote. Retrying in ${(
            ctx.nextTimeoutInMs / 1000
          ).toFixed(2)}s ...`
        );
        this.logger.debug(error?.response ?? error);
        this.prom.query_can_vote_failed.inc();
      }
    );

    this.prom.query_can_vote_successful.inc();

    if (possible) {
      this.logger.info(`Node is able to vote on bundle proposal\n`);
      return true;
    } else {
      this.logger.info(`Skipping vote. Reason: ${reason}\n`);
      return false;
    }
  } catch (error) {
    this.logger.error(`Failed to call canVote. Exiting ...`);
    this.logger.debug(error);

    process.exit(1);
  }
}
