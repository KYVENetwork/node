import { Node, Arweave, Gzip, JsonFileCache } from '@kyvenetwork/core';

import Solana from './runtime';

new Node()
  .addRuntime(new Solana())
  .addStorageProvider(new Arweave())
  .addCompression(new Gzip())
  .addCache(new JsonFileCache())
  .start();
