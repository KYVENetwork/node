import { Node } from "../..";
import { appendFileSync, existsSync, mkdirSync } from "fs";
import { ILogObject, Logger } from "tslog";
import path from "path";

/**
 * setupLogger creates the logger instance and defines the home and file
 * where logs are saved for debugging.
 *
 * @method setupLogger
 * @param {Node} this
 * @return {void}
 */
export function setupLogger(this: Node): void {
  try {
    if (!existsSync(path.join(this.home, "logs"))) {
      mkdirSync(path.join(this.home, "logs"), { recursive: true });
    }

    const logFile = `${new Date().toISOString()}.log`;

    const logToTransport = (log: ILogObject) => {
      appendFileSync(
        path.join(this.home, `logs`, logFile),
        JSON.stringify(log) + "\n"
      );
    };

    const logger = new Logger({
      displayFilePath: "hidden",
      displayFunctionName: false,
    });

    logger.setSettings({
      minLevel: this.verbose ? undefined : "info",
    });

    logger.attachTransport({
      silly: logToTransport,
      debug: logToTransport,
      trace: logToTransport,
      info: logToTransport,
      warn: logToTransport,
      error: logToTransport,
      fatal: logToTransport,
    });

    this.logger = logger;
  } catch (error) {
    this.logger.error(`Failed to init logger. Exiting ...`);
    this.logger.debug(error);

    process.exit(1);
  }
}
