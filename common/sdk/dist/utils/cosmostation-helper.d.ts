import { AddChainParams, RequestAccountResponse, SignAminoResponse, SignOptions } from "@cosmostation/extension-client/types/message";
import { AccountData, OfflineDirectSigner } from "@cosmjs/proto-signing/build/signer";
import { Network } from "../constants";
import { SignDoc } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { StdSignDoc } from "@cosmjs/amino/build/signdoc";
export declare const cosmostationMethods: {
    getSupportedChains(): Promise<any>;
    addChain(params: AddChainParams): Promise<any>;
    requestAccount(chainId: string): Promise<any>;
    signDirect(chainName: string, doc: Object, options?: SignOptions): Promise<any>;
    signAmino(chainName: string, doc: StdSignDoc, options?: SignOptions): Promise<SignAminoResponse>;
};
export declare class CosmostationSigner implements OfflineDirectSigner {
    private network;
    private cosmostationAccount;
    private cosmostationOption;
    constructor(cosmostationAccount: RequestAccountResponse, network: Network, cosmostationOption?: SignOptions);
    getAccounts(): Promise<readonly AccountData[]>;
    signDirect(signerAddress: string, signDoc: SignDoc): Promise<{
        signed: SignDoc;
        signature: {
            pub_key: any;
            signature: any;
        };
    }>;
}
