/* eslint-disable */
import {
  SlashType,
  slashTypeToNumber,
  slashTypeFromJSON,
  slashTypeToJSON,
} from "./stakers";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kyve.stakers.v1beta1";

/** EventStakePool is an event emitted when a protocol node stakes in a pool. */
export interface EventStakePool {
  /** address is the account address of the protocol node. */
  address: string;
  /** amount ... */
  amount: string;
}

/** EventUnstakePool is an event emitted when a protocol node unstakes from a pool. */
export interface EventUnstakePool {
  /** address is the account address of the protocol node. */
  address: string;
  /** amount ... */
  amount: string;
}

/** EventUpdateMetadata is an event emitted when a protocol node updates their metadata. */
export interface EventUpdateMetadata {
  /** address is the account address of the protocol node. */
  address: string;
  /** moniker ... */
  moniker: string;
  /** website ... */
  website: string;
  /** logo ... */
  logo: string;
}

/** EventSlash is an event emitted when a protocol node is slashed. */
export interface EventSlash {
  /** pool_id is the unique ID of the pool. */
  pool_id: string;
  /** address is the account address of the protocol node. */
  address: string;
  /** amount ... */
  amount: string;
  /** slash_type */
  slash_type: SlashType;
}

/** EventUpdateCommission ... */
export interface EventUpdateCommission {
  /** address is the account address of the protocol node. */
  address: string;
  /** commission ... */
  commission: string;
}

/** EventJoinPool ... */
export interface EventJoinPool {
  /** address ... */
  address: string;
  /** pool_id ... */
  pool_id: string;
}

/** EventLeavePool ... */
export interface EventLeavePool {
  /** address ... */
  address: string;
  /** pool_id ... */
  pool_id: string;
}

function createBaseEventStakePool(): EventStakePool {
  return { address: "", amount: "0" };
}

export const EventStakePool = {
  encode(
    message: EventStakePool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.amount !== "0") {
      writer.uint32(16).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventStakePool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventStakePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.amount = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventStakePool {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
    };
  },

  toJSON(message: EventStakePool): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventStakePool>, I>>(
    object: I
  ): EventStakePool {
    const message = createBaseEventStakePool();
    message.address = object.address ?? "";
    message.amount = object.amount ?? "0";
    return message;
  },
};

function createBaseEventUnstakePool(): EventUnstakePool {
  return { address: "", amount: "0" };
}

export const EventUnstakePool = {
  encode(
    message: EventUnstakePool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.amount !== "0") {
      writer.uint32(16).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventUnstakePool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUnstakePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.amount = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventUnstakePool {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
    };
  },

  toJSON(message: EventUnstakePool): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventUnstakePool>, I>>(
    object: I
  ): EventUnstakePool {
    const message = createBaseEventUnstakePool();
    message.address = object.address ?? "";
    message.amount = object.amount ?? "0";
    return message;
  },
};

function createBaseEventUpdateMetadata(): EventUpdateMetadata {
  return { address: "", moniker: "", website: "", logo: "" };
}

export const EventUpdateMetadata = {
  encode(
    message: EventUpdateMetadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.moniker !== "") {
      writer.uint32(18).string(message.moniker);
    }
    if (message.website !== "") {
      writer.uint32(26).string(message.website);
    }
    if (message.logo !== "") {
      writer.uint32(34).string(message.logo);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventUpdateMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUpdateMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.moniker = reader.string();
          break;
        case 3:
          message.website = reader.string();
          break;
        case 4:
          message.logo = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventUpdateMetadata {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      moniker: isSet(object.moniker) ? String(object.moniker) : "",
      website: isSet(object.website) ? String(object.website) : "",
      logo: isSet(object.logo) ? String(object.logo) : "",
    };
  },

  toJSON(message: EventUpdateMetadata): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.moniker !== undefined && (obj.moniker = message.moniker);
    message.website !== undefined && (obj.website = message.website);
    message.logo !== undefined && (obj.logo = message.logo);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventUpdateMetadata>, I>>(
    object: I
  ): EventUpdateMetadata {
    const message = createBaseEventUpdateMetadata();
    message.address = object.address ?? "";
    message.moniker = object.moniker ?? "";
    message.website = object.website ?? "";
    message.logo = object.logo ?? "";
    return message;
  },
};

