import { gunzipSync, gzipSync } from "zlib";
import { DataItem, ICompression } from "../types";

export class Gzip implements ICompression {
  public name = "Gzip";

  async compress(data: Buffer) {
    return gzipSync(data);
  }

  async decompress(data: Buffer) {
    return gunzipSync(data);
  }
}
