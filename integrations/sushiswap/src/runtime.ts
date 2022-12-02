import { DataItem, Node } from '@kyve/core-beta';
import { BigNumber } from 'ethers';

import { name, version } from '../package.json';
import EvmContractEvents from './evm-contract-events';

export default class SushiswapEvents extends EvmContractEvents {
  public name = name;
  public version = version;

  async summarizeDataBundle(_: Node, bundle: DataItem[]): Promise<string> {
    let summary = '';
    bundle.forEach((item) => {
      if (item.value.length) {
        item.value.forEach((log: any) => {
          if (log.parsedEvent.name === 'Swap') {
            if (
              log.parsedEvent.args.amount0In.hex !== '0x00' &&
              log.parsedEvent.args.amount1In.hex === '0x00'
            ) {
              summary = BigNumber.from(log.parsedEvent.args.amount1Out.hex)
                .div(BigNumber.from(log.parsedEvent.args.amount0In.hex))
                .toString();
            }
            if (
              log.parsedEvent.args.amount1In.hex !== '0x00' &&
              log.parsedEvent.args.amount0In.hex === '0x00'
            ) {
              summary = BigNumber.from(log.parsedEvent.args.amount1In.hex)
                .div(BigNumber.from(log.parsedEvent.args.amount0Out.hex))
                .toString();
            }
          }
        });
      }
    });
    return summary;
  }
}
