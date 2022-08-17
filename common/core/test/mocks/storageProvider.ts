export const initMock = jest.fn();
export const saveBundleMock = jest.fn().mockResolvedValue("test_storage_id");
export const retrieveBundleMock = jest
  .fn()
  .mockResolvedValue(
    Buffer.from(JSON.stringify([{ key: "test_key", value: "test_value" }]))
  );

export const TestStorageProvider = jest.fn().mockImplementation(() => {
  return {
    name: "TestStorageProvider",
    init: initMock,
    saveBundle: saveBundleMock,
    retrieveBundle: retrieveBundleMock,
  };
});
