import { DataItem, Node, sha256 } from "../../src";

export const TestRuntime = jest.fn().mockImplementation(() => {
  return {
    name: "@kyve/evm",
    version: "0.0.0",
    getDataItemByKey: jest.fn().mockImplementation((core: Node, key: string) =>
      Promise.resolve({
        key,
        value: `${key}-value`,
      })
    ),
    validateBundle: jest
      .fn()
      .mockImplementation(
        (
          core: Node,
          proposedBundle: DataItem[],
          validationBundle: DataItem[]
        ) => {
          const proposedBundleHash = sha256(
            Buffer.from(JSON.stringify(proposedBundle))
          );
          const validationBundleHash = sha256(
            Buffer.from(JSON.stringify(validationBundle))
          );

          return proposedBundleHash === validationBundleHash;
        }
      ),
    nextKey: jest
      .fn()
      .mockImplementation((key: string) =>
        Promise.resolve((parseInt(key) + 1).toString())
      ),
    summarizeBundle: jest
      .fn()
      .mockImplementation((bundle: DataItem[]) =>
        Promise.resolve(JSON.stringify(bundle))
      ),
  };
});
