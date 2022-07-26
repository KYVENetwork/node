import { KyveRegistryLCDClient } from "./registry/v1beta1/query";
import {
  AuthExtension,
  BankExtension,
  DistributionExtension,
  GovExtension,
  LcdClient,
  MintExtension,
  setupAuthExtension,
  setupBankExtension,
  setupDistributionExtension,
  setupGovExtension,
  setupMintExtension,
  setupSlashingExtension,
  setupStakingExtension,
  setupSupplyExtension,
  SlashingExtension,
  StakingExtension,
  SupplyExtension,
} from "@cosmjs/launchpad";

type LCDClientType = LcdClient &
  AuthExtension &
  BankExtension &
  DistributionExtension &
  GovExtension &
  MintExtension &
  SlashingExtension &
  StakingExtension &
  SupplyExtension;
class KyveLCDClient {
  public registry: { v1beta1: KyveRegistryLCDClient };
  constructor(restEndpoint: string) {
    this.registry = {
      v1beta1: new KyveRegistryLCDClient(restEndpoint),
    };
  }
}
export type KyveLCDClientType = {
  cosmos: {
    v1beta1: LCDClientType;
  };
  kyve: KyveLCDClient;
};
export function createKyveLCDClient(restEndpoint: string): KyveLCDClientType {
  const cosmosLcdClient = LcdClient.withExtensions(
    { apiUrl: restEndpoint },
    setupAuthExtension,
    setupBankExtension,
    setupDistributionExtension,
    setupGovExtension,
    setupMintExtension,
    setupSlashingExtension,
    setupStakingExtension,
    setupSupplyExtension
  );
  return {
    cosmos: {
      v1beta1: cosmosLcdClient,
    },
    kyve: new KyveLCDClient(restEndpoint),
  };
}
