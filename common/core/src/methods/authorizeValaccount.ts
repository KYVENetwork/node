import { Node } from "..";
import { callWithBackoffStrategy, REFRESH_TIME, sleep } from "../utils";

/**
 * authorizeValaccount ensures that the node starts with a valid validator
 * who authorized this valaccount. If the valaccount was not authorized
 * by the validator yet it logs out the information to authorize it.
 * After authorization the node can continue running.
 *
 * @method authorizeValaccount
 * @param {Node} this
 * @return {Promise<void>}
 */
export async function authorizeValaccount(this: Node): Promise<void> {
  try {
    // call canValidate query to check if valaccount
    // was already authorized to run
    const canValidate = await callWithBackoffStrategy(
      async () => {
        return await this.lcd.kyve.query.v1beta1.canValidate({
          pool_id: this.poolId.toString(),
          valaddress: this.client.account.address,
        });
      },
      { limitTimeoutMs: 5 * 60 * 1000, increaseByMs: 10 * 1000 },
      (error: any, ctx) => {
        this.logger.info(
          `Failed to fetch canValidate. Retrying in ${(
            ctx.nextTimeoutInMs / 1000
          ).toFixed(2)}s ...`
        );
        this.logger.debug(error?.response ?? error);
        this.prom.query_can_validate_failed.inc();
      }
    );

    this.prom.query_can_validate_successful.inc();

    // assign validator staker if staker has authorized this valaccount
    if (canValidate.possible) {
      this.staker = canValidate.reason;
      return;
    } else {
      // log information so that staker can authorize this valaccount
      this.logger.info(
        `Valaccount ${this.client.account.address} has not joined the pool with id ${this.poolId} yet`
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

    // wait until valaccount got authorized
    while (true) {
      const canValidate = await callWithBackoffStrategy(
        async () => {
          return await this.lcd.kyve.query.v1beta1.canValidate({
            pool_id: this.poolId.toString(),
            valaddress: this.client.account.address,
          });
        },
        { limitTimeoutMs: 5 * 60 * 1000, increaseByMs: 10 * 1000 },
        (error: any, ctx) => {
          this.logger.info(
            `Failed to fetch canValidate. Retrying in ${(
              ctx.nextTimeoutInMs / 1000
            ).toFixed(2)}s ...`
          );
          this.logger.debug(error?.response ?? error);
          this.prom.query_can_validate_failed.inc();
        }
      );

      this.prom.query_can_validate_successful.inc();

      if (canValidate.possible) {
        this.staker = canValidate.reason;
        break;
      } else {
        await sleep(REFRESH_TIME);
      }
    }
  } catch (error) {
    this.logger.error(`Failed to authorize valaccount. Exiting ...`);
    this.logger.debug(error);

    process.exit(1);
  }
}
