export const TestCompression = jest.fn().mockImplementation(() => {
  return {
    name: "TestCompression",
    compress: jest
      .fn()
      .mockImplementation((data: Buffer) => Promise.resolve(data)),
    decompress: jest
      .fn()
      .mockImplementation((data: Buffer) => Promise.resolve(data)),
  };
});
