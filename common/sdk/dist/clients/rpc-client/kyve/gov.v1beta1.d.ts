import { SigningStargateClient } from "@cosmjs/stargate";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import { AccountData } from "@cosmjs/amino/build/signer";
import { TextProposal } from "@kyve/proto/dist/proto/cosmos/gov/v1beta1/gov";
import { ParameterChangeProposal } from "@kyve/proto/dist/proto/cosmos/params/v1beta1/params";
import { CancelPoolUpgradeProposal, CreatePoolProposal, PausePoolProposal, ResetPoolProposal, SchedulePoolUpgradeProposal, UnpausePoolProposal, UpdatePoolProposal } from "@kyve/proto/dist/proto/kyve/registry/v1beta1/gov";
import { TxPromise } from "../../../utils/helper";
export default class KyveGovMsg {
    private nativeClient;
    readonly account: AccountData;
    constructor(client: SigningStargateClient, account: AccountData);
    private createGovTx;
    submitTextProposal(amount: string, value: TextProposal, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
        isExpedited?: boolean;
    }): Promise<TxPromise>;
    parameterChangeProposal(amount: string, value: ParameterChangeProposal, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
        isExpedited?: boolean;
    }): Promise<TxPromise>;
    updatePoolProposal(amount: string, value: UpdatePoolProposal, options?: {
        isExpedited?: boolean;
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    pausePoolProposal(amount: string, value: PausePoolProposal, options?: {
        isExpedited?: boolean;
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    unpausePoolProposal(amount: string, value: UnpausePoolProposal, options?: {
        isExpedited?: boolean;
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    schedulePoolUpgradeProposal(amount: string, value: SchedulePoolUpgradeProposal, options?: {
        isExpedited?: boolean;
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    cancelPoolUpgradeProposal(amount: string, value: CancelPoolUpgradeProposal, options?: {
        isExpedited?: boolean;
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    resetPoolProposal(amount: string, value: ResetPoolProposal, options?: {
        isExpedited?: boolean;
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    createPoolProposal(amount: string, value: CreatePoolProposal, options: {
        isExpedited?: boolean;
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    govVote(id: string, voteOption: "Yes" | "Abstain" | "No" | "NoWithVeto", options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
}
