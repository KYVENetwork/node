import { Logger } from "tslog";
import { Node } from "../src/index";
import {
  summarizeBundleMock,
  getDataItemMockByKey,
  TestRuntime,
  validateBundleMock,
} from "./mocks/runtime";
import { TestStorageProvider } from "./mocks/storageProvider";
import { TestCompression } from "./mocks/compression";
import { client, lcd, genesis_pool } from "./mocks/helpers";
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

  let nextKeyMock: jest.Mock;

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

    nextKeyMock = jest.fn().mockImplementation(async (key: string) => {
      return (parseInt(key) + 1).toString();
    });

    core["runtime"].nextKey = nextKeyMock;

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
    getDataItemMockByKey.mockClear();
    validateBundleMock.mockClear();
    nextKeyMock.mockClear();
    summarizeBundleMock.mockClear();

    // reset prometheus
    register.clear();
  });

  test("start caching from a pool which is in genesis state", async () => {
    // ARRANGE
    const syncPoolStateMock = jest.fn().mockImplementationOnce(() => {
      core.pool = {
        ...genesis_pool,
      } as any;
    });
    core["syncPoolState"] = syncPoolStateMock;

    // ACT
    await runCache.call(core);

    // ASSERT

    // =========================
    // ASSERT RUNTIME INTERFACES
    // =========================

    expect(getDataItemMockByKey).toHaveBeenCalledTimes(
      +genesis_pool.data.max_bundle_size
    );

    for (let n = 0; n < +genesis_pool.data.max_bundle_size; n++) {
      expect(getDataItemMockByKey).toHaveBeenNthCalledWith(
        n + 1,
        core,
        n.toString()
      );
    }

    expect(validateBundleMock).toHaveBeenCalledTimes(0);

    // we only call getNextKey max_bundle_size - 1 because
    // the pool is in genesis state and therefore start_key
    // is used for the first time
    expect(nextKeyMock).toHaveBeenCalledTimes(
      +genesis_pool.data.max_bundle_size - 1
    );

    for (let n = 0; n < +genesis_pool.data.max_bundle_size - 1; n++) {
      expect(nextKeyMock).toHaveBeenNthCalledWith(n + 1, n.toString());
    }

    expect(summarizeBundleMock).toHaveBeenCalledTimes(0);

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(putMock).toHaveBeenCalledTimes(+genesis_pool.data.max_bundle_size);

    for (let n = 0; n < +genesis_pool.data.max_bundle_size; n++) {
      const item = await core["runtime"].getDataItemByKey(core, n.toString());
      expect(putMock).toHaveBeenNthCalledWith(n + 1, n.toString(), item);
    }

    expect(getMock).toHaveBeenCalledTimes(0);

    expect(existsMock).toHaveBeenCalledTimes(
      +genesis_pool.data.max_bundle_size
    );

    for (let n = 0; n < +genesis_pool.data.max_bundle_size; n++) {
      expect(existsMock).toHaveBeenNthCalledWith(n + 1, n.toString());
    }

    expect(delMock).toHaveBeenCalledTimes(0);

    expect(dropMock).toHaveBeenCalledTimes(1);
  });

  test("start caching from a pool which has a bundle proposal ongoing", async () => {
    // ARRANGE
    const syncPoolStateMock = jest.fn().mockImplementationOnce(() => {
      core.pool = {
        ...genesis_pool,
        data: {
          ...genesis_pool.data,
          current_key: "99",
          current_index: "100",
        },
        bundle_proposal: {
          ...genesis_pool.bundle_proposal,
          storage_id: "test_storage_id",
          uploader: "test_staker",
          next_uploader: "test_staker",
          data_size: "123456789",
          data_hash: "test_bundle_hash",
          bundle_size: "50",
          from_key: "100",
          to_key: "149",
          bundle_summary: "test_summary",
          updated_at: "0",
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

    expect(getDataItemMockByKey).toHaveBeenCalledTimes(
      parseInt(genesis_pool.data.max_bundle_size) + 50
    );

    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size) + 50; n++) {
      expect(getDataItemMockByKey).toHaveBeenNthCalledWith(
        n + 1,
        core,
        (n + 100).toString()
      );
    }

    expect(validateBundleMock).toHaveBeenCalledTimes(0);

    expect(nextKeyMock).toHaveBeenCalledTimes(
      parseInt(genesis_pool.data.max_bundle_size) + 50
    );

    // here we subtract the key - 1 because we start using the
    // current key
    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size) + 50; n++) {
      expect(nextKeyMock).toHaveBeenNthCalledWith(
        n + 1,
        (n + 100 - 1).toString()
      );
    }

    expect(summarizeBundleMock).toHaveBeenCalledTimes(0);

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(putMock).toHaveBeenCalledTimes(
      parseInt(genesis_pool.data.max_bundle_size) + 50
    );

    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size) + 50; n++) {
      const item = await core["runtime"].getDataItemByKey(
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
      parseInt(genesis_pool.data.max_bundle_size) + 50
    );

    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size) + 50; n++) {
      expect(existsMock).toHaveBeenNthCalledWith(n + 1, (n + 100).toString());
    }

    expect(delMock).toHaveBeenCalledTimes(100);

    for (let n = 0; n < 100; n++) {
      expect(delMock).toHaveBeenNthCalledWith(n + 1, n.toString());
    }

    expect(dropMock).toHaveBeenCalledTimes(0);
  });
});
