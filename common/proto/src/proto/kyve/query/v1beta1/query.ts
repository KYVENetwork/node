/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kyve.query.v1beta1";

/**
 * BasicPool contains the necessary properties need for a pool
 * to be displayed in the UI
 */
export interface BasicPool {
  /** id ... */
  id: string;
  /** name ... */
  name: string;
  /** runtime ... */
  runtime: string;
  /** logo ... */
  logo: string;
  /** total_funds ... */
  total_funds: string;
}

export interface FullStaker {
  address: string;
  metadata?: StakerMetadata;
  /** amount ... */
  amount: string;
  /** unbonding_amount ... */
  unbonding_amount: string;
  /** total_delegation ... */
  total_delegation: string;
  /** delegator_count ... */
  delegator_count: string;
  pools: PoolMembership[];
}

/**
 * BasicStaker contains the necessary properties need for a staker
 * to be displayed in the UI
 */
export interface StakerMetadata {
  /** commission ... */
  commission: string;
  /** moniker ... */
  moniker: string;
  /** website ... */
  website: string;
  /** logo ... */
  logo: string;
  /** pending_commission_change ... */
  pending_commission_change?: CommissionChangeEntry;
}

export interface CommissionChangeEntry {
  /** commission ... */
  commission: string;
  /** creation_date ... */
  creation_date: string;
}

export interface PoolMembership {
  pool?: BasicPool;
  points: string;
  isLeaving: boolean;
  valaccount: string;
}

function createBaseBasicPool(): BasicPool {
  return { id: "0", name: "", runtime: "", logo: "", total_funds: "0" };
}

export const BasicPool = {
  encode(
    message: BasicPool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).uint64(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.runtime !== "") {
      writer.uint32(26).string(message.runtime);
    }
    if (message.logo !== "") {
      writer.uint32(34).string(message.logo);
    }
    if (message.total_funds !== "0") {
      writer.uint32(40).uint64(message.total_funds);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BasicPool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBasicPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.runtime = reader.string();
          break;
        case 4:
          message.logo = reader.string();
          break;
        case 5:
          message.total_funds = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): BasicPool {
    return {
      id: isSet(object.id) ? String(object.id) : "0",
      name: isSet(object.name) ? String(object.name) : "",
      runtime: isSet(object.runtime) ? String(object.runtime) : "",
      logo: isSet(object.logo) ? String(object.logo) : "",
      total_funds: isSet(object.total_funds) ? String(object.total_funds) : "0",
    };
  },

  toJSON(message: BasicPool): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.runtime !== undefined && (obj.runtime = message.runtime);
    message.logo !== undefined && (obj.logo = message.logo);
    message.total_funds !== undefined &&
      (obj.total_funds = message.total_funds);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BasicPool>, I>>(
    object: I
  ): BasicPool {
    const message = createBaseBasicPool();
    message.id = object.id ?? "0";
    message.name = object.name ?? "";
    message.runtime = object.runtime ?? "";
    message.logo = object.logo ?? "";
    message.total_funds = object.total_funds ?? "0";
    return message;
  },
};

function createBaseFullStaker(): FullStaker {
  return {
    address: "",
    metadata: undefined,
    amount: "0",
    unbonding_amount: "0",
    total_delegation: "0",
    delegator_count: "0",
    pools: [],
  };
}

