import { Logger } from "tslog";
import { Node } from "../src/index";
import { runCache } from "../src/methods/main/runCache";
import { genesis_pool } from "./mocks/constants";
import { client } from "./mocks/client.mock";
import { lcd } from "./mocks/lcd.mock";
import { TestStorageProvider } from "./mocks/storageProvider.mock";
import { TestCache } from "./mocks/cache.mock";
import { TestCompression } from "./mocks/compression.mock";
import { setupMetrics } from "../src/methods";
import { register } from "prom-client";
import { TestRuntime } from "./mocks/runtime.mock";

/*

TEST CASES - cache tests

* start caching from a pool which is in genesis state
* start caching from a pool which has a bundle proposal ongoing
* continue caching from a pool which has a bundle proposal ongoing
* start caching from a pool where last bundle proposal was dropped
* start caching from a pool where getNextDataItem fails once
* start caching from a pool where getNextDataItem fails multiple times
* start caching from a pool where cache methods fail

*/

describe("cache tests", () => {
  let core: Node;

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

    core.logger.info = jest.fn();
    core.logger.debug = jest.fn();
    core.logger.warn = jest.fn();
    core.logger.error = jest.fn();

    core["poolId"] = 0;
    core["staker"] = "test_staker";

    core.client = client();
    core.lcd = lcd();

    core["continueRound"] = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValue(false);

    core["waitForCacheContinuation"] = jest.fn();

    setupMetrics.call(core);
  });

  afterEach(() => {
    // reset prometheus
    register.clear();
  });

  test("start caching from a pool which is in genesis state", async () => {
    // ARRANGE
    core["syncPoolState"] = jest.fn().mockImplementationOnce(() => {
      core.pool = {
        ...genesis_pool,
      } as any;
    });

    // ACT
    await runCache.call(core);

    // ASSERT
    const txs = core["client"].kyve.bundles.v1beta1;
    const queries = core["lcd"].kyve.query.v1beta1;
    const storageProvider = core["storageProvider"];
    const cache = core["cache"];
    const compression = core["compression"];
    const runtime = core["runtime"];

    // ========================
    // ASSERT CLIENT INTERFACES
    // ========================

    expect(txs.claimUploaderRole).toHaveBeenCalledTimes(0);

    expect(txs.voteBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.submitBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.skipUploaderRole).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(queries.canVote).toHaveBeenCalledTimes(0);

    expect(queries.canPropose).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(storageProvider.saveBundle).toHaveBeenCalledTimes(0);

    expect(storageProvider.retrieveBundle).toHaveBeenCalledTimes(0);

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cache.put).toHaveBeenCalledTimes(+genesis_pool.data.max_bundle_size);

    for (let n = 0; n < +genesis_pool.data.max_bundle_size; n++) {
      const item = {
        key: n.toString(),
        value: `${n}-value`,
      };
      expect(cache.put).toHaveBeenNthCalledWith(n + 1, n.toString(), item);
    }

    expect(cache.get).toHaveBeenCalledTimes(0);

    expect(cache.exists).toHaveBeenCalledTimes(
      +genesis_pool.data.max_bundle_size
    );

    for (let n = 0; n < +genesis_pool.data.max_bundle_size; n++) {
      expect(cache.exists).toHaveBeenNthCalledWith(n + 1, n.toString());
    }

    expect(cache.del).toHaveBeenCalledTimes(0);

    expect(cache.drop).toHaveBeenCalledTimes(1);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compression.compress).toHaveBeenCalledTimes(0);

    expect(compression.decompress).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT RUNTIME INTERFACES
    // =========================

    expect(runtime.getDataItemByKey).toHaveBeenCalledTimes(
      +genesis_pool.data.max_bundle_size
    );

    for (let n = 0; n < +genesis_pool.data.max_bundle_size; n++) {
      expect(runtime.getDataItemByKey).toHaveBeenNthCalledWith(
        n + 1,
        core,
        n.toString()
      );
    }

    expect(runtime.validateBundle).toHaveBeenCalledTimes(0);

    // we only call getNextKey max_bundle_size - 1 because
    // the pool is in genesis state and therefore start_key
    // is used for the first time
    expect(runtime.nextKey).toHaveBeenCalledTimes(
      +genesis_pool.data.max_bundle_size - 1
    );

    for (let n = 0; n < +genesis_pool.data.max_bundle_size - 1; n++) {
      expect(runtime.nextKey).toHaveBeenNthCalledWith(n + 1, n.toString());
    }

    expect(runtime.summarizeBundle).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(core["waitForCacheContinuation"]).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("start caching from a pool which has a bundle proposal ongoing", async () => {
    // ARRANGE
    core["syncPoolState"] = jest.fn().mockImplementationOnce(() => {
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

    // ACT
    await runCache.call(core);

    // ASSERT
    const txs = core["client"].kyve.bundles.v1beta1;
    const queries = core["lcd"].kyve.query.v1beta1;
    const storageProvider = core["storageProvider"];
    const cache = core["cache"];
    const compression = core["compression"];
    const runtime = core["runtime"];

    // ========================
    // ASSERT CLIENT INTERFACES
    // ========================

    expect(txs.claimUploaderRole).toHaveBeenCalledTimes(0);

    expect(txs.voteBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.submitBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.skipUploaderRole).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(queries.canVote).toHaveBeenCalledTimes(0);

    expect(queries.canPropose).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(storageProvider.saveBundle).toHaveBeenCalledTimes(0);

    expect(storageProvider.retrieveBundle).toHaveBeenCalledTimes(0);

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cache.put).toHaveBeenCalledTimes(
      parseInt(genesis_pool.data.max_bundle_size) + 50
    );

    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size) + 50; n++) {
      const item = {
        key: (n + parseInt(genesis_pool.data.max_bundle_size)).toString(),
        value: `${n + parseInt(genesis_pool.data.max_bundle_size)}-value`,
      };
      expect(cache.put).toHaveBeenNthCalledWith(
        n + 1,
        (n + parseInt(genesis_pool.data.max_bundle_size)).toString(),
        item
      );
    }

    expect(cache.get).toHaveBeenCalledTimes(0);

    expect(cache.exists).toHaveBeenCalledTimes(
      parseInt(genesis_pool.data.max_bundle_size) + 50
    );

    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size) + 50; n++) {
      expect(cache.exists).toHaveBeenNthCalledWith(
        n + 1,
        (n + parseInt(genesis_pool.data.max_bundle_size)).toString()
      );
    }

    expect(cache.del).toHaveBeenCalledTimes(100);

    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size); n++) {
      expect(cache.del).toHaveBeenNthCalledWith(n + 1, n.toString());
    }

    expect(cache.drop).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compression.compress).toHaveBeenCalledTimes(0);

    expect(compression.decompress).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT RUNTIME INTERFACES
    // =========================

    expect(runtime.getDataItemByKey).toHaveBeenCalledTimes(
      parseInt(genesis_pool.data.max_bundle_size) + 50
    );

    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size) + 50; n++) {
      expect(runtime.getDataItemByKey).toHaveBeenNthCalledWith(
        n + 1,
        core,
        (n + parseInt(genesis_pool.data.max_bundle_size)).toString()
      );
    }

    expect(runtime.validateBundle).toHaveBeenCalledTimes(0);

    expect(runtime.nextKey).toHaveBeenCalledTimes(
      parseInt(genesis_pool.data.max_bundle_size) + 50
    );

    // here we subtract the key - 1 because we start using the
    // current key
    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size) + 50; n++) {
      expect(runtime.nextKey).toHaveBeenNthCalledWith(
        n + 1,
        (n + parseInt(genesis_pool.data.max_bundle_size) - 1).toString()
      );
    }

    expect(runtime.summarizeBundle).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(core["waitForCacheContinuation"]).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("continue caching from a pool which has a bundle proposal ongoing", async () => {
    // ARRANGE
    core["cache"].exists = jest
      .fn()
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(true)
      .mockResolvedValue(false);

    core["syncPoolState"] = jest.fn().mockImplementationOnce(() => {
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
          bundle_size: "3",
          from_key: "100",
          to_key: "102",
          bundle_summary: "test_summary",
          updated_at: "0",
          voters_valid: ["test_staker"],
        },
      } as any;
    });

    // ACT
    await runCache.call(core);

    // ASSERT
    const txs = core["client"].kyve.bundles.v1beta1;
    const queries = core["lcd"].kyve.query.v1beta1;
    const storageProvider = core["storageProvider"];
    const cache = core["cache"];
    const compression = core["compression"];
    const runtime = core["runtime"];

    // ========================
    // ASSERT CLIENT INTERFACES
    // ========================

    expect(txs.claimUploaderRole).toHaveBeenCalledTimes(0);

    expect(txs.voteBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.submitBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.skipUploaderRole).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(queries.canVote).toHaveBeenCalledTimes(0);

    expect(queries.canPropose).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(storageProvider.saveBundle).toHaveBeenCalledTimes(0);

    expect(storageProvider.retrieveBundle).toHaveBeenCalledTimes(0);

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cache.put).toHaveBeenCalledTimes(
      parseInt(genesis_pool.data.max_bundle_size)
    );

    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size); n++) {
      const item = {
        key: (n + parseInt(genesis_pool.data.max_bundle_size) + 3).toString(),
        value: `${n + parseInt(genesis_pool.data.max_bundle_size) + 3}-value`,
      };
      expect(cache.put).toHaveBeenNthCalledWith(
        n + 1,
        (n + parseInt(genesis_pool.data.max_bundle_size) + 3).toString(),
        item
      );
    }

    expect(cache.get).toHaveBeenCalledTimes(0);

    expect(cache.exists).toHaveBeenCalledTimes(
      parseInt(genesis_pool.data.max_bundle_size) + 3
    );

    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size) + 3; n++) {
      expect(cache.exists).toHaveBeenNthCalledWith(
        n + 1,
        (n + parseInt(genesis_pool.data.max_bundle_size)).toString()
      );
    }

    expect(cache.del).toHaveBeenCalledTimes(100);

    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size); n++) {
      expect(cache.del).toHaveBeenNthCalledWith(n + 1, n.toString());
    }

    expect(cache.drop).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compression.compress).toHaveBeenCalledTimes(0);

    expect(compression.decompress).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT RUNTIME INTERFACES
    // =========================

    expect(runtime.getDataItemByKey).toHaveBeenCalledTimes(
      parseInt(genesis_pool.data.max_bundle_size)
    );

    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size); n++) {
      expect(runtime.getDataItemByKey).toHaveBeenNthCalledWith(
        n + 1,
        core,
        (n + parseInt(genesis_pool.data.max_bundle_size) + 3).toString()
      );
    }

    expect(runtime.validateBundle).toHaveBeenCalledTimes(0);

    expect(runtime.nextKey).toHaveBeenCalledTimes(
      parseInt(genesis_pool.data.max_bundle_size) + 3
    );

    // here we subtract the key - 1 because we start using the
    // current key
    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size) + 3; n++) {
      expect(runtime.nextKey).toHaveBeenNthCalledWith(
        n + 1,
        (n + 100 - 1).toString()
      );
    }

    expect(runtime.summarizeBundle).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(core["waitForCacheContinuation"]).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("start caching from a pool where last bundle proposal was dropped", async () => {
    // ARRANGE
    core["syncPoolState"] = jest.fn().mockImplementationOnce(() => {
      core.pool = {
        ...genesis_pool,
        data: {
          ...genesis_pool.data,
          current_key: "99",
          current_index: "100",
        },
        bundle_proposal: {
          ...genesis_pool.bundle_proposal,
          storage_id: "",
          uploader: "",
          next_uploader: "test_staker",
          data_size: "0",
          data_hash: "",
          bundle_size: "0",
          from_key: "",
          to_key: "",
          bundle_summary: "",
          updated_at: "0",
        },
      } as any;
    });

    // ACT
    await runCache.call(core);

    // ASSERT
    const txs = core["client"].kyve.bundles.v1beta1;
    const queries = core["lcd"].kyve.query.v1beta1;
    const storageProvider = core["storageProvider"];
    const cache = core["cache"];
    const compression = core["compression"];
    const runtime = core["runtime"];

    // ========================
    // ASSERT CLIENT INTERFACES
    // ========================

    expect(txs.claimUploaderRole).toHaveBeenCalledTimes(0);

    expect(txs.voteBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.submitBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.skipUploaderRole).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(queries.canVote).toHaveBeenCalledTimes(0);

    expect(queries.canPropose).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(storageProvider.saveBundle).toHaveBeenCalledTimes(0);

    expect(storageProvider.retrieveBundle).toHaveBeenCalledTimes(0);

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cache.put).toHaveBeenCalledTimes(
      parseInt(genesis_pool.data.max_bundle_size)
    );

    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size); n++) {
      const item = {
        key: (n + parseInt(genesis_pool.data.max_bundle_size)).toString(),
        value: `${n + parseInt(genesis_pool.data.max_bundle_size)}-value`,
      };
      expect(cache.put).toHaveBeenNthCalledWith(
        n + 1,
        (n + parseInt(genesis_pool.data.max_bundle_size)).toString(),
        item
      );
    }

    expect(cache.get).toHaveBeenCalledTimes(0);

    expect(cache.exists).toHaveBeenCalledTimes(
      parseInt(genesis_pool.data.max_bundle_size)
    );

    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size); n++) {
      expect(cache.exists).toHaveBeenNthCalledWith(
        n + 1,
        (n + parseInt(genesis_pool.data.max_bundle_size)).toString()
      );
    }

    expect(cache.del).toHaveBeenCalledTimes(100);

    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size); n++) {
      expect(cache.del).toHaveBeenNthCalledWith(n + 1, n.toString());
    }

    expect(cache.drop).toHaveBeenCalledTimes(1);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compression.compress).toHaveBeenCalledTimes(0);

    expect(compression.decompress).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT RUNTIME INTERFACES
    // =========================

    expect(runtime.getDataItemByKey).toHaveBeenCalledTimes(
      parseInt(genesis_pool.data.max_bundle_size)
    );

    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size); n++) {
      expect(runtime.getDataItemByKey).toHaveBeenNthCalledWith(
        n + 1,
        core,
        (n + parseInt(genesis_pool.data.max_bundle_size)).toString()
      );
    }

    expect(runtime.validateBundle).toHaveBeenCalledTimes(0);

    expect(runtime.nextKey).toHaveBeenCalledTimes(
      parseInt(genesis_pool.data.max_bundle_size)
    );

    // here we subtract the key - 1 because we start using the
    // current key
    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size); n++) {
      expect(runtime.nextKey).toHaveBeenNthCalledWith(
        n + 1,
        (n + parseInt(genesis_pool.data.max_bundle_size) - 1).toString()
      );
    }

    expect(runtime.summarizeBundle).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(core["waitForCacheContinuation"]).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("start caching from a pool where getNextDataItem fails once", async () => {
    // ARRANGE
    core["runtime"].getDataItemByKey = jest
      .fn()
      .mockImplementationOnce((core: Node, key: string) =>
        Promise.resolve({
          key,
          value: `${key}-value`,
        })
      )
      .mockRejectedValueOnce(new Error("network error"))
      .mockImplementation((core: Node, key: string) =>
        Promise.resolve({
          key,
          value: `${key}-value`,
        })
      );

    core["syncPoolState"] = jest.fn().mockImplementationOnce(() => {
      core.pool = {
        ...genesis_pool,
        data: {
          ...genesis_pool.data,
          max_bundle_size: "2",
        },
      } as any;
    });

    // ACT
    await runCache.call(core);

    // ASSERT
    const txs = core["client"].kyve.bundles.v1beta1;
    const queries = core["lcd"].kyve.query.v1beta1;
    const storageProvider = core["storageProvider"];
    const cache = core["cache"];
    const compression = core["compression"];
    const runtime = core["runtime"];

    // ========================
    // ASSERT CLIENT INTERFACES
    // ========================

    expect(txs.claimUploaderRole).toHaveBeenCalledTimes(0);

    expect(txs.voteBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.submitBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.skipUploaderRole).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(queries.canVote).toHaveBeenCalledTimes(0);

    expect(queries.canPropose).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(storageProvider.saveBundle).toHaveBeenCalledTimes(0);

    expect(storageProvider.retrieveBundle).toHaveBeenCalledTimes(0);

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cache.put).toHaveBeenCalledTimes(2);

    for (let n = 0; n < 2; n++) {
      const item = {
        key: n.toString(),
        value: `${n}-value`,
      };
      expect(cache.put).toHaveBeenNthCalledWith(n + 1, n.toString(), item);
    }

    expect(cache.get).toHaveBeenCalledTimes(0);

    expect(cache.exists).toHaveBeenCalledTimes(2);

    for (let n = 0; n < 2; n++) {
      expect(cache.exists).toHaveBeenNthCalledWith(n + 1, n.toString());
    }

    expect(cache.del).toHaveBeenCalledTimes(0);

    expect(cache.drop).toHaveBeenCalledTimes(1);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compression.compress).toHaveBeenCalledTimes(0);

    expect(compression.decompress).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT RUNTIME INTERFACES
    // =========================

    expect(runtime.getDataItemByKey).toHaveBeenCalledTimes(2 + 1);

    expect(runtime.getDataItemByKey).toHaveBeenNthCalledWith(
      1,
      expect.any(Node),
      "0"
    );
    expect(runtime.getDataItemByKey).toHaveBeenNthCalledWith(
      2,
      expect.any(Node),
      "1"
    );
    expect(runtime.getDataItemByKey).toHaveBeenNthCalledWith(
      3,
      expect.any(Node),
      "1"
    );

    expect(runtime.validateBundle).toHaveBeenCalledTimes(0);

    // we only call getNextKey max_bundle_size - 1 because
    // the pool is in genesis state and therefore start_key
    // is used for the first time
    expect(runtime.nextKey).toHaveBeenCalledTimes(2 - 1);

    for (let n = 0; n < 2 - 1; n++) {
      expect(runtime.nextKey).toHaveBeenNthCalledWith(n + 1, n.toString());
    }

    expect(runtime.summarizeBundle).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(core["waitForCacheContinuation"]).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("start caching from a pool where getNextDataItem fails multiple times", async () => {
    // ARRANGE
    core["runtime"].getDataItemByKey = jest
      .fn()
      .mockImplementationOnce((core: Node, key: string) =>
        Promise.resolve({
          key,
          value: `${key}-value`,
        })
      )
      .mockRejectedValueOnce(new Error("network error"))
      .mockImplementationOnce((core: Node, key: string) =>
        Promise.resolve({
          key,
          value: `${key}-value`,
        })
      )
      .mockRejectedValueOnce(new Error("network error"))
      .mockImplementation((core: Node, key: string) =>
        Promise.resolve({
          key,
          value: `${key}-value`,
        })
      );

    core["cache"].exists = jest
      .fn()
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(true)
      .mockResolvedValueOnce(true)
      .mockResolvedValue(false);

    core["syncPoolState"] = jest.fn().mockImplementationOnce(() => {
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
          bundle_size: "3",
          from_key: "100",
          to_key: "102",
          bundle_summary: "test_summary",
          updated_at: "0",
          voters_valid: ["test_staker"],
        },
      } as any;
    });

    // ACT
    await runCache.call(core);

    // ASSERT
    const txs = core["client"].kyve.bundles.v1beta1;
    const queries = core["lcd"].kyve.query.v1beta1;
    const storageProvider = core["storageProvider"];
    const cache = core["cache"];
    const compression = core["compression"];
    const runtime = core["runtime"];

    // ========================
    // ASSERT CLIENT INTERFACES
    // ========================

    expect(txs.claimUploaderRole).toHaveBeenCalledTimes(0);

    expect(txs.voteBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.submitBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.skipUploaderRole).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(queries.canVote).toHaveBeenCalledTimes(0);

    expect(queries.canPropose).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(storageProvider.saveBundle).toHaveBeenCalledTimes(0);

    expect(storageProvider.retrieveBundle).toHaveBeenCalledTimes(0);

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cache.put).toHaveBeenCalledTimes(
      parseInt(genesis_pool.data.max_bundle_size)
    );

    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size); n++) {
      const item = {
        key: (n + parseInt(genesis_pool.data.max_bundle_size) + 3).toString(),
        value: `${n + parseInt(genesis_pool.data.max_bundle_size) + 3}-value`,
      };
      expect(cache.put).toHaveBeenNthCalledWith(
        n + 1,
        (n + parseInt(genesis_pool.data.max_bundle_size) + 3).toString(),
        item
      );
    }

    expect(cache.get).toHaveBeenCalledTimes(0);

    expect(cache.exists).toHaveBeenCalledTimes(
      parseInt(genesis_pool.data.max_bundle_size) + 3
    );

    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size) + 3; n++) {
      expect(cache.exists).toHaveBeenNthCalledWith(
        n + 1,
        (n + parseInt(genesis_pool.data.max_bundle_size)).toString()
      );
    }

    expect(cache.del).toHaveBeenCalledTimes(100);

    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size); n++) {
      expect(cache.del).toHaveBeenNthCalledWith(n + 1, n.toString());
    }

    expect(cache.drop).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compression.compress).toHaveBeenCalledTimes(0);

    expect(compression.decompress).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT RUNTIME INTERFACES
    // =========================

    expect(runtime.getDataItemByKey).toHaveBeenCalledTimes(
      parseInt(genesis_pool.data.max_bundle_size) + 2
    );

    expect(runtime.getDataItemByKey).toHaveBeenNthCalledWith(
      1,
      core,
      (0 + parseInt(genesis_pool.data.max_bundle_size) + 3).toString()
    );

    expect(runtime.getDataItemByKey).toHaveBeenNthCalledWith(
      2,
      core,
      (1 + parseInt(genesis_pool.data.max_bundle_size) + 3).toString()
    );

    expect(runtime.getDataItemByKey).toHaveBeenNthCalledWith(
      3,
      core,
      (1 + parseInt(genesis_pool.data.max_bundle_size) + 3).toString()
    );

    expect(runtime.getDataItemByKey).toHaveBeenNthCalledWith(
      4,
      core,
      (2 + parseInt(genesis_pool.data.max_bundle_size) + 3).toString()
    );

    expect(runtime.getDataItemByKey).toHaveBeenNthCalledWith(
      5,
      core,
      (2 + parseInt(genesis_pool.data.max_bundle_size) + 3).toString()
    );

    expect(runtime.getDataItemByKey).toHaveBeenNthCalledWith(
      6,
      core,
      (3 + parseInt(genesis_pool.data.max_bundle_size) + 3).toString()
    );

    expect(runtime.getDataItemByKey).toHaveBeenNthCalledWith(
      7,
      core,
      (4 + parseInt(genesis_pool.data.max_bundle_size) + 3).toString()
    );

    expect(runtime.getDataItemByKey).toHaveBeenNthCalledWith(
      8,
      core,
      (5 + parseInt(genesis_pool.data.max_bundle_size) + 3).toString()
    );

    // ...

    expect(runtime.validateBundle).toHaveBeenCalledTimes(0);

    expect(runtime.nextKey).toHaveBeenCalledTimes(
      parseInt(genesis_pool.data.max_bundle_size) + 3
    );

    // here we subtract the key - 1 because we start using the
    // current key
    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size) + 3; n++) {
      expect(runtime.nextKey).toHaveBeenNthCalledWith(
        n + 1,
        (n + 100 - 1).toString()
      );
    }

    expect(runtime.summarizeBundle).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(core["waitForCacheContinuation"]).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("start caching from a pool where cache methods fail", async () => {
    // ARRANGE
    core["cache"].put = jest.fn().mockRejectedValue(new Error("io error"));

    core["syncPoolState"] = jest.fn().mockImplementationOnce(() => {
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

    // ACT
    await runCache.call(core);

    // ASSERT
    const txs = core["client"].kyve.bundles.v1beta1;
    const queries = core["lcd"].kyve.query.v1beta1;
    const storageProvider = core["storageProvider"];
    const cache = core["cache"];
    const compression = core["compression"];
    const runtime = core["runtime"];

    // ========================
    // ASSERT CLIENT INTERFACES
    // ========================

    expect(txs.claimUploaderRole).toHaveBeenCalledTimes(0);

    expect(txs.voteBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.submitBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.skipUploaderRole).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(queries.canVote).toHaveBeenCalledTimes(0);

    expect(queries.canPropose).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(storageProvider.saveBundle).toHaveBeenCalledTimes(0);

    expect(storageProvider.retrieveBundle).toHaveBeenCalledTimes(0);

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cache.put).toHaveBeenCalledTimes(1);

    expect(cache.get).toHaveBeenCalledTimes(0);

    expect(cache.exists).toHaveBeenCalledTimes(1);

    expect(cache.exists).toHaveBeenNthCalledWith(1, "100");

    expect(cache.del).toHaveBeenCalledTimes(100);

    for (let n = 0; n < parseInt(genesis_pool.data.max_bundle_size); n++) {
      expect(cache.del).toHaveBeenNthCalledWith(n + 1, n.toString());
    }

    expect(cache.drop).toHaveBeenCalledTimes(1);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compression.compress).toHaveBeenCalledTimes(0);

    expect(compression.decompress).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT RUNTIME INTERFACES
    // =========================

    expect(runtime.getDataItemByKey).toHaveBeenCalledTimes(1);

    expect(runtime.getDataItemByKey).toHaveBeenNthCalledWith(1, core, "100");

    expect(runtime.validateBundle).toHaveBeenCalledTimes(0);

    expect(runtime.nextKey).toHaveBeenCalledTimes(1);

    expect(runtime.nextKey).toHaveBeenNthCalledWith(1, "99");

    expect(runtime.summarizeBundle).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(core["waitForCacheContinuation"]).toHaveBeenCalledTimes(0);

    // TODO: assert timeouts
  });
});
