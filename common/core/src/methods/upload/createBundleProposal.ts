import { Node } from "../..";
import { bundleToBytes, sha256 } from "../../utils";
import { DataItem } from "../../types";

/**
 * createBundleProposal assembles a bundle proposal by loading
 * data from the local cache and uploading it to a storage provider.
 * After the data was successfully saved the node submits the bundle
 * proposal with the storage id and other information to the network
 * so that other participants can validate and vote on it.
 *
 * If one of the steps fails the node should skip it's uploader role
 * to prevent slashes.
 *
 * @method createBundleProposal
 * @param {Node} this
 * @return {Promise<void>}
 */
export async function createBundleProposal(this: Node): Promise<void> {
  try {
    this.logger.info(`Loading bundle from cache to create a bundle proposal`);

    // create bundle proposal from current to height of current bundle proposal
    // if there is no bundle proposal create the bundle from the current pool height
    const fromHeight =
      +this.pool.bundle_proposal!.to_height || +this.pool.data!.current_height;

    // create the bundle proposal from the previously determined start height
    // until the max bundle size specified by the pool
    const toHeight = +this.pool.data!.max_bundle_size + fromHeight;

    // determine current key of pool for tagging purposes
    const fromKey =
      this.pool.bundle_proposal!.to_key || this.pool.data!.current_key;

    // load bundle proposal from local cache
    const bundleProposal: DataItem[] = [];

    // here we try to fetch data items from the current height
    // to the proposal height. If we fail before we simply
    // abort and and submit the data collected we have available
    // right now
    for (let h = fromHeight; h < toHeight; h++) {
      try {
        // try to get the data item from local cache
        const item = await this.cache.get(h);
        bundleProposal.push(item);
      } catch {
        // if the data item was not found simply abort
        // and submit what we just have now
        break;
      }
    }

    // if no data was found on the cache skip the uploader role
    // so that this node does not receive an upload slash
    if (!bundleProposal.length) {
      await this.skipUploaderRole(fromHeight);
    }

    // get the last key of the bundle proposal which gets
    // included in the bundle proposal and saved on chain
    const toKey = bundleProposal.at(-1)?.key ?? "";

    // get the last value of the bundle proposal and format
    // it so it can be included in the bundle proposal and
    // saved on chain
    const toValue =
      (await this.runtime.formatValue(bundleProposal.at(-1)?.value)) ?? "";

    // if data was found on the cache proceed with compressing the
    // bundle for the upload to the storage provider
    const storageProviderData = await this.compression.compress(
      bundleToBytes(bundleProposal)
    );

    // hash the raw data which gets uploaded to the storage provider
    // with sha256
    const bundleHash = sha256(storageProviderData);

    // create tags for bundle to make it easier to find KYVE data
    // on the storage provider itself
    const tags: [string, string][] = [
      ["Application", "KYVE"],
      ["ChainId", await this.client.nativeClient.getChainId()],
      ["Pool", this.poolId.toString()],
      ["@kyve/core", this.coreVersion],
      [this.runtime.name, this.runtime.version],
      ["Uploader", this.client.account.address],
      ["FromHeight", fromHeight.toString()],
      ["ToHeight", (fromHeight + bundleProposal.length).toString()],
      ["Size", bundleProposal.length.toString()],
      ["FromKey", fromKey],
      ["ToKey", toKey],
      ["Value", toValue],
      ["BundleHash", bundleHash],
    ];

    // try to upload the bundle proposal to the storage provider
    // if the upload fails the node should immediately skip the
    // uploader role to prevent upload slashes
    try {
      this.logger.debug(`Attempting to save bundle on storage provider`);

      // upload the bundle proposal to the storage provider
      // and get a storage id. With that other participants in the
      // network can retrieve the data again and validate it
      const storageId = await this.storageProvider.saveBundle(
        storageProviderData,
        tags
      );

      this.m.storage_provider_save_successful.inc();

      this.logger.info(
        `Saved bundle on StorageProvider:${this.storageProvider.name} with storage id "${storageId}"\n`
      );

      // if the bundle was successfully uploaded to the storage provider
      // the node can finally submit the actual bundle proposal to
      // the network
      await this.submitBundleProposal(
        storageId,
        storageProviderData.byteLength,
        fromHeight,
        fromHeight + bundleProposal.length,
        fromKey,
        toKey,
        toValue,
        bundleHash
      );
    } catch (error) {
      this.logger.warn(
        ` Failed to save bundle on StorageProvider:${this.storageProvider.name}`
      );
      this.logger.debug(error);

      this.m.storage_provider_save_failed.inc();

      // if the bundle fails to the uploaded to the storage provider
      // let the node skip the uploader role and continue
      await this.skipUploaderRole(fromHeight);
    }
  } catch (error) {
    this.logger.error(
      `Unexpected error creating bundle proposal. Skipping proposal ...`
    );
    this.logger.debug(error);
  }
}
