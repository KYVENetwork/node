import { Logger } from "tslog";
import { Node, sha256, standardizeJSON } from "../src/index";
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

/*

TEST CASES - invalid votes tests

* vote invalid because runtime validate function returns false
* vote invalid because proposed byte_size does not match
* vote invalid because proposed to_key does not match
* vote invalid because proposed to_value does not match
* vote invalid because proposed bundle_hash does not match

*/

describe("invalid votes tests", () => {
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

    core.client = client;
    core.lcd = lcd;
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
  });

  test("vote invalid because runtime validate function returns false", async () => {
    // ARRANGE
    const validateMock = jest.fn().mockResolvedValue(false);

    core["runtime"].validate = validateMock;

    const bundle = [
      {
        key: "test_key",
        value: "test_value",
      },
    ];

    const compressedBundle = Buffer.from(JSON.stringify(bundle));
    const byteSize = compressedBundle.byteLength.toString();
    const bundleHash = sha256(standardizeJSON(bundle));

    const syncPoolStateMock = jest
      .fn()
      .mockImplementationOnce(() => {
        core.pool = {
          ...base_pool,
        } as any;
      })
      .mockImplementation(() => {
        core.pool = {
          ...base_pool,
          bundle_proposal: {
            ...base_pool.bundle_proposal,
            storage_id: "another_test_storage_id",
            uploader: "another_test_staker",
            next_uploader: "another_test_staker",
            byte_size: byteSize,
            to_height: "1",
            to_key: "test_key",
            to_value: "test_value",
            bundle_hash: bundleHash,
            created_at: "0",
            voters_valid: ["another_test_staker"],
          },
        } as any;
      });
    core["syncPoolState"] = syncPoolStateMock;

    const loadBundleMock = jest.fn().mockResolvedValue({
      bundle,
      toKey: "test_key",
      toValue: "test_value",
    });
    core["loadBundle"] = loadBundleMock;

    const waitForNextBundleProposalMock = jest.fn();
    core["waitForNextBundleProposal"] = waitForNextBundleProposalMock;

    core["continueBundleProposalRound"] = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValue(false);

    // ACT
    await runNode.call(core);

    // ASSERT

    // ========================
    // ASSERT CLIENT INTERFACES
    // ========================

    expect(claimUploaderRoleMock).toHaveBeenCalledTimes(1);
    expect(claimUploaderRoleMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
    });

    expect(voteBundleProposalMock).toHaveBeenCalledTimes(1);
    expect(voteBundleProposalMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_NO,
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

    expect(loadBundleMock).toHaveBeenCalledTimes(1);

    expect(loadBundleMock).toHaveBeenLastCalledWith(0, 1);

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
    expect(formatValueMock).toHaveBeenLastCalledWith("test_value");

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

  test("vote invalid because proposed byte_size does not match", async () => {
    // ARRANGE
    const bundle = [
      {
        key: "test_key",
        value: "test_value",
      },
    ];

    const compressedBundle = Buffer.from(JSON.stringify(bundle));
    const byteSize = compressedBundle.byteLength.toString();
    const bundleHash = sha256(standardizeJSON(bundle));

    const syncPoolStateMock = jest
      .fn()
      .mockImplementationOnce(() => {
        core.pool = {
          ...base_pool,
        } as any;
      })
      .mockImplementation(() => {
        core.pool = {
          ...base_pool,
          bundle_proposal: {
            ...base_pool.bundle_proposal,
            storage_id: "another_test_storage_id",
            uploader: "another_test_staker",
            next_uploader: "another_test_staker",
            byte_size: "123456789",
            to_height: "1",
            to_key: "test_key",
            to_value: "test_value",
            bundle_hash: bundleHash,
            created_at: "0",
            voters_valid: ["another_test_staker"],
          },
        } as any;
      });
    core["syncPoolState"] = syncPoolStateMock;

    const loadBundleMock = jest.fn().mockResolvedValue({
      bundle,
      toKey: "test_key",
      toValue: "test_value",
    });
    core["loadBundle"] = loadBundleMock;

    const waitForNextBundleProposalMock = jest.fn();
    core["waitForNextBundleProposal"] = waitForNextBundleProposalMock;

    core["continueBundleProposalRound"] = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValue(false);

    // ACT
    await runNode.call(core);

    // ASSERT

    // ========================
    // ASSERT CLIENT INTERFACES
    // ========================

    expect(claimUploaderRoleMock).toHaveBeenCalledTimes(1);
    expect(claimUploaderRoleMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
    });

    expect(voteBundleProposalMock).toHaveBeenCalledTimes(1);
    expect(voteBundleProposalMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_NO,
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

    expect(loadBundleMock).toHaveBeenCalledTimes(1);

    expect(loadBundleMock).toHaveBeenLastCalledWith(0, 1);

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
    expect(formatValueMock).toHaveBeenLastCalledWith("test_value");

    expect(validateMock).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(waitForNextBundleProposalMock).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("vote invalid because proposed to_key does not match", async () => {
    // ARRANGE
    const bundle = [
      {
        key: "test_key",
        value: "test_value",
      },
    ];

    const compressedBundle = Buffer.from(JSON.stringify(bundle));
    const byteSize = compressedBundle.byteLength.toString();
    const bundleHash = sha256(standardizeJSON(bundle));

    const syncPoolStateMock = jest
      .fn()
      .mockImplementationOnce(() => {
        core.pool = {
          ...base_pool,
        } as any;
      })
      .mockImplementation(() => {
        core.pool = {
          ...base_pool,
          bundle_proposal: {
            ...base_pool.bundle_proposal,
            storage_id: "another_test_storage_id",
            uploader: "another_test_staker",
            next_uploader: "another_test_staker",
            byte_size: byteSize,
            to_height: "1",
            to_key: "invalid_to_key",
            to_value: "test_value",
            bundle_hash: bundleHash,
            created_at: "0",
            voters_valid: ["another_test_staker"],
          },
        } as any;
      });
    core["syncPoolState"] = syncPoolStateMock;

    const loadBundleMock = jest.fn().mockResolvedValue({
      bundle,
      toKey: "test_key",
      toValue: "test_value",
    });
    core["loadBundle"] = loadBundleMock;

    const waitForNextBundleProposalMock = jest.fn();
    core["waitForNextBundleProposal"] = waitForNextBundleProposalMock;

    core["continueBundleProposalRound"] = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValue(false);

    // ACT
    await runNode.call(core);

    // ASSERT

    // ========================
    // ASSERT CLIENT INTERFACES
    // ========================

    expect(claimUploaderRoleMock).toHaveBeenCalledTimes(1);
    expect(claimUploaderRoleMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
    });

    expect(voteBundleProposalMock).toHaveBeenCalledTimes(1);
    expect(voteBundleProposalMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_NO,
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

    expect(loadBundleMock).toHaveBeenCalledTimes(1);

    expect(loadBundleMock).toHaveBeenLastCalledWith(0, 1);

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
    expect(formatValueMock).toHaveBeenLastCalledWith("test_value");

    expect(validateMock).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(waitForNextBundleProposalMock).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("vote invalid because proposed to_value does not match", async () => {
    // ARRANGE
    const bundle = [
      {
        key: "test_key",
        value: "test_value",
      },
    ];

    const compressedBundle = Buffer.from(JSON.stringify(bundle));
    const byteSize = compressedBundle.byteLength.toString();
    const bundleHash = sha256(standardizeJSON(bundle));

    const syncPoolStateMock = jest
      .fn()
      .mockImplementationOnce(() => {
        core.pool = {
          ...base_pool,
        } as any;
      })
      .mockImplementation(() => {
        core.pool = {
          ...base_pool,
          bundle_proposal: {
            ...base_pool.bundle_proposal,
            storage_id: "another_test_storage_id",
            uploader: "another_test_staker",
            next_uploader: "another_test_staker",
            byte_size: byteSize,
            to_height: "1",
            to_key: "test_key",
            to_value: "invalid_test_value",
            bundle_hash: bundleHash,
            created_at: "0",
            voters_valid: ["another_test_staker"],
          },
        } as any;
      });
    core["syncPoolState"] = syncPoolStateMock;

    const loadBundleMock = jest.fn().mockResolvedValue({
      bundle,
      toKey: "test_key",
      toValue: "test_value",
    });
    core["loadBundle"] = loadBundleMock;

    const waitForNextBundleProposalMock = jest.fn();
    core["waitForNextBundleProposal"] = waitForNextBundleProposalMock;

    core["continueBundleProposalRound"] = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValue(false);

    // ACT
    await runNode.call(core);

    // ASSERT

    // ========================
    // ASSERT CLIENT INTERFACES
    // ========================

    expect(claimUploaderRoleMock).toHaveBeenCalledTimes(1);
    expect(claimUploaderRoleMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
    });

    expect(voteBundleProposalMock).toHaveBeenCalledTimes(1);
    expect(voteBundleProposalMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_NO,
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

    expect(loadBundleMock).toHaveBeenCalledTimes(1);

    expect(loadBundleMock).toHaveBeenLastCalledWith(0, 1);

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
    expect(formatValueMock).toHaveBeenLastCalledWith("test_value");

    expect(validateMock).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(waitForNextBundleProposalMock).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("vote invalid because proposed bundle_hash does not match", async () => {
    // ARRANGE
    const bundle = [
      {
        key: "test_key",
        value: "test_value",
      },
    ];

    const compressedBundle = Buffer.from(JSON.stringify(bundle));
    const byteSize = compressedBundle.byteLength.toString();
    const bundleHash = sha256(standardizeJSON(bundle));

    const syncPoolStateMock = jest
      .fn()
      .mockImplementationOnce(() => {
        core.pool = {
          ...base_pool,
        } as any;
      })
      .mockImplementation(() => {
        core.pool = {
          ...base_pool,
          bundle_proposal: {
            ...base_pool.bundle_proposal,
            storage_id: "another_test_storage_id",
            uploader: "another_test_staker",
            next_uploader: "another_test_staker",
            byte_size: byteSize,
            to_height: "1",
            to_key: "test_key",
            to_value: "test_value",
            bundle_hash: "invalid_bundle_hash",
            created_at: "0",
            voters_valid: ["another_test_staker"],
          },
        } as any;
      });
    core["syncPoolState"] = syncPoolStateMock;

    const loadBundleMock = jest.fn().mockResolvedValue({
      bundle,
      toKey: "test_key",
      toValue: "test_value",
    });
    core["loadBundle"] = loadBundleMock;

    const waitForNextBundleProposalMock = jest.fn();
    core["waitForNextBundleProposal"] = waitForNextBundleProposalMock;

    core["continueBundleProposalRound"] = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValue(false);

    // ACT
    await runNode.call(core);

    // ASSERT

    // ========================
    // ASSERT CLIENT INTERFACES
    // ========================

    expect(claimUploaderRoleMock).toHaveBeenCalledTimes(1);
    expect(claimUploaderRoleMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
    });

    expect(voteBundleProposalMock).toHaveBeenCalledTimes(1);
    expect(voteBundleProposalMock).toHaveBeenLastCalledWith({
      staker: "test_staker",
      pool_id: "0",
      storage_id: "another_test_storage_id",
      vote: VoteType.VOTE_TYPE_NO,
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

    expect(loadBundleMock).toHaveBeenCalledTimes(1);

    expect(loadBundleMock).toHaveBeenLastCalledWith(0, 1);

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
    expect(formatValueMock).toHaveBeenLastCalledWith("test_value");

    expect(validateMock).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(waitForNextBundleProposalMock).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });
});
