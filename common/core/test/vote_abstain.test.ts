import { Logger } from "tslog";
import { bundleToBytes, Node, sha256, standardizeJSON } from "../src/index";
import {
  formatValueMock,
  TestRuntime,
  validateMock,
} from "./mocks/integration";
import { runNode } from "../src/methods/runNode";
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
  base_pool,
  canVoteMock,
  canProposeMock,
  lcd,
  skipUploaderRoleMock,
} from "./mocks/helpers";
import { VoteType } from "@kyve/proto/dist/proto/kyve/bundles/v1beta1/tx";
import { setupMetrics } from "../src/methods";
import { register } from "prom-client";

/*

TEST CASES - vote abstain tests

* TODO: test if proposed to height is greater than of loadBundle

* vote abstain because local bundle could not be loaded at all
* vote abstain because local bundle could only be loaded partially
* vote abstain because local bundle could only be loaded partially multiple times
* vote abstain because bundle from storage provider could not be loaded
* vote abstain because bundle from storage provider could not be loaded multiple times
* vote abstain because local and storage provider bundle could not be loaded
* try to vote abstain after validator has already voted abstain
* try to vote abstain after validator has already voted valid
* try to vote abstain after validator has already voted invalid

*/

describe("vote abstain tests", () => {
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
    formatValueMock.mockClear();
    validateMock.mockClear();

    // reset prometheus
    register.clear();
  });

  test("vote abstain because local bundle could not be loaded at all", async () => {
    // ARRANGE
    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const byteSize = compressedBundle.byteLength.toString();
    const bundleHash = sha256(bundleBytes);

    const syncPoolStateMock = jest.fn().mockImplementation(() => {
      core.pool = {
        ...base_pool,
        bundle_proposal: {
          ...base_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          byte_size: byteSize,
          to_height: "2",
          to_key: "test_key_2",
          to_value: "test_value_2",
          bundle_hash: bundleHash,
          created_at: "0",
          voters_valid: ["another_test_staker"],
        },
      } as any;
    });
    core["syncPoolState"] = syncPoolStateMock;

    const loadBundleMock = jest
      .fn()
      .mockResolvedValueOnce({
        bundle: [],
        toKey: "",
        toValue: "",
      })
      .mockResolvedValue({
        bundle,
        toKey: "test_key_2",
        toValue: "test_value_2",
      });
    core["loadBundle"] = loadBundleMock;

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

    expect(loadBundleMock).toHaveBeenCalledTimes(2);

    expect(loadBundleMock).toHaveBeenNthCalledWith(1, 0, 2);
    expect(loadBundleMock).toHaveBeenNthCalledWith(2, 0, 2);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compressMock).toHaveBeenCalledTimes(0);

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenLastCalledWith(compressedBundle);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(formatValueMock).toHaveBeenCalledTimes(1);
    expect(formatValueMock).toHaveBeenLastCalledWith("test_value_2");

    expect(validateMock).toHaveBeenCalledTimes(1);
    expect(validateMock).toHaveBeenLastCalledWith(
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

  test("vote abstain because local bundle could only be loaded partially", async () => {
    // ARRANGE
    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const byteSize = compressedBundle.byteLength.toString();
    const bundleHash = sha256(bundleBytes);

    const syncPoolStateMock = jest.fn().mockImplementation(() => {
      core.pool = {
        ...base_pool,
        bundle_proposal: {
          ...base_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          byte_size: byteSize,
          to_height: "2",
          to_key: "test_key_2",
          to_value: "test_value_2",
          bundle_hash: bundleHash,
          created_at: "0",
          voters_valid: ["another_test_staker"],
        },
      } as any;
    });
    core["syncPoolState"] = syncPoolStateMock;

    const loadBundleMock = jest
      .fn()
      .mockResolvedValueOnce({
        bundle: [{ key: "test_key_1", value: "test_value_1" }],
        toKey: "test_key_1",
        toValue: "test_value_1",
      })
      .mockResolvedValue({
        bundle,
        toKey: "test_key_2",
        toValue: "test_value_2",
      });
    core["loadBundle"] = loadBundleMock;

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

    expect(loadBundleMock).toHaveBeenCalledTimes(2);

    expect(loadBundleMock).toHaveBeenNthCalledWith(1, 0, 2);
    expect(loadBundleMock).toHaveBeenNthCalledWith(2, 0, 2);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compressMock).toHaveBeenCalledTimes(0);

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenLastCalledWith(compressedBundle);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(formatValueMock).toHaveBeenCalledTimes(1);
    expect(formatValueMock).toHaveBeenLastCalledWith("test_value_2");

    expect(validateMock).toHaveBeenCalledTimes(1);
    expect(validateMock).toHaveBeenLastCalledWith(
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

  test("vote abstain because local bundle could only be loaded partially multiple times", async () => {
    // ARRANGE
    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const byteSize = compressedBundle.byteLength.toString();
    const bundleHash = sha256(bundleBytes);

    const syncPoolStateMock = jest.fn().mockImplementation(() => {
      core.pool = {
        ...base_pool,
        bundle_proposal: {
          ...base_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          byte_size: byteSize,
          to_height: "2",
          to_key: "test_key_2",
          to_value: "test_value_2",
          bundle_hash: bundleHash,
          created_at: "0",
          voters_valid: ["another_test_staker"],
        },
      } as any;
    });
    core["syncPoolState"] = syncPoolStateMock;

    const loadBundleMock = jest
      .fn()
      .mockResolvedValueOnce({
        bundle: [],
        toKey: "",
        toValue: "",
      })
      .mockResolvedValueOnce({
        bundle: [{ key: "test_key_1", value: "test_value_1" }],
        toKey: "test_key_1",
        toValue: "test_value_1",
      })
      .mockResolvedValue({
        bundle,
        toKey: "test_key_2",
        toValue: "test_value_2",
      });
    core["loadBundle"] = loadBundleMock;

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

    expect(loadBundleMock).toHaveBeenCalledTimes(3);

    expect(loadBundleMock).toHaveBeenNthCalledWith(1, 0, 2);
    expect(loadBundleMock).toHaveBeenNthCalledWith(2, 0, 2);
    expect(loadBundleMock).toHaveBeenNthCalledWith(3, 0, 2);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compressMock).toHaveBeenCalledTimes(0);

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenLastCalledWith(compressedBundle);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(formatValueMock).toHaveBeenCalledTimes(1);
    expect(formatValueMock).toHaveBeenLastCalledWith("test_value_2");

    expect(validateMock).toHaveBeenCalledTimes(1);
    expect(validateMock).toHaveBeenLastCalledWith(
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

  test("vote abstain because bundle from storage provider could not be loaded", async () => {
    // ARRANGE
    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const byteSize = compressedBundle.byteLength.toString();
    const bundleHash = sha256(bundleBytes);

    const syncPoolStateMock = jest.fn().mockImplementation(() => {
      core.pool = {
        ...base_pool,
        bundle_proposal: {
          ...base_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          byte_size: byteSize,
          to_height: "2",
          to_key: "test_key_2",
          to_value: "test_value_2",
          bundle_hash: bundleHash,
          created_at: "0",
          voters_valid: ["another_test_staker"],
        },
      } as any;
    });
    core["syncPoolState"] = syncPoolStateMock;

    const loadBundleMock = jest.fn().mockResolvedValue({
      bundle,
      toKey: "test_key_2",
      toValue: "test_value_2",
    });
    core["loadBundle"] = loadBundleMock;

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

    expect(loadBundleMock).toHaveBeenCalledTimes(1);

    expect(loadBundleMock).toHaveBeenLastCalledWith(0, 2);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compressMock).toHaveBeenCalledTimes(0);

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenLastCalledWith(compressedBundle);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(formatValueMock).toHaveBeenCalledTimes(1);
    expect(formatValueMock).toHaveBeenLastCalledWith("test_value_2");

    expect(validateMock).toHaveBeenCalledTimes(1);
    expect(validateMock).toHaveBeenLastCalledWith(
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

  test("vote abstain because bundle from storage provider could not be loaded multiple times", async () => {
    // ARRANGE
    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const byteSize = compressedBundle.byteLength.toString();
    const bundleHash = sha256(bundleBytes);

    const syncPoolStateMock = jest.fn().mockImplementation(() => {
      core.pool = {
        ...base_pool,
        bundle_proposal: {
          ...base_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          byte_size: byteSize,
          to_height: "2",
          to_key: "test_key_2",
          to_value: "test_value_2",
          bundle_hash: bundleHash,
          created_at: "0",
          voters_valid: ["another_test_staker"],
        },
      } as any;
    });
    core["syncPoolState"] = syncPoolStateMock;

    const loadBundleMock = jest.fn().mockResolvedValue({
      bundle,
      toKey: "test_key_2",
      toValue: "test_value_2",
    });
    core["loadBundle"] = loadBundleMock;

    const retrieveBundleMock = jest
      .fn()
      .mockRejectedValueOnce(new Error())
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

    expect(retrieveBundleMock).toHaveBeenCalledTimes(3);
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
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(
      3,
      "another_test_storage_id",
      (120 - 20) * 1000
    );

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(loadBundleMock).toHaveBeenCalledTimes(1);

    expect(loadBundleMock).toHaveBeenLastCalledWith(0, 2);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compressMock).toHaveBeenCalledTimes(0);

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenLastCalledWith(compressedBundle);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(formatValueMock).toHaveBeenCalledTimes(1);
    expect(formatValueMock).toHaveBeenLastCalledWith("test_value_2");

    expect(validateMock).toHaveBeenCalledTimes(1);
    expect(validateMock).toHaveBeenLastCalledWith(
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

  test("vote abstain because local and storage provider bundle could not be loaded", async () => {
    // ARRANGE
    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const byteSize = compressedBundle.byteLength.toString();
    const bundleHash = sha256(bundleBytes);

    const syncPoolStateMock = jest.fn().mockImplementation(() => {
      core.pool = {
        ...base_pool,
        bundle_proposal: {
          ...base_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          byte_size: byteSize,
          to_height: "2",
          to_key: "test_key_2",
          to_value: "test_value_2",
          bundle_hash: bundleHash,
          created_at: "0",
          voters_valid: ["another_test_staker"],
        },
      } as any;
    });
    core["syncPoolState"] = syncPoolStateMock;

    const loadBundleMock = jest
      .fn()
      .mockResolvedValueOnce({
        bundle: [],
        toKey: "",
        toValue: "",
      })
      .mockResolvedValue({
        bundle,
        toKey: "test_key_2",
        toValue: "test_value_2",
      });
    core["loadBundle"] = loadBundleMock;

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

    expect(loadBundleMock).toHaveBeenCalledTimes(2);

    expect(loadBundleMock).toHaveBeenNthCalledWith(1, 0, 2);
    expect(loadBundleMock).toHaveBeenNthCalledWith(2, 0, 2);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compressMock).toHaveBeenCalledTimes(0);

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenLastCalledWith(compressedBundle);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(formatValueMock).toHaveBeenCalledTimes(1);
    expect(formatValueMock).toHaveBeenLastCalledWith("test_value_2");

    expect(validateMock).toHaveBeenCalledTimes(1);
    expect(validateMock).toHaveBeenLastCalledWith(
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

  test("try to vote abstain after validator has already voted abstain", async () => {
    // ARRANGE
    const bundle = [
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ];

    const bundleBytes = bundleToBytes(bundle);
    const compressedBundle = bundleBytes; // no compression
    const byteSize = compressedBundle.byteLength.toString();
    const bundleHash = sha256(bundleBytes);

    const syncPoolStateMock = jest.fn().mockImplementation(() => {
      core.pool = {
        ...base_pool,
        bundle_proposal: {
          ...base_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          byte_size: byteSize,
          to_height: "2",
          to_key: "test_key_2",
          to_value: "test_value_2",
          bundle_hash: bundleHash,
          created_at: "0",
          voters_valid: ["another_test_staker"],
          voters_abstain: ["test_staker"],
        },
      } as any;
    });
    core["syncPoolState"] = syncPoolStateMock;

    const loadBundleMock = jest
      .fn()
      .mockResolvedValueOnce({
        bundle: [],
        toKey: "",
        toValue: "",
      })
      .mockResolvedValue({
        bundle,
        toKey: "test_key_2",
        toValue: "test_value_2",
      });
    core["loadBundle"] = loadBundleMock;

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

    expect(loadBundleMock).toHaveBeenCalledTimes(2);

    expect(loadBundleMock).toHaveBeenNthCalledWith(1, 0, 2);
    expect(loadBundleMock).toHaveBeenNthCalledWith(2, 0, 2);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compressMock).toHaveBeenCalledTimes(0);

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenLastCalledWith(compressedBundle);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(formatValueMock).toHaveBeenCalledTimes(1);
    expect(formatValueMock).toHaveBeenLastCalledWith("test_value_2");

    expect(validateMock).toHaveBeenCalledTimes(1);
    expect(validateMock).toHaveBeenLastCalledWith(
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

  test("try to vote abstain after validator has already voted valid", async () => {
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
    const byteSize = compressedBundle.byteLength.toString();
    const bundleHash = sha256(bundleBytes);

    const syncPoolStateMock = jest.fn().mockImplementation(() => {
      core.pool = {
        ...base_pool,
        bundle_proposal: {
          ...base_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          byte_size: byteSize,
          to_height: "2",
          to_key: "test_key_2",
          to_value: "test_value_2",
          bundle_hash: bundleHash,
          created_at: "0",
          voters_valid: ["another_test_staker", "test_staker"],
        },
      } as any;
    });
    core["syncPoolState"] = syncPoolStateMock;

    const loadBundleMock = jest
      .fn()
      .mockResolvedValueOnce({
        bundle: [],
        toKey: "",
        toValue: "",
      })
      .mockResolvedValue({
        bundle,
        toKey: "test_key_2",
        toValue: "test_value_2",
      });
    core["loadBundle"] = loadBundleMock;

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

    expect(loadBundleMock).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compressMock).toHaveBeenCalledTimes(0);

    expect(decompressMock).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(formatValueMock).toHaveBeenCalledTimes(0);

    expect(validateMock).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(waitForNextBundleProposalMock).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("try to vote abstain after validator has already voted invalid", async () => {
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
    const byteSize = compressedBundle.byteLength.toString();
    const bundleHash = sha256(bundleBytes);

    const syncPoolStateMock = jest.fn().mockImplementation(() => {
      core.pool = {
        ...base_pool,
        bundle_proposal: {
          ...base_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "another_test_staker",
          byte_size: byteSize,
          to_height: "2",
          to_key: "test_key_2",
          to_value: "test_value_2",
          bundle_hash: bundleHash,
          created_at: "0",
          voters_valid: ["another_test_staker"],
          voters_invalid: ["test_staker"],
        },
      } as any;
    });
    core["syncPoolState"] = syncPoolStateMock;

    const loadBundleMock = jest
      .fn()
      .mockResolvedValueOnce({
        bundle: [],
        toKey: "",
        toValue: "",
      })
      .mockResolvedValue({
        bundle,
        toKey: "test_key_2",
        toValue: "test_value_2",
      });
    core["loadBundle"] = loadBundleMock;

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

    expect(loadBundleMock).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compressMock).toHaveBeenCalledTimes(0);

    expect(decompressMock).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(formatValueMock).toHaveBeenCalledTimes(0);

    expect(validateMock).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(waitForNextBundleProposalMock).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });
});
