import { DataItem, Node, sha256 } from "../../src";

export const getDataItemMock = jest
  .fn()
  .mockImplementation((core: Node, key: string) =>
    Promise.resolve({
      key,
      value: `${key}-value`,
    })
  );
export const validateMock = jest
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
export const getNextKeyMock = jest
  .fn()
  .mockImplementation((key: string) =>
    Promise.resolve((parseInt(key) + 1).toString())
  );
export const formatValueMock = jest
  .fn()
  .mockImplementation((value: string) => Promise.resolve(value));

export const TestRuntime = jest.fn().mockImplementation(() => {
  return {
    name: "@kyve/evm",
    version: "0.0.0",
    getDataItem: getDataItemMock,
    validate: validateMock,
    getNextKey: getNextKeyMock,
    formatValue: formatValueMock,
  };
});
