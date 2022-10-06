import { Node } from "..";
import { callWithBackoffStrategy } from "../utils";

/**
 * syncPoolState fetches the state of the pool the node is running on.
 * The query gets called with a backoff strategy which increases by
 * 10 seconds with every failed call.
 * This method will run indefinitely if the query fails all the time
 * because without the newest state the node can't continue.
 *
 * @method syncPoolState
 * @param {Node} this
 * @return {Promise<void>}
 */
export async function syncPoolState(this: Node): Promise<void> {
  await callWithBackoffStrategy(
    async () => {
      const { pool } = await this.lcd.kyve.query.v1beta1.pool({
        id: this.poolId.toString(),
      });
      this.pool = pool!;

      this.m.query_pool_successful.inc();

      try {
        this.poolConfig = JSON.parse(this.pool.data!.config);
      } catch (error) {
        this.logger.debug(
          `Failed to parse the pool config: ${this.pool.data?.config}`
        );
        this.poolConfig = {};
      }
    },
    { limitTimeoutMs: 5 * 60 * 1000, increaseByMs: 10 * 1000 },
    (error: any, ctx) => {
      this.logger.debug(
        `Failed to sync pool state. Retrying in ${(
          ctx.nextTimeoutInMs / 1000
        ).toFixed(2)}s ...`
      );

      this.logger.debug(error?.response ?? error);
      this.m.query_pool_failed.inc();
    }
  );
}
