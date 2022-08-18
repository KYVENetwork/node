import { Logger } from "tslog";
import { Node } from "../src/index";
import { TestRuntime } from "./mocks/integration";
import { syncPoolState } from "../src/methods/syncPoolState";
import { TestStorageProvider } from "./mocks/storageProvider";
import { TestCompression } from "./mocks/compression";

describe("src/methods/syncPoolState.ts", () => {
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
  });

  test("syncPoolState: validate sync pool state with valid return", async () => {
    // ARRANGE
    const pool = {
      name: "Moontest",
      config: '{"rpc":"https://rpc.api.moonbeam.network"}',
    };

    const poolMock = jest.fn().mockResolvedValue({
      pool,
    });

    core.lcd = {
      kyve: {
        registry: {
          v1beta1: {
            pool: poolMock,
          },
        },
      },
    } as any;

    // ACT
    await syncPoolState.call(core);

    // ASSERT
    expect(poolMock).toHaveBeenLastCalledWith({ id: "0" });

    expect(core.pool).toEqual(pool);
    expect(core.poolConfig).toEqual(JSON.parse(pool.config));
  });

  test("syncPoolState: validate sync pool state with invalid config", async () => {
    // ARRANGE
    const pool = {
      name: "Moontest",
      config: "invalid_config",
    };

    const poolMock = jest.fn().mockResolvedValue({
      pool,
    });

    core.lcd = {
      kyve: {
        registry: {
          v1beta1: {
            pool: poolMock,
          },
        },
      },
    } as any;

    // ACT
    await syncPoolState.call(core);

    // ASSERT
    expect(poolMock).toHaveBeenLastCalledWith({ id: "0" });

    expect(core.pool).toEqual(pool);
    expect(core.poolConfig).toEqual({});
  });

  test("syncPoolState: validate sync pool state with error return", async () => {
    // ARRANG
    const pool = {
      name: "Moontest",
      config: '{"rpc":"https://rpc.api.moonbeam.network"}',
    };
    const error = new Error("Failed Network Request");

    const poolMock = jest.fn().mockRejectedValueOnce(error).mockResolvedValue({
      pool,
    });

    core.lcd = {
      kyve: {
        registry: {
          v1beta1: {
            pool: poolMock,
          },
        },
      },
    } as any;

    // ACT
    await syncPoolState.call(core);

    // ASSERT
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function),
      10 * 1000
    );

    expect(loggerDebug).toHaveBeenLastCalledWith(error);

    expect(poolMock).toHaveBeenCalledTimes(2);
    expect(poolMock).toHaveBeenNthCalledWith(1, { id: "0" });
    expect(poolMock).toHaveBeenNthCalledWith(2, { id: "0" });

    expect(core.pool).toEqual(pool);
    expect(core.poolConfig).toEqual(JSON.parse(pool.config));
  });

  test("syncPoolState: validate sync pool state with error return", async () => {
    // ARRANG
    const pool = {
      name: "Moontest",
      config: '{"rpc":"https://rpc.api.moonbeam.network"}',
    };
    const error = new Error("Failed Network Request");

    const poolMock = jest
      .fn()
      .mockRejectedValueOnce(error)
      .mockRejectedValueOnce(error)
      .mockResolvedValue({
        pool,
      });

    core.lcd = {
      kyve: {
        registry: {
          v1beta1: {
            pool: poolMock,
          },
        },
      },
    } as any;

    // ACT
    await syncPoolState.call(core);

    // ASSERT
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenNthCalledWith(
      1,
      expect.any(Function),
      10 * 1000
    );
    expect(setTimeout).toHaveBeenNthCalledWith(
      2,
      expect.any(Function),
      2 * 10 * 1000
    );

    expect(loggerDebug).toHaveBeenLastCalledWith(error);

    expect(poolMock).toHaveBeenCalledTimes(3);
    expect(poolMock).toHaveBeenNthCalledWith(1, { id: "0" });
    expect(poolMock).toHaveBeenNthCalledWith(2, { id: "0" });
    expect(poolMock).toHaveBeenNthCalledWith(3, { id: "0" });

    expect(core.pool).toEqual(pool);
    expect(core.poolConfig).toEqual(JSON.parse(pool.config));
  });
});
