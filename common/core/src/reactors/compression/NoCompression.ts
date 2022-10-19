import { DataItem, ICompression } from "../../types";

export class NoCompression implements ICompression {
  public name = "NoCompression";

  async compress(data: Buffer) {
    return data;
  }

  async decompress(data: Buffer) {
    return data;
  }
}
