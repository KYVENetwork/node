export type BundleTag = {
  name: string;
  value: string;
};

/**
 * Interface of Storage Provider.
 *
 * The Storage Provider handles data storage and retrieval for a pool. Usually these
 * Storage Providers are decentralized and are meant to store pool data.
 *
 * @interface IStorageProvider
 */
export interface IStorageProvider {
  /**
   * Name of the storage provider. This should be unique for every storage provider.
   *
   * @property name
   * @type {string}
   */
  name: string;

  /**
   * How many decimals the native currency of the storage provider has
   *
   * @property decimals
   * @type {number}
   */
  decimals: number;

  /**
   * Initializes the Storage Provider with a wallet. This method is responsible
   * for setting up the wallet so the storage provider can save data
   *
   * @method init
   * @param {string} storagePriv can be a pk, a mnemonic or a keyfile which is used to setup the storage provider wallet
   * @return {void}
   */
  init(storagePriv: string): Promise<void>;

  /**
   * Gets the balance of the storage provider wallet
   *
   * @method getBalance
   * @return {Promise<string>}
   */
  getBalance(): Promise<string>;

  /**
   * Saves a bundle on the storage provider and returns a Storage Id
   *
   * @method saveBundle
   * @param {Buffer} bundle data of the bundle which will get saved
   * @param {BundleTag[]} tags metadata that should be included
   * @return {Promise<string>} returns a storage Id which should be able to retrieve the bundle again
   */
  saveBundle(bundle: Buffer, tags: BundleTag[]): Promise<string>;

  /**
   * Retrieves the bundle from the storage provider with the Storage Id
   *
   * @method retrieveBundle
   * @param {string} storageId storage Id from which the data of the bundle can be retrieved
   * @param {number} timeout timeout defines the download timeout in milliseconds
   * @return {Promise<Buffer>} returns the data of the bundle
   */
  retrieveBundle(storageId: string, timeout: number): Promise<Buffer>;
}
