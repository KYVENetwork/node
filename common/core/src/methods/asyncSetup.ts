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

  // init storage provider with wallet
  this.storageProvider = this.storageProvider.init(this.keyfile);

  // init cache with work dir
  this.cache = this.cache.init(`./cache/${this.name}`);

  // retrieve mnemonic of account from file backend
  const mnemonic = await this.backend.get(this.account);

  if (!mnemonic) {
    this.logger.error(`Account ${this.account} not found. Exiting ...`);
    process.exit(1);
  }

  // validate mnemonic
  const parsedValue = mnemonic.split(" ");

  if (!(parsedValue.length === 12 || parsedValue.length === 24)) {
    this.logger.error(`Mnemonic has an invalid format. Exiting ...`);
    this.logger.debug(mnemonic);
    process.exit(1);
  }

  try {
    this.client = await this.sdk.fromMnemonic(mnemonic);
  } catch (error) {
    this.logger.error(`Failed to init KYVE client. Exiting ...`);
    this.logger.debug(error);

    process.exit(1);
  }

  // check if valaccount already joined pool
  await this.canValidate();

  this.name = this.generateName();

  // log basic node info on startup
  this.logger.info("Starting node ...\n");
  this.logger.info(`Name \t\t = ${this.name}`);
  this.logger.info(`Account \t\t = ${this.account}`);
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
  this.logger.info(`Cleared cache\n`);

  this.validateRuntime();
  this.validateVersion();

  await this.setupStake();
  await this.syncPoolState();

  this.validateActiveNode();
}
