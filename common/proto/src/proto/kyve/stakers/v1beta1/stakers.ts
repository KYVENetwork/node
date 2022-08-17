/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kyve.stakers.v1beta1";

/** SlashType ... */
export enum SlashType {
  /** SLASH_TYPE_UNSPECIFIED - SLASH_TYPE_UNSPECIFIED ... */
  SLASH_TYPE_UNSPECIFIED = 0,
  /** SLASH_TYPE_TIMEOUT - SLASH_TYPE_TIMEOUT ... */
  SLASH_TYPE_TIMEOUT = 1,
  /** SLASH_TYPE_VOTE - SLASH_TYPE_VOTE ... */
  SLASH_TYPE_VOTE = 2,
  /** SLASH_TYPE_UPLOAD - SLASH_TYPE_UPLOAD ... */
  SLASH_TYPE_UPLOAD = 3,
  UNRECOGNIZED = -1,
}

export function slashTypeFromJSON(object: any): SlashType {
  switch (object) {
    case 0:
    case "SLASH_TYPE_UNSPECIFIED":
      return SlashType.SLASH_TYPE_UNSPECIFIED;
    case 1:
    case "SLASH_TYPE_TIMEOUT":
      return SlashType.SLASH_TYPE_TIMEOUT;
    case 2:
    case "SLASH_TYPE_VOTE":
      return SlashType.SLASH_TYPE_VOTE;
    case 3:
    case "SLASH_TYPE_UPLOAD":
      return SlashType.SLASH_TYPE_UPLOAD;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SlashType.UNRECOGNIZED;
  }
}

