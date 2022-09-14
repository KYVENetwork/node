import { Logger } from "tslog";
import { Node } from "../src/index";
import { TestRuntime } from "./mocks/integration";
import { shouldIdle } from "../src/methods/shouldIdle";
import BigNumber from "bignumber.js";
import { TestStorageProvider } from "./mocks/storageProvider";
import { TestCompression } from "./mocks/compression";

describe("src/methods/shouldIdle.ts", () => {
  let core: Node;

  let loggerInfo: jest.Mock;
  let loggerDebug: jest.Mock;
  let loggerWarn: jest.Mock;
  let loggerError: jest.Mock;

  let processExit: jest.Mock<never, never>;
  let setTimeoutMock: jest.Mock;

  beforeEach(() => {
    core = new Node();

    core.addRuntime(new TestRuntime());
    core.addStorageProvider(new TestStorageProvider());
    core.addCompression(new TestCompression());

    // mock process.exit
    processExit = jest.fn<never, never>();
    process.exit = processExit;

    // mock setTimeout
    setTimeoutMock = jest
      .fn()
      .mockImplementation(
        (
          callback: (args: void) => void,
          ms?: number | undefined
        ): NodeJS.Timeout => {
          callback();
          return null as any;
        }
      );
    global.setTimeout = setTimeoutMock as any;

    // mock logger
    core.logger = new Logger();

    loggerInfo = jest.fn();
    loggerDebug = jest.fn();
    loggerWarn = jest.fn();
    loggerError = jest.fn();

    core.logger.info = loggerInfo;
    core.logger.debug = loggerDebug;
    core.logger.warn = loggerWarn;
    core.logger.error = loggerError;

    core["poolId"] = 0;
    core["staker"] = "test_staker";
  });

  test("shouldIdle: validate if pool is upgrading", () => {
    // ARRANGE
    core.pool = {
      data: {
        name: "Moontest",
        upgrade_plan: {
          version: "1.0.0",
          scheduled_at: Math.floor(Date.now() / 1000).toString(),
          binaries: "{}",
        },
      },
    } as any;

    // ACT
    const res = shouldIdle.call(core);

    // ASSERT
    expect(res).toBeTruthy();

    expect(loggerInfo).toHaveBeenCalledTimes(1);
    expect(loggerInfo).toHaveBeenLastCalledWith(
      "Pool is upgrading. Idling ..."
    );
  });

  test("shouldIdle: validate if pool is paused", () => {
    // ARRANGE
    core.pool = {
      data: {
        name: "Moontest",
        upgrade_plan: {},
        paused: true,
      },
    } as any;

    // ACT
    const res = shouldIdle.call(core);

    // ASSERT
    expect(res).toBeTruthy();

    expect(loggerInfo).toHaveBeenCalledTimes(1);
    expect(loggerInfo).toHaveBeenLastCalledWith("Pool is paused. Idling ...");
  });

  test("shouldIdle: validate if pool has enough stake", () => {
    // ARRANGE
    core.pool = {
      data: {
        name: "Moontest",
        upgrade_plan: {},
        paused: false,
        min_stake: new BigNumber(10000).multipliedBy(10 ** 9).toString(),
      },
      total_delegation: new BigNumber(2000).multipliedBy(10 ** 9).toString(),
    } as any;

    // ACT
    const res = shouldIdle.call(core);

    // ASSERT
    expect(res).toBeTruthy();

    expect(loggerInfo).toHaveBeenCalledTimes(1);
    expect(loggerInfo).toHaveBeenLastCalledWith(
      "Not enough stake in pool. Waiting for additional stakes. Idling ..."
    );
  });

  test("shouldIdle: validate if pool has enough funds", () => {
    // ARRANGE
    core.pool = {
      data: {
        name: "Moontest",
        upgrade_plan: {},
        paused: false,
        min_stake: new BigNumber(10000).multipliedBy(10 ** 9).toString(),
        total_funds: "0",
      },
      total_delegation: new BigNumber(20000).multipliedBy(10 ** 9).toString(),
    } as any;

    // ACT
    const res = shouldIdle.call(core);

    // ASSERT
    expect(res).toBeTruthy();

    expect(loggerInfo).toHaveBeenCalledTimes(1);
    expect(loggerInfo).toHaveBeenLastCalledWith(
      "Pool is out of funds. Waiting for additional funds. Idling ..."
    );
  });

  test("shouldIdle: validate if pool can run", () => {
    // ARRANGE
    core.pool = {
      data: {
        name: "Moontest",
        upgrade_plan: {},
        paused: false,
        min_stake: new BigNumber(10000).multipliedBy(10 ** 9).toString(),
        total_funds: new BigNumber(1000).multipliedBy(10 ** 9).toString(),
      },
      total_delegation: new BigNumber(20000).multipliedBy(10 ** 9).toString(),
    } as any;

    // ACT
    const res = shouldIdle.call(core);

    // ASSERT
    expect(res).toBeFalsy();

    expect(loggerInfo).not.toHaveBeenCalled();
  });
});
