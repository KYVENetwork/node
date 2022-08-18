import { Logger } from "tslog";
import { Node } from "../src/index";
import { TestRuntime, validateMock } from "./mocks/integration";
import { validateBundleProposal } from "../src/methods/validateBundleProposal";
import {
  TestStorageProvider,
  retrieveBundleMock,
} from "./mocks/storageProvider";
import { TestCompression, decompressMock } from "./mocks/compression";
import { PoolResponse } from "@kyve/proto/dist/proto/kyve/query/v1beta1/responses";

describe("src/methods/validateBundleProposal.ts", () => {
  let core: Node;

  let loggerInfo: jest.Mock;
  let loggerDebug: jest.Mock;
  let loggerWarn: jest.Mock;
  let loggerError: jest.Mock;

  let processExit: jest.Mock<never, never>;
  let setTimeoutMock: jest.Mock;

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

  afterEach(() => {
    retrieveBundleMock.mockClear();
    decompressMock.mockClear();
    validateMock.mockClear();
  });

  test("validateBundleProposal: new bundle was created in the meantime", async () => {
    // ARRANGE
    core.pool = {
      data: {
        name: "Moontest",
        current_height: "0",
      },
      bundle_proposal: {
        storage_id: "test_storage_id",
        created_at: "100",
        to_height: "100",
        voters_abstain: [],
      },
    } as PoolResponse;

    const syncPoolStateMock = jest.fn();

    core["syncPoolState"] = syncPoolStateMock;

    // ACT
    await validateBundleProposal.call(core, 99);

    // ASSERT
    expect(syncPoolStateMock).toHaveBeenCalledTimes(1);

    expect(validateMock).not.toHaveBeenCalled();
    expect(decompressMock).not.toHaveBeenCalled();
    expect(retrieveBundleMock).not.toHaveBeenCalled();
  });

  test("validateBundleProposal: bundle was dropped", async () => {
    // ARRANGE
    core.pool = {
      data: {
        name: "Moontest",
        current_height: "0",
      },
      bundle_proposal: {
        storage_id: "test_storage_id",
        created_at: "100",
        to_height: "100",
        voters_abstain: [],
      },
    } as PoolResponse;

    const syncPoolStateMock = jest.fn();
    const shouldIdleMock = jest.fn().mockReturnValue(true);

    core["syncPoolState"] = syncPoolStateMock;
    core["shouldIdle"] = shouldIdleMock;

    // ACT
    await validateBundleProposal.call(core, 101);

    // ASSERT
    expect(syncPoolStateMock).toHaveBeenCalledTimes(1);
    expect(shouldIdleMock).toHaveBeenCalledTimes(1);

    expect(retrieveBundleMock).not.toHaveBeenCalled();
    expect(decompressMock).not.toHaveBeenCalled();
    expect(validateMock).not.toHaveBeenCalled();
  });

  test("validateBundleProposal: bundle is valid", async () => {
    // ARRANGE
    core.pool = {
      data: {
        name: "Moontest",
        current_height: "0",
      },
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
    } as PoolResponse;

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
    expect(retrieveBundleMock).toHaveBeenCalledTimes(1);
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(1, "test_storage_id");

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenNthCalledWith(
      1,
      Buffer.from(JSON.stringify([{ key: "test_key", value: "test_value" }]))
    );

    expect(validateMock).toHaveBeenCalledTimes(1);
    expect(validateMock).toHaveBeenNthCalledWith(
      1,
      core,
      [{ key: "test_key", value: "test_value" }],
      [{ key: "test_key", value: "test_value" }]
    );

    expect(voteProposalMock).toHaveBeenCalledTimes(1);
    expect(voteProposalMock).toHaveBeenNthCalledWith(1, {
      id: "0",
      storage_id: "test_storage_id",
      vote: 1,
    });
  });

  test("validateBundleProposal: proposed invalid bundle", async () => {
    // ARRANGE
    core.pool = {
      data: {
        name: "Moontest",
        current_height: "0",
      },
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
    } as PoolResponse;

    retrieveBundleMock.mockResolvedValueOnce(
      Buffer.from(
        JSON.stringify([{ key: "test_key", value: "invalid_test_value" }])
      )
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
    expect(retrieveBundleMock).toHaveBeenCalledTimes(1);
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(1, "test_storage_id");

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenNthCalledWith(
      1,
      Buffer.from(
        JSON.stringify([{ key: "test_key", value: "invalid_test_value" }])
      )
    );

    expect(validateMock).not.toHaveBeenCalled();

    expect(voteProposalMock).toHaveBeenCalledTimes(1);
    expect(voteProposalMock).toHaveBeenNthCalledWith(1, {
      id: "0",
      storage_id: "test_storage_id",
      vote: 2,
    });
  });

  test("validateBundleProposal: proposed invalid hash", async () => {
    // ARRANGE
    core.pool = {
      data: {
        name: "Moontest",
        current_height: "0",
      },
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
    } as PoolResponse;

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
    expect(retrieveBundleMock).toHaveBeenCalledTimes(1);
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(1, "test_storage_id");

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenNthCalledWith(
      1,
      Buffer.from(JSON.stringify([{ key: "test_key", value: "test_value" }]))
    );

    expect(validateMock).not.toHaveBeenCalled();

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
      data: {
        name: "Moontest",
        current_height: "0",
      },
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
    } as PoolResponse;

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
    expect(retrieveBundleMock).toHaveBeenCalledTimes(1);
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(1, "test_storage_id");

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenNthCalledWith(
      1,
      Buffer.from(JSON.stringify([{ key: "test_key", value: "test_value" }]))
    );

    expect(validateMock).not.toHaveBeenCalled();

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
      data: {
        name: "Moontest",
        current_height: "0",
      },
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
    } as PoolResponse;

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
    expect(retrieveBundleMock).toHaveBeenCalledTimes(1);
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(1, "test_storage_id");

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenNthCalledWith(
      1,
      Buffer.from(JSON.stringify([{ key: "test_key", value: "test_value" }]))
    );

    expect(validateMock).not.toHaveBeenCalled();

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
      data: {
        name: "Moontest",
        current_height: "0",
      },
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
    } as PoolResponse;

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
    expect(retrieveBundleMock).toHaveBeenCalledTimes(1);
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(1, "test_storage_id");

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenNthCalledWith(
      1,
      Buffer.from(JSON.stringify([{ key: "test_key", value: "test_value" }]))
    );

    expect(validateMock).not.toHaveBeenCalled();

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
      data: {
        name: "Moontest",
        current_height: "0",
      },
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
    } as PoolResponse;

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
    expect(retrieveBundleMock).toHaveBeenCalledTimes(1);
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(1, "test_storage_id");

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenNthCalledWith(
      1,
      Buffer.from(JSON.stringify([{ key: "test_key", value: "test_value" }]))
    );

    expect(validateMock).toHaveBeenCalledTimes(1);
    expect(validateMock).toHaveBeenNthCalledWith(
      1,
      core,
      [{ key: "test_key", value: "test_value" }],
      [{ key: "test_key", value: "invalid_test_value" }]
    );

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
      data: {
        name: "Moontest",
        current_height: "0",
      },
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
    } as PoolResponse;

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
    expect(setTimeoutMock).toHaveBeenCalledTimes(1);
    expect(setTimeoutMock).toHaveBeenLastCalledWith(
      expect.any(Function),
      10 * 1000
    );

    expect(retrieveBundleMock).toHaveBeenCalledTimes(1);
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(1, "test_storage_id");

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenNthCalledWith(
      1,
      Buffer.from(JSON.stringify([{ key: "test_key", value: "test_value" }]))
    );

    expect(validateMock).toHaveBeenCalledTimes(1);
    expect(validateMock).toHaveBeenNthCalledWith(
      1,
      core,
      [{ key: "test_key", value: "test_value" }],
      [{ key: "test_key", value: "test_value" }]
    );

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

  test("validateBundleProposal: local bundle could not be loaded multiple times", async () => {
    // ARRANGE
    core.pool = {
      data: {
        name: "Moontest",
        current_height: "0",
      },
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
    } as PoolResponse;

    const syncPoolStateMock = jest.fn();
    const shouldIdleMock = jest.fn().mockReturnValue(false);
    const loadBundleMock = jest
      .fn()
      .mockResolvedValueOnce({
        bundle: [],
        toKey: "",
        toValue: "",
      })
      .mockResolvedValueOnce({
        bundle: [],
        toKey: "",
        toValue: "",
      })
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
    expect(setTimeoutMock).toHaveBeenCalledTimes(3);
    expect(setTimeoutMock).toHaveBeenNthCalledWith(
      1,
      expect.any(Function),
      10 * 1000
    );
    expect(setTimeoutMock).toHaveBeenNthCalledWith(
      2,
      expect.any(Function),
      10 * 1000
    );
    expect(setTimeoutMock).toHaveBeenNthCalledWith(
      3,
      expect.any(Function),
      10 * 1000
    );

    expect(retrieveBundleMock).toHaveBeenCalledTimes(1);
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(1, "test_storage_id");

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenNthCalledWith(
      1,
      Buffer.from(JSON.stringify([{ key: "test_key", value: "test_value" }]))
    );

    expect(validateMock).toHaveBeenCalledTimes(1);
    expect(validateMock).toHaveBeenNthCalledWith(
      1,
      core,
      [{ key: "test_key", value: "test_value" }],
      [{ key: "test_key", value: "test_value" }]
    );

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
      data: {
        name: "Moontest",
        current_height: "0",
      },
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
    } as PoolResponse;

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
    expect(setTimeoutMock).toHaveBeenCalledTimes(1);
    expect(setTimeoutMock).toHaveBeenLastCalledWith(
      expect.any(Function),
      10 * 1000
    );

    expect(retrieveBundleMock).toHaveBeenCalledTimes(2);
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(1, "test_storage_id");
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(2, "test_storage_id");

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenNthCalledWith(
      1,
      Buffer.from(JSON.stringify([{ key: "test_key", value: "test_value" }]))
    );

    expect(validateMock).toHaveBeenCalledTimes(1);
    expect(validateMock).toHaveBeenNthCalledWith(
      1,
      core,
      [{ key: "test_key", value: "test_value" }],
      [{ key: "test_key", value: "test_value" }]
    );

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

  test("validateBundleProposal: bundle from storage provider could not be loaded multiple times", async () => {
    // ARRANGE
    core.pool = {
      data: {
        name: "Moontest",
        current_height: "0",
      },
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
    } as PoolResponse;

    retrieveBundleMock
      .mockRejectedValueOnce(new Error("Invalid Network Request"))
      .mockRejectedValueOnce(new Error("Invalid Network Request"))
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
    expect(setTimeoutMock).toHaveBeenCalledTimes(3);
    expect(setTimeoutMock).toHaveBeenNthCalledWith(
      1,
      expect.any(Function),
      10 * 1000
    );
    expect(setTimeoutMock).toHaveBeenNthCalledWith(
      2,
      expect.any(Function),
      10 * 1000
    );
    expect(setTimeoutMock).toHaveBeenNthCalledWith(
      3,
      expect.any(Function),
      10 * 1000
    );

    expect(retrieveBundleMock).toHaveBeenCalledTimes(4);
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(1, "test_storage_id");
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(2, "test_storage_id");
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(3, "test_storage_id");
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(4, "test_storage_id");

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenNthCalledWith(
      1,
      Buffer.from(JSON.stringify([{ key: "test_key", value: "test_value" }]))
    );

    expect(validateMock).toHaveBeenCalledTimes(1);
    expect(validateMock).toHaveBeenNthCalledWith(
      1,
      core,
      [{ key: "test_key", value: "test_value" }],
      [{ key: "test_key", value: "test_value" }]
    );

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

  test("validateBundleProposal: local bundle and bundle from storage provider could not be loaded", async () => {
    // ARRANGE
    core.pool = {
      data: {
        name: "Moontest",
        current_height: "0",
      },
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
    } as PoolResponse;

    retrieveBundleMock
      .mockRejectedValueOnce(new Error("Invalid Network Request"))
      .mockResolvedValue(
        Buffer.from(JSON.stringify([{ key: "test_key", value: "test_value" }]))
      );

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
    expect(setTimeoutMock).toHaveBeenCalledTimes(2);
    expect(setTimeoutMock).toHaveBeenNthCalledWith(
      1,
      expect.any(Function),
      10 * 1000
    );
    expect(setTimeoutMock).toHaveBeenNthCalledWith(
      2,
      expect.any(Function),
      10 * 1000
    );

    expect(retrieveBundleMock).toHaveBeenCalledTimes(2);
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(1, "test_storage_id");
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(2, "test_storage_id");

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenNthCalledWith(
      1,
      Buffer.from(JSON.stringify([{ key: "test_key", value: "test_value" }]))
    );

    expect(validateMock).toHaveBeenCalledTimes(1);
    expect(validateMock).toHaveBeenNthCalledWith(
      1,
      core,
      [{ key: "test_key", value: "test_value" }],
      [{ key: "test_key", value: "test_value" }]
    );

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

  test("validateBundleProposal: decompression of bundle fails", async () => {
    // ARRANGE
    core.pool = {
      data: {
        name: "Moontest",
        current_height: "0",
      },
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
    } as PoolResponse;

    decompressMock.mockRejectedValueOnce(new Error("Failed to decompress"));

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
    expect(retrieveBundleMock).toHaveBeenCalledTimes(1);
    expect(retrieveBundleMock).toHaveBeenNthCalledWith(1, "test_storage_id");

    expect(decompressMock).toHaveBeenCalledTimes(1);
    expect(decompressMock).toHaveBeenNthCalledWith(
      1,
      Buffer.from(JSON.stringify([{ key: "test_key", value: "test_value" }]))
    );

    expect(validateMock).not.toHaveBeenCalled();

    expect(voteProposalMock).toHaveBeenCalledTimes(1);
    expect(voteProposalMock).toHaveBeenNthCalledWith(1, {
      id: "0",
      storage_id: "test_storage_id",
      vote: 2,
    });
  });
});
