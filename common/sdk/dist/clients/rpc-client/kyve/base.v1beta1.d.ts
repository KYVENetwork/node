import { MsgClaimUploaderRole, MsgDefundPool, MsgDelegatePool, MsgFundPool, MsgReactivateStaker, MsgRedelegatePool, MsgStakePool, MsgSubmitBundleProposal, MsgUndelegatePool, MsgUnstakePool, MsgUpdateCommission, MsgUpdateMetadata, MsgVoteProposal, MsgWithdrawPool } from "@kyve/proto/dist/proto/kyve/registry/v1beta1/tx";
import { SigningStargateClient } from "@cosmjs/stargate";
import { StdFee } from "@cosmjs/amino/build/signdoc";
import { AccountData } from "@cosmjs/amino/build/signer";
import { TxPromise } from "../../../utils/helper";
export default class KyveBaseMsg {
    private nativeClient;
    readonly account: AccountData;
    constructor(client: SigningStargateClient, account: AccountData);
    fundPool(value: Omit<MsgFundPool, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    defundPool(value: Omit<MsgDefundPool, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    stakePool(value: Omit<MsgStakePool, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    unstakePool(value: Omit<MsgUnstakePool, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    delegatePool(value: Omit<MsgDelegatePool, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    withdrawPool(value: Omit<MsgWithdrawPool, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    undelegatePool(value: Omit<MsgUndelegatePool, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    submitBundleProposal(value: Omit<MsgSubmitBundleProposal, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    voteProposal(value: Omit<MsgVoteProposal, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    claimUploaderRole(value: Omit<MsgClaimUploaderRole, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    updateMetadata(value: Omit<MsgUpdateMetadata, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    updateCommission(value: Omit<MsgUpdateCommission, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    reactivateStaker(value: Omit<MsgReactivateStaker, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    redelegatePool(value: Omit<MsgRedelegatePool, "creator">, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<TxPromise>;
    transfer(recipient: string, amount: string, options?: {
        fee?: StdFee | "auto" | number;
        memo?: string;
    }): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
    getKyveBalance(): Promise<string>;
}
