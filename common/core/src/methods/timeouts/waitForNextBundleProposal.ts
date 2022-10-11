import { Node } from "../..";
import { REFRESH_TIME, sleep } from "../../utils";

/**
 * waitForNextBundleProposal waits until the the next bundle proposal has
 * been submitted. It waits because the node has performed all actions
 * in this round and is done. The node checks that by comparing the
 * creation time of the proposal, if it is bigger than the current one
 * the node knows someone submitted a new proposal.
 *
 * @method waitForNextBundleProposal
 * @param {Node} this
 * @param {number} updatedAt
 * @return {Promise<void>}
 */
export async function waitForNextBundleProposal(
  this: Node,
  updatedAt: number
): Promise<void> {
  try {
    this.logger.info("Waiting for new bundle to be proposed");

    // track waiting time for metrics
    const endTimeNextBundleProposal =
      this.m.bundles_wait_for_next_round_time.startTimer();

    // continue if the creation time of the bundle proposal increased
    while (+this.pool.bundle_proposal!.updated_at <= updatedAt) {
      await this.syncPoolState();

      // if pool got not active in the meantime abort
      if (this.validateIsPoolActive()) {
        break;
      }

      await sleep(REFRESH_TIME);
    }

    endTimeNextBundleProposal();

    this.logger.info(`Found new bundle proposal. Starting new round ...\n`);
  } catch (error) {
    this.logger.error(`Failed to wait for next bundle proposal. Exiting ...`);
    this.logger.debug(error);

    process.exit(1);
  }
}
