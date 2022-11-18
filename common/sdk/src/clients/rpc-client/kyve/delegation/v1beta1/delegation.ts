import { SigningStargateClient } from "@cosmjs/stargate";
import { AccountData } from "@cosmjs/amino/build/signer";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import { withTypeUrl } from "../../../../../registry/tx.registry";
import { signTx, TxPromise } from "../../../../../utils/helper";

import { MsgDelegate } from "@kyve/proto-beta/client/kyve/delegation/v1beta1/tx";
import { MsgWithdrawRewards } from "@kyve/proto-beta/client/kyve/delegation/v1beta1/tx";
import { MsgUndelegate } from "@kyve/proto-beta/client/kyve/delegation/v1beta1/tx";
import { MsgRedelegate } from "@kyve/proto-beta/client/kyve/delegation/v1beta1/tx";
import { Network } from "../../../../../constants";
export default class {
  private nativeClient: SigningStargateClient;
  public readonly account: AccountData;
  private network: Network;

  constructor(
    client: SigningStargateClient,
    network: Network,
    account: AccountData
  ) {
    this.account = account;
    this.nativeClient = client;
    this.network = network;
  }

  public async delegate(
    value: Omit<MsgDelegate, "creator">,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const tx = withTypeUrl.delegate({
      ...value,
      creator: this.account.address,
    });
    return new TxPromise(
      this.nativeClient,
      await signTx(
        this.nativeClient,
        this.network,
        this.account.address,
        tx,
        options
      )
    );
  }
  public async withdrawRewards(
    value: Omit<MsgWithdrawRewards, "creator">,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const tx = withTypeUrl.withdrawRewards({
      ...value,
      creator: this.account.address,
    });
    return new TxPromise(
      this.nativeClient,
      await signTx(
        this.nativeClient,
        this.network,
        this.account.address,
        tx,
        options
      )
    );
  }

  public async undelegate(
    value: Omit<MsgUndelegate, "creator">,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const tx = withTypeUrl.undelegate({
      ...value,
      creator: this.account.address,
    });
    return new TxPromise(
      this.nativeClient,
      await signTx(
        this.nativeClient,
        this.network,
        this.account.address,
        tx,
        options
      )
    );
  }

  public async redelegate(
    value: Omit<MsgRedelegate, "creator">,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const tx = withTypeUrl.redelegate({
      ...value,
      creator: this.account.address,
    });
    return new TxPromise(
      this.nativeClient,
      await signTx(
        this.nativeClient,
        this.network,
        this.account.address,
        tx,
        options
      )
    );
  }
}
