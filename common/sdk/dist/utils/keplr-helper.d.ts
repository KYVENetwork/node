import { StdSignDoc } from "@cosmjs/amino/build/signdoc";
import { AccountData, AminoSignResponse, OfflineAminoSigner } from "@cosmjs/amino/build/signer";
import { Keplr } from "@keplr-wallet/types";
import { Network } from "../constants";
export declare class KeplrAminoSigner implements OfflineAminoSigner {
    private keplr;
    private network;
    constructor(keplr: Keplr, network: Network);
    getAccounts(): Promise<readonly AccountData[]>;
    signAmino(signerAddress: string, signDoc: StdSignDoc): Promise<AminoSignResponse>;
}
