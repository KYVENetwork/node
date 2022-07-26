import { Bech32Address } from "@keplr-wallet/cosmos";
import { ChainInfo } from "@keplr-wallet/types";
import { AddChainParams } from "@cosmostation/extension-client/types/message";
export const KYVE_DECIMALS = 9;
export const DENOM = "tkyve";
export const SUPPORTED_WALLETS = {
  KEPLER: "KEPLER",
  COSMOSTATION: "COSMOSTATION",
} as const;
type Networks = Record<KYVE_NETWORK, Network>;

export const KYVE_ENDPOINTS: Networks = {
  local: {
    rpc: "http://localhost:26657",
    rest: "http://localhost:1317",
    chainId: "kyve-local",
    chainName: "KYVE - Local",
  },
  alpha: {
    rpc: "https://rpc.alpha.kyve.network",
    rest: "https://api.alpha.kyve.network",
    chainId: "kyve-alpha",
    chainName: "KYVE - Alpha",
  },
  beta: {
    rpc: "https://rpc.beta.kyve.network",
    rest: "https://api.beta.kyve.network",
    chainId: "kyve-beta",
    chainName: "KYVE - Beta",
  },
  korellia: {
    rpc: "https://rpc.korellia.kyve.network",
    rest: "https://api.korellia.kyve.network",
    chainId: "korellia",
    chainName: "Korellia",
  },
};
export const PREFIX = "kyve";
export const KYVE_KEPLR_CONFIG: ChainInfo = {
  rpc: "",
  rest: "",
  chainId: "",
  chainName: "",
  stakeCurrency: {
    coinDenom: "KYVE",
    coinMinimalDenom: "tkyve",
    coinDecimals: KYVE_DECIMALS,
  },
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config("kyve"),
  currencies: [
    {
      coinDenom: "KYVE",
      coinMinimalDenom: "tkyve",
      coinDecimals: KYVE_DECIMALS,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: "KYVE",
      coinMinimalDenom: "tkyve",
      coinDecimals: KYVE_DECIMALS,
    },
  ],
  coinType: 118,
  gasPriceStep: { low: 0, average: 0, high: 0 },
  features: ["ibc-transfer", "ibc-go"],
};

export const KYVE_COSMOSTATION_CONFIG: AddChainParams = {
  chainId: "",
  restURL: "",
  chainName: "",
  baseDenom: "tkyve",
  displayDenom: "KYVE",
  addressPrefix: PREFIX,
  coinType: "118",
  decimals: KYVE_DECIMALS,
};

export type KYVE_NETWORK = "local" | "alpha" | "beta" | "korellia";

export type Network = {
  rpc: string;
  rest: string;
  chainId: string;
  chainName: string;
};
