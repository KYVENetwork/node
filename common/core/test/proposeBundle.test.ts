import { Logger } from "tslog";
import { Node } from "../src/index";
import { TestRuntime } from "./mocks/integration";
import { proposeBundle } from "../src/methods/proposeBundle";
import { TestStorageProvider, saveBundleMock } from "./mocks/storageProvider";
import { TestCompression, compressMock } from "./mocks/compression";

describe("src/methods/proposeBundle.ts", () => {
  let core: Node;

  let loggerInfo: jest.Mock;
  let loggerDebug: jest.Mock;
  let loggerWarn: jest.Mock;
  let loggerError: jest.Mock;

  let processExit: jest.Mock<never, never>;
  let setTimeoutMock: jest.Mock;
  let dateNowMock: jest.Mock;

  let executeMock: jest.Mock;
  let submitBundleProposalMock: jest.Mock;

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

    // mock dateNow
    dateNowMock = jest.fn().mockReturnValue(1660808497000);
    Date.now = dateNowMock;

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

    submitBundleProposalMock = jest.fn().mockResolvedValue({
      txHash: "test_hash",
      execute: executeMock,
    });

    core.client = {
      kyve: {
        v1beta1: {
          base: {
            submitBundleProposal: submitBundleProposalMock,
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
    saveBundleMock.mockClear();
    compressMock.mockClear();
  });

  test("proposeBundle: new bundle was created in the meantime", async () => {
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
    await proposeBundle.call(core, 99);

    // ASSERT
    expect(syncPoolStateMock).toHaveBeenCalledTimes(1);

    expect(compressMock).not.toHaveBeenCalled();
    expect(saveBundleMock).not.toHaveBeenCalled();
    expect(submitBundleProposalMock).not.toHaveBeenCalled();
  });

  test("proposeBundle: bundle was dropped", async () => {
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
    await proposeBundle.call(core, 101);

    // ASSERT
    expect(syncPoolStateMock).toHaveBeenCalledTimes(1);
    expect(shouldIdleMock).toHaveBeenCalledTimes(1);

    expect(compressMock).not.toHaveBeenCalled();
    expect(saveBundleMock).not.toHaveBeenCalled();
    expect(submitBundleProposalMock).not.toHaveBeenCalled();
  });

  test("proposeBundle: bundle could not be loaded", async () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      current_height: "200",
      current_key: "200",
      max_bundle_size: "10",
      bundle_proposal: {
        storage_id: "test_storage_id",
        created_at: "100",
        to_height: "210",
        to_key: "210",
        voters_abstain: [],
      },
    } as any;

    const syncPoolStateMock = jest.fn();
    const shouldIdleMock = jest.fn().mockReturnValue(false);
    const loadBundleMock = jest.fn().mockResolvedValue({
      bundle: [],
      toKey: "",
      toValue: "",
    });

    core["syncPoolState"] = syncPoolStateMock;
    core["shouldIdle"] = shouldIdleMock;
    core["loadBundle"] = loadBundleMock;

    // ACT
    await proposeBundle.call(core, 101);

    // ASSERT
    expect(loadBundleMock).toHaveBeenCalledTimes(1);
    expect(loadBundleMock).toHaveBeenLastCalledWith(210, 220);

    expect(compressMock).not.toHaveBeenCalled();

    expect(saveBundleMock).not.toHaveBeenCalled();

    expect(submitBundleProposalMock).toHaveBeenCalledTimes(1);
    expect(submitBundleProposalMock).toHaveBeenLastCalledWith({
      id: "0",
      storage_id: `KYVE_NO_DATA_BUNDLE_${core["poolId"]}_${Math.floor(
        Date.now() / 1000
      )}`,
      byte_size: "0",
      from_height: core.pool.bundle_proposal!.to_height,
      to_height: core.pool.bundle_proposal!.to_height,
      from_key: core.pool.bundle_proposal!.to_key,
      to_key: "",
      to_value: "",
      bundle_hash: "",
    });
  });

  test("proposeBundle: bundle could be loaded with two data items", async () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      current_height: "200",
      current_key: "200",
      max_bundle_size: "10",
      bundle_proposal: {
        storage_id: "test_storage_id",
        created_at: "100",
        to_height: "210",
        to_key: "210",
        voters_abstain: [],
      },
    } as any;

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

    const syncPoolStateMock = jest.fn();
    const shouldIdleMock = jest.fn().mockReturnValue(false);
    const loadBundleMock = jest.fn().mockResolvedValue({
      bundle,
      toKey: "test_key_2",
      toValue: "test_value_2",
    });

    core["syncPoolState"] = syncPoolStateMock;
    core["shouldIdle"] = shouldIdleMock;
    core["loadBundle"] = loadBundleMock;

    // ACT
    await proposeBundle.call(core, 101);

    // ASSERT
    expect(loadBundleMock).toHaveBeenCalledTimes(1);
    expect(loadBundleMock).toHaveBeenLastCalledWith(210, 220);

    expect(compressMock).toHaveBeenCalledTimes(1);
    expect(compressMock).toHaveBeenLastCalledWith(bundle);

    const tags: [string, string][] = [
      ["Application", "KYVE"],
      ["Network", core["network"]],
      ["Pool", core["poolId"].toString()],
      ["@kyve/core", core["coreVersion"]],
      [core["runtime"].name, core["runtime"].version],
      ["Uploader", core["client"].account.address],
      ["FromHeight", core.pool.bundle_proposal!.to_height],
      ["ToHeight", "212"],
      ["Size", "2"],
      ["FromKey", core.pool.bundle_proposal!.to_key],
      ["ToKey", "test_key_2"],
      ["Value", "test_value_2"],
    ];

    expect(saveBundleMock).toHaveBeenCalledTimes(1);
    expect(saveBundleMock).toHaveBeenLastCalledWith(
      Buffer.from(JSON.stringify(bundle)),
      tags
    );

    expect(submitBundleProposalMock).toHaveBeenCalledTimes(1);
    expect(submitBundleProposalMock).toHaveBeenLastCalledWith({
      id: "0",
      storage_id: "test_storage_id",
      byte_size: "89",
      from_height: core.pool.bundle_proposal!.to_height,
      to_height: "212",
      from_key: core.pool.bundle_proposal!.to_key,
      to_key: "test_key_2",
      to_value: "test_value_2",
      bundle_hash:
        "85a7592f8b7410bdc352b5d018be3bda819c97649448b0456f7092cdfa4c9f7a",
    });
  });
});
