import { Node } from "../..";
import KyveSDK from "@kyve/sdk";
import { KYVE_NETWORK } from "@kyve/sdk/dist/constants";

/**
 * setupSDK creates the main KYVE SDK and the client which is used for transactions
 * and the lcd client which is used for queries
 *
 * @method setupSDK
 * @param {Node} this
 * @return {Promise<void>}
 */
export async function setupSDK(this: Node): Promise<void> {
  try {
    this.sdk = new KyveSDK(this.network as KYVE_NETWORK);

    this.client = await this.sdk.fromMnemonic(this.valaccount);
    this.lcd = this.sdk.createLCDClient();
  } catch (error) {
    this.logger.error(`Failed to init KYVE SDK. Exiting ...`);
    this.logger.debug(error);

    process.exit(1);
  }
}
