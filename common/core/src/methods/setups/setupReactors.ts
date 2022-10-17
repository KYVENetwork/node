import { Node, standardizeJSON } from "../..";
import path from "path";
import { MemoryCache, JsonFileCache } from "../../reactors/cacheProvider";

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
    this.logger.debug(
      `Initializing cache provider with path ${path.join(this.home, "cache")}`
    );

    // create cache provider depending on chosen cache type
    if (this.cache === "memory") {
      this.cacheProvider = new MemoryCache();
    } else if (this.cache === "jsonfile") {
      this.cacheProvider = new JsonFileCache();
    }

    // init cache with work dir
    this.cacheProvider = this.cacheProvider.init(path.join(this.home, "cache"));

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

    this.logger.debug(`Validate if Cache Provider is defined`);

    if (!this.cacheProvider) {
      this.logger.fatal(`Cache Provider is not defined. Exiting ...`);
      process.exit(1);
    }

    this.logger.debug(`Initializing storage provider with storage priv`);

    // init storage provider with private key
    this.storageProvider = this.storageProvider.init(this.storagePriv);
  } catch (err) {
    this.logger.fatal(`Failed to setup reactors. Exiting ...`);
    this.logger.fatal(standardizeJSON(err));

    process.exit(1);
  }
}
