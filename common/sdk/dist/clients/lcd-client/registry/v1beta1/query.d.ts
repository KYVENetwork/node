import { QueryAccountAssetsRequest, QueryAccountDelegationListRequest, QueryAccountFundedListRequest, QueryAccountFundedListResponse, QueryAccountStakedListRequest, QueryCanProposeRequest, QueryCanVoteRequest, QueryDelegatorRequest, QueryDelegatorResponse, QueryDelegatorsByPoolAndStakerRequest, QueryFunderRequest, QueryFundersListRequest, QueryParamsResponse, QueryPoolRequest, QueryPoolsRequest, QueryProposalByHeightRequest, QueryProposalRequest, QueryProposalsRequest, QueryStakeInfoRequest, QueryStakeInfoResponse, QueryStakerRequest, QueryStakersByPoolAndDelegatorRequest, QueryStakersListRequest, QueryAccountStakingUnbondingsRequest, QueryAccountDelegationUnbondingsRequest } from "@kyve/proto/dist/proto/kyve/registry/v1beta1/query";
import { kyve } from "@kyve/proto";
import kyveQueryRes = kyve.registry.v1beta1.kyveQueryRes;
import { PageRequest } from "@kyve/proto/dist/proto/cosmos/base/query/v1beta1/pagination";
import { AbstractKyveLCDClient } from "../../lcd-client.abstract";
declare type NestedPartial<T> = {
    [K in keyof T]?: T[K] extends Array<infer R> ? Array<NestedPartial<R>> : NestedPartial<T[K]>;
};
declare type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
declare type PaginationRequestType = {
    offset: string;
    limit: string;
    count_total: boolean;
    reverse: boolean;
    key: string;
};
declare type PaginationPartialRequestUtilType<T extends {
    pagination?: PageRequest;
}> = Overwrite<T, {
    pagination?: Partial<PaginationRequestType>;
}>;
declare type PaginationAllPartialRequestUtilType<T> = NestedPartial<Overwrite<T, {
    pagination?: {
        offset: string;
        limit: string;
        count_total: boolean;
        reverse: boolean;
        key: string;
    };
}>>;
declare type PaginationResponseTypeUtil<T> = Overwrite<T, {
    pagination?: {
        next_key: string;
        total: string;
    };
}>;
export declare class KyveRegistryLCDClient extends AbstractKyveLCDClient {
    constructor(restEndpoint: string);
    params(): Promise<QueryParamsResponse>;
    pool(params: QueryPoolRequest): Promise<kyveQueryRes.QueryPoolResponse>;
    pools(params?: PaginationAllPartialRequestUtilType<QueryPoolsRequest>): Promise<PaginationResponseTypeUtil<kyveQueryRes.QueryPoolsResponse>>;
    fundersList(params: QueryFundersListRequest): Promise<kyveQueryRes.QueryFundersListResponse>;
    funder(params: QueryFunderRequest): Promise<kyveQueryRes.QueryFunderResponse>;
    stakersList(params: QueryStakersListRequest): Promise<kyveQueryRes.QueryStakersListResponse>;
    staker(params: QueryStakerRequest): Promise<kyveQueryRes.QueryStakerResponse>;
    proposal(params: QueryProposalRequest): Promise<kyveQueryRes.QueryProposalResponse>;
    proposals(params: PaginationPartialRequestUtilType<QueryProposalsRequest>): Promise<PaginationResponseTypeUtil<kyveQueryRes.QueryProposalsResponse>>;
    proposalByHeight(params: QueryProposalByHeightRequest): Promise<kyveQueryRes.QueryProposalByHeightResponse>;
    canPropose(params: QueryCanProposeRequest): Promise<kyveQueryRes.QueryCanProposeResponse>;
    canVote(params: QueryCanVoteRequest): Promise<kyveQueryRes.QueryCanVoteResponse>;
    stakeInfo(params: QueryStakeInfoRequest): Promise<QueryStakeInfoResponse>;
    accountAssets(params: QueryAccountAssetsRequest): Promise<kyveQueryRes.QueryAccountAssetsResponse>;
    accountFundedList(params: PaginationPartialRequestUtilType<QueryAccountFundedListRequest>): Promise<PaginationResponseTypeUtil<QueryAccountFundedListResponse>>;
    accountStakedList(params: PaginationPartialRequestUtilType<QueryAccountStakedListRequest>): Promise<PaginationResponseTypeUtil<kyveQueryRes.QueryAccountStakedListResponse>>;
    accountDelegationList(params: PaginationPartialRequestUtilType<QueryAccountDelegationListRequest>): Promise<PaginationResponseTypeUtil<kyveQueryRes.QueryAccountDelegationListResponse>>;
    delegator(params: QueryDelegatorRequest): Promise<QueryDelegatorResponse>;
    delegatorsByPoolAndStaker(params: PaginationPartialRequestUtilType<QueryDelegatorsByPoolAndStakerRequest>): Promise<PaginationResponseTypeUtil<kyveQueryRes.QueryDelegatorsByPoolAndStakerResponse>>;
    stakersByPoolAndDelegator(params: PaginationPartialRequestUtilType<QueryStakersByPoolAndDelegatorRequest>): Promise<PaginationResponseTypeUtil<kyveQueryRes.QueryStakersByPoolAndDelegatorResponse>>;
    accountStakingUnbonding(params: PaginationAllPartialRequestUtilType<QueryAccountStakingUnbondingsRequest>): Promise<PaginationResponseTypeUtil<kyveQueryRes.QueryAccountStakingUnbondingsResponse>>;
    accountDelegationUnbondings(params: PaginationAllPartialRequestUtilType<QueryAccountDelegationUnbondingsRequest>): Promise<PaginationResponseTypeUtil<kyveQueryRes.QueryAccountDelegationUnbondingsResponse>>;
}
export {};