export function slashTypeToJSON(object: SlashType): string {
  switch (object) {
    case SlashType.SLASH_TYPE_UNSPECIFIED:
      return "SLASH_TYPE_UNSPECIFIED";
    case SlashType.SLASH_TYPE_TIMEOUT:
      return "SLASH_TYPE_TIMEOUT";
    case SlashType.SLASH_TYPE_VOTE:
      return "SLASH_TYPE_VOTE";
    case SlashType.SLASH_TYPE_UPLOAD:
      return "SLASH_TYPE_UPLOAD";
    case SlashType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** Staker ... */
export interface Staker {
  /** address ... */
  address: string;
  /** pools */
  pools: string[];
  /** amount ... */
  amount: string;
  /** unbonding_amount ... */
  unbonding_amount: string;
  /** commission ... */
  commission: string;
  /** moniker ... */
  moniker: string;
  /** website ... */
  website: string;
  /** logo */
  logo: string;
  /** points // TODO should points be in bundles or make method to increase points ? */
  points: string;
}

/** CommissionChangeEntry ... */
export interface CommissionChangeEntry {
  /** index ... */
  index: string;
  /** staker ... */
  staker: string;
  /** commission ... */
  commission: string;
  /** creation_date ... */
  creation_date: string;
}

/** UnbondingStakeEntry ... */
export interface UnbondingStakeEntry {
  /** index ... */
  index: string;
  /** staker ... */
  staker: string;
  /** amount ... */
  amount: string;
  /** creation_date ... */
  creation_date: string;
}

/** LeavePool ... */
export interface LeavePoolEntry {
  /** index ... */
  index: string;
  /** staker ... */
  staker: string;
  /** poolId ... */
  poolId: string;
  /** creation_date ... */
  creation_date: string;
}

/** UnbondingState stores the state for the unbonding of stakes and delegations. */
export interface QueueState {
  /** low_index ... */
  low_index: string;
  /** high_index ... */
  high_index: string;
}

function createBaseStaker(): Staker {
  return {
    address: "",
    pools: [],
    amount: "0",
    unbonding_amount: "0",
    commission: "",
    moniker: "",
    website: "",
    logo: "",
    points: "0",
  };
}

export const Staker = {
  encode(
    message: Staker,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    writer.uint32(18).fork();
    for (const v of message.pools) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.amount !== "0") {
      writer.uint32(24).uint64(message.amount);
    }
    if (message.unbonding_amount !== "0") {
      writer.uint32(32).uint64(message.unbonding_amount);
    }
    if (message.commission !== "") {
      writer.uint32(42).string(message.commission);
    }
    if (message.moniker !== "") {
      writer.uint32(50).string(message.moniker);
    }
    if (message.website !== "") {
      writer.uint32(58).string(message.website);
    }
    if (message.logo !== "") {
      writer.uint32(66).string(message.logo);
    }
    if (message.points !== "0") {
      writer.uint32(72).uint64(message.points);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Staker {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStaker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.pools.push(longToString(reader.uint64() as Long));
            }
          } else {
            message.pools.push(longToString(reader.uint64() as Long));
          }
          break;
        case 3:
          message.amount = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.unbonding_amount = longToString(reader.uint64() as Long);
          break;
        case 5:
          message.commission = reader.string();
          break;
        case 6:
          message.moniker = reader.string();
          break;
        case 7:
          message.website = reader.string();
          break;
        case 8:
          message.logo = reader.string();
          break;
        case 9:
          message.points = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Staker {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      pools: Array.isArray(object?.pools)
        ? object.pools.map((e: any) => String(e))
        : [],
      amount: isSet(object.amount) ? String(object.amount) : "0",
      unbonding_amount: isSet(object.unbonding_amount)
        ? String(object.unbonding_amount)
        : "0",
      commission: isSet(object.commission) ? String(object.commission) : "",
      moniker: isSet(object.moniker) ? String(object.moniker) : "",
      website: isSet(object.website) ? String(object.website) : "",
      logo: isSet(object.logo) ? String(object.logo) : "",
      points: isSet(object.points) ? String(object.points) : "0",
    };
  },

  toJSON(message: Staker): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    if (message.pools) {
      obj.pools = message.pools.map((e) => e);
    } else {
      obj.pools = [];
    }
    message.amount !== undefined && (obj.amount = message.amount);
    message.unbonding_amount !== undefined &&
      (obj.unbonding_amount = message.unbonding_amount);
    message.commission !== undefined && (obj.commission = message.commission);
    message.moniker !== undefined && (obj.moniker = message.moniker);
    message.website !== undefined && (obj.website = message.website);
    message.logo !== undefined && (obj.logo = message.logo);
    message.points !== undefined && (obj.points = message.points);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Staker>, I>>(object: I): Staker {
    const message = createBaseStaker();
    message.address = object.address ?? "";
    message.pools = object.pools?.map((e) => e) || [];
    message.amount = object.amount ?? "0";
    message.unbonding_amount = object.unbonding_amount ?? "0";
    message.commission = object.commission ?? "";
    message.moniker = object.moniker ?? "";
    message.website = object.website ?? "";
    message.logo = object.logo ?? "";
    message.points = object.points ?? "0";
    return message;
  },
};

function createBaseCommissionChangeEntry(): CommissionChangeEntry {
  return { index: "0", staker: "", commission: "", creation_date: "0" };
}

export const CommissionChangeEntry = {
  encode(
    message: CommissionChangeEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.index !== "0") {
      writer.uint32(8).uint64(message.index);
    }
    if (message.staker !== "") {
      writer.uint32(18).string(message.staker);
    }
    if (message.commission !== "") {
      writer.uint32(26).string(message.commission);
    }
    if (message.creation_date !== "0") {
      writer.uint32(32).int64(message.creation_date);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CommissionChangeEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCommissionChangeEntry();
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
          message.commission = reader.string();
          break;
        case 4:
          message.creation_date = longToString(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CommissionChangeEntry {
    return {
      index: isSet(object.index) ? String(object.index) : "0",
      staker: isSet(object.staker) ? String(object.staker) : "",
      commission: isSet(object.commission) ? String(object.commission) : "",
      creation_date: isSet(object.creation_date)
        ? String(object.creation_date)
        : "0",
    };
  },

  toJSON(message: CommissionChangeEntry): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.staker !== undefined && (obj.staker = message.staker);
    message.commission !== undefined && (obj.commission = message.commission);
    message.creation_date !== undefined &&
      (obj.creation_date = message.creation_date);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommissionChangeEntry>, I>>(
    object: I
  ): CommissionChangeEntry {
    const message = createBaseCommissionChangeEntry();
    message.index = object.index ?? "0";
    message.staker = object.staker ?? "";
    message.commission = object.commission ?? "";
    message.creation_date = object.creation_date ?? "0";
    return message;
  },
};

function createBaseUnbondingStakeEntry(): UnbondingStakeEntry {
  return { index: "0", staker: "", amount: "0", creation_date: "0" };
}

export const UnbondingStakeEntry = {
  encode(
    message: UnbondingStakeEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.index !== "0") {
      writer.uint32(8).uint64(message.index);
    }
    if (message.staker !== "") {
      writer.uint32(18).string(message.staker);
    }
    if (message.amount !== "0") {
      writer.uint32(24).uint64(message.amount);
    }
    if (message.creation_date !== "0") {
      writer.uint32(32).int64(message.creation_date);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UnbondingStakeEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnbondingStakeEntry();
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
          message.amount = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.creation_date = longToString(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UnbondingStakeEntry {
    return {
      index: isSet(object.index) ? String(object.index) : "0",
      staker: isSet(object.staker) ? String(object.staker) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
      creation_date: isSet(object.creation_date)
        ? String(object.creation_date)
        : "0",
    };
  },

  toJSON(message: UnbondingStakeEntry): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.staker !== undefined && (obj.staker = message.staker);
    message.amount !== undefined && (obj.amount = message.amount);
    message.creation_date !== undefined &&
      (obj.creation_date = message.creation_date);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UnbondingStakeEntry>, I>>(
    object: I
  ): UnbondingStakeEntry {
    const message = createBaseUnbondingStakeEntry();
    message.index = object.index ?? "0";
    message.staker = object.staker ?? "";
    message.amount = object.amount ?? "0";
    message.creation_date = object.creation_date ?? "0";
    return message;
  },
};

function createBaseLeavePoolEntry(): LeavePoolEntry {
  return { index: "0", staker: "", poolId: "0", creation_date: "0" };
}

export const LeavePoolEntry = {
  encode(
    message: LeavePoolEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.index !== "0") {
      writer.uint32(8).uint64(message.index);
    }
    if (message.staker !== "") {
      writer.uint32(18).string(message.staker);
    }
    if (message.poolId !== "0") {
      writer.uint32(24).uint64(message.poolId);
    }
    if (message.creation_date !== "0") {
      writer.uint32(32).int64(message.creation_date);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LeavePoolEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLeavePoolEntry();
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
          message.poolId = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.creation_date = longToString(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LeavePoolEntry {
    return {
      index: isSet(object.index) ? String(object.index) : "0",
      staker: isSet(object.staker) ? String(object.staker) : "",
      poolId: isSet(object.poolId) ? String(object.poolId) : "0",
      creation_date: isSet(object.creation_date)
        ? String(object.creation_date)
        : "0",
    };
  },

  toJSON(message: LeavePoolEntry): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.staker !== undefined && (obj.staker = message.staker);
    message.poolId !== undefined && (obj.poolId = message.poolId);
    message.creation_date !== undefined &&
      (obj.creation_date = message.creation_date);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LeavePoolEntry>, I>>(
    object: I
  ): LeavePoolEntry {
    const message = createBaseLeavePoolEntry();
    message.index = object.index ?? "0";
    message.staker = object.staker ?? "";
    message.poolId = object.poolId ?? "0";
    message.creation_date = object.creation_date ?? "0";
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
