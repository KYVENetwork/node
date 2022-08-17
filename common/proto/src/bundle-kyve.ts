import * as _kyveBundles from "./proto/kyve/bundles/v1beta1/tx";
import * as _kyveDelegation from "./proto/kyve/delegation/v1beta1/tx";
import * as _kyvePool from "./proto/kyve/pool/v1beta1/tx";
import * as _kyveStakers from "./proto/kyve/stakers/v1beta1/tx";
import * as _kyveGov from "./proto/kyve/registry/v1beta1/gov";
import * as _kyveQuery from "./proto/kyve/query/v1beta1/query";
import * as _kyveQueryRes from "./proto-res/kyve/query/v1beta1/query";

export namespace kyve {
    export namespace registry {
        export namespace v1beta1 {
            export import kyveBundles = _kyveBundles;
            export import kyveDelegation = _kyveDelegation;
            export import kyvePool = _kyvePool;
            export import kyveStakers = _kyveStakers;
            export import kyveQuery = _kyveQuery;
            export import kyveQueryRes = _kyveQueryRes;
            export import kyveGov = _kyveGov;
        }
    }
}
