import { coins, SigningStargateClient } from "@cosmjs/stargate";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import { AccountData } from "@cosmjs/amino/build/signer";
import { BigNumber } from "bignumber.js";
import {KYVE_DECIMALS, Network} from "../../../../../constants";
import { DENOM } from "../../../../../constants";
import { signTx, TxPromise } from "../../../../../utils/helper";
import { withTypeUrl } from "../../../../../registry/tx.registry";

export default class KyveBaseMsg {
  private nativeClient: SigningStargateClient;
  public readonly account: AccountData;
  private network: Network;

  constructor(client: SigningStargateClient, network: Network,  account: AccountData) {
    this.account = account;
    this.network = network;
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
    const tx = {
      typeUrl: "/cosmos.bank.v1beta1.MsgSend",
      value: {
        fromAddress: this.account.address,
        toAddress: recipient,
        amount: coins(amount, DENOM),
      },
    };

    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.network, this.account.address, tx, options)
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
