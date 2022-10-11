import { DataItem, Node, sha256 } from "../../src";

export const getDataItemMockByKey = jest
  .fn()
  .mockImplementation((core: Node, key: string) =>
    Promise.resolve({
      key,
      value: `${key}-value`,
    })
  );
export const validateBundleMock = jest
  .fn()
  .mockImplementation(
    (core: Node, uploadedBundle: DataItem[], validationBundle: DataItem[]) => {
      const uploadedBundleHash = sha256(
        Buffer.from(JSON.stringify(uploadedBundle))
      );
      const validationBundleHash = sha256(
        Buffer.from(JSON.stringify(validationBundle))
      );

      return uploadedBundleHash === validationBundleHash;
    }
  );
export const nextKeyMock = jest
  .fn()
  .mockImplementation((key: string) =>
    Promise.resolve((parseInt(key) + 1).toString())
  );
export const summarizeBundleMock = jest
  .fn()
  .mockImplementation((bundle: DataItem[]) =>
    Promise.resolve(JSON.stringify(bundle))
  );

export const TestRuntime = jest.fn().mockImplementation(() => {
  return {
    name: "@kyve/evm",
    version: "0.0.0",
    getDataItem: getDataItemMockByKey,
    validate: validateBundleMock,
    getNextKey: nextKeyMock,
    formatValue: summarizeBundleMock,
  };
});
