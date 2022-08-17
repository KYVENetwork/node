import { Logger } from "tslog";
import { Pool } from "../../proto/dist/proto/kyve/registry/v1beta1/registry";
import { Node } from "../src/index";
import { TestRuntime } from "./mocks/integration";
import {
  validateRuntime,
  validateVersion,
  validateActiveNode,
} from "../src/methods/validate";
import { TestStorageProvider } from "./mocks/storageProvider";
import { TestCompression } from "./mocks/compression";

describe("src/methods/validate.ts", () => {
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
  });

  test("validateRuntime: validate node runtime with valid one", () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      runtime: "TestRuntime",
    } as Pool;

    // ACT
    validateRuntime.call(core);

    // ASSERT
    expect(processExit).not.toHaveBeenCalled();
  });

  test("validateRuntime: validate node runtime with invalid one", () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      runtime: "TestRuntimeWrong",
    } as Pool;

    // ACT
    validateRuntime.call(core);

    // ASSERT
    expect(loggerError).toHaveBeenCalledTimes(2);
    expect(loggerError).toHaveBeenNthCalledWith(
      1,
      `Specified pool does not match the integration runtime! Exiting ...`
    );
    expect(loggerError).toHaveBeenNthCalledWith(
      2,
      `Found = ${core["runtime"].name} required = ${core.pool.runtime}`
    );

    expect(processExit).toHaveBeenCalledTimes(1);
    expect(processExit).toHaveBeenLastCalledWith(1);
  });

  test("validateVersion: validate node version with valid one", () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      protocol: {
        version: "0.0.0",
      },
    } as Pool;

    // ACT
    validateVersion.call(core);

    // ASSERT
    expect(processExit).not.toHaveBeenCalled();
  });

  test("validateVersion: validate node version with invalid one", () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      protocol: {
        version: "0.0.1",
      },
    } as Pool;

    // ACT
    validateVersion.call(core);

    // ASSERT
    expect(loggerError).toHaveBeenCalledTimes(2);
    expect(loggerError).toHaveBeenNthCalledWith(
      1,
      `Running an invalid version. Exiting ...`
    );
    expect(loggerError).toHaveBeenNthCalledWith(
      2,
      `Found Runtime version = ${core["runtime"].version} required = ${
        core.pool.protocol!.version
      }`
    );

    expect(processExit).toHaveBeenCalledTimes(1);
    expect(processExit).toHaveBeenLastCalledWith(1);
  });

  test("validateActiveNode: validate node stake with valid staker address", () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      stakers: ["kyve1jq304cthpx0lwhpqzrdjrcza559ukyy3zsl2vd"],
    } as Pool;

    core["staker"] = "kyve1jq304cthpx0lwhpqzrdjrcza559ukyy3zsl2vd";

    // ACT
    validateActiveNode.call(core);

    // ASSERT
    expect(processExit).not.toHaveBeenCalled();
  });

  test("validateActiveNode: validate node stake with invalid staker address", () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      stakers: ["kyve1jq304cthpx0lwhpqzrdjrcza559ukyy3zsl2vd"],
    } as Pool;

    core["staker"] = "kyve1hvg7zsnrj6h29q9ss577mhrxa04rn94h7zjugq";

    // ACT
    validateActiveNode.call(core);

    // ASSERT
    expect(loggerError).toHaveBeenCalledTimes(1);
    expect(loggerError).toHaveBeenNthCalledWith(
      1,
      `Node is not in the active validator set! Exiting ...`
    );

    expect(processExit).toHaveBeenCalledTimes(1);
    expect(processExit).toHaveBeenLastCalledWith(1);
  });
});