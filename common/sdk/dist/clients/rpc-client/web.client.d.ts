import KyveClient from "./client";
import { AccountData, OfflineAminoSigner } from "@cosmjs/amino/build/signer";
import { SigningStargateClient } from "@cosmjs/stargate";
export default class KyveWebClient extends KyveClient {
    private readonly walletName;
    constructor(client: SigningStargateClient, account: AccountData, aminoSigner: OfflineAminoSigner | null, walletName: string);
    getWalletName(): string;
}
