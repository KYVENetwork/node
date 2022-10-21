import { coins, SigningStargateClient } from "@cosmjs/stargate";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import { AccountData } from "@cosmjs/amino/build/signer";
import { DENOM } from "../../../../../constants";
import { signTx, TxPromise } from "../../../../../utils/helper";

import  {TextProposal} from "@kyve/proto/client/cosmos/gov/v1beta1/gov";
import  {ParameterChangeProposal} from "@kyve/proto/client/cosmos/params/v1beta1/params";

import { CreatePoolProposal } from '@kyve/proto/client/kyve/pool/v1beta1/gov'
import { CancelPoolUpgradeProposal } from '@kyve/proto/client/kyve/pool/v1beta1/gov'
import { PausePoolProposal } from '@kyve/proto/client/kyve/pool/v1beta1/gov'
import { SchedulePoolUpgradeProposal } from '@kyve/proto/client/kyve/pool/v1beta1/gov'
import { UnpausePoolProposal } from '@kyve/proto/client/kyve/pool/v1beta1/gov'
import { UpdatePoolProposal } from '@kyve/proto/client/kyve/pool/v1beta1/gov'
import { VoteOption } from "@kyve/proto/client/cosmos/gov/v1beta1/gov"

export default class KyveGovMsg {
  private nativeClient: SigningStargateClient;
  public readonly account: AccountData;

  constructor(client: SigningStargateClient, account: AccountData) {
    this.account = account;
    this.nativeClient = client;
  }

  private createGovTx(
    amount: string,
    content: { type_url: string; value: Object },
    isExpedited = false
  ) {
    return {
      typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
      value: {
        content,
        initial_deposit: coins(amount.toString(), DENOM),
        proposer: this.account.address,
        is_expedited: isExpedited,
      },
    };
  }

  public async submitTextProposal(
    amount: string,
    value: TextProposal,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
      isExpedited?: boolean;
    }
  ) {
    const content = {
      type_url: "/cosmos.gov.v1beta1.TextProposal",
      value: TextProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content, options?.isExpedited);
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async parameterChangeProposal(
    amount: string,
    value: ParameterChangeProposal,
    options?: {
      fee?: StdFee | "auto" | number;
      memo?: string;
      isExpedited?: boolean;
    }
  ) {
    const content = {
      type_url: "/cosmos.params.v1beta1.ParameterChangeProposal",
      value: ParameterChangeProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content, options?.isExpedited);
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async updatePoolProposal(
    amount: string,
    value: UpdatePoolProposal,
    options?: {
      isExpedited?: boolean;
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const content = {
      type_url: "/kyve.pool.v1beta1.UpdatePoolProposal",
      value: UpdatePoolProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content, options?.isExpedited);
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async pausePoolProposal(
    amount: string,
    value: PausePoolProposal,
    options?: {
      isExpedited?: boolean;
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const content = {
      type_url: "/kyve.pool.v1beta1.PausePoolProposal",
      value: PausePoolProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content, options?.isExpedited);
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async unpausePoolProposal(
    amount: string,
    value: UnpausePoolProposal,
    options?: {
      isExpedited?: boolean;
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const content = {
      type_url: "/kyve.pool.v1beta1.UnpausePoolProposal",
      value: UnpausePoolProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content, options?.isExpedited);
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async schedulePoolUpgradeProposal(
    amount: string,
    value: SchedulePoolUpgradeProposal,
    options?: {
      isExpedited?: boolean;
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const content = {
      type_url: "/kyve.pool.v1beta1.SchedulePoolUpgradeProposal",
      value: SchedulePoolUpgradeProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content, options?.isExpedited);
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async cancelPoolUpgradeProposal(
    amount: string,
    value: CancelPoolUpgradeProposal,
    options?: {
      isExpedited?: boolean;
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const content = {
      type_url: "/kyve.pool.v1beta1.CancelPoolUpgradeProposal",
      value: CancelPoolUpgradeProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content, options?.isExpedited);
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  public async createPoolProposal(
    amount: string,
    value: CreatePoolProposal,
    options: {
      isExpedited?: boolean;
      fee?: StdFee | "auto" | number;
      memo?: string;
    }
  ) {
    const content = {
      type_url: "/kyve.pool.v1beta1.CreatePoolProposal",
      value: CreatePoolProposal.encode(value).finish(),
    };
    const tx = this.createGovTx(amount, content, options?.isExpedited);
    return new TxPromise(
      this.nativeClient,
      await signTx(this.nativeClient, this.account.address, tx, options)
    );
  }

  async govVote(
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
      typeUrl: "/cosmos.gov.v1beta1.MsgVote",
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
