import { Node } from "..";
import { REFRESH_TIME, sleep } from "../utils";

export async function waitForNextBundleProposal(
  this: Node,
  createdAt: number
): Promise<void> {
  return new Promise(async (resolve) => {
    this.logger.info("Waiting for new bundle to be proposed");

    // track waiting time for metrics
    const endTimeNextBundleProposal =
      this.prom.bundles_wait_for_next_round_time.startTimer();

    while (true) {
      await this.syncPoolState();

      // check if new proposal is available in the meantime
      if (+this.pool.bundle_proposal!.created_at > createdAt) {
        break;
      } else if (this.shouldIdle()) {
        break;
      } else {
        await sleep(REFRESH_TIME);
      }
    }

    endTimeNextBundleProposal();

    this.logger.info(`Found new bundle proposal. Starting new round ...\n`);

    resolve();
  });
}
