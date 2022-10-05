import { Node } from "..";
import { callWithBackoffStrategy, sleep } from "../utils";

/**
 * canPropose checks if the node is able to propose the next
 * bundle proposal by calling a special chain query called "canPropose".
 * It runs indefinitely until the query returns a valid response
 *
 * @method canPropose
 * @param {Node} this
 * @param {number} createdAt the creation time of the current bundle proposal
 * @return {Promise<boolean>}
 */
export async function canPropose(
  this: Node,
  createdAt: number
): Promise<boolean> {
  try {
    const { possible, reason } = await callWithBackoffStrategy(
      async () => {
        await this.syncPoolState();

        // get the height from where the bundle should get created
        const fromHeight =
          +this.pool.bundle_proposal!.to_height ||
          +this.pool.data!.current_height;

        // abort if staker is the current uploader
        if (this.pool.bundle_proposal!.uploader !== this.staker) {
          return {
            possible: false,
            reason: "Node is not next uploader of this bundle proposal",
          };
        }

        // abort if a new bundle proposal was found
        if (+this.pool.bundle_proposal!.created_at > createdAt) {
          return {
            possible: false,
            reason: "New bundle proposal was found",
          };
        }

        while (true) {
          const canPropose = await this.lcd.kyve.query.v1beta1.canPropose({
            pool_id: this.poolId.toString(),
            staker: this.staker,
            proposer: this.client.account.address,
            from_height: fromHeight.toString(),
          });

          // if query returns an "upload interval not surpassed" that usually
          // means we have to wait for the next block in the blockchain because
          // the chain time only updates on every new block
          if (
            !canPropose.possible &&
            canPropose.reason.endsWith("upload interval not surpassed")
          ) {
            await sleep(1000);
            continue;
          }

          return canPropose;
        }
      },
      { limitTimeoutMs: 5 * 60 * 1000, increaseByMs: 10 * 1000 },
      async (error: any, ctx) => {
        this.logger.debug(
          `Failed to request canPropose. Retrying in ${(
            ctx.nextTimeoutInMs / 1000
          ).toFixed(2)}s ...`
        );
        this.logger.debug(error?.response ?? error);
        this.prom.query_can_propose_failed.inc();
      }
    );

    this.prom.query_can_propose_successful.inc();

    if (possible) {
      this.logger.info(`Node is able to propose a new bundle proposal\n`);
      return true;
    } else {
      this.logger.info(`Skipping proposal. Reason: ${reason}\n`);
      return false;
    }
  } catch (error) {
    this.logger.error(`Failed to call canPropose. Exiting ...`);
    this.logger.debug(error);

    process.exit(1);
  }
}
