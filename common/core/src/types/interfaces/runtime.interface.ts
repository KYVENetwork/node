import { VoteType } from "@kyve/proto-beta/client/kyve/bundles/v1beta1/tx";
import { DataItem } from "..";
import { Node } from "../..";

export type VoteOptions = typeof VoteType;

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
   * Transforms a single data item and return it. Used for example
   * to remove unecessary data or format the data in a better way.
   *
   * Deterministic behavior is required
   *
   * @method transformDataItem
   * @param {DataItem} item data item which gets transformed
   * @return {Promise<DataItem>}
   */
  transformDataItem(item: DataItem): Promise<DataItem>;

  /**
   * Validates a bundle proposal
   *
   * @method validateBundle
   * @param {Node} core the class of @kyve/core
   * @param {DataItem[]} proposedBundle is the bundle saved by the uploader on the storage provider
   * @param {DataItem[]} validationBundle is the bundle recreated locally by the validator
   * @param {VoteOptions} voteOptions is the enum which holds all available vote options
   * @return {Promise<VoteType>} returns the vote type the node should vote with
   */
  validateBundle(
    core: Node,
    proposedBundle: DataItem[],
    validationBundle: DataItem[],
    voteOptions: VoteOptions
  ): Promise<VoteType>;

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
}
