import { Node, Arweave, Gzip, JsonFileCache } from "@kyve/core";

import Bitcoin from "./runtime";

new Node()
  .addRuntime(new Bitcoin())
  .addStorageProvider(new Arweave())
  .addCompression(new Gzip())
  .addCache(new JsonFileCache())
  .bootstrap();
