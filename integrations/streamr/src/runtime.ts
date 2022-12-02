import { DataItem, IRuntime, Node, sha256 } from '@kyve/core-beta';
const StreamrClient = require('streamr-client');

import { name, version } from '../package.json';

export default class Streamr implements IRuntime {
  public name = name;
  public version = version;

  async getDataItem(
    core: Node,
    source: string,
    key: string
  ): Promise<DataItem> {
    const streamr = new StreamrClient();
    const group = [];

    const fromTimestamp = parseInt(key);
    const toTimestamp = parseInt(await this.nextKey(key));

    if (Date.now() < toTimestamp) {
      throw new Error('reached live limit');
    }

    const stream = await streamr.resend(source, {
      from: {
        timestamp: fromTimestamp,
      },
      to: {
        timestamp: toTimestamp,
      },
    });

    for await (let item of stream) {
      group.push(item);
    }

    return {
      key,
      value: group,
    };
  }

  async transformDataItem(_: Node, item: DataItem): Promise<DataItem> {
    return item;
  }

  async validateDataItem(
    _: Node,
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

  async summarizeDataBundle(_: Node, __: DataItem[]): Promise<string> {
    return '';
  }

  async nextKey(key: string): Promise<string> {
    return (parseInt(key) + 1000 * 60).toString();
  }
}
