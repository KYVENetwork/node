import { Logger } from "tslog";
import { Pool } from "../../proto/dist/proto/kyve/registry/v1beta1/registry";
import { Node } from "../src/index";
import { TestRuntime } from "./mocks/integration";
import { shouldIdle } from "../src/methods/shouldIdle";
import BigNumber from "bignumber.js";

describe("src/methods/shouldIdle.ts", () => {
  let core: Node;

  let loggerInfo: jest.Mock;
  let loggerDebug: jest.Mock;
  let loggerWarn: jest.Mock;
  let loggerError: jest.Mock;

  let processExit: jest.Mock<never, never>;

  beforeEach(() => {
    core = new Node();

    core.addRuntime(new TestRuntime());

    // mock process.exit
    processExit = jest.fn<never, never>();
    process.exit = processExit;

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
  });

  test("shouldIdle: validate if pool is upgrading", () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      upgrade_plan: {
        version: "1.0.0",
        scheduled_at: Math.floor(Date.now() / 1000).toString(),
        binaries: "{}",
      },
    } as Pool;

    // ACT
    const res = shouldIdle.call(core);

    // ASSERT
    expect(res).toBeTruthy();

    expect(loggerInfo).toHaveBeenCalledTimes(1);
    expect(loggerInfo).toHaveBeenNthCalledWith(
      1,
      "Pool is upgrading. Idling ..."
    );
  });

  test("shouldIdle: validate if pool is paused", () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      upgrade_plan: {},
      paused: true,
    } as Pool;

    // ACT
    const res = shouldIdle.call(core);

    // ASSERT
    expect(res).toBeTruthy();

    expect(loggerInfo).toHaveBeenCalledTimes(1);
    expect(loggerInfo).toHaveBeenNthCalledWith(1, "Pool is paused. Idling ...");
  });

  test("shouldIdle: validate if pool has enough stake", () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      upgrade_plan: {},
      paused: false,
      total_stake: new BigNumber(2000).multipliedBy(10 ** 9).toString(),
      min_stake: new BigNumber(10000).multipliedBy(10 ** 9).toString(),
    } as Pool;

    // ACT
    const res = shouldIdle.call(core);

    // ASSERT
    expect(res).toBeTruthy();

    expect(loggerInfo).toHaveBeenCalledTimes(1);
    expect(loggerInfo).toHaveBeenNthCalledWith(
      1,
      "Not enough stake in pool. Waiting for additional stakes. Idling ..."
    );
  });

  test("shouldIdle: validate if pool has enough funds", () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      upgrade_plan: {},
      paused: false,
      total_stake: new BigNumber(20000).multipliedBy(10 ** 9).toString(),
      min_stake: new BigNumber(10000).multipliedBy(10 ** 9).toString(),
      total_funds: "0",
    } as Pool;

    // ACT
    const res = shouldIdle.call(core);

    // ASSERT
    expect(res).toBeTruthy();

    expect(loggerInfo).toHaveBeenCalledTimes(1);
    expect(loggerInfo).toHaveBeenNthCalledWith(
      1,
      "Pool is out of funds. Waiting for additional funds. Idling ..."
    );
  });

  test("shouldIdle: validate if pool has enough funds", () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      upgrade_plan: {},
      paused: false,
      total_stake: new BigNumber(20000).multipliedBy(10 ** 9).toString(),
      min_stake: new BigNumber(10000).multipliedBy(10 ** 9).toString(),
      total_funds: new BigNumber(1000).multipliedBy(10 ** 9).toString(),
    } as Pool;

    // ACT
    const res = shouldIdle.call(core);

    // ASSERT
    expect(res).toBeFalsy();

    expect(loggerInfo).not.toHaveBeenCalled();
  });
});
