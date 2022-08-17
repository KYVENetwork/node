import * as _cosmosTx from "./proto/cosmos/gov/v1beta1/tx";
import * as _cosmosQuery from "./proto/cosmos/gov/v1beta1/query";
import * as _cosmosGenesis from "./proto/cosmos/gov/v1beta1/genesis";
import * as _cosmosGov from "./proto/cosmos/gov/v1beta1/gov";
import * as _cosmosGovTx from "./proto/cosmos/gov/v1beta1/tx";
import * as _cosmosParams from "./proto/cosmos/params/v1beta1/params";
import * as _cosmosPaginationQuery from "./proto/cosmos/base/query/v1beta1/pagination";

export namespace cosmos {
    export namespace registry {
        export namespace v1beta1  {
            export import cosmosTx = _cosmosTx;
            export import cosmosQuery = _cosmosQuery;
            export import cosmosPaginationQuery = _cosmosPaginationQuery;
            export import cosmosGenesis = _cosmosGenesis;
            export import cosmosGov = _cosmosGov;
            export import cosmosGovTx = _cosmosGovTx;
            export import cosmosParams = _cosmosParams;
        }
    }
}