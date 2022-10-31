import { DataItem, IRuntime, Node, sha256 } from '@kyve/core-beta';
import { VoteType } from '@kyve/proto-beta/dist/proto/kyve/bundles/v1beta1/tx';
import { name, version } from '../package.json';
import { fetchBlock } from './utils';

export default class Cosmos implements IRuntime {
  public name = name;
  public version = version;

  async getDataItem(core: Node, key: string): Promise<DataItem> {
    const headers = await this.generateCoinbaseCloudHeaders(core);

    const block = await fetchBlock(core.poolConfig.source, +key, headers);

    return { key, value: block };
  }

  async transformDataItem(item: DataItem) {
    // don't transform data item
    return item;
  }

  async validateBundle(
    core: Node,
    proposedBundle: DataItem[],
    validationBundle: DataItem[]
  ) {
    const proposedBundleHash = sha256(
      Buffer.from(JSON.stringify(proposedBundle))
    );
    const validationBundleHash = sha256(
      Buffer.from(JSON.stringify(validationBundle))
    );

    return proposedBundleHash === validationBundleHash
      ? VoteType.VOTE_TYPE_YES
      : VoteType.VOTE_TYPE_NO;
  }

  async summarizeBundle(bundle: DataItem[]): Promise<string> {
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
