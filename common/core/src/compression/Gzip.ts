import { gunzipSync, gzipSync } from "zlib";
import { DataItem, ICompression } from "../types";

export class Gzip implements ICompression {
  public name = "Gzip";

  async compress(data: Buffer) {
    // return gzipSync(Buffer.from(JSON.stringify(bundle)));
    return gzipSync(data);
  }

  async decompress(data: Buffer) {
    // return JSON.parse(gunzipSync(data).toString());
    return gunzipSync(data);
  }
}
