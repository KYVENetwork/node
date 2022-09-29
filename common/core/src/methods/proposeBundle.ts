import { Node } from "..";

export async function proposeBundle(
  this: Node,
  createdAt: number
): Promise<void> {
  const fromHeight =
    +this.pool.bundle_proposal!.to_height || +this.pool.data!.current_height;
  const toHeight = +this.pool.data!.max_bundle_size + fromHeight;
  const fromKey =
    this.pool.bundle_proposal!.to_key || this.pool.data!.current_key;

  const uploadReceipt = await this.uploadBundle(
    createdAt,
    fromHeight,
    toHeight,
    fromKey
  );

  // new bundle was found
  if (uploadReceipt === null) {
    return;
  }

  let success = false;

  // repeat until transaction succeeds or new proposal round starts
  while (!success) {
    await this.syncPoolState();

    if (+this.pool.bundle_proposal!.created_at > createdAt) {
      // check if new proposal is available in the meantime
      return;
    } else if (this.shouldIdle()) {
      // check if pool got paused in the meantime
      return;
    }

    if (uploadReceipt.storageId) {
      success = await this.submitBundleProposal(
        uploadReceipt.storageId,
        uploadReceipt.compressedBundle.byteLength,
        fromHeight,
        fromHeight + uploadReceipt.bundleProposal.bundle.length,
        fromKey,
        uploadReceipt.bundleProposal.toKey,
        uploadReceipt.bundleProposal.toValue,
        uploadReceipt.bundleHash
      );
    } else {
      success = await this.skipUploaderRole(fromHeight);
    }
  }
}
