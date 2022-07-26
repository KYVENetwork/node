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
exports.signTx = exports.TxPromise = void 0;
var cosmos_1 = require("@keplr-wallet/cosmos");
var TxRaw = cosmos_1.cosmos.tx.v1beta1.TxRaw;
var encoding_1 = require("@cosmjs/encoding");
var crypto_1 = require("@cosmjs/crypto");
var stargate_1 = require("@cosmjs/stargate");
var TxPromise = /** @class */ (function () {
    function TxPromise(nativeClient, tx) {
        this.nativeClient = nativeClient;
        this.txBytes = tx.txRawBytes;
        this.fee = tx.fee;
        this.txHash = (0, encoding_1.toHex)((0, crypto_1.sha256)(this.txBytes)).toUpperCase();
    }
    TxPromise.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nativeClient.broadcastTx(this.txBytes)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return TxPromise;
}());
exports.TxPromise = TxPromise;
function calcFee(gasEstimation, fee) {
    return __awaiter(this, void 0, void 0, function () {
        var multiplier;
        return __generator(this, function (_a) {
            multiplier = typeof fee === "number" ? fee : 1.5;
            // calculateFee(Math.round(gasEstimation * multiplier), "5000000tkyve");
            return [2 /*return*/, {
                    amount: (0, stargate_1.coins)("5000000", "tkyve"),
                    gas: Math.floor(gasEstimation * multiplier).toString()
                }];
        });
    });
}
function signTx(nativeClient, address, tx, options) {
    return __awaiter(this, void 0, void 0, function () {
        var gasEstimation, fee, txRaw, gasEstimation, fee, txRaw, txRaw;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(!options || options.fee == undefined)) return [3 /*break*/, 4];
                    return [4 /*yield*/, nativeClient.simulate(address, [tx], undefined)];
                case 1:
                    gasEstimation = _a.sent();
                    return [4 /*yield*/, calcFee(gasEstimation, "auto")];
                case 2:
                    fee = _a.sent();
                    return [4 /*yield*/, nativeClient.sign(address, [tx], fee, (options === null || options === void 0 ? void 0 : options.memo) ? options === null || options === void 0 ? void 0 : options.memo : "")];
                case 3:
                    txRaw = _a.sent();
                    return [2 /*return*/, {
                            txRawBytes: TxRaw.encode(txRaw).finish(),
                            fee: fee
                        }];
                case 4:
                    if (!(options.fee === "auto" || typeof options.fee == "number")) return [3 /*break*/, 8];
                    return [4 /*yield*/, nativeClient.simulate(address, [tx], options === null || options === void 0 ? void 0 : options.memo)];
                case 5:
                    gasEstimation = _a.sent();
                    return [4 /*yield*/, calcFee(gasEstimation, options.fee)];
                case 6:
                    fee = _a.sent();
                    return [4 /*yield*/, nativeClient.sign(address, [tx], fee, (options === null || options === void 0 ? void 0 : options.memo) ? options === null || options === void 0 ? void 0 : options.memo : "")];
                case 7:
                    txRaw = _a.sent();
                    return [2 /*return*/, {
                            txRawBytes: TxRaw.encode(txRaw).finish(),
                            fee: fee
                        }];
                case 8: return [4 /*yield*/, nativeClient.sign(address, [tx], options.fee, (options === null || options === void 0 ? void 0 : options.memo) ? options === null || options === void 0 ? void 0 : options.memo : "")];
                case 9:
                    txRaw = _a.sent();
                    return [2 /*return*/, {
                            txRawBytes: TxRaw.encode(txRaw).finish(),
                            fee: options.fee
                        }];
            }
        });
    });
}
exports.signTx = signTx;
