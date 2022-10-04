import BigNumber from "bignumber.js";
import { Node } from "..";
import { sleep } from "../utils";

export async function waitForUploadInterval(this: Node): Promise<void> {
  // determine how long the proposal round is still taking
  // wait the remaining time
  let timeRemaining = new BigNumber(0);

  const unixNow = new BigNumber(Date.now());
  const unixIntervalEnd = new BigNumber(this.pool.bundle_proposal!.created_at)
    .plus(this.pool.data!.upload_interval)
    .multipliedBy(1000);

  if (unixNow.lt(unixIntervalEnd)) {
    timeRemaining = unixIntervalEnd.minus(unixNow);
  }

  this.logger.debug(
    `Waiting for remaining upload interval = ${timeRemaining
      .dividedBy(1000)
      .toFixed(2)}s ...`
  );

  // further track remaining waiting time for metrics
  const endTimeRemaining =
    this.prom.bundles_remaining_upload_interval_time.startTimer();

  await sleep(timeRemaining.toNumber());

  endTimeRemaining();

  this.logger.debug(`Reached upload interval of current bundle proposal`);
}
