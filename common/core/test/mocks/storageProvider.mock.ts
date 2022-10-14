export const TestStorageProvider = jest.fn().mockImplementation(() => {
  return {
    name: "TestStorageProvider",
    init: jest.fn(),
    saveBundle: jest.fn().mockResolvedValue("test_storage_id"),
    retrieveBundle: jest.fn().mockResolvedValue(
      Buffer.from(
        JSON.stringify([
          { key: "test_key_1", value: "test_value_1" },
          { key: "test_key_2", value: "test_value_2" },
        ])
      )
    ),
  };
});
