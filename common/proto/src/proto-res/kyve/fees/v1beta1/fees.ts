/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kyve.fees.v1beta1";

/** Params defines the fees module parameters. */
export interface Params {
  /** min_gas_price defines the minimum gas price value for all transactions. */
  min_gas_price: string;
  /** burn_ratio defines the ratio of transaction fees burnt. */
  burn_ratio: string;
}

function createBaseParams(): Params {
  return { min_gas_price: "", burn_ratio: "" };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.min_gas_price !== "") {
      writer.uint32(10).string(message.min_gas_price);
    }
    if (message.burn_ratio !== "") {
      writer.uint32(18).string(message.burn_ratio);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.min_gas_price = reader.string();
          break;
        case 2:
          message.burn_ratio = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      min_gas_price: isSet(object.min_gas_price)
        ? String(object.min_gas_price)
        : "",
      burn_ratio: isSet(object.burn_ratio) ? String(object.burn_ratio) : "",
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.min_gas_price !== undefined &&
      (obj.min_gas_price = message.min_gas_price);
    message.burn_ratio !== undefined && (obj.burn_ratio = message.burn_ratio);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.min_gas_price = object.min_gas_price ?? "";
    message.burn_ratio = object.burn_ratio ?? "";
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
