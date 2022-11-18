import { KYVE_NETWORK } from "@kyve/sdk-beta/dist/constants";

export interface IConfig {
  network: KYVE_NETWORK;
  autoDownloadBinaries: boolean;
}

export interface IValaccountConfig {
  pool: number;
  valaccount: string;
  storagePriv: string;
  verbose: boolean;
  metrics: boolean;
  metricsPort: string;
}
