"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var tx_registry_1 = require("../../../registry/tx.registry");
var bignumber_js_1 = require("bignumber.js");
var constants_1 = require("../../../constants");
var constants_2 = require("../../../constants");
var helper_1 = require("../../../utils/helper");
var KyveBaseMsg = /** @class */ (function () {
    function KyveBaseMsg(client, account) {
        this.account = account;
        this.nativeClient = client;
    }
    KyveBaseMsg.prototype.fundPool = function (value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        tx = tx_registry_1.withTypeUrl.fundPool(__assign(__assign({}, value), { creator: this.account.address }));
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveBaseMsg.prototype.defundPool = function (value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        tx = tx_registry_1.withTypeUrl.defundPool(__assign(__assign({}, value), { creator: this.account.address }));
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveBaseMsg.prototype.stakePool = function (value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        tx = tx_registry_1.withTypeUrl.stakePool(__assign(__assign({}, value), { creator: this.account.address }));
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveBaseMsg.prototype.unstakePool = function (value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        tx = tx_registry_1.withTypeUrl.unstakePool(__assign(__assign({}, value), { creator: this.account.address }));
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveBaseMsg.prototype.delegatePool = function (value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        tx = tx_registry_1.withTypeUrl.delegatePool(__assign(__assign({}, value), { creator: this.account.address }));
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveBaseMsg.prototype.withdrawPool = function (value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        tx = tx_registry_1.withTypeUrl.withdrawPool(__assign(__assign({}, value), { creator: this.account.address }));
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveBaseMsg.prototype.undelegatePool = function (value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        tx = tx_registry_1.withTypeUrl.undelegatePool(__assign(__assign({}, value), { creator: this.account.address }));
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveBaseMsg.prototype.submitBundleProposal = function (value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        tx = tx_registry_1.withTypeUrl.submitBundleProposal(__assign(__assign({}, value), { creator: this.account.address }));
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveBaseMsg.prototype.voteProposal = function (value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        tx = tx_registry_1.withTypeUrl.voteProposal(__assign(__assign({}, value), { creator: this.account.address }));
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveBaseMsg.prototype.claimUploaderRole = function (value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        tx = tx_registry_1.withTypeUrl.claimUploaderRole(__assign(__assign({}, value), { creator: this.account.address }));
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveBaseMsg.prototype.updateMetadata = function (value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        tx = tx_registry_1.withTypeUrl.updateMetadata(__assign(__assign({}, value), { creator: this.account.address }));
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveBaseMsg.prototype.updateCommission = function (value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        tx = tx_registry_1.withTypeUrl.updateCommission(__assign(__assign({}, value), { creator: this.account.address }));
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveBaseMsg.prototype.reactivateStaker = function (value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        tx = tx_registry_1.withTypeUrl.reactivateStaker(__assign(__assign({}, value), { creator: this.account.address }));
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveBaseMsg.prototype.redelegatePool = function (value, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        tx = tx_registry_1.withTypeUrl.redelegatePool(__assign(__assign({}, value), { creator: this.account.address }));
                        _a = helper_1.TxPromise.bind;
                        _b = [void 0, this.nativeClient];
                        return [4 /*yield*/, (0, helper_1.signTx)(this.nativeClient, this.account.address, tx, options)];
                    case 1: return [2 /*return*/, new (_a.apply(helper_1.TxPromise, _b.concat([_c.sent()])))()];
                }
            });
        });
    };
    KyveBaseMsg.prototype.transfer = function (recipient, amount, options) {
        return __awaiter(this, void 0, void 0, function () {
            var parsedAmount;
            return __generator(this, function (_a) {
                parsedAmount = new bignumber_js_1.BigNumber(amount)
                    .multipliedBy(new bignumber_js_1.BigNumber(10).pow(constants_1.KYVE_DECIMALS))
                    .toNumber();
                return [2 /*return*/, this.nativeClient.sendTokens(this.account.address, recipient, (0, stargate_1.coins)(parsedAmount, constants_2.DENOM), (options === null || options === void 0 ? void 0 : options.fee) ? options === null || options === void 0 ? void 0 : options.fee : "auto", options === null || options === void 0 ? void 0 : options.memo)];
            });
        });
    };
    KyveBaseMsg.prototype.getKyveBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nativeClient.getBalance(this.account.address, constants_2.DENOM)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data.amount];
                }
            });
        });
    };
    return KyveBaseMsg;
}());
exports["default"] = KyveBaseMsg;
