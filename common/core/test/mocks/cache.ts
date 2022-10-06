import { DataItem } from "../../src";

let cache: any = {};

export const putMock = jest
  .fn()
  .mockImplementation(async (key: string | number, value: DataItem) => {
    cache[key] = value;
  });

export const getMock = jest
  .fn()
  .mockImplementation(async (key: string | number) => {
    if (cache[key]) {
      return cache[key];
    }

    throw new Error("not found");
  });

export const existsMock = jest
  .fn()
  .mockImplementation(async (key: string | number) => {
    return !!cache[key];
  });

export const delMock = jest
  .fn()
  .mockImplementation(async (key: string | number) => {
    delete cache[key];
  });

export const dropMock = jest.fn().mockImplementation(async () => {
  cache = {};
});

export const TestCache = jest.fn().mockImplementation(() => {
  return {
    name: "TestCache",
    put: putMock,
    get: getMock,
    exists: existsMock,
    del: delMock,
    drop: dropMock,
  };
});
