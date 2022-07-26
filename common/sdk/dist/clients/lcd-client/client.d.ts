import { KyveRegistryLCDClient } from "./registry/v1beta1/query";
import { AuthExtension, BankExtension, DistributionExtension, GovExtension, LcdClient, MintExtension, SlashingExtension, StakingExtension, SupplyExtension } from "@cosmjs/launchpad";
declare type LCDClientType = LcdClient & AuthExtension & BankExtension & DistributionExtension & GovExtension & MintExtension & SlashingExtension & StakingExtension & SupplyExtension;
declare class KyveLCDClient {
    registry: {
        v1beta1: KyveRegistryLCDClient;
    };
    constructor(restEndpoint: string);
}
export declare type KyveLCDClientType = {
    cosmos: {
        v1beta1: LCDClientType;
    };
    kyve: KyveLCDClient;
};
export declare function createKyveLCDClient(restEndpoint: string): KyveLCDClientType;
export {};
