import { name, version } from '../package.json';
import { BigNumber as EthersBigNumber } from 'ethers';
import EvmContractEvents from './evm-contract-events';
import { DataItem, Node } from '@kyve/core-beta';

export default class UniswapEvents extends EvmContractEvents {
  public name = name;
  public version = version;

  async summarizeDataBundle(core: Node, bundle: DataItem[]): Promise<string> {
    let summary = '';
    bundle.forEach((item) => {
      if (item.value.length) {
        item.value.forEach((log: any) => {
          if (log.parsedEvent.name === 'Swap') {
            summary = EthersBigNumber.from(
              log.parsedEvent.args.sqrtPriceX96
            ).toString();
          }
        });
      }
    });
    return summary;
  }
}
