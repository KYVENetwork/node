/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kyve.pool.v1beta1";

/** GovMsgCreatePool defines a SDK message for creating a pool. */
export interface GovMsgCreatePool {
  /** title ... */
  creator: string;
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

export interface GovMsgCreatePoolResponse {}

/** GovMsgUpdatePool is a gov Content type for updating a pool. */
export interface GovMsgUpdatePool {
  /** creator ... */
  creator: string;
  /** id ... */
  id: string;
  /** payload */
  payload: string;
}

export interface GovMsgUpdatePoolResponse {}

function createBaseGovMsgCreatePool(): GovMsgCreatePool {
  return {
    creator: "",
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

export const GovMsgCreatePool = {
  encode(
    message: GovMsgCreatePool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
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

  decode(input: _m0.Reader | Uint8Array, length?: number): GovMsgCreatePool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGovMsgCreatePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
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

  fromJSON(object: any): GovMsgCreatePool {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
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

  toJSON(message: GovMsgCreatePool): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
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

  fromPartial<I extends Exact<DeepPartial<GovMsgCreatePool>, I>>(
    object: I
  ): GovMsgCreatePool {
    const message = createBaseGovMsgCreatePool();
    message.creator = object.creator ?? "";
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

function createBaseGovMsgCreatePoolResponse(): GovMsgCreatePoolResponse {
  return {};
}

export const GovMsgCreatePoolResponse = {
  encode(
    _: GovMsgCreatePoolResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GovMsgCreatePoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGovMsgCreatePoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GovMsgCreatePoolResponse {
    return {};
  },

  toJSON(_: GovMsgCreatePoolResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GovMsgCreatePoolResponse>, I>>(
    _: I
  ): GovMsgCreatePoolResponse {
    const message = createBaseGovMsgCreatePoolResponse();
    return message;
  },
};

function createBaseGovMsgUpdatePool(): GovMsgUpdatePool {
  return { creator: "", id: "0", payload: "" };
}

export const GovMsgUpdatePool = {
  encode(
    message: GovMsgUpdatePool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "0") {
      writer.uint32(16).uint64(message.id);
    }
    if (message.payload !== "") {
      writer.uint32(26).string(message.payload);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GovMsgUpdatePool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGovMsgUpdatePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.id = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.payload = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GovMsgUpdatePool {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? String(object.id) : "0",
      payload: isSet(object.payload) ? String(object.payload) : "",
    };
  },

  toJSON(message: GovMsgUpdatePool): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.payload !== undefined && (obj.payload = message.payload);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GovMsgUpdatePool>, I>>(
    object: I
  ): GovMsgUpdatePool {
    const message = createBaseGovMsgUpdatePool();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "0";
    message.payload = object.payload ?? "";
    return message;
  },
};

function createBaseGovMsgUpdatePoolResponse(): GovMsgUpdatePoolResponse {
  return {};
}

export const GovMsgUpdatePoolResponse = {
  encode(
    _: GovMsgUpdatePoolResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GovMsgUpdatePoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGovMsgUpdatePoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GovMsgUpdatePoolResponse {
    return {};
  },

  toJSON(_: GovMsgUpdatePoolResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GovMsgUpdatePoolResponse>, I>>(
    _: I
  ): GovMsgUpdatePoolResponse {
    const message = createBaseGovMsgUpdatePoolResponse();
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
