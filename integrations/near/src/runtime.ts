import { DataItem, IRuntime, Node, sha256 } from '@kyve/core-beta';

import { name, version } from '../package.json';
import { fetchBlock, fetchHeight, isBlockNotFound } from './utils';

export default class Near implements IRuntime {
  public name = name;
  public version = version;

  async getDataItem(
    core: Node,
    source: string,
    key: string
  ): Promise<DataItem> {
    let block;

    const headers = await this.generateCoinbaseCloudHeaders(core);

    const height = await fetchHeight(source, headers);
    if (+key > height) throw new Error();

    try {
      block = await fetchBlock(source, +key, headers);
    } catch (err) {
      if (isBlockNotFound(err)) return { key, value: null };

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
    return bundle.at(-1)?.value?.hash ?? '';
  }

  async nextKey(key: string): Promise<string> {
    return (parseInt(key) + 1).toString();
  }

  private async generateCoinbaseCloudHeaders(core: Node): Promise<any> {
    // requestSignature for coinbase cloud
    const address = core.client.account.address;
    const timestamp = new Date().valueOf().toString();
    const poolId = core.pool.id;

    const { signature, pub_key } = await core.client.signString(
      `${address}//${poolId}//${timestamp}`
    );

    return {
      'Content-Type': 'application/json',
      Signature: signature,
      'Public-Key': pub_key.value,
      'Pool-ID': poolId,
      Timestamp: timestamp,
    };
  }
}
