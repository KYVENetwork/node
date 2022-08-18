import { coins, SigningStargateClient } from "@cosmjs/stargate";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import { AccountData } from "@cosmjs/amino/build/signer";
import { BigNumber } from "bignumber.js";
import { KYVE_DECIMALS } from "../../../../../constants";
import { DENOM } from "../../../../../constants";

export default class KyveBaseMsg {
  private nativeClient: SigningStargateClient;
  public readonly account: AccountData;

  constructor(client: SigningStargateClient, account: AccountData) {
    this.account = account;
    this.nativeClient = client;
  }

  async transfer(
    recipient: string,
    amount: string,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const parsedAmount = new BigNumber(amount)
      .multipliedBy(new BigNumber(10).pow(KYVE_DECIMALS))
      .toNumber();

    return this.nativeClient.sendTokens(
      this.account.address,
      recipient,
      coins(parsedAmount, DENOM),
      options?.fee ? options?.fee : "auto",
      options?.memo
    );
  }

  async getKyveBalance() {
    const data = await this.nativeClient.getBalance(
      this.account.address,
      DENOM
    );
    return data.amount;
  }
}
