/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kyve.delegation.v1beta1";

/** Delegator ... */
export interface Delegator {
  /** k_index ... */
  k_index: string;
  /** staker ... */
  staker: string;
  /** delegator ... */
  delegator: string;
  /** delegation_amount ... */
  delegation_amount: string;
}

/** DelegationEntries ... */
export interface DelegationEntries {
  /** balance ... */
  balance: string;
  /** staker ... */
  staker: string;
  /** k_index ... */
  k_index: string;
}

/** DelegationPoolData ... */
export interface DelegationData {
  /** staker ... */
  staker: string;
  /** current_rewards ... */
  current_rewards: string;
  /** total_delegation ... */
  total_delegation: string;
  /** latest_index_k ... */
  latest_index_k: string;
  /** delegator_count ... */
  delegator_count: string;
  /** latest_index_was_undelegation ... */
  latest_index_was_undelegation: boolean;
}

/** UndelegationQueueEntry ... */
export interface UndelegationQueueEntry {
  /** index ... */
  index: string;
  /** staker ... */
  staker: string;
  /** delegator ... */
  delegator: string;
  /** amount ... */
  amount: string;
  /** creation_time ... */
  creation_time: string;
}

/** QueueState ... */
export interface QueueState {
  /** low_index ... */
  low_index: string;
  /** high_index ... */
  high_index: string;
}

function createBaseDelegator(): Delegator {
  return { k_index: "0", staker: "", delegator: "", delegation_amount: "0" };
}

