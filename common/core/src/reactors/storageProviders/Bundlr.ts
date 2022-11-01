import BundlrClient from "@bundlr-network/client";
import { JWKInterface } from "arweave/node/lib/wallet";
import axios from "axios";
import { BundleTag, IStorageProvider } from "../../types";

export class Bundlr implements IStorageProvider {
  public name = "Bundlr";
  public decimals = 12;

  private jwk!: JWKInterface;
  private bundlrClient!: BundlrClient;

  async init(storagePriv: string) {
    this.jwk = JSON.parse(storagePriv);

    this.bundlrClient = new BundlrClient(
      "http://node1.bundlr.network",
      "arweave",
      this.jwk
    );

    return this;
  }

  async getBalance() {
    const atomicUnits = await this.bundlrClient.getLoadedBalance();
    return atomicUnits.toString();
  }

  async saveBundle(bundle: Buffer, tags: BundleTag[]) {
    const transactionOptions = {
      tags: [
        {
          name: "Content-Type",
          value: "text/plain",
        },
        ...tags,
      ],
    };

    const transaction = this.bundlrClient.createTransaction(
      bundle,
      transactionOptions
    );

    await transaction.sign();
    await transaction.upload();

    return {
      storageId: transaction.id,
      storageData: Buffer.from(transaction.data),
    };
  }

  async retrieveBundle(storageId: string, timeout: number) {
    const { data: storageData } = await axios.get(
      `https://arweave.net/${storageId}`,
      { responseType: "arraybuffer", timeout }
    );

    return { storageId, storageData };
  }
}
