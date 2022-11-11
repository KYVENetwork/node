import { StaticCeloProvider } from '@celo-tools/celo-ethers-wrapper';
import { BlockWithTransactions } from '@ethersproject/abstract-provider';
import { providers } from 'ethers';

export async function fetchBlock(
  endpoint: string,
  height: number
): Promise<any> {
  const provider = new StaticCeloProvider(endpoint);
  const block = (await provider.getBlockWithTransactions(height)) as Omit<
    BlockWithTransactions,
    'extraData'
  > & { extraData?: string };

  // The block is always defined, unless the height is out of range.
  if (block) {
    // Delete the number of confirmations from a transaction to maintain determinism.
    block.transactions.forEach(
      (tx: Partial<providers.TransactionResponse>) => delete tx.confirmations
    );

    // TODO: Figure out why `extraData` varies for some blocks.
    delete block.extraData;
  }

  return block;
}
