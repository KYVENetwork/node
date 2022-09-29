import { Command } from "commander";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import fs from "fs";
import TOML from "@iarna/toml";

const home = path.join(process.env.HOME!, ".kysor");

const init = new Command("init").description("Init KYSOR");

init
  .requiredOption(
    "-n, --network <local|alpha|beta|korellia>",
    "The network the KYSOR should run on"
  )
  .option(
    "-d, --auto-download-binaries",
    "Allow automatic download and execution of new upgrade binaries"
  )
  .action(async (options) => {
    try {
      if (existsSync(path.join(home, `config.toml`))) {
        console.log(
          `KYSOR was already initialized. You can directly edit the config file under ${path.join(
            home,
            `config.toml`
          )}`
        );
      } else {
        // create KYSOR home directory
        mkdirSync(home, {
          recursive: true,
        });

        const config = {
          network: options.network,
          autoDownloadBinaries: options.autoDownloadBinaries,
        };

        fs.writeFileSync(
          path.join(home, `config.toml`),
          TOML.stringify(config as any)
        );
      }
    } catch (err) {
      console.log(`ERROR: Could not init KYSOR: ${err}`);
    }
  });

export default init;