export const FullStaker = {
  encode(
    message: FullStaker,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.metadata !== undefined) {
      StakerMetadata.encode(
        message.metadata,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.amount !== "0") {
      writer.uint32(24).uint64(message.amount);
    }
    if (message.unbonding_amount !== "0") {
      writer.uint32(32).uint64(message.unbonding_amount);
    }
    if (message.total_delegation !== "0") {
      writer.uint32(64).uint64(message.total_delegation);
    }
    if (message.delegator_count !== "0") {
      writer.uint32(40).uint64(message.delegator_count);
    }
    for (const v of message.pools) {
      PoolMembership.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FullStaker {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFullStaker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.metadata = StakerMetadata.decode(reader, reader.uint32());
          break;
        case 3:
          message.amount = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.unbonding_amount = longToString(reader.uint64() as Long);
          break;
        case 8:
          message.total_delegation = longToString(reader.uint64() as Long);
          break;
        case 5:
          message.delegator_count = longToString(reader.uint64() as Long);
          break;
        case 6:
          message.pools.push(PoolMembership.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FullStaker {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      metadata: isSet(object.metadata)
        ? StakerMetadata.fromJSON(object.metadata)
        : undefined,
      amount: isSet(object.amount) ? String(object.amount) : "0",
      unbonding_amount: isSet(object.unbonding_amount)
        ? String(object.unbonding_amount)
        : "0",
      total_delegation: isSet(object.total_delegation)
        ? String(object.total_delegation)
        : "0",
      delegator_count: isSet(object.delegator_count)
        ? String(object.delegator_count)
        : "0",
      pools: Array.isArray(object?.pools)
        ? object.pools.map((e: any) => PoolMembership.fromJSON(e))
        : [],
    };
  },

  toJSON(message: FullStaker): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? StakerMetadata.toJSON(message.metadata)
        : undefined);
    message.amount !== undefined && (obj.amount = message.amount);
    message.unbonding_amount !== undefined &&
      (obj.unbonding_amount = message.unbonding_amount);
    message.total_delegation !== undefined &&
      (obj.total_delegation = message.total_delegation);
    message.delegator_count !== undefined &&
      (obj.delegator_count = message.delegator_count);
    if (message.pools) {
      obj.pools = message.pools.map((e) =>
        e ? PoolMembership.toJSON(e) : undefined
      );
    } else {
      obj.pools = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FullStaker>, I>>(
    object: I
  ): FullStaker {
    const message = createBaseFullStaker();
    message.address = object.address ?? "";
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? StakerMetadata.fromPartial(object.metadata)
        : undefined;
    message.amount = object.amount ?? "0";
    message.unbonding_amount = object.unbonding_amount ?? "0";
    message.total_delegation = object.total_delegation ?? "0";
    message.delegator_count = object.delegator_count ?? "0";
    message.pools =
      object.pools?.map((e) => PoolMembership.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStakerMetadata(): StakerMetadata {
  return {
    commission: "",
    moniker: "",
    website: "",
    logo: "",
    pending_commission_change: undefined,
  };
}

export const StakerMetadata = {
  encode(
    message: StakerMetadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.commission !== "") {
      writer.uint32(34).string(message.commission);
    }
    if (message.moniker !== "") {
      writer.uint32(42).string(message.moniker);
    }
    if (message.website !== "") {
      writer.uint32(50).string(message.website);
    }
    if (message.logo !== "") {
      writer.uint32(58).string(message.logo);
    }
    if (message.pending_commission_change !== undefined) {
      CommissionChangeEntry.encode(
        message.pending_commission_change,
        writer.uint32(74).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StakerMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStakerMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 4:
          message.commission = reader.string();
          break;
        case 5:
          message.moniker = reader.string();
          break;
        case 6:
          message.website = reader.string();
          break;
        case 7:
          message.logo = reader.string();
          break;
        case 9:
          message.pending_commission_change = CommissionChangeEntry.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StakerMetadata {
    return {
      commission: isSet(object.commission) ? String(object.commission) : "",
      moniker: isSet(object.moniker) ? String(object.moniker) : "",
      website: isSet(object.website) ? String(object.website) : "",
      logo: isSet(object.logo) ? String(object.logo) : "",
      pending_commission_change: isSet(object.pending_commission_change)
        ? CommissionChangeEntry.fromJSON(object.pending_commission_change)
        : undefined,
    };
  },

  toJSON(message: StakerMetadata): unknown {
    const obj: any = {};
    message.commission !== undefined && (obj.commission = message.commission);
    message.moniker !== undefined && (obj.moniker = message.moniker);
    message.website !== undefined && (obj.website = message.website);
    message.logo !== undefined && (obj.logo = message.logo);
    message.pending_commission_change !== undefined &&
      (obj.pending_commission_change = message.pending_commission_change
        ? CommissionChangeEntry.toJSON(message.pending_commission_change)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StakerMetadata>, I>>(
    object: I
  ): StakerMetadata {
    const message = createBaseStakerMetadata();
    message.commission = object.commission ?? "";
    message.moniker = object.moniker ?? "";
    message.website = object.website ?? "";
    message.logo = object.logo ?? "";
    message.pending_commission_change =
      object.pending_commission_change !== undefined &&
      object.pending_commission_change !== null
        ? CommissionChangeEntry.fromPartial(object.pending_commission_change)
        : undefined;
    return message;
  },
};

function createBaseCommissionChangeEntry(): CommissionChangeEntry {
  return { commission: "", creation_date: "0" };
}

export const CommissionChangeEntry = {
  encode(
    message: CommissionChangeEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.commission !== "") {
      writer.uint32(10).string(message.commission);
    }
    if (message.creation_date !== "0") {
      writer.uint32(16).int64(message.creation_date);
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
          message.commission = reader.string();
          break;
        case 2:
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
      commission: isSet(object.commission) ? String(object.commission) : "",
      creation_date: isSet(object.creation_date)
        ? String(object.creation_date)
        : "0",
    };
  },

  toJSON(message: CommissionChangeEntry): unknown {
    const obj: any = {};
    message.commission !== undefined && (obj.commission = message.commission);
    message.creation_date !== undefined &&
      (obj.creation_date = message.creation_date);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CommissionChangeEntry>, I>>(
    object: I
  ): CommissionChangeEntry {
    const message = createBaseCommissionChangeEntry();
    message.commission = object.commission ?? "";
    message.creation_date = object.creation_date ?? "0";
    return message;
  },
};

function createBasePoolMembership(): PoolMembership {
  return { pool: undefined, points: "0", isLeaving: false, valaccount: "" };
}

export const PoolMembership = {
  encode(
    message: PoolMembership,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool !== undefined) {
      BasicPool.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    if (message.points !== "0") {
      writer.uint32(16).uint64(message.points);
    }
    if (message.isLeaving === true) {
      writer.uint32(24).bool(message.isLeaving);
    }
    if (message.valaccount !== "") {
      writer.uint32(34).string(message.valaccount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolMembership {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolMembership();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool = BasicPool.decode(reader, reader.uint32());
          break;
        case 2:
          message.points = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.isLeaving = reader.bool();
          break;
        case 4:
          message.valaccount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PoolMembership {
    return {
      pool: isSet(object.pool) ? BasicPool.fromJSON(object.pool) : undefined,
      points: isSet(object.points) ? String(object.points) : "0",
      isLeaving: isSet(object.isLeaving) ? Boolean(object.isLeaving) : false,
      valaccount: isSet(object.valaccount) ? String(object.valaccount) : "",
    };
  },

  toJSON(message: PoolMembership): unknown {
    const obj: any = {};
    message.pool !== undefined &&
      (obj.pool = message.pool ? BasicPool.toJSON(message.pool) : undefined);
    message.points !== undefined && (obj.points = message.points);
    message.isLeaving !== undefined && (obj.isLeaving = message.isLeaving);
    message.valaccount !== undefined && (obj.valaccount = message.valaccount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PoolMembership>, I>>(
    object: I
  ): PoolMembership {
    const message = createBasePoolMembership();
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? BasicPool.fromPartial(object.pool)
        : undefined;
    message.points = object.points ?? "0";
    message.isLeaving = object.isLeaving ?? false;
    message.valaccount = object.valaccount ?? "";
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
