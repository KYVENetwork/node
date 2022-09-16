import { Node } from "..";
import { REFRESH_TIME, sleep } from "../utils";

export async function waitForNextBundleProposal(
  this: Node,
  createdAt: number
): Promise<void> {
  return new Promise(async (resolve) => {
    this.logger.info("Waiting for new bundle to be proposed");

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

    this.logger.info(`Found new bundle proposal. Starting new round ...\n`);

    resolve();
  });
}
