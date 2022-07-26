"use strict";
exports.__esModule = true;
exports.createKyveLCDClient = void 0;
var query_1 = require("./registry/v1beta1/query");
var launchpad_1 = require("@cosmjs/launchpad");
var KyveLCDClient = /** @class */ (function () {
    function KyveLCDClient(restEndpoint) {
        this.registry = {
            v1beta1: new query_1.KyveRegistryLCDClient(restEndpoint)
        };
    }
    return KyveLCDClient;
}());
function createKyveLCDClient(restEndpoint) {
    var cosmosLcdClient = launchpad_1.LcdClient.withExtensions({ apiUrl: restEndpoint }, launchpad_1.setupAuthExtension, launchpad_1.setupBankExtension, launchpad_1.setupDistributionExtension, launchpad_1.setupGovExtension, launchpad_1.setupMintExtension, launchpad_1.setupSlashingExtension, launchpad_1.setupStakingExtension, launchpad_1.setupSupplyExtension);
    return {
        cosmos: {
            v1beta1: cosmosLcdClient
        },
        kyve: new KyveLCDClient(restEndpoint)
    };
}
exports.createKyveLCDClient = createKyveLCDClient;
