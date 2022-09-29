import { Bundle, DataItem, Node } from "..";
import { sleep, sha256, ERROR_IDLE_TIME, bundleToBytes } from "../utils";

export async function uploadBundle(
  this: Node,
  createdAt: number,
  fromHeight: number,
  toHeight: number,
  fromKey: string
): Promise<{
  storageId: string;
  bundleProposal: Bundle;
  compressedBundle: Buffer;
  bundleHash: string;
} | null> {
  let uploadReceipt = {
    storageId: "",
    bundleProposal: {
      bundle: [] as DataItem[],
      toKey: "",
      toValue: "",
    },
    compressedBundle: Buffer.from(""),
    bundleHash: "",
  };

  while (!uploadReceipt.storageId) {
    await this.syncPoolState();

    if (+this.pool.bundle_proposal!.created_at > createdAt) {
      // check if new proposal is available in the meantime
      return null;
    } else if (this.shouldIdle()) {
      // check if pool got paused in the meantime
      return null;
    }

    this.logger.debug(`Loading bundle from cache to create bundle proposal`);

    uploadReceipt.bundleProposal = await this.loadBundle(fromHeight, toHeight);

    if (!uploadReceipt.bundleProposal.bundle.length) {
      break;
    }

    try {
      this.logger.info(
        `Created bundle of length ${uploadReceipt.bundleProposal.bundle.length}`
      );
      this.logger.debug(
        `Compressing bundle with compression type Compression:${this.compression.name}`
      );

      const bundleBytes = bundleToBytes(uploadReceipt.bundleProposal.bundle);
      uploadReceipt.compressedBundle = await this.compression.compress(
        bundleBytes
      );
      uploadReceipt.bundleHash = sha256(uploadReceipt.compressedBundle);

      const tags: [string, string][] = [
        ["Application", "KYVE"],
        ["Network", this.network],
        ["Pool", this.poolId.toString()],
        ["@kyve/core", this.coreVersion],
        [this.runtime.name, this.runtime.version],
        ["Uploader", this.client.account.address],
        ["FromHeight", fromHeight.toString()],
        [
          "ToHeight",
          (fromHeight + uploadReceipt.bundleProposal.bundle.length).toString(),
        ],
        ["Size", uploadReceipt.bundleProposal.bundle.length.toString()],
        ["FromKey", fromKey],
        ["ToKey", uploadReceipt.bundleProposal.toKey],
        ["Value", uploadReceipt.bundleProposal.toValue],
        ["BundleHash", uploadReceipt.bundleHash],
      ];

      this.logger.debug(`Attempting to save bundle on storage provider`);

      uploadReceipt.storageId = await this.storageProvider.saveBundle(
        uploadReceipt.compressedBundle,
        tags
      );
      this.prom.storage_provider_save_successful.inc();

      this.logger.info(
        `Saved bundle on StorageProvider:${this.storageProvider.name} with Storage Id "${uploadReceipt.storageId}"\n`
      );
    } catch (error) {
      this.logger.warn(
        ` Failed to save bundle on StorageProvider:${this.storageProvider.name}. Retrying in 10s ...`
      );
      this.logger.debug(error);
      this.prom.storage_provider_save_failed.inc();

      await sleep(ERROR_IDLE_TIME);
    }
  }

  return uploadReceipt;
}
