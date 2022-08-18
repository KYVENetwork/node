import { AccountData, OfflineAminoSigner } from "@cosmjs/amino/build/signer";
import { SigningStargateClient } from "@cosmjs/stargate";
import { makeADR36AminoSignDoc } from "@keplr-wallet/cosmos";
import { StdSignature } from "@cosmjs/amino";
import KyveBaseMethods from "./kyve/base.v1beta1";
import KyveBundlesMethods from "./kyve/bundles.v1beta1";
import KyveDelegationMethods from "./kyve/delegation.v1beta1";
import KyveGovMethods from "./kyve/gov.v1beta1";
import KyvePoolMethods from "./kyve/pool.v1beta1";
import KyveStakersMethods from "./kyve/stakers.v1beta1";

export default class KyveClient {
  public nativeClient: SigningStargateClient;
  public readonly account: AccountData;
  public kyve: {
    v1beta1: {
      base: KyveBaseMethods;
      gov: KyveGovMethods;
      bundles: KyveBundlesMethods;
      delegation: KyveDelegationMethods;
      pool: KyvePoolMethods;
      stakers: KyveStakersMethods;
    };
  };
  private aminoSigner: OfflineAminoSigner | null;

  constructor(
    client: SigningStargateClient,
    account: AccountData,
    aminoSigner: OfflineAminoSigner | null
  ) {
    this.account = account;
    this.nativeClient = client;
    this.aminoSigner = aminoSigner;
    this.kyve = {
      v1beta1: {
        base: new KyveBaseMethods(this.nativeClient, this.account),
        bundles: new KyveBundlesMethods(this.nativeClient, this.account),
        delegation: new KyveDelegationMethods(this.nativeClient, this.account),
        gov: new KyveGovMethods(this.nativeClient, this.account),
        pool: new KyvePoolMethods(this.nativeClient, this.account),
        stakers: new KyveStakersMethods(this.nativeClient, this.account),
      },
    };
  }
  async signString(message: string): Promise<StdSignature> {
    if (this.aminoSigner === null)
      throw new Error("Wallet doesn't support adr-036");
    const signDoc = makeADR36AminoSignDoc(this.account.address, message);
    const { signature } = await this.aminoSigner.signAmino(
      this.account.address,
      signDoc
    );
    return signature;
  }
}
