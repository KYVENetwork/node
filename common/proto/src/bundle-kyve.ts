import * as _genesisKyve from "./proto/kyve/registry/v1beta1/genesis";
import * as _kyveGov from "./proto/kyve/registry/v1beta1/gov";
import * as _kyveParams from "./proto/kyve/registry/v1beta1/params";
import * as _kyveQuery from "./proto/kyve/registry/v1beta1/query";
import * as _kyveRegistry from "./proto/kyve/registry/v1beta1/registry";
import * as _kyveTx from "./proto/kyve/registry/v1beta1/tx";
import * as _kyveQueryRes from "./proto-res/kyve/registry/v1beta1/query"

export namespace kyve {
    export namespace registry {
        export namespace v1beta1 {
            export import genesisKyve = _genesisKyve;
            export import kyveGov = _kyveGov;
            export import kyveParams = _kyveParams;
            export import kyveQuery = _kyveQuery;
            export import kyveQueryRes = _kyveQueryRes;
            export import kyveRegistry = _kyveRegistry;
            export import kyveTx = _kyveTx;
        }
    }
}
