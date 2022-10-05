import { Node } from "../..";
import { bytesToBundle } from "../../utils";
import { DataItem } from "../../types";

export async function saveBundleDecompress(
  this: Node,
  rawStorageData: Buffer
): Promise<DataItem[]> {
  try {
    const storageBundle = bytesToBundle(
      await this.compression.decompress(rawStorageData)
    );

    this.logger.info(
      `Successfully decompressed bundle with compression type Compression:${this.compression.name}`
    );

    return storageBundle;
  } catch (error) {
    this.logger.info(
      `Could not decompress bundle with compression type Compression:${this.compression.name}`
    );

    return [];
  }
}
