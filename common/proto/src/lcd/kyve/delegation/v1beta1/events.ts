/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kyve.delegation.v1beta1";

/**
 * EventDelegate is an event emitted when someone delegates to a protocol node.
 * emitted_by: MsgDelegate
 */
export interface EventDelegate {
  /** address is the account address of the delegator. */
  address: string;
  /** node is the account address of the protocol node. */
  node: string;
  /** amount ... */
  amount: string;
}

/**
 * EventUndelegate is an event emitted when someone undelegates from a protocol node.
 * emitted_by: EndBlock
 */
export interface EventUndelegate {
  /** address is the account address of the delegator. */
  address: string;
  /** node is the account address of the protocol node. */
  node: string;
  /** amount ... */
  amount: string;
}

/**
 * EventRedelegate is an event emitted when someone redelegates from one protocol node to another.
 * emitted_by: MsgRedelegate
 */
export interface EventRedelegate {
  /** address is the account address of the delegator. */
  address: string;
  /** from_node ... */
  from_node: string;
  /** address is the account address of the new staker in the the pool */
  to_node: string;
  /** amount ... */
  amount: string;
}

/**
 * EventWithdrawRewards ...
 * emitted_by: MsgRedelegate, MsgDelegate, MsgWithdrawRewards, EndBlock
 */
export interface EventWithdrawRewards {
  /** address is the account address of the delegator. */
  address: string;
  /** from_node is the account address of the protocol node the users withdraws from. */
  from_node: string;
  /** amount ... */
  amount: string;
}

function createBaseEventDelegate(): EventDelegate {
  return { address: "", node: "", amount: "0" };
}

export const EventDelegate = {
  encode(message: EventDelegate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.node !== "") {
      writer.uint32(18).string(message.node);
    }
    if (message.amount !== "0") {
      writer.uint32(24).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventDelegate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventDelegate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.node = reader.string();
          break;
        case 3:
          message.amount = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventDelegate {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      node: isSet(object.node) ? String(object.node) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
    };
  },

  toJSON(message: EventDelegate): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.node !== undefined && (obj.node = message.node);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventDelegate>, I>>(object: I): EventDelegate {
    const message = createBaseEventDelegate();
    message.address = object.address ?? "";
    message.node = object.node ?? "";
    message.amount = object.amount ?? "0";
    return message;
  },
};

function createBaseEventUndelegate(): EventUndelegate {
  return { address: "", node: "", amount: "0" };
}

export const EventUndelegate = {
  encode(message: EventUndelegate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.node !== "") {
      writer.uint32(18).string(message.node);
    }
    if (message.amount !== "0") {
      writer.uint32(24).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventUndelegate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUndelegate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.node = reader.string();
          break;
        case 3:
          message.amount = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventUndelegate {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      node: isSet(object.node) ? String(object.node) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
    };
  },

  toJSON(message: EventUndelegate): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.node !== undefined && (obj.node = message.node);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventUndelegate>, I>>(object: I): EventUndelegate {
    const message = createBaseEventUndelegate();
    message.address = object.address ?? "";
    message.node = object.node ?? "";
    message.amount = object.amount ?? "0";
    return message;
  },
};

function createBaseEventRedelegate(): EventRedelegate {
  return { address: "", from_node: "", to_node: "", amount: "0" };
}

export const EventRedelegate = {
  encode(message: EventRedelegate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.from_node !== "") {
      writer.uint32(18).string(message.from_node);
    }
    if (message.to_node !== "") {
      writer.uint32(26).string(message.to_node);
    }
    if (message.amount !== "0") {
      writer.uint32(32).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventRedelegate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRedelegate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.from_node = reader.string();
          break;
        case 3:
          message.to_node = reader.string();
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

  fromJSON(object: any): EventRedelegate {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      from_node: isSet(object.from_node) ? String(object.from_node) : "",
      to_node: isSet(object.to_node) ? String(object.to_node) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
    };
  },

  toJSON(message: EventRedelegate): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.from_node !== undefined && (obj.from_node = message.from_node);
    message.to_node !== undefined && (obj.to_node = message.to_node);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventRedelegate>, I>>(object: I): EventRedelegate {
    const message = createBaseEventRedelegate();
    message.address = object.address ?? "";
    message.from_node = object.from_node ?? "";
    message.to_node = object.to_node ?? "";
    message.amount = object.amount ?? "0";
    return message;
  },
};

function createBaseEventWithdrawRewards(): EventWithdrawRewards {
  return { address: "", from_node: "", amount: "0" };
}

export const EventWithdrawRewards = {
  encode(message: EventWithdrawRewards, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.from_node !== "") {
      writer.uint32(18).string(message.from_node);
    }
    if (message.amount !== "0") {
      writer.uint32(24).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventWithdrawRewards {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventWithdrawRewards();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.from_node = reader.string();
          break;
        case 3:
          message.amount = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EventWithdrawRewards {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      from_node: isSet(object.from_node) ? String(object.from_node) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
    };
  },

  toJSON(message: EventWithdrawRewards): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.from_node !== undefined && (obj.from_node = message.from_node);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EventWithdrawRewards>, I>>(object: I): EventWithdrawRewards {
    const message = createBaseEventWithdrawRewards();
    message.address = object.address ?? "";
    message.from_node = object.from_node ?? "";
    message.amount = object.amount ?? "0";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

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
