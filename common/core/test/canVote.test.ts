import { Logger } from "tslog";
import { Pool } from "../../proto/dist/proto/kyve/registry/v1beta1/registry";
import { Node } from "../src/index";
import { TestRuntime } from "./mocks/integration";
import { canVote } from "../src/methods/canVote";

describe("src/methods/canVote.ts", () => {
  let core: Node;

  let loggerInfo: jest.Mock;
  let loggerDebug: jest.Mock;
  let loggerWarn: jest.Mock;
  let loggerError: jest.Mock;

  let processExit: jest.Mock<never, never>;

  beforeEach(() => {
    core = new Node();

    core.addRuntime(new TestRuntime());

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
    core["client"] = {
      account: {
        address: "test_uploader",
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

    core.query = {
      kyve: {
        registry: {
          v1beta1: {
            canVote: canVoteMock,
          },
        },
      },
    } as any;

    core.pool = {
      bundle_proposal: {
        uploader: "",
      },
    } as Pool;

    // ACT
    const res = await canVote.call(core);

    // ASSERT
    expect(canVoteMock).not.toHaveBeenCalled();

    expect(res).toBeFalsy();

    expect(loggerInfo).toHaveBeenCalledTimes(1);
    expect(loggerInfo).toHaveBeenNthCalledWith(
      1,
      `Skipping vote. Reason: Node can not vote on empty bundle\n`
    );
  });

  test("canVote: node is uploader", async () => {
    // ARRANGE
    const canVoteMock = jest.fn().mockResolvedValue({
      possible: true,
      reason: "",
    });

    core.query = {
      kyve: {
        registry: {
          v1beta1: {
            canVote: canVoteMock,
          },
        },
      },
    } as any;

    core.pool = {
      bundle_proposal: {
        uploader: "test_uploader",
      },
    } as Pool;

    // ACT
    const res = await canVote.call(core);

    // ASSERT
    expect(canVoteMock).not.toHaveBeenCalled();

    expect(res).toBeFalsy();

    expect(loggerInfo).toHaveBeenCalledTimes(1);
    expect(loggerInfo).toHaveBeenNthCalledWith(
      1,
      `Skipping vote. Reason: Node is uploader of this bundle\n`
    );
  });

  test("canVote: node is able to vote", async () => {
    // ARRANGE
    const canVoteMock = jest.fn().mockResolvedValue({
      possible: true,
      reason: "",
    });

    core.query = {
      kyve: {
        registry: {
          v1beta1: {
            canVote: canVoteMock,
          },
        },
      },
    } as any;

    core.pool = {
      bundle_proposal: {
        uploader: "other_test_uploader",
        storage_id: "test_storage_id",
      },
    } as Pool;

    // ACT
    const res = await canVote.call(core);

    // ASSERT
    expect(canVoteMock).toHaveBeenCalledTimes(1);
    expect(canVoteMock).toHaveBeenNthCalledWith(1, {
      pool_id: "0",
      voter: "test_uploader",
      storage_id: "test_storage_id",
    });

    expect(res).toBeTruthy();

    expect(loggerInfo).toHaveBeenCalledTimes(1);
    expect(loggerInfo).toHaveBeenNthCalledWith(
      1,
      `Node is able to vote on bundle proposal\n`
    );
  });

  test("canVote: node is not able to vote", async () => {
    // ARRANGE
    const canVoteMock = jest.fn().mockResolvedValue({
      possible: false,
      reason: "test_reason",
    });

    core.query = {
      kyve: {
        registry: {
          v1beta1: {
            canVote: canVoteMock,
          },
        },
      },
    } as any;

    core.pool = {
      bundle_proposal: {
        uploader: "other_test_uploader",
        storage_id: "test_storage_id",
      },
    } as Pool;

    // ACT
    const res = await canVote.call(core);

    // ASSERT
    expect(canVoteMock).toHaveBeenCalledTimes(1);
    expect(canVoteMock).toHaveBeenNthCalledWith(1, {
      pool_id: "0",
      voter: "test_uploader",
      storage_id: "test_storage_id",
    });

    expect(res).toBeFalsy();

    expect(loggerInfo).toHaveBeenCalledTimes(1);
    expect(loggerInfo).toHaveBeenNthCalledWith(
      1,
      `Skipping vote. Reason: ${"test_reason"}\n`
    );
  });

  test("canVote: node is not able to vote", async () => {
    // ARRANGE
    const canVoteMock = jest
      .fn()
      .mockRejectedValue(new Error("Failed Network Request"));

    core.query = {
      kyve: {
        registry: {
          v1beta1: {
            canVote: canVoteMock,
          },
        },
      },
    } as any;

    core.pool = {
      bundle_proposal: {
        uploader: "other_test_uploader",
        storage_id: "test_storage_id",
      },
    } as Pool;

    // ACT
    const res = await canVote.call(core);

    // ASSERT
    expect(canVoteMock).toHaveBeenCalledTimes(1);
    expect(canVoteMock).toHaveBeenNthCalledWith(1, {
      pool_id: "0",
      voter: "test_uploader",
      storage_id: "test_storage_id",
    });

    expect(res).toBeFalsy();

    expect(loggerWarn).toHaveBeenCalledTimes(1);
    expect(loggerWarn).toHaveBeenNthCalledWith(
      1,
      ` Skipping vote. Reason: Failed to execute canVote query\n`
    );

    expect(loggerDebug).toHaveBeenCalledTimes(1);
    expect(loggerDebug).toHaveBeenNthCalledWith(
      1,
      new Error("Failed Network Request")
    );
  });
});
