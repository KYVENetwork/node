/**
 * Interface of Backend.
 *
 * The Backend is responsible for managing keys like the account mnemonics
 *
 * @interface IBackend
 */
export interface IBackend {
  /**
   * Add a new key
   *
   * @method add
   * @param {string} name
   * @param {string} mnemonic
   * @return {Promise<void>}
   */
  add(name: string, mnemonic: string): Promise<void>;

  /**
   * Remove an existing key
   *
   * @method remove
   * @param {string} name
   * @return {Promise<void>}
   */
  remove(name: string): Promise<void>;

  /**
   * Get the value of a key
   *
   * @method get
   * @param {string} name
   * @return {Promise<string | null>}
   */
  get(name: string): Promise<string | null>;

  /**
   * List all keys
   *
   * @method list
   * @return {Promise<void>}
   */
  list(): Promise<void>;

  /**
   * Reset file backend
   *
   * @method reset
   * @return {Promise<void>}
   */
  reset(): Promise<void>;
}
