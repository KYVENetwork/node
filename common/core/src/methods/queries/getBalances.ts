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
    const stakerBalanceRaw = await this.client.nativeClient.getBalance(
      this.staker,
      DENOM
    );
    const stakerBalance = new BigNumber(stakerBalanceRaw.amount)
      .dividedBy(new BigNumber(10).exponentiatedBy(KYVE_DECIMALS))
      .toNumber();

    this.m.balance_staker.set(stakerBalance);
  } catch (error) {
    this.logger.info(`Failed to get staker balance ...`);
    this.logger.debug(error);
  }

  try {
    const valaccountBalanceRaw = await this.client.nativeClient.getBalance(
      this.client.account.address,
      DENOM
    );
    const valaccountBalance = new BigNumber(valaccountBalanceRaw.amount)
      .dividedBy(new BigNumber(10).exponentiatedBy(KYVE_DECIMALS))
      .toNumber();

    this.m.balance_valaccount.set(valaccountBalance);
  } catch (error) {
    this.logger.info(`Failed to get valaccount balance ...`);
    this.logger.debug(error);
  }

  try {
    const storageProviderBalanceRaw = await this.storageProvider.getBalance();
    const storageProviderBalance = new BigNumber(storageProviderBalanceRaw)
      .dividedBy(
        new BigNumber(10).exponentiatedBy(this.storageProvider.decimals)
      )
      .toNumber();

    this.m.balance_storage_provider.set(storageProviderBalance);
  } catch (error) {
    this.logger.info(`Failed to get storage provider balance ...`);
    this.logger.debug(error);
  }
}
