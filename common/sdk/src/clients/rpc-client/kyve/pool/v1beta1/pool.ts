import { SigningStargateClient } from "@cosmjs/stargate";
import { AccountData } from "@cosmjs/amino/build/signer";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import { withTypeUrl } from "../../../../../registry/tx.registry";
import { signTx, TxPromise } from "../../../../../utils/helper";

import { MsgDefundPool } from "@kyve/proto-beta/client/kyve/pool/v1beta1/tx";
import { MsgFundPool } from "@kyve/proto-beta/client/kyve/pool/v1beta1/tx";
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
    this.network = network;
    this.nativeClient = client;
  }

  public async fundPool(
    value: Omit<MsgFundPool, "creator">,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const tx = withTypeUrl.fundPool({
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

  public async defundPool(
    value: Omit<MsgDefundPool, "creator">,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const tx = withTypeUrl.defundPool({
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
