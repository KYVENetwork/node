/* eslint-disable */
import { SlashType, slashTypeFromJSON, slashTypeToJSON } from "./stakers";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kyve.stakers.v1beta1";

/** EventCreateStaker is an event emitted when a protocol node stakes in a pool. */
export interface EventCreateStaker {
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
  /** pool_id ... */
  pool_id: string;
  /** staker ... */
  staker: string;
  /** valaddress ... */
  valaddress: string;
  /** amount ... */
  amount: string;
}

/** EventLeavePool ... */
export interface EventLeavePool {
  /** pool_id ... */
  pool_id: string;
  /** staker ... */
  staker: string;
}

function createBaseEventCreateStaker(): EventCreateStaker {
  return { address: "", amount: "0" };
}

export const EventCreateStaker = {
  encode(
    message: EventCreateStaker,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): EventCreateStaker {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventCreateStaker();
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

  fromJSON(object: any): EventCreateStaker {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
    };
  },

  toJSON(message: EventCreateStaker): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventCreateStaker>, I>>(
    object: I
  ): EventCreateStaker {
    const message = createBaseEventCreateStaker();
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
  return { pool_id: "0", address: "", amount: "0", slash_type: 0 };
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
    if (message.slash_type !== 0) {
      writer.uint32(32).int32(message.slash_type);
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
          message.slash_type = reader.int32() as any;
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
        : 0,
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
    message.slash_type = object.slash_type ?? 0;
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
  return { pool_id: "0", staker: "", valaddress: "", amount: "0" };
}

export const EventJoinPool = {
  encode(
    message: EventJoinPool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.staker !== "") {
      writer.uint32(18).string(message.staker);
    }
    if (message.valaddress !== "") {
      writer.uint32(26).string(message.valaddress);
    }
    if (message.amount !== "0") {
      writer.uint32(32).uint64(message.amount);
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
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.staker = reader.string();
          break;
        case 3:
          message.valaddress = reader.string();
          break;
        case 4:
          message.amount = longToString(reader.uint64() as Long);
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
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      staker: isSet(object.staker) ? String(object.staker) : "",
      valaddress: isSet(object.valaddress) ? String(object.valaddress) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
    };
  },

  toJSON(message: EventJoinPool): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.staker !== undefined && (obj.staker = message.staker);
    message.valaddress !== undefined && (obj.valaddress = message.valaddress);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventJoinPool>, I>>(
    object: I
  ): EventJoinPool {
    const message = createBaseEventJoinPool();
    message.pool_id = object.pool_id ?? "0";
    message.staker = object.staker ?? "";
    message.valaddress = object.valaddress ?? "";
    message.amount = object.amount ?? "0";
    return message;
  },
};

function createBaseEventLeavePool(): EventLeavePool {
  return { pool_id: "0", staker: "" };
}

export const EventLeavePool = {
  encode(
    message: EventLeavePool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.staker !== "") {
      writer.uint32(18).string(message.staker);
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
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.staker = reader.string();
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
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      staker: isSet(object.staker) ? String(object.staker) : "",
    };
  },

  toJSON(message: EventLeavePool): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.staker !== undefined && (obj.staker = message.staker);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventLeavePool>, I>>(
    object: I
  ): EventLeavePool {
    const message = createBaseEventLeavePool();
    message.pool_id = object.pool_id ?? "0";
    message.staker = object.staker ?? "";
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
