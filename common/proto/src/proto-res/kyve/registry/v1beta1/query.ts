/* eslint-disable */
import { Params } from "./params";
import {
  Pool,
  Funder,
  StakerStatus,
  Proposal,
  DelegationPoolData,
  stakerStatusToNumber,
  stakerStatusFromJSON,
  stakerStatusToJSON,
} from "./registry";
import {
  PageRequest,
  PageResponse,
} from "../../../cosmos/base/query/v1beta1/pagination";
import Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "kyve.registry.v1beta1";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params?: Params;
}

/** QueryPoolRequest is the request type for the Query/Pool RPC method. */
export interface QueryPoolRequest {
  /** id defines the unique ID of the pool. */
  id: string;
}

/** QueryPoolResponse is the response type for the Query/Pool RPC method. */
export interface QueryPoolResponse {
  /** pool ... */
  pool?: Pool;
}

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
  pools: Pool[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** QueryFundersListRequest is the request type for the Query/FundersList RPC method. */
export interface QueryFundersListRequest {
  /** pool_id defines the unique ID of the pool. */
  pool_id: string;
}

/** QueryFundersListResponse is the response type for the Query/FundersList RPC method. */
export interface QueryFundersListResponse {
  /** funders ... */
  funders: Funder[];
}

/** QueryFunderRequest is the request type for the Query/Funder RPC method. */
export interface QueryFunderRequest {
  /** pool_id defines the unique ID of the pool. */
  pool_id: string;
  /** funder */
  funder: string;
}

/** QueryFunderResponse is the response type for the Query/Funder RPC method. */
export interface QueryFunderResponse {
  /** funder ... */
  funder?: Funder;
}

/** QueryStakersListRequest is the request type for the Query/StakersList RPC method. */
export interface QueryStakersListRequest {
  /** pool_id defines the unique ID of the pool. */
  pool_id: string;
  /** status ... */
  status: StakerStatus;
  /** pagination ... */
  pagination?: PageRequest;
}

/** QueryStakersListResponse is the response type for the Query/StakersList RPC method. */
export interface QueryStakersListResponse {
  /** stakers ... */
  stakers: StakerResponse[];
  /** pagination ... */
  pagination?: PageResponse;
}

/** QueryStakerRequest is the request type for the Query/Staker RPC method. */
export interface QueryStakerRequest {
  /** pool_id defines the unique ID of the pool. */
  pool_id: string;
  /** staker ... */
  staker: string;
}

/** QueryStakerResponse is the response type for the Query/Staker RPC method. */
export interface QueryStakerResponse {
  /** staker ... */
  staker?: StakerResponse;
}

/** PendingCommissionChange ... */
export interface PendingCommissionChange {
  /** new_commission ... */
  new_commission: string;
  /** creation_date ... */
  creation_date: string;
  /** finish_date ... */
  finish_date: string;
}

/** StakerResponse ... */
export interface StakerResponse {
  /** staker ... */
  staker: string;
  /** pool_id ... */
  pool_id: string;
  /** account ... */
  account: string;
  /** amount ... */
  amount: string;
  /** total_delegation ... */
  total_delegation: string;
  /** commission ... */
  commission: string;
  /** moniker ... */
  moniker: string;
  /** website ... */
  website: string;
  /** logo */
  logo: string;
  /** points */
  points: string;
  /** unbonding_amount ... */
  unbonding_amount: string;
  /** upload_probability */
  upload_probability: string;
  /** status */
  status: StakerStatus;
  /** pending_commission_change */
  pending_commission_change?: PendingCommissionChange;
}

/** QueryVoteStatusRequest is the request type for the Query/VoteStatus RPC method. */
export interface QueryVoteStatusRequest {
  /** pool_id defines the unique ID of the pool. */
  pool_id: string;
}

/** QueryVoteStatusResponse is the response type for the Query/VoteStatus RPC method. */
export interface QueryVoteStatusResponse {
  /** staker ... */
  vote_status?: VoteStatusResponse;
}

/** VoteStatusResponse ... */
export interface VoteStatusResponse {
  /** valid ... */
  valid: string;
  /** invalid ... */
  invalid: string;
  /** abstain ... */
  abstain: string;
  /** total ... */
  total: string;
}

/** QueryProposalRequest is the request type for the Query/Proposal RPC method. */
export interface QueryProposalRequest {
  /** storage_id ... */
  storage_id: string;
}

/** QueryProposalResponse is the response type for the Query/Proposal RPC method. */
export interface QueryProposalResponse {
  /** proposal ... */
  proposal?: Proposal;
}

/** QueryProposalsRequest is the request type for the Query/Proposals RPC method. */
export interface QueryProposalsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  /** pool_id ... */
  pool_id: string;
}

