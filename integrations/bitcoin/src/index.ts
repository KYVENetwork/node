import { Node, Arweave, Gzip, JsonFileCache } from "@kyvenetwork/core";

import Bitcoin from "./runtime";

new Node()
  .addRuntime(new Bitcoin())
  .addStorageProvider(new Arweave())
  .addCompression(new Gzip())
  .addCache(new JsonFileCache())
  .start();








