import { spawn, SpawnOptionsWithoutStdio } from "child_process";
import crypto from "crypto";
import { createReadStream } from "fs";

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const startNodeProcess = (
  command: string,
  args: string[],
  options: SpawnOptionsWithoutStdio
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    try {
      const child = spawn(command, args, options);

      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);

      child.stderr.on("data", (data: Buffer) => {
        if (data.toString().includes("Running an invalid version.")) {
          child.kill();
          resolve();
        }
      });

      child.on("error", (err) => {
        child.kill();
        reject(err);
      });

      child.on("close", () => {
        child.kill();
        reject();
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const getChecksum = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const input = createReadStream(path);

    input.on("error", reject);

    input.on("data", (chunk: Buffer) => {
      hash.update(chunk);
    });

    input.on("close", () => {
      resolve(hash.digest("hex"));
    });
  });
};
