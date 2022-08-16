import BigNumber from "bignumber.js";
import { Node } from "..";

export function shouldIdle(this: Node): boolean {
  // check if pool is upgrading
  if (
    +this.pool.upgrade_plan!.scheduled_at > 0 &&
    Math.floor(Date.now() / 1000) >= +this.pool.upgrade_plan!.scheduled_at
  ) {
    this.logger.info("Pool is upgrading. Idling ...");
    return true;
  }

  // check if pool is paused
  if (this.pool.paused) {
    this.logger.info("Pool is paused. Idling ...");
    return true;
  }

  // check if enough stake in pool
  if (new BigNumber(this.pool.total_stake).lt(this.pool.min_stake)) {
    this.logger.info(
      "Not enough stake in pool. Waiting for additional stakes. Idling ..."
    );
    return true;
  }

  // check if pool is funded
  if (new BigNumber(this.pool.total_funds).isZero()) {
    this.logger.info(
      "Pool is out of funds. Waiting for additional funds. Idling ..."
    );
    return true;
  }

  return false;
}
