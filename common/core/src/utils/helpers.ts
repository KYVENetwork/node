import { BigNumber } from "bignumber.js";
import crypto from "crypto";
import { DataItem } from "..";

export const toHumanReadable = (amount: string, stringDecimals = 4): string => {
  const fmt = new BigNumber(amount || "0")
    .div(10 ** 9)
    .toFixed(stringDecimals, 1);

  if (stringDecimals > 1) {
    return `${fmt.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${
      fmt.split(".")[1]
    }`;
  }

  return fmt.split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const sleep = (timeoutMs: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeoutMs));
};

export const standardizeJSON = (object: any): any =>
  JSON.parse(JSON.stringify(object));

export const bundleToBytes = (bundle: DataItem[]): Buffer =>
  Buffer.from(JSON.stringify(bundle));

export const bytesToBundle = (bytes: Buffer): DataItem[] =>
  JSON.parse(bytes.toString());

export const sha256 = (data: Buffer) => {
  const sha256Hasher = crypto.createHash("sha256");
  return sha256Hasher.update(data).digest("hex");
};

type OptionsRetryerType = {
  limitTimeoutMs: number;
  increaseByMs: number;
  maxRequests?: number;
};

type onEachErrorRetryerType = (
  value: Error,
  ctx: {
    nextTimeoutInMs: number;
    numberOfRetries: number;
    options: OptionsRetryerType;
  }
) => void;

export async function callWithBackoffStrategy<T>(
  execution: () => Promise<T>,
  options: OptionsRetryerType,
  onEachError?: onEachErrorRetryerType
): Promise<T> {
  let time = options.increaseByMs;
  let requests = 1;

  return new Promise(async (resolve) => {
    while (true) {
      try {
        return resolve(await execution());
      } catch (e) {
        if (onEachError) {
          await onEachError(e as Error, {
            nextTimeoutInMs: time,
            numberOfRetries: requests,
            options,
          });
        }

        await sleep(time);

        if (time < options.limitTimeoutMs) {
          time += options.increaseByMs;

          if (time > options.limitTimeoutMs) {
            time = options.limitTimeoutMs;
          }
        }

        if (options.maxRequests && requests >= options.maxRequests) {
          throw e;
        }

        requests++;
      }
    }
  });
}
