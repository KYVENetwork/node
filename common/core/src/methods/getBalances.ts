import { DENOM, KYVE_DECIMALS } from "@kyve/sdk/dist/constants";
import BigNumber from "bignumber.js";
import { Node } from "..";

export async function getBalances(this: Node): Promise<void> {
  try {
    const stakerBalanceRaw = await this.client.nativeClient.getBalance(
      this.staker,
      DENOM
    );
    const stakerBalance = new BigNumber(stakerBalanceRaw.amount)
      .dividedBy(KYVE_DECIMALS)
      .toNumber();

    this.prom.balance_staker.set(stakerBalance);
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
      .dividedBy(KYVE_DECIMALS)
      .toNumber();

    this.prom.balance_valaccount.set(valaccountBalance);
  } catch (error) {
    this.logger.info(`Failed to get valaccount balance ...`);
    this.logger.debug(error);
  }

  try {
    const walletBalanceRaw = await this.storageProvider.getBalance();
    const walletBalance = new BigNumber(walletBalanceRaw)
      .dividedBy(
        new BigNumber(10).exponentiatedBy(this.storageProvider.decimals)
      )
      .toNumber();

    this.prom.balance_wallet.set(walletBalance);
  } catch (error) {
    this.logger.info(`Failed to get wallet balance ...`);
    this.logger.debug(error);
  }
}
