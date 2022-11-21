import { coins, SigningStargateClient } from "@cosmjs/stargate";
import { AccountData } from "@cosmjs/amino/build/signer";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import { VoteOption } from "@kyve/proto-beta/client/cosmos/gov/v1/gov";
import { signTx, TxPromise } from "../../../../../utils/helper";
import { DENOM } from "../../../../../constants";
import {
  MsgCancelRuntimeUpgrade,
  MsgCreatePool,
  MsgPausePool,
  MsgScheduleRuntimeUpgrade,
  MsgUnpausePool,
  MsgUpdatePool,
} from "@kyve/proto-beta/client/kyve/pool/v1beta1/tx";
import { encodeTxMsg } from "../../../../../registry/tx.registry";

// TODO: fetch dynamically?
const AUTHORITY = "kyve10d07y265gmmuvt4z0w9aw880jnsr700jdv7nah";

export default class KyveGovMsg {
  protected nativeClient: SigningStargateClient;
  public readonly account: AccountData;

  constructor(client: SigningStargateClient, account: AccountData) {
    this.account = account;
    this.nativeClient = client;
  }

  private createGovTx(
    content: { type_url: string; value: Object },
    amount: string,
    metadata?: string
  ) {
    return {
      typeUrl: "/cosmos.gov.v1.MsgSubmitProposal",
      value: {
        messages: [content],
        initial_deposit: coins(amount.toString(), DENOM),
        proposer: this.account.address,
        metadata,
      },
    };
  }

  public async createPoolProposal(
    value: Omit<MsgCreatePool, "authority">,
    amount: string,
    metadata?: string,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const tx = this.createGovTx(
      encodeTxMsg.createPool({
        ...value,
        authority: AUTHORITY,
      }),
      amount,
      metadata
    );

    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async updatePoolProposal(
    value: Omit<MsgUpdatePool, "authority">,
    amount: string,
    metadata?: string,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const tx = this.createGovTx(
      encodeTxMsg.updatePool({
        ...value,
        authority: AUTHORITY,
      }),
      amount,
      metadata
    );

    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async pausePoolProposal(
    value: Omit<MsgPausePool, "authority">,
    amount: string,
    metadata?: string,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const tx = this.createGovTx(
      encodeTxMsg.pausePool({
        ...value,
        authority: AUTHORITY,
      }),
      amount,
      metadata
    );

    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async unpausePoolProposal(
    value: Omit<MsgUnpausePool, "authority">,
    amount: string,
    metadata?: string,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const tx = this.createGovTx(
      encodeTxMsg.unpausePool({
        ...value,
        authority: AUTHORITY,
      }),
      amount,
      metadata
    );

    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async scheduleRuntimeUpgradeProposal(
    value: Omit<MsgScheduleRuntimeUpgrade, "authority">,
    amount: string,
    metadata?: string,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const tx = this.createGovTx(
      encodeTxMsg.scheduleRuntimeUpgrade({
        ...value,
        authority: AUTHORITY,
      }),
      amount,
      metadata
    );

    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async cancelRuntimeUpgradeProposal(
    value: Omit<MsgCancelRuntimeUpgrade, "authority">,
    amount: string,
    metadata?: string,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const tx = this.createGovTx(
      encodeTxMsg.cancelRuntimeUpgrade({
        ...value,
        authority: AUTHORITY,
      }),
      amount,
      metadata
    );

    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async vote(
    id: string,
    voteOption: "Yes" | "Abstain" | "No" | "NoWithVeto",
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    let _option = VoteOption.VOTE_OPTION_UNSPECIFIED;

    switch (voteOption) {
      case "Yes":
        _option = VoteOption.VOTE_OPTION_YES;
        break;
      case "Abstain":
        _option = VoteOption.VOTE_OPTION_ABSTAIN;
        break;
      case "No":
        _option = VoteOption.VOTE_OPTION_NO;
        break;
      case "NoWithVeto":
        _option = VoteOption.VOTE_OPTION_NO_WITH_VETO;
        break;
    }

    const tx = {
      typeUrl: "/cosmos.gov.v1.MsgVote",
      value: {
        proposal_id: id,
        voter: this.account.address,
        option: _option,
      },
    };

    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }
}
