import { Logger } from "tslog";
import { Node, sha256, standardizeJSON } from "../src/index";
import { TestRuntime, validateMock } from "./mocks/integration";
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

describe("e2e", () => {
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
    core["staker"] = "test_staker_0";

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
    validateMock.mockClear();
  });

  test("propose genesis bundle with valid data bundle", async () => {
    // ARRANGE
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
            next_uploader: "test_staker_0",
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

    const loadBundleMock = jest.fn().mockResolvedValue({
      bundle,
      toKey: "test_key_2",
      toValue: "test_value_2",
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
      staker: "test_staker_0",
      pool_id: "0",
    });

    expect(voteBundleProposalMock).toHaveBeenCalledTimes(0);

    expect(submitBundleProposalMock).toHaveBeenCalledTimes(1);
    expect(submitBundleProposalMock).toHaveBeenLastCalledWith({
      staker: "test_staker_0",
      pool_id: "0",
      storage_id: "test_storage_id",
      byte_size: Buffer.from(JSON.stringify(bundle)).byteLength.toString(),
      from_height: "0",
      to_height: "2",
      from_key: "",
      to_key: "test_key_2",
      to_value: "test_value_2",
      bundle_hash: sha256(standardizeJSON(bundle)),
    });

    expect(skipUploaderRoleMock).toHaveBeenCalledTimes(0);

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(canVoteMock).toHaveBeenCalledTimes(0);

    expect(canProposeMock).toHaveBeenCalledTimes(1);
    expect(canProposeMock).toHaveBeenLastCalledWith({
      staker: "test_staker_0",
      pool_id: "0",
      proposer: "test_valaddress_0",
      from_height: "0",
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

    expect(loadBundleMock).toHaveBeenCalledTimes(1);
    expect(loadBundleMock).toHaveBeenLastCalledWith(0, 100);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compressMock).toHaveBeenCalledTimes(1);
    expect(compressMock).toHaveBeenLastCalledWith(bundle);

    expect(decompressMock).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(validateMock).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(waitForNextBundleProposalMock).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });

  test("propose genesis bundle with no data bundle", async () => {
    // ARRANGE
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
            next_uploader: "test_staker_0",
          },
        } as any;
      });
    core["syncPoolState"] = syncPoolStateMock;

    const loadBundleMock = jest.fn().mockResolvedValue({
      bundle: [],
      toKey: "",
      toValue: "",
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
      staker: "test_staker_0",
      pool_id: "0",
    });

    expect(voteBundleProposalMock).toHaveBeenCalledTimes(0);

    expect(submitBundleProposalMock).toHaveBeenCalledTimes(0);

    expect(skipUploaderRoleMock).toHaveBeenCalledTimes(1);
    expect(skipUploaderRoleMock).toHaveBeenLastCalledWith({
      staker: "test_staker_0",
      pool_id: "0",
      from_height: "0",
    });

    // =====================
    // ASSERT LCD INTERFACES
    // =====================

    expect(canVoteMock).toHaveBeenCalledTimes(0);

    expect(canProposeMock).toHaveBeenCalledTimes(1);
    expect(canProposeMock).toHaveBeenLastCalledWith({
      staker: "test_staker_0",
      pool_id: "0",
      proposer: "test_valaddress_0",
      from_height: "0",
    });

    // =========================
    // ASSERT STORAGE INTERFACES
    // =========================

    expect(saveBundleMock).toHaveBeenCalledTimes(0);
    expect(retrieveBundleMock).toHaveBeenCalledTimes(0);

    // =======================
    // ASSERT CACHE INTERFACES
    // =======================

    expect(loadBundleMock).toHaveBeenCalledTimes(1);
    expect(loadBundleMock).toHaveBeenLastCalledWith(0, 100);

    // =============================
    // ASSERT COMPRESSION INTERFACES
    // =============================

    expect(compressMock).toHaveBeenCalledTimes(0);
    expect(decompressMock).toHaveBeenCalledTimes(0);

    // =============================
    // ASSERT INTEGRATION INTERFACES
    // =============================

    expect(validateMock).toHaveBeenCalledTimes(0);

    // ========================
    // ASSERT NODEJS INTERFACES
    // ========================

    // assert that only one round ran
    expect(waitForNextBundleProposalMock).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });
});
