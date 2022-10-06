import { Logger } from "tslog";
import { Node } from "../src/index";
import { formatValueMock, TestRuntime } from "./mocks/integration";
import { TestStorageProvider } from "./mocks/storageProvider";
import { TestCompression } from "./mocks/compression";
import { client, lcd, base_pool } from "./mocks/helpers";
import { runCache, setupMetrics } from "../src/methods";
import { register } from "prom-client";
import {
  TestCache,
  putMock,
  getMock,
  existsMock,
  delMock,
  dropMock,
} from "./mocks/cache";

/*

TEST CASES - cache tests

* start caching from a pool which is in genesis state

*/

describe("cache tests", () => {
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
    core.addCache(new TestCache());

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

    core.client = client();
    core.lcd = lcd();

    setupMetrics.call(core);
  });

  afterEach(() => {
    // cache mocks
    putMock.mockClear();
    getMock.mockClear();
    existsMock.mockClear();
    delMock.mockClear();
    dropMock.mockClear();

    // runtime mocks
    formatValueMock.mockClear();

    // reset prometheus
    register.clear();
  });

  test("start caching from a pool which is in genesis state", async () => {
    // ARRANGE
    const syncPoolStateMock = jest.fn().mockImplementationOnce(() => {
      core.pool = {
        ...base_pool,
      } as any;
    });
    core["syncPoolState"] = syncPoolStateMock;

    // TODO: evaluate exit condition
    core["continueRound"] = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValue(false);

    // ACT
    await runCache.call(core);

    // ASSERT

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(putMock).toHaveBeenCalledTimes(1);

    expect(getMock).toHaveBeenCalledTimes(1);

    expect(existsMock).toHaveBeenCalledTimes(1);

    expect(delMock).toHaveBeenCalledTimes(1);

    expect(dropMock).toHaveBeenCalledTimes(1);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // TODO: assert timeouts
  });
});
