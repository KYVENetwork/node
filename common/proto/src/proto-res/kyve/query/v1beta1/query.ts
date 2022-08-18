/* eslint-disable */
import {
  PageRequest,
  PageResponse,
} from "../../../cosmos/base/query/v1beta1/pagination";
import { PoolResponse, StakerResponse, StakerPoolResponse } from "./responses";
import { FinalizedBundle } from "../../bundles/v1beta1/bundles";
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "KYVENetwork.chain.query";

/** QueryPoolsRequest is the request type for the Query/Pools RPC method. */
export interface QueryPoolsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  /** search ... */
  search: string;
  /** runtime ... */
  runtime: string;
  /** paused ... */
  paused: boolean;
}

/** QueryPoolsResponse is the response type for the Query/Pools RPC method. */
export interface QueryPoolsResponse {
  /** pools ... */
  pools: PoolResponse[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** QueryPoolRequest is the request type for the Query/Pool RPC method. */
export interface QueryPoolRequest {
  /** id defines the unique ID of the pool. */
  id: string;
}

/** QueryPoolResponse is the response type for the Query/Pool RPC method. */
export interface QueryPoolResponse {
  /** pool ... */
  pool?: PoolResponse;
}

/** QueryStakersRequest is the request type for the Query/Stakers RPC method. */
export interface QueryStakersRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
}

/** QueryStakersResponse is the response type for the Query/Stakers RPC method. */
export interface QueryStakersResponse {
  /** stakers ... */
  stakers: StakerResponse[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** QueryStakerRequest is the request type for the Query/Staker RPC method. */
export interface QueryStakerRequest {
  /** address ... */
  address: string;
}

/** QueryStakerResponse is the response type for the Query/Staker RPC method. */
export interface QueryStakerResponse {
  /** staker ... */
  staker?: StakerResponse;
}

/** QueryStakersByPoolRequest is the request type for the Query/Staker RPC method. */
export interface QueryStakersByPoolRequest {
  /** pool_id ... */
  pool_id: string;
}

/** QueryStakersByPoolResponse is the response type for the Query/Staker RPC method. */
export interface QueryStakersByPoolResponse {
  /** stakers ... */
  stakers: StakerPoolResponse[];
}

/** QueryFinalizedBundlesRequest is the request type for the Query/Staker RPC method. */
export interface QueryFinalizedBundlesRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  /** pool_id ... */
  pool_id: string;
}

/** QueryStakersByPoolResponse is the response type for the Query/Staker RPC method. */
export interface QueryFinalizedBundlesResponse {
  /** finalized_bundles ... */
  finalized_bundles: FinalizedBundle[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** QueryFinalizedBundleRequest is the request type for the Query/Staker RPC method. */
export interface QueryFinalizedBundleRequest {
  /** pool_id ... */
  pool_id: string;
  /** id ... */
  id: string;
}

/** QueryFinalizedBundleResponse is the response type for the Query/Staker RPC method. */
export interface QueryFinalizedBundleResponse {
  /** finalized_bundle ... */
  finalized_bundle?: FinalizedBundle;
}

/** QueryCanProposeRequest is the request type for the Query/CanPropose RPC method. */
export interface QueryCanValidateRequest {
  /** pool_id defines the unique ID of the pool. */
  pool_id: string;
  /** valaddress ... */
  valaddress: string;
}

/** QueryCanProposeResponse is the response type for the Query/CanPropose RPC method. */
export interface QueryCanValidateResponse {
  /** possible ... */
  possible: boolean;
  /** reason ... */
  reason: string;
}

/** QueryCanProposeRequest is the request type for the Query/CanPropose RPC method. */
export interface QueryCanProposeRequest {
  /** pool_id defines the unique ID of the pool. */
  pool_id: string;
  /** staker ... */
  staker: string;
  /** proposer ... */
  proposer: string;
  /** from_height ... */
  from_height: string;
}

/** QueryCanProposeResponse is the response type for the Query/CanPropose RPC method. */
export interface QueryCanProposeResponse {
  /** possible ... */
  possible: boolean;
  /** reason ... */
  reason: string;
}

/** QueryCanVoteRequest is the request type for the Query/CanVote RPC method. */
export interface QueryCanVoteRequest {
  /** pool_id defines the unique ID of the pool. */
  pool_id: string;
  /** staker ... */
  staker: string;
  /** voter ... */
  voter: string;
  /** storage_id ... */
  storage_id: string;
}

/** QueryCanVoteResponse is the response type for the Query/CanVote RPC method. */
export interface QueryCanVoteResponse {
  /** possible ... */
  possible: boolean;
  /** reason ... */
  reason: string;
}

function createBaseQueryPoolsRequest(): QueryPoolsRequest {
  return { pagination: undefined, search: "", runtime: "", paused: false };
}

export const QueryPoolsRequest = {
  encode(
    message: QueryPoolsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.search !== "") {
      writer.uint32(18).string(message.search);
    }
    if (message.runtime !== "") {
      writer.uint32(26).string(message.runtime);
    }
    if (message.paused === true) {
      writer.uint32(32).bool(message.paused);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.search = reader.string();
          break;
        case 3:
          message.runtime = reader.string();
          break;
        case 4:
          message.paused = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryPoolsRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
      search: isSet(object.search) ? String(object.search) : "",
      runtime: isSet(object.runtime) ? String(object.runtime) : "",
      paused: isSet(object.paused) ? Boolean(object.paused) : false,
    };
  },

  toJSON(message: QueryPoolsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    message.search !== undefined && (obj.search = message.search);
    message.runtime !== undefined && (obj.runtime = message.runtime);
    message.paused !== undefined && (obj.paused = message.paused);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryPoolsRequest>, I>>(
    object: I
  ): QueryPoolsRequest {
    const message = createBaseQueryPoolsRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    message.search = object.search ?? "";
    message.runtime = object.runtime ?? "";
    message.paused = object.paused ?? false;
    return message;
  },
};

function createBaseQueryPoolsResponse(): QueryPoolsResponse {
  return { pools: [], pagination: undefined };
}

export const QueryPoolsResponse = {
  encode(
    message: QueryPoolsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.pools) {
      PoolResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pools.push(PoolResponse.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryPoolsResponse {
    return {
      pools: Array.isArray(object?.pools)
        ? object.pools.map((e: any) => PoolResponse.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryPoolsResponse): unknown {
    const obj: any = {};
    if (message.pools) {
      obj.pools = message.pools.map((e) =>
        e ? PoolResponse.toJSON(e) : undefined
      );
    } else {
      obj.pools = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryPoolsResponse>, I>>(
    object: I
  ): QueryPoolsResponse {
    const message = createBaseQueryPoolsResponse();
    message.pools = object.pools?.map((e) => PoolResponse.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryPoolRequest(): QueryPoolRequest {
  return { id: "0" };
}

export const QueryPoolRequest = {
  encode(
    message: QueryPoolRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "0") {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryPoolRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "0",
    };
  },

  toJSON(message: QueryPoolRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryPoolRequest>, I>>(
    object: I
  ): QueryPoolRequest {
    const message = createBaseQueryPoolRequest();
    message.id = object.id ?? "0";
    return message;
  },
};

function createBaseQueryPoolResponse(): QueryPoolResponse {
  return { pool: undefined };
}

export const QueryPoolResponse = {
  encode(
    message: QueryPoolResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool !== undefined) {
      PoolResponse.encode(message.pool, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool = PoolResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryPoolResponse {
    return {
      pool: isSet(object.pool) ? PoolResponse.fromJSON(object.pool) : undefined,
    };
  },

  toJSON(message: QueryPoolResponse): unknown {
    const obj: any = {};
    message.pool !== undefined &&
      (obj.pool = message.pool ? PoolResponse.toJSON(message.pool) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryPoolResponse>, I>>(
    object: I
  ): QueryPoolResponse {
    const message = createBaseQueryPoolResponse();
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? PoolResponse.fromPartial(object.pool)
        : undefined;
    return message;
  },
};

function createBaseQueryStakersRequest(): QueryStakersRequest {
  return { pagination: undefined };
}

export const QueryStakersRequest = {
  encode(
    message: QueryStakersRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryStakersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryStakersRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryStakersRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryStakersRequest>, I>>(
    object: I
  ): QueryStakersRequest {
    const message = createBaseQueryStakersRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryStakersResponse(): QueryStakersResponse {
  return { stakers: [], pagination: undefined };
}

export const QueryStakersResponse = {
  encode(
    message: QueryStakersResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.stakers) {
      StakerResponse.encode(v!, writer.uint32(10).fork()).ldelim();
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
  ): QueryStakersResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stakers.push(StakerResponse.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryStakersResponse {
    return {
      stakers: Array.isArray(object?.stakers)
        ? object.stakers.map((e: any) => StakerResponse.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryStakersResponse): unknown {
    const obj: any = {};
    if (message.stakers) {
      obj.stakers = message.stakers.map((e) =>
        e ? StakerResponse.toJSON(e) : undefined
      );
    } else {
      obj.stakers = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryStakersResponse>, I>>(
    object: I
  ): QueryStakersResponse {
    const message = createBaseQueryStakersResponse();
    message.stakers =
      object.stakers?.map((e) => StakerResponse.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryStakerRequest(): QueryStakerRequest {
  return { address: "" };
}

export const QueryStakerRequest = {
  encode(
    message: QueryStakerRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryStakerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryStakerRequest {
    return {
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: QueryStakerRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryStakerRequest>, I>>(
    object: I
  ): QueryStakerRequest {
    const message = createBaseQueryStakerRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryStakerResponse(): QueryStakerResponse {
  return { staker: undefined };
}

export const QueryStakerResponse = {
  encode(
    message: QueryStakerResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.staker !== undefined) {
      StakerResponse.encode(message.staker, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryStakerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.staker = StakerResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryStakerResponse {
    return {
      staker: isSet(object.staker)
        ? StakerResponse.fromJSON(object.staker)
        : undefined,
    };
  },

  toJSON(message: QueryStakerResponse): unknown {
    const obj: any = {};
    message.staker !== undefined &&
      (obj.staker = message.staker
        ? StakerResponse.toJSON(message.staker)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryStakerResponse>, I>>(
    object: I
  ): QueryStakerResponse {
    const message = createBaseQueryStakerResponse();
    message.staker =
      object.staker !== undefined && object.staker !== null
        ? StakerResponse.fromPartial(object.staker)
        : undefined;
    return message;
  },
};

function createBaseQueryStakersByPoolRequest(): QueryStakersByPoolRequest {
  return { pool_id: "0" };
}

export const QueryStakersByPoolRequest = {
  encode(
    message: QueryStakersByPoolRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryStakersByPoolRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakersByPoolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryStakersByPoolRequest {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
    };
  },

  toJSON(message: QueryStakersByPoolRequest): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryStakersByPoolRequest>, I>>(
    object: I
  ): QueryStakersByPoolRequest {
    const message = createBaseQueryStakersByPoolRequest();
    message.pool_id = object.pool_id ?? "0";
    return message;
  },
};

function createBaseQueryStakersByPoolResponse(): QueryStakersByPoolResponse {
  return { stakers: [] };
}

export const QueryStakersByPoolResponse = {
  encode(
    message: QueryStakersByPoolResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.stakers) {
      StakerPoolResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryStakersByPoolResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakersByPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stakers.push(
            StakerPoolResponse.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryStakersByPoolResponse {
    return {
      stakers: Array.isArray(object?.stakers)
        ? object.stakers.map((e: any) => StakerPoolResponse.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryStakersByPoolResponse): unknown {
    const obj: any = {};
    if (message.stakers) {
      obj.stakers = message.stakers.map((e) =>
        e ? StakerPoolResponse.toJSON(e) : undefined
      );
    } else {
      obj.stakers = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryStakersByPoolResponse>, I>>(
    object: I
  ): QueryStakersByPoolResponse {
    const message = createBaseQueryStakersByPoolResponse();
    message.stakers =
      object.stakers?.map((e) => StakerPoolResponse.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryFinalizedBundlesRequest(): QueryFinalizedBundlesRequest {
  return { pagination: undefined, pool_id: "0" };
}

export const QueryFinalizedBundlesRequest = {
  encode(
    message: QueryFinalizedBundlesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.pool_id !== "0") {
      writer.uint32(16).uint64(message.pool_id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryFinalizedBundlesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFinalizedBundlesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
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

  fromJSON(object: any): QueryFinalizedBundlesRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
    };
  },

  toJSON(message: QueryFinalizedBundlesRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryFinalizedBundlesRequest>, I>>(
    object: I
  ): QueryFinalizedBundlesRequest {
    const message = createBaseQueryFinalizedBundlesRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    message.pool_id = object.pool_id ?? "0";
    return message;
  },
};

function createBaseQueryFinalizedBundlesResponse(): QueryFinalizedBundlesResponse {
  return { finalized_bundles: [], pagination: undefined };
}

export const QueryFinalizedBundlesResponse = {
  encode(
    message: QueryFinalizedBundlesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.finalized_bundles) {
      FinalizedBundle.encode(v!, writer.uint32(10).fork()).ldelim();
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
  ): QueryFinalizedBundlesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFinalizedBundlesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.finalized_bundles.push(
            FinalizedBundle.decode(reader, reader.uint32())
          );
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

  fromJSON(object: any): QueryFinalizedBundlesResponse {
    return {
      finalized_bundles: Array.isArray(object?.finalized_bundles)
        ? object.finalized_bundles.map((e: any) => FinalizedBundle.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryFinalizedBundlesResponse): unknown {
    const obj: any = {};
    if (message.finalized_bundles) {
      obj.finalized_bundles = message.finalized_bundles.map((e) =>
        e ? FinalizedBundle.toJSON(e) : undefined
      );
    } else {
      obj.finalized_bundles = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryFinalizedBundlesResponse>, I>>(
    object: I
  ): QueryFinalizedBundlesResponse {
    const message = createBaseQueryFinalizedBundlesResponse();
    message.finalized_bundles =
      object.finalized_bundles?.map((e) => FinalizedBundle.fromPartial(e)) ||
      [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryFinalizedBundleRequest(): QueryFinalizedBundleRequest {
  return { pool_id: "0", id: "0" };
}

export const QueryFinalizedBundleRequest = {
  encode(
    message: QueryFinalizedBundleRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.id !== "0") {
      writer.uint32(16).uint64(message.id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryFinalizedBundleRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFinalizedBundleRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.id = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryFinalizedBundleRequest {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      id: isSet(object.id) ? String(object.id) : "0",
    };
  },

  toJSON(message: QueryFinalizedBundleRequest): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryFinalizedBundleRequest>, I>>(
    object: I
  ): QueryFinalizedBundleRequest {
    const message = createBaseQueryFinalizedBundleRequest();
    message.pool_id = object.pool_id ?? "0";
    message.id = object.id ?? "0";
    return message;
  },
};

function createBaseQueryFinalizedBundleResponse(): QueryFinalizedBundleResponse {
  return { finalized_bundle: undefined };
}

export const QueryFinalizedBundleResponse = {
  encode(
    message: QueryFinalizedBundleResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.finalized_bundle !== undefined) {
      FinalizedBundle.encode(
        message.finalized_bundle,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryFinalizedBundleResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFinalizedBundleResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.finalized_bundle = FinalizedBundle.decode(
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

  fromJSON(object: any): QueryFinalizedBundleResponse {
    return {
      finalized_bundle: isSet(object.finalized_bundle)
        ? FinalizedBundle.fromJSON(object.finalized_bundle)
        : undefined,
    };
  },

  toJSON(message: QueryFinalizedBundleResponse): unknown {
    const obj: any = {};
    message.finalized_bundle !== undefined &&
      (obj.finalized_bundle = message.finalized_bundle
        ? FinalizedBundle.toJSON(message.finalized_bundle)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryFinalizedBundleResponse>, I>>(
    object: I
  ): QueryFinalizedBundleResponse {
    const message = createBaseQueryFinalizedBundleResponse();
    message.finalized_bundle =
      object.finalized_bundle !== undefined && object.finalized_bundle !== null
        ? FinalizedBundle.fromPartial(object.finalized_bundle)
        : undefined;
    return message;
  },
};

function createBaseQueryCanValidateRequest(): QueryCanValidateRequest {
  return { pool_id: "0", valaddress: "" };
}

export const QueryCanValidateRequest = {
  encode(
    message: QueryCanValidateRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.valaddress !== "") {
      writer.uint32(18).string(message.valaddress);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryCanValidateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCanValidateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.valaddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCanValidateRequest {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      valaddress: isSet(object.valaddress) ? String(object.valaddress) : "",
    };
  },

  toJSON(message: QueryCanValidateRequest): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.valaddress !== undefined && (obj.valaddress = message.valaddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCanValidateRequest>, I>>(
    object: I
  ): QueryCanValidateRequest {
    const message = createBaseQueryCanValidateRequest();
    message.pool_id = object.pool_id ?? "0";
    message.valaddress = object.valaddress ?? "";
    return message;
  },
};

function createBaseQueryCanValidateResponse(): QueryCanValidateResponse {
  return { possible: false, reason: "" };
}

export const QueryCanValidateResponse = {
  encode(
    message: QueryCanValidateResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.possible === true) {
      writer.uint32(8).bool(message.possible);
    }
    if (message.reason !== "") {
      writer.uint32(18).string(message.reason);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryCanValidateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCanValidateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.possible = reader.bool();
          break;
        case 2:
          message.reason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCanValidateResponse {
    return {
      possible: isSet(object.possible) ? Boolean(object.possible) : false,
      reason: isSet(object.reason) ? String(object.reason) : "",
    };
  },

  toJSON(message: QueryCanValidateResponse): unknown {
    const obj: any = {};
    message.possible !== undefined && (obj.possible = message.possible);
    message.reason !== undefined && (obj.reason = message.reason);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCanValidateResponse>, I>>(
    object: I
  ): QueryCanValidateResponse {
    const message = createBaseQueryCanValidateResponse();
    message.possible = object.possible ?? false;
    message.reason = object.reason ?? "";
    return message;
  },
};

function createBaseQueryCanProposeRequest(): QueryCanProposeRequest {
  return { pool_id: "0", staker: "", proposer: "", from_height: "0" };
}

export const QueryCanProposeRequest = {
  encode(
    message: QueryCanProposeRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.staker !== "") {
      writer.uint32(18).string(message.staker);
    }
    if (message.proposer !== "") {
      writer.uint32(26).string(message.proposer);
    }
    if (message.from_height !== "0") {
      writer.uint32(32).uint64(message.from_height);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryCanProposeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCanProposeRequest();
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
          message.proposer = reader.string();
          break;
        case 4:
          message.from_height = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCanProposeRequest {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      staker: isSet(object.staker) ? String(object.staker) : "",
      proposer: isSet(object.proposer) ? String(object.proposer) : "",
      from_height: isSet(object.from_height) ? String(object.from_height) : "0",
    };
  },

  toJSON(message: QueryCanProposeRequest): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.staker !== undefined && (obj.staker = message.staker);
    message.proposer !== undefined && (obj.proposer = message.proposer);
    message.from_height !== undefined &&
      (obj.from_height = message.from_height);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCanProposeRequest>, I>>(
    object: I
  ): QueryCanProposeRequest {
    const message = createBaseQueryCanProposeRequest();
    message.pool_id = object.pool_id ?? "0";
    message.staker = object.staker ?? "";
    message.proposer = object.proposer ?? "";
    message.from_height = object.from_height ?? "0";
    return message;
  },
};

function createBaseQueryCanProposeResponse(): QueryCanProposeResponse {
  return { possible: false, reason: "" };
}

export const QueryCanProposeResponse = {
  encode(
    message: QueryCanProposeResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.possible === true) {
      writer.uint32(8).bool(message.possible);
    }
    if (message.reason !== "") {
      writer.uint32(18).string(message.reason);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryCanProposeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCanProposeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.possible = reader.bool();
          break;
        case 2:
          message.reason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCanProposeResponse {
    return {
      possible: isSet(object.possible) ? Boolean(object.possible) : false,
      reason: isSet(object.reason) ? String(object.reason) : "",
    };
  },

  toJSON(message: QueryCanProposeResponse): unknown {
    const obj: any = {};
    message.possible !== undefined && (obj.possible = message.possible);
    message.reason !== undefined && (obj.reason = message.reason);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCanProposeResponse>, I>>(
    object: I
  ): QueryCanProposeResponse {
    const message = createBaseQueryCanProposeResponse();
    message.possible = object.possible ?? false;
    message.reason = object.reason ?? "";
    return message;
  },
};

function createBaseQueryCanVoteRequest(): QueryCanVoteRequest {
  return { pool_id: "0", staker: "", voter: "", storage_id: "" };
}

export const QueryCanVoteRequest = {
  encode(
    message: QueryCanVoteRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.staker !== "") {
      writer.uint32(18).string(message.staker);
    }
    if (message.voter !== "") {
      writer.uint32(26).string(message.voter);
    }
    if (message.storage_id !== "") {
      writer.uint32(34).string(message.storage_id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCanVoteRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCanVoteRequest();
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
          message.voter = reader.string();
          break;
        case 4:
          message.storage_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCanVoteRequest {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      staker: isSet(object.staker) ? String(object.staker) : "",
      voter: isSet(object.voter) ? String(object.voter) : "",
      storage_id: isSet(object.storage_id) ? String(object.storage_id) : "",
    };
  },

  toJSON(message: QueryCanVoteRequest): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.staker !== undefined && (obj.staker = message.staker);
    message.voter !== undefined && (obj.voter = message.voter);
    message.storage_id !== undefined && (obj.storage_id = message.storage_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCanVoteRequest>, I>>(
    object: I
  ): QueryCanVoteRequest {
    const message = createBaseQueryCanVoteRequest();
    message.pool_id = object.pool_id ?? "0";
    message.staker = object.staker ?? "";
    message.voter = object.voter ?? "";
    message.storage_id = object.storage_id ?? "";
    return message;
  },
};

function createBaseQueryCanVoteResponse(): QueryCanVoteResponse {
  return { possible: false, reason: "" };
}

export const QueryCanVoteResponse = {
  encode(
    message: QueryCanVoteResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.possible === true) {
      writer.uint32(8).bool(message.possible);
    }
    if (message.reason !== "") {
      writer.uint32(18).string(message.reason);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryCanVoteResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCanVoteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.possible = reader.bool();
          break;
        case 2:
          message.reason = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCanVoteResponse {
    return {
      possible: isSet(object.possible) ? Boolean(object.possible) : false,
      reason: isSet(object.reason) ? String(object.reason) : "",
    };
  },

  toJSON(message: QueryCanVoteResponse): unknown {
    const obj: any = {};
    message.possible !== undefined && (obj.possible = message.possible);
    message.reason !== undefined && (obj.reason = message.reason);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCanVoteResponse>, I>>(
    object: I
  ): QueryCanVoteResponse {
    const message = createBaseQueryCanVoteResponse();
    message.possible = object.possible ?? false;
    message.reason = object.reason ?? "";
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Pools queries for all pools. */
  Pools(request: QueryPoolsRequest): Promise<QueryPoolsResponse>;
  /** PoolById queries a pool by ID. */
  Pool(request: QueryPoolRequest): Promise<QueryPoolResponse>;
  /** Stakers queries for all stakers. */
  Stakers(request: QueryStakersRequest): Promise<QueryStakersResponse>;
  /** Staker queries for all stakers. */
  Staker(request: QueryStakerRequest): Promise<QueryStakerResponse>;
  /** Staker queries for all stakers. */
  StakersByPool(
    request: QueryStakersByPoolRequest
  ): Promise<QueryStakersByPoolResponse>;
  /** FinalizedBundles ... */
  FinalizedBundles(
    request: QueryFinalizedBundlesRequest
  ): Promise<QueryFinalizedBundlesResponse>;
  /** FinalizedBundle ... */
  FinalizedBundle(
    request: QueryFinalizedBundleRequest
  ): Promise<QueryFinalizedBundleResponse>;
  /** CanValidate ... */
  CanValidate(
    request: QueryCanValidateRequest
  ): Promise<QueryCanValidateResponse>;
  /** CanPropose ... */
  CanPropose(request: QueryCanProposeRequest): Promise<QueryCanProposeResponse>;
  /** CanVote checks if voter on pool can still vote for the given bundle */
  CanVote(request: QueryCanVoteRequest): Promise<QueryCanVoteResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Pools = this.Pools.bind(this);
    this.Pool = this.Pool.bind(this);
    this.Stakers = this.Stakers.bind(this);
    this.Staker = this.Staker.bind(this);
    this.StakersByPool = this.StakersByPool.bind(this);
    this.FinalizedBundles = this.FinalizedBundles.bind(this);
    this.FinalizedBundle = this.FinalizedBundle.bind(this);
    this.CanValidate = this.CanValidate.bind(this);
    this.CanPropose = this.CanPropose.bind(this);
    this.CanVote = this.CanVote.bind(this);
  }
  Pools(request: QueryPoolsRequest): Promise<QueryPoolsResponse> {
    const data = QueryPoolsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "KYVENetwork.chain.query.Query",
      "Pools",
      data
    );
    return promise.then((data) =>
      QueryPoolsResponse.decode(new _m0.Reader(data))
    );
  }

  Pool(request: QueryPoolRequest): Promise<QueryPoolResponse> {
    const data = QueryPoolRequest.encode(request).finish();
    const promise = this.rpc.request(
      "KYVENetwork.chain.query.Query",
      "Pool",
      data
    );
    return promise.then((data) =>
      QueryPoolResponse.decode(new _m0.Reader(data))
    );
  }

  Stakers(request: QueryStakersRequest): Promise<QueryStakersResponse> {
    const data = QueryStakersRequest.encode(request).finish();
    const promise = this.rpc.request(
      "KYVENetwork.chain.query.Query",
      "Stakers",
      data
    );
    return promise.then((data) =>
      QueryStakersResponse.decode(new _m0.Reader(data))
    );
  }

  Staker(request: QueryStakerRequest): Promise<QueryStakerResponse> {
    const data = QueryStakerRequest.encode(request).finish();
    const promise = this.rpc.request(
      "KYVENetwork.chain.query.Query",
      "Staker",
      data
    );
    return promise.then((data) =>
      QueryStakerResponse.decode(new _m0.Reader(data))
    );
  }

  StakersByPool(
    request: QueryStakersByPoolRequest
  ): Promise<QueryStakersByPoolResponse> {
    const data = QueryStakersByPoolRequest.encode(request).finish();
    const promise = this.rpc.request(
      "KYVENetwork.chain.query.Query",
      "StakersByPool",
      data
    );
    return promise.then((data) =>
      QueryStakersByPoolResponse.decode(new _m0.Reader(data))
    );
  }

  FinalizedBundles(
    request: QueryFinalizedBundlesRequest
  ): Promise<QueryFinalizedBundlesResponse> {
    const data = QueryFinalizedBundlesRequest.encode(request).finish();
    const promise = this.rpc.request(
      "KYVENetwork.chain.query.Query",
      "FinalizedBundles",
      data
    );
    return promise.then((data) =>
      QueryFinalizedBundlesResponse.decode(new _m0.Reader(data))
    );
  }

  FinalizedBundle(
    request: QueryFinalizedBundleRequest
  ): Promise<QueryFinalizedBundleResponse> {
    const data = QueryFinalizedBundleRequest.encode(request).finish();
    const promise = this.rpc.request(
      "KYVENetwork.chain.query.Query",
      "FinalizedBundle",
      data
    );
    return promise.then((data) =>
      QueryFinalizedBundleResponse.decode(new _m0.Reader(data))
    );
  }

  CanValidate(
    request: QueryCanValidateRequest
  ): Promise<QueryCanValidateResponse> {
    const data = QueryCanValidateRequest.encode(request).finish();
    const promise = this.rpc.request(
      "KYVENetwork.chain.query.Query",
      "CanValidate",
      data
    );
    return promise.then((data) =>
      QueryCanValidateResponse.decode(new _m0.Reader(data))
    );
  }

  CanPropose(
    request: QueryCanProposeRequest
  ): Promise<QueryCanProposeResponse> {
    const data = QueryCanProposeRequest.encode(request).finish();
    const promise = this.rpc.request(
      "KYVENetwork.chain.query.Query",
      "CanPropose",
      data
    );
    return promise.then((data) =>
      QueryCanProposeResponse.decode(new _m0.Reader(data))
    );
  }

  CanVote(request: QueryCanVoteRequest): Promise<QueryCanVoteResponse> {
    const data = QueryCanVoteRequest.encode(request).finish();
    const promise = this.rpc.request(
      "KYVENetwork.chain.query.Query",
      "CanVote",
      data
    );
    return promise.then((data) =>
      QueryCanVoteResponse.decode(new _m0.Reader(data))
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
