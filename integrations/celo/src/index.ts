import { Node, Arweave, Gzip, JsonFileCache } from '@kyve/core';

import Celo from './runtime';

new Node()
  .addRuntime(new Celo())
  .addStorageProvider(new Arweave())
  .addCompression(new Gzip())
  .addCache(new JsonFileCache())
  .start();




