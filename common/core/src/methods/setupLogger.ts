import { Node } from "..";
import { appendFileSync, existsSync, mkdirSync } from "fs";
import { ILogObject, Logger } from "tslog";
import path from "path";

export function setupLogger(this: Node): Logger {
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

  return logger;
}
