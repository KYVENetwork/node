import { Logger } from "tslog";
import { Node } from "../src/index";
import { TestRuntime } from "./mocks/integration";
import { validateBundleProposal } from "../src/methods/validateBundleProposal";
import {
  TestStorageProvider,
  retrieveBundleMock,
} from "./mocks/storageProvider";
import { TestCompression } from "./mocks/compression";

jest.setTimeout(20000);

describe("src/methods/validateBundleProposal.ts", () => {
  let core: Node;

  let loggerInfo: jest.Mock;
  let loggerDebug: jest.Mock;
  let loggerWarn: jest.Mock;
  let loggerError: jest.Mock;

  let processExit: jest.Mock<never, never>;

  let executeMock: jest.Mock;
  let voteProposalMock: jest.Mock;

  beforeEach(() => {
    core = new Node();

    core.addRuntime(new TestRuntime());
    core.addStorageProvider(new TestStorageProvider());
    core.addCompression(new TestCompression());

    // mock process.exit
    processExit = jest.fn<never, never>();
    process.exit = processExit;

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

    executeMock = jest.fn().mockResolvedValue({
      code: 0,
    });

    voteProposalMock = jest.fn().mockResolvedValue({
      txHash: "test_hash",
      execute: executeMock,
    });

    core.client = {
      kyve: {
        v1beta1: {
          base: {
            voteProposal: voteProposalMock,
          },
        },
      },
      account: {
        address: "test_uploader",
        algo: "ed25519",
        pubkey: new Uint8Array(),
      },
    } as any;
  });

  test("validateBundleProposal: new bundle was created in the meantime", async () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      current_height: "0",
      bundle_proposal: {
        storage_id: "test_storage_id",
        created_at: "100",
        to_height: "100",
        voters_abstain: [],
      },
    } as any;

    const syncPoolStateMock = jest.fn();

    core["syncPoolState"] = syncPoolStateMock;

    // ACT
    await validateBundleProposal.call(core, 99);

    // ASSERT
    expect(syncPoolStateMock).toHaveBeenCalledTimes(1);
  });

  test("validateBundleProposal: bundle was dropped", async () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      current_height: "0",
      bundle_proposal: {
        storage_id: "test_storage_id",
        created_at: "100",
        to_height: "100",
        voters_abstain: [],
      },
    } as any;

    const syncPoolStateMock = jest.fn();
    const shouldIdleMock = jest.fn().mockReturnValue(true);

    core["syncPoolState"] = syncPoolStateMock;
    core["shouldIdle"] = shouldIdleMock;

    // ACT
    await validateBundleProposal.call(core, 101);

    // ASSERT
    expect(syncPoolStateMock).toHaveBeenCalledTimes(1);
    expect(shouldIdleMock).toHaveBeenCalledTimes(1);
  });

  test("validateBundleProposal: bundle is valid", async () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      current_height: "0",
      bundle_proposal: {
        storage_id: "test_storage_id",
        created_at: "100",
        to_height: "1",
        byte_size: "41",
        voters_abstain: [],
        to_key: "test_key",
        to_value: "test_value",
        bundle_hash:
          "9b41cc136f12b5456f073262e179d937f8f3e3702e6d57251380b50b232f3945",
      },
    } as any;

    const syncPoolStateMock = jest.fn();
    const shouldIdleMock = jest.fn().mockReturnValue(false);
    const loadBundleMock = jest.fn().mockResolvedValue({
      bundle: [{ key: "test_key", value: "test_value" }],
      toKey: "test_key",
      toValue: "test_value",
    });

    core["syncPoolState"] = syncPoolStateMock;
    core["shouldIdle"] = shouldIdleMock;
    core["loadBundle"] = loadBundleMock;

    // ACT
    await validateBundleProposal.call(core, 101);

    // ASSERT
    expect(voteProposalMock).toHaveBeenCalledTimes(1);
    expect(voteProposalMock).toHaveBeenNthCalledWith(1, {
      id: "0",
      storage_id: "test_storage_id",
      vote: 1,
    });
  });

  test("validateBundleProposal: proposed invalid hash", async () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      current_height: "0",
      bundle_proposal: {
        storage_id: "test_storage_id",
        created_at: "100",
        to_height: "1",
        byte_size: "41",
        voters_abstain: [],
        to_key: "test_key",
        to_value: "test_value",
        bundle_hash: "invalid_hash",
      },
    } as any;

    const syncPoolStateMock = jest.fn();
    const shouldIdleMock = jest.fn().mockReturnValue(false);
    const loadBundleMock = jest.fn().mockResolvedValue({
      bundle: [{ key: "test_key", value: "test_value" }],
      toKey: "test_key",
      toValue: "test_value",
    });

    core["syncPoolState"] = syncPoolStateMock;
    core["shouldIdle"] = shouldIdleMock;
    core["loadBundle"] = loadBundleMock;

    // ACT
    await validateBundleProposal.call(core, 101);

    // ASSERT
    expect(voteProposalMock).toHaveBeenCalledTimes(1);
    expect(voteProposalMock).toHaveBeenNthCalledWith(1, {
      id: "0",
      storage_id: "test_storage_id",
      vote: 2,
    });
  });

  test("validateBundleProposal: proposed invalid byte size", async () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      current_height: "0",
      bundle_proposal: {
        storage_id: "test_storage_id",
        created_at: "100",
        to_height: "1",
        byte_size: "10000",
        voters_abstain: [],
        to_key: "test_key",
        to_value: "test_value",
        bundle_hash:
          "9b41cc136f12b5456f073262e179d937f8f3e3702e6d57251380b50b232f3945",
      },
    } as any;

    const syncPoolStateMock = jest.fn();
    const shouldIdleMock = jest.fn().mockReturnValue(false);
    const loadBundleMock = jest.fn().mockResolvedValue({
      bundle: [{ key: "test_key", value: "test_value" }],
      toKey: "test_key",
      toValue: "test_value",
    });

    core["syncPoolState"] = syncPoolStateMock;
    core["shouldIdle"] = shouldIdleMock;
    core["loadBundle"] = loadBundleMock;

    // ACT
    await validateBundleProposal.call(core, 101);

    // ASSERT
    expect(voteProposalMock).toHaveBeenCalledTimes(1);
    expect(voteProposalMock).toHaveBeenNthCalledWith(1, {
      id: "0",
      storage_id: "test_storage_id",
      vote: 2,
    });
  });

  test("validateBundleProposal: proposed invalid to_key", async () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      current_height: "0",
      bundle_proposal: {
        storage_id: "test_storage_id",
        created_at: "100",
        to_height: "1",
        byte_size: "41",
        voters_abstain: [],
        to_key: "invalid_test_key",
        to_value: "test_value",
        bundle_hash:
          "9b41cc136f12b5456f073262e179d937f8f3e3702e6d57251380b50b232f3945",
      },
    } as any;

    const syncPoolStateMock = jest.fn();
    const shouldIdleMock = jest.fn().mockReturnValue(false);
    const loadBundleMock = jest.fn().mockResolvedValue({
      bundle: [{ key: "test_key", value: "test_value" }],
      toKey: "test_key",
      toValue: "test_value",
    });

    core["syncPoolState"] = syncPoolStateMock;
    core["shouldIdle"] = shouldIdleMock;
    core["loadBundle"] = loadBundleMock;

    // ACT
    await validateBundleProposal.call(core, 101);

    // ASSERT
    expect(voteProposalMock).toHaveBeenCalledTimes(1);
    expect(voteProposalMock).toHaveBeenNthCalledWith(1, {
      id: "0",
      storage_id: "test_storage_id",
      vote: 2,
    });
  });

  test("validateBundleProposal: proposed invalid to_value", async () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      current_height: "0",
      bundle_proposal: {
        storage_id: "test_storage_id",
        created_at: "100",
        to_height: "1",
        byte_size: "41",
        voters_abstain: [],
        to_key: "test_key",
        to_value: "invalid_test_value",
        bundle_hash:
          "9b41cc136f12b5456f073262e179d937f8f3e3702e6d57251380b50b232f3945",
      },
    } as any;

    const syncPoolStateMock = jest.fn();
    const shouldIdleMock = jest.fn().mockReturnValue(false);
    const loadBundleMock = jest.fn().mockResolvedValue({
      bundle: [{ key: "test_key", value: "test_value" }],
      toKey: "test_key",
      toValue: "test_value",
    });

    core["syncPoolState"] = syncPoolStateMock;
    core["shouldIdle"] = shouldIdleMock;
    core["loadBundle"] = loadBundleMock;

    // ACT
    await validateBundleProposal.call(core, 101);

    // ASSERT
    expect(voteProposalMock).toHaveBeenCalledTimes(1);
    expect(voteProposalMock).toHaveBeenNthCalledWith(1, {
      id: "0",
      storage_id: "test_storage_id",
      vote: 2,
    });
  });

  test("validateBundleProposal: local bundle is different", async () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      current_height: "0",
      bundle_proposal: {
        storage_id: "test_storage_id",
        created_at: "100",
        to_height: "1",
        byte_size: "41",
        voters_abstain: [],
        to_key: "test_key",
        to_value: "test_value",
        bundle_hash:
          "9b41cc136f12b5456f073262e179d937f8f3e3702e6d57251380b50b232f3945",
      },
    } as any;

    const syncPoolStateMock = jest.fn();
    const shouldIdleMock = jest.fn().mockReturnValue(false);
    const loadBundleMock = jest.fn().mockResolvedValue({
      bundle: [{ key: "test_key", value: "invalid_test_value" }],
      toKey: "test_key",
      toValue: "test_value",
    });

    core["syncPoolState"] = syncPoolStateMock;
    core["shouldIdle"] = shouldIdleMock;
    core["loadBundle"] = loadBundleMock;

    // ACT
    await validateBundleProposal.call(core, 101);

    // ASSERT
    expect(voteProposalMock).toHaveBeenCalledTimes(1);
    expect(voteProposalMock).toHaveBeenNthCalledWith(1, {
      id: "0",
      storage_id: "test_storage_id",
      vote: 2,
    });
  });

  test("validateBundleProposal: local bundle could not be loaded the first time", async () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      current_height: "0",
      bundle_proposal: {
        storage_id: "test_storage_id",
        created_at: "100",
        to_height: "1",
        byte_size: "41",
        voters_abstain: [],
        to_key: "test_key",
        to_value: "test_value",
        bundle_hash:
          "9b41cc136f12b5456f073262e179d937f8f3e3702e6d57251380b50b232f3945",
      },
    } as any;

    const syncPoolStateMock = jest.fn();
    const shouldIdleMock = jest.fn().mockReturnValue(false);
    const loadBundleMock = jest
      .fn()
      .mockResolvedValueOnce({
        bundle: [],
        toKey: "",
        toValue: "",
      })
      .mockResolvedValue({
        bundle: [{ key: "test_key", value: "test_value" }],
        toKey: "test_key",
        toValue: "test_value",
      });

    core["syncPoolState"] = syncPoolStateMock;
    core["shouldIdle"] = shouldIdleMock;
    core["loadBundle"] = loadBundleMock;

    // ACT
    await validateBundleProposal.call(core, 101);

    // ASSERT
    expect(voteProposalMock).toHaveBeenCalledTimes(2);
    expect(voteProposalMock).toHaveBeenNthCalledWith(1, {
      id: "0",
      storage_id: "test_storage_id",
      vote: 3,
    });
    expect(voteProposalMock).toHaveBeenNthCalledWith(2, {
      id: "0",
      storage_id: "test_storage_id",
      vote: 1,
    });
  });

  test("validateBundleProposal: bundle from storage provider could not be loaded the first time", async () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      current_height: "0",
      bundle_proposal: {
        storage_id: "test_storage_id",
        created_at: "100",
        to_height: "1",
        byte_size: "41",
        voters_abstain: [],
        to_key: "test_key",
        to_value: "test_value",
        bundle_hash:
          "9b41cc136f12b5456f073262e179d937f8f3e3702e6d57251380b50b232f3945",
      },
    } as any;

    retrieveBundleMock
      .mockRejectedValueOnce(new Error("Invalid Network Request"))
      .mockResolvedValue(
        Buffer.from(JSON.stringify([{ key: "test_key", value: "test_value" }]))
      );

    const syncPoolStateMock = jest.fn();
    const shouldIdleMock = jest.fn().mockReturnValue(false);
    const loadBundleMock = jest.fn().mockResolvedValue({
      bundle: [{ key: "test_key", value: "test_value" }],
      toKey: "test_key",
      toValue: "test_value",
    });

    core["syncPoolState"] = syncPoolStateMock;
    core["shouldIdle"] = shouldIdleMock;
    core["loadBundle"] = loadBundleMock;

    // ACT
    await validateBundleProposal.call(core, 101);

    // ASSERT
    expect(voteProposalMock).toHaveBeenCalledTimes(2);
    expect(voteProposalMock).toHaveBeenNthCalledWith(1, {
      id: "0",
      storage_id: "test_storage_id",
      vote: 3,
    });
    expect(voteProposalMock).toHaveBeenNthCalledWith(2, {
      id: "0",
      storage_id: "test_storage_id",
      vote: 1,
    });
  });
});
