/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kyve.registry.v1beta1";

/** Params defines the set of params for the registry module. */
export interface Params {
  /** vote_slash ... */
  vote_slash: string;
  /** upload_slash ... */
  upload_slash: string;
  /** timeout_slash ... */
  timeout_slash: string;
  /** upload_timeout ... */
  upload_timeout: string;
  /** storage_cost ... */
  storage_cost: string;
  /** network_fee ... */
  network_fee: string;
  /** max_points ... */
  max_points: string;
  /** unbonding_staking_time ... */
  unbonding_staking_time: string;
  /** unbonding_delegation_time ... */
  unbonding_delegation_time: string;
  /** unbonding_delegation_time ... */
  redelegation_cooldown: string;
  /** unbonding_delegation_time ... */
  redelegation_max_amount: string;
  /** commission_change_time ... */
  commission_change_time: string;
}

function createBaseParams(): Params {
  return {
    vote_slash: "",
    upload_slash: "",
    timeout_slash: "",
    upload_timeout: "0",
    storage_cost: "0",
    network_fee: "",
    max_points: "0",
    unbonding_staking_time: "0",
    unbonding_delegation_time: "0",
    redelegation_cooldown: "0",
    redelegation_max_amount: "0",
    commission_change_time: "0",
  };
}

export const Params = {
  encode(
    message: Params,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.vote_slash !== "") {
      writer.uint32(26).string(message.vote_slash);
    }
    if (message.upload_slash !== "") {
      writer.uint32(34).string(message.upload_slash);
    }
    if (message.timeout_slash !== "") {
      writer.uint32(42).string(message.timeout_slash);
    }
    if (message.upload_timeout !== "0") {
      writer.uint32(48).uint64(message.upload_timeout);
    }
    if (message.storage_cost !== "0") {
      writer.uint32(56).uint64(message.storage_cost);
    }
    if (message.network_fee !== "") {
      writer.uint32(66).string(message.network_fee);
    }
    if (message.max_points !== "0") {
      writer.uint32(72).uint64(message.max_points);
    }
    if (message.unbonding_staking_time !== "0") {
      writer.uint32(80).uint64(message.unbonding_staking_time);
    }
    if (message.unbonding_delegation_time !== "0") {
      writer.uint32(88).uint64(message.unbonding_delegation_time);
    }
    if (message.redelegation_cooldown !== "0") {
      writer.uint32(96).uint64(message.redelegation_cooldown);
    }
    if (message.redelegation_max_amount !== "0") {
      writer.uint32(104).uint64(message.redelegation_max_amount);
    }
    if (message.commission_change_time !== "0") {
      writer.uint32(112).uint64(message.commission_change_time);
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
        case 3:
          message.vote_slash = reader.string();
          break;
        case 4:
          message.upload_slash = reader.string();
          break;
        case 5:
          message.timeout_slash = reader.string();
          break;
        case 6:
          message.upload_timeout = longToString(reader.uint64() as Long);
          break;
        case 7:
          message.storage_cost = longToString(reader.uint64() as Long);
          break;
        case 8:
          message.network_fee = reader.string();
          break;
        case 9:
          message.max_points = longToString(reader.uint64() as Long);
          break;
        case 10:
          message.unbonding_staking_time = longToString(
            reader.uint64() as Long
          );
          break;
        case 11:
          message.unbonding_delegation_time = longToString(
            reader.uint64() as Long
          );
          break;
        case 12:
          message.redelegation_cooldown = longToString(reader.uint64() as Long);
          break;
        case 13:
          message.redelegation_max_amount = longToString(
            reader.uint64() as Long
          );
          break;
        case 14:
          message.commission_change_time = longToString(
            reader.uint64() as Long
          );
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
      vote_slash: isSet(object.vote_slash) ? String(object.vote_slash) : "",
      upload_slash: isSet(object.upload_slash)
        ? String(object.upload_slash)
        : "",
      timeout_slash: isSet(object.timeout_slash)
        ? String(object.timeout_slash)
        : "",
      upload_timeout: isSet(object.upload_timeout)
        ? String(object.upload_timeout)
        : "0",
      storage_cost: isSet(object.storage_cost)
        ? String(object.storage_cost)
        : "0",
      network_fee: isSet(object.network_fee) ? String(object.network_fee) : "",
      max_points: isSet(object.max_points) ? String(object.max_points) : "0",
      unbonding_staking_time: isSet(object.unbonding_staking_time)
        ? String(object.unbonding_staking_time)
        : "0",
      unbonding_delegation_time: isSet(object.unbonding_delegation_time)
        ? String(object.unbonding_delegation_time)
        : "0",
      redelegation_cooldown: isSet(object.redelegation_cooldown)
        ? String(object.redelegation_cooldown)
        : "0",
      redelegation_max_amount: isSet(object.redelegation_max_amount)
        ? String(object.redelegation_max_amount)
        : "0",
      commission_change_time: isSet(object.commission_change_time)
        ? String(object.commission_change_time)
        : "0",
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.vote_slash !== undefined && (obj.vote_slash = message.vote_slash);
    message.upload_slash !== undefined &&
      (obj.upload_slash = message.upload_slash);
    message.timeout_slash !== undefined &&
      (obj.timeout_slash = message.timeout_slash);
    message.upload_timeout !== undefined &&
      (obj.upload_timeout = message.upload_timeout);
    message.storage_cost !== undefined &&
      (obj.storage_cost = message.storage_cost);
    message.network_fee !== undefined &&
      (obj.network_fee = message.network_fee);
    message.max_points !== undefined && (obj.max_points = message.max_points);
    message.unbonding_staking_time !== undefined &&
      (obj.unbonding_staking_time = message.unbonding_staking_time);
    message.unbonding_delegation_time !== undefined &&
      (obj.unbonding_delegation_time = message.unbonding_delegation_time);
    message.redelegation_cooldown !== undefined &&
      (obj.redelegation_cooldown = message.redelegation_cooldown);
    message.redelegation_max_amount !== undefined &&
      (obj.redelegation_max_amount = message.redelegation_max_amount);
    message.commission_change_time !== undefined &&
      (obj.commission_change_time = message.commission_change_time);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.vote_slash = object.vote_slash ?? "";
    message.upload_slash = object.upload_slash ?? "";
    message.timeout_slash = object.timeout_slash ?? "";
    message.upload_timeout = object.upload_timeout ?? "0";
    message.storage_cost = object.storage_cost ?? "0";
    message.network_fee = object.network_fee ?? "";
    message.max_points = object.max_points ?? "0";
    message.unbonding_staking_time = object.unbonding_staking_time ?? "0";
    message.unbonding_delegation_time = object.unbonding_delegation_time ?? "0";
    message.redelegation_cooldown = object.redelegation_cooldown ?? "0";
    message.redelegation_max_amount = object.redelegation_max_amount ?? "0";
    message.commission_change_time = object.commission_change_time ?? "0";
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