/** QueryProposalsResponse is the response type for the Query/Proposals RPC method. */
export interface QueryProposalsResponse {
  /** proposals ... */
  proposals: Proposal[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

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

/** QueryCanProposeRequest is the request type for the Query/CanPropose RPC method. */
export interface QueryCanProposeRequest {
  /** pool_id defines the unique ID of the pool. */
  pool_id: string;
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

/** QueryStakeInfoRequest is the request type for the Query/StakeInfo RPC method. */
export interface QueryStakeInfoRequest {
  /** pool_id ... */
  pool_id: string;
  /** staker .. */
  staker: string;
}

/** QueryStakeInfoResponse is the response type for the Query/StakeInfo RPC method. */
export interface QueryStakeInfoResponse {
  /** balance ... */
  balance: string;
  /** current_stake ... */
  current_stake: string;
  /** minimum_stake ... */
  minimum_stake: string;
  /** status ... */
  status: StakerStatus;
}

/** QueryAccountAssetsRequest is the request type for the Query/AccountAssets RPC method. */
export interface QueryAccountAssetsRequest {
  /** address ... */
  address: string;
}

/** QueryAccountAssetsResponse is the response type for the Query/AccountAssets RPC method. */
export interface QueryAccountAssetsResponse {
  /** balance ... */
  balance: string;
  /** protocol_staking ... */
  protocol_staking: string;
  /** protocol_staking_unbonding */
  protocol_staking_unbonding: string;
  /** protocol_delegation ... */
  protocol_delegation: string;
  /** protocol_delegation_unbonding */
  protocol_delegation_unbonding: string;
  /** protocol_rewards ... */
  protocol_rewards: string;
  /** protocol_funding ... */
  protocol_funding: string;
}

/** QueryAccountFundedListRequest ... */
export interface QueryAccountStakingUnbondingsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  /** address ... */
  address: string;
}

/** QueryAccountAssetsResponse is the response type for the Query/AccountAssets RPC method. */
export interface QueryAccountStakingUnbondingsResponse {
  /** balance ... */
  unbondings: StakingUnbonding[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** QueryAccountAssetsResponse is the response type for the Query/AccountAssets RPC method. */
export interface StakingUnbonding {
  /** amount */
  amount: string;
  /** creation_time */
  creation_time: string;
  /** pool ... */
  pool?: Pool;
}

/** QueryAccountFundedListRequest ... */
export interface QueryAccountDelegationUnbondingsRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  /** address ... */
  address: string;
}

/** QueryAccountAssetsResponse is the response type for the Query/AccountAssets RPC method. */
export interface QueryAccountDelegationUnbondingsResponse {
  /** balance ... */
  unbondings: DelegationUnbonding[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** QueryAccountAssetsResponse is the response type for the Query/AccountAssets RPC method. */
export interface DelegationUnbonding {
  /** amount */
  amount: string;
  /** creation_time */
  creation_time: string;
  /** creation_time */
  staker?: StakerResponse;
  /** pool ... */
  pool?: Pool;
}

/** QueryAccountFundedListRequest is the request type for the account queries with pagination */
export interface QueryAccountFundedListRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  /** address ... */
  address: string;
}

/** QueryAccountFundedListResponse is the response type for the Query/AccountFundedList RPC method. */
export interface QueryAccountFundedListResponse {
  /** funded ... */
  funded: Funded[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** Funded ... */
export interface Funded {
  /** account ... */
  account: string;
  /** amount ... */
  amount: string;
  /** pool ... */
  pool?: Pool;
}

/** QueryAccountStakedListRequest ... */
export interface QueryAccountStakedListRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  /** address ... */
  address: string;
}

/** QueryAccountStakedListResponse is the response type for the Query/StakedList RPC method. */
export interface QueryAccountStakedListResponse {
  /** staked ... */
  staked: Staked[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** Staked ... */
export interface Staked {
  /** staker ... */
  staker: string;
  /** pool_id ... */
  pool_id: string;
  /** account ... */
  account: string;
  /** amount ... */
  amount: string;
  /** pool ... */
  pool?: Pool;
  /** unbonding_amount ... */
  unbonding_amount: string;
  /** upload_probability */
  upload_probability: string;
}

/** QueryAccountDelegationListRequest ... */
export interface QueryAccountDelegationListRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  /** address ... */
  address: string;
}

/** QueryAccountDelegationListRequest is the response type for the Query/AccountDelegationList RPC method. */
export interface QueryAccountDelegationListResponse {
  /** delegations ... */
  delegations: DelegatorResponse[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** DelegatorResponse ... */
export interface DelegatorResponse {
  /** account ... */
  account: string;
  /** pool ... */
  pool?: Pool;
  /** current_reward ... */
  current_reward: string;
  /** delegation_amount ... */
  delegation_amount: string;
  /** staker ... */
  staker: string;
  /** pending_commission_change */
  pending_commission_change?: PendingCommissionChange;
  /** delegation_pool_data ... */
  delegation_pool_data?: DelegationPoolData;
}

/** QueryAccountDelegationListRequest ... */
export interface QueryAccountRedelegationRequest {
  /** address ... */
  address: string;
}

/** QueryAccountDelegationListRequest is the response type for the Query/AccountDelegationList RPC method. */
export interface QueryAccountRedelegationResponse {
  /** redelegation_cooldown_entries ... */
  redelegation_cooldown_entries: string[];
}

/** QueryDelegatorRequest is the request type for the Query/Delegator RPC method. */
export interface QueryDelegatorRequest {
  /** pool_id defines the unique ID of the pool. */
  pool_id: string;
  /** staker ... */
  staker: string;
  /** delegator ... */
  delegator: string;
}

/** QueryDelegatorResponse is the response type for the Query/Delegator RPC method. */
export interface QueryDelegatorResponse {
  /** delegator ... */
  delegator?: StakerDelegatorResponse;
}

/** StakerDelegatorResponse ... */
export interface StakerDelegatorResponse {
  /** delegator ... */
  delegator: string;
  /** current_reward ... */
  current_reward: string;
  /** delegation_amount ... */
  delegation_amount: string;
  /** staker ... */
  staker: string;
}

/** QueryDelegatorsByPoolAndStakerRequest is the request type for the Query/DelegatorsByPoolAndStaker RPC method. */
export interface QueryDelegatorsByPoolAndStakerRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  /** pool_id ... */
  pool_id: string;
  /** staker ... */
  staker: string;
}

/** QueryDelegatorsByPoolAndStakerResponse is the response type for the Query/DelegatorsByPoolAndStaker RPC method. */
export interface QueryDelegatorsByPoolAndStakerResponse {
  /** delegators ... */
  delegators: StakerDelegatorResponse[];
  /** pool ... */
  pool?: Pool;
  /** delegation_pool_data ... */
  delegation_pool_data?: DelegationPoolData;
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** QueryStakersByPoolAndDelegatorRequest  is the request type for the Query/StakersByPoolAndDelegator RPC method. */
export interface QueryStakersByPoolAndDelegatorRequest {
  /** pagination defines an optional pagination for the request. */
  pagination?: PageRequest;
  /** pool_id ... */
  pool_id: string;
  /** delegator ... */
  delegator: string;
}

/** QueryStakersByPoolAndDelegatorResponse  is the response type for the Query/StakersByPoolAndDelegator RPC method. */
export interface QueryStakersByPoolAndDelegatorResponse {
  /** delegator ... */
  delegator: string;
  /** pool ... */
  pool?: Pool;
  /** stakers ... */
  stakers: DelegationForStakerResponse[];
  /** pagination defines the pagination in the response. */
  pagination?: PageResponse;
}

/** DelegationForStakerResponse ... */
export interface DelegationForStakerResponse {
  /** staker ... */
  staker: string;
  /** current_reward ... */
  current_reward: string;
  /** delegation_amount ... */
  delegation_amount: string;
  /** total_delegation_amount ... */
  total_delegation_amount: string;
  /** delegator_count ... */
  delegator_count: string;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(
    _: QueryParamsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(
    _: I
  ): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(
    message: QueryParamsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(
    object: I
  ): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
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
      Pool.encode(message.pool, writer.uint32(10).fork()).ldelim();
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
          message.pool = Pool.decode(reader, reader.uint32());
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
      pool: isSet(object.pool) ? Pool.fromJSON(object.pool) : undefined,
    };
  },

  toJSON(message: QueryPoolResponse): unknown {
    const obj: any = {};
    message.pool !== undefined &&
      (obj.pool = message.pool ? Pool.toJSON(message.pool) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryPoolResponse>, I>>(
    object: I
  ): QueryPoolResponse {
    const message = createBaseQueryPoolResponse();
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? Pool.fromPartial(object.pool)
        : undefined;
    return message;
  },
};

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
      Pool.encode(v!, writer.uint32(10).fork()).ldelim();
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
          message.pools.push(Pool.decode(reader, reader.uint32()));
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
        ? object.pools.map((e: any) => Pool.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryPoolsResponse): unknown {
    const obj: any = {};
    if (message.pools) {
      obj.pools = message.pools.map((e) => (e ? Pool.toJSON(e) : undefined));
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
    message.pools = object.pools?.map((e) => Pool.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryFundersListRequest(): QueryFundersListRequest {
  return { pool_id: "0" };
}

export const QueryFundersListRequest = {
  encode(
    message: QueryFundersListRequest,
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
  ): QueryFundersListRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFundersListRequest();
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

  fromJSON(object: any): QueryFundersListRequest {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
    };
  },

  toJSON(message: QueryFundersListRequest): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryFundersListRequest>, I>>(
    object: I
  ): QueryFundersListRequest {
    const message = createBaseQueryFundersListRequest();
    message.pool_id = object.pool_id ?? "0";
    return message;
  },
};

function createBaseQueryFundersListResponse(): QueryFundersListResponse {
  return { funders: [] };
}

export const QueryFundersListResponse = {
  encode(
    message: QueryFundersListResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.funders) {
      Funder.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryFundersListResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFundersListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.funders.push(Funder.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryFundersListResponse {
    return {
      funders: Array.isArray(object?.funders)
        ? object.funders.map((e: any) => Funder.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryFundersListResponse): unknown {
    const obj: any = {};
    if (message.funders) {
      obj.funders = message.funders.map((e) =>
        e ? Funder.toJSON(e) : undefined
      );
    } else {
      obj.funders = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryFundersListResponse>, I>>(
    object: I
  ): QueryFundersListResponse {
    const message = createBaseQueryFundersListResponse();
    message.funders = object.funders?.map((e) => Funder.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryFunderRequest(): QueryFunderRequest {
  return { pool_id: "0", funder: "" };
}

export const QueryFunderRequest = {
  encode(
    message: QueryFunderRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.funder !== "") {
      writer.uint32(18).string(message.funder);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryFunderRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFunderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.funder = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryFunderRequest {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      funder: isSet(object.funder) ? String(object.funder) : "",
    };
  },

  toJSON(message: QueryFunderRequest): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.funder !== undefined && (obj.funder = message.funder);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryFunderRequest>, I>>(
    object: I
  ): QueryFunderRequest {
    const message = createBaseQueryFunderRequest();
    message.pool_id = object.pool_id ?? "0";
    message.funder = object.funder ?? "";
    return message;
  },
};

function createBaseQueryFunderResponse(): QueryFunderResponse {
  return { funder: undefined };
}

export const QueryFunderResponse = {
  encode(
    message: QueryFunderResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.funder !== undefined) {
      Funder.encode(message.funder, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryFunderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryFunderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.funder = Funder.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryFunderResponse {
    return {
      funder: isSet(object.funder) ? Funder.fromJSON(object.funder) : undefined,
    };
  },

  toJSON(message: QueryFunderResponse): unknown {
    const obj: any = {};
    message.funder !== undefined &&
      (obj.funder = message.funder ? Funder.toJSON(message.funder) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryFunderResponse>, I>>(
    object: I
  ): QueryFunderResponse {
    const message = createBaseQueryFunderResponse();
    message.funder =
      object.funder !== undefined && object.funder !== null
        ? Funder.fromPartial(object.funder)
        : undefined;
    return message;
  },
};

function createBaseQueryStakersListRequest(): QueryStakersListRequest {
  return {
    pool_id: "0",
    status: StakerStatus.STAKER_STATUS_UNSPECIFIED,
    pagination: undefined,
  };
}

export const QueryStakersListRequest = {
  encode(
    message: QueryStakersListRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.status !== StakerStatus.STAKER_STATUS_UNSPECIFIED) {
      writer.uint32(16).int32(stakerStatusToNumber(message.status));
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryStakersListRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakersListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.status = stakerStatusFromJSON(reader.int32());
          break;
        case 3:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryStakersListRequest {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      status: isSet(object.status)
        ? stakerStatusFromJSON(object.status)
        : StakerStatus.STAKER_STATUS_UNSPECIFIED,
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryStakersListRequest): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.status !== undefined &&
      (obj.status = stakerStatusToJSON(message.status));
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryStakersListRequest>, I>>(
    object: I
  ): QueryStakersListRequest {
    const message = createBaseQueryStakersListRequest();
    message.pool_id = object.pool_id ?? "0";
    message.status = object.status ?? StakerStatus.STAKER_STATUS_UNSPECIFIED;
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryStakersListResponse(): QueryStakersListResponse {
  return { stakers: [], pagination: undefined };
}

export const QueryStakersListResponse = {
  encode(
    message: QueryStakersListResponse,
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
  ): QueryStakersListResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakersListResponse();
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

  fromJSON(object: any): QueryStakersListResponse {
    return {
      stakers: Array.isArray(object?.stakers)
        ? object.stakers.map((e: any) => StakerResponse.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryStakersListResponse): unknown {
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

  fromPartial<I extends Exact<DeepPartial<QueryStakersListResponse>, I>>(
    object: I
  ): QueryStakersListResponse {
    const message = createBaseQueryStakersListResponse();
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
  return { pool_id: "0", staker: "" };
}

export const QueryStakerRequest = {
  encode(
    message: QueryStakerRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.staker !== "") {
      writer.uint32(18).string(message.staker);
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
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.staker = reader.string();
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
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      staker: isSet(object.staker) ? String(object.staker) : "",
    };
  },

  toJSON(message: QueryStakerRequest): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.staker !== undefined && (obj.staker = message.staker);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryStakerRequest>, I>>(
    object: I
  ): QueryStakerRequest {
    const message = createBaseQueryStakerRequest();
    message.pool_id = object.pool_id ?? "0";
    message.staker = object.staker ?? "";
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

function createBasePendingCommissionChange(): PendingCommissionChange {
  return { new_commission: "", creation_date: "0", finish_date: "0" };
}

export const PendingCommissionChange = {
  encode(
    message: PendingCommissionChange,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.new_commission !== "") {
      writer.uint32(10).string(message.new_commission);
    }
    if (message.creation_date !== "0") {
      writer.uint32(16).int64(message.creation_date);
    }
    if (message.finish_date !== "0") {
      writer.uint32(24).int64(message.finish_date);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): PendingCommissionChange {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePendingCommissionChange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.new_commission = reader.string();
          break;
        case 2:
          message.creation_date = longToString(reader.int64() as Long);
          break;
        case 3:
          message.finish_date = longToString(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PendingCommissionChange {
    return {
      new_commission: isSet(object.new_commission)
        ? String(object.new_commission)
        : "",
      creation_date: isSet(object.creation_date)
        ? String(object.creation_date)
        : "0",
      finish_date: isSet(object.finish_date) ? String(object.finish_date) : "0",
    };
  },

  toJSON(message: PendingCommissionChange): unknown {
    const obj: any = {};
    message.new_commission !== undefined &&
      (obj.new_commission = message.new_commission);
    message.creation_date !== undefined &&
      (obj.creation_date = message.creation_date);
    message.finish_date !== undefined &&
      (obj.finish_date = message.finish_date);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PendingCommissionChange>, I>>(
    object: I
  ): PendingCommissionChange {
    const message = createBasePendingCommissionChange();
    message.new_commission = object.new_commission ?? "";
    message.creation_date = object.creation_date ?? "0";
    message.finish_date = object.finish_date ?? "0";
    return message;
  },
};

function createBaseStakerResponse(): StakerResponse {
  return {
    staker: "",
    pool_id: "0",
    account: "",
    amount: "0",
    total_delegation: "0",
    commission: "",
    moniker: "",
    website: "",
    logo: "",
    points: "0",
    unbonding_amount: "0",
    upload_probability: "",
    status: StakerStatus.STAKER_STATUS_UNSPECIFIED,
    pending_commission_change: undefined,
  };
}

export const StakerResponse = {
  encode(
    message: StakerResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.staker !== "") {
      writer.uint32(10).string(message.staker);
    }
    if (message.pool_id !== "0") {
      writer.uint32(16).uint64(message.pool_id);
    }
    if (message.account !== "") {
      writer.uint32(26).string(message.account);
    }
    if (message.amount !== "0") {
      writer.uint32(32).uint64(message.amount);
    }
    if (message.total_delegation !== "0") {
      writer.uint32(40).uint64(message.total_delegation);
    }
    if (message.commission !== "") {
      writer.uint32(50).string(message.commission);
    }
    if (message.moniker !== "") {
      writer.uint32(58).string(message.moniker);
    }
    if (message.website !== "") {
      writer.uint32(66).string(message.website);
    }
    if (message.logo !== "") {
      writer.uint32(74).string(message.logo);
    }
    if (message.points !== "0") {
      writer.uint32(80).uint64(message.points);
    }
    if (message.unbonding_amount !== "0") {
      writer.uint32(88).uint64(message.unbonding_amount);
    }
    if (message.upload_probability !== "") {
      writer.uint32(98).string(message.upload_probability);
    }
    if (message.status !== StakerStatus.STAKER_STATUS_UNSPECIFIED) {
      writer.uint32(104).int32(stakerStatusToNumber(message.status));
    }
    if (message.pending_commission_change !== undefined) {
      PendingCommissionChange.encode(
        message.pending_commission_change,
        writer.uint32(114).fork()
      ).ldelim();
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
          message.staker = reader.string();
          break;
        case 2:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.account = reader.string();
          break;
        case 4:
          message.amount = longToString(reader.uint64() as Long);
          break;
        case 5:
          message.total_delegation = longToString(reader.uint64() as Long);
          break;
        case 6:
          message.commission = reader.string();
          break;
        case 7:
          message.moniker = reader.string();
          break;
        case 8:
          message.website = reader.string();
          break;
        case 9:
          message.logo = reader.string();
          break;
        case 10:
          message.points = longToString(reader.uint64() as Long);
          break;
        case 11:
          message.unbonding_amount = longToString(reader.uint64() as Long);
          break;
        case 12:
          message.upload_probability = reader.string();
          break;
        case 13:
          message.status = stakerStatusFromJSON(reader.int32());
          break;
        case 14:
          message.pending_commission_change = PendingCommissionChange.decode(
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

  fromJSON(object: any): StakerResponse {
    return {
      staker: isSet(object.staker) ? String(object.staker) : "",
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      account: isSet(object.account) ? String(object.account) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
      total_delegation: isSet(object.total_delegation)
        ? String(object.total_delegation)
        : "0",
      commission: isSet(object.commission) ? String(object.commission) : "",
      moniker: isSet(object.moniker) ? String(object.moniker) : "",
      website: isSet(object.website) ? String(object.website) : "",
      logo: isSet(object.logo) ? String(object.logo) : "",
      points: isSet(object.points) ? String(object.points) : "0",
      unbonding_amount: isSet(object.unbonding_amount)
        ? String(object.unbonding_amount)
        : "0",
      upload_probability: isSet(object.upload_probability)
        ? String(object.upload_probability)
        : "",
      status: isSet(object.status)
        ? stakerStatusFromJSON(object.status)
        : StakerStatus.STAKER_STATUS_UNSPECIFIED,
      pending_commission_change: isSet(object.pending_commission_change)
        ? PendingCommissionChange.fromJSON(object.pending_commission_change)
        : undefined,
    };
  },

  toJSON(message: StakerResponse): unknown {
    const obj: any = {};
    message.staker !== undefined && (obj.staker = message.staker);
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.account !== undefined && (obj.account = message.account);
    message.amount !== undefined && (obj.amount = message.amount);
    message.total_delegation !== undefined &&
      (obj.total_delegation = message.total_delegation);
    message.commission !== undefined && (obj.commission = message.commission);
    message.moniker !== undefined && (obj.moniker = message.moniker);
    message.website !== undefined && (obj.website = message.website);
    message.logo !== undefined && (obj.logo = message.logo);
    message.points !== undefined && (obj.points = message.points);
    message.unbonding_amount !== undefined &&
      (obj.unbonding_amount = message.unbonding_amount);
    message.upload_probability !== undefined &&
      (obj.upload_probability = message.upload_probability);
    message.status !== undefined &&
      (obj.status = stakerStatusToJSON(message.status));
    message.pending_commission_change !== undefined &&
      (obj.pending_commission_change = message.pending_commission_change
        ? PendingCommissionChange.toJSON(message.pending_commission_change)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StakerResponse>, I>>(
    object: I
  ): StakerResponse {
    const message = createBaseStakerResponse();
    message.staker = object.staker ?? "";
    message.pool_id = object.pool_id ?? "0";
    message.account = object.account ?? "";
    message.amount = object.amount ?? "0";
    message.total_delegation = object.total_delegation ?? "0";
    message.commission = object.commission ?? "";
    message.moniker = object.moniker ?? "";
    message.website = object.website ?? "";
    message.logo = object.logo ?? "";
    message.points = object.points ?? "0";
    message.unbonding_amount = object.unbonding_amount ?? "0";
    message.upload_probability = object.upload_probability ?? "";
    message.status = object.status ?? StakerStatus.STAKER_STATUS_UNSPECIFIED;
    message.pending_commission_change =
      object.pending_commission_change !== undefined &&
      object.pending_commission_change !== null
        ? PendingCommissionChange.fromPartial(object.pending_commission_change)
        : undefined;
    return message;
  },
};

function createBaseQueryVoteStatusRequest(): QueryVoteStatusRequest {
  return { pool_id: "0" };
}

export const QueryVoteStatusRequest = {
  encode(
    message: QueryVoteStatusRequest,
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
  ): QueryVoteStatusRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVoteStatusRequest();
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

  fromJSON(object: any): QueryVoteStatusRequest {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
    };
  },

  toJSON(message: QueryVoteStatusRequest): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryVoteStatusRequest>, I>>(
    object: I
  ): QueryVoteStatusRequest {
    const message = createBaseQueryVoteStatusRequest();
    message.pool_id = object.pool_id ?? "0";
    return message;
  },
};

function createBaseQueryVoteStatusResponse(): QueryVoteStatusResponse {
  return { vote_status: undefined };
}

export const QueryVoteStatusResponse = {
  encode(
    message: QueryVoteStatusResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.vote_status !== undefined) {
      VoteStatusResponse.encode(
        message.vote_status,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryVoteStatusResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryVoteStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vote_status = VoteStatusResponse.decode(
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

  fromJSON(object: any): QueryVoteStatusResponse {
    return {
      vote_status: isSet(object.vote_status)
        ? VoteStatusResponse.fromJSON(object.vote_status)
        : undefined,
    };
  },

  toJSON(message: QueryVoteStatusResponse): unknown {
    const obj: any = {};
    message.vote_status !== undefined &&
      (obj.vote_status = message.vote_status
        ? VoteStatusResponse.toJSON(message.vote_status)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryVoteStatusResponse>, I>>(
    object: I
  ): QueryVoteStatusResponse {
    const message = createBaseQueryVoteStatusResponse();
    message.vote_status =
      object.vote_status !== undefined && object.vote_status !== null
        ? VoteStatusResponse.fromPartial(object.vote_status)
        : undefined;
    return message;
  },
};

function createBaseVoteStatusResponse(): VoteStatusResponse {
  return { valid: "0", invalid: "0", abstain: "0", total: "0" };
}

export const VoteStatusResponse = {
  encode(
    message: VoteStatusResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.valid !== "0") {
      writer.uint32(8).uint64(message.valid);
    }
    if (message.invalid !== "0") {
      writer.uint32(16).uint64(message.invalid);
    }
    if (message.abstain !== "0") {
      writer.uint32(24).uint64(message.abstain);
    }
    if (message.total !== "0") {
      writer.uint32(32).uint64(message.total);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VoteStatusResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVoteStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.valid = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.invalid = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.abstain = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.total = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VoteStatusResponse {
    return {
      valid: isSet(object.valid) ? String(object.valid) : "0",
      invalid: isSet(object.invalid) ? String(object.invalid) : "0",
      abstain: isSet(object.abstain) ? String(object.abstain) : "0",
      total: isSet(object.total) ? String(object.total) : "0",
    };
  },

  toJSON(message: VoteStatusResponse): unknown {
    const obj: any = {};
    message.valid !== undefined && (obj.valid = message.valid);
    message.invalid !== undefined && (obj.invalid = message.invalid);
    message.abstain !== undefined && (obj.abstain = message.abstain);
    message.total !== undefined && (obj.total = message.total);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VoteStatusResponse>, I>>(
    object: I
  ): VoteStatusResponse {
    const message = createBaseVoteStatusResponse();
    message.valid = object.valid ?? "0";
    message.invalid = object.invalid ?? "0";
    message.abstain = object.abstain ?? "0";
    message.total = object.total ?? "0";
    return message;
  },
};

function createBaseQueryProposalRequest(): QueryProposalRequest {
  return { storage_id: "" };
}

export const QueryProposalRequest = {
  encode(
    message: QueryProposalRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.storage_id !== "") {
      writer.uint32(10).string(message.storage_id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryProposalRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProposalRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.storage_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryProposalRequest {
    return {
      storage_id: isSet(object.storage_id) ? String(object.storage_id) : "",
    };
  },

  toJSON(message: QueryProposalRequest): unknown {
    const obj: any = {};
    message.storage_id !== undefined && (obj.storage_id = message.storage_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryProposalRequest>, I>>(
    object: I
  ): QueryProposalRequest {
    const message = createBaseQueryProposalRequest();
    message.storage_id = object.storage_id ?? "";
    return message;
  },
};

function createBaseQueryProposalResponse(): QueryProposalResponse {
  return { proposal: undefined };
}

export const QueryProposalResponse = {
  encode(
    message: QueryProposalResponse,
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
  ): QueryProposalResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProposalResponse();
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

  fromJSON(object: any): QueryProposalResponse {
    return {
      proposal: isSet(object.proposal)
        ? Proposal.fromJSON(object.proposal)
        : undefined,
    };
  },

  toJSON(message: QueryProposalResponse): unknown {
    const obj: any = {};
    message.proposal !== undefined &&
      (obj.proposal = message.proposal
        ? Proposal.toJSON(message.proposal)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryProposalResponse>, I>>(
    object: I
  ): QueryProposalResponse {
    const message = createBaseQueryProposalResponse();
    message.proposal =
      object.proposal !== undefined && object.proposal !== null
        ? Proposal.fromPartial(object.proposal)
        : undefined;
    return message;
  },
};

function createBaseQueryProposalsRequest(): QueryProposalsRequest {
  return { pagination: undefined, pool_id: "0" };
}

export const QueryProposalsRequest = {
  encode(
    message: QueryProposalsRequest,
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
  ): QueryProposalsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProposalsRequest();
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

  fromJSON(object: any): QueryProposalsRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
    };
  },

  toJSON(message: QueryProposalsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryProposalsRequest>, I>>(
    object: I
  ): QueryProposalsRequest {
    const message = createBaseQueryProposalsRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    message.pool_id = object.pool_id ?? "0";
    return message;
  },
};

function createBaseQueryProposalsResponse(): QueryProposalsResponse {
  return { proposals: [], pagination: undefined };
}

export const QueryProposalsResponse = {
  encode(
    message: QueryProposalsResponse,
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
  ): QueryProposalsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProposalsResponse();
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

  fromJSON(object: any): QueryProposalsResponse {
    return {
      proposals: Array.isArray(object?.proposals)
        ? object.proposals.map((e: any) => Proposal.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryProposalsResponse): unknown {
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

  fromPartial<I extends Exact<DeepPartial<QueryProposalsResponse>, I>>(
    object: I
  ): QueryProposalsResponse {
    const message = createBaseQueryProposalsResponse();
    message.proposals =
      object.proposals?.map((e) => Proposal.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

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

function createBaseQueryCanProposeRequest(): QueryCanProposeRequest {
  return { pool_id: "0", proposer: "", from_height: "0" };
}

export const QueryCanProposeRequest = {
  encode(
    message: QueryCanProposeRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.proposer !== "") {
      writer.uint32(18).string(message.proposer);
    }
    if (message.from_height !== "0") {
      writer.uint32(24).uint64(message.from_height);
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
          message.proposer = reader.string();
          break;
        case 3:
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
      proposer: isSet(object.proposer) ? String(object.proposer) : "",
      from_height: isSet(object.from_height) ? String(object.from_height) : "0",
    };
  },

  toJSON(message: QueryCanProposeRequest): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
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
  return { pool_id: "0", voter: "", storage_id: "" };
}

export const QueryCanVoteRequest = {
  encode(
    message: QueryCanVoteRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.voter !== "") {
      writer.uint32(18).string(message.voter);
    }
    if (message.storage_id !== "") {
      writer.uint32(26).string(message.storage_id);
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
          message.voter = reader.string();
          break;
        case 3:
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
      voter: isSet(object.voter) ? String(object.voter) : "",
      storage_id: isSet(object.storage_id) ? String(object.storage_id) : "",
    };
  },

  toJSON(message: QueryCanVoteRequest): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.voter !== undefined && (obj.voter = message.voter);
    message.storage_id !== undefined && (obj.storage_id = message.storage_id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCanVoteRequest>, I>>(
    object: I
  ): QueryCanVoteRequest {
    const message = createBaseQueryCanVoteRequest();
    message.pool_id = object.pool_id ?? "0";
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

function createBaseQueryStakeInfoRequest(): QueryStakeInfoRequest {
  return { pool_id: "0", staker: "" };
}

export const QueryStakeInfoRequest = {
  encode(
    message: QueryStakeInfoRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.staker !== "") {
      writer.uint32(18).string(message.staker);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryStakeInfoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakeInfoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.staker = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryStakeInfoRequest {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      staker: isSet(object.staker) ? String(object.staker) : "",
    };
  },

  toJSON(message: QueryStakeInfoRequest): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.staker !== undefined && (obj.staker = message.staker);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryStakeInfoRequest>, I>>(
    object: I
  ): QueryStakeInfoRequest {
    const message = createBaseQueryStakeInfoRequest();
    message.pool_id = object.pool_id ?? "0";
    message.staker = object.staker ?? "";
    return message;
  },
};

function createBaseQueryStakeInfoResponse(): QueryStakeInfoResponse {
  return {
    balance: "",
    current_stake: "",
    minimum_stake: "",
    status: StakerStatus.STAKER_STATUS_UNSPECIFIED,
  };
}

export const QueryStakeInfoResponse = {
  encode(
    message: QueryStakeInfoResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.balance !== "") {
      writer.uint32(10).string(message.balance);
    }
    if (message.current_stake !== "") {
      writer.uint32(18).string(message.current_stake);
    }
    if (message.minimum_stake !== "") {
      writer.uint32(26).string(message.minimum_stake);
    }
    if (message.status !== StakerStatus.STAKER_STATUS_UNSPECIFIED) {
      writer.uint32(32).int32(stakerStatusToNumber(message.status));
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryStakeInfoResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakeInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.balance = reader.string();
          break;
        case 2:
          message.current_stake = reader.string();
          break;
        case 3:
          message.minimum_stake = reader.string();
          break;
        case 4:
          message.status = stakerStatusFromJSON(reader.int32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryStakeInfoResponse {
    return {
      balance: isSet(object.balance) ? String(object.balance) : "",
      current_stake: isSet(object.current_stake)
        ? String(object.current_stake)
        : "",
      minimum_stake: isSet(object.minimum_stake)
        ? String(object.minimum_stake)
        : "",
      status: isSet(object.status)
        ? stakerStatusFromJSON(object.status)
        : StakerStatus.STAKER_STATUS_UNSPECIFIED,
    };
  },

  toJSON(message: QueryStakeInfoResponse): unknown {
    const obj: any = {};
    message.balance !== undefined && (obj.balance = message.balance);
    message.current_stake !== undefined &&
      (obj.current_stake = message.current_stake);
    message.minimum_stake !== undefined &&
      (obj.minimum_stake = message.minimum_stake);
    message.status !== undefined &&
      (obj.status = stakerStatusToJSON(message.status));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryStakeInfoResponse>, I>>(
    object: I
  ): QueryStakeInfoResponse {
    const message = createBaseQueryStakeInfoResponse();
    message.balance = object.balance ?? "";
    message.current_stake = object.current_stake ?? "";
    message.minimum_stake = object.minimum_stake ?? "";
    message.status = object.status ?? StakerStatus.STAKER_STATUS_UNSPECIFIED;
    return message;
  },
};

function createBaseQueryAccountAssetsRequest(): QueryAccountAssetsRequest {
  return { address: "" };
}

export const QueryAccountAssetsRequest = {
  encode(
    message: QueryAccountAssetsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAccountAssetsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountAssetsRequest();
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

  fromJSON(object: any): QueryAccountAssetsRequest {
    return {
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: QueryAccountAssetsRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAccountAssetsRequest>, I>>(
    object: I
  ): QueryAccountAssetsRequest {
    const message = createBaseQueryAccountAssetsRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryAccountAssetsResponse(): QueryAccountAssetsResponse {
  return {
    balance: "0",
    protocol_staking: "0",
    protocol_staking_unbonding: "0",
    protocol_delegation: "0",
    protocol_delegation_unbonding: "0",
    protocol_rewards: "0",
    protocol_funding: "0",
  };
}

export const QueryAccountAssetsResponse = {
  encode(
    message: QueryAccountAssetsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.balance !== "0") {
      writer.uint32(8).uint64(message.balance);
    }
    if (message.protocol_staking !== "0") {
      writer.uint32(16).uint64(message.protocol_staking);
    }
    if (message.protocol_staking_unbonding !== "0") {
      writer.uint32(24).uint64(message.protocol_staking_unbonding);
    }
    if (message.protocol_delegation !== "0") {
      writer.uint32(32).uint64(message.protocol_delegation);
    }
    if (message.protocol_delegation_unbonding !== "0") {
      writer.uint32(40).uint64(message.protocol_delegation_unbonding);
    }
    if (message.protocol_rewards !== "0") {
      writer.uint32(48).uint64(message.protocol_rewards);
    }
    if (message.protocol_funding !== "0") {
      writer.uint32(56).uint64(message.protocol_funding);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAccountAssetsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountAssetsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.balance = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.protocol_staking = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.protocol_staking_unbonding = longToString(
            reader.uint64() as Long
          );
          break;
        case 4:
          message.protocol_delegation = longToString(reader.uint64() as Long);
          break;
        case 5:
          message.protocol_delegation_unbonding = longToString(
            reader.uint64() as Long
          );
          break;
        case 6:
          message.protocol_rewards = longToString(reader.uint64() as Long);
          break;
        case 7:
          message.protocol_funding = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAccountAssetsResponse {
    return {
      balance: isSet(object.balance) ? String(object.balance) : "0",
      protocol_staking: isSet(object.protocol_staking)
        ? String(object.protocol_staking)
        : "0",
      protocol_staking_unbonding: isSet(object.protocol_staking_unbonding)
        ? String(object.protocol_staking_unbonding)
        : "0",
      protocol_delegation: isSet(object.protocol_delegation)
        ? String(object.protocol_delegation)
        : "0",
      protocol_delegation_unbonding: isSet(object.protocol_delegation_unbonding)
        ? String(object.protocol_delegation_unbonding)
        : "0",
      protocol_rewards: isSet(object.protocol_rewards)
        ? String(object.protocol_rewards)
        : "0",
      protocol_funding: isSet(object.protocol_funding)
        ? String(object.protocol_funding)
        : "0",
    };
  },

  toJSON(message: QueryAccountAssetsResponse): unknown {
    const obj: any = {};
    message.balance !== undefined && (obj.balance = message.balance);
    message.protocol_staking !== undefined &&
      (obj.protocol_staking = message.protocol_staking);
    message.protocol_staking_unbonding !== undefined &&
      (obj.protocol_staking_unbonding = message.protocol_staking_unbonding);
    message.protocol_delegation !== undefined &&
      (obj.protocol_delegation = message.protocol_delegation);
    message.protocol_delegation_unbonding !== undefined &&
      (obj.protocol_delegation_unbonding =
        message.protocol_delegation_unbonding);
    message.protocol_rewards !== undefined &&
      (obj.protocol_rewards = message.protocol_rewards);
    message.protocol_funding !== undefined &&
      (obj.protocol_funding = message.protocol_funding);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAccountAssetsResponse>, I>>(
    object: I
  ): QueryAccountAssetsResponse {
    const message = createBaseQueryAccountAssetsResponse();
    message.balance = object.balance ?? "0";
    message.protocol_staking = object.protocol_staking ?? "0";
    message.protocol_staking_unbonding =
      object.protocol_staking_unbonding ?? "0";
    message.protocol_delegation = object.protocol_delegation ?? "0";
    message.protocol_delegation_unbonding =
      object.protocol_delegation_unbonding ?? "0";
    message.protocol_rewards = object.protocol_rewards ?? "0";
    message.protocol_funding = object.protocol_funding ?? "0";
    return message;
  },
};

function createBaseQueryAccountStakingUnbondingsRequest(): QueryAccountStakingUnbondingsRequest {
  return { pagination: undefined, address: "" };
}

export const QueryAccountStakingUnbondingsRequest = {
  encode(
    message: QueryAccountStakingUnbondingsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAccountStakingUnbondingsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountStakingUnbondingsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAccountStakingUnbondingsRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: QueryAccountStakingUnbondingsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryAccountStakingUnbondingsRequest>, I>
  >(object: I): QueryAccountStakingUnbondingsRequest {
    const message = createBaseQueryAccountStakingUnbondingsRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryAccountStakingUnbondingsResponse(): QueryAccountStakingUnbondingsResponse {
  return { unbondings: [], pagination: undefined };
}

export const QueryAccountStakingUnbondingsResponse = {
  encode(
    message: QueryAccountStakingUnbondingsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.unbondings) {
      StakingUnbonding.encode(v!, writer.uint32(10).fork()).ldelim();
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
  ): QueryAccountStakingUnbondingsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountStakingUnbondingsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.unbondings.push(
            StakingUnbonding.decode(reader, reader.uint32())
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

  fromJSON(object: any): QueryAccountStakingUnbondingsResponse {
    return {
      unbondings: Array.isArray(object?.unbondings)
        ? object.unbondings.map((e: any) => StakingUnbonding.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryAccountStakingUnbondingsResponse): unknown {
    const obj: any = {};
    if (message.unbondings) {
      obj.unbondings = message.unbondings.map((e) =>
        e ? StakingUnbonding.toJSON(e) : undefined
      );
    } else {
      obj.unbondings = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryAccountStakingUnbondingsResponse>, I>
  >(object: I): QueryAccountStakingUnbondingsResponse {
    const message = createBaseQueryAccountStakingUnbondingsResponse();
    message.unbondings =
      object.unbondings?.map((e) => StakingUnbonding.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseStakingUnbonding(): StakingUnbonding {
  return { amount: "0", creation_time: "0", pool: undefined };
}

export const StakingUnbonding = {
  encode(
    message: StakingUnbonding,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.amount !== "0") {
      writer.uint32(8).uint64(message.amount);
    }
    if (message.creation_time !== "0") {
      writer.uint32(16).uint64(message.creation_time);
    }
    if (message.pool !== undefined) {
      Pool.encode(message.pool, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StakingUnbonding {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStakingUnbonding();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.creation_time = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.pool = Pool.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StakingUnbonding {
    return {
      amount: isSet(object.amount) ? String(object.amount) : "0",
      creation_time: isSet(object.creation_time)
        ? String(object.creation_time)
        : "0",
      pool: isSet(object.pool) ? Pool.fromJSON(object.pool) : undefined,
    };
  },

  toJSON(message: StakingUnbonding): unknown {
    const obj: any = {};
    message.amount !== undefined && (obj.amount = message.amount);
    message.creation_time !== undefined &&
      (obj.creation_time = message.creation_time);
    message.pool !== undefined &&
      (obj.pool = message.pool ? Pool.toJSON(message.pool) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StakingUnbonding>, I>>(
    object: I
  ): StakingUnbonding {
    const message = createBaseStakingUnbonding();
    message.amount = object.amount ?? "0";
    message.creation_time = object.creation_time ?? "0";
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? Pool.fromPartial(object.pool)
        : undefined;
    return message;
  },
};

function createBaseQueryAccountDelegationUnbondingsRequest(): QueryAccountDelegationUnbondingsRequest {
  return { pagination: undefined, address: "" };
}

export const QueryAccountDelegationUnbondingsRequest = {
  encode(
    message: QueryAccountDelegationUnbondingsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAccountDelegationUnbondingsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountDelegationUnbondingsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAccountDelegationUnbondingsRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: QueryAccountDelegationUnbondingsRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryAccountDelegationUnbondingsRequest>, I>
  >(object: I): QueryAccountDelegationUnbondingsRequest {
    const message = createBaseQueryAccountDelegationUnbondingsRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryAccountDelegationUnbondingsResponse(): QueryAccountDelegationUnbondingsResponse {
  return { unbondings: [], pagination: undefined };
}

export const QueryAccountDelegationUnbondingsResponse = {
  encode(
    message: QueryAccountDelegationUnbondingsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.unbondings) {
      DelegationUnbonding.encode(v!, writer.uint32(10).fork()).ldelim();
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
  ): QueryAccountDelegationUnbondingsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountDelegationUnbondingsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.unbondings.push(
            DelegationUnbonding.decode(reader, reader.uint32())
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

  fromJSON(object: any): QueryAccountDelegationUnbondingsResponse {
    return {
      unbondings: Array.isArray(object?.unbondings)
        ? object.unbondings.map((e: any) => DelegationUnbonding.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryAccountDelegationUnbondingsResponse): unknown {
    const obj: any = {};
    if (message.unbondings) {
      obj.unbondings = message.unbondings.map((e) =>
        e ? DelegationUnbonding.toJSON(e) : undefined
      );
    } else {
      obj.unbondings = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryAccountDelegationUnbondingsResponse>, I>
  >(object: I): QueryAccountDelegationUnbondingsResponse {
    const message = createBaseQueryAccountDelegationUnbondingsResponse();
    message.unbondings =
      object.unbondings?.map((e) => DelegationUnbonding.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseDelegationUnbonding(): DelegationUnbonding {
  return {
    amount: "0",
    creation_time: "0",
    staker: undefined,
    pool: undefined,
  };
}

export const DelegationUnbonding = {
  encode(
    message: DelegationUnbonding,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.amount !== "0") {
      writer.uint32(8).uint64(message.amount);
    }
    if (message.creation_time !== "0") {
      writer.uint32(16).uint64(message.creation_time);
    }
    if (message.staker !== undefined) {
      StakerResponse.encode(message.staker, writer.uint32(26).fork()).ldelim();
    }
    if (message.pool !== undefined) {
      Pool.encode(message.pool, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DelegationUnbonding {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegationUnbonding();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = longToString(reader.uint64() as Long);
          break;
        case 2:
          message.creation_time = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.staker = StakerResponse.decode(reader, reader.uint32());
          break;
        case 4:
          message.pool = Pool.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DelegationUnbonding {
    return {
      amount: isSet(object.amount) ? String(object.amount) : "0",
      creation_time: isSet(object.creation_time)
        ? String(object.creation_time)
        : "0",
      staker: isSet(object.staker)
        ? StakerResponse.fromJSON(object.staker)
        : undefined,
      pool: isSet(object.pool) ? Pool.fromJSON(object.pool) : undefined,
    };
  },

  toJSON(message: DelegationUnbonding): unknown {
    const obj: any = {};
    message.amount !== undefined && (obj.amount = message.amount);
    message.creation_time !== undefined &&
      (obj.creation_time = message.creation_time);
    message.staker !== undefined &&
      (obj.staker = message.staker
        ? StakerResponse.toJSON(message.staker)
        : undefined);
    message.pool !== undefined &&
      (obj.pool = message.pool ? Pool.toJSON(message.pool) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DelegationUnbonding>, I>>(
    object: I
  ): DelegationUnbonding {
    const message = createBaseDelegationUnbonding();
    message.amount = object.amount ?? "0";
    message.creation_time = object.creation_time ?? "0";
    message.staker =
      object.staker !== undefined && object.staker !== null
        ? StakerResponse.fromPartial(object.staker)
        : undefined;
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? Pool.fromPartial(object.pool)
        : undefined;
    return message;
  },
};

function createBaseQueryAccountFundedListRequest(): QueryAccountFundedListRequest {
  return { pagination: undefined, address: "" };
}

export const QueryAccountFundedListRequest = {
  encode(
    message: QueryAccountFundedListRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAccountFundedListRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountFundedListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAccountFundedListRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: QueryAccountFundedListRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAccountFundedListRequest>, I>>(
    object: I
  ): QueryAccountFundedListRequest {
    const message = createBaseQueryAccountFundedListRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryAccountFundedListResponse(): QueryAccountFundedListResponse {
  return { funded: [], pagination: undefined };
}

export const QueryAccountFundedListResponse = {
  encode(
    message: QueryAccountFundedListResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.funded) {
      Funded.encode(v!, writer.uint32(10).fork()).ldelim();
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
  ): QueryAccountFundedListResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountFundedListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.funded.push(Funded.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAccountFundedListResponse {
    return {
      funded: Array.isArray(object?.funded)
        ? object.funded.map((e: any) => Funded.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryAccountFundedListResponse): unknown {
    const obj: any = {};
    if (message.funded) {
      obj.funded = message.funded.map((e) =>
        e ? Funded.toJSON(e) : undefined
      );
    } else {
      obj.funded = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAccountFundedListResponse>, I>>(
    object: I
  ): QueryAccountFundedListResponse {
    const message = createBaseQueryAccountFundedListResponse();
    message.funded = object.funded?.map((e) => Funded.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseFunded(): Funded {
  return { account: "", amount: "0", pool: undefined };
}

export const Funded = {
  encode(
    message: Funded,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.amount !== "0") {
      writer.uint32(16).uint64(message.amount);
    }
    if (message.pool !== undefined) {
      Pool.encode(message.pool, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Funded {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFunded();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.amount = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.pool = Pool.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Funded {
    return {
      account: isSet(object.account) ? String(object.account) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
      pool: isSet(object.pool) ? Pool.fromJSON(object.pool) : undefined,
    };
  },

  toJSON(message: Funded): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.amount !== undefined && (obj.amount = message.amount);
    message.pool !== undefined &&
      (obj.pool = message.pool ? Pool.toJSON(message.pool) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Funded>, I>>(object: I): Funded {
    const message = createBaseFunded();
    message.account = object.account ?? "";
    message.amount = object.amount ?? "0";
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? Pool.fromPartial(object.pool)
        : undefined;
    return message;
  },
};

function createBaseQueryAccountStakedListRequest(): QueryAccountStakedListRequest {
  return { pagination: undefined, address: "" };
}

export const QueryAccountStakedListRequest = {
  encode(
    message: QueryAccountStakedListRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAccountStakedListRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountStakedListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAccountStakedListRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: QueryAccountStakedListRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAccountStakedListRequest>, I>>(
    object: I
  ): QueryAccountStakedListRequest {
    const message = createBaseQueryAccountStakedListRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryAccountStakedListResponse(): QueryAccountStakedListResponse {
  return { staked: [], pagination: undefined };
}

export const QueryAccountStakedListResponse = {
  encode(
    message: QueryAccountStakedListResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.staked) {
      Staked.encode(v!, writer.uint32(10).fork()).ldelim();
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
  ): QueryAccountStakedListResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountStakedListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.staked.push(Staked.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryAccountStakedListResponse {
    return {
      staked: Array.isArray(object?.staked)
        ? object.staked.map((e: any) => Staked.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryAccountStakedListResponse): unknown {
    const obj: any = {};
    if (message.staked) {
      obj.staked = message.staked.map((e) =>
        e ? Staked.toJSON(e) : undefined
      );
    } else {
      obj.staked = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAccountStakedListResponse>, I>>(
    object: I
  ): QueryAccountStakedListResponse {
    const message = createBaseQueryAccountStakedListResponse();
    message.staked = object.staked?.map((e) => Staked.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseStaked(): Staked {
  return {
    staker: "",
    pool_id: "0",
    account: "",
    amount: "0",
    pool: undefined,
    unbonding_amount: "0",
    upload_probability: "",
  };
}

export const Staked = {
  encode(
    message: Staked,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.staker !== "") {
      writer.uint32(10).string(message.staker);
    }
    if (message.pool_id !== "0") {
      writer.uint32(16).uint64(message.pool_id);
    }
    if (message.account !== "") {
      writer.uint32(26).string(message.account);
    }
    if (message.amount !== "0") {
      writer.uint32(32).uint64(message.amount);
    }
    if (message.pool !== undefined) {
      Pool.encode(message.pool, writer.uint32(50).fork()).ldelim();
    }
    if (message.unbonding_amount !== "0") {
      writer.uint32(56).uint64(message.unbonding_amount);
    }
    if (message.upload_probability !== "") {
      writer.uint32(66).string(message.upload_probability);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Staked {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStaked();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.staker = reader.string();
          break;
        case 2:
          message.pool_id = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.account = reader.string();
          break;
        case 4:
          message.amount = longToString(reader.uint64() as Long);
          break;
        case 6:
          message.pool = Pool.decode(reader, reader.uint32());
          break;
        case 7:
          message.unbonding_amount = longToString(reader.uint64() as Long);
          break;
        case 8:
          message.upload_probability = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Staked {
    return {
      staker: isSet(object.staker) ? String(object.staker) : "",
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      account: isSet(object.account) ? String(object.account) : "",
      amount: isSet(object.amount) ? String(object.amount) : "0",
      pool: isSet(object.pool) ? Pool.fromJSON(object.pool) : undefined,
      unbonding_amount: isSet(object.unbonding_amount)
        ? String(object.unbonding_amount)
        : "0",
      upload_probability: isSet(object.upload_probability)
        ? String(object.upload_probability)
        : "",
    };
  },

  toJSON(message: Staked): unknown {
    const obj: any = {};
    message.staker !== undefined && (obj.staker = message.staker);
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.account !== undefined && (obj.account = message.account);
    message.amount !== undefined && (obj.amount = message.amount);
    message.pool !== undefined &&
      (obj.pool = message.pool ? Pool.toJSON(message.pool) : undefined);
    message.unbonding_amount !== undefined &&
      (obj.unbonding_amount = message.unbonding_amount);
    message.upload_probability !== undefined &&
      (obj.upload_probability = message.upload_probability);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Staked>, I>>(object: I): Staked {
    const message = createBaseStaked();
    message.staker = object.staker ?? "";
    message.pool_id = object.pool_id ?? "0";
    message.account = object.account ?? "";
    message.amount = object.amount ?? "0";
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? Pool.fromPartial(object.pool)
        : undefined;
    message.unbonding_amount = object.unbonding_amount ?? "0";
    message.upload_probability = object.upload_probability ?? "";
    return message;
  },
};

function createBaseQueryAccountDelegationListRequest(): QueryAccountDelegationListRequest {
  return { pagination: undefined, address: "" };
}

export const QueryAccountDelegationListRequest = {
  encode(
    message: QueryAccountDelegationListRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAccountDelegationListRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountDelegationListRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        case 2:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAccountDelegationListRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: QueryAccountDelegationListRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryAccountDelegationListRequest>, I>
  >(object: I): QueryAccountDelegationListRequest {
    const message = createBaseQueryAccountDelegationListRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryAccountDelegationListResponse(): QueryAccountDelegationListResponse {
  return { delegations: [], pagination: undefined };
}

export const QueryAccountDelegationListResponse = {
  encode(
    message: QueryAccountDelegationListResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.delegations) {
      DelegatorResponse.encode(v!, writer.uint32(10).fork()).ldelim();
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
  ): QueryAccountDelegationListResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountDelegationListResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegations.push(
            DelegatorResponse.decode(reader, reader.uint32())
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

  fromJSON(object: any): QueryAccountDelegationListResponse {
    return {
      delegations: Array.isArray(object?.delegations)
        ? object.delegations.map((e: any) => DelegatorResponse.fromJSON(e))
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryAccountDelegationListResponse): unknown {
    const obj: any = {};
    if (message.delegations) {
      obj.delegations = message.delegations.map((e) =>
        e ? DelegatorResponse.toJSON(e) : undefined
      );
    } else {
      obj.delegations = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryAccountDelegationListResponse>, I>
  >(object: I): QueryAccountDelegationListResponse {
    const message = createBaseQueryAccountDelegationListResponse();
    message.delegations =
      object.delegations?.map((e) => DelegatorResponse.fromPartial(e)) || [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseDelegatorResponse(): DelegatorResponse {
  return {
    account: "",
    pool: undefined,
    current_reward: "0",
    delegation_amount: "0",
    staker: "",
    pending_commission_change: undefined,
    delegation_pool_data: undefined,
  };
}

export const DelegatorResponse = {
  encode(
    message: DelegatorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.pool !== undefined) {
      Pool.encode(message.pool, writer.uint32(18).fork()).ldelim();
    }
    if (message.current_reward !== "0") {
      writer.uint32(24).uint64(message.current_reward);
    }
    if (message.delegation_amount !== "0") {
      writer.uint32(32).uint64(message.delegation_amount);
    }
    if (message.staker !== "") {
      writer.uint32(42).string(message.staker);
    }
    if (message.pending_commission_change !== undefined) {
      PendingCommissionChange.encode(
        message.pending_commission_change,
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.delegation_pool_data !== undefined) {
      DelegationPoolData.encode(
        message.delegation_pool_data,
        writer.uint32(58).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DelegatorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.pool = Pool.decode(reader, reader.uint32());
          break;
        case 3:
          message.current_reward = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.delegation_amount = longToString(reader.uint64() as Long);
          break;
        case 5:
          message.staker = reader.string();
          break;
        case 6:
          message.pending_commission_change = PendingCommissionChange.decode(
            reader,
            reader.uint32()
          );
          break;
        case 7:
          message.delegation_pool_data = DelegationPoolData.decode(
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

  fromJSON(object: any): DelegatorResponse {
    return {
      account: isSet(object.account) ? String(object.account) : "",
      pool: isSet(object.pool) ? Pool.fromJSON(object.pool) : undefined,
      current_reward: isSet(object.current_reward)
        ? String(object.current_reward)
        : "0",
      delegation_amount: isSet(object.delegation_amount)
        ? String(object.delegation_amount)
        : "0",
      staker: isSet(object.staker) ? String(object.staker) : "",
      pending_commission_change: isSet(object.pending_commission_change)
        ? PendingCommissionChange.fromJSON(object.pending_commission_change)
        : undefined,
      delegation_pool_data: isSet(object.delegation_pool_data)
        ? DelegationPoolData.fromJSON(object.delegation_pool_data)
        : undefined,
    };
  },

  toJSON(message: DelegatorResponse): unknown {
    const obj: any = {};
    message.account !== undefined && (obj.account = message.account);
    message.pool !== undefined &&
      (obj.pool = message.pool ? Pool.toJSON(message.pool) : undefined);
    message.current_reward !== undefined &&
      (obj.current_reward = message.current_reward);
    message.delegation_amount !== undefined &&
      (obj.delegation_amount = message.delegation_amount);
    message.staker !== undefined && (obj.staker = message.staker);
    message.pending_commission_change !== undefined &&
      (obj.pending_commission_change = message.pending_commission_change
        ? PendingCommissionChange.toJSON(message.pending_commission_change)
        : undefined);
    message.delegation_pool_data !== undefined &&
      (obj.delegation_pool_data = message.delegation_pool_data
        ? DelegationPoolData.toJSON(message.delegation_pool_data)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DelegatorResponse>, I>>(
    object: I
  ): DelegatorResponse {
    const message = createBaseDelegatorResponse();
    message.account = object.account ?? "";
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? Pool.fromPartial(object.pool)
        : undefined;
    message.current_reward = object.current_reward ?? "0";
    message.delegation_amount = object.delegation_amount ?? "0";
    message.staker = object.staker ?? "";
    message.pending_commission_change =
      object.pending_commission_change !== undefined &&
      object.pending_commission_change !== null
        ? PendingCommissionChange.fromPartial(object.pending_commission_change)
        : undefined;
    message.delegation_pool_data =
      object.delegation_pool_data !== undefined &&
      object.delegation_pool_data !== null
        ? DelegationPoolData.fromPartial(object.delegation_pool_data)
        : undefined;
    return message;
  },
};

function createBaseQueryAccountRedelegationRequest(): QueryAccountRedelegationRequest {
  return { address: "" };
}

export const QueryAccountRedelegationRequest = {
  encode(
    message: QueryAccountRedelegationRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAccountRedelegationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountRedelegationRequest();
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

  fromJSON(object: any): QueryAccountRedelegationRequest {
    return {
      address: isSet(object.address) ? String(object.address) : "",
    };
  },

  toJSON(message: QueryAccountRedelegationRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAccountRedelegationRequest>, I>>(
    object: I
  ): QueryAccountRedelegationRequest {
    const message = createBaseQueryAccountRedelegationRequest();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseQueryAccountRedelegationResponse(): QueryAccountRedelegationResponse {
  return { redelegation_cooldown_entries: [] };
}

export const QueryAccountRedelegationResponse = {
  encode(
    message: QueryAccountRedelegationResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.redelegation_cooldown_entries) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryAccountRedelegationResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAccountRedelegationResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.redelegation_cooldown_entries.push(
                longToString(reader.uint64() as Long)
              );
            }
          } else {
            message.redelegation_cooldown_entries.push(
              longToString(reader.uint64() as Long)
            );
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAccountRedelegationResponse {
    return {
      redelegation_cooldown_entries: Array.isArray(
        object?.redelegation_cooldown_entries
      )
        ? object.redelegation_cooldown_entries.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: QueryAccountRedelegationResponse): unknown {
    const obj: any = {};
    if (message.redelegation_cooldown_entries) {
      obj.redelegation_cooldown_entries =
        message.redelegation_cooldown_entries.map((e) => e);
    } else {
      obj.redelegation_cooldown_entries = [];
    }
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryAccountRedelegationResponse>, I>
  >(object: I): QueryAccountRedelegationResponse {
    const message = createBaseQueryAccountRedelegationResponse();
    message.redelegation_cooldown_entries =
      object.redelegation_cooldown_entries?.map((e) => e) || [];
    return message;
  },
};

function createBaseQueryDelegatorRequest(): QueryDelegatorRequest {
  return { pool_id: "0", staker: "", delegator: "" };
}

export const QueryDelegatorRequest = {
  encode(
    message: QueryDelegatorRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pool_id !== "0") {
      writer.uint32(8).uint64(message.pool_id);
    }
    if (message.staker !== "") {
      writer.uint32(18).string(message.staker);
    }
    if (message.delegator !== "") {
      writer.uint32(26).string(message.delegator);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryDelegatorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegatorRequest();
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
          message.delegator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDelegatorRequest {
    return {
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      staker: isSet(object.staker) ? String(object.staker) : "",
      delegator: isSet(object.delegator) ? String(object.delegator) : "",
    };
  },

  toJSON(message: QueryDelegatorRequest): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.staker !== undefined && (obj.staker = message.staker);
    message.delegator !== undefined && (obj.delegator = message.delegator);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDelegatorRequest>, I>>(
    object: I
  ): QueryDelegatorRequest {
    const message = createBaseQueryDelegatorRequest();
    message.pool_id = object.pool_id ?? "0";
    message.staker = object.staker ?? "";
    message.delegator = object.delegator ?? "";
    return message;
  },
};

function createBaseQueryDelegatorResponse(): QueryDelegatorResponse {
  return { delegator: undefined };
}

export const QueryDelegatorResponse = {
  encode(
    message: QueryDelegatorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.delegator !== undefined) {
      StakerDelegatorResponse.encode(
        message.delegator,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryDelegatorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator = StakerDelegatorResponse.decode(
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

  fromJSON(object: any): QueryDelegatorResponse {
    return {
      delegator: isSet(object.delegator)
        ? StakerDelegatorResponse.fromJSON(object.delegator)
        : undefined,
    };
  },

  toJSON(message: QueryDelegatorResponse): unknown {
    const obj: any = {};
    message.delegator !== undefined &&
      (obj.delegator = message.delegator
        ? StakerDelegatorResponse.toJSON(message.delegator)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryDelegatorResponse>, I>>(
    object: I
  ): QueryDelegatorResponse {
    const message = createBaseQueryDelegatorResponse();
    message.delegator =
      object.delegator !== undefined && object.delegator !== null
        ? StakerDelegatorResponse.fromPartial(object.delegator)
        : undefined;
    return message;
  },
};

function createBaseStakerDelegatorResponse(): StakerDelegatorResponse {
  return {
    delegator: "",
    current_reward: "0",
    delegation_amount: "0",
    staker: "",
  };
}

export const StakerDelegatorResponse = {
  encode(
    message: StakerDelegatorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.delegator !== "") {
      writer.uint32(10).string(message.delegator);
    }
    if (message.current_reward !== "0") {
      writer.uint32(16).uint64(message.current_reward);
    }
    if (message.delegation_amount !== "0") {
      writer.uint32(24).uint64(message.delegation_amount);
    }
    if (message.staker !== "") {
      writer.uint32(34).string(message.staker);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): StakerDelegatorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStakerDelegatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator = reader.string();
          break;
        case 2:
          message.current_reward = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.delegation_amount = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.staker = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StakerDelegatorResponse {
    return {
      delegator: isSet(object.delegator) ? String(object.delegator) : "",
      current_reward: isSet(object.current_reward)
        ? String(object.current_reward)
        : "0",
      delegation_amount: isSet(object.delegation_amount)
        ? String(object.delegation_amount)
        : "0",
      staker: isSet(object.staker) ? String(object.staker) : "",
    };
  },

  toJSON(message: StakerDelegatorResponse): unknown {
    const obj: any = {};
    message.delegator !== undefined && (obj.delegator = message.delegator);
    message.current_reward !== undefined &&
      (obj.current_reward = message.current_reward);
    message.delegation_amount !== undefined &&
      (obj.delegation_amount = message.delegation_amount);
    message.staker !== undefined && (obj.staker = message.staker);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<StakerDelegatorResponse>, I>>(
    object: I
  ): StakerDelegatorResponse {
    const message = createBaseStakerDelegatorResponse();
    message.delegator = object.delegator ?? "";
    message.current_reward = object.current_reward ?? "0";
    message.delegation_amount = object.delegation_amount ?? "0";
    message.staker = object.staker ?? "";
    return message;
  },
};

function createBaseQueryDelegatorsByPoolAndStakerRequest(): QueryDelegatorsByPoolAndStakerRequest {
  return { pagination: undefined, pool_id: "0", staker: "" };
}

export const QueryDelegatorsByPoolAndStakerRequest = {
  encode(
    message: QueryDelegatorsByPoolAndStakerRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.pool_id !== "0") {
      writer.uint32(16).uint64(message.pool_id);
    }
    if (message.staker !== "") {
      writer.uint32(26).string(message.staker);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryDelegatorsByPoolAndStakerRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegatorsByPoolAndStakerRequest();
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
          message.staker = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDelegatorsByPoolAndStakerRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      staker: isSet(object.staker) ? String(object.staker) : "",
    };
  },

  toJSON(message: QueryDelegatorsByPoolAndStakerRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.staker !== undefined && (obj.staker = message.staker);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryDelegatorsByPoolAndStakerRequest>, I>
  >(object: I): QueryDelegatorsByPoolAndStakerRequest {
    const message = createBaseQueryDelegatorsByPoolAndStakerRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    message.pool_id = object.pool_id ?? "0";
    message.staker = object.staker ?? "";
    return message;
  },
};

function createBaseQueryDelegatorsByPoolAndStakerResponse(): QueryDelegatorsByPoolAndStakerResponse {
  return {
    delegators: [],
    pool: undefined,
    delegation_pool_data: undefined,
    pagination: undefined,
  };
}

export const QueryDelegatorsByPoolAndStakerResponse = {
  encode(
    message: QueryDelegatorsByPoolAndStakerResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.delegators) {
      StakerDelegatorResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pool !== undefined) {
      Pool.encode(message.pool, writer.uint32(18).fork()).ldelim();
    }
    if (message.delegation_pool_data !== undefined) {
      DelegationPoolData.encode(
        message.delegation_pool_data,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryDelegatorsByPoolAndStakerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDelegatorsByPoolAndStakerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegators.push(
            StakerDelegatorResponse.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.pool = Pool.decode(reader, reader.uint32());
          break;
        case 3:
          message.delegation_pool_data = DelegationPoolData.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDelegatorsByPoolAndStakerResponse {
    return {
      delegators: Array.isArray(object?.delegators)
        ? object.delegators.map((e: any) => StakerDelegatorResponse.fromJSON(e))
        : [],
      pool: isSet(object.pool) ? Pool.fromJSON(object.pool) : undefined,
      delegation_pool_data: isSet(object.delegation_pool_data)
        ? DelegationPoolData.fromJSON(object.delegation_pool_data)
        : undefined,
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryDelegatorsByPoolAndStakerResponse): unknown {
    const obj: any = {};
    if (message.delegators) {
      obj.delegators = message.delegators.map((e) =>
        e ? StakerDelegatorResponse.toJSON(e) : undefined
      );
    } else {
      obj.delegators = [];
    }
    message.pool !== undefined &&
      (obj.pool = message.pool ? Pool.toJSON(message.pool) : undefined);
    message.delegation_pool_data !== undefined &&
      (obj.delegation_pool_data = message.delegation_pool_data
        ? DelegationPoolData.toJSON(message.delegation_pool_data)
        : undefined);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryDelegatorsByPoolAndStakerResponse>, I>
  >(object: I): QueryDelegatorsByPoolAndStakerResponse {
    const message = createBaseQueryDelegatorsByPoolAndStakerResponse();
    message.delegators =
      object.delegators?.map((e) => StakerDelegatorResponse.fromPartial(e)) ||
      [];
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? Pool.fromPartial(object.pool)
        : undefined;
    message.delegation_pool_data =
      object.delegation_pool_data !== undefined &&
      object.delegation_pool_data !== null
        ? DelegationPoolData.fromPartial(object.delegation_pool_data)
        : undefined;
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseQueryStakersByPoolAndDelegatorRequest(): QueryStakersByPoolAndDelegatorRequest {
  return { pagination: undefined, pool_id: "0", delegator: "" };
}

export const QueryStakersByPoolAndDelegatorRequest = {
  encode(
    message: QueryStakersByPoolAndDelegatorRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    if (message.pool_id !== "0") {
      writer.uint32(16).uint64(message.pool_id);
    }
    if (message.delegator !== "") {
      writer.uint32(26).string(message.delegator);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryStakersByPoolAndDelegatorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakersByPoolAndDelegatorRequest();
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
          message.delegator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryStakersByPoolAndDelegatorRequest {
    return {
      pagination: isSet(object.pagination)
        ? PageRequest.fromJSON(object.pagination)
        : undefined,
      pool_id: isSet(object.pool_id) ? String(object.pool_id) : "0",
      delegator: isSet(object.delegator) ? String(object.delegator) : "",
    };
  },

  toJSON(message: QueryStakersByPoolAndDelegatorRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    message.delegator !== undefined && (obj.delegator = message.delegator);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<QueryStakersByPoolAndDelegatorRequest>, I>
  >(object: I): QueryStakersByPoolAndDelegatorRequest {
    const message = createBaseQueryStakersByPoolAndDelegatorRequest();
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageRequest.fromPartial(object.pagination)
        : undefined;
    message.pool_id = object.pool_id ?? "0";
    message.delegator = object.delegator ?? "";
    return message;
  },
};

function createBaseQueryStakersByPoolAndDelegatorResponse(): QueryStakersByPoolAndDelegatorResponse {
  return { delegator: "", pool: undefined, stakers: [], pagination: undefined };
}

export const QueryStakersByPoolAndDelegatorResponse = {
  encode(
    message: QueryStakersByPoolAndDelegatorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.delegator !== "") {
      writer.uint32(10).string(message.delegator);
    }
    if (message.pool !== undefined) {
      Pool.encode(message.pool, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.stakers) {
      DelegationForStakerResponse.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryStakersByPoolAndDelegatorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryStakersByPoolAndDelegatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.delegator = reader.string();
          break;
        case 2:
          message.pool = Pool.decode(reader, reader.uint32());
          break;
        case 3:
          message.stakers.push(
            DelegationForStakerResponse.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryStakersByPoolAndDelegatorResponse {
    return {
      delegator: isSet(object.delegator) ? String(object.delegator) : "",
      pool: isSet(object.pool) ? Pool.fromJSON(object.pool) : undefined,
      stakers: Array.isArray(object?.stakers)
        ? object.stakers.map((e: any) =>
            DelegationForStakerResponse.fromJSON(e)
          )
        : [],
      pagination: isSet(object.pagination)
        ? PageResponse.fromJSON(object.pagination)
        : undefined,
    };
  },

  toJSON(message: QueryStakersByPoolAndDelegatorResponse): unknown {
    const obj: any = {};
    message.delegator !== undefined && (obj.delegator = message.delegator);
    message.pool !== undefined &&
      (obj.pool = message.pool ? Pool.toJSON(message.pool) : undefined);
    if (message.stakers) {
      obj.stakers = message.stakers.map((e) =>
        e ? DelegationForStakerResponse.toJSON(e) : undefined
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

  fromPartial<
    I extends Exact<DeepPartial<QueryStakersByPoolAndDelegatorResponse>, I>
  >(object: I): QueryStakersByPoolAndDelegatorResponse {
    const message = createBaseQueryStakersByPoolAndDelegatorResponse();
    message.delegator = object.delegator ?? "";
    message.pool =
      object.pool !== undefined && object.pool !== null
        ? Pool.fromPartial(object.pool)
        : undefined;
    message.stakers =
      object.stakers?.map((e) => DelegationForStakerResponse.fromPartial(e)) ||
      [];
    message.pagination =
      object.pagination !== undefined && object.pagination !== null
        ? PageResponse.fromPartial(object.pagination)
        : undefined;
    return message;
  },
};

function createBaseDelegationForStakerResponse(): DelegationForStakerResponse {
  return {
    staker: "",
    current_reward: "0",
    delegation_amount: "0",
    total_delegation_amount: "0",
    delegator_count: "0",
  };
}

export const DelegationForStakerResponse = {
  encode(
    message: DelegationForStakerResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.staker !== "") {
      writer.uint32(10).string(message.staker);
    }
    if (message.current_reward !== "0") {
      writer.uint32(16).uint64(message.current_reward);
    }
    if (message.delegation_amount !== "0") {
      writer.uint32(24).uint64(message.delegation_amount);
    }
    if (message.total_delegation_amount !== "0") {
      writer.uint32(32).uint64(message.total_delegation_amount);
    }
    if (message.delegator_count !== "0") {
      writer.uint32(40).uint64(message.delegator_count);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DelegationForStakerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDelegationForStakerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.staker = reader.string();
          break;
        case 2:
          message.current_reward = longToString(reader.uint64() as Long);
          break;
        case 3:
          message.delegation_amount = longToString(reader.uint64() as Long);
          break;
        case 4:
          message.total_delegation_amount = longToString(
            reader.uint64() as Long
          );
          break;
        case 5:
          message.delegator_count = longToString(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DelegationForStakerResponse {
    return {
      staker: isSet(object.staker) ? String(object.staker) : "",
      current_reward: isSet(object.current_reward)
        ? String(object.current_reward)
        : "0",
      delegation_amount: isSet(object.delegation_amount)
        ? String(object.delegation_amount)
        : "0",
      total_delegation_amount: isSet(object.total_delegation_amount)
        ? String(object.total_delegation_amount)
        : "0",
      delegator_count: isSet(object.delegator_count)
        ? String(object.delegator_count)
        : "0",
    };
  },

  toJSON(message: DelegationForStakerResponse): unknown {
    const obj: any = {};
    message.staker !== undefined && (obj.staker = message.staker);
    message.current_reward !== undefined &&
      (obj.current_reward = message.current_reward);
    message.delegation_amount !== undefined &&
      (obj.delegation_amount = message.delegation_amount);
    message.total_delegation_amount !== undefined &&
      (obj.total_delegation_amount = message.total_delegation_amount);
    message.delegator_count !== undefined &&
      (obj.delegator_count = message.delegator_count);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DelegationForStakerResponse>, I>>(
    object: I
  ): DelegationForStakerResponse {
    const message = createBaseDelegationForStakerResponse();
    message.staker = object.staker ?? "";
    message.current_reward = object.current_reward ?? "0";
    message.delegation_amount = object.delegation_amount ?? "0";
    message.total_delegation_amount = object.total_delegation_amount ?? "0";
    message.delegator_count = object.delegator_count ?? "0";
    return message;
  },
};

/** Query defines the gRPC registry querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Pool queries a pool by ID. */
  Pool(request: QueryPoolRequest): Promise<QueryPoolResponse>;
  /** Pools queries for all pools. */
  Pools(request: QueryPoolsRequest): Promise<QueryPoolsResponse>;
  /** FundersList returns all funder addresses with their corresponding funding amount for a given pool */
  FundersList(
    request: QueryFundersListRequest
  ): Promise<QueryFundersListResponse>;
  /** Funder returns all funder info */
  Funder(request: QueryFunderRequest): Promise<QueryFunderResponse>;
  /** StakersList returns all staker addresses with their corresponding staking amount for a given pool */
  StakersList(
    request: QueryStakersListRequest
  ): Promise<QueryStakersListResponse>;
  /** Staker returns all staker info */
  Staker(request: QueryStakerRequest): Promise<QueryStakerResponse>;
  /** VoteStatus returns all vote info */
  VoteStatus(request: QueryVoteStatusRequest): Promise<QueryVoteStatusResponse>;
  /** Proposal ... */
  Proposal(request: QueryProposalRequest): Promise<QueryProposalResponse>;
  /**
   * Proposals ...
   *
   * @deprecated
   */
  Proposals(request: QueryProposalsRequest): Promise<QueryProposalsResponse>;
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
  /** CanPropose ... */
  CanPropose(request: QueryCanProposeRequest): Promise<QueryCanProposeResponse>;
  /** CanVote checks if voter on pool can still vote for the given bundle */
  CanVote(request: QueryCanVoteRequest): Promise<QueryCanVoteResponse>;
  /** StakeInfo returns necessary information to become a staker (used by the protocol nodes) */
  StakeInfo(request: QueryStakeInfoRequest): Promise<QueryStakeInfoResponse>;
  /** AccountAssets returns an overview of the sum of all balances for a given user. e.g. balance, staking, funding, etc. */
  AccountAssets(
    request: QueryAccountAssetsRequest
  ): Promise<QueryAccountAssetsResponse>;
  /** AccountStakingUnbondings ... */
  AccountStakingUnbondings(
    request: QueryAccountStakingUnbondingsRequest
  ): Promise<QueryAccountStakingUnbondingsResponse>;
  /** AccountDelegationUnbondings ... */
  AccountDelegationUnbondings(
    request: QueryAccountDelegationUnbondingsRequest
  ): Promise<QueryAccountDelegationUnbondingsResponse>;
  /** AccountFundedList returns all pools the given user has funded into. */
  AccountFundedList(
    request: QueryAccountFundedListRequest
  ): Promise<QueryAccountFundedListResponse>;
  /** AccountStakedList ... */
  AccountStakedList(
    request: QueryAccountStakedListRequest
  ): Promise<QueryAccountStakedListResponse>;
  /** AccountDelegationList ... */
  AccountDelegationList(
    request: QueryAccountDelegationListRequest
  ): Promise<QueryAccountDelegationListResponse>;
  /** AccountRedelegation ... */
  AccountRedelegation(
    request: QueryAccountRedelegationRequest
  ): Promise<QueryAccountRedelegationResponse>;
  /** Delegator returns all delegation info */
  Delegator(request: QueryDelegatorRequest): Promise<QueryDelegatorResponse>;
  /** DelegatorsByPoolAndStaker ... */
  DelegatorsByPoolAndStaker(
    request: QueryDelegatorsByPoolAndStakerRequest
  ): Promise<QueryDelegatorsByPoolAndStakerResponse>;
  /** StakersByPoolAndDelegator ... */
  StakersByPoolAndDelegator(
    request: QueryStakersByPoolAndDelegatorRequest
  ): Promise<QueryStakersByPoolAndDelegatorResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Pool = this.Pool.bind(this);
    this.Pools = this.Pools.bind(this);
    this.FundersList = this.FundersList.bind(this);
    this.Funder = this.Funder.bind(this);
    this.StakersList = this.StakersList.bind(this);
    this.Staker = this.Staker.bind(this);
    this.VoteStatus = this.VoteStatus.bind(this);
    this.Proposal = this.Proposal.bind(this);
    this.Proposals = this.Proposals.bind(this);
    this.ProposalByHeight = this.ProposalByHeight.bind(this);
    this.ProposalSinceFinalizedAt = this.ProposalSinceFinalizedAt.bind(this);
    this.ProposalSinceId = this.ProposalSinceId.bind(this);
    this.CanPropose = this.CanPropose.bind(this);
    this.CanVote = this.CanVote.bind(this);
    this.StakeInfo = this.StakeInfo.bind(this);
    this.AccountAssets = this.AccountAssets.bind(this);
    this.AccountStakingUnbondings = this.AccountStakingUnbondings.bind(this);
    this.AccountDelegationUnbondings =
      this.AccountDelegationUnbondings.bind(this);
    this.AccountFundedList = this.AccountFundedList.bind(this);
    this.AccountStakedList = this.AccountStakedList.bind(this);
    this.AccountDelegationList = this.AccountDelegationList.bind(this);
    this.AccountRedelegation = this.AccountRedelegation.bind(this);
    this.Delegator = this.Delegator.bind(this);
    this.DelegatorsByPoolAndStaker = this.DelegatorsByPoolAndStaker.bind(this);
    this.StakersByPoolAndDelegator = this.StakersByPoolAndDelegator.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "Params",
      data
    );
    return promise.then((data) =>
      QueryParamsResponse.decode(new _m0.Reader(data))
    );
  }

  Pool(request: QueryPoolRequest): Promise<QueryPoolResponse> {
    const data = QueryPoolRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "Pool",
      data
    );
    return promise.then((data) =>
      QueryPoolResponse.decode(new _m0.Reader(data))
    );
  }

  Pools(request: QueryPoolsRequest): Promise<QueryPoolsResponse> {
    const data = QueryPoolsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "Pools",
      data
    );
    return promise.then((data) =>
      QueryPoolsResponse.decode(new _m0.Reader(data))
    );
  }

  FundersList(
    request: QueryFundersListRequest
  ): Promise<QueryFundersListResponse> {
    const data = QueryFundersListRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "FundersList",
      data
    );
    return promise.then((data) =>
      QueryFundersListResponse.decode(new _m0.Reader(data))
    );
  }

  Funder(request: QueryFunderRequest): Promise<QueryFunderResponse> {
    const data = QueryFunderRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "Funder",
      data
    );
    return promise.then((data) =>
      QueryFunderResponse.decode(new _m0.Reader(data))
    );
  }

  StakersList(
    request: QueryStakersListRequest
  ): Promise<QueryStakersListResponse> {
    const data = QueryStakersListRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "StakersList",
      data
    );
    return promise.then((data) =>
      QueryStakersListResponse.decode(new _m0.Reader(data))
    );
  }

  Staker(request: QueryStakerRequest): Promise<QueryStakerResponse> {
    const data = QueryStakerRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "Staker",
      data
    );
    return promise.then((data) =>
      QueryStakerResponse.decode(new _m0.Reader(data))
    );
  }

  VoteStatus(
    request: QueryVoteStatusRequest
  ): Promise<QueryVoteStatusResponse> {
    const data = QueryVoteStatusRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "VoteStatus",
      data
    );
    return promise.then((data) =>
      QueryVoteStatusResponse.decode(new _m0.Reader(data))
    );
  }

  Proposal(request: QueryProposalRequest): Promise<QueryProposalResponse> {
    const data = QueryProposalRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "Proposal",
      data
    );
    return promise.then((data) =>
      QueryProposalResponse.decode(new _m0.Reader(data))
    );
  }

  Proposals(request: QueryProposalsRequest): Promise<QueryProposalsResponse> {
    const data = QueryProposalsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "Proposals",
      data
    );
    return promise.then((data) =>
      QueryProposalsResponse.decode(new _m0.Reader(data))
    );
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

  CanPropose(
    request: QueryCanProposeRequest
  ): Promise<QueryCanProposeResponse> {
    const data = QueryCanProposeRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
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
      "kyve.registry.v1beta1.Query",
      "CanVote",
      data
    );
    return promise.then((data) =>
      QueryCanVoteResponse.decode(new _m0.Reader(data))
    );
  }

  StakeInfo(request: QueryStakeInfoRequest): Promise<QueryStakeInfoResponse> {
    const data = QueryStakeInfoRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "StakeInfo",
      data
    );
    return promise.then((data) =>
      QueryStakeInfoResponse.decode(new _m0.Reader(data))
    );
  }

  AccountAssets(
    request: QueryAccountAssetsRequest
  ): Promise<QueryAccountAssetsResponse> {
    const data = QueryAccountAssetsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "AccountAssets",
      data
    );
    return promise.then((data) =>
      QueryAccountAssetsResponse.decode(new _m0.Reader(data))
    );
  }

  AccountStakingUnbondings(
    request: QueryAccountStakingUnbondingsRequest
  ): Promise<QueryAccountStakingUnbondingsResponse> {
    const data = QueryAccountStakingUnbondingsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "AccountStakingUnbondings",
      data
    );
    return promise.then((data) =>
      QueryAccountStakingUnbondingsResponse.decode(new _m0.Reader(data))
    );
  }

  AccountDelegationUnbondings(
    request: QueryAccountDelegationUnbondingsRequest
  ): Promise<QueryAccountDelegationUnbondingsResponse> {
    const data =
      QueryAccountDelegationUnbondingsRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "AccountDelegationUnbondings",
      data
    );
    return promise.then((data) =>
      QueryAccountDelegationUnbondingsResponse.decode(new _m0.Reader(data))
    );
  }

  AccountFundedList(
    request: QueryAccountFundedListRequest
  ): Promise<QueryAccountFundedListResponse> {
    const data = QueryAccountFundedListRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "AccountFundedList",
      data
    );
    return promise.then((data) =>
      QueryAccountFundedListResponse.decode(new _m0.Reader(data))
    );
  }

  AccountStakedList(
    request: QueryAccountStakedListRequest
  ): Promise<QueryAccountStakedListResponse> {
    const data = QueryAccountStakedListRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "AccountStakedList",
      data
    );
    return promise.then((data) =>
      QueryAccountStakedListResponse.decode(new _m0.Reader(data))
    );
  }

  AccountDelegationList(
    request: QueryAccountDelegationListRequest
  ): Promise<QueryAccountDelegationListResponse> {
    const data = QueryAccountDelegationListRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "AccountDelegationList",
      data
    );
    return promise.then((data) =>
      QueryAccountDelegationListResponse.decode(new _m0.Reader(data))
    );
  }

  AccountRedelegation(
    request: QueryAccountRedelegationRequest
  ): Promise<QueryAccountRedelegationResponse> {
    const data = QueryAccountRedelegationRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "AccountRedelegation",
      data
    );
    return promise.then((data) =>
      QueryAccountRedelegationResponse.decode(new _m0.Reader(data))
    );
  }

  Delegator(request: QueryDelegatorRequest): Promise<QueryDelegatorResponse> {
    const data = QueryDelegatorRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "Delegator",
      data
    );
    return promise.then((data) =>
      QueryDelegatorResponse.decode(new _m0.Reader(data))
    );
  }

  DelegatorsByPoolAndStaker(
    request: QueryDelegatorsByPoolAndStakerRequest
  ): Promise<QueryDelegatorsByPoolAndStakerResponse> {
    const data = QueryDelegatorsByPoolAndStakerRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "DelegatorsByPoolAndStaker",
      data
    );
    return promise.then((data) =>
      QueryDelegatorsByPoolAndStakerResponse.decode(new _m0.Reader(data))
    );
  }

  StakersByPoolAndDelegator(
    request: QueryStakersByPoolAndDelegatorRequest
  ): Promise<QueryStakersByPoolAndDelegatorResponse> {
    const data = QueryStakersByPoolAndDelegatorRequest.encode(request).finish();
    const promise = this.rpc.request(
      "kyve.registry.v1beta1.Query",
      "StakersByPoolAndDelegator",
      data
    );
    return promise.then((data) =>
      QueryStakersByPoolAndDelegatorResponse.decode(new _m0.Reader(data))
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
