import { DataItem, IRuntime, Node, sha256 } from "@kyve/core";
import { name, version } from "../package.json";
import { fetchBlock, fetchHeight } from "./utils";

export default class Zilliqa implements IRuntime {
  public name = name;
  public version = version;

  public async getDataItemByKey(core: Node, key: string): Promise<DataItem> {
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

    core.logger.debug(`Validating bundle proposal by hash`);
    core.logger.debug(`Uploaded:     ${proposedBundleHash}`);
    core.logger.debug(`Validation:   ${validationBundleHash}\n`);

    return proposedBundleHash === validationBundleHash;
  }

  public async nextKey(key: string): Promise<string> {
    return (parseInt(key) + 1).toString();
  }

  public async summarizeBundle(bundle: DataItem[]): Promise<string> {
    return bundle.at(-1)?.value?.hash ?? "";
  }
}
