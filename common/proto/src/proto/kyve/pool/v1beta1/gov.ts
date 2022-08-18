/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kyve.pool.v1beta1";

/** CreatePoolProposal defines a SDK message for creating a pool. */
export interface CreatePoolProposal {
  /** title ... */
  title: string;
  /** description ... */
  description: string;
  /** name ... */
  name: string;
  /** runtime ... */
  runtime: string;
  /** logo ... */
  logo: string;
  /** config ... */
  config: string;
  /** start_key ... */
  start_key: string;
  /** upload_interval ... */
  upload_interval: string;
  /** operating_cost ... */
  operating_cost: string;
  /** min_stake ... */
  min_stake: string;
  /** max_bundle_size ... */
  max_bundle_size: string;
  /** version ... */
  version: string;
  /** binaries ... */
  binaries: string;
}

function createBaseCreatePoolProposal(): CreatePoolProposal {
  return {
    title: "",
    description: "",
    name: "",
    runtime: "",
    logo: "",
    config: "",
    start_key: "",
    upload_interval: "0",
    operating_cost: "0",
    min_stake: "0",
    max_bundle_size: "0",
    version: "",
    binaries: "",
  };
}

export const CreatePoolProposal = {
  encode(
    message: CreatePoolProposal,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.runtime !== "") {
      writer.uint32(34).string(message.runtime);
    }
    if (message.logo !== "") {
      writer.uint32(42).string(message.logo);
    }
    if (message.config !== "") {
      writer.uint32(50).string(message.config);
    }
    if (message.start_key !== "") {
      writer.uint32(58).string(message.start_key);
    }
    if (message.upload_interval !== "0") {
      writer.uint32(64).uint64(message.upload_interval);
    }
    if (message.operating_cost !== "0") {
      writer.uint32(72).uint64(message.operating_cost);
    }
    if (message.min_stake !== "0") {
      writer.uint32(80).uint64(message.min_stake);
    }
    if (message.max_bundle_size !== "0") {
      writer.uint32(88).uint64(message.max_bundle_size);
    }
    if (message.version !== "") {
      writer.uint32(98).string(message.version);
    }
    if (message.binaries !== "") {
      writer.uint32(106).string(message.binaries);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreatePoolProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreatePoolProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.runtime = reader.string();
          break;
        case 5:
          message.logo = reader.string();
          break;
        case 6:
          message.config = reader.string();
          break;
        case 7:
          message.start_key = reader.string();
          break;
        case 8:
          message.upload_interval = longToString(reader.uint64() as Long);
          break;
        case 9:
          message.operating_cost = longToString(reader.uint64() as Long);
          break;
        case 10:
          message.min_stake = longToString(reader.uint64() as Long);
          break;
        case 11:
          message.max_bundle_size = longToString(reader.uint64() as Long);
          break;
        case 12:
          message.version = reader.string();
          break;
        case 13:
          message.binaries = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreatePoolProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      name: isSet(object.name) ? String(object.name) : "",
      runtime: isSet(object.runtime) ? String(object.runtime) : "",
      logo: isSet(object.logo) ? String(object.logo) : "",
      config: isSet(object.config) ? String(object.config) : "",
      start_key: isSet(object.start_key) ? String(object.start_key) : "",
      upload_interval: isSet(object.upload_interval)
        ? String(object.upload_interval)
        : "0",
      operating_cost: isSet(object.operating_cost)
        ? String(object.operating_cost)
        : "0",
      min_stake: isSet(object.min_stake) ? String(object.min_stake) : "0",
      max_bundle_size: isSet(object.max_bundle_size)
        ? String(object.max_bundle_size)
        : "0",
      version: isSet(object.version) ? String(object.version) : "",
      binaries: isSet(object.binaries) ? String(object.binaries) : "",
    };
  },

  toJSON(message: CreatePoolProposal): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    message.name !== undefined && (obj.name = message.name);
    message.runtime !== undefined && (obj.runtime = message.runtime);
    message.logo !== undefined && (obj.logo = message.logo);
    message.config !== undefined && (obj.config = message.config);
    message.start_key !== undefined && (obj.start_key = message.start_key);
    message.upload_interval !== undefined &&
      (obj.upload_interval = message.upload_interval);
    message.operating_cost !== undefined &&
      (obj.operating_cost = message.operating_cost);
    message.min_stake !== undefined && (obj.min_stake = message.min_stake);
    message.max_bundle_size !== undefined &&
      (obj.max_bundle_size = message.max_bundle_size);
    message.version !== undefined && (obj.version = message.version);
    message.binaries !== undefined && (obj.binaries = message.binaries);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreatePoolProposal>, I>>(
    object: I
  ): CreatePoolProposal {
    const message = createBaseCreatePoolProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.name = object.name ?? "";
    message.runtime = object.runtime ?? "";
    message.logo = object.logo ?? "";
    message.config = object.config ?? "";
    message.start_key = object.start_key ?? "";
    message.upload_interval = object.upload_interval ?? "0";
    message.operating_cost = object.operating_cost ?? "0";
    message.min_stake = object.min_stake ?? "0";
    message.max_bundle_size = object.max_bundle_size ?? "0";
    message.version = object.version ?? "";
    message.binaries = object.binaries ?? "";
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

function longToString(long: Long) {
  return long.toString();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
