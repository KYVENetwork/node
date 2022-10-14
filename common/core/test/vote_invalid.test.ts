import { Logger } from "tslog";
import { bundleToBytes, Node, sha256, standardizeJSON } from "../src/index";
import { runNode } from "../src/methods/main/runNode";
import { genesis_pool } from "./mocks/constants";
import { client } from "./mocks/client.mock";
import { lcd } from "./mocks/lcd.mock";
import { TestStorageProvider } from "./mocks/storageProvider.mock";
import { TestCache } from "./mocks/cache.mock";
import { TestCompression } from "./mocks/compression.mock";
import { setupMetrics } from "../src/methods";
import { register } from "prom-client";
import { TestRuntime } from "./mocks/runtime.mock";
import { VoteType } from "../../proto/dist/proto/kyve/bundles/v1beta1/tx";

/*

TEST CASES - invalid votes tests

* vote invalid because runtime validate function returns false
* vote invalid because proposed data_size does not match
* vote invalid because proposed from_key does not match
* vote invalid because proposed to_key does not match
* vote invalid because proposed bundle_summary does not match
* vote invalid because proposed data_hash does not match
* try to vote invalid after validator has voted abstain bebore
* try to vote invalid after validator has voted invalid before
* try to vote invalid after validator has voted valid before
* vote invalid but local bundle could not be loaded in the first try
* vote invalid but bundle from storage provider could not be loaded in the first try
* TODO: try to vote invalid where voteBundleProposal fails

*/

