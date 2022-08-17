import { DataItem } from "../../src";

export const compressMock = jest
  .fn()
  .mockImplementation((bundle: DataItem[]) =>
    Promise.resolve(Buffer.from(JSON.stringify(bundle)))
  );
export const decompressMock = jest
  .fn()
  .mockImplementation((data: Buffer) =>
    Promise.resolve(JSON.parse(data.toString()))
  );

export const TestCompression = jest.fn().mockImplementation(() => {
  return {
    name: "TestCompression",
    compress: compressMock,
    decompress: decompressMock,
  };
});
