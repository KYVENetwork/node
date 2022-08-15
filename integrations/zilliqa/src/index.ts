import { Node, Arweave, Gzip, JsonFileCache } from "@kyvenetwork/core";

import Zilliqa from "./runtime";

new Node()
  .addRuntime(new Zilliqa())
  .addStorageProvider(new Arweave())
  .addCompression(new Gzip())
  .addCache(new JsonFileCache())
  .bootstrap();
