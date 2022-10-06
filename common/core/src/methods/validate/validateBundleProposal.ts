import { Node } from "../..";
import { sha256, standardizeJSON, VOTE } from "../../utils";

/**
 * validateBundleProposal validates a proposed bundle proposal
 * by first downloading the proposed data bundle from the storage
 * provider and then comparing it with a locally created validation
 * bundle. Furthermore, custom validation from the runtime is applied
 * at the end.
 *
 * @method validateBundleProposal
 * @param {Node} this
 * @param {number} createdAt
 * @return {Promise<void>}
 */
export async function validateBundleProposal(
  this: Node,
  createdAt: number
): Promise<void> {
  try {
    this.logger.info(
      `Validating bundle with storage id "${
        this.pool.bundle_proposal!.storage_id
      }"`
    );

    // retrieve the data of the bundle proposal in a save way
    // by retrying the retrieval if it fails
    const storageProviderResult = await this.saveBundleDownload(createdAt);

    // if no bundle got returned it means that the pool is not active anymore
    // or a new bundle proposal round has started
    if (!storageProviderResult) {
      return;
    }

    // vote invalid if data hash does not match with proposed data hash
    if (
      this.pool.bundle_proposal!.bundle_hash !== sha256(storageProviderResult)
    ) {
      this.logger.info(
        `Found different hash on bundle downloaded from storage provider`
      );

      await this.voteBundleProposal(
        this.pool.bundle_proposal!.storage_id,
        VOTE.INVALID
      );
      return;
    }

    // vote invalid if data size does not match with proposed data size
    if (
      +this.pool.bundle_proposal!.byte_size !== storageProviderResult.byteLength
    ) {
      this.logger.info(
        `Found different byte size on bundle downloaded from storage provider`
      );

      await this.voteBundleProposal(
        this.pool.bundle_proposal!.storage_id,
        VOTE.INVALID
      );
      return;
    }

    // decompress the bundle with the specified compression type
    // and convert the bytes into a JSON format
    const proposedBundle = await this.saveBundleDecompress(
      storageProviderResult
    );

    // vote invalid if no valid data bundle could be found on raw
    // data from storage provider
    if (!proposedBundle.length) {
      this.logger.info(`Found no valid data bundle on storage provider`);

      await this.voteBundleProposal(
        this.pool.bundle_proposal!.storage_id,
        VOTE.INVALID
      );
      return;
    }

    const validationBundle = await this.saveLoadValidationBundle(createdAt);

    // if no bundle got returned it means that the pool is not active anymore
    // or a new bundle proposal round has started
    if (!validationBundle) {
      return;
    }

    // vote invalid if bundle key does not match with proposed key
    if (this.pool.bundle_proposal!.to_key !== validationBundle.at(-1)?.key) {
      this.logger.info(`Found different value on proposed bundle key`);

      await this.voteBundleProposal(
        this.pool.bundle_proposal!.storage_id,
        VOTE.INVALID
      );
      return;
    }

    // vote invalid if bundle value does not match with proposed value
    if (
      this.pool.bundle_proposal!.to_value !==
      (await this.runtime.formatValue(validationBundle.at(-1)?.value))
    ) {
      this.logger.info(`Found different value on proposed bundle value`);

      await this.voteBundleProposal(
        this.pool.bundle_proposal!.storage_id,
        VOTE.INVALID
      );
      return;
    }

    // perform custom runtime bundle validation
    const valid = await this.runtime.validate(
      this,
      standardizeJSON(proposedBundle),
      standardizeJSON(validationBundle)
    );

    if (valid) {
      await this.voteBundleProposal(
        this.pool.bundle_proposal!.storage_id,
        VOTE.VALID
      );
    } else {
      await this.voteBundleProposal(
        this.pool.bundle_proposal!.storage_id,
        VOTE.INVALID
      );
    }

    // update metrics
    this.m.bundles_amount.inc();
    this.m.bundles_data_items.set(proposedBundle.length);
    this.m.bundles_byte_size.set(+storageProviderResult.byteLength);
  } catch (error) {
    this.logger.error(
      `Unexpected error validating bundle proposal. Skipping validation ...`
    );
    this.logger.debug(error);
  }
}
