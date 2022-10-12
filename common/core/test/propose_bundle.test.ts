import { Logger } from "tslog";
import { Node, sha256 } from "../src/index";
import {
  summarizeBundleMock,
  TestRuntime,
  validateBundleMock,
} from "./mocks/runtime";
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
import { setupMetrics } from "../src/methods";
import { register } from "prom-client";
import { TestCache } from "./mocks/cache";

/*

TEST CASES - propose bundle tests

* propose bundle with data
* propose bundle with no data
* propose bundle after last bundle has been dropped

*/

describe("propose bundle tests", () => {
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

  test("propose genesis bundle with valid data bundle", async () => {
    // ARRANGE
    canVoteMock.mockResolvedValue({
      possible: false,
      reason: "Already voted",
    });

    const syncPoolStateMock = jest.fn().mockImplementation(() => {
      core.pool = {
        ...genesis_pool,
        data: {
          ...genesis_pool.data,
          current_index: "100",
          current_key: "99",
        },
        bundle_proposal: {
          ...genesis_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "test_staker",
          data_size: "123456789",
          data_hash: "previous_test_bundle_hash",
          bundle_size: "2",
          from_key: "100",
          to_key: "101",
          bundle_summary: "previous_test_value",
          updated_at: "0",
          voters_valid: ["test_staker"],
        },
      } as any;
    });
    core["syncPoolState"] = syncPoolStateMock;

    const bundle = [
      {
        key: "test_key_1",
        value: "test_value_1",
      },
      {
        key: "test_key_2",
        value: "test_value_2",
      },
    ];

    const cacheGetMock = jest
      .fn()
      .mockResolvedValueOnce({
        key: "test_key_1",
        value: "test_value_1",
      })
      .mockResolvedValueOnce({
        key: "test_key_2",
        value: "test_value_2",
      })
      .mockRejectedValue(new Error("not found"));

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

    expect(submitBundleProposalMock).toHaveBeenCalledTimes(1);
    expect(submitBundleProposalMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      storage_id: "test_storage_id",
      data_size: Buffer.from(JSON.stringify(bundle)).byteLength.toString(),
      data_hash: sha256(Buffer.from(JSON.stringify(bundle))),
      from_index: "102",
      bundle_size: "2",
      from_key: "test_key_1",
      to_key: "test_key_2",
      bundle_summary: JSON.stringify(bundle),
    });

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

    expect(canProposeMock).toHaveBeenCalledTimes(1);
    expect(canProposeMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      proposer: "test_valaddress",
      from_index: "102",
    });

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(saveBundleMock).toHaveBeenCalledTimes(1);
    expect(saveBundleMock).toHaveBeenLastCalledWith(
      Buffer.from(JSON.stringify(bundle)),
      expect.any(Array)
    );

    expect(retrieveBundleMock).toHaveBeenCalledTimes(0);

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cacheGetMock).toHaveBeenCalledTimes(3);
    expect(cacheGetMock).toHaveBeenNthCalledWith(1, "102");
    expect(cacheGetMock).toHaveBeenNthCalledWith(2, "103");
    expect(cacheGetMock).toHaveBeenNthCalledWith(3, "104");

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compressMock).toHaveBeenCalledTimes(1);
    expect(compressMock).toHaveBeenLastCalledWith(
      Buffer.from(JSON.stringify(bundle))
    );

    expect(decompressMock).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(summarizeBundleMock).toHaveBeenCalledTimes(1);

    expect(summarizeBundleMock).toHaveBeenLastCalledWith(bundle);

    expect(validateBundleMock).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(waitForNextBundleProposalMock).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("propose bundle with no data", async () => {
    // ARRANGE
    canVoteMock.mockResolvedValue({
      possible: false,
      reason: "Already voted",
    });

    const syncPoolStateMock = jest.fn().mockImplementation(() => {
      core.pool = {
        ...genesis_pool,
        data: {
          ...genesis_pool.data,
          current_index: "100",
          current_key: "99",
        },
        bundle_proposal: {
          ...genesis_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "another_test_staker",
          next_uploader: "test_staker",
          data_size: "123456789",
          data_hash: "previous_test_bundle_hash",
          bundle_size: "2",
          from_key: "100",
          to_key: "101",
          bundle_summary: "previous_test_value",
          updated_at: "0",
          voters_valid: ["test_staker"],
        },
      } as any;
    });
    core["syncPoolState"] = syncPoolStateMock;

    const bundle = [
      {
        key: "test_key_1",
        value: "test_value_1",
      },
      {
        key: "test_key_2",
        value: "test_value_2",
      },
    ];

    const cacheGetMock = jest.fn().mockRejectedValue(new Error("not found"));

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

    expect(skipUploaderRoleMock).toHaveBeenCalledTimes(1);
    expect(skipUploaderRoleMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      from_index: "102",
    });

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

    expect(canProposeMock).toHaveBeenCalledTimes(1);
    expect(canProposeMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      proposer: "test_valaddress",
      from_index: "102",
    });

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(saveBundleMock).toHaveBeenCalledTimes(0);

    expect(retrieveBundleMock).toHaveBeenCalledTimes(0);

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cacheGetMock).toHaveBeenCalledTimes(1);
    expect(cacheGetMock).toHaveBeenLastCalledWith("102");

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

  test("propose bundle after last bundle has been dropped", async () => {
    // ARRANGE
    canVoteMock.mockResolvedValue({
      possible: false,
      reason: "Already voted",
    });

    const syncPoolStateMock = jest.fn().mockImplementation(() => {
      core.pool = {
        ...genesis_pool,
        data: {
          ...genesis_pool.data,
          current_index: "100",
          current_key: "99",
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
    core["syncPoolState"] = syncPoolStateMock;

    const bundle = [
      {
        key: "test_key_1",
        value: "test_value_1",
      },
      {
        key: "test_key_2",
        value: "test_value_2",
      },
    ];

    const cacheGetMock = jest
      .fn()
      .mockResolvedValueOnce({ key: "test_key_1", value: "test_value_1" })
      .mockResolvedValueOnce({ key: "test_key_2", value: "test_value_2" })
      .mockRejectedValue(new Error("not found"));

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

    expect(submitBundleProposalMock).toHaveBeenCalledTimes(1);
    expect(submitBundleProposalMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      storage_id: "test_storage_id",
      data_size: Buffer.from(JSON.stringify(bundle)).byteLength.toString(),
      data_hash: sha256(Buffer.from(JSON.stringify(bundle))),
      from_index: "100",
      bundle_size: "2",
      from_key: "test_key_1",
      to_key: "test_key_2",
      bundle_summary: JSON.stringify(bundle),
    });

    expect(skipUploaderRoleMock).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(canVoteMock).toHaveBeenCalledTimes(0);

    expect(canProposeMock).toHaveBeenCalledTimes(1);
    expect(canProposeMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      proposer: "test_valaddress",
      from_index: "100",
    });

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(saveBundleMock).toHaveBeenCalledTimes(1);
    expect(saveBundleMock).toHaveBeenLastCalledWith(
      Buffer.from(JSON.stringify(bundle)),
      expect.any(Array)
    );

    expect(retrieveBundleMock).toHaveBeenCalledTimes(0);

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(cacheGetMock).toHaveBeenCalledTimes(3);
    expect(cacheGetMock).toHaveBeenNthCalledWith(1, "100");
    expect(cacheGetMock).toHaveBeenNthCalledWith(2, "101");
    expect(cacheGetMock).toHaveBeenNthCalledWith(3, "102");

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compressMock).toHaveBeenCalledTimes(1);
    expect(compressMock).toHaveBeenLastCalledWith(
      Buffer.from(JSON.stringify(bundle))
    );

    expect(decompressMock).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(summarizeBundleMock).toHaveBeenCalledTimes(1);

    expect(summarizeBundleMock).toHaveBeenLastCalledWith(bundle);

    expect(validateBundleMock).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(waitForNextBundleProposalMock).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });
});