function createBaseEventSlash(): EventSlash {
  return {
    pool_id: "0",
    address: "",
    amount: "0",
    slash_type: SlashType.SLASH_TYPE_UNSPECIFIED,
  };
}

export const EventSlash = {
  encode(
    message: EventSlash,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.amount !== "0") {
      writer.uint32(24).uint64(message.amount);
    }
    if (message.slash_type !== SlashType.SLASH_TYPE_UNSPECIFIED) {
      writer.uint32(32).int32(slashTypeToNumber(message.slash_type));
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventSlash {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSlash();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.amount = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.slash_type = slashTypeFromJSON(reader.int32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventSlash {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      address: isSet(object.address) ? String(object.address) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
      slash_type: isSet(object.slash_type)
        ? slashTypeFromJSON(object.slash_type)
        : SlashType.SLASH_TYPE_UNSPECIFIED,
    };
  },

  toJSON(message: EventSlash): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.address !== undefined && (obj.address = message.address);
    message.amount !== undefined && (obj.amount = message.amount);
    message.slash_type !== undefined &&
      (obj.slash_type = slashTypeToJSON(message.slash_type));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventSlash>, I>>(
    object: I
  ): EventSlash {
    const message = createBaseEventSlash();
    message.pool_id = object.pool_id ?? "0";
    message.address = object.address ?? "";
    message.amount = object.amount ?? "0";
    message.slash_type = object.slash_type ?? SlashType.SLASH_TYPE_UNSPECIFIED;
    return message;
  },
};

function createBaseEventUpdateCommission(): EventUpdateCommission {
  return { address: "", commission: "" };
}

export const EventUpdateCommission = {
  encode(
    message: EventUpdateCommission,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.commission !== "") {
      writer.uint32(18).string(message.commission);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): EventUpdateCommission {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUpdateCommission();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.commission = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventUpdateCommission {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      commission: isSet(object.commission) ? String(object.commission) : "",
    };
  },

  toJSON(message: EventUpdateCommission): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.commission !== undefined && (obj.commission = message.commission);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventUpdateCommission>, I>>(
    object: I
  ): EventUpdateCommission {
    const message = createBaseEventUpdateCommission();
    message.address = object.address ?? "";
    message.commission = object.commission ?? "";
    return message;
  },
};

function createBaseEventJoinPool(): EventJoinPool {
  return { address: "", pool_id: "0" };
}

export const EventJoinPool = {
  encode(
    message: EventJoinPool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pool_id !== "0") {
      writer.uint32(16).uint64(message.pool_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventJoinPool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventJoinPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventJoinPool {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
    };
  },

  toJSON(message: EventJoinPool): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventJoinPool>, I>>(
    object: I
  ): EventJoinPool {
    const message = createBaseEventJoinPool();
    message.address = object.address ?? "";
    message.pool_id = object.pool_id ?? "0";
    return message;
  },
};

function createBaseEventLeavePool(): EventLeavePool {
  return { address: "", pool_id: "0" };
}

export const EventLeavePool = {
  encode(
    message: EventLeavePool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.pool_id !== "0") {
      writer.uint32(16).uint64(message.pool_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventLeavePool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventLeavePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventLeavePool {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
    };
  },

  toJSON(message: EventLeavePool): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventLeavePool>, I>>(
    object: I
  ): EventLeavePool {
    const message = createBaseEventLeavePool();
    message.address = object.address ?? "";
    message.pool_id = object.pool_id ?? "0";
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
