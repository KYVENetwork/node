import { Logger } from "tslog";
import { Node } from "../src/index";
import { TestRuntime } from "./mocks/integration";
import { syncPoolState } from "../src/methods/syncPoolState";

jest.setTimeout(20000);

describe("src/methods/syncPoolState.ts", () => {
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

    core["poolId"] = 0;
  });

  test("syncPoolState: validate sync pool state with valid return", async () => {
    // ARRANGE
    const poolMock = jest.fn().mockResolvedValue({
      pool: {
        name: "Moontest",
        config: '{"rpc":"https://rpc.api.moonbeam.network"}',
      },
    });

    core.query = {
      kyve: {
        registry: {
          v1beta1: {
            pool: poolMock,
          } as any,
        },
      },
    } as any;

    // ACT
    await syncPoolState.call(core);

    // ASSERT
    expect(poolMock).toHaveBeenCalledTimes(1);
    expect(poolMock).toHaveBeenNthCalledWith(1, { id: "0" });

    expect(core.pool.name).toEqual("Moontest");
    expect(core.poolConfig).toEqual({
      rpc: "https://rpc.api.moonbeam.network",
    });
  });

  test("syncPoolState: validate sync pool state with invalid config", async () => {
    // ARRANGE
    const poolMock = jest.fn().mockResolvedValue({
      pool: {
        name: "Moontest",
        config: "invalid_config",
      },
    });

    core.query = {
      kyve: {
        registry: {
          v1beta1: {
            pool: poolMock,
          } as any,
        },
      },
    } as any;

    // ACT
    await syncPoolState.call(core);

    // ASSERT
    expect(poolMock).toHaveBeenCalledTimes(1);
    expect(poolMock).toHaveBeenNthCalledWith(1, { id: "0" });

    expect(loggerDebug).toHaveBeenCalledTimes(1);
    expect(loggerDebug).toHaveBeenNthCalledWith(
      1,
      `Failed to parse the pool config: ${"invalid_config"}`
    );

    expect(core.pool.name).toEqual("Moontest");
    expect(core.poolConfig).toEqual({});
  });

  test("syncPoolState: validate sync pool state with error return", async () => {
    // ARRANG
    const poolMock = jest
      .fn()
      .mockRejectedValueOnce(new Error("Failed Network Request"))
      .mockResolvedValue({
        pool: {
          name: "Moontest",
          config: '{"rpc":"https://rpc.api.moonbeam.network"}',
        },
      });

    core.query = {
      kyve: {
        registry: {
          v1beta1: {
            pool: poolMock,
          } as any,
        },
      },
    } as any;

    // // ACT
    await syncPoolState.call(core);

    // // ASSERT
    expect(loggerInfo).toHaveBeenCalledTimes(1);
    expect(loggerDebug).toHaveBeenCalledTimes(1);
    expect(loggerDebug).toHaveBeenNthCalledWith(
      1,
      new Error("Failed Network Request")
    );

    expect(poolMock).toHaveBeenCalledTimes(2);
    expect(poolMock).toHaveBeenNthCalledWith(1, { id: "0" });
    expect(poolMock).toHaveBeenNthCalledWith(2, { id: "0" });

    expect(core.pool.name).toEqual("Moontest");
    expect(core.poolConfig).toEqual({
      rpc: "https://rpc.api.moonbeam.network",
    });
  });
});
