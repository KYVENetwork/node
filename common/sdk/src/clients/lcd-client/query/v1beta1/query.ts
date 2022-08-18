import { kyve, cosmos } from "@kyve/proto";
import kyveQuery = kyve.registry.v1beta1.kyveQuery;
import kyveQueryRes = kyve.registry.v1beta1.kyveQueryRes;
import PageRequest = cosmos.registry.v1beta1.cosmosPaginationQuery.PageRequest;
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

  async pool(
    params: kyveQuery.QueryPoolRequest
  ): Promise<kyveQueryRes.QueryPoolResponse> {
    const endpoint = `/kyve/query/v1beta1/pool/${params.id}`;
    return await this.request(endpoint);
  }

  async pools(
    params?: PaginationAllPartialRequestUtilType<kyveQuery.QueryPoolsRequest>
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

    const endpoint = `kyve/query/v1beta1/pools`;
    return await this.request(endpoint, parameters);
  }

  async stakers(
    params: PaginationPartialRequestUtilType<kyveQuery.QueryStakersRequest>
  ): Promise<PaginationResponseTypeUtil<kyveQueryRes.QueryStakersResponse>> {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }
    const endpoint = `kyve/query/v1beta1/stakers`;
    return await this.request(endpoint, params);
  }

  async staker(
    params: kyveQuery.QueryStakerRequest
  ): Promise<kyveQueryRes.QueryStakerResponse> {
    const endpoint = `kyve/query/v1beta1/staker/${params.address}`;
    return await this.request(endpoint);
  }

  async stakersByPool(
    params: kyveQuery.QueryStakersByPoolRequest
  ): Promise<kyveQueryRes.QueryStakersByPoolResponse> {
    const endpoint = `kyve/query/v1beta1/stakers_by_pool/${params.pool_id}`;
    return await this.request(endpoint);
  }

  async finalizedBundles(
    params: PaginationPartialRequestUtilType<kyveQuery.QueryFinalizedBundlesRequest>
  ): Promise<
    PaginationResponseTypeUtil<kyveQueryRes.QueryFinalizedBundlesResponse>
  > {
    const parameters: Record<string, any> = {};

    if (typeof params?.pagination !== "undefined") {
      parameters.pagination = params.pagination;
    }
    const endpoint = `kyve/query/v1beta1/finalized_bundles/${params.pool_id}`;
    return await this.request(endpoint, parameters);
  }

  async finalizedBundle(
    params: kyveQuery.QueryFinalizedBundleRequest
  ): Promise<kyveQueryRes.QueryFinalizedBundleResponse> {
    const endpoint = `kyve/query/v1beta1/finalized_bundle/${params.pool_id}/${params.id}`;
    return await this.request(endpoint);
  }

  /* ProposalByHeight ... */
  async canValidate(
    params: kyveQuery.QueryCanValidateRequest
  ): Promise<kyveQueryRes.QueryCanValidateResponse> {
    const endpoint = `kyve/query/v1beta1/can_validate/${params.pool_id}/${params.valaddress}`;
    return await this.request(endpoint);
  }
  async canPropose(
    params: kyveQuery.QueryCanProposeRequest
  ): Promise<kyveQueryRes.QueryCanProposeResponse> {
    const endpoint = `kyve/query/v1beta1/can_propose/${params.pool_id}/${params.staker}/${params.proposer}/${params.from_height}`;
    return await this.request(endpoint);
  }
  async canVote(
    params: kyveQuery.QueryCanVoteRequest
  ): Promise<kyveQueryRes.QueryCanVoteResponse> {
    const endpoint = `kyve/query/v1beta1/can_vote/${params.pool_id}/${params.staker}/${params.voter}/${params.storage_id}`;
    return await this.request(endpoint);
  }
}
