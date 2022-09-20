import { Node } from "..";
import { IDLE_TIME, sleep } from "../utils";

export async function runNode(this: Node): Promise<void> {
  let roundTimeEnd = null;

  while (this.continueBundleProposalRound()) {
    // record round time
    if (roundTimeEnd) {
      roundTimeEnd();
    }

    roundTimeEnd = this.prom.bundles_round_time.startTimer();

    await this.syncPoolState();

    const createdAt = +this.pool.bundle_proposal!.created_at;

    this.validateRuntime();
    this.validateVersion();
    this.validateActiveNode();

    if (this.shouldIdle()) {
      await sleep(IDLE_TIME);
      continue;
    }

    if (await this.claimUploaderRole()) {
      await this.syncPoolState();
    }

    if (this.pool.bundle_proposal!.next_uploader === this.staker) {
      this.logger.info(
        `Starting bundle proposal round ${
          this.pool.data!.total_bundles
        } as UPLOADER`
      );
    } else {
      this.logger.info(
        `Starting bundle proposal round ${
          this.pool.data!.total_bundles
        } as VALIDATOR`
      );
    }

    if (await this.canVote(createdAt)) {
      await this.validateBundleProposal(createdAt);
    }

    const timeRemaining = this.remainingUploadInterval();

    this.logger.debug(
      `Waiting for remaining upload interval = ${timeRemaining
        .dividedBy(1000)
        .toFixed(2)}s ...`
    );

    // sleep until upload interval is reached
    await sleep(timeRemaining.toNumber());

    this.logger.debug(`Reached upload interval of current bundle proposal`);

    if (await this.canPropose(createdAt)) {
      await this.proposeBundle(createdAt);
    }

    const waitTime = this.prom.bundles_wait_for_next_round_time.startTimer();
    await this.waitForNextBundleProposal(createdAt);
    waitTime();
  }
}
