import { Node } from "..";

export async function asyncSetup(this: Node): Promise<void> {
  // check if basic runtime classes are defined
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

  try {
    this.client = await this.sdk.fromMnemonic(this.valaccount);
  } catch (error) {
    this.logger.error(`Failed to init KYVE client from mnemonic. Exiting ...`);
    this.logger.debug(error);

    process.exit(1);
  }

  this.name = this.generateName();

  this.setupMetrics();

  // init storage provider with wallet
  this.storageProvider = this.storageProvider.init(this.storagePriv);

  // init cache with work dir
  this.cache = this.cache.init(`./cache/${this.name}`);

  // check if valaccount already joined pool
  await this.canValidate();

  // log basic node info on startup
  this.logger.info("Starting node ...\n");
  this.logger.info(`Name \t\t = ${this.name}`);
  this.logger.info(`Address \t\t = ${this.client.account.address}`);
  this.logger.info(`Pool Id \t\t = ${this.poolId}\n`);

  this.logger.info(`Runtime \t\t = ${this.runtime.name}`);
  this.logger.info(`Storage \t\t = ${this.storageProvider.name}`);
  this.logger.info(`Compression \t = ${this.compression.name}`);
  this.logger.info(`Cache \t\t = ${this.cache.name}\n`);

  this.logger.info(`Network \t\t = ${this.network}`);
  this.logger.info(`@kyve/core \t = v${this.coreVersion}`);
  this.logger.info(`${this.runtime.name} \t = v${this.runtime.version}\n`);

  await this.syncPoolState();

  this.logger.debug(`Attempting to clear cache`);
  await this.cache.drop();
  this.prom.cache_current_items.set(0);

  this.logger.info(`Cleared cache\n`);

  this.validateRuntime();
  this.validateVersion();

  await this.syncPoolState();

  this.validateActiveNode();
}
