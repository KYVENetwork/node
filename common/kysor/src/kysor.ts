import {
  existsSync,
  mkdirSync,
  readdirSync,
  rmdirSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import path from "path";
import os from "os";
import fs from "fs";
import { Logger } from "tslog";
import TOML from "@iarna/toml";
import { IConfig } from "./types/interfaces";
import extract from "extract-zip";
import KyveSDK, { KyveLCDClientType } from "@kyve/sdk";
import { kyve } from "@kyve/proto";
import { KYVE_NETWORK } from "@kyve/sdk/dist/constants";
import download from "download";
import { getChecksum, startNodeProcess } from "./utils";

import PoolResponse = kyve.query.v1beta1.kyveQueryPoolsRes.PoolResponse;

const home = path.join(process.env.HOME!, ".kysor");
const platform = os.platform() === "darwin" ? "macos" : os.platform();
const arch = os.arch();

const logger: Logger = new Logger({
  displayFilePath: "hidden",
  displayFunctionName: false,
  logLevelsColors: {
    0: "white",
    1: "white",
    2: "white",
    3: "white",
    4: "white",
    5: "white",
    6: "white",
  },
});

export const run = async (options: any) => {
  let config: IConfig = {} as IConfig;
  let autoDownloadBinaries: boolean = options.autoDownloadBinaries;
  let pool: PoolResponse;
  let lcd: KyveLCDClientType = {} as KyveLCDClientType;

  logger.info("Starting KYSOR ...");

  // verify that valaccount toml exists
  try {
    if (!fs.existsSync(path.join(home, `${options.valaccount}.toml`))) {
      logger.error(
        `Valaccount with name ${options.valaccount} does not exist. Exiting KYSOR ...`
      );
      return;
    }
  } catch (err) {
    logger.error(
      `Error opening valaccount config file ${options.valaccount}.toml. Exiting KYSOR ...`
    );
    logger.error(err);
  }

  // verify that valaccount toml can be parsed
  try {
    config = TOML.parse(
      fs.readFileSync(path.join(home, `${options.valaccount}.toml`), "utf-8")
    ) as any;
  } catch (err) {
    logger.error(
      `Error parsing valaccount config file ${options.valaccount}.toml. Exiting KYSOR ...`
    );
    logger.error(err);
  }

  // verify kyve sdk client can be created
  try {
    lcd = new KyveSDK(config.network as KYVE_NETWORK).createLCDClient();
  } catch (err) {
    logger.error(
      `Error creating LCD client from network ${options.network}. Exiting KYSOR ...`
    );
    logger.error(err);
  }

  while (true) {
    // create pool directory if it does not exist yet
    if (!existsSync("./upgrades")) {
      logger.info(`Creating "upgrades" directory ...`);
      mkdirSync(path.join(home, "upgrades"), {
        recursive: true,
      });
    }

    // fetch pool state
    const data = await lcd.kyve.query.v1beta1.pool({
      id: config.pool.toString(),
    });

    pool = data.pool as PoolResponse;

    const runtime = pool.data?.runtime;
    const version = pool.data?.protocol?.version;

    if (!runtime) {
      logger.error("Runtime not found on pool. Exiting KYSOR ...");
      process.exit(0);
    }

    if (!version) {
      logger.error("Version tag not found on pool. Exiting KYSOR ...");
      process.exit(0);
    }

    // create pool runtime directory if does not exist yet
    if (!existsSync(path.join(home, "upgrades", runtime))) {
      mkdirSync(path.join(home, "upgrades", runtime), { recursive: true });
    }

    // check if directory with version already exists
    if (existsSync(path.join(home, "upgrades", runtime, version))) {
      logger.info(
        `Binary of runtime "${runtime}" with version ${version} found locally`
      );
    } else {
      logger.info(
        `Binary of runtime "${runtime}" with version ${version} not found locally`
      );

      // if binary needs to be downloaded and autoDownload is disable exit
      if (!autoDownloadBinaries) {
        logger.error(
          "Auto download is disabled and new upgrade binary could not be found. Exiting KYSOR ..."
        );
        process.exit(0);
      }

      const binaries = JSON.parse(pool.data!.protocol!.binaries);
      const downloadLink = binaries[`kyve-${platform}-${arch}`];

      // if download link was not found exit
      if (!downloadLink) {
        logger.error(
          `Upgrade binary "kyve-${platform}-${arch}" not found on pool. Exiting KYSOR ...`
        );
        process.exit(0);
      }

      logger.info("Found downloadable binary on pool");

      const checksum = new URL(downloadLink).searchParams.get("checksum") || "";

      // create directories for new version
      mkdirSync(path.join(home, "upgrades", runtime, version), {
        recursive: true,
      });

      // try to download binary
      try {
        logger.info(`Downloading from ${downloadLink} ...`);

        writeFileSync(
          path.join(home, "upgrades", runtime, version, "kyve.zip"),
          await download(downloadLink)
        );
      } catch (err) {
        logger.error(
          `Error downloading binary from ${downloadLink}. Exiting KYSOR ...`
        );
        logger.error(err);

        // exit and delete version folders if binary could not be downloaded
        rmdirSync(path.join(home, "upgrades", runtime, version));
        process.exit(0);
      }

      try {
        logger.info(
          `Extracting binary to ${path.join(
            home,
            "upgrades",
            runtime,
            version,
            "kyve.zip"
          )} ...`
        );
        await extract(
          path.join(home, "upgrades", runtime, version, "kyve.zip"),
          {
            dir: path.resolve(path.join(home, "upgrades", runtime, version)),
          }
        );

        // check if kyve.zip exists
        if (
          existsSync(path.join(home, "upgrades", runtime, version, "kyve.zip"))
        ) {
          logger.info(`Deleting kyve.zip ...`);
          // delete zip afterwards
          unlinkSync(path.join(home, "upgrades", runtime, version, "kyve.zip"));
        }
      } catch (err) {
        logger.error("Error extracting binary. Exiting KYSOR ...");
        logger.error(err);

        // exit and delete version folders if binary could not be extracted
        rmdirSync(path.join(home, "upgrades", runtime, version));
        process.exit(0);
      }

      const binName = readdirSync(
        path.join(home, "upgrades", runtime, version)
      )[0];
      const binPath = path.join(home, "upgrades", runtime, version, binName);

      if (checksum) {
        const localChecksum = await getChecksum(binPath);

        logger.info("Comparing binary checksums ...");
        console.log();
        logger.info(`Found checksum = ${checksum}`);
        logger.info(`Local checksum = ${localChecksum}`);
        console.log();

        if (checksum === localChecksum) {
          logger.info("Checksums are equal. Continuing ...");
        } else {
          logger.info("Checksums are not equal. Exiting KYSOR ...");
          process.exit(0);
        }
      }
    }

    try {
      const binName = readdirSync(
        path.join(home, "upgrades", runtime, version)
      )[0];
      const binPath = path.join(home, "upgrades", runtime, version, binName);

      const args = [
        `start`,
        `--pool`,
        `${config.pool}`,
        `--valaccount`,
        `${config.valaccount}`,
        `--storage-priv`,
        `${config.storagePriv}`,
        `--network`,
        `${config.network}`,
      ];

      if (config.verbose) {
        args.push("--verbose");
      }

      if (config.metrics) {
        args.push("--metrics");
        args.push("--metrics-port");
        args.push(`${config.metricsPort}`);
      }

      logger.info("Starting process ...");

      console.log("\n");

      await startNodeProcess(binPath, args, {});

      console.log("\n");

      logger.info("Stopped process ...");
    } catch (err) {
      logger.error("Found unexpected runtime error. Exiting KYSOR ...");
      if (err) {
        logger.error(err);
      }
      process.exit(1);
    }
  }
};
