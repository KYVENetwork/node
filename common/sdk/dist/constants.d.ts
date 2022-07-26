import { ChainInfo } from "@keplr-wallet/types";
import { AddChainParams } from "@cosmostation/extension-client/types/message";
export declare const KYVE_DECIMALS = 9;
export declare const DENOM = "tkyve";
export declare const SUPPORTED_WALLETS: {
    readonly KEPLER: "KEPLER";
    readonly COSMOSTATION: "COSMOSTATION";
};
declare type Networks = Record<KYVE_NETWORK, Network>;
export declare const KYVE_ENDPOINTS: Networks;
export declare const PREFIX = "kyve";
export declare const KYVE_KEPLR_CONFIG: ChainInfo;
export declare const KYVE_COSMOSTATION_CONFIG: AddChainParams;
export declare type KYVE_NETWORK = "local" | "alpha" | "beta" | "korellia";
export declare type Network = {
    rpc: string;
    rest: string;
    chainId: string;
    chainName: string;
};
export {};
