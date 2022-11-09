import { DataItem, IRuntime, Node, sha256 } from "@kyve/core-beta";
import { name, version } from "../package.json";
import { fetchBlock, fetchHeight } from "./utils";

export default class Zilliqa implements IRuntime {
  public name = name;
  public version = version;

  async getDataItem(
    core: Node,
    source: string,
    key: string
  ): Promise<DataItem> {
    let block;

    const height = await fetchHeight(source);
    if (+key > height) throw new Error();

    try {
      block = await fetchBlock(source, +key);
    } catch (err) {
      throw err;
    }

    return { key, value: block };
  }

  async transformDataItem(item: DataItem): Promise<DataItem> {
    // don't transform data item
    return item;
  }

  async validateDataItem(
    core: Node,
    proposedDataItem: DataItem,
    validationDataItem: DataItem
  ): Promise<boolean> {
    const proposedDataItemHash = sha256(
      Buffer.from(JSON.stringify(proposedDataItem))
    );
    const validationDataItemHash = sha256(
      Buffer.from(JSON.stringify(validationDataItem))
    );

    return proposedDataItemHash === validationDataItemHash;
  }

  async summarizeDataBundle(bundle: DataItem[]): Promise<string> {
    return bundle.at(-1)?.value?.hash ?? "";
  }

  async nextKey(key: string): Promise<string> {
    return (parseInt(key) + 1).toString();
  }
}
