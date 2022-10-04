import { Node } from "..";
import path from "path";

/**
 * setupModules checks if all required modules are defined and initiates modules
 * with options gained on runtime
 *
 * @method setupModules
 * @param {Node} this
 * @return {void}
 */
export function setupModules(this: Node): void {
  try {
    if (!this.runtime) {
      this.logger.error(`Runtime is not defined. Exiting ...`);
      process.exit(1);
    }

    if (!this.storageProvider) {
      this.logger.error(`Storage Provider is not defined. Exiting ...`);
      process.exit(1);
    }

    if (!this.compression) {
      this.logger.error(`Compression is not defined. Exiting ...`);
      process.exit(1);
    }

    if (!this.cache) {
      this.logger.error(`Cache is not defined. Exiting ...`);
      process.exit(1);
    }

    // init storage provider with private key
    this.storageProvider = this.storageProvider.init(this.storagePriv);

    // init cache with work dir
    this.cache = this.cache.init(path.join(this.home, "cache"));
  } catch (error) {
    this.logger.error(`Failed to setup modules. Exiting ...`);
    this.logger.debug(error);

    process.exit(1);
  }
}
