/**
 * Interface of Cache.
 *
 * The Cache is responsible for caching data before its validated and stored on the Storage Provider.
 * It functiones like a simple key value store.
 *
 * @interface ICache
 */
export interface ICache {
  /**
   * Name of the cache. This should be unique for every cache.
   *
   * @property name
   * @type {string}
   */
  name: string;

  /**
   * Storage path of the cache. This should be the path to the folder where the data is cached.
   *
   * @property name
   * @type {string}
   */
  path: string;

  /**
   * Initializes the Cache with a storage path. This method is responsible
   * for setting up the folder where data will be cached.
   *
   * @method init
   * @param {string} path folder path where the data is cached
   * @return {this}
   */
  init(path: string): this;

  /**
   * Saves the value with a key
   *
   * @method put
   * @param {string} key
   * @param {any} value
   * @return {Promise<void>}
   */
  put(key: string, value: any): Promise<void>;

  /**
   * Loads the value from a key
   *
   * @method get
   * @param {string} key
   * @return {Promise<any>}
   */
  get(key: string): Promise<any>;

  /**
   * Checks whether a value exists for a key
   *
   * @method exists
   * @param {string} key
   * @return {Promise<boolean>}
   */
  exists(key: string): Promise<boolean>;

  /**
   * Deletes the value from a key
   *
   * @method del
   * @param {string} key
   * @return {Promise<void>}
   */
  del(key: string): Promise<void>;

  /**
   * Deletes the entire cache and therefore all values
   *
   * @method drop
   * @return {Promise<void>}
   */
  drop(): Promise<void>;
}
