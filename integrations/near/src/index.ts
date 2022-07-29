import { Node, Arweave, Gzip, JsonFileCache } from '@kyve/core';

import Near from './runtime';

new Node()
  .addRuntime(new Near())
  .addStorageProvider(new Arweave())
  .addCompression(new Gzip())
  .addCache(new JsonFileCache())
  .start();
