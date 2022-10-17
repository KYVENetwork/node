import { Node } from "../..";
import { bytesToBundle, standardizeJSON } from "../../utils";
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
    this.logger.debug(`this.compression.decompress($RAW_STORAGE_DATA)`);

    const storageBundle = bytesToBundle(
      await this.compression.decompress(rawStorageData)
    );

    this.logger.info(
      `Successfully decompressed bundle with Compression:${this.compression.name}`
    );

    return storageBundle;
  } catch (err) {
    this.logger.error(
      `Could not decompress bundle with Compression:${this.compression.name}. Continuing ...`
    );
    this.logger.error(standardizeJSON(err));

    return [];
  }
}
