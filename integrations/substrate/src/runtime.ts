import { DataItem, IRuntime, Node, sha256 } from '@kyve/core-beta';
import { name, version } from '../package.json';
import { fetchBlock, isHeightOutOfRange } from './utils';

export default class Substrate implements IRuntime {
  public name = name;
  public version = version;

  async getDataItem(
    core: Node,
    source: string,
    key: string
  ): Promise<DataItem> {
    let block;

    const headers = await this.generateCoinbaseCloudHeaders(core);

    try {
      block = await fetchBlock(source, +key, headers);
    } catch (err) {
      if (isHeightOutOfRange(err)) throw new Error();

      throw err;
    }

    return { key, value: block };
  }

  async transformDataItem(core: Node, item: DataItem): Promise<DataItem> {
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

  async summarizeDataBundle(core: Node, bundle: DataItem[]): Promise<string> {
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
