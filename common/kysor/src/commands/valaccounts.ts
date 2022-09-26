import { Command } from "commander";
import KyveSDK from "@kyve/sdk";
import fs from "fs";
import path from "path/posix";
import TOML from "@iarna/toml";
import prompts from "prompts";
import { IConfig } from "../types/interfaces";

const home = path.join(process.env.HOME!, ".kysor");

const valaccounts = new Command("valaccounts").description(
  "Perform txs with validator account"
);

valaccounts
  .command("create")
  .description("Create a new valaccount")
  .requiredOption(
    "--name <string>",
    "Name of the valaccount (name only used locally for KYSOR)"
  )
  .requiredOption(
    "--pool <string>",
    "The ID of the pool this valaccount should participate as a validator"
  )
  .requiredOption(
    "--storage-priv <string>",
    "The private key of the storage provider"
  )
  .requiredOption(
    "--network <local|alpha|beta|korellia>",
    "The network of the KYVE chain"
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
  .option("--recover", "Create a valaccount by importing an existing mnemonic")
  .action(async (options) => {
    try {
      if (fs.existsSync(path.join(home, `${options.name}.toml`))) {
        console.log(`Already created valaccount with name ${options.name}`);
        return;
      }

      // parse pool id
      const pool = parseInt(options.pool, 10);

      // get mnemonic for valaccount
      let valaccount;

      if (options.recover) {
        const { mnemonic } = await prompts(
          {
            type: "text",
            name: "mnemonic",
            message: "Enter the mnemonic",
            validate: async (value) => {
              try {
                await KyveSDK.getAddressFromMnemonic(value);
              } catch (err) {
                return `${err}`;
              }

              return true;
            },
          },
          {
            onCancel: () => {
              throw Error("Aborted mnemonic input");
            },
          }
        );

        valaccount = mnemonic;
      } else {
        valaccount = await KyveSDK.generateMnemonic();
      }

      const config: IConfig = {
        pool,
        valaccount,
        storagePriv: options.storagePriv,
        network: options.network,
        verbose: options.verbose,
        metrics: options.metrics,
        metricsPort: options.metricsPort,
      };

      fs.writeFileSync(
        path.join(home, `${options.name}.toml`),
        TOML.stringify(config as any)
      );
      console.log(`Successfully created valaccount ${options.name}`);
    } catch (err) {
      console.log(`Could not create valaccount: ${err}`);
    }
  });

valaccounts
  .command("delete")
  .description("Delete a valaccount")
  .requiredOption(
    "--name <string>",
    "Name of the valaccount (name only used locally for KYSOR)"
  )
  .action(async (options) => {
    try {
      if (!fs.existsSync(path.join(home, `${options.name}.toml`))) {
        console.log(`Valaccount with name ${options.name} does not exist`);
        return;
      }

      fs.unlinkSync(path.join(home, `${options.name}.toml`));
      console.log(`Successfully deleted valaccount ${options.name}`);
    } catch (err) {
      console.log(`Could not delete valaccount: ${err}`);
    }
  });

export default valaccounts;
