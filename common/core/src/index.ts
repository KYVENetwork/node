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
} from "./methods";
import KyveSDK, { KyveClient, KyveLCDClientType } from "@kyve/sdk";
import { KYVE_NETWORK } from "@kyve/sdk/dist/constants";
import { Logger } from "tslog";
import { Command, OptionValues } from "commander";
import { parseNetwork, parsePoolId } from "./commander";
import { kyve } from "@kyve/proto";
import prom_client from "prom-client";
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
  protected backend: IBackend = new FileBackend();

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
  public prometheus!: typeof prom_client;
  public metricsCurrentCacheItems!: any;

  // options
  protected poolId!: number;
  protected staker!: string;
  protected account!: string;
  protected wallet!: string;
  protected usePassword!: boolean;
  protected config!: string;
  protected network!: string;
  protected verbose!: boolean;
  protected metrics!: boolean;

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
    const valaccounts = new Command("valaccounts").description(
      "Manage valaccounts in encrypted file backend"
    );

    valaccounts
      .command("create")
      .description("Create a new valaccount with a random mnemonic")
      .argument("<account_name>", "Name of the valaccount")
      .option(
        "-u, --use-password",
        "Use a password to encrypt the file backend. [optional, default = false]"
      )
      .option(
        "-c, --config <string>",
        "Specify the path where to node config is saved. [optional, default = $HOME/.kyve-node/]"
      )
      .action(async (key, options) => {
        const mnemonic = await KyveSDK.generateMnemonic();
        await this.backend.add(
          `valaccount.${key}`,
          mnemonic,
          options.usePassword,
          options.config
        );
      });
    valaccounts
      .command("add")
      .description("Add an existing valaccount with the mnemonic")
      .argument("<account_name>", "Name of the valaccount")
      .argument("<account_secret>", "Mnemonic of the valaccount")
      .option(
        "-u, --use-password",
        "Use a password to encrypt the file backend. [optional, default = false]"
      )
      .option(
        "-c, --config <string>",
        "Specify the path where to node config is saved. [optional, default = $HOME/.kyve-node/]"
      )
      .action(async (key, mnemonic, options) => {
        const parsedMnemonic = mnemonic.split(" ");

        if (!(parsedMnemonic.length === 12 || parsedMnemonic.length === 24)) {
          console.log(`Mnemonic has an invalid format: ${parsedMnemonic}`);
          return;
        }

        await this.backend.add(
          `valaccount.${key}`,
          mnemonic,
          options.usePassword,
          options.config
        );
      });
    valaccounts
      .command("reveal")
      .description("Reveal the mnemonic of a valaccount")
      .argument("<account_name>", "Name of the valaccount")
      .option(
        "-u, --use-password",
        "Use a password to encrypt the file backend. [optional, default = false]"
      )
      .option(
        "-c, --config <string>",
        "Specify the path where to node config is saved. [optional, default = $HOME/.kyve-node/]"
      )
      .action(async (key, options) => {
        await this.backend.reveal(
          `valaccount.${key}`,
          options.usePassword,
          options.config
        );
      });
    valaccounts
      .command("list")
      .description("List all valaccounts available")
      .option(
        "-u, --use-password",
        "Use a password to encrypt the file backend. [optional, default = false]"
      )
      .option(
        "-c, --config <string>",
        "Specify the path where to node config is saved. [optional, default = $HOME/.kyve-node/]"
      )
      .action(async (options) => {
        await this.backend.list(options.usePassword, options.config);
      });
    valaccounts
      .command("remove")
      .description("Remove an existing valaccount")
      .argument("<account_name>", "Name of the valaccount")
      .option(
        "-u, --use-password",
        "Use a password to encrypt the file backend. [optional, default = false]"
      )
      .option(
        "-c, --config <string>",
        "Specify the path where to node config is saved. [optional, default = $HOME/.kyve-node/]"
      )
      .action(async (key, options) => {
        await this.backend.remove(
          `valaccount.${key}`,
          options.usePassword,
          options.config
        );
      });
    valaccounts
      .command("reset")
      .description(
        "Reset the file backend and delete all valaccounts AND wallets"
      )
      .option(
        "-c, --config <string>",
        "Specify the path where to node config is saved. [optional, default = $HOME/.kyve-node/]"
      )
      .action(async (options) => {
        await this.backend.reset(options.config);
      });

    program.addCommand(valaccounts);

    // define wallets
    const wallets = new Command("wallets").description(
      "Manage wallets in encrypted file backend"
    );

    wallets
      .command("add")
      .description("Add an existing wallet with the secret")
      .argument("<wallet_name>", "Name of the wallet")
      .argument("<wallet_secret>", "Secret of the wallet")
      .option(
        "-u, --use-password",
        "Use a password to encrypt the file backend. [optional, default = false]"
      )
      .option(
        "-c, --config <string>",
        "Specify the path where to node config is saved. [optional, default = $HOME/.kyve-node/]"
      )
      .action(async (key, secret, options) => {
        await this.backend.add(
          `wallet.${key}`,
          secret,
          options.usePassword,
          options.config
        );
      });
    wallets
      .command("reveal")
      .description("Reveal the secret of a wallet")
      .argument("<wallet_name>", "Name of the wallet")
      .option(
        "-u, --use-password",
        "Use a password to encrypt the file backend. [optional, default = false]"
      )
      .option(
        "-c, --config <string>",
        "Specify the path where to node config is saved. [optional, default = $HOME/.kyve-node/]"
      )
      .action(async (key, options) => {
        await this.backend.reveal(
          `wallet.${key}`,
          options.usePassword,
          options.config
        );
      });
    wallets
      .command("list")
      .description("List all wallets available")
      .option(
        "-u, --use-password",
        "Use a password to encrypt the file backend. [optional, default = false]"
      )
      .option(
        "-c, --config <string>",
        "Specify the path where to node config is saved. [optional, default = $HOME/.kyve-node/]"
      )
      .action(async (options) => {
        await this.backend.list(options.usePassword, options.config);
      });
    wallets
      .command("remove")
      .description("Remove an existing wallet")
      .argument("<wallet_name>", "Name of the wallet")
      .option(
        "-u, --use-password",
        "Use a password to encrypt the file backend. [optional, default = false]"
      )
      .option(
        "-c, --config <string>",
        "Specify the path where to node config is saved. [optional, default = $HOME/.kyve-node/]"
      )
      .action(async (key, options) => {
        await this.backend.remove(
          `wallet.${key}`,
          options.usePassword,
          options.config
        );
      });
    wallets
      .command("reset")
      .description(
        "Reset the file backend and delete all wallets AND valaccounts"
      )
      .option(
        "-c, --config <string>",
        "Specify the path where to node config is saved. [optional, default = $HOME/.kyve-node/]"
      )
      .action(async (options) => {
        await this.backend.reset(options.config);
      });

    program.addCommand(wallets);

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
        "-w, --wallet <string>",
        "The name of the wallet which should be used for the storage provider"
      )
      .option(
        "-u, --use-password",
        "Use a password to encrypt the file backend. [optional, default = false]"
      )
      .option(
        "-c, --config <string>",
        "Specify the path where to node config is saved. [optional, default = $HOME/.kyve-node/]"
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
      .option(
        "-m, --metrics",
        "Run a metrics server with prometheus (http://localhost:8080/metrics). [optional, default = false]",
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
    this.wallet = options.wallet;
    this.usePassword = options.usePassword;
    this.config = options.config;
    this.network = options.network;
    this.verbose = options.verbose;
    this.metrics = options.metrics;

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
