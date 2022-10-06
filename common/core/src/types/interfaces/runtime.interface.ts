import { DataItem } from "..";
import { Node } from "../..";

/**
 * Interface of Runtime.
 *
 * The Runtime implements the custom logic of a pool and defines how data
 * items are fetched and which order they should have.
 *
 * @interface IRuntime
 */
export interface IRuntime {
  /**
   * Name of the runtime. This should be unique for every runtime and should
   * later match the runtime of the pool
   *
   * @property name
   * @type {string}
   */
  name: string;

  /**
   * Version of the runtime. This is used for checking if the node runs the correct
   * runtime version specified by the pool
   *
   * @property version
   * @type {string}
   */
  version: string;

  /**
   * Gets the data item from a specific key and returns both key and the value.
   *
   * Deterministic behavior is required
   *
   * @method getDataItem
   * @param {Node} core the class of @kyve/core
   * @param {string} key which gets inserted by @kyve/core
   * @return {Promise<DataItem>}
   */
  getDataItem(core: Node, key: string): Promise<DataItem>;

  /**
   * Validates a bundle proposal
   *
   * @method validate
   * @param {Node} core the class of @kyve/core
   * @param {DataItem[]} uploadedBundle is the bundle saved by the uploader on the storage provider
   * @param {DataItem[]} validationBundle is the bundle recreated locally by the validator
   * @return {Promise<boolean>} returns whether the bundle is valid or invalid
   */
  validate(
    core: Node,
    uploadedBundle: DataItem[],
    validationBundle: DataItem[]
  ): Promise<boolean>;

  /**
   * Gets the next key from the current key so that the data archived has an order.
   *
   * Deterministic behavior is required
   *
   * @method getNextKey
   * @param {string} key which gets inserted by @kyve/core
   * @return {Promise<void>}
   */
  getNextKey(key: string): Promise<string>;

  /**
   * Gets a formatted value string from a data item which gets saved on chain
   * to enable oracles to use the data.
   *
   * String should not be longer than 100 characters, else gas costs might be too expensive.
   *
   * Deterministic behavior is required
   *
   * @method formatValue
   * @param {any} value is the last data value in a bundle
   * @return {Promise<string>} returns a formatted value string
   */
  formatValue(value: any): Promise<string>;
}
