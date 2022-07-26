import { OfflineSigner } from "@cosmjs/proto-signing";
import KyveClient from "./rpc-client/client";
import KyveWebClient from "./rpc-client/web.client";
import { OfflineAminoSigner } from "@cosmjs/amino/build/signer";
export declare function getSigningKyveClient(rpcEndpoint: string, signer: OfflineSigner, aminoSigner: OfflineAminoSigner | null, walletName?: undefined, defaultTypes?: undefined): Promise<KyveClient>;
export declare function getSigningKyveClient(rpcEndpoint: string, signer: OfflineSigner, aminoSigner: OfflineAminoSigner | null, walletName?: string, defaultTypes?: undefined): Promise<KyveWebClient>;
