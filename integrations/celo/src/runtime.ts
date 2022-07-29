import { DataItem, IRuntime, Node } from '@kyve/core';
import { name, version } from '../package.json';
import { fetchBlock } from './utils';

export default class Celo implements IRuntime {
  public name = name;
  public version = version;

  public async getDataItem(core: Node, key: string): Promise<DataItem> {
    let block;

    try {
      block = await fetchBlock(core.poolConfig.rpc, +key);
    } catch (err) {
      throw err;
    }

    if (!block) throw new Error();

    return { key, value: block };
  }

  public async getNextKey(key: string): Promise<string> {
    return (parseInt(key) + 1).toString();
  }

  public async formatValue(value: any): Promise<string> {
    return value.hash;
  }
}
