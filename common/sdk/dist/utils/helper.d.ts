import { EncodeObject } from "@cosmjs/proto-signing";
import { SigningStargateClient } from "@cosmjs/stargate";
import { StdFee } from "@cosmjs/amino/build/signdoc";
declare type signTxResponseType = {
    txRawBytes: Uint8Array;
    fee: StdFee;
};
export declare class TxPromise {
    private nativeClient;
    private txBytes;
    readonly txHash: string;
    readonly fee: StdFee;
    constructor(nativeClient: SigningStargateClient, tx: signTxResponseType);
    execute(): Promise<import("@cosmjs/stargate").DeliverTxResponse>;
}
export declare function signTx(nativeClient: SigningStargateClient, address: string, tx: EncodeObject, options?: {
    fee?: StdFee | "auto" | number;
    memo?: string;
}): Promise<signTxResponseType>;
export {};
