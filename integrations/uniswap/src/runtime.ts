import { DataItem, IRuntime, sha256, Node } from '@kyve/core-beta';
import { name, version } from '../package.json';
import { BigNumber as EthersBigNumber, providers, utils } from 'ethers';
import BigNumber from 'bignumber.js';

// method to just get the named args
const parseArgs = (struct: any) => {
  const parsedStruct = { ...struct };
  const keyLength = Object.keys(struct).length / 2;

  for (let i = 0; i < keyLength; i++) {
    delete parsedStruct[i];
  }

  return parsedStruct;
};

class EvmContractEvents implements IRuntime {
  public name = name;
  public version = version;

  async getDataItem(core: any, source: string, key: string): Promise<DataItem> {
    try {
      // setup web3 provider
      const provider = new providers.StaticJsonRpcProvider(source);

      // interface of contract-ABI for decoding the logs
      let iface = new utils.Interface(core.poolConfig.contract.abi);

      // try to fetch data item
      const logs = await provider.getLogs({
        address: core.poolConfig.contract.address,
        fromBlock: parseInt(key),
        toBlock: parseInt(key),
      });

      const value = logs.map((log) => {
        const info = iface.parseLog(log);

        return {
          ...log,
          parsedEvent: {
            name: info.name,
            signature: info.signature,
            args: parseArgs(info.args),
          },
        };
      });

      // throw if data item is not available
      if (!value) throw new Error();

      return {
        key,
        value,
      };
    } catch (err) {
      throw err;
    }
  }

  async transformDataItem(item: DataItem): Promise<DataItem> {
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
    return '';
  }

  async nextKey(key: string): Promise<string> {
    return (parseInt(key) + 1).toString();
  }
}

export default class UniswapEvents extends EvmContractEvents {
  public name = name;
  public version = version;

  async summarizeDataBundle(bundle: DataItem[]): Promise<string> {
    let summary = '';
    bundle.forEach((item) => {
      if (item.value.length) {
        item.value.forEach((log: any) => {
          if (log.parsedEvent.name === 'Swap') {
            console.log(log.parsedEvent.args.sqrtPriceX96.toString());
            let sqrtPriceX96 = new BigNumber(
              EthersBigNumber.from(log.parsedEvent.args.sqrtPriceX96).toString()
            );
            console.log(sqrtPriceX96.toString());
            let r0 = new BigNumber(sqrtPriceX96)
              .pow(2)
              .div(new BigNumber(2).pow(192));
            console.log(r0.toString());
            let price = new BigNumber(1)
              .div(r0.div(new BigNumber(10).pow(12)))
              .toFixed(2);
            summary = price.toString();
            console.log(summary);
          }
        });
      }
    });
    return summary;
  }
}
