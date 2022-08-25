/* eslint-disable */
import { Proposal } from "./registry";
import {
  PageRequest,
  PageResponse,
} from "../../../cosmos/base/query/v1beta1/pagination";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "kyve.registry.v1beta1";

/** QueryProposalByHeightRequest is the request type for the Query/ProposalByHeight RPC method. */
export interface QueryProposalByHeightRequest {
  /** pool_id ... */
  pool_id: string;
  /** height ... */
  height: string;
}

/** QueryProposalResponse is the response type for the Query/ProposalByHeight RPC method. */
export interface QueryProposalByHeightResponse {
  /** proposal ... */
  proposal?: Proposal;
}

/** QueryProposalByFinalizedAtRequest ... */
export interface QueryProposalSinceFinalizedAtRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  /** pool_id ... */
  pool_id: string;
  /** height ... */
  finalized_at: string;
}

/** QueryProposalByFinalizedAtResponse ... */
export interface QueryProposalSinceFinalizedAtResponse {
  /** proposal ... */
  proposals: Proposal[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** QueryProposalSinceIdRequest ... */
export interface QueryProposalSinceIdRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  /** pool_id ... */
  pool_id: string;
  /** height ... */
  id: string;
}

/** QueryProposalSinceIdResponse ... */
export interface QueryProposalSinceIdResponse {
  /** proposal ... */
  proposals: Proposal[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

function createBaseQueryProposalByHeightRequest(): QueryProposalByHeightRequest {
  return { pool_id: "0", height: "0" };
}

export const QueryProposalByHeightRequest = {
  encode(
    message: QueryProposalByHeightRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.height !== "0") {
      writer.uint32(16).uint64(message.height);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryProposalByHeightRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProposalByHeightRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.height = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryProposalByHeightRequest {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      height: isSet(object.height) ? String(object.height) : "0",
    };
  },

  toJSON(message: QueryProposalByHeightRequest): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.height !== undefined && (obj.height = message.height);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryProposalByHeightRequest>, I>>(
    object: I
  ): QueryProposalByHeightRequest {
    const message = createBaseQueryProposalByHeightRequest();
    message.pool_id = object.pool_id ?? "0";
    message.height = object.height ?? "0";
    return message;
  },
};

function createBaseQueryProposalByHeightResponse(): QueryProposalByHeightResponse {
  return { proposal: undefined };
}

export const QueryProposalByHeightResponse = {
  encode(
    message: QueryProposalByHeightResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.proposal !== undefined) {
      Proposal.encode(message.proposal, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryProposalByHeightResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProposalByHeightResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposal = Proposal.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryProposalByHeightResponse {
    return {
      proposal: isSet(object.proposal)
        ? Proposal.fromJSON(object.proposal)
        : undefined,
    };
  },

  toJSON(message: QueryProposalByHeightResponse): unknown {
    const obj: any = {};
    message.proposal !== undefined &&
      (obj.proposal = message.proposal
        ? Proposal.toJSON(message.proposal)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryProposalByHeightResponse>, I>>(
    object: I
  ): QueryProposalByHeightResponse {
    const message = createBaseQueryProposalByHeightResponse();
    message.proposal =
      object.proposal !== undefined && object.proposal !== null
        ? Proposal.fromPartial(object.proposal)
        : undefined;
    return message;
  },
};

function createBaseQueryProposalSinceFinalizedAtRequest(): QueryProposalSinceFinalizedAtRequest {
  return { pagination: undefined, pool_id: "0", finalized_at: "0" };
}

export const QueryProposalSinceFinalizedAtRequest = {
  encode(
    message: QueryProposalSinceFinalizedAtRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.pool_id !== "0") {
      writer.uint32(16).uint64(message.pool_id);
    }
    if (message.finalized_at !== "0") {
      writer.uint32(24).uint64(message.finalized_at);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryProposalSinceFinalizedAtRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProposalSinceFinalizedAtRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.finalized_at = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryProposalSinceFinalizedAtRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      finalized_at: isSet(object.finalized_at)
        ? String(object.finalized_at)
        : "0",
    };
  },

  toJSON(message: QueryProposalSinceFinalizedAtRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.finalized_at !== undefined &&
      (obj.finalized_at = message.finalized_at);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryProposalSinceFinalizedAtRequest>, I>
  >(object: I): QueryProposalSinceFinalizedAtRequest {
    const message = createBaseQueryProposalSinceFinalizedAtRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    message.pool_id = object.pool_id ?? "0";
    message.finalized_at = object.finalized_at ?? "0";
    return message;
  },
};

function createBaseQueryProposalSinceFinalizedAtResponse(): QueryProposalSinceFinalizedAtResponse {
  return { proposals: [], pagination: undefined };
}

export const QueryProposalSinceFinalizedAtResponse = {
  encode(
    message: QueryProposalSinceFinalizedAtResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.proposals) {
      Proposal.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryProposalSinceFinalizedAtResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProposalSinceFinalizedAtResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposals.push(Proposal.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryProposalSinceFinalizedAtResponse {
    return {
      proposals: Array.isArray(object?.proposals)
        ? object.proposals.map((e: any) => Proposal.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryProposalSinceFinalizedAtResponse): unknown {
    const obj: any = {};
    if (message.proposals) {
      obj.proposals = message.proposals.map((e) =>
        e ? Proposal.toJSON(e) : undefined
      );
    } else {
      obj.proposals = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryProposalSinceFinalizedAtResponse>, I>
  >(object: I): QueryProposalSinceFinalizedAtResponse {
    const message = createBaseQueryProposalSinceFinalizedAtResponse();
    message.proposals =
      object.proposals?.map((e) => Proposal.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryProposalSinceIdRequest(): QueryProposalSinceIdRequest {
  return { pagination: undefined, pool_id: "0", id: "0" };
}

export const QueryProposalSinceIdRequest = {
  encode(
    message: QueryProposalSinceIdRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.pool_id !== "0") {
      writer.uint32(16).uint64(message.pool_id);
    }
    if (message.id !== "0") {
      writer.uint32(24).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryProposalSinceIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProposalSinceIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.id = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryProposalSinceIdRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      id: isSet(object.id) ? String(object.id) : "0",
    };
  },

  toJSON(message: QueryProposalSinceIdRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryProposalSinceIdRequest>, I>>(
    object: I
  ): QueryProposalSinceIdRequest {
    const message = createBaseQueryProposalSinceIdRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    message.pool_id = object.pool_id ?? "0";
    message.id = object.id ?? "0";
    return message;
  },
};

function createBaseQueryProposalSinceIdResponse(): QueryProposalSinceIdResponse {
  return { proposals: [], pagination: undefined };
}

export const QueryProposalSinceIdResponse = {
  encode(
    message: QueryProposalSinceIdResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.proposals) {
      Proposal.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryProposalSinceIdResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProposalSinceIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposals.push(Proposal.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryProposalSinceIdResponse {
    return {
      proposals: Array.isArray(object?.proposals)
        ? object.proposals.map((e: any) => Proposal.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryProposalSinceIdResponse): unknown {
    const obj: any = {};
    if (message.proposals) {
      obj.proposals = message.proposals.map((e) =>
        e ? Proposal.toJSON(e) : undefined
      );
    } else {
      obj.proposals = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryProposalSinceIdResponse>, I>>(
    object: I
  ): QueryProposalSinceIdResponse {
    const message = createBaseQueryProposalSinceIdResponse();
    message.proposals =
      object.proposals?.map((e) => Proposal.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

/** Query defines the gRPC registry querier service. */
export interface Query {
  /** ProposalByHeight ... */
  ProposalByHeight(
    request: QueryProposalByHeightRequest
  ): Promise<QueryProposalByHeightResponse>;
  /** ProposalSinceFinalizedAt ... */
  ProposalSinceFinalizedAt(
    request: QueryProposalSinceFinalizedAtRequest
  ): Promise<QueryProposalSinceFinalizedAtResponse>;
  /** ProposalSinceId ... */
  ProposalSinceId(
    request: QueryProposalSinceIdRequest
  ): Promise<QueryProposalSinceIdResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ProposalByHeight = this.ProposalByHeight.bind(this);
    this.ProposalSinceFinalizedAt = this.ProposalSinceFinalizedAt.bind(this);
    this.ProposalSinceId = this.ProposalSinceId.bind(this);
  }
  ProposalByHeight(
    request: QueryProposalByHeightRequest
  ): Promise<QueryProposalByHeightResponse> {
    const data = QueryProposalByHeightRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "ProposalByHeight",
      data
    );
    return promise.then((data) =>
      QueryProposalByHeightResponse.decode(new _m0.Reader(data))
    );
  }

  ProposalSinceFinalizedAt(
    request: QueryProposalSinceFinalizedAtRequest
  ): Promise<QueryProposalSinceFinalizedAtResponse> {
    const data = QueryProposalSinceFinalizedAtRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "ProposalSinceFinalizedAt",
      data
    );
    return promise.then((data) =>
      QueryProposalSinceFinalizedAtResponse.decode(new _m0.Reader(data))
    );
  }

  ProposalSinceId(
    request: QueryProposalSinceIdRequest
  ): Promise<QueryProposalSinceIdResponse> {
    const data = QueryProposalSinceIdRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "ProposalSinceId",
      data
    );
    return promise.then((data) =>
      QueryProposalSinceIdResponse.decode(new _m0.Reader(data))
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
