import { DataItem, IRuntime, Node, sha256 } from '@kyve/core';
import { name, version } from '../package.json';
import { providers } from 'ethers';

export default class EVM implements IRuntime {
  public name = name;
  public version = version;

  public async getDataItemByKey(core: Node, key: string): Promise<DataItem> {
    try {
      // set network settings if available
      let network;

      if (core.poolConfig.chainId && core.poolConfig.chainName) {
        network = {
          chainId: core.poolConfig.chainId,
          name: core.poolConfig.chainName,
        };
      }

      // get auth headers for coinbase cloud endpoints
      const headers = await this.generateCoinbaseCloudHeaders(core);

      // setup web3 provider
      const provider = new providers.StaticJsonRpcProvider(
        {
          url: core.poolConfig.rpc,
          headers,
        },
        network
      );

      // fetch data item
      const value = await provider.getBlockWithTransactions(+key);

      // throw if data item is not available
      if (!value) throw new Error();

      // Delete the number of confirmations from a transaction to keep data deterministic.
      value.transactions.forEach(
        (tx: Partial<providers.TransactionResponse>) => delete tx.confirmations
      );

      return {
        key,
        value,
      };
    } catch (err) {
      throw err;
    }
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
    return bundle.at(-1)?.value?.hash ?? '';
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
