import { Node, Arweave, Gzip, JsonFileCache } from '@kyvenetwork/core';

import Cosmos from './runtime';

new Node()
  .addRuntime(new Cosmos())
  .addStorageProvider(new Arweave())
  .addCompression(new Gzip())
  .addCache(new JsonFileCache())
  .start();



