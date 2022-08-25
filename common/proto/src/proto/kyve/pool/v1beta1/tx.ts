/* eslint-disable */
import Long from "long";
import {
  GovMsgCreatePoolResponse,
  GovMsgUpdatePoolResponse,
  GovMsgPausePoolResponse,
  GovMsgUnpausePoolResponse,
  GovMsgPoolUpgradeResponse,
  GovMsgCancelPoolUpgradeResponse,
  GovMsgCreatePool,
  GovMsgUpdatePool,
  GovMsgPausePool,
  GovMsgUnpausePool,
  GovMsgPoolUpgrade,
  GovMsgCancelPoolUpgrade,
} from "./gov";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kyve.pool.v1beta1";

/** MsgFundPool defines a SDK message for funding a pool. */
export interface MsgFundPool {
  /** creator ... */
  creator: string;
  /** id ... */
  id: string;
  /** amount ... */
  amount: string;
}

/** MsgFundPoolResponse defines the Msg/DefundPool response type. */
export interface MsgFundPoolResponse {}

/** MsgDefundPool defines a SDK message for defunding a pool. */
export interface MsgDefundPool {
  /** creator ... */
  creator: string;
  /** id ... */
  id: string;
  /** amount ... */
  amount: string;
}

/** MsgDefundPoolResponse defines the Msg/DefundPool response type. */
export interface MsgDefundPoolResponse {}

function createBaseMsgFundPool(): MsgFundPool {
  return { creator: "", id: "0", amount: "0" };
}

export const MsgFundPool = {
  encode(
    message: MsgFundPool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "0") {
      writer.uint32(16).uint64(message.id);
    }
    if (message.amount !== "0") {
      writer.uint32(24).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFundPool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFundPool();
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
          message.amount = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgFundPool {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? String(object.id) : "0",
      amount: isSet(object.amount) ? String(object.amount) : "0",
    };
  },

  toJSON(message: MsgFundPool): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgFundPool>, I>>(
    object: I
  ): MsgFundPool {
    const message = createBaseMsgFundPool();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "0";
    message.amount = object.amount ?? "0";
    return message;
  },
};

function createBaseMsgFundPoolResponse(): MsgFundPoolResponse {
  return {};
}

