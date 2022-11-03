import { DataItem, IRuntime, Node, sha256 } from '@kyve/core-beta';
import { VoteType } from '@kyve/proto-beta/client/kyve/bundles/v1beta1/tx';
import { name, version } from '../package.json';
import { fetchBlock } from './utils';

export default class Celo implements IRuntime {
  public name = name;
  public version = version;

  async getDataItem(core: Node, key: string): Promise<DataItem> {
    let block;

    try {
      block = await fetchBlock(core.poolConfig.source, +key);
    } catch (err) {
      throw err;
    }

    if (!block) throw new Error();

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
      ? VoteType.VOTE_TYPE_VALID
      : VoteType.VOTE_TYPE_INVALID;
  }

  async summarizeBundle(bundle: DataItem[]): Promise<string> {
    return bundle.at(-1)?.value?.hash ?? '';
  }

  async nextKey(key: string): Promise<string> {
    return (parseInt(key) + 1).toString();
  }
}
