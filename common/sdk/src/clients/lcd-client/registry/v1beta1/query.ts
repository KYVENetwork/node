import {
  QueryAccountAssetsRequest,
  QueryAccountDelegationListRequest,
  QueryAccountFundedListRequest,
  QueryAccountFundedListResponse,
  QueryAccountStakedListRequest,
  QueryCanProposeRequest,
  QueryCanVoteRequest,
  QueryDelegatorRequest,
  QueryDelegatorResponse,
  QueryDelegatorsByPoolAndStakerRequest,
  QueryFunderRequest,
  QueryFundersListRequest,
  QueryParamsResponse,
  QueryPoolRequest,
  QueryPoolsRequest,
  QueryProposalByHeightRequest,
  QueryProposalRequest,
  QueryProposalsRequest,
  QueryStakeInfoRequest,
  QueryStakeInfoResponse,
  QueryStakerRequest,
  QueryStakersByPoolAndDelegatorRequest,
  QueryStakersListRequest,
  QueryAccountStakingUnbondingsRequest,
  QueryAccountDelegationUnbondingsRequest,
} from "@kyvenetwork/proto/dist/proto/kyve/registry/v1beta1/query";
import { kyve } from "@kyvenetwork/proto";
import kyveQueryRes = kyve.registry.v1beta1.kyveQueryRes;
import { PageRequest } from "@kyvenetwork/proto/dist/proto/cosmos/base/query/v1beta1/pagination";
import { AbstractKyveLCDClient } from "../../lcd-client.abstract";

type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R>
    ? Array<NestedPartial<R>>
    : NestedPartial<T[K]>;
};
type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
type PaginationRequestType = {
  offset: string;
  limit: string;
  count_total: boolean;
  reverse: boolean;
  key: string;
};
type PaginationPartialRequestUtilType<T extends { pagination?: PageRequest }> =
  Overwrite<T, { pagination?: Partial<PaginationRequestType> }>;
type PaginationAllPartialRequestUtilType<T> = NestedPartial<
  Overwrite<
    T,
    {
      pagination?: {
        offset: string;
        limit: string;
        count_total: boolean;
        reverse: boolean;
        key: string;
      };
    }
  >
>;

type PaginationResponseTypeUtil<T> = Overwrite<
  T,
  { pagination?: { next_key: string; total: string } }
>;

export class KyveRegistryLCDClient extends AbstractKyveLCDClient {
  constructor(restEndpoint: string) {
    super(restEndpoint);
  }

  async params(): Promise<QueryParamsResponse> {
    const endpoint = `kyve/registry/v1beta1/params`;
    return await this.request(endpoint);
  }

  /* Pool queries a pool by ID. */
  async pool(
    params: QueryPoolRequest
  ): Promise<kyveQueryRes.QueryPoolResponse> {
    const endpoint = `kyve/registry/v1beta1/pool/${params.id}`;
    return await this.request(endpoint);
  }

  /* Pools queries for all pools. */
  async pools(
    params?: PaginationAllPartialRequestUtilType<QueryPoolsRequest>
  ): Promise<PaginationResponseTypeUtil<kyveQueryRes.QueryPoolsResponse>> {
    const parameters: Record<string, any> = {};
    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }

    if (typeof params?.search !== "undefined") {
      parameters.search = params.search;
    }

    if (typeof params?.runtime !== "undefined") {
      parameters.runtime = params.runtime;
    }

    if (typeof params?.paused !== "undefined") {
      parameters.paused = params.paused;
    }

