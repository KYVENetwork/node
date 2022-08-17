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
});
