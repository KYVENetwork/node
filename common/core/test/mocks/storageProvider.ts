export const initMock = jest.fn();
export const saveBundleMock = jest.fn().mockResolvedValue("test_storage_id");
export const retrieveBundleMock = jest.fn().mockResolvedValue(
  Buffer.from(
    JSON.stringify([
      { key: "test_key_1", value: "test_value_1" },
      { key: "test_key_2", value: "test_value_2" },
    ])
  )
);

export const TestStorageProvider = jest.fn().mockImplementation(() => {
  return {
    name: "TestStorageProvider",
    init: initMock,
    saveBundle: saveBundleMock,
    retrieveBundle: retrieveBundleMock,
  };
});
