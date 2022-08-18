import { Logger } from "tslog";
import { Node } from "../src/index";
import { TestRuntime } from "./mocks/integration";
import { canVote } from "../src/methods/canVote";
import { TestStorageProvider } from "./mocks/storageProvider";
import { TestCompression } from "./mocks/compression";

describe("src/methods/canVote.ts", () => {
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
    core["client"] = {
      account: {
        address: "test_voter",
        algo: "ed25519",
        pubkey: new Uint8Array(),
      },
    } as any;
  });

  test("canVote: bundle is empty", async () => {
    // ARRANGE
    const canVoteMock = jest.fn().mockResolvedValue({
      possible: true,
      reason: "",
    });

    core.lcd = {
      kyve: {
        query: {
          v1beta1: {
            canVote: canVoteMock,
          },
        },
      },
    } as any;

    core.pool = {
      bundle_proposal: {
        storage_id: "test_storage_id",
        uploader: "",
      },
    } as any;

    // ACT
    const res = await canVote.call(core);

    // ASSERT
    expect(canVoteMock).not.toHaveBeenCalled();

    expect(setTimeoutMock).not.toHaveBeenCalled();

    expect(res).toBeFalsy();
  });

  test("canVote: node is uploader", async () => {
    // ARRANGE
    const canVoteMock = jest.fn().mockResolvedValue({
      possible: true,
      reason: "",
    });

    core.lcd = {
      kyve: {
        query: {
          v1beta1: {
            canVote: canVoteMock,
          },
        },
      },
    } as any;

    core.pool = {
      bundle_proposal: {
        uploader: "test_voter",
      },
    } as any;

    // ACT
    const res = await canVote.call(core);

    // ASSERT
    expect(canVoteMock).not.toHaveBeenCalled();

    expect(setTimeoutMock).not.toHaveBeenCalled();

    expect(res).toBeFalsy();
  });

  test("canVote: canVote returns false", async () => {
    // ARRANGE
    const canVoteMock = jest.fn().mockResolvedValue({
      possible: false,
      reason: "test_reaseon",
    });

    core.lcd = {
      kyve: {
        query: {
          v1beta1: {
            canVote: canVoteMock,
          },
        },
      },
    } as any;

    core.pool = {
      bundle_proposal: {
        uploader: "other_test_voter",
        storage_id: "test_storage_id",
      },
    } as any;

    // ACT
    const res = await canVote.call(core);

    // ASSERT
    expect(canVoteMock).toHaveBeenLastCalledWith({
      pool_id: "0",
      staker: "test_staker",
      voter: "test_voter",
      storage_id: "test_storage_id",
    });

    expect(setTimeoutMock).not.toHaveBeenCalled();

    expect(res).toBeFalsy();
  });

  test("canVote: canVote returns error", async () => {
    // ARRANGE
    const error = new Error("Failed Network Request");
    const canVoteMock = jest.fn().mockRejectedValue(error);

    core.lcd = {
      kyve: {
        query: {
          v1beta1: {
            canVote: canVoteMock,
          },
        },
      },
    } as any;

    core.pool = {
      bundle_proposal: {
        uploader: "other_test_voter",
        storage_id: "test_storage_id",
      },
    } as any;

    // ACT
    const res = await canVote.call(core);

    // ASSERT
    expect(canVoteMock).toHaveBeenLastCalledWith({
      pool_id: "0",
      staker: "test_staker",
      voter: "test_voter",
      storage_id: "test_storage_id",
    });

    expect(setTimeoutMock).not.toHaveBeenCalled();

    expect(res).toBeFalsy();

    expect(loggerDebug).toHaveBeenLastCalledWith(error);
  });

  test("canVote: canVote returns true", async () => {
    // ARRANGE
    const canVoteMock = jest.fn().mockResolvedValue({
      possible: true,
      reason: "",
    });

    core.lcd = {
      kyve: {
        query: {
          v1beta1: {
            canVote: canVoteMock,
          },
        },
      },
    } as any;

    core.pool = {
      bundle_proposal: {
        uploader: "other_test_voter",
        storage_id: "test_storage_id",
      },
    } as any;

    // ACT
    const res = await canVote.call(core);

    // ASSERT
    expect(canVoteMock).toHaveBeenLastCalledWith({
      pool_id: "0",
      staker: "test_staker",
      voter: "test_voter",
      storage_id: "test_storage_id",
    });

    expect(setTimeoutMock).not.toHaveBeenCalled();

    expect(res).toBeTruthy();
  });
});
