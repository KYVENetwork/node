import { Node } from "..";
import { callWithBackoffStrategy, sleep } from "../utils";

export async function canValidate(this: Node): Promise<void> {
  while (true) {
    const canValidate = await callWithBackoffStrategy(
      async () => {
        // TODO: call canValidate once implemented
        return await this.query.kyve.registry.v1beta1.canVote({
          pool_id: this.poolId.toString(),
          voter: "",
          storage_id: "",
        });
      },
      { limitTimeout: "5m", increaseBy: "10s" },
      (error, ctx) => {
        this.logger.info(
          `Failed to fetch canValidate. Retrying in ${(
            ctx.nextTimeoutInMs / 1000
          ).toFixed(2)}s ...`
        );
        this.logger.debug(error);
      }
    );

    if (canValidate.possible) {
      this.staker = canValidate.reason;
      break;
    } else {
      // log join pool credentials
      this.logger.info(
        `Valaccount ${this.account} has not joined the pool with id ${this.poolId} yet.`
      );
      this.logger.info(
        `Visit https://app.kyve.network/#/pools/${this.poolId} and add join the pool with the following information:\n`
      );

      this.logger.info(`Valaddress:    ${this.client.account.address}`);
      this.logger.info(`Valname:       ${this.name}\n`);

      await sleep(60 * 1000);
    }
  }
}
