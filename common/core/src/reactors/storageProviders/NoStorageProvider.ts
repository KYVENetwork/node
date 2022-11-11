import { sha256 } from "../..";
import { IStorageProvider } from "../../types";

export class NoStorageProvider implements IStorageProvider {
  public name = "NoStorageProvider";
  public decimals = 0;

  async init() {
    return this;
  }

  async getBalance() {
    return "0";
  }

  async saveBundle(bundle: Buffer) {
    return {
      storageId: sha256(bundle),
      storageData: Buffer.from(""),
    };
  }

  async retrieveBundle(storageId: string) {
    return {
      storageId,
      storageData: Buffer.from(""),
    };
  }
}
