import {
  IRuntime,
  IStorageProvider,
  ICache,
  ICompression,
  IBackend,
} from "./types";
import { FileBackend } from "./backend";
import { version as coreVersion } from "../package.json";
import {
  setupLogger,
  setupName,
  syncPoolState,
  validateRuntime,
  validateVersion,
  validateActiveNode,
  stakePool,
  unstakePool,
  setupStake,
  runNode,
  runCache,
  asyncSetup,
  shouldIdle,
  claimUploaderRole,
  canVote,
  validateBundleProposal,
  voteBundleProposal,
  loadBundle,
  remainingUploadInterval,
  waitForNextBundleProposal,
  canPropose,
  submitBundleProposal,
  proposeBundle,
} from "./methods";
import KyveSDK, { KyveClient, KyveLCDClientType } from "@kyvenetwork/sdk";
import { KYVE_NETWORK } from "@kyvenetwork/sdk/dist/constants";
import { Logger } from "tslog";
import { kyve } from "@kyvenetwork/proto";
import { Command, OptionValues } from "commander";
import {
  parseDesiredStake,
  parseKeyfile,
  parseNetwork,
  parsePoolId,
} from "./commander/parser";

/**
 * Main class of KYVE protocol nodes representing a node.
 *
 * @class Node
 * @constructor
 */
export class Node {
  // register class attributes
  protected runtime!: IRuntime;
  protected storageProvider!: IStorageProvider;
  protected compression!: ICompression;
  protected cache!: ICache;
  protected backend: IBackend = new FileBackend();

  // register sdk attributes
  public sdk!: KyveSDK;
  public client!: KyveClient;
  public query!: KyveLCDClientType;

  // register attributes
  public coreVersion!: string;
  public pool!: kyve.registry.v1beta1.kyveRegistry.Pool;
  public poolConfig!: any;
  public name!: string;

  // logger attributes
  public logger!: Logger;

  // options
  protected poolId!: number;
  protected account!: string;
  protected keyfile!: string;
  protected stake!: string;
  protected network!: string;
  protected verbose!: boolean;

  // register core methods
  protected asyncSetup = asyncSetup;
  protected setupLogger = setupLogger;
  protected setupName = setupName;
  protected syncPoolState = syncPoolState;
  protected validateRuntime = validateRuntime;
  protected validateVersion = validateVersion;
  protected validateActiveNode = validateActiveNode;
  protected stakePool = stakePool;
  protected unstakePool = unstakePool;
  protected setupStake = setupStake;
  protected shouldIdle = shouldIdle;
  protected claimUploaderRole = claimUploaderRole;
  protected loadBundle = loadBundle;
  protected canVote = canVote;
  protected validateBundleProposal = validateBundleProposal;
  protected voteBundleProposal = voteBundleProposal;
  protected remainingUploadInterval = remainingUploadInterval;
  protected waitForNextBundleProposal = waitForNextBundleProposal;
  protected canPropose = canPropose;
  protected submitBundleProposal = submitBundleProposal;
  protected proposeBundle = proposeBundle;
  protected runNode = runNode;
  protected runCache = runCache;

  /**
   * Set the runtime for the protocol node.
   * The Runtime implements the custom logic of a pool.
   *
   * Required before calling 'run'
   *
   * @method addRuntime
   * @param {IRuntime} runtime which implements the interface IRuntime
   * @return {Promise<this>} returns this for chained commands
   * @chainable
   */
  public addRuntime(runtime: IRuntime): this {
    this.runtime = runtime;
    return this;
  }

  /**
   * Set the storage provider for the protocol node.
   * The Storage Provider handles data storage and retrieval for a pool.
   *
   * Required before calling 'run'
   *
   * @method addStorageProvider
   * @param {IStorageProvider} storageProvider which implements the interface IStorageProvider
   * @return {Promise<this>} returns this for chained commands
   * @chainable
   */
  public addStorageProvider(storageProvider: IStorageProvider): this {
    this.storageProvider = storageProvider;
    return this;
  }

  /**
   * Set the compression type for the protocol node.
   * Before saving bundles to the storage provider the node uses this compression
   * to store data more efficiently
   *
   * Required before calling 'run'
   *
   * @method addCompression
   * @param {ICompression} compression which implements the interface ICompression
   * @return {Promise<this>} returns this for chained commands
   * @chainable
   */
  public addCompression(compression: ICompression): this {
    this.compression = compression;
    return this;
  }

