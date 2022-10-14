import { Node } from "../..";
import path from "path";

/**
 * setupReactors checks if all required reactors are defined and initiates modules
 * with options gained on runtime
 *
 * @method setupReactors
 * @param {Node} this
 * @return {void}
 */
export function setupReactors(this: Node): void {
  try {
    this.logger.debug(`Validate if Runtime is defined`);

    if (!this.runtime) {
      this.logger.fatal(`Runtime is not defined. Exiting ...`);
      process.exit(1);
    }

    this.logger.debug(`Validate if Storage Provider is defined`);

    if (!this.storageProvider) {
      this.logger.fatal(`Storage Provider is not defined. Exiting ...`);
      process.exit(1);
    }

    this.logger.debug(`Validate if Compression is defined`);

    if (!this.compression) {
      this.logger.fatal(`Compression is not defined. Exiting ...`);
      process.exit(1);
    }

    this.logger.debug(`Validate if Cache is defined`);

    if (!this.cache) {
      this.logger.fatal(`Cache is not defined. Exiting ...`);
      process.exit(1);
    }

    this.logger.debug(`Initializing storage provider with storage priv`);

    // init storage provider with private key
    this.storageProvider = this.storageProvider.init(this.storagePriv);

    this.logger.debug(
      `Initializing cache with path ${path.join(this.home, "cache")}`
    );

    // init cache with work dir
    this.cache = this.cache.init(path.join(this.home, "cache"));
  } catch (error) {
    this.logger.fatal(`Failed to setup reactors. Exiting ...`);
    this.logger.fatal(error);

    process.exit(1);
  }
}
