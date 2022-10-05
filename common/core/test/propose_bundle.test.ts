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
import { setupMetrics } from "../src/methods";
import { register } from "prom-client";
import { TestCache } from "./mocks/cache";

/*

TEST CASES - propose bundle tests

* propose bundle with data
* propose bundle with no data

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
    formatValueMock.mockClear();
    validateMock.mockClear();

    // reset prometheus
    register.clear();
  });

  test("propose genesis bundle with valid data bundle", async () => {
    // ARRANGE
    const syncPoolStateMock = jest.fn().mockImplementation(() => {
      core.pool = {
        ...base_pool,
        bundle_proposal: {
          ...base_pool.bundle_proposal,
          storage_id: "another_test_storage_id",
          uploader: "test_staker",
          next_uploader: "test_staker",
          byte_size: "123456789",
          to_height: "2",
          to_key: "previous_test_key",
          to_value: "previous_test_value",
          bundle_hash: "previous_test_bundle_hash",
          created_at: "0",
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

    const loadBundleMock = jest.fn().mockResolvedValue({
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

    // assert that only one round ran
    expect(waitForNextBundleProposalMock).toHaveBeenCalledTimes(1);

    // TODO: assert timeouts
  });
});
