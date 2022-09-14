import { Logger } from "tslog";
import { Node } from "../src/index";
import { TestRuntime, validateMock } from "./mocks/integration";
import { runNode } from "../src/methods/runNode";
import {
  TestStorageProvider,
  retrieveBundleMock,
} from "./mocks/storageProvider";
import { TestCompression, decompressMock } from "./mocks/compression";
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
    claimUploaderRoleMock.mockClear();
    voteBundleProposalMock.mockClear();
    submitBundleProposalMock.mockClear();

    canVoteMock.mockClear();
    canProposeMock.mockClear();

    retrieveBundleMock.mockClear();
    decompressMock.mockClear();
    validateMock.mockClear();
  });

  test("test proposal cycle", async () => {
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

    const waitForNextBundleProposalMock = jest.fn();
    core["waitForNextBundleProposal"] = waitForNextBundleProposalMock;

    core["continueBundleProposalRound"] = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValue(false);

    // ACT
    await runNode.call(core);

    // ASSERT

    // TODO: assert interfaces with storage providers and so on
    // TODO: assert timeouts

    // assert that claimUploaderRole has been claimed
    expect(claimUploaderRoleMock).toHaveBeenCalledTimes(1);
    expect(claimUploaderRoleMock).toHaveBeenLastCalledWith({
      staker: "test_staker_0",
      pool_id: "0",
    });

    // assert that canVote was not called
    expect(canVoteMock).toHaveBeenCalledTimes(0);

    // assert that voteBundleProposal was not called
    expect(voteBundleProposalMock).toHaveBeenCalledTimes(0);

    // assert that canPropose should have been called
    expect(canProposeMock).toHaveBeenCalledTimes(1);
    expect(canProposeMock).toHaveBeenLastCalledWith({
      staker: "test_staker_0",
      pool_id: "0",
      proposer: "test_valaddress_0",
      from_height: "0",
    });

    // assert that skipUploaderrole should have been called
    expect(skipUploaderRoleMock).toHaveBeenCalledTimes(1);
    expect(skipUploaderRoleMock).toHaveBeenLastCalledWith({
      staker: "test_staker_0",
      pool_id: "0",
      from_height: "0",
    });

    // assert that only one round ran
    expect(waitForNextBundleProposalMock).toHaveBeenCalledTimes(1);
  });
});