    const endpoint = `kyve/registry/v1beta1/pools`;
    return await this.request(endpoint, parameters);
  }

  /* FundersList returns all funder addresses with their corresponding funding amount for a given pool */
  async fundersList(
    params: QueryFundersListRequest
  ): Promise<kyveQueryRes.QueryFundersListResponse> {
    const parameters: Record<string, any> = {};
    const endpoint = `kyve/registry/v1beta1/funders_list/${params.pool_id}`;
    return await this.request(endpoint, parameters);
  }

  /* Funder returns all funder info */
  async funder(
    params: QueryFunderRequest
  ): Promise<kyveQueryRes.QueryFunderResponse> {
    const endpoint = `kyve/registry/v1beta1/funder/${params.pool_id}/${params.funder}`;
    return await this.request(endpoint);
  }

  /* StakersList returns all staker addresses with their corresponding staking amount for a given pool */
  async stakersList(
    params: QueryStakersListRequest
  ): Promise<kyveQueryRes.QueryStakersListResponse> {
    const endpoint = `kyve/registry/v1beta1/stakers_list/${params.pool_id}`;
    return await this.request(endpoint, params);
  }

  /* Staker returns all staker info */
  async staker(
    params: QueryStakerRequest
  ): Promise<kyveQueryRes.QueryStakerResponse> {
    const endpoint = `kyve/registry/v1beta1/staker/${params.pool_id}/${params.staker}`;
    return await this.request(endpoint);
  }

  /* Proposal ... */
  async proposal(
    params: QueryProposalRequest
  ): Promise<kyveQueryRes.QueryProposalResponse> {
    const endpoint = `kyve/registry/v1beta1/proposal/${params.storage_id}`;
    return await this.request(endpoint);
  }

  /* Proposals ... */
  async proposals(
    params: PaginationPartialRequestUtilType<QueryProposalsRequest>
  ): Promise<PaginationResponseTypeUtil<kyveQueryRes.QueryProposalsResponse>> {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }
    const endpoint = `kyve/registry/v1beta1/proposals/${params.pool_id}`;
    return await this.request(endpoint, parameters);
  }

  /* ProposalByHeight ... */
  async proposalByHeight(
    params: QueryProposalByHeightRequest
  ): Promise<kyveQueryRes.QueryProposalByHeightResponse> {
    const endpoint = `kyve/registry/v1beta1/proposal_by_height/${params.pool_id}/${params.height}`;
    return await this.request(endpoint);
  }

  /* CanPropose ... */
  async canPropose(
    params: QueryCanProposeRequest
  ): Promise<kyveQueryRes.QueryCanProposeResponse> {
    const endpoint = `kyve/registry/v1beta1/can_propose/${params.pool_id}/${params.proposer}/${params.from_height}`;
    return await this.request(endpoint);
  }

  /* CanVote checks if voter on pool can still vote for the given bundle */
  async canVote(
    params: QueryCanVoteRequest
  ): Promise<kyveQueryRes.QueryCanVoteResponse> {
    const endpoint = `kyve/registry/v1beta1/can_vote/${params.pool_id}/${params.voter}/${params.storage_id}`;
    return await this.request(endpoint);
  }

  /* StakeInfo returns necessary information to become a staker (used by the protocol nodes) */
  async stakeInfo(
    params: QueryStakeInfoRequest
  ): Promise<QueryStakeInfoResponse> {
    const endpoint = `kyve/registry/v1beta1/stake_info/${params.pool_id}/${params.staker}`;
    return await this.request(endpoint);
  }

  /* AccountAssets returns an overview of the sum of all balances for a given user. e.g. balance, staking, funding, etc. */
  async accountAssets(
    params: QueryAccountAssetsRequest
  ): Promise<kyveQueryRes.QueryAccountAssetsResponse> {
    const endpoint = `kyve/registry/v1beta1/account_assets/${params.address}`;
    return await this.request(endpoint);
  }

  /* AccountFundedList returns all pools the given user has funded into. */
  async accountFundedList(
    params: PaginationPartialRequestUtilType<QueryAccountFundedListRequest>
  ): Promise<PaginationResponseTypeUtil<QueryAccountFundedListResponse>> {
    const endpoint = `kyve/registry/v1beta1/account_funded_list/${params.address}`;
    return await this.request(endpoint);
  }

  /* AccountStakedList ... */
  async accountStakedList(
    params: PaginationPartialRequestUtilType<QueryAccountStakedListRequest>
  ): Promise<
    PaginationResponseTypeUtil<kyveQueryRes.QueryAccountStakedListResponse>
  > {
    const endpoint = `kyve/registry/v1beta1/account_staked_list/${params.address}`;
    return await this.request(endpoint);
  }

  /* AccountDelegationList ... */
  async accountDelegationList(
    params: PaginationPartialRequestUtilType<QueryAccountDelegationListRequest>
  ): Promise<
    PaginationResponseTypeUtil<kyveQueryRes.QueryAccountDelegationListResponse>
  > {
    const parameters: Record<string, any> = {};
    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }

    const endpoint = `kyve/registry/v1beta1/account_delegation_list/${params.address}`;
    return await this.request(endpoint, parameters);
  }

  /* Delegator returns all delegation info */
  async delegator(
    params: QueryDelegatorRequest
  ): Promise<QueryDelegatorResponse> {
    const endpoint = `kyve/registry/v1beta1/delegator/${params.pool_id}/${params.staker}/${params.delegator}`;
    return await this.request(endpoint);
  }

  /* DelegatorsByPoolAndStaker ... */
  async delegatorsByPoolAndStaker(
    params: PaginationPartialRequestUtilType<QueryDelegatorsByPoolAndStakerRequest>
  ): Promise<
    PaginationResponseTypeUtil<kyveQueryRes.QueryDelegatorsByPoolAndStakerResponse>
  > {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }
    const endpoint = `kyve/registry/v1beta1/delegators_by_pool_and_staker/${params.pool_id}/${params.staker}`;
    return await this.request(endpoint, parameters);
  }

  /* StakersByPoolAndDelegator ... */
  async stakersByPoolAndDelegator(
    params: PaginationPartialRequestUtilType<QueryStakersByPoolAndDelegatorRequest>
  ): Promise<
    PaginationResponseTypeUtil<kyveQueryRes.QueryStakersByPoolAndDelegatorResponse>
  > {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }

    const endpoint = `kyve/registry/v1beta1/stakers_by_pool_and_delegator/${params.pool_id}/${params.delegator}`;
    return await this.request(endpoint, parameters);
  }

  async accountStakingUnbonding(
    params: PaginationAllPartialRequestUtilType<QueryAccountStakingUnbondingsRequest>
  ): Promise<
    PaginationResponseTypeUtil<kyveQueryRes.QueryAccountStakingUnbondingsResponse>
  > {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }
    const endpoint = `kyve/registry/v1beta1/account_staking_unbondings/${params.address}`;
    return await this.request(endpoint, parameters);
  }

  async accountDelegationUnbondings(
    params: PaginationAllPartialRequestUtilType<QueryAccountDelegationUnbondingsRequest>
  ): Promise<
    PaginationResponseTypeUtil<kyveQueryRes.QueryAccountDelegationUnbondingsResponse>
  > {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }
    const endpoint = `kyve/registry/v1beta1/account_delegation_unbondings/${params.address}`;
    return await this.request(endpoint, parameters);
  }
}
