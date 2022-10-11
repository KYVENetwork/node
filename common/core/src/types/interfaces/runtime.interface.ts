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
   * @method getDataItemByKey
   * @param {Node} core the class of @kyve/core
   * @param {string} key which gets inserted by @kyve/core
   * @return {Promise<DataItem>}
   */
  getDataItemByKey(core: Node, key: string): Promise<DataItem>;

  /**
   * Validates a bundle proposal
   *
   * @method validateBundle
   * @param {Node} core the class of @kyve/core
   * @param {DataItem[]} proposedBundle is the bundle saved by the uploader on the storage provider
   * @param {DataItem[]} validationBundle is the bundle recreated locally by the validator
   * @return {Promise<boolean>} returns whether the bundle is valid or invalid
   */
  validateBundle(
    core: Node,
    proposedBundle: DataItem[],
    validationBundle: DataItem[]
  ): Promise<boolean>;

  /**
   * Gets the next key from the current key so that the data archived has an order.
   *
   * Deterministic behavior is required
   *
   * @method nextKey
   * @param {string} key which gets inserted by @kyve/core
   * @return {Promise<void>}
   */
  nextKey(key: string): Promise<string>;

  /**
   * Gets a formatted value string from a bundle. This produces a "summary" of
   * a bundle which gets stored on-chain and therefore needs to be short.
   *
   * String should not be longer than 100 characters, else gas costs might be too expensive.
   *
   * Deterministic behavior is required
   *
   * @method summarizeBundle
   * @param {DataItem[]} bundle is the bundle which needs to be summarized
   * @return {Promise<string>} returns a formatted value string
   */
  summarizeBundle(bundle: DataItem[]): Promise<string>;
}
