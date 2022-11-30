import { Node, standardizeJSON } from "../..";
import KyveSDK, { constants } from "@kyve/sdk-beta";
import { KYVE_NETWORK } from "@kyve/sdk-beta/dist/constants";

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
    this.logger.debug(`Initializing KyveSDK with network ${this.network}`);

    // get KYVE network settings from network parameter
    // TODO @regenisis: use chain-id as new network property
    let network = constants.KYVE_ENDPOINTS[this.network as KYVE_NETWORK];

    if (this.rpc) {
      network = { ...network, rpc: this.rpc };
    }

    if (this.rest) {
      network = { ...network, rest: this.rest };
    }

    this.sdk = new KyveSDK(network);

    this.logger.debug(`Initializing KyveClient from valaccount mnemonic`);

    this.client = await this.sdk.fromMnemonic(this.valaccount);

    this.logger.debug(`Initializing KyveLCD from sdk`);
    this.lcd = this.sdk.createLCDClient();
  } catch (err) {
    this.logger.fatal(`Failed to init KYVE SDK. Exiting ...`);
    this.logger.fatal(standardizeJSON(err));

    process.exit(1);
  }
}
