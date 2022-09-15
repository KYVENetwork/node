import { PoolStatus } from "@kyve/proto/dist/proto-res/kyve/pool/v1beta1/pool";
import { Node } from "..";

export function shouldIdle(this: Node): boolean {
  switch (this.pool.status as PoolStatus) {
    case PoolStatus.POOL_STATUS_ACTIVE:
      return false;
    case PoolStatus.POOL_STATUS_PAUSED:
      this.logger.info(
        "Pool is paused. Waiting for pool being unpaused. Idling ..."
      );
      return true;
    case PoolStatus.POOL_STATUS_NO_FUNDS:
      this.logger.info(
        "Pool is out of funds. Waiting for additional funds. Idling ..."
      );
      return true;
    case PoolStatus.POOL_STATUS_NOT_ENOUGH_STAKE:
      this.logger.info(
        "Not enough delegation in pool. Waiting for additional delegation. Idling ..."
      );
      return true;
    case PoolStatus.POOL_STATUS_UPGRADING:
      this.logger.info(
        "Pool is currently upgrading. Waiting for upgrade being applied. Idling ..."
      );
      return true;
    case PoolStatus.POOL_STATUS_UNSPECIFIED:
      this.logger.info("Pool status is currently unspecified. Idling ...");
      return true;
    default:
      this.logger.info("Pool status is currently unknown. Idling ...");
      return true;
  }
}
