"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.KyveRegistryLCDClient = void 0;
var lcd_client_abstract_1 = require("../../lcd-client.abstract");
var KyveRegistryLCDClient = /** @class */ (function (_super) {
    __extends(KyveRegistryLCDClient, _super);
    function KyveRegistryLCDClient(restEndpoint) {
        return _super.call(this, restEndpoint) || this;
    }
    KyveRegistryLCDClient.prototype.params = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/params";
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* Pool queries a pool by ID. */
    KyveRegistryLCDClient.prototype.pool = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/pool/".concat(params.id);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* Pools queries for all pools. */
    KyveRegistryLCDClient.prototype.pools = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters, endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = {};
                        if (typeof (params === null || params === void 0 ? void 0 : params.pagination) !== "undefined") {
                            parameters.pagination = params.pagination;
                        }
                        if (typeof (params === null || params === void 0 ? void 0 : params.search) !== "undefined") {
                            parameters.search = params.search;
                        }
                        if (typeof (params === null || params === void 0 ? void 0 : params.runtime) !== "undefined") {
                            parameters.runtime = params.runtime;
                        }
                        if (typeof (params === null || params === void 0 ? void 0 : params.paused) !== "undefined") {
                            parameters.paused = params.paused;
                        }
                        endpoint = "kyve/registry/v1beta1/pools";
                        return [4 /*yield*/, this.request(endpoint, parameters)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* FundersList returns all funder addresses with their corresponding funding amount for a given pool */
    KyveRegistryLCDClient.prototype.fundersList = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters, endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = {};
                        endpoint = "kyve/registry/v1beta1/funders_list/".concat(params.pool_id);
                        return [4 /*yield*/, this.request(endpoint, parameters)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* Funder returns all funder info */
    KyveRegistryLCDClient.prototype.funder = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/funder/".concat(params.pool_id, "/").concat(params.funder);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* StakersList returns all staker addresses with their corresponding staking amount for a given pool */
    KyveRegistryLCDClient.prototype.stakersList = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/stakers_list/".concat(params.pool_id);
                        return [4 /*yield*/, this.request(endpoint, params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* Staker returns all staker info */
    KyveRegistryLCDClient.prototype.staker = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/staker/".concat(params.pool_id, "/").concat(params.staker);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* Proposal ... */
    KyveRegistryLCDClient.prototype.proposal = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/proposal/".concat(params.storage_id);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* Proposals ... */
    KyveRegistryLCDClient.prototype.proposals = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters, endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = {};
                        if (typeof (params === null || params === void 0 ? void 0 : params.pagination) !== "undefined") {
                            parameters.pagination = params.pagination;
                        }
                        endpoint = "kyve/registry/v1beta1/proposals/".concat(params.pool_id);
                        return [4 /*yield*/, this.request(endpoint, parameters)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* ProposalByHeight ... */
    KyveRegistryLCDClient.prototype.proposalByHeight = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/proposal_by_height/".concat(params.pool_id, "/").concat(params.height);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* CanPropose ... */
    KyveRegistryLCDClient.prototype.canPropose = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/can_propose/".concat(params.pool_id, "/").concat(params.proposer, "/").concat(params.from_height);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* CanVote checks if voter on pool can still vote for the given bundle */
    KyveRegistryLCDClient.prototype.canVote = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/can_vote/".concat(params.pool_id, "/").concat(params.voter, "/").concat(params.storage_id);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* StakeInfo returns necessary information to become a staker (used by the protocol nodes) */
    KyveRegistryLCDClient.prototype.stakeInfo = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/stake_info/".concat(params.pool_id, "/").concat(params.staker);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* AccountAssets returns an overview of the sum of all balances for a given user. e.g. balance, staking, funding, etc. */
    KyveRegistryLCDClient.prototype.accountAssets = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/account_assets/".concat(params.address);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* AccountFundedList returns all pools the given user has funded into. */
    KyveRegistryLCDClient.prototype.accountFundedList = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/account_funded_list/".concat(params.address);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* AccountStakedList ... */
    KyveRegistryLCDClient.prototype.accountStakedList = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/account_staked_list/".concat(params.address);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* AccountDelegationList ... */
    KyveRegistryLCDClient.prototype.accountDelegationList = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters, endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = {};
                        if (typeof (params === null || params === void 0 ? void 0 : params.pagination) !== "undefined") {
                            parameters.pagination = params.pagination;
                        }
                        endpoint = "kyve/registry/v1beta1/account_delegation_list/".concat(params.address);
                        return [4 /*yield*/, this.request(endpoint, parameters)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* Delegator returns all delegation info */
    KyveRegistryLCDClient.prototype.delegator = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "kyve/registry/v1beta1/delegator/".concat(params.pool_id, "/").concat(params.staker, "/").concat(params.delegator);
                        return [4 /*yield*/, this.request(endpoint)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* DelegatorsByPoolAndStaker ... */
    KyveRegistryLCDClient.prototype.delegatorsByPoolAndStaker = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters, endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = {};
                        if (typeof (params === null || params === void 0 ? void 0 : params.pagination) !== "undefined") {
                            parameters.pagination = params.pagination;
                        }
                        endpoint = "kyve/registry/v1beta1/delegators_by_pool_and_staker/".concat(params.pool_id, "/").concat(params.staker);
                        return [4 /*yield*/, this.request(endpoint, parameters)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /* StakersByPoolAndDelegator ... */
    KyveRegistryLCDClient.prototype.stakersByPoolAndDelegator = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters, endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = {};
                        if (typeof (params === null || params === void 0 ? void 0 : params.pagination) !== "undefined") {
                            parameters.pagination = params.pagination;
                        }
                        endpoint = "kyve/registry/v1beta1/stakers_by_pool_and_delegator/".concat(params.pool_id, "/").concat(params.delegator);
                        return [4 /*yield*/, this.request(endpoint, parameters)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    KyveRegistryLCDClient.prototype.accountStakingUnbonding = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters, endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = {};
                        if (typeof (params === null || params === void 0 ? void 0 : params.pagination) !== "undefined") {
                            parameters.pagination = params.pagination;
                        }
                        endpoint = "kyve/registry/v1beta1/account_staking_unbondings/".concat(params.address);
                        return [4 /*yield*/, this.request(endpoint, parameters)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    KyveRegistryLCDClient.prototype.accountDelegationUnbondings = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var parameters, endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = {};
                        if (typeof (params === null || params === void 0 ? void 0 : params.pagination) !== "undefined") {
                            parameters.pagination = params.pagination;
                        }
                        endpoint = "kyve/registry/v1beta1/account_delegation_unbondings/".concat(params.address);
                        return [4 /*yield*/, this.request(endpoint, parameters)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return KyveRegistryLCDClient;
}(lcd_client_abstract_1.AbstractKyveLCDClient));
exports.KyveRegistryLCDClient = KyveRegistryLCDClient;
