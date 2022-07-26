"use strict";
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
var stargate_1 = require("@cosmjs/stargate");
var constants_1 = require("../../../constants");
var gov_1 = require("@kyve/proto/dist/proto/cosmos/gov/v1beta1/gov");
var params_1 = require("@kyve/proto/dist/proto/cosmos/params/v1beta1/params");
var gov_2 = require("@kyve/proto/dist/proto/kyve/registry/v1beta1/gov");
var helper_1 = require("../../../utils/helper");
var cosmos_1 = require("@keplr-wallet/cosmos");
var KyveGovMsg = /** @class */ (function () {
    function KyveGovMsg(client, account) {
        this.account = account;
        this.nativeClient = client;
    }
    KyveGovMsg.prototype.createGovTx = function (amount, content, isExpedited) {
        if (isExpedited === void 0) { isExpedited = false; }
        return {
            typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
            value: {
                content: content,
                initial_deposit: (0, stargate_1.coins)(amount.toString(), constants_1.DENOM),
                proposer: this.account.address,
                is_expedited: isExpedited
            }
        };
    };
    KyveGovMsg.prototype.submitTextProposal = function (amount, value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var content, tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        content = {
                            typeUrl: "/cosmos.gov.v1beta1.TextProposal",
                            value: gov_1.TextProposal.encode(value).finish()
                        };
                        tx = this.createGovTx(amount, content, options === null || options === void 0 ? void 0 : options.isExpedited);
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveGovMsg.prototype.parameterChangeProposal = function (amount, value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var content, tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        content = {
                            typeUrl: "/cosmos.params.v1beta1.ParameterChangeProposal",
                            value: params_1.ParameterChangeProposal.encode(value).finish()
                        };
                        tx = this.createGovTx(amount, content, options === null || options === void 0 ? void 0 : options.isExpedited);
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveGovMsg.prototype.updatePoolProposal = function (amount, value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var content, tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        content = {
                            typeUrl: "/kyve.registry.v1beta1.UpdatePoolProposal",
                            value: gov_2.UpdatePoolProposal.encode(value).finish()
                        };
                        tx = this.createGovTx(amount, content, options === null || options === void 0 ? void 0 : options.isExpedited);
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveGovMsg.prototype.pausePoolProposal = function (amount, value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var content, tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        content = {
                            typeUrl: "/kyve.registry.v1beta1.PausePoolProposal",
                            value: gov_2.PausePoolProposal.encode(value).finish()
                        };
                        tx = this.createGovTx(amount, content, options === null || options === void 0 ? void 0 : options.isExpedited);
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveGovMsg.prototype.unpausePoolProposal = function (amount, value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var content, tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        content = {
                            typeUrl: "/kyve.registry.v1beta1.UnpausePoolProposal",
                            value: gov_2.UnpausePoolProposal.encode(value).finish()
                        };
                        tx = this.createGovTx(amount, content, options === null || options === void 0 ? void 0 : options.isExpedited);
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveGovMsg.prototype.schedulePoolUpgradeProposal = function (amount, value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var content, tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        content = {
                            typeUrl: "/kyve.registry.v1beta1.SchedulePoolUpgradeProposal",
                            value: gov_2.SchedulePoolUpgradeProposal.encode(value).finish()
                        };
                        tx = this.createGovTx(amount, content, options === null || options === void 0 ? void 0 : options.isExpedited);
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveGovMsg.prototype.cancelPoolUpgradeProposal = function (amount, value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var content, tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        content = {
                            typeUrl: "/kyve.registry.v1beta1.CancelPoolUpgradeProposal",
                            value: gov_2.CancelPoolUpgradeProposal.encode(value).finish()
                        };
                        tx = this.createGovTx(amount, content, options === null || options === void 0 ? void 0 : options.isExpedited);
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveGovMsg.prototype.resetPoolProposal = function (amount, value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var content, tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        content = {
                            typeUrl: "/kyve.registry.v1beta1.ResetPoolProposal",
                            value: gov_2.ResetPoolProposal.encode(value).finish()
                        };
                        tx = this.createGovTx(amount, content, options === null || options === void 0 ? void 0 : options.isExpedited);
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveGovMsg.prototype.createPoolProposal = function (amount, value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var content, tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        content = {
                            typeUrl: "/kyve.registry.v1beta1.CreatePoolProposal",
                            value: gov_2.CreatePoolProposal.encode(value).finish()
                        };
                        tx = this.createGovTx(amount, content, options === null || options === void 0 ? void 0 : options.isExpedited);
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveGovMsg.prototype.govVote = function (id, voteOption, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _option, tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _option = cosmos_1.cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_UNSPECIFIED;
                        switch (voteOption) {
                            case "Yes":
                                _option = cosmos_1.cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_YES;
                                break;
                            case "Abstain":
                                _option = cosmos_1.cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_ABSTAIN;
                                break;
                            case "No":
                                _option = cosmos_1.cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_NO;
                                break;
                            case "NoWithVeto":
                                _option = cosmos_1.cosmos.gov.v1beta1.VoteOption.VOTE_OPTION_NO_WITH_VETO;
                                break;
                        }
                        tx = {
                            typeUrl: "/cosmos.gov.v1beta1.MsgVote",
                            value: {
                                proposalId: id,
                                voter: this.account.address,
                                option: _option
                            }
                        };
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    return KyveGovMsg;
}());
exports["default"] = KyveGovMsg;
