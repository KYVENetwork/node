import axios from "axios";
import { compression, Node, storageProvider } from "../..";
import { standardizeJSON } from "../../utils";

/**
 * syncPoolConfig fetches the pool config from the provided link
 * and parses it into a json config
 *
 * @method syncPoolConfig
 * @param {Node} this
 * @return {Promise<void>}
 */
export async function syncPoolConfig(this: Node): Promise<void> {
  try {
    this.logger.debug(this.pool.data!.config);

    let url: string;

    // allow ipfs:// or ar:// as external config urls
    if (this.pool.data!.config.startsWith("ipfs://")) {
      url = this.pool.data!.config.replace("ipfs://", "https://ipfs.io/");
    } else if (this.pool.data!.config.startsWith("ar://")) {
      url = this.pool.data!.config.replace("ar://", "https://arweave.net/");
    } else {
      throw Error("Unsupported config link protocol");
    }

    this.logger.debug(url);
    const { data } = await axios.get(url);

    this.logger.debug(JSON.stringify(data));
    this.poolConfig = data;
  } catch (err) {
    this.logger.error(`Failed to sync pool config`);
    this.logger.error(standardizeJSON(err));

    if (!this.poolConfig) {
      this.poolConfig = {};
    }
  }

  try {
    // setup storage provider and use Arweave as default provider
    switch (this.poolConfig.storageProvider) {
      case "arweave":
        this.logger.debug(`new storageProvider.Arweave()`);
        this.storageProvider = new storageProvider.Arweave();
        break;
      case "bundlr":
        this.logger.debug(`new storageProvider.Bundlr()`);
        this.storageProvider = new storageProvider.Bundlr();
        break;
      default:
        this.logger.debug(`new storageProvider.Arweave()`);
        this.storageProvider = new storageProvider.Arweave();
    }

    // initialize storage provider with secret
    this.logger.debug(`this.storageProvider.init($STORAGE_PRIV)`);
    await this.storageProvider.init(this.storagePriv);

    this.logger.info(`Using storage provider: ${this.storageProvider.name}`);
  } catch (err) {
    this.logger.error(`Failed to use storage provider. Exiting ...`);
    this.logger.error(standardizeJSON(err));

    process.exit(1);
  }

  try {
    // setup compression and use no compression as default
    switch (this.poolConfig.compression) {
      case "nocompression":
        this.logger.debug(`new compression.NoCompression()`);
        this.compression = new compression.NoCompression();
        break;
      case "gzip":
        this.logger.debug(`new compression.Gzip()`);
        this.compression = new compression.Gzip();
        break;
      default:
        this.logger.debug(`new compression.NoCompression()`);
        this.compression = new compression.NoCompression();
    }

    this.logger.info(`Using compression: ${this.compression.name}`);
  } catch (err) {
    this.logger.error(`Failed to use compression. Exiting ...`);
    this.logger.error(standardizeJSON(err));

    process.exit(1);
  }
}