export const Delegator = {
  encode(
    message: Delegator,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.k_index !== "0") {
      writer.uint32(8).uint64(message.k_index);
    }
    if (message.staker !== "") {
      writer.uint32(18).string(message.staker);
    }
    if (message.delegator !== "") {
      writer.uint32(26).string(message.delegator);
    }
    if (message.delegation_amount !== "0") {
      writer.uint32(32).uint64(message.delegation_amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Delegator {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.k_index = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.staker = reader.string();
          break;
        case 3:
          message.delegator = reader.string();
          break;
        case 4:
          message.delegation_amount = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Delegator {
    return {
      k_index: isSet(object.k_index) ? String(object.k_index) : "0",
      staker: isSet(object.staker) ? String(object.staker) : "",
      delegator: isSet(object.delegator) ? String(object.delegator) : "",
      delegation_amount: isSet(object.delegation_amount)
        ? String(object.delegation_amount)
        : "0",
    };
  },

  toJSON(message: Delegator): unknown {
    const obj: any = {};
    message.k_index !== undefined && (obj.k_index = message.k_index);
    message.staker !== undefined && (obj.staker = message.staker);
    message.delegator !== undefined && (obj.delegator = message.delegator);
    message.delegation_amount !== undefined &&
      (obj.delegation_amount = message.delegation_amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Delegator>, I>>(
    object: I
  ): Delegator {
    const message = createBaseDelegator();
    message.k_index = object.k_index ?? "0";
    message.staker = object.staker ?? "";
    message.delegator = object.delegator ?? "";
    message.delegation_amount = object.delegation_amount ?? "0";
    return message;
  },
};

function createBaseDelegationEntries(): DelegationEntries {
  return { balance: "", staker: "", k_index: "0" };
}

export const DelegationEntries = {
  encode(
    message: DelegationEntries,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.balance !== "") {
      writer.uint32(10).string(message.balance);
    }
    if (message.staker !== "") {
      writer.uint32(18).string(message.staker);
    }
    if (message.k_index !== "0") {
      writer.uint32(24).uint64(message.k_index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DelegationEntries {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegationEntries();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.balance = reader.string();
          break;
        case 2:
          message.staker = reader.string();
          break;
        case 3:
          message.k_index = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DelegationEntries {
    return {
      balance: isSet(object.balance) ? String(object.balance) : "",
      staker: isSet(object.staker) ? String(object.staker) : "",
      k_index: isSet(object.k_index) ? String(object.k_index) : "0",
    };
  },

  toJSON(message: DelegationEntries): unknown {
    const obj: any = {};
    message.balance !== undefined && (obj.balance = message.balance);
    message.staker !== undefined && (obj.staker = message.staker);
    message.k_index !== undefined && (obj.k_index = message.k_index);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DelegationEntries>, I>>(
    object: I
  ): DelegationEntries {
    const message = createBaseDelegationEntries();
    message.balance = object.balance ?? "";
    message.staker = object.staker ?? "";
    message.k_index = object.k_index ?? "0";
    return message;
  },
};

function createBaseDelegationData(): DelegationData {
  return {
    staker: "",
    current_rewards: "0",
    total_delegation: "0",
    latest_index_k: "0",
    delegator_count: "0",
    latest_index_was_undelegation: false,
  };
}

export const DelegationData = {
  encode(
    message: DelegationData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.staker !== "") {
      writer.uint32(10).string(message.staker);
    }
    if (message.current_rewards !== "0") {
      writer.uint32(16).uint64(message.current_rewards);
    }
    if (message.total_delegation !== "0") {
      writer.uint32(24).uint64(message.total_delegation);
    }
    if (message.latest_index_k !== "0") {
      writer.uint32(32).uint64(message.latest_index_k);
    }
    if (message.delegator_count !== "0") {
      writer.uint32(40).uint64(message.delegator_count);
    }
    if (message.latest_index_was_undelegation === true) {
      writer.uint32(48).bool(message.latest_index_was_undelegation);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DelegationData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegationData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.staker = reader.string();
          break;
        case 2:
          message.current_rewards = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.total_delegation = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.latest_index_k = longToString(reader.uint64() as Long);
          break;
        case 5:
          message.delegator_count = longToString(reader.uint64() as Long);
          break;
        case 6:
          message.latest_index_was_undelegation = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DelegationData {
    return {
      staker: isSet(object.staker) ? String(object.staker) : "",
      current_rewards: isSet(object.current_rewards)
        ? String(object.current_rewards)
        : "0",
      total_delegation: isSet(object.total_delegation)
        ? String(object.total_delegation)
        : "0",
      latest_index_k: isSet(object.latest_index_k)
        ? String(object.latest_index_k)
        : "0",
      delegator_count: isSet(object.delegator_count)
        ? String(object.delegator_count)
        : "0",
      latest_index_was_undelegation: isSet(object.latest_index_was_undelegation)
        ? Boolean(object.latest_index_was_undelegation)
        : false,
    };
  },

  toJSON(message: DelegationData): unknown {
    const obj: any = {};
    message.staker !== undefined && (obj.staker = message.staker);
    message.current_rewards !== undefined &&
      (obj.current_rewards = message.current_rewards);
    message.total_delegation !== undefined &&
      (obj.total_delegation = message.total_delegation);
    message.latest_index_k !== undefined &&
      (obj.latest_index_k = message.latest_index_k);
    message.delegator_count !== undefined &&
      (obj.delegator_count = message.delegator_count);
    message.latest_index_was_undelegation !== undefined &&
      (obj.latest_index_was_undelegation =
        message.latest_index_was_undelegation);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DelegationData>, I>>(
    object: I
  ): DelegationData {
    const message = createBaseDelegationData();
    message.staker = object.staker ?? "";
    message.current_rewards = object.current_rewards ?? "0";
    message.total_delegation = object.total_delegation ?? "0";
    message.latest_index_k = object.latest_index_k ?? "0";
    message.delegator_count = object.delegator_count ?? "0";
    message.latest_index_was_undelegation =
      object.latest_index_was_undelegation ?? false;
    return message;
  },
};

function createBaseUndelegationQueueEntry(): UndelegationQueueEntry {
  return {
    index: "0",
    staker: "",
    delegator: "",
    amount: "0",
    creation_time: "0",
  };
}

export const UndelegationQueueEntry = {
  encode(
    message: UndelegationQueueEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.index !== "0") {
      writer.uint32(8).uint64(message.index);
    }
    if (message.staker !== "") {
      writer.uint32(18).string(message.staker);
    }
    if (message.delegator !== "") {
      writer.uint32(26).string(message.delegator);
    }
    if (message.amount !== "0") {
      writer.uint32(32).uint64(message.amount);
    }
    if (message.creation_time !== "0") {
      writer.uint32(40).uint64(message.creation_time);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UndelegationQueueEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUndelegationQueueEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.staker = reader.string();
          break;
        case 3:
          message.delegator = reader.string();
          break;
        case 4:
          message.amount = longToString(reader.uint64() as Long);
          break;
        case 5:
          message.creation_time = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UndelegationQueueEntry {
    return {
      index: isSet(object.index) ? String(object.index) : "0",
      staker: isSet(object.staker) ? String(object.staker) : "",
      delegator: isSet(object.delegator) ? String(object.delegator) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
      creation_time: isSet(object.creation_time)
        ? String(object.creation_time)
        : "0",
    };
  },

  toJSON(message: UndelegationQueueEntry): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.staker !== undefined && (obj.staker = message.staker);
    message.delegator !== undefined && (obj.delegator = message.delegator);
    message.amount !== undefined && (obj.amount = message.amount);
    message.creation_time !== undefined &&
      (obj.creation_time = message.creation_time);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UndelegationQueueEntry>, I>>(
    object: I
  ): UndelegationQueueEntry {
    const message = createBaseUndelegationQueueEntry();
    message.index = object.index ?? "0";
    message.staker = object.staker ?? "";
    message.delegator = object.delegator ?? "";
    message.amount = object.amount ?? "0";
    message.creation_time = object.creation_time ?? "0";
    return message;
  },
};

function createBaseQueueState(): QueueState {
  return { low_index: "0", high_index: "0" };
}

export const QueueState = {
  encode(
    message: QueueState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.low_index !== "0") {
      writer.uint32(8).uint64(message.low_index);
    }
    if (message.high_index !== "0") {
      writer.uint32(16).uint64(message.high_index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueueState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueueState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.low_index = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.high_index = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueueState {
    return {
      low_index: isSet(object.low_index) ? String(object.low_index) : "0",
      high_index: isSet(object.high_index) ? String(object.high_index) : "0",
    };
  },

  toJSON(message: QueueState): unknown {
    const obj: any = {};
    message.low_index !== undefined && (obj.low_index = message.low_index);
    message.high_index !== undefined && (obj.high_index = message.high_index);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueueState>, I>>(
    object: I
  ): QueueState {
    const message = createBaseQueueState();
    message.low_index = object.low_index ?? "0";
    message.high_index = object.high_index ?? "0";
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