  /**
   * Set the cache for the protocol node.
   * The Cache is responsible for caching data before its validated and stored on the Storage Provider.
   *
   * Required before calling 'run'
   *
   * @method addCache
   * @param {ICache} cache which implements the interface ICache
   * @return {Promise<this>} returns this for chained commands
   * @chainable
   */
  public addCache(cache: ICache): this {
    this.cache = cache;
    return this;
  }

  /**
   * Bootstrap method for protocol node. It initializes all commands including
   * the main program which can be called with "start"
   *
   * @method bootstrap
   * @return {void}
   */
  public bootstrap(): void {
    // define main program
    const program = new Command();

    // define accounts
    const keys = new Command("accounts").description(
      "Manage accounts for protocol nodes"
    );

    keys
      .command("create")
      .description(
        "Create a new account which generates a new mnemonic for you"
      )
      .argument("<account_name>", "Name of the account")
      .action(async (key) => {
        // const mnemonic = await KyveSDK.generateMnemonic();
        const mnemonic = "todo";
        await this.backend.add(key, mnemonic);
      });
    keys
      .command("add")
      .description("Add an existing account with the mnemonic")
      .argument("<account_name>", "Name of the account")
      .argument("<account_secret>", "Mnemonic of the account")
      .action(async (key, mnemonic) => {
        await this.backend.add(key, mnemonic);
      });
    keys
      .command("reveal")
      .description("Reveal the mnemonic of an account")
      .argument("<account_name>", "Name of the account")
      .action(async (key) => {
        await this.backend.reveal(key);
      });
    keys
      .command("list")
      .description("List all accounts available")
      .action(async (key) => {
        await this.backend.list();
      });
    keys
      .command("remove")
      .description("Remove an existing account")
      .argument("<account_name>", "Name of the account")
      .action(async (key) => {
        await this.backend.remove(key);
      });

    program.addCommand(keys);

    // define start command
    program
      .command("start")
      .description("Run the protocol node")
      .requiredOption(
        "-p, --pool <number>",
        "The id of the pool the node should join",
        parsePoolId
      )
      .requiredOption(
        "-a, --account <string>",
        "The account the node should run with"
      )
      .requiredOption(
        "-k, --keyfile <string>",
        "The path to your Arweave keyfile",
        parseKeyfile
      )
      .option(
        "-s, --stake <number>",
        "Your desired stake the node should run with. [unit = $KYVE]",
        parseDesiredStake,
        "0"
      )
      .option(
        "-n, --network <string>",
        "The chain id of the network. [optional, default = korellia]",
        parseNetwork,
        "korellia"
      )
      .option(
        "-v, --verbose",
        "Run node in verbose mode. [optional, default = false]",
        false
      )
      .action((options) => {
        this.start(options);
      });

    // bootstrap program
    program.parse();
  }

  /**
   * Main method of @kyve/core. By running this method the node will start and run.
   * For this method to run the Runtime, Storage Provider and the Cache have to be added first.
   *
   * This method will run indefinetely and only exits on specific exit conditions like running
   * an incorrect runtime or version.
   *
   * @method start
   * @param {OptionValues} options which contains all relevant node options
   * @return {Promise<void>}
   */
  private async start(options: OptionValues): Promise<void> {
    // assign program options
    this.poolId = options.pool;
    this.account = options.account;
    this.keyfile = options.keyfile;
    this.stake = options.stake;
    this.network = options.network;
    this.verbose = options.verbose;

    this.coreVersion = coreVersion;

    this.logger = this.setupLogger();

    try {
      // assign main attributes
      this.sdk = new KyveSDK(this.network as KYVE_NETWORK);
      this.query = this.sdk.createLCDClient();
    } catch (error) {
      this.logger.error(`Failed to init KYVE SDK. Exiting ...`);
      this.logger.debug(error);

      process.exit(1);
    }

    try {
      await this.asyncSetup();

      this.runNode();
      this.runCache();
    } catch (error) {
      this.logger.error(`Unexpected runtime error. Exiting ...`);
      this.logger.debug(error);

      process.exit(1);
    }
  }
}

// export commander
export * from "./commander";

// export types
export * from "./types";

// export utils
export * from "./utils";

// export storage providers
export * from "./storage";

// export compression types
export * from "./compression";

// export caches
export * from "./cache";
