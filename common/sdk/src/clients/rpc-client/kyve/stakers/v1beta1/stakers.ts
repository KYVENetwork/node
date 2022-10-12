import { SigningStargateClient } from "@cosmjs/stargate";
import { AccountData } from "@cosmjs/amino/build/signer";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import { withTypeUrl } from "../../../../../registry/tx.registry";
import { signTx, TxPromise } from "../../../../../utils/helper";
import { kyve } from "@kyve/proto";

import MsgStake = kyve.registry.v1beta1.kyveStakers.MsgCreateStaker;
import MsgUpdateMetadata = kyve.registry.v1beta1.kyveStakers.MsgUpdateMetadata;
import MsgUpdateCommission = kyve.registry.v1beta1.kyveStakers.MsgUpdateCommission;
import MsgJoinPool = kyve.registry.v1beta1.kyveStakers.MsgJoinPool;
import MsgLeavePool = kyve.registry.v1beta1.kyveStakers.MsgLeavePool;
import {Network} from "../../../../../constants";

export default class {
  private nativeClient: SigningStargateClient;
  public readonly account: AccountData;
  private network: Network;

  constructor(client: SigningStargateClient, network: Network, account: AccountData) {
    this.account = account;
    this.network = network;
    this.nativeClient = client;
  }

  public async createStaker(
    value: Omit<MsgStake, "creator">,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const tx = withTypeUrl.createStaker({
      ...value,
      creator: this.account.address,
    });
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.network, this.account.address, tx, options)
    );
  }

  public async updateMetadata(
    value: Omit<MsgUpdateMetadata, "creator">,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const tx = withTypeUrl.updateMetadata({
      ...value,
      creator: this.account.address,
    });
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.network, this.account.address, tx, options)
    );
  }

  public async updateCommission(
    value: Omit<MsgUpdateCommission, "creator">,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const tx = withTypeUrl.updateCommission({
      ...value,
      creator: this.account.address,
    });
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.network, this.account.address, tx, options)
    );
  }
  public async joinPool(
    value: Omit<MsgJoinPool, "creator">,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const tx = withTypeUrl.joinPool({
      ...value,
      creator: this.account.address,
    });
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.network, this.account.address, tx, options)
    );
  }

  public async leavePool(
    value: Omit<MsgLeavePool, "creator">,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const tx = withTypeUrl.leavePool({
      ...value,
      creator: this.account.address,
    });
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.network, this.account.address, tx, options)
    );
  }
}
