import { Node } from "../..";
import { bytesToBundle, standardizeJSON } from "../../utils";
import { DataItem } from "../../types";
import { compressionFactory } from "../../reactors/compression";

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
    // get compression the proposed bundle was compressed with
    this.logger.debug(
      `compressionFactory(${this.pool.bundle_proposal?.compression ?? 0})`
    );
    const compression = compressionFactory(
      this.pool.bundle_proposal?.compression ?? 0
    );

    this.logger.debug(`this.compression.decompress($RAW_STORAGE_DATA)`);

    const storageBundle = bytesToBundle(
      await compression.decompress(rawStorageData)
    );

    this.logger.info(
      `Successfully decompressed bundle with Compression:${compression.name}`
    );

    return storageBundle;
  } catch (err) {
    this.logger.error(
      `Could not decompress bundle with Compression. Continuing ...`
    );
    this.logger.error(standardizeJSON(err));

    return [];
  }
}
