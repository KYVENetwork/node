import { Node, Arweave, Gzip, JsonFileCache } from '@kyve/core';

import Substrate from './runtime';

new Node()
  .addRuntime(new Substrate())
  .addStorageProvider(new Arweave())
  .addCompression(new Gzip())
  .addCache(new JsonFileCache())
  .bootstrap();
