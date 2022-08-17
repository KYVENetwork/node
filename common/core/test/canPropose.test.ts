import { Logger } from "tslog";
import { Pool } from "../../proto/dist/proto/kyve/registry/v1beta1/registry";
import { Node } from "../src/index";
import { TestRuntime } from "./mocks/integration";
import { canPropose } from "../src/methods/canPropose";
import { TestStorageProvider } from "./mocks/storageProvider";
import { TestCompression } from "./mocks/compression";

describe("src/methods/canPropose.ts", () => {
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
    core["client"] = {
      account: {
        address: "test_uploader",
        algo: "ed25519",
        pubkey: new Uint8Array(),
      },
    } as any;
  });

  test("canPropose: node is not next uploader", async () => {
    // ARRANGE
    const canProposeMock = jest.fn().mockResolvedValue({
      possible: true,
      reason: "",
    });

    core.query = {
      kyve: {
        registry: {
          v1beta1: {
            canPropose: canProposeMock,
          },
        },
      },
    } as any;

    core.pool = {
      current_height: "100",
      bundle_proposal: {
        next_uploader: "another_test_uploader",
        to_height: "200",
      },
    } as Pool;

    // ACT
    const res = await canPropose.call(core);

    // ASSERT
    expect(canProposeMock).not.toHaveBeenCalled();

    expect(setTimeoutMock).not.toHaveBeenCalled();

    expect(res).toBeFalsy();
  });

  test("canPropose: canPropose returns false", async () => {
    // ARRANGE
    const canProposeMock = jest.fn().mockResolvedValue({
      possible: false,
      reason: "test_reaseon",
    });

    core.query = {
      kyve: {
        registry: {
          v1beta1: {
            canPropose: canProposeMock,
          },
        },
      },
    } as any;

    core.pool = {
      current_height: "100",
      bundle_proposal: {
        next_uploader: "test_uploader",
        to_height: "200",
      },
    } as Pool;

    // ACT
    const res = await canPropose.call(core);

    // ASSERT
    expect(canProposeMock).toHaveBeenLastCalledWith({
      pool_id: "0",
      proposer: "test_uploader",
      from_height: "200",
    });

    expect(setTimeoutMock).not.toHaveBeenCalled();

    expect(res).toBeFalsy();
  });

  test("canPropose: canPropose has no surpassed upload interval", async () => {
    // ARRANGE
    const canProposeMock = jest
      .fn()
      .mockResolvedValueOnce({
        possible: false,
        reason: "Upload interval not surpassed",
      })
      .mockResolvedValueOnce({
        possible: false,
        reason: "Upload interval not surpassed",
      })
      .mockResolvedValue({
        possible: true,
        reason: "",
      });

    core.query = {
      kyve: {
        registry: {
          v1beta1: {
            canPropose: canProposeMock,
          },
        },
      },
    } as any;

    core.pool = {
      current_height: "100",
      bundle_proposal: {
        next_uploader: "test_uploader",
        to_height: "200",
      },
    } as Pool;

    // ACT
    const res = await canPropose.call(core);

    // ASSERT
    expect(canProposeMock).toHaveBeenLastCalledWith({
      pool_id: "0",
      proposer: "test_uploader",
      from_height: "200",
    });

    expect(setTimeoutMock).toHaveBeenCalledTimes(2);
    expect(setTimeoutMock).toHaveBeenNthCalledWith(
      1,
      expect.any(Function),
      1000
    );
    expect(setTimeoutMock).toHaveBeenNthCalledWith(
      2,
      expect.any(Function),
      1000
    );

    expect(res).toBeTruthy();
  });

  test("canPropose: canPropose returns error", async () => {
    // ARRANGE
    const error = new Error("Failed Network Request");

    const canProposeMock = jest.fn().mockRejectedValue(error);

    core.query = {
      kyve: {
        registry: {
          v1beta1: {
            canPropose: canProposeMock,
          },
        },
      },
    } as any;

    core.pool = {
      current_height: "100",
      bundle_proposal: {
        next_uploader: "test_uploader",
        to_height: "200",
      },
    } as Pool;

    // ACT
    const res = await canPropose.call(core);

    // ASSERT
    expect(canProposeMock).toHaveBeenLastCalledWith({
      pool_id: "0",
      proposer: "test_uploader",
      from_height: "200",
    });

    expect(setTimeoutMock).not.toHaveBeenCalled();

    expect(res).toBeFalsy();

    expect(loggerDebug).toHaveBeenLastCalledWith(error);
  });

  test("canPropose: canPropose returns true", async () => {
    // ARRANGE
    const canProposeMock = jest.fn().mockResolvedValue({
      possible: true,
      reason: "",
    });

    core.query = {
      kyve: {
        registry: {
          v1beta1: {
            canPropose: canProposeMock,
          },
        },
      },
    } as any;

    core.pool = {
      current_height: "100",
      bundle_proposal: {
        next_uploader: "test_uploader",
        to_height: "200",
      },
    } as Pool;

    // ACT
    const res = await canPropose.call(core);

    // ASSERT
    expect(canProposeMock).toHaveBeenLastCalledWith({
      pool_id: "0",
      proposer: "test_uploader",
      from_height: "200",
    });

    expect(setTimeoutMock).not.toHaveBeenCalled();

    expect(res).toBeTruthy();
  });

  test("canPropose: canPropose returns true and last bundle was dropped", async () => {
    // ARRANGE
    const canProposeMock = jest.fn().mockResolvedValue({
      possible: true,
      reason: "",
    });

    core.query = {
      kyve: {
        registry: {
          v1beta1: {
            canPropose: canProposeMock,
          },
        },
      },
    } as any;

    core.pool = {
      current_height: "100",
      bundle_proposal: {
        next_uploader: "test_uploader",
        to_height: "",
      },
    } as Pool;

    // ACT
    const res = await canPropose.call(core);

    // ASSERT
    expect(canProposeMock).toHaveBeenLastCalledWith({
      pool_id: "0",
      proposer: "test_uploader",
      from_height: "100",
    });

    expect(setTimeoutMock).not.toHaveBeenCalled();

    expect(res).toBeTruthy();
  });
});