export const MsgFundPoolResponse = {
  encode(
    _: MsgFundPoolResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFundPoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFundPoolResponse();
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

  fromJSON(_: any): MsgFundPoolResponse {
    return {};
  },

  toJSON(_: MsgFundPoolResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgFundPoolResponse>, I>>(
    _: I
  ): MsgFundPoolResponse {
    const message = createBaseMsgFundPoolResponse();
    return message;
  },
};

function createBaseMsgDefundPool(): MsgDefundPool {
  return { creator: "", id: "0", amount: "0" };
}

export const MsgDefundPool = {
  encode(
    message: MsgDefundPool,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.id !== "0") {
      writer.uint32(16).uint64(message.id);
    }
    if (message.amount !== "0") {
      writer.uint32(24).uint64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDefundPool {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDefundPool();
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
          message.amount = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDefundPool {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      id: isSet(object.id) ? String(object.id) : "0",
      amount: isSet(object.amount) ? String(object.amount) : "0",
    };
  },

  toJSON(message: MsgDefundPool): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.id !== undefined && (obj.id = message.id);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDefundPool>, I>>(
    object: I
  ): MsgDefundPool {
    const message = createBaseMsgDefundPool();
    message.creator = object.creator ?? "";
    message.id = object.id ?? "0";
    message.amount = object.amount ?? "0";
    return message;
  },
};

function createBaseMsgDefundPoolResponse(): MsgDefundPoolResponse {
  return {};
}

export const MsgDefundPoolResponse = {
  encode(
    _: MsgDefundPoolResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDefundPoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDefundPoolResponse();
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

  fromJSON(_: any): MsgDefundPoolResponse {
    return {};
  },

  toJSON(_: MsgDefundPoolResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgDefundPoolResponse>, I>>(
    _: I
  ): MsgDefundPoolResponse {
    const message = createBaseMsgDefundPoolResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** FundPool ... */
  FundPool(request: MsgFundPool): Promise<MsgFundPoolResponse>;
  /** DefundPool ... */
  DefundPool(request: MsgDefundPool): Promise<MsgDefundPoolResponse>;
  /** CreatePool ... */
  CreatePool(request: GovMsgCreatePool): Promise<GovMsgCreatePoolResponse>;
  /** UpdatePool ... */
  UpdatePool(request: GovMsgUpdatePool): Promise<GovMsgUpdatePoolResponse>;
  /** PausePool ... */
  PausePool(request: GovMsgPausePool): Promise<GovMsgPausePoolResponse>;
  /** UpdatePool ... */
  UnpausePool(request: GovMsgUnpausePool): Promise<GovMsgUnpausePoolResponse>;
  /** UpdatePool ... */
  PoolUpgrade(request: GovMsgPoolUpgrade): Promise<GovMsgPoolUpgradeResponse>;
  /** UpdatePool ... */
  CancelPoolUpgrade(
    request: GovMsgCancelPoolUpgrade
  ): Promise<GovMsgCancelPoolUpgradeResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.FundPool = this.FundPool.bind(this);
    this.DefundPool = this.DefundPool.bind(this);
    this.CreatePool = this.CreatePool.bind(this);
    this.UpdatePool = this.UpdatePool.bind(this);
    this.PausePool = this.PausePool.bind(this);
    this.UnpausePool = this.UnpausePool.bind(this);
    this.PoolUpgrade = this.PoolUpgrade.bind(this);
    this.CancelPoolUpgrade = this.CancelPoolUpgrade.bind(this);
  }
  FundPool(request: MsgFundPool): Promise<MsgFundPoolResponse> {
    const data = MsgFundPool.encode(request).finish();
    const promise = this.rpc.request("kyve.pool.v1beta1.Msg", "FundPool", data);
    return promise.then((data) =>
      MsgFundPoolResponse.decode(new _m0.Reader(data))
    );
  }

  DefundPool(request: MsgDefundPool): Promise<MsgDefundPoolResponse> {
    const data = MsgDefundPool.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.pool.v1beta1.Msg",
      "DefundPool",
      data
    );
    return promise.then((data) =>
      MsgDefundPoolResponse.decode(new _m0.Reader(data))
    );
  }

  CreatePool(request: GovMsgCreatePool): Promise<GovMsgCreatePoolResponse> {
    const data = GovMsgCreatePool.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.pool.v1beta1.Msg",
      "CreatePool",
      data
    );
    return promise.then((data) =>
      GovMsgCreatePoolResponse.decode(new _m0.Reader(data))
    );
  }

  UpdatePool(request: GovMsgUpdatePool): Promise<GovMsgUpdatePoolResponse> {
    const data = GovMsgUpdatePool.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.pool.v1beta1.Msg",
      "UpdatePool",
      data
    );
    return promise.then((data) =>
      GovMsgUpdatePoolResponse.decode(new _m0.Reader(data))
    );
  }

  PausePool(request: GovMsgPausePool): Promise<GovMsgPausePoolResponse> {
    const data = GovMsgPausePool.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.pool.v1beta1.Msg",
      "PausePool",
      data
    );
    return promise.then((data) =>
      GovMsgPausePoolResponse.decode(new _m0.Reader(data))
    );
  }

  UnpausePool(request: GovMsgUnpausePool): Promise<GovMsgUnpausePoolResponse> {
    const data = GovMsgUnpausePool.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.pool.v1beta1.Msg",
      "UnpausePool",
      data
    );
    return promise.then((data) =>
      GovMsgUnpausePoolResponse.decode(new _m0.Reader(data))
    );
  }

  PoolUpgrade(request: GovMsgPoolUpgrade): Promise<GovMsgPoolUpgradeResponse> {
    const data = GovMsgPoolUpgrade.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.pool.v1beta1.Msg",
      "PoolUpgrade",
      data
    );
    return promise.then((data) =>
      GovMsgPoolUpgradeResponse.decode(new _m0.Reader(data))
    );
  }

  CancelPoolUpgrade(
    request: GovMsgCancelPoolUpgrade
  ): Promise<GovMsgCancelPoolUpgradeResponse> {
    const data = GovMsgCancelPoolUpgrade.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.pool.v1beta1.Msg",
      "CancelPoolUpgrade",
      data
    );
    return promise.then((data) =>
      GovMsgCancelPoolUpgradeResponse.decode(new _m0.Reader(data))
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
