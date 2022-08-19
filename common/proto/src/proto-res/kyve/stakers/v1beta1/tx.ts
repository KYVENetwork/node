/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kyve.stakers.v1beta1";

/** MsgStakePool defines a SDK message for staking in a pool. */
export interface MsgStake {
  /** creator ... */
  creator: string;
  /** amount ... */
  amount: string;
}

/** MsgStakePoolResponse defines the Msg/StakePool response type. */
export interface MsgStakeResponse {}

/** MsgUnstakePool defines a SDK message for unstaking from a pool. */
export interface MsgUnstake {
  /** creator ... */
  creator: string;
  /** amount ... */
  amount: string;
}

/** MsgUnstakePoolResponse defines the Msg/UnstakePool response type. */
export interface MsgUnstakeResponse {}

/** MsgUpdateMetadata defines a SDK message for claiming the uploader role. */
export interface MsgUpdateMetadata {
  /** creator ... */
  creator: string;
  /** moniker ... */
  moniker: string;
  /** website ... */
  website: string;
  /** logo */
  logo: string;
}

/** MsgUpdateMetadataResponse defines the Msg/MsgUpdateMetadata response type. */
export interface MsgUpdateMetadataResponse {}

/** MsgUpdateCommission ... */
export interface MsgUpdateCommission {
  /** creator ... */
  creator: string;
  /** commission ... */
  commission: string;
}

/** MsgUpdateCommissionResponse ... */
export interface MsgUpdateCommissionResponse {}

/** MsgJoinPool ... */
export interface MsgJoinPool {
  /** creator ... */
  creator: string;
  /** pool_id ... */
  pool_id: string;
  /** valaddress ... */
  valaddress: string;
  /** amount ... */
  amount: string;
}

/** MsgJoinPoolResponse ... */
export interface MsgJoinPoolResponse {}

/** MsgLeavePool ... */
export interface MsgLeavePool {
  /** creator ... */
  creator: string;
  /** pool_id ... */
  pool_id: string;
}

/** MsgReactivateStakerResponse ... */
export interface MsgLeavePoolResponse {}

function createBaseMsgStake(): MsgStake {
  return { creator: "", amount: "0" };
}

