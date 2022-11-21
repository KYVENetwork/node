import { coins, SigningStargateClient } from "@cosmjs/stargate";
import { AccountData } from "@cosmjs/amino/build/signer";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import { VoteOption } from "@kyve/proto-beta/client/cosmos/gov/v1beta1/gov";
import { signTx, TxPromise } from "../../../../../utils/helper";
import { DENOM } from "../../../../../constants";
import { MsgPausePool } from "@kyve/proto-beta/client/kyve/pool/v1beta1/tx";

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
      {
        type_url: "/cosmos.gov.v1beta1.MsgPausePool",
        value: MsgPausePool.encode({ ...value, authority: AUTHORITY }).finish(),
      },
      amount,
      metadata
    );

    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async submitProposal(
    messages: any,
    amount: string,
    metadata: string,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const tx = {
      typeUrl: "/cosmos.gov.v1.MsgSubmitProposal",
      value: {
        messages,
        initial_deposit: coins(amount.toString(), DENOM),
        proposer: this.account.address,
        metadata: metadata,
      },
    };

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
        proposalId: id,
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
