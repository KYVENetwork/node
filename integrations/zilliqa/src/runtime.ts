import { DataItem, IRuntime, Node } from "@kyve/core";
import { name, version } from "../package.json";
import { fetchBlock, fetchHeight } from "./utils";

export default class Zilliqa implements IRuntime {
  public name = name;
  public version = version;

  public async getDataItem(core: Node, key: string): Promise<DataItem> {
    let block;

    const height = await fetchHeight(core.poolConfig.rpc);
    if (+key > height) throw new Error();

    try {
      block = await fetchBlock(core.poolConfig.rpc, +key);
    } catch (err) {
      throw err;
    }

    return { key, value: block };
  }

  public async getNextKey(key: string): Promise<string> {
    return (parseInt(key) + 1).toString();
  }

  public async formatValue(value: any): Promise<string> {
    return value.hash;
  }
}
