/* eslint-disable */
import {
  Pool,
  PoolStatus,
  poolStatusToNumber,
  poolStatusFromJSON,
  poolStatusToJSON,
} from "../../pool/v1beta1/pool";
import { BundleProposal } from "../../bundles/v1beta1/bundles";
import { Staker, Valaccount } from "../../stakers/v1beta1/stakers";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "KYVENetwork.chain.query";

export interface PoolResponse {
  /** id ... */
  id: string;
  /** data ... */
  data?: Pool;
  /** bundle_proposal ... */
  bundle_proposal?: BundleProposal;
  /** stakers ... */
  stakers: string[];
  /** total_stake ... */
  total_stake: string;
  /** status ... */
  status: PoolStatus;
}

export interface StakerResponse {
  /** staker ... */
  staker?: Staker;
  /** valaccounts ... */
  valaccounts: Valaccount[];
}

export interface StakerPoolResponse {
  /** staker ... */
  staker?: Staker;
  /** valaccount ... */
  valaccount?: Valaccount;
}

function createBasePoolResponse(): PoolResponse {
  return {
    id: "0",
    data: undefined,
    bundle_proposal: undefined,
    stakers: [],
    total_stake: "0",
    status: PoolStatus.POOL_STATUS_UNSPECIFIED,
  };
}

export const PoolResponse = {
  encode(
    message: PoolResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).uint64(message.id);
    }
    if (message.data !== undefined) {
      Pool.encode(message.data, writer.uint32(18).fork()).ldelim();
    }
    if (message.bundle_proposal !== undefined) {
      BundleProposal.encode(
        message.bundle_proposal,
        writer.uint32(26).fork()
      ).ldelim();
    }
    for (const v of message.stakers) {
      writer.uint32(34).string(v!);
    }
    if (message.total_stake !== "0") {
      writer.uint32(40).uint64(message.total_stake);
    }
    if (message.status !== PoolStatus.POOL_STATUS_UNSPECIFIED) {
      writer.uint32(48).int32(poolStatusToNumber(message.status));
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.data = Pool.decode(reader, reader.uint32());
          break;
        case 3:
          message.bundle_proposal = BundleProposal.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.stakers.push(reader.string());
          break;
        case 5:
          message.total_stake = longToString(reader.uint64() as Long);
          break;
        case 6:
          message.status = poolStatusFromJSON(reader.int32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PoolResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "0",
      data: isSet(object.data) ? Pool.fromJSON(object.data) : undefined,
      bundle_proposal: isSet(object.bundle_proposal)
        ? BundleProposal.fromJSON(object.bundle_proposal)
        : undefined,
      stakers: Array.isArray(object?.stakers)
        ? object.stakers.map((e: any) => String(e))
        : [],
      total_stake: isSet(object.total_stake) ? String(object.total_stake) : "0",
      status: isSet(object.status)
        ? poolStatusFromJSON(object.status)
        : PoolStatus.POOL_STATUS_UNSPECIFIED,
    };
  },

  toJSON(message: PoolResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.data !== undefined &&
      (obj.data = message.data ? Pool.toJSON(message.data) : undefined);
    message.bundle_proposal !== undefined &&
      (obj.bundle_proposal = message.bundle_proposal
        ? BundleProposal.toJSON(message.bundle_proposal)
        : undefined);
    if (message.stakers) {
      obj.stakers = message.stakers.map((e) => e);
    } else {
      obj.stakers = [];
    }
    message.total_stake !== undefined &&
      (obj.total_stake = message.total_stake);
    message.status !== undefined &&
      (obj.status = poolStatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PoolResponse>, I>>(
    object: I
  ): PoolResponse {
    const message = createBasePoolResponse();
    message.id = object.id ?? "0";
    message.data =
      object.data !== undefined && object.data !== null
        ? Pool.fromPartial(object.data)
        : undefined;
    message.bundle_proposal =
      object.bundle_proposal !== undefined && object.bundle_proposal !== null
        ? BundleProposal.fromPartial(object.bundle_proposal)
        : undefined;
    message.stakers = object.stakers?.map((e) => e) || [];
    message.total_stake = object.total_stake ?? "0";
    message.status = object.status ?? PoolStatus.POOL_STATUS_UNSPECIFIED;
    return message;
  },
};

function createBaseStakerResponse(): StakerResponse {
  return { staker: undefined, valaccounts: [] };
}

export const StakerResponse = {
  encode(
    message: StakerResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.staker !== undefined) {
      Staker.encode(message.staker, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.valaccounts) {
      Valaccount.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StakerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStakerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.staker = Staker.decode(reader, reader.uint32());
          break;
        case 2:
          message.valaccounts.push(Valaccount.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StakerResponse {
    return {
      staker: isSet(object.staker) ? Staker.fromJSON(object.staker) : undefined,
      valaccounts: Array.isArray(object?.valaccounts)
        ? object.valaccounts.map((e: any) => Valaccount.fromJSON(e))
        : [],
    };
  },

  toJSON(message: StakerResponse): unknown {
    const obj: any = {};
    message.staker !== undefined &&
      (obj.staker = message.staker ? Staker.toJSON(message.staker) : undefined);
    if (message.valaccounts) {
      obj.valaccounts = message.valaccounts.map((e) =>
        e ? Valaccount.toJSON(e) : undefined
      );
    } else {
      obj.valaccounts = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StakerResponse>, I>>(
    object: I
  ): StakerResponse {
    const message = createBaseStakerResponse();
    message.staker =
      object.staker !== undefined && object.staker !== null
        ? Staker.fromPartial(object.staker)
        : undefined;
    message.valaccounts =
      object.valaccounts?.map((e) => Valaccount.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStakerPoolResponse(): StakerPoolResponse {
  return { staker: undefined, valaccount: undefined };
}

export const StakerPoolResponse = {
  encode(
    message: StakerPoolResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.staker !== undefined) {
      Staker.encode(message.staker, writer.uint32(10).fork()).ldelim();
    }
    if (message.valaccount !== undefined) {
      Valaccount.encode(message.valaccount, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StakerPoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStakerPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.staker = Staker.decode(reader, reader.uint32());
          break;
        case 2:
          message.valaccount = Valaccount.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StakerPoolResponse {
    return {
      staker: isSet(object.staker) ? Staker.fromJSON(object.staker) : undefined,
      valaccount: isSet(object.valaccount)
        ? Valaccount.fromJSON(object.valaccount)
        : undefined,
    };
  },

  toJSON(message: StakerPoolResponse): unknown {
    const obj: any = {};
    message.staker !== undefined &&
      (obj.staker = message.staker ? Staker.toJSON(message.staker) : undefined);
    message.valaccount !== undefined &&
      (obj.valaccount = message.valaccount
        ? Valaccount.toJSON(message.valaccount)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StakerPoolResponse>, I>>(
    object: I
  ): StakerPoolResponse {
    const message = createBaseStakerPoolResponse();
    message.staker =
      object.staker !== undefined && object.staker !== null
        ? Staker.fromPartial(object.staker)
        : undefined;
    message.valaccount =
      object.valaccount !== undefined && object.valaccount !== null
        ? Valaccount.fromPartial(object.valaccount)
        : undefined;
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
