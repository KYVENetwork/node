import { AccountData, OfflineAminoSigner } from "@cosmjs/amino/build/signer";
import KyveBaseMethods from "./kyve/base.v1beta1";
import KyveGovMethods from "./kyve/gov.v1beta1";
import { SigningStargateClient } from "@cosmjs/stargate";
import { StdSignature } from "@cosmjs/amino";
export default class KyveClient {
    nativeClient: SigningStargateClient;
    readonly account: AccountData;
    kyve: {
        v1beta1: {
            base: KyveBaseMethods;
            gov: KyveGovMethods;
        };
    };
    private aminoSigner;
    constructor(client: SigningStargateClient, account: AccountData, aminoSigner: OfflineAminoSigner | null);
    signString(message: string): Promise<StdSignature>;
}
