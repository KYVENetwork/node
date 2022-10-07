import { Logger } from "tslog";
import { Node } from "../src/index";
import {
  formatValueMock,
  getDataItemMock,
  TestRuntime,
  validateMock,
} from "./mocks/integration";
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
* TODO: start caching from a pool which has a bundle proposal ongoing
* TODO: start caching from a pool which has multiple bundle proposals ongoing
* TODO: start caching from a pool where last bundle proposal was dropped
* TODO: start caching from a pool where getNextDataItem fails once
* TODO: start caching from a pool where getNextDataItem fails multiple times
* TODO: start caching from a pool where cache methods fail

*/

describe("cache tests", () => {
  let core: Node;

  let loggerInfo: jest.Mock;
  let loggerDebug: jest.Mock;
  let loggerWarn: jest.Mock;
  let loggerError: jest.Mock;

  let processExit: jest.Mock<never, never>;
  let setTimeoutMock: jest.Mock;

  let getNextKeyMock: jest.Mock;

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

    core["continueRound"] = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValue(false);

    core["waitForCacheContinuation"] = jest.fn();

    getNextKeyMock = jest.fn().mockImplementation(async (key: string) => {
      return (parseInt(key) + 1).toString();
    });

    core["runtime"].getNextKey = getNextKeyMock;

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
    getDataItemMock.mockClear();
    validateMock.mockClear();
    getNextKeyMock.mockClear();
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

    // ACT
    await runCache.call(core);

    // ASSERT

    // =========================
    // ASSERT RUNTIME INTERFACES
    // =========================

    expect(getDataItemMock).toHaveBeenCalledTimes(
      +base_pool.data.max_bundle_size
    );

    for (let n = 0; n < +base_pool.data.max_bundle_size; n++) {
      expect(getDataItemMock).toHaveBeenNthCalledWith(
        n + 1,
        core,
        n.toString()
      );
    }

    expect(validateMock).toHaveBeenCalledTimes(0);

    // we only call getNextKey max_bundle_size - 1 because
    // the pool is in genesis state and therefore start_key
    // is used for the first time
    expect(getNextKeyMock).toHaveBeenCalledTimes(
      +base_pool.data.max_bundle_size - 1
    );

    for (let n = 0; n < +base_pool.data.max_bundle_size - 1; n++) {
      expect(getNextKeyMock).toHaveBeenNthCalledWith(n + 1, n.toString());
    }

    expect(formatValueMock).toHaveBeenCalledTimes(0);

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(putMock).toHaveBeenCalledTimes(+base_pool.data.max_bundle_size);

    for (let n = 0; n < +base_pool.data.max_bundle_size; n++) {
      const item = await core["runtime"].getDataItem(core, n.toString());
      expect(putMock).toHaveBeenNthCalledWith(n + 1, n.toString(), item);
    }

    expect(getMock).toHaveBeenCalledTimes(0);

    expect(existsMock).toHaveBeenCalledTimes(+base_pool.data.max_bundle_size);

    for (let n = 0; n < +base_pool.data.max_bundle_size; n++) {
      expect(existsMock).toHaveBeenNthCalledWith(n + 1, n.toString());
    }

    expect(delMock).toHaveBeenCalledTimes(0);

    expect(dropMock).toHaveBeenCalledTimes(0);
  });

  test("start caching from a pool which has a bundle proposal ongoing", async () => {
    // ARRANGE
    const syncPoolStateMock = jest.fn().mockImplementationOnce(() => {
      core.pool = {
        ...base_pool,
        data: {
          ...base_pool.data,
          current_key: "99",
          current_height: "99",
        },
        bundle_proposal: {
          ...base_pool.bundle_proposal,
          storage_id: "test_storage_id",
          uploader: "test_staker",
          next_uploader: "test_staker",
          byte_size: "123456789",
          to_height: "149",
          to_key: "149",
          to_value: "149-value",
          bundle_hash: "test_bundle_hash",
          created_at: "0",
          voters_valid: ["test_staker"],
        },
      } as any;
    });
    core["syncPoolState"] = syncPoolStateMock;

    // ACT
    await runCache.call(core);

    // ASSERT

    // =========================
    // ASSERT RUNTIME INTERFACES
    // =========================

    expect(getDataItemMock).toHaveBeenCalledTimes(
      50 + +base_pool.data.max_bundle_size
    );

    for (let n = 0; n < 50 + +base_pool.data.max_bundle_size; n++) {
      expect(getDataItemMock).toHaveBeenNthCalledWith(
        n + 1,
        core,
        (n + 100).toString()
      );
    }

    expect(validateMock).toHaveBeenCalledTimes(0);

    expect(getNextKeyMock).toHaveBeenCalledTimes(
      50 + +base_pool.data.max_bundle_size
    );

    // here we subtract the key - 1 because we start using the
    // current key
    for (let n = 0; n < 50 + +base_pool.data.max_bundle_size; n++) {
      expect(getNextKeyMock).toHaveBeenNthCalledWith(
        n + 1,
        (n + 100 - 1).toString()
      );
    }

    expect(formatValueMock).toHaveBeenCalledTimes(0);

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(putMock).toHaveBeenCalledTimes(50 + +base_pool.data.max_bundle_size);

    for (let n = 0; n < 50 + +base_pool.data.max_bundle_size; n++) {
      const item = await core["runtime"].getDataItem(
        core,
        (n + 100).toString()
      );
      expect(putMock).toHaveBeenNthCalledWith(
        n + 1,
        (n + 100).toString(),
        item
      );
    }

    expect(getMock).toHaveBeenCalledTimes(0);

    expect(existsMock).toHaveBeenCalledTimes(
      50 + +base_pool.data.max_bundle_size
    );

    for (let n = 0; n < 50 + +base_pool.data.max_bundle_size; n++) {
      expect(existsMock).toHaveBeenNthCalledWith(n + 1, (n + 100).toString());
    }

    expect(delMock).toHaveBeenCalledTimes(100);

    for (let n = 0; n < 100; n++) {
      expect(delMock).toHaveBeenNthCalledWith(n + 1, (99 - n).toString());
    }

    expect(dropMock).toHaveBeenCalledTimes(0);
  });
});
