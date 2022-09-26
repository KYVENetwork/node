import {
  IRuntime,
  IStorageProvider,
  ICache,
  ICompression,
  IMetrics,
} from "./types";
import { version as coreVersion } from "../package.json";
import {
  setupLogger,
  canValidate,
  generateName,
  syncPoolState,
  validateRuntime,
  validateVersion,
  validateActiveNode,
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
  skipUploaderRole,
  proposeBundle,
  continueBundleProposalRound,
  setupMetrics,
  getBalances,
} from "./methods";
import KyveSDK, { KyveClient, KyveLCDClientType } from "@kyve/sdk";
import { KYVE_NETWORK } from "@kyve/sdk/dist/constants";
import { Logger } from "tslog";
import { Command, OptionValues } from "commander";
import { parseNetwork, parsePoolId, parseMnemonic } from "./commander";
import { kyve } from "@kyve/proto";
import PoolResponse = kyve.query.v1beta1.kyveQueryPoolsRes.PoolResponse;

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

  // register sdk attributes
  public sdk!: KyveSDK;
  public client!: KyveClient;
  public lcd!: KyveLCDClientType;

  // register attributes
  public coreVersion!: string;
  public pool!: PoolResponse;
  public poolConfig!: any;
  public name!: string;

  // logger attributes
  public logger!: Logger;

  // metrics
  public prom!: IMetrics;

  // options
  protected poolId!: number;
  protected staker!: string;
  protected valaccount!: string;
  protected storagePriv!: string;
  protected network!: string;
  protected verbose!: boolean;
  protected metrics!: boolean;
  protected metricsPort!: number;

  // register core methods
  protected asyncSetup = asyncSetup;
  protected setupLogger = setupLogger;
  protected canValidate = canValidate;
  protected generateName = generateName;
  protected syncPoolState = syncPoolState;
  protected validateRuntime = validateRuntime;
  protected validateVersion = validateVersion;
  protected validateActiveNode = validateActiveNode;
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
  protected skipUploaderRole = skipUploaderRole;
  protected proposeBundle = proposeBundle;
  protected continueBundleProposalRound = continueBundleProposalRound;
  protected getBalances = getBalances;
  protected setupMetrics = setupMetrics;
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

    // define start command
    program
      .command("start")
      .description("Run the protocol node")
      .requiredOption(
        "--pool <string>",
        "The ID of the pool this valaccount should participate as a validator",
        parsePoolId
      )
      .requiredOption(
        "--valaccount <string>",
        "The mnemonic of the valaccount",
        parseMnemonic
      )
      .requiredOption(
        "--storage-priv <string>",
        "The private key of the storage provider"
      )
      .requiredOption(
        "--network <local|alpha|beta|korellia>",
        "The network of the KYVE chain",
        parseNetwork
      )
      .option("--verbose", "Run the validator node in verbose logging mode")
      .option(
        "--metrics",
        "Start a prometheus metrics server on http://localhost:8080/metrics"
      )
      .option(
        "--metrics-port <number>",
        "Specify the port of the metrics server. Only considered if '--metrics' is set [default = 8080]",
        "8080"
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
    this.valaccount = options.valaccount;
    this.storagePriv = options.storagePriv;
    this.network = options.network;
    this.verbose = options.verbose;
    this.metrics = options.metrics;
    this.metricsPort = options.metricsPort;

    this.coreVersion = coreVersion;

    this.logger = this.setupLogger();

    try {
      // assign main attributes
      this.sdk = new KyveSDK(this.network as KYVE_NETWORK);
      this.lcd = this.sdk.createLCDClient();
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
