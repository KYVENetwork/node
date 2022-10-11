import { Logger } from "tslog";
import { bundleToBytes, Node, sha256, standardizeJSON } from "../src/index";
import {
  summarizeBundleMock,
  TestRuntime,
  validateBundleMock,
} from "./mocks/integration";
import { runNode } from "../src/methods/main/runNode";
import {
  TestStorageProvider,
  retrieveBundleMock,
  saveBundleMock,
} from "./mocks/storageProvider";
import {
  TestCompression,
  compressMock,
  decompressMock,
} from "./mocks/compression";
import {
  client,
  claimUploaderRoleMock,
  voteBundleProposalMock,
  submitBundleProposalMock,
  genesis_pool,
  canVoteMock,
  canProposeMock,
  lcd,
  skipUploaderRoleMock,
} from "./mocks/helpers";
import { VoteType } from "@kyve/proto/dist/proto/kyve/bundles/v1beta1/tx";
import { setupMetrics } from "../src/methods";
import { register } from "prom-client";
import { TestCache } from "./mocks/cache";

/*

TEST CASES - vote valid tests

* vote valid because bundle was proposed correctly
* vote valid but local bundle could not be loaded in the first try
* vote valid but bundle from storage provider could not be loaded in the first try
* try to vote valid after validator has voted abstain bebore
* try to vote valid after validator has voted invalid before
* try to vote valid after validator has voted valid before

*/

