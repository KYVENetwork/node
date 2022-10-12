import KyveClient from "./client";
import { AccountData, OfflineAminoSigner } from "@cosmjs/amino/build/signer";
import { SigningStargateClient } from "@cosmjs/stargate";
import {Network} from "../../constants";

export default class KyveWebClient extends KyveClient {
  private readonly walletName: string;
  constructor(
    client: SigningStargateClient,
    account: AccountData,
    network: Network,
    aminoSigner: OfflineAminoSigner | null,
    walletName: string
  ) {
    super(client, account, network, aminoSigner);
    this.walletName = walletName;
  }

  public getWalletName() {
    return this.walletName;
  }
}
