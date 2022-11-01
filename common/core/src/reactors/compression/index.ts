import { NoCompression } from "./NoCompression";
import { Gzip } from "./Gzip";
import { ICompression } from "../..";

export const compressionFactory = (compression: number): ICompression => {
  switch (compression) {
    case 1:
      return new Gzip();
    default:
      return new NoCompression();
  }
};