describe("vote valid tests", () => {
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
    // client mocks
    claimUploaderRoleMock.mockClear();
    voteBundleProposalMock.mockClear();
    submitBundleProposalMock.mockClear();
    skipUploaderRoleMock.mockClear();

    // lcd mocks
    canVoteMock.mockClear();
    canProposeMock.mockClear();

    // storage provider mocks
    saveBundleMock.mockClear();
    retrieveBundleMock.mockClear();

    // compression mocks
    compressMock.mockClear();
    decompressMock.mockClear();

    // integration mocks
    summarizeBundleMock.mockClear();
    validateBundleMock.mockClear();

    // reset prometheus
    register.clear();
  });

  test("vote valid because bundle was proposed correctly", async () => {
    // ARRANGE
    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const dataSize = compressedBundle.byteLength.toString();
    const dataHash = sha256(bundleBytes);

    const syncPoolStateMock = jest.fn().mockImplementation(() => {
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
    core["syncPoolState"] = syncPoolStateMock;

    const cacheGetMock = jest
      .fn()
      .mockResolvedValueOnce({
        key: "test_key_1",
        value: "test_value_1",
      })
      .mockResolvedValueOnce({
        key: "test_key_2",
        value: "test_value_2",
      });

    core["cache"].get = cacheGetMock;

    const waitForNextBundleProposalMock = jest.fn();
    core["waitForNextBundleProposal"] = waitForNextBundleProposalMock;

    core["continueRound"] = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValue(false);

    // ACT
    await runNode.call(core);

    // ASSERT

    // ========================
    // ASSERT CLIENT INTERFACES
    // ========================

    expect(claimUploaderRoleMock).toHaveBeenCalledTimes(0);

    expect(voteBundleProposalMock).toHaveBeenCalledTimes(1);
    expect(voteBundleProposalMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_YES,
    });

    expect(submitBundleProposalMock).toHaveBeenCalledTimes(0);

    expect(skipUploaderRoleMock).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(canVoteMock).toHaveBeenCalledTimes(1);
    expect(canVoteMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      voter: "test_valaddress",
      storage_id: "another_test_storage_id",
    });

    expect(canProposeMock).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(saveBundleMock).toHaveBeenCalledTimes(0);

    expect(retrieveBundleMock).toHaveBeenCalledTimes(1);
    expect(retrieveBundleMock).toHaveBeenLastCalledWith(
      "another_test_storage_id",
      (120 - 20) * 1000
    );

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cacheGetMock).toHaveBeenCalledTimes(2);
    expect(cacheGetMock).toHaveBeenNthCalledWith(1, "0");
    expect(cacheGetMock).toHaveBeenNthCalledWith(2, "1");

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compressMock).toHaveBeenCalledTimes(0);

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenLastCalledWith(compressedBundle);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(summarizeBundleMock).toHaveBeenCalledTimes(1);
    expect(summarizeBundleMock).toHaveBeenLastCalledWith(
      JSON.stringify(bundle)
    );

    expect(validateBundleMock).toHaveBeenCalledTimes(1);
    expect(validateBundleMock).toHaveBeenLastCalledWith(
      expect.anything(),
      standardizeJSON(bundle),
      standardizeJSON(bundle)
    );

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(waitForNextBundleProposalMock).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("vote valid but local bundle could not be loaded in the first try", async () => {
    // ARRANGE
    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const dataSize = compressedBundle.byteLength.toString();
    const dataHash = sha256(bundleBytes);

    const syncPoolStateMock = jest.fn().mockImplementation(() => {
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
    core["syncPoolState"] = syncPoolStateMock;

    const cacheGetMock = jest
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

    core["cache"].get = cacheGetMock;

    const waitForNextBundleProposalMock = jest.fn();
    core["waitForNextBundleProposal"] = waitForNextBundleProposalMock;

    core["continueRound"] = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValue(false);

    // ACT
    await runNode.call(core);

    // ASSERT

    // ========================
    // ASSERT CLIENT INTERFACES
    // ========================

    expect(claimUploaderRoleMock).toHaveBeenCalledTimes(0);

    expect(voteBundleProposalMock).toHaveBeenCalledTimes(2);
    expect(voteBundleProposalMock).toHaveBeenNthCalledWith(1, {
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_ABSTAIN,
    });
    expect(voteBundleProposalMock).toHaveBeenNthCalledWith(2, {
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_YES,
    });

    expect(submitBundleProposalMock).toHaveBeenCalledTimes(0);

    expect(skipUploaderRoleMock).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(canVoteMock).toHaveBeenCalledTimes(1);
    expect(canVoteMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      voter: "test_valaddress",
      storage_id: "another_test_storage_id",
    });

    expect(canProposeMock).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(saveBundleMock).toHaveBeenCalledTimes(0);

    expect(retrieveBundleMock).toHaveBeenCalledTimes(1);
    expect(retrieveBundleMock).toHaveBeenLastCalledWith(
      "another_test_storage_id",
      (120 - 20) * 1000
    );

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cacheGetMock).toHaveBeenCalledTimes(3);
    expect(cacheGetMock).toHaveBeenNthCalledWith(1, "0");
    expect(cacheGetMock).toHaveBeenNthCalledWith(2, "0");
    expect(cacheGetMock).toHaveBeenNthCalledWith(3, "1");

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compressMock).toHaveBeenCalledTimes(0);

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenLastCalledWith(compressedBundle);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(summarizeBundleMock).toHaveBeenCalledTimes(1);
    expect(summarizeBundleMock).toHaveBeenLastCalledWith(
      JSON.stringify(bundle)
    );

    expect(validateBundleMock).toHaveBeenCalledTimes(1);
    expect(validateBundleMock).toHaveBeenLastCalledWith(
      expect.anything(),
      standardizeJSON(bundle),
      standardizeJSON(bundle)
    );

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(waitForNextBundleProposalMock).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("vote valid but bundle from storage provider could not be loaded in the first try", async () => {
    // ARRANGE
    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const dataSize = compressedBundle.byteLength.toString();
    const dataHash = sha256(bundleBytes);

    const syncPoolStateMock = jest.fn().mockImplementation(() => {
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
    core["syncPoolState"] = syncPoolStateMock;

    const cacheGetMock = jest
      .fn()
      .mockResolvedValueOnce({
        key: "test_key_1",
        value: "test_value_1",
      })
      .mockResolvedValueOnce({
        key: "test_key_2",
        value: "test_value_2",
      });

    core["cache"].get = cacheGetMock;

    const retrieveBundleMock = jest
      .fn()
      .mockRejectedValueOnce(new Error())
      .mockResolvedValue(compressedBundle);
    core["storageProvider"].retrieveBundle = retrieveBundleMock;

    const waitForNextBundleProposalMock = jest.fn();
    core["waitForNextBundleProposal"] = waitForNextBundleProposalMock;

    core["continueRound"] = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValue(false);

    // ACT
    await runNode.call(core);

    // ASSERT

    // ========================
    // ASSERT CLIENT INTERFACES
    // ========================

    expect(claimUploaderRoleMock).toHaveBeenCalledTimes(0);

    expect(voteBundleProposalMock).toHaveBeenCalledTimes(2);
    expect(voteBundleProposalMock).toHaveBeenNthCalledWith(1, {
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_ABSTAIN,
    });
    expect(voteBundleProposalMock).toHaveBeenNthCalledWith(2, {
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_YES,
    });

    expect(submitBundleProposalMock).toHaveBeenCalledTimes(0);

    expect(skipUploaderRoleMock).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(canVoteMock).toHaveBeenCalledTimes(1);
    expect(canVoteMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      voter: "test_valaddress",
      storage_id: "another_test_storage_id",
    });

    expect(canProposeMock).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(saveBundleMock).toHaveBeenCalledTimes(0);

    expect(retrieveBundleMock).toHaveBeenCalledTimes(2);
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(
      1,
      "another_test_storage_id",
      (120 - 20) * 1000
    );
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(
      2,
      "another_test_storage_id",
      (120 - 20) * 1000
    );

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cacheGetMock).toHaveBeenCalledTimes(2);
    expect(cacheGetMock).toHaveBeenNthCalledWith(1, "0");
    expect(cacheGetMock).toHaveBeenNthCalledWith(2, "1");

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compressMock).toHaveBeenCalledTimes(0);

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenLastCalledWith(compressedBundle);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(summarizeBundleMock).toHaveBeenCalledTimes(1);
    expect(summarizeBundleMock).toHaveBeenLastCalledWith(
      JSON.stringify(bundle)
    );

    expect(validateBundleMock).toHaveBeenCalledTimes(1);
    expect(validateBundleMock).toHaveBeenLastCalledWith(
      expect.anything(),
      standardizeJSON(bundle),
      standardizeJSON(bundle)
    );

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(waitForNextBundleProposalMock).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("try to vote valid after validator has voted abstain bebore", async () => {
    // ARRANGE
    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const dataSize = compressedBundle.byteLength.toString();
    const dataHash = sha256(bundleBytes);

    const syncPoolStateMock = jest.fn().mockImplementation(() => {
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
    core["syncPoolState"] = syncPoolStateMock;

    const cacheGetMock = jest
      .fn()
      .mockResolvedValueOnce({
        key: "test_key_1",
        value: "test_value_1",
      })
      .mockResolvedValueOnce({
        key: "test_key_2",
        value: "test_value_2",
      });

    core["cache"].get = cacheGetMock;

    const waitForNextBundleProposalMock = jest.fn();
    core["waitForNextBundleProposal"] = waitForNextBundleProposalMock;

    core["continueRound"] = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValue(false);

    // ACT
    await runNode.call(core);

    // ASSERT

    // ========================
    // ASSERT CLIENT INTERFACES
    // ========================

    expect(claimUploaderRoleMock).toHaveBeenCalledTimes(0);

    expect(voteBundleProposalMock).toHaveBeenCalledTimes(1);
    expect(voteBundleProposalMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_YES,
    });

    expect(submitBundleProposalMock).toHaveBeenCalledTimes(0);

    expect(skipUploaderRoleMock).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(canVoteMock).toHaveBeenCalledTimes(1);
    expect(canVoteMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      voter: "test_valaddress",
      storage_id: "another_test_storage_id",
    });

    expect(canProposeMock).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(saveBundleMock).toHaveBeenCalledTimes(0);

    expect(retrieveBundleMock).toHaveBeenCalledTimes(1);
    expect(retrieveBundleMock).toHaveBeenLastCalledWith(
      "another_test_storage_id",
      (120 - 20) * 1000
    );

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cacheGetMock).toHaveBeenCalledTimes(2);
    expect(cacheGetMock).toHaveBeenNthCalledWith(1, "0");
    expect(cacheGetMock).toHaveBeenNthCalledWith(2, "1");

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compressMock).toHaveBeenCalledTimes(0);

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenLastCalledWith(compressedBundle);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(summarizeBundleMock).toHaveBeenCalledTimes(1);
    expect(summarizeBundleMock).toHaveBeenLastCalledWith(
      JSON.stringify(bundle)
    );

    expect(validateBundleMock).toHaveBeenCalledTimes(1);
    expect(validateBundleMock).toHaveBeenLastCalledWith(
      expect.anything(),
      standardizeJSON(bundle),
      standardizeJSON(bundle)
    );

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(waitForNextBundleProposalMock).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("try to vote valid after validator has voted invalid before", async () => {
    // ARRANGE
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

    const syncPoolStateMock = jest.fn().mockImplementation(() => {
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
    core["syncPoolState"] = syncPoolStateMock;

    const cacheGetMock = jest
      .fn()
      .mockResolvedValueOnce({
        key: "test_key_1",
        value: "test_value_1",
      })
      .mockResolvedValueOnce({
        key: "test_key_2",
        value: "test_value_2",
      });

    core["cache"].get = cacheGetMock;

    const waitForNextBundleProposalMock = jest.fn();
    core["waitForNextBundleProposal"] = waitForNextBundleProposalMock;

    core["continueRound"] = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValue(false);

    // ACT
    await runNode.call(core);

    // ASSERT

    // ========================
    // ASSERT CLIENT INTERFACES
    // ========================

    expect(claimUploaderRoleMock).toHaveBeenCalledTimes(0);

    expect(voteBundleProposalMock).toHaveBeenCalledTimes(0);

    expect(submitBundleProposalMock).toHaveBeenCalledTimes(0);

    expect(skipUploaderRoleMock).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(canVoteMock).toHaveBeenCalledTimes(1);
    expect(canVoteMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      voter: "test_valaddress",
      storage_id: "another_test_storage_id",
    });

    expect(canProposeMock).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(saveBundleMock).toHaveBeenCalledTimes(0);

    expect(retrieveBundleMock).toHaveBeenCalledTimes(0);

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cacheGetMock).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compressMock).toHaveBeenCalledTimes(0);

    expect(decompressMock).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(summarizeBundleMock).toHaveBeenCalledTimes(0);

    expect(validateBundleMock).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(waitForNextBundleProposalMock).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("try to vote valid after validator has voted valid before", async () => {
    // ARRANGE
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

    const syncPoolStateMock = jest.fn().mockImplementation(() => {
      core.pool = {
        ...genesis_pool,
        bundle_proposal: {
          ...genesis_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          data_size: dataSize,
          to_height: "2",
          to_key: "test_key_2",
          bundle_summary: "test_value_2",
          data_hash: dataHash,
          created_at: "0",
          voters_valid: ["another_test_staker", "test_staker"],
        },
      } as any;
    });
    core["syncPoolState"] = syncPoolStateMock;

    const cacheGetMock = jest
      .fn()
      .mockResolvedValueOnce({
        key: "test_key_1",
        value: "test_value_1",
      })
      .mockResolvedValueOnce({
        key: "test_key_2",
        value: "test_value_2",
      });

    core["cache"].get = cacheGetMock;

    const waitForNextBundleProposalMock = jest.fn();
    core["waitForNextBundleProposal"] = waitForNextBundleProposalMock;

    core["continueRound"] = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValue(false);

    // ACT
    await runNode.call(core);

    // ASSERT

    // ========================
    // ASSERT CLIENT INTERFACES
    // ========================

    expect(claimUploaderRoleMock).toHaveBeenCalledTimes(0);

    expect(voteBundleProposalMock).toHaveBeenCalledTimes(0);

    expect(submitBundleProposalMock).toHaveBeenCalledTimes(0);

    expect(skipUploaderRoleMock).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(canVoteMock).toHaveBeenCalledTimes(1);
    expect(canVoteMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      voter: "test_valaddress",
      storage_id: "another_test_storage_id",
    });

    expect(canProposeMock).toHaveBeenCalledTimes(0);

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(saveBundleMock).toHaveBeenCalledTimes(0);

    expect(retrieveBundleMock).toHaveBeenCalledTimes(0);

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cacheGetMock).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compressMock).toHaveBeenCalledTimes(0);

    expect(decompressMock).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(summarizeBundleMock).toHaveBeenCalledTimes(0);

    expect(validateBundleMock).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(waitForNextBundleProposalMock).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });
});
