import { Node } from "../..";
import { bytesToBundle } from "../../utils";
import { DataItem } from "../../types";

/**
 * saveBundleDecompress decompresses a bundle with the specified compression.
 * It never throws an error and returns no data if one occurs.
 *
 * @method saveBundleDecompress
 * @param {Node} this
 * @param {Buffer} rawStorageData
 * @return {Promise<DataItem[]>}
 */
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
