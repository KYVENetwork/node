import { Node } from "..";
import {
  callWithBackoffStrategy,
  ERROR_IDLE_TIME,
  REFRESH_TIME,
  sleep,
} from "../utils";

export async function canValidate(this: Node): Promise<void> {
  const canValidate = await callWithBackoffStrategy(
    async () => {
      return await this.lcd.kyve.query.v1beta1.canValidate({
        pool_id: this.poolId.toString(),
        valaddress: this.client.account.address,
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
    return;
  } else {
    // log join pool credentials
    this.logger.info(
      `Valaccount ${this.account} has not joined the pool with id ${this.poolId} yet`
    );
    this.logger.info(
      `Visit https://app.kyve.network/#/pools/${this.poolId} and add join the pool with the following information:\n`
    );

    this.logger.info(`Valaddress:    ${this.client.account.address}`);
    this.logger.info(`Valname:       ${this.name}\n`);

    this.logger.info(
      `The node will not continue until the account is authorized`
    );

    await sleep(REFRESH_TIME);
  }

  while (true) {
    const canValidate = await callWithBackoffStrategy(
      async () => {
        return await this.lcd.kyve.query.v1beta1.canValidate({
          pool_id: this.poolId.toString(),
          valaddress: this.client.account.address,
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
      await sleep(ERROR_IDLE_TIME);
    }
  }
}
