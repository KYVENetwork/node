export const compressMock = jest
  .fn()
  .mockImplementation((data: Buffer) => Promise.resolve(data));
export const decompressMock = jest
  .fn()
  .mockImplementation((data: Buffer) => Promise.resolve(data));

export const TestCompression = jest.fn().mockImplementation(() => {
  return {
    name: "TestCompression",
    compress: compressMock,
    decompress: decompressMock,
  };
});
