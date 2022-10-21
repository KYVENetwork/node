import { SigningStargateClient } from "@cosmjs/stargate";
import { AccountData } from "@cosmjs/amino/build/signer";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import { withTypeUrl } from "../../../../../registry/tx.registry";
import { signTx, TxPromise } from "../../../../../utils/helper";

import {MsgDefundPool} from "@kyve/proto/client/kyve/pool/v1beta1/tx";
import {MsgFundPool} from "@kyve/proto/client/kyve/pool/v1beta1/tx";

export default class {
  private nativeClient: SigningStargateClient;
  public readonly account: AccountData;

  constructor(client: SigningStargateClient, account: AccountData) {
    this.account = account;
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
      await signTx(this.nativeClient, this.account.address, tx, options)
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
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }
}
