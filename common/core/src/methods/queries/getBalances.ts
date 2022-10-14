import { Node } from "../..";
import { DENOM, KYVE_DECIMALS } from "@kyve/sdk/dist/constants";
import BigNumber from "bignumber.js";

/**
 * getBalances tries to retrieve the $KYVE balance of the staker account, the $KYVE
 * balance of the valaccount and the balance of the storage provider which
 * can be of any currency for metrics
 *
 * @method getBalances
 * @param {Node} this
 * @return {Promise<void>}
 */
export async function getBalances(this: Node): Promise<void> {
  try {
    this.logger.debug(`this.client.nativeClient.getBalance(
      ${this.staker},
      ${DENOM}
    )\n`);

    const stakerBalanceRaw = await this.client.nativeClient.getBalance(
      this.staker,
      DENOM
    );
    const stakerBalance = new BigNumber(stakerBalanceRaw.amount)
      .dividedBy(new BigNumber(10).exponentiatedBy(KYVE_DECIMALS))
      .toNumber();

    this.m.balance_staker.set(stakerBalance);
  } catch (err) {
    this.logger.error(`Failed to get $KYVE balance of staker`);
    this.logger.error(err);
  }

  try {
    this.logger.debug(`this.client.nativeClient.getBalance(
      ${this.client.account.address},
      ${DENOM}
    )\n`);

    const valaccountBalanceRaw = await this.client.nativeClient.getBalance(
      this.client.account.address,
      DENOM
    );
    const valaccountBalance = new BigNumber(valaccountBalanceRaw.amount)
      .dividedBy(new BigNumber(10).exponentiatedBy(KYVE_DECIMALS))
      .toNumber();

    this.m.balance_valaccount.set(valaccountBalance);
  } catch (err) {
    this.logger.error(`Failed to get $KYVE balance of valaccount`);
    this.logger.error(err);
  }

  try {
    this.logger.debug(`this.storageProvider.getBalance()\n`);

    const storageProviderBalanceRaw = await this.storageProvider.getBalance();
    const storageProviderBalance = new BigNumber(storageProviderBalanceRaw)
      .dividedBy(
        new BigNumber(10).exponentiatedBy(this.storageProvider.decimals)
      )
      .toNumber();

    this.m.balance_storage_provider.set(storageProviderBalance);
  } catch (err) {
    this.logger.error(`Failed to get balance of storage provider`);
    this.logger.error(err);
  }
}
