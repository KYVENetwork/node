import { NoStorageProvider } from "./NoStorageProvider";
import { Arweave } from "./Arweave";
import { Bundlr } from "./Bundlr";
import { IStorageProvider } from "../..";

export const storageProviderFactory = async (
  storageProvider: number,
  storagePriv: string
): Promise<IStorageProvider> => {
  switch (storageProvider) {
    case 1:
      return await new Arweave().init(storagePriv);
    case 2:
      return await new Bundlr().init(storagePriv);
    default:
      return await new NoStorageProvider().init(storagePriv);
  }
};
