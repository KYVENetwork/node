import { DataItem, IRuntime, Node, sha256 } from "@kyve/core";
import { name, version } from "../package.json";
import { fetchBlock, fetchBlockHash } from "./utils";

export default class Bitcoin implements IRuntime {
  public name = name;
  public version = version;

  public async getDataItemByKey(core: Node, key: string): Promise<DataItem> {
    let hash: string;
    let block: any;

    const headers = await this.generateCoinbaseCloudHeaders(core);

    try {
      hash = await fetchBlockHash(
        "https://proxy.alpha.kyve.network/bitcoin",
        +key,
        headers
      );
    } catch (err) {
      console.log(err);
      // The only time this should fail is if the height is out of range.
      throw err;
    }

    try {
      block = await fetchBlock(
        "https://proxy.alpha.kyve.network/bitcoin",
        hash,
        headers
      );
    } catch (err) {
      console.log(err);
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

  private async generateCoinbaseCloudHeaders(core: Node): Promise<any> {
    // requestSignature for coinbase cloud
    const address = core.client.account.address;
    const timestamp = new Date().valueOf().toString();
    const poolId = core.pool.id;

    const { signature, pub_key } = await core.client.signString(
      `${address}//${poolId}//${timestamp}`
    );

    return {
      "Content-Type": "application/json",
      Signature: signature,
      "Public-Key": pub_key.value,
      "Pool-ID": poolId,
      Timestamp: timestamp,
    };
  }
}