describe("invalid votes tests", () => {
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

    core["waitForNextBundleProposal"] = jest.fn();

    core["continueRound"] = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValue(false);

    setupMetrics.call(core);
  });

  afterEach(() => {
    // reset prometheus
    register.clear();
  });

  test("vote invalid because runtime validate function returns false", async () => {
    // ARRANGE
    const validateBundleMock = jest.fn().mockResolvedValue(false);
    core["runtime"].validateBundle = validateBundleMock;

    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const dataSize = compressedBundle.byteLength.toString();
    const dataHash = sha256(bundleBytes);

    core["syncPoolState"] = jest.fn().mockImplementation(() => {
      core.pool = {
        ...genesis_pool,
        bundle_proposal: {
          ...genesis_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          data_size: dataSize,
          data_hash: dataHash,
          bundle_size: "2",
          from_key: "test_key_1",
          to_key: "test_key_2",
          bundle_summary: JSON.stringify(bundle),
          updated_at: "0",
          voters_valid: ["another_test_staker"],
        },
      } as any;
    });

    core["cache"].get = jest
      .fn()
      .mockResolvedValueOnce({
        key: "test_key_1",
        value: "test_value_1",
      })
      .mockResolvedValueOnce({
        key: "test_key_2",
        value: "test_value_2",
      });

    // ACT
    await runNode.call(core);

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

    expect(txs.voteBundleProposal).toHaveBeenCalledTimes(1);
    expect(txs.voteBundleProposal).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_NO,
    });

    expect(txs.submitBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.skipUploaderRole).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(queries.canVote).toHaveBeenCalledTimes(1);
    expect(queries.canVote).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      voter: "test_valaddress",
      storage_id: "another_test_storage_id",
    });

    expect(queries.canPropose).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(storageProvider.saveBundle).toHaveBeenCalledTimes(0);

    expect(storageProvider.retrieveBundle).toHaveBeenCalledTimes(1);
    expect(storageProvider.retrieveBundle).toHaveBeenLastCalledWith(
      "another_test_storage_id",
      (120 - 20) * 1000
    );

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cache.get).toHaveBeenCalledTimes(2);
    expect(cache.get).toHaveBeenNthCalledWith(1, "0");
    expect(cache.get).toHaveBeenNthCalledWith(2, "1");

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compression.compress).toHaveBeenCalledTimes(0);

    expect(compression.decompress).toHaveBeenCalledTimes(1);
    expect(compression.decompress).toHaveBeenLastCalledWith(compressedBundle);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(runtime.summarizeBundle).toHaveBeenCalledTimes(1);
    expect(runtime.summarizeBundle).toHaveBeenLastCalledWith(bundle);

    expect(runtime.validateBundle).toHaveBeenCalledTimes(1);
    expect(runtime.validateBundle).toHaveBeenLastCalledWith(
      expect.anything(),
      standardizeJSON(bundle),
      standardizeJSON(bundle)
    );

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(core["waitForNextBundleProposal"]).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("vote invalid because proposed data_size does not match", async () => {
    // ARRANGE
    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const dataSize = compressedBundle.byteLength.toString();
    const dataHash = sha256(bundleBytes);

    core["syncPoolState"] = jest.fn().mockImplementation(() => {
      core.pool = {
        ...genesis_pool,
        bundle_proposal: {
          ...genesis_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          data_hash: dataHash,
          data_size: "123456789",
          bundle_size: "2",
          from_key: "test_key_1",
          to_key: "test_key_2",
          bundleSummary: JSON.stringify(bundle),
          updated_at: "0",
          voters_valid: ["another_test_staker"],
        },
      } as any;
    });

    core["cache"].get = jest
      .fn()
      .mockResolvedValueOnce({
        key: "test_key_1",
        value: "test_value_1",
      })
      .mockResolvedValueOnce({
        key: "test_key_2",
        value: "test_value_2",
      });

    // ACT
    await runNode.call(core);

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

    expect(txs.voteBundleProposal).toHaveBeenCalledTimes(1);
    expect(txs.voteBundleProposal).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_NO,
    });

    expect(txs.submitBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.skipUploaderRole).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(queries.canVote).toHaveBeenCalledTimes(1);
    expect(queries.canVote).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      voter: "test_valaddress",
      storage_id: "another_test_storage_id",
    });

    expect(queries.canPropose).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(storageProvider.saveBundle).toHaveBeenCalledTimes(0);

    expect(storageProvider.retrieveBundle).toHaveBeenCalledTimes(1);
    expect(storageProvider.retrieveBundle).toHaveBeenLastCalledWith(
      "another_test_storage_id",
      (120 - 20) * 1000
    );

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cache.get).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compression.compress).toHaveBeenCalledTimes(0);

    expect(compression.decompress).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(runtime.summarizeBundle).toHaveBeenCalledTimes(0);

    expect(runtime.validateBundle).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(core["waitForNextBundleProposal"]).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("vote invalid because proposed from_key does not match", async () => {
    // ARRANGE
    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const dataSize = compressedBundle.byteLength.toString();
    const dataHash = sha256(bundleBytes);

    core["syncPoolState"] = jest.fn().mockImplementation(() => {
      core.pool = {
        ...genesis_pool,
        bundle_proposal: {
          ...genesis_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          data_size: dataSize,
          data_hash: dataHash,
          bundle_size: "2",
          from_key: "invalid_from_key",
          to_key: "invalid_to_key",
          bundle_summary: JSON.stringify(bundle),
          updated_at: "0",
          voters_valid: ["another_test_staker"],
        },
      } as any;
    });

    core["cache"].get = jest
      .fn()
      .mockResolvedValueOnce({
        key: "test_key_1",
        value: "test_value_1",
      })
      .mockResolvedValueOnce({
        key: "test_key_2",
        value: "test_value_2",
      });

    // ACT
    await runNode.call(core);

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

    expect(txs.voteBundleProposal).toHaveBeenCalledTimes(1);
    expect(txs.voteBundleProposal).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_NO,
    });

    expect(txs.submitBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.skipUploaderRole).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(queries.canVote).toHaveBeenCalledTimes(1);
    expect(queries.canVote).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      voter: "test_valaddress",
      storage_id: "another_test_storage_id",
    });

    expect(queries.canPropose).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(storageProvider.saveBundle).toHaveBeenCalledTimes(0);

    expect(storageProvider.retrieveBundle).toHaveBeenCalledTimes(1);
    expect(storageProvider.retrieveBundle).toHaveBeenLastCalledWith(
      "another_test_storage_id",
      (120 - 20) * 1000
    );

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cache.get).toHaveBeenCalledTimes(2);
    expect(cache.get).toHaveBeenNthCalledWith(1, "0");
    expect(cache.get).toHaveBeenNthCalledWith(2, "1");

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compression.compress).toHaveBeenCalledTimes(0);

    expect(compression.decompress).toHaveBeenCalledTimes(1);
    expect(compression.decompress).toHaveBeenLastCalledWith(compressedBundle);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(runtime.summarizeBundle).toHaveBeenCalledTimes(0);

    expect(runtime.validateBundle).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(core["waitForNextBundleProposal"]).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("vote invalid because proposed to_key does not match", async () => {
    // ARRANGE
    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const dataSize = compressedBundle.byteLength.toString();
    const dataHash = sha256(bundleBytes);

    core["syncPoolState"] = jest.fn().mockImplementation(() => {
      core.pool = {
        ...genesis_pool,
        bundle_proposal: {
          ...genesis_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          data_size: dataSize,
          data_hash: dataHash,
          bundle_size: "2",
          from_key: "test_key_1",
          to_key: "invalid_to_key",
          bundle_summary: JSON.stringify(bundle),
          updated_at: "0",
          voters_valid: ["another_test_staker"],
        },
      } as any;
    });

    core["cache"].get = jest
      .fn()
      .mockResolvedValueOnce({
        key: "test_key_1",
        value: "test_value_1",
      })
      .mockResolvedValueOnce({
        key: "test_key_2",
        value: "test_value_2",
      });

    // ACT
    await runNode.call(core);

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

    expect(txs.voteBundleProposal).toHaveBeenCalledTimes(1);
    expect(txs.voteBundleProposal).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_NO,
    });

    expect(txs.submitBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.skipUploaderRole).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(queries.canVote).toHaveBeenCalledTimes(1);
    expect(queries.canVote).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      voter: "test_valaddress",
      storage_id: "another_test_storage_id",
    });

    expect(queries.canPropose).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(storageProvider.saveBundle).toHaveBeenCalledTimes(0);

    expect(storageProvider.retrieveBundle).toHaveBeenCalledTimes(1);
    expect(storageProvider.retrieveBundle).toHaveBeenLastCalledWith(
      "another_test_storage_id",
      (120 - 20) * 1000
    );

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cache.get).toHaveBeenCalledTimes(2);
    expect(cache.get).toHaveBeenNthCalledWith(1, "0");
    expect(cache.get).toHaveBeenNthCalledWith(2, "1");

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compression.compress).toHaveBeenCalledTimes(0);

    expect(compression.decompress).toHaveBeenCalledTimes(1);
    expect(compression.decompress).toHaveBeenLastCalledWith(compressedBundle);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(runtime.summarizeBundle).toHaveBeenCalledTimes(0);

    expect(runtime.validateBundle).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(core["waitForNextBundleProposal"]).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("vote invalid because proposed bundle_summary does not match", async () => {
    // ARRANGE
    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const dataSize = compressedBundle.byteLength.toString();
    const dataHash = sha256(bundleBytes);

    core["syncPoolState"] = jest.fn().mockImplementation(() => {
      core.pool = {
        ...genesis_pool,
        bundle_proposal: {
          ...genesis_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          data_size: dataSize,
          data_hash: dataHash,
          bundle_size: "2",
          from_key: "test_key_1",
          to_key: "test_key_2",
          bundle_summary: "invalid_test_value",
          updated_at: "0",
          voters_valid: ["another_test_staker"],
        },
      } as any;
    });

    core["cache"].get = jest
      .fn()
      .mockResolvedValueOnce({
        key: "test_key_1",
        value: "test_value_1",
      })
      .mockResolvedValueOnce({
        key: "test_key_2",
        value: "test_value_2",
      });

    // ACT
    await runNode.call(core);

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

    expect(txs.voteBundleProposal).toHaveBeenCalledTimes(1);
    expect(txs.voteBundleProposal).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_NO,
    });

    expect(txs.submitBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.skipUploaderRole).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(queries.canVote).toHaveBeenCalledTimes(1);
    expect(queries.canVote).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      voter: "test_valaddress",
      storage_id: "another_test_storage_id",
    });

    expect(queries.canPropose).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(storageProvider.saveBundle).toHaveBeenCalledTimes(0);

    expect(storageProvider.retrieveBundle).toHaveBeenCalledTimes(1);
    expect(storageProvider.retrieveBundle).toHaveBeenLastCalledWith(
      "another_test_storage_id",
      (120 - 20) * 1000
    );

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cache.get).toHaveBeenCalledTimes(2);
    expect(cache.get).toHaveBeenNthCalledWith(1, "0");
    expect(cache.get).toHaveBeenNthCalledWith(2, "1");

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compression.compress).toHaveBeenCalledTimes(0);

    expect(compression.decompress).toHaveBeenCalledTimes(1);
    expect(compression.decompress).toHaveBeenLastCalledWith(compressedBundle);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(runtime.summarizeBundle).toHaveBeenCalledTimes(1);
    expect(runtime.summarizeBundle).toHaveBeenLastCalledWith(bundle);

    expect(runtime.validateBundle).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(core["waitForNextBundleProposal"]).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("vote invalid because proposed data_hash does not match", async () => {
    // ARRANGE
    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const dataSize = compressedBundle.byteLength.toString();
    const dataHash = sha256(bundleBytes);

    core["syncPoolState"] = jest.fn().mockImplementation(() => {
      core.pool = {
        ...genesis_pool,
        bundle_proposal: {
          ...genesis_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          data_size: dataSize,
          data_hash: "invalid_bundle_hash",
          bundle_size: "2",
          from_key: "test_key_1",
          to_key: "test_key_2",
          bundle_summary: "test_value_2",
          updated_at: "0",
          voters_valid: ["another_test_staker"],
        },
      } as any;
    });

    core["cache"].get = jest
      .fn()
      .mockResolvedValueOnce({
        key: "test_key_1",
        value: "test_value_1",
      })
      .mockResolvedValueOnce({
        key: "test_key_2",
        value: "test_value_2",
      });

    // ACT
    await runNode.call(core);

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

    expect(txs.voteBundleProposal).toHaveBeenCalledTimes(1);
    expect(txs.voteBundleProposal).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_NO,
    });

    expect(txs.submitBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.skipUploaderRole).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(queries.canVote).toHaveBeenCalledTimes(1);
    expect(queries.canVote).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      voter: "test_valaddress",
      storage_id: "another_test_storage_id",
    });

    expect(queries.canPropose).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(storageProvider.saveBundle).toHaveBeenCalledTimes(0);

    expect(storageProvider.retrieveBundle).toHaveBeenCalledTimes(1);
    expect(storageProvider.retrieveBundle).toHaveBeenLastCalledWith(
      "another_test_storage_id",
      (120 - 20) * 1000
    );

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cache.get).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compression.compress).toHaveBeenCalledTimes(0);

    expect(compression.decompress).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(runtime.summarizeBundle).toHaveBeenCalledTimes(0);

    expect(runtime.validateBundle).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(core["waitForNextBundleProposal"]).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("try to vote invalid after validator has voted abstain bebore", async () => {
    // ARRANGE
    const validateBundleMock = jest.fn().mockResolvedValue(false);

    core["runtime"].validateBundle = validateBundleMock;

    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const dataSize = compressedBundle.byteLength.toString();
    const dataHash = sha256(bundleBytes);

    core["syncPoolState"] = jest.fn().mockImplementation(() => {
      core.pool = {
        ...genesis_pool,
        bundle_proposal: {
          ...genesis_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          data_size: dataSize,
          data_hash: dataHash,
          bundle_size: "2",
          from_key: "test_key_1",
          to_key: "test_key_2",
          bundle_summary: JSON.stringify(bundle),
          updated_at: "0",
          voters_valid: ["another_test_staker"],
          voters_abstain: ["test_staker"],
        },
      } as any;
    });

    core["cache"].get = jest
      .fn()
      .mockResolvedValueOnce({
        key: "test_key_1",
        value: "test_value_1",
      })
      .mockResolvedValueOnce({
        key: "test_key_2",
        value: "test_value_2",
      });

    // ACT
    await runNode.call(core);

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

    expect(txs.voteBundleProposal).toHaveBeenCalledTimes(1);
    expect(txs.voteBundleProposal).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_NO,
    });

    expect(txs.submitBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.skipUploaderRole).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(queries.canVote).toHaveBeenCalledTimes(1);
    expect(queries.canVote).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      voter: "test_valaddress",
      storage_id: "another_test_storage_id",
    });

    expect(queries.canPropose).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(storageProvider.saveBundle).toHaveBeenCalledTimes(0);

    expect(storageProvider.retrieveBundle).toHaveBeenCalledTimes(1);
    expect(storageProvider.retrieveBundle).toHaveBeenLastCalledWith(
      "another_test_storage_id",
      (120 - 20) * 1000
    );

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cache.get).toHaveBeenCalledTimes(2);
    expect(cache.get).toHaveBeenNthCalledWith(1, "0");
    expect(cache.get).toHaveBeenNthCalledWith(2, "1");

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compression.compress).toHaveBeenCalledTimes(0);

    expect(compression.decompress).toHaveBeenCalledTimes(1);
    expect(compression.decompress).toHaveBeenLastCalledWith(compressedBundle);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(runtime.summarizeBundle).toHaveBeenCalledTimes(1);
    expect(runtime.summarizeBundle).toHaveBeenLastCalledWith(bundle);

    expect(runtime.validateBundle).toHaveBeenCalledTimes(1);
    expect(runtime.validateBundle).toHaveBeenLastCalledWith(
      expect.anything(),
      standardizeJSON(bundle),
      standardizeJSON(bundle)
    );

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(core["waitForNextBundleProposal"]).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("try to vote invalid after validator has voted invalid before", async () => {
    // ARRANGE
    const validateBundleMock = jest.fn().mockResolvedValue(false);

    core["runtime"].validateBundle = validateBundleMock;

    const canVoteMock = jest.fn().mockResolvedValue({
      possible: false,
      reaseon: "already voted invalid",
    });

    core.lcd.kyve.query.v1beta1.canVote = canVoteMock;

    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const dataSize = compressedBundle.byteLength.toString();
    const dataHash = sha256(bundleBytes);

    core["syncPoolState"] = jest.fn().mockImplementation(() => {
      core.pool = {
        ...genesis_pool,
        bundle_proposal: {
          ...genesis_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          data_size: dataSize,
          data_hash: dataHash,
          bundle_size: "2",
          from_key: "test_key_1",
          to_key: "test_key_2",
          bundle_summary: JSON.stringify(bundle),
          updated_at: "0",
          voters_valid: ["another_test_staker"],
          voters_invalid: ["test_staker"],
        },
      } as any;
    });

    core["cache"].get = jest
      .fn()
      .mockResolvedValueOnce({
        key: "test_key_1",
        value: "test_value_1",
      })
      .mockResolvedValueOnce({
        key: "test_key_2",
        value: "test_value_2",
      });

    // ACT
    await runNode.call(core);

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

    expect(queries.canVote).toHaveBeenCalledTimes(1);
    expect(queries.canVote).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      voter: "test_valaddress",
      storage_id: "another_test_storage_id",
    });

    expect(queries.canPropose).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(storageProvider.saveBundle).toHaveBeenCalledTimes(0);

    expect(storageProvider.retrieveBundle).toHaveBeenCalledTimes(0);

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cache.get).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compression.compress).toHaveBeenCalledTimes(0);

    expect(compression.decompress).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(runtime.summarizeBundle).toHaveBeenCalledTimes(0);

    expect(runtime.validateBundle).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(core["waitForNextBundleProposal"]).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("try to vote invalid after validator has voted valid before", async () => {
    // ARRANGE
    const validateBundleMock = jest.fn().mockResolvedValue(false);

    core["runtime"].validateBundle = validateBundleMock;

    const canVoteMock = jest.fn().mockResolvedValue({
      possible: false,
      reaseon: "already voted valid",
    });
    core.lcd.kyve.query.v1beta1.canVote = canVoteMock;

    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const dataSize = compressedBundle.byteLength.toString();
    const dataHash = sha256(bundleBytes);

    core["syncPoolState"] = jest.fn().mockImplementation(() => {
      core.pool = {
        ...genesis_pool,
        bundle_proposal: {
          ...genesis_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          data_size: dataSize,
          data_hash: dataHash,
          bundle_size: "2",
          from_key: "test_key_1",
          to_key: "test_key_2",
          bundle_summary: JSON.stringify(bundle),
          updated_at: "0",
          voters_valid: ["another_test_staker", "test_staker"],
        },
      } as any;
    });

    core["cache"].get = jest
      .fn()
      .mockResolvedValueOnce({
        key: "test_key_1",
        value: "test_value_1",
      })
      .mockResolvedValueOnce({
        key: "test_key_2",
        value: "test_value_2",
      });

    // ACT
    await runNode.call(core);

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

    expect(queries.canVote).toHaveBeenCalledTimes(1);
    expect(queries.canVote).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      voter: "test_valaddress",
      storage_id: "another_test_storage_id",
    });

    expect(queries.canPropose).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(storageProvider.saveBundle).toHaveBeenCalledTimes(0);

    expect(storageProvider.retrieveBundle).toHaveBeenCalledTimes(0);

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cache.get).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compression.compress).toHaveBeenCalledTimes(0);

    expect(compression.decompress).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(runtime.summarizeBundle).toHaveBeenCalledTimes(0);

    expect(runtime.validateBundle).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(core["waitForNextBundleProposal"]).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("vote invalid but local bundle could not be loaded in the first try", async () => {
    // ARRANGE
    const validateBundleMock = jest.fn().mockResolvedValue(false);
    core["runtime"].validateBundle = validateBundleMock;

    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const dataSize = compressedBundle.byteLength.toString();
    const dataHash = sha256(bundleBytes);

    core["syncPoolState"] = jest.fn().mockImplementation(() => {
      core.pool = {
        ...genesis_pool,
        bundle_proposal: {
          ...genesis_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          data_size: dataSize,
          data_hash: dataHash,
          bundle_size: "2",
          from_key: "test_key_1",
          to_key: "test_key_2",
          bundle_summary: JSON.stringify(bundle),
          updated_at: "0",
          voters_valid: ["another_test_staker"],
        },
      } as any;
    });

    core["cache"].get = jest
      .fn()
      .mockRejectedValueOnce(new Error("not found"))
      .mockResolvedValueOnce({
        key: "test_key_1",
        value: "test_value_1",
      })
      .mockResolvedValueOnce({
        key: "test_key_2",
        value: "test_value_2",
      });

    // ACT
    await runNode.call(core);

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

    expect(txs.voteBundleProposal).toHaveBeenCalledTimes(2);
    expect(txs.voteBundleProposal).toHaveBeenNthCalledWith(1, {
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_ABSTAIN,
    });
    expect(txs.voteBundleProposal).toHaveBeenNthCalledWith(2, {
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_NO,
    });

    expect(txs.submitBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.skipUploaderRole).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(queries.canVote).toHaveBeenCalledTimes(1);
    expect(queries.canVote).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      voter: "test_valaddress",
      storage_id: "another_test_storage_id",
    });

    expect(queries.canPropose).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(storageProvider.saveBundle).toHaveBeenCalledTimes(0);

    expect(storageProvider.retrieveBundle).toHaveBeenCalledTimes(1);
    expect(storageProvider.retrieveBundle).toHaveBeenLastCalledWith(
      "another_test_storage_id",
      (120 - 20) * 1000
    );

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cache.get).toHaveBeenCalledTimes(3);
    expect(cache.get).toHaveBeenNthCalledWith(1, "0");
    expect(cache.get).toHaveBeenNthCalledWith(2, "0");
    expect(cache.get).toHaveBeenNthCalledWith(3, "1");

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compression.compress).toHaveBeenCalledTimes(0);

    expect(compression.decompress).toHaveBeenCalledTimes(1);
    expect(compression.decompress).toHaveBeenLastCalledWith(compressedBundle);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(runtime.summarizeBundle).toHaveBeenCalledTimes(1);
    expect(runtime.summarizeBundle).toHaveBeenLastCalledWith(bundle);

    expect(runtime.validateBundle).toHaveBeenCalledTimes(1);
    expect(runtime.validateBundle).toHaveBeenLastCalledWith(
      expect.anything(),
      standardizeJSON(bundle),
      standardizeJSON(bundle)
    );

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(core["waitForNextBundleProposal"]).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("vote invalid but bundle from storage provider could not be loaded in the first try", async () => {
    // ARRANGE
    const validateBundleMock = jest.fn().mockResolvedValue(false);
    core["runtime"].validateBundle = validateBundleMock;

    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const dataSize = compressedBundle.byteLength.toString();
    const dataHash = sha256(bundleBytes);

    core["syncPoolState"] = jest.fn().mockImplementation(() => {
      core.pool = {
        ...genesis_pool,
        bundle_proposal: {
          ...genesis_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          data_size: dataSize,
          data_hash: dataHash,
          bundle_size: "2",
          from_key: "test_key_1",
          to_key: "test_key_2",
          bundle_summary: JSON.stringify(bundle),
          updated_at: "0",
          voters_valid: ["another_test_staker"],
        },
      } as any;
    });

    core["cache"].get = jest
      .fn()
      .mockResolvedValueOnce({
        key: "test_key_1",
        value: "test_value_1",
      })
      .mockResolvedValueOnce({
        key: "test_key_2",
        value: "test_value_2",
      });

    core["storageProvider"].retrieveBundle = jest
      .fn()
      .mockRejectedValueOnce(new Error())
      .mockResolvedValue(compressedBundle);

    // ACT
    await runNode.call(core);

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

    expect(txs.voteBundleProposal).toHaveBeenCalledTimes(2);
    expect(txs.voteBundleProposal).toHaveBeenNthCalledWith(1, {
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_ABSTAIN,
    });
    expect(txs.voteBundleProposal).toHaveBeenNthCalledWith(2, {
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_NO,
    });

    expect(txs.submitBundleProposal).toHaveBeenCalledTimes(0);

    expect(txs.skipUploaderRole).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(queries.canVote).toHaveBeenCalledTimes(1);
    expect(queries.canVote).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      voter: "test_valaddress",
      storage_id: "another_test_storage_id",
    });

    expect(queries.canPropose).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(storageProvider.saveBundle).toHaveBeenCalledTimes(0);

    expect(storageProvider.retrieveBundle).toHaveBeenCalledTimes(2);
    expect(storageProvider.retrieveBundle).toHaveBeenNthCalledWith(
      1,
      "another_test_storage_id",
      (120 - 20) * 1000
    );
    expect(storageProvider.retrieveBundle).toHaveBeenNthCalledWith(
      2,
      "another_test_storage_id",
      (120 - 20) * 1000
    );

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cache.get).toHaveBeenCalledTimes(2);
    expect(cache.get).toHaveBeenNthCalledWith(1, "0");
    expect(cache.get).toHaveBeenNthCalledWith(2, "1");

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compression.compress).toHaveBeenCalledTimes(0);

    expect(compression.decompress).toHaveBeenCalledTimes(1);
    expect(compression.decompress).toHaveBeenLastCalledWith(compressedBundle);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(runtime.summarizeBundle).toHaveBeenCalledTimes(1);
    expect(runtime.summarizeBundle).toHaveBeenLastCalledWith(bundle);

    expect(runtime.validateBundle).toHaveBeenCalledTimes(1);
    expect(runtime.validateBundle).toHaveBeenLastCalledWith(
      expect.anything(),
      standardizeJSON(bundle),
      standardizeJSON(bundle)
    );

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(core["waitForNextBundleProposal"]).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });
});
