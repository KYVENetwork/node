import * as _kyveBundles from "./proto/kyve/bundles/v1beta1/tx";
import * as _kyveDelegation from "./proto/kyve/delegation/v1beta1/tx";
import * as _kyvePool from "./proto/kyve/pool/v1beta1/tx";
import * as _kyveStakers from "./proto/kyve/stakers/v1beta1/tx";
import * as _kyveGov from "./proto/kyve/pool/v1beta1/gov";
import * as _kyveQuery from "./proto/kyve/query/v1beta1/query";
import * as _kyveQueryRes from "./proto-res/kyve/query/v1beta1/query";
import * as _kyveQueryAccount from "./proto/kyve/query/v1beta1/account";
import * as _kyveQueryAccountRes from "./proto-res/kyve/query/v1beta1/account";
import * as _kyveQueryDelegation from "./proto/kyve/query/v1beta1/delegation";
import * as _kyveQueryDelegationRes from "./proto-res/kyve/query/v1beta1/delegation";
import * as _kyveQueryBundles from "./proto/kyve/query/v1beta1/bundles";
import * as _kyveQueryBundlesRes from "./proto-res/kyve/query/v1beta1/bundles";
import * as _kyveQueryPools from "./proto/kyve/query/v1beta1/pools";
import * as _kyveQueryPoolsRes from "./proto-res/kyve/query/v1beta1/pools";
import * as _kyveQueryStakers from "./proto/kyve/query/v1beta1/stakers";
import * as _kyveQueryStakersRes from "./proto-res/kyve/query/v1beta1/stakers";
import * as _kyveGovPool from "./proto/kyve/pool/v1beta1/gov";
import * as _kyveQueryParams from "./proto/kyve/query/v1beta1/params";
import * as _kyveQueryParamsRes from "./proto-res/kyve/query/v1beta1/params"

export namespace kyve {
    //todo split by modules
    export namespace registry {
        export namespace v1beta1 {
            export import kyveBundles = _kyveBundles;
            export import kyveQueryParamsRes = _kyveQueryParamsRes;
            export import kyveDelegation = _kyveDelegation;
            export import kyvePool = _kyvePool;
            export import kyveStakers = _kyveStakers;
            export import kyveGov = _kyveGov;
            export import kyveGovPool = _kyveGovPool;
        }
    }
    export namespace query {
        export namespace v1beta1 {
            // queries
            export import kyveQueryParams = _kyveQueryParams;
            export import kyveQuery = _kyveQuery;
            export import kyveQueryRes = _kyveQueryRes;
            export import kyveQueryAccount = _kyveQueryAccount
            export import kyveQueryAccountRes = _kyveQueryAccountRes;
            export import kyveQueryDelegation = _kyveQueryDelegation;
            export import kyveQueryDelegationRes = _kyveQueryDelegationRes;
            export import kyveQueryBundles = _kyveQueryBundles;
            export import kyveQueryBundlesRes = _kyveQueryBundlesRes;
            export import kyveQueryPools = _kyveQueryPools;
            export import kyveQueryPoolsRes = _kyveQueryPoolsRes;
            export import kyveQueryStakers = _kyveQueryStakers;
            export import kyveQueryStakersRes = _kyveQueryStakersRes;
        }
    }
}
