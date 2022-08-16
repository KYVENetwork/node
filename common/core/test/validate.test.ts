import { Logger } from "tslog";
import { Pool } from "../../proto/dist/proto/kyve/registry/v1beta1/registry";
import { Node } from "../src/index";
import { validateActiveNode } from "../src/methods/validate";

describe("src/methods/validate.ts.ts", () => {
  let core: Node;

  let loggerInfo: any;
  let loggerDebug: any;
  let loggerError: any;

  let processExit: jest.SpyInstance;

  beforeEach(() => {
    core = new Node();

    // mock process.exit
    processExit = jest
      .spyOn(process, "exit")
      .mockImplementation((code?: number) => {
        return code as never;
      });

    // mock logger
    core.logger = new Logger();

    loggerInfo = jest.fn();
    loggerDebug = jest.fn();
    loggerError = jest.fn();

    core.logger.info = loggerInfo;
    core.logger.debug = loggerDebug;
    core.logger.error = loggerError;
  });

  afterEach(() => {
    processExit.mockReset();
  });

  test("validate node stake with valid staker address", () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      stakers: ["kyve1jq304cthpx0lwhpqzrdjrcza559ukyy3zsl2vd"],
    } as Pool;

    core["staker"] = "kyve1jq304cthpx0lwhpqzrdjrcza559ukyy3zsl2vd";

    // ACT
    validateActiveNode.call(core);

    // ASSERT
    expect(loggerInfo).toHaveBeenCalledTimes(1);
    expect(loggerInfo).toHaveBeenNthCalledWith(
      1,
      `Node running as validator on pool "${core.pool.name}"`
    );

    expect(loggerDebug).toHaveBeenCalledTimes(1);
    expect(loggerDebug).toHaveBeenNthCalledWith(
      1,
      `Successfully validated node stake\n`
    );
  });

  test("validate node stake with invalid staker address", () => {
    // ARRANGE
    core.pool = {
      name: "Moontest",
      stakers: ["kyve1jq304cthpx0lwhpqzrdjrcza559ukyy3zsl2vd"],
    } as Pool;

    core["staker"] = "kyve1hvg7zsnrj6h29q9ss577mhrxa04rn94h7zjugq";

    // ACT
    validateActiveNode.call(core);

    // ASSERT
    expect(processExit).toHaveBeenCalledTimes(1);
    expect(processExit).toHaveBeenNthCalledWith(1, 1);
  });
});