export const MsgStake = {
  encode(
    message: MsgStake,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.amount !== "0") {
      writer.uint32(16).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStake {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
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

  fromJSON(object: any): MsgStake {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
    };
  },

  toJSON(message: MsgStake): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStake>, I>>(object: I): MsgStake {
    const message = createBaseMsgStake();
    message.creator = object.creator ?? "";
    message.amount = object.amount ?? "0";
    return message;
  },
};

function createBaseMsgStakeResponse(): MsgStakeResponse {
  return {};
}

export const MsgStakeResponse = {
  encode(
    _: MsgStakeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgStakeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStakeResponse();
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

  fromJSON(_: any): MsgStakeResponse {
    return {};
  },

  toJSON(_: MsgStakeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgStakeResponse>, I>>(
    _: I
  ): MsgStakeResponse {
    const message = createBaseMsgStakeResponse();
    return message;
  },
};

function createBaseMsgUnstake(): MsgUnstake {
  return { creator: "", amount: "0" };
}

export const MsgUnstake = {
  encode(
    message: MsgUnstake,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.amount !== "0") {
      writer.uint32(16).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnstake {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnstake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
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

  fromJSON(object: any): MsgUnstake {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
    };
  },

  toJSON(message: MsgUnstake): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnstake>, I>>(
    object: I
  ): MsgUnstake {
    const message = createBaseMsgUnstake();
    message.creator = object.creator ?? "";
    message.amount = object.amount ?? "0";
    return message;
  },
};

function createBaseMsgUnstakeResponse(): MsgUnstakeResponse {
  return {};
}

export const MsgUnstakeResponse = {
  encode(
    _: MsgUnstakeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnstakeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUnstakeResponse();
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

  fromJSON(_: any): MsgUnstakeResponse {
    return {};
  },

  toJSON(_: MsgUnstakeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUnstakeResponse>, I>>(
    _: I
  ): MsgUnstakeResponse {
    const message = createBaseMsgUnstakeResponse();
    return message;
  },
};

function createBaseMsgUpdateMetadata(): MsgUpdateMetadata {
  return { creator: "", moniker: "", website: "", logo: "" };
}

export const MsgUpdateMetadata = {
  encode(
    message: MsgUpdateMetadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
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

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
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

  fromJSON(object: any): MsgUpdateMetadata {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      moniker: isSet(object.moniker) ? String(object.moniker) : "",
      website: isSet(object.website) ? String(object.website) : "",
      logo: isSet(object.logo) ? String(object.logo) : "",
    };
  },

  toJSON(message: MsgUpdateMetadata): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.moniker !== undefined && (obj.moniker = message.moniker);
    message.website !== undefined && (obj.website = message.website);
    message.logo !== undefined && (obj.logo = message.logo);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateMetadata>, I>>(
    object: I
  ): MsgUpdateMetadata {
    const message = createBaseMsgUpdateMetadata();
    message.creator = object.creator ?? "";
    message.moniker = object.moniker ?? "";
    message.website = object.website ?? "";
    message.logo = object.logo ?? "";
    return message;
  },
};

function createBaseMsgUpdateMetadataResponse(): MsgUpdateMetadataResponse {
  return {};
}

export const MsgUpdateMetadataResponse = {
  encode(
    _: MsgUpdateMetadataResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateMetadataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateMetadataResponse();
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

  fromJSON(_: any): MsgUpdateMetadataResponse {
    return {};
  },

  toJSON(_: MsgUpdateMetadataResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateMetadataResponse>, I>>(
    _: I
  ): MsgUpdateMetadataResponse {
    const message = createBaseMsgUpdateMetadataResponse();
    return message;
  },
};

function createBaseMsgUpdateCommission(): MsgUpdateCommission {
  return { creator: "", commission: "" };
}

export const MsgUpdateCommission = {
  encode(
    message: MsgUpdateCommission,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.commission !== "") {
      writer.uint32(18).string(message.commission);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateCommission {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateCommission();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
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

  fromJSON(object: any): MsgUpdateCommission {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      commission: isSet(object.commission) ? String(object.commission) : "",
    };
  },

  toJSON(message: MsgUpdateCommission): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.commission !== undefined && (obj.commission = message.commission);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateCommission>, I>>(
    object: I
  ): MsgUpdateCommission {
    const message = createBaseMsgUpdateCommission();
    message.creator = object.creator ?? "";
    message.commission = object.commission ?? "";
    return message;
  },
};

function createBaseMsgUpdateCommissionResponse(): MsgUpdateCommissionResponse {
  return {};
}

export const MsgUpdateCommissionResponse = {
  encode(
    _: MsgUpdateCommissionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateCommissionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateCommissionResponse();
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

  fromJSON(_: any): MsgUpdateCommissionResponse {
    return {};
  },

  toJSON(_: MsgUpdateCommissionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateCommissionResponse>, I>>(
    _: I
  ): MsgUpdateCommissionResponse {
    const message = createBaseMsgUpdateCommissionResponse();
    return message;
  },
};

function createBaseMsgJoinPool(): MsgJoinPool {
  return { creator: "", pool_id: "0", valaddress: "", amount: "0" };
}

export const MsgJoinPool = {
  encode(
    message: MsgJoinPool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.pool_id !== "0") {
      writer.uint32(16).uint64(message.pool_id);
    }
    if (message.valaddress !== "") {
      writer.uint32(26).string(message.valaddress);
    }
    if (message.amount !== "0") {
      writer.uint32(32).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgJoinPool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgJoinPool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.pool_id = longToString(reader.uint64() as Long);
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

  fromJSON(object: any): MsgJoinPool {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      valaddress: isSet(object.valaddress) ? String(object.valaddress) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
    };
  },

  toJSON(message: MsgJoinPool): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.valaddress !== undefined && (obj.valaddress = message.valaddress);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgJoinPool>, I>>(
    object: I
  ): MsgJoinPool {
    const message = createBaseMsgJoinPool();
    message.creator = object.creator ?? "";
    message.pool_id = object.pool_id ?? "0";
    message.valaddress = object.valaddress ?? "";
    message.amount = object.amount ?? "0";
    return message;
  },
};

function createBaseMsgJoinPoolResponse(): MsgJoinPoolResponse {
  return {};
}

export const MsgJoinPoolResponse = {
  encode(
    _: MsgJoinPoolResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgJoinPoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgJoinPoolResponse();
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

  fromJSON(_: any): MsgJoinPoolResponse {
    return {};
  },

  toJSON(_: MsgJoinPoolResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgJoinPoolResponse>, I>>(
    _: I
  ): MsgJoinPoolResponse {
    const message = createBaseMsgJoinPoolResponse();
    return message;
  },
};

function createBaseMsgLeavePool(): MsgLeavePool {
  return { creator: "", pool_id: "0" };
}

export const MsgLeavePool = {
  encode(
    message: MsgLeavePool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.pool_id !== "0") {
      writer.uint32(16).uint64(message.pool_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgLeavePool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLeavePool();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
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

  fromJSON(object: any): MsgLeavePool {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
    };
  },

  toJSON(message: MsgLeavePool): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgLeavePool>, I>>(
    object: I
  ): MsgLeavePool {
    const message = createBaseMsgLeavePool();
    message.creator = object.creator ?? "";
    message.pool_id = object.pool_id ?? "0";
    return message;
  },
};

function createBaseMsgLeavePoolResponse(): MsgLeavePoolResponse {
  return {};
}

export const MsgLeavePoolResponse = {
  encode(
    _: MsgLeavePoolResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgLeavePoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLeavePoolResponse();
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

  fromJSON(_: any): MsgLeavePoolResponse {
    return {};
  },

  toJSON(_: MsgLeavePoolResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgLeavePoolResponse>, I>>(
    _: I
  ): MsgLeavePoolResponse {
    const message = createBaseMsgLeavePoolResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** StakePool ... */
  Stake(request: MsgStake): Promise<MsgStakeResponse>;
  /** UnstakePool ... */
  Unstake(request: MsgUnstake): Promise<MsgUnstakeResponse>;
  /** UpdateMetadata ... */
  UpdateMetadata(
    request: MsgUpdateMetadata
  ): Promise<MsgUpdateMetadataResponse>;
  /** UpdateCommission ... */
  UpdateCommission(
    request: MsgUpdateCommission
  ): Promise<MsgUpdateCommissionResponse>;
  /** JoinPool ... */
  JoinPool(request: MsgJoinPool): Promise<MsgJoinPoolResponse>;
  /** LeavePool ... */
  LeavePool(request: MsgLeavePool): Promise<MsgLeavePoolResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Stake = this.Stake.bind(this);
    this.Unstake = this.Unstake.bind(this);
    this.UpdateMetadata = this.UpdateMetadata.bind(this);
    this.UpdateCommission = this.UpdateCommission.bind(this);
    this.JoinPool = this.JoinPool.bind(this);
    this.LeavePool = this.LeavePool.bind(this);
  }
  Stake(request: MsgStake): Promise<MsgStakeResponse> {
    const data = MsgStake.encode(request).finish();
    const promise = this.rpc.request("kyve.stakers.v1beta1.Msg", "Stake", data);
    return promise.then((data) =>
      MsgStakeResponse.decode(new _m0.Reader(data))
    );
  }

  Unstake(request: MsgUnstake): Promise<MsgUnstakeResponse> {
    const data = MsgUnstake.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.stakers.v1beta1.Msg",
      "Unstake",
      data
    );
    return promise.then((data) =>
      MsgUnstakeResponse.decode(new _m0.Reader(data))
    );
  }

  UpdateMetadata(
    request: MsgUpdateMetadata
  ): Promise<MsgUpdateMetadataResponse> {
    const data = MsgUpdateMetadata.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.stakers.v1beta1.Msg",
      "UpdateMetadata",
      data
    );
    return promise.then((data) =>
      MsgUpdateMetadataResponse.decode(new _m0.Reader(data))
    );
  }

  UpdateCommission(
    request: MsgUpdateCommission
  ): Promise<MsgUpdateCommissionResponse> {
    const data = MsgUpdateCommission.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.stakers.v1beta1.Msg",
      "UpdateCommission",
      data
    );
    return promise.then((data) =>
      MsgUpdateCommissionResponse.decode(new _m0.Reader(data))
    );
  }

  JoinPool(request: MsgJoinPool): Promise<MsgJoinPoolResponse> {
    const data = MsgJoinPool.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.stakers.v1beta1.Msg",
      "JoinPool",
      data
    );
    return promise.then((data) =>
      MsgJoinPoolResponse.decode(new _m0.Reader(data))
    );
  }

  LeavePool(request: MsgLeavePool): Promise<MsgLeavePoolResponse> {
    const data = MsgLeavePool.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.stakers.v1beta1.Msg",
      "LeavePool",
      data
    );
    return promise.then((data) =>
      MsgLeavePoolResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
