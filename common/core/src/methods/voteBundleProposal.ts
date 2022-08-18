import { Node } from "..";

export async function voteBundleProposal(
  this: Node,
  storageId: string,
  vote: number
): Promise<void> {
  try {
    let voteMessage = "";

    if (vote === 1) {
      voteMessage = "valid";
    } else if (vote === 2) {
      voteMessage = "invalid";
    } else if (vote === 3) {
      voteMessage = "abstain";
    } else {
      throw Error(`Invalid vote: ${vote}`);
    }

    this.logger.debug(`Attempting to vote ${voteMessage} on bundle proposal`);

    const tx = await this.client.kyve.v1beta1.bundles.voteBundleProposal({
      staker: this.staker,
      pool_id: this.poolId.toString(),
      storage_id: storageId,
      vote,
    });

    this.logger.debug(`VoteProposal = ${tx.txHash}`);

    const receipt = await tx.execute();

    if (receipt.code === 0) {
      this.logger.info(`Voted ${voteMessage} on bundle "${storageId}"\n`);
    } else {
      this.logger.info(`Could not vote on proposal. Continuing ...\n`);
    }
  } catch (error) {
    this.logger.warn(" Failed to vote. Continuing ...\n");
    this.logger.debug(error);
  }
}
