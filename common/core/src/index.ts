import {
  IRuntime,
  IStorageProvider,
  ICacheProvider,
  ICompression,
  IMetrics,
} from "./types";
import { version as coreVersion } from "../package.json";
import {
  setupLogger,
  setupReactors,
  setupMetrics,
  setupSDK,
  setupValidator,
  validateRuntime,
  validateVersion,
  validateIsNodeValidator,
  validateIsPoolActive,
  waitForAuthorization,
  waitForUploadInterval,
  waitForNextBundleProposal,
  waitForCacheContinuation,
  continueRound,
  claimUploaderRole,
  skipUploaderRole,
  voteBundleProposal,
  submitBundleProposal,
  syncPoolState,
  syncPoolConfig,
  getBalances,
  canVote,
  canPropose,
  saveBundleDownload,
  saveBundleDecompress,
  saveLoadValidationBundle,
  validateBundleProposal,
  createBundleProposal,
  runNode,
  runCache,
} from "./methods";
import KyveSDK, { KyveClient, KyveLCDClientType } from "@kyve/sdk-beta";
import { Logger } from "tslog";
import { Command, OptionValues } from "commander";
import {
  parseNetwork,
  parsePoolId,
  parseMnemonic,
  parseCache,
} from "./commander";
import { kyve } from "@kyve/proto-beta";
import PoolResponse = kyve.query.v1beta1.kyveQueryPoolsRes.PoolResponse;
import { standardizeJSON } from "./utils";
import * as storageProvider from "./reactors/storageProviders";
import * as compression from "./reactors/compression";

/**
 * Main class of KYVE protocol nodes representing a node.
 *
 * @class Node
 * @constructor
 */
export class Node {
  // reactor attributes
  protected runtime!: IRuntime;
  protected storageProvider!: IStorageProvider;
  protected compression!: ICompression;
  protected cacheProvider!: ICacheProvider;

  // sdk attributes
  public sdk!: KyveSDK;
  public client!: KyveClient;
  public lcd!: KyveLCDClientType;

  // node attributes
  public coreVersion!: string;
  public pool!: PoolResponse;
  public poolConfig!: any;
  public name!: string;

  // logger attributes
  public logger!: Logger;

  // metrics attributes
  public m!: IMetrics;

  // node option attributes
  protected poolId!: number;
  protected staker!: string;
  protected valaccount!: string;
  protected storagePriv!: string;
  protected network!: string;
  protected cache!: string;
  protected debug!: boolean;
  protected metrics!: boolean;
  protected metricsPort!: number;
  protected home!: string;

  // setups
  protected setupLogger = setupLogger;
  protected setupReactors = setupReactors;
  protected setupMetrics = setupMetrics;
  protected setupSDK = setupSDK;
  protected setupValidator = setupValidator;

  // checks
  protected validateRuntime = validateRuntime;
  protected validateVersion = validateVersion;
  protected validateIsNodeValidator = validateIsNodeValidator;
  protected validateIsPoolActive = validateIsPoolActive;

  // timeouts
  protected waitForAuthorization = waitForAuthorization;
  protected waitForUploadInterval = waitForUploadInterval;
  protected waitForNextBundleProposal = waitForNextBundleProposal;
  protected waitForCacheContinuation = waitForCacheContinuation;

  // helpers
  protected continueRound = continueRound;

  // txs
  protected claimUploaderRole = claimUploaderRole;
  protected skipUploaderRole = skipUploaderRole;
  protected voteBundleProposal = voteBundleProposal;
  protected submitBundleProposal = submitBundleProposal;

  // queries
  protected syncPoolState = syncPoolState;
  protected syncPoolConfig = syncPoolConfig;
  protected getBalances = getBalances;
  protected canVote = canVote;
  protected canPropose = canPropose;

  // validate
  protected saveBundleDownload = saveBundleDownload;
  protected saveBundleDecompress = saveBundleDecompress;
  protected saveLoadValidationBundle = saveLoadValidationBundle;
  protected validateBundleProposal = validateBundleProposal;

  // upload
  protected createBundleProposal = createBundleProposal;

  // main
  protected runNode = runNode;
  protected runCache = runCache;

  /**
   * Constructor for the core class. It is required to provide the
   * runtime class here in order to run the
   *
   * @method constructor
   * @param {IRuntime} runtime which implements the interface IRuntime
   */
  constructor(runtime: IRuntime) {
    // set provided runtime
    this.runtime = runtime;

    // default storage provider is Arweave
    this.storageProvider = new storageProvider.Arweave();

    // default compression is Gzip
    this.compression = new compression.Gzip();

    // set @kyve/core version
    this.coreVersion = coreVersion;
  }

  /**
   * Override the default storage provider for the protocol node.
   * The Storage Provider handles data storage and retrieval for a pool.
   *
   * @method useStorageProvider
   * @param {IStorageProvider} storageProvider which implements the interface IStorageProvider
   * @return {Promise<this>} returns this for chained commands
   * @chainable
   */
  public useStorageProvider(storageProvider: IStorageProvider): this {
    this.storageProvider = storageProvider;
    return this;
  }

  /**
   * Override the default compression type for the protocol node.
   * Before saving bundles to the storage provider the node uses this compression
   * to store data more efficiently
   *
   * @method useCompression
   * @param {ICompression} compression which implements the interface ICompression
   * @return {Promise<this>} returns this for chained commands
   * @chainable
   */
  public useCompression(compression: ICompression): this {
    this.compression = compression;
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

    // define version command
    program
      .command("version")
      .description("Print runtime and core version")
      .action(() => {
        console.log(`${this.runtime.name} ${this.runtime.version}`);
        console.log(`@kyve/core ${this.coreVersion}`);
      });

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
      .option(
        "--cache <memory|jsonfile|leveldb>",
        "The cache this node should use",
        parseCache,
        "leveldb"
      )
      .option("--debug", "Run the validator node in debug mode")
      .option(
        "--verbose",
        "[DEPRECATED] Run the validator node in verbose logging mode"
      )
      .option(
        "--metrics",
        "Start a prometheus metrics server on http://localhost:8080/metrics"
      )
      .option(
        "--metrics-port <number>",
        "Specify the port of the metrics server. Only considered if '--metrics' is set [default = 8080]",
        "8080"
      )
      .option(
        "--home <string>",
        "Specify the home directory of the node where logs and the cache should save their data. [default current directory]",
        "./"
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
   * @param {OptionValues} options contains all node options defined in bootstrap
   * @return {Promise<void>}
   */
  private async start(options: OptionValues): Promise<void> {
    // assign program options
    // to node instance
    this.poolId = options.pool;
    this.valaccount = options.valaccount;
    this.storagePriv = options.storagePriv;
    this.network = options.network;
    this.cache = options.cache;
    this.debug = options.debug;
    this.metrics = options.metrics;
    this.metricsPort = options.metricsPort;
    this.home = options.home;

    // perform setups
    this.setupLogger();
    this.setupReactors();
    this.setupMetrics();

    // perform async setups
    await this.setupSDK();
    await this.setupValidator();

    // start the node process. Node and cache should run at the same time.
    // Thats why, although they are async they are called synchronously
    try {
      await this.syncPoolState();

      this.runNode();
      this.runCache();
    } catch (err) {
      this.logger.fatal(`Unexpected runtime error. Exiting ...`);
      this.logger.fatal(standardizeJSON(err));

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
export * as storageProvider from "./reactors/storageProviders";

// export compression types
export * as compression from "./reactors/compression";
