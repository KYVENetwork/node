import { connect } from 'near-api-js';
import { NearConfig } from 'near-api-js/lib/near';
import { Provider } from 'near-api-js/lib/providers';
import { ChunkResult } from 'near-api-js/lib/providers/provider';
import { NOT_FOUND } from './types';

export async function fetchHeight(
  endpoint: string,
  headers: any
): Promise<number> {
  const provider = await initialiseNearRPC(endpoint, headers);

  const latestBlock = await provider.block({
    finality: 'final',
  });

  return latestBlock.header.height;
}

export async function fetchBlock(
  endpoint: string,
  height: number,
  headers: any
): Promise<any> {
  const provider = await initialiseNearRPC(endpoint, headers);

  const block = await provider.block({
    blockId: height,
  });

  const chunks = await fetchChunks(
    endpoint,
    block.chunks.map((chunk) => chunk.chunk_hash),
    headers
  );

  return {
    ...block,
    chunks,
  };
}

async function fetchChunks(
  endpoint: string,
  hashes: string[],
  headers: any
): Promise<any[]> {
  const provider = await initialiseNearRPC(endpoint, headers);
  const chunks: ChunkResult[] = [];

  for (const hash of hashes) {
    const chunk = await provider.chunk(hash);
    chunks.push(chunk);
  }

  return chunks;
}

async function initialiseNearRPC(
  endpoint: string,
  headers: any
): Promise<Provider> {
  const config: NearConfig = {
    // @ts-ignore
    deps: {},
    networkId: 'mainnet',
    nodeUrl: endpoint,
    headers,
  };

  const client = await connect(config);
  return client.connection.provider;
}

export function isBlockNotFound(err: any): boolean {
  return new Error(err).message.includes(NOT_FOUND);
}
