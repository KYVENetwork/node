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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.KyveSDK = void 0;
var constants_1 = require("./constants");
var full_client_1 = require("./clients/full-client");
var proto_signing_1 = require("@cosmjs/proto-signing");
var cosmostation_helper_1 = require("./utils/cosmostation-helper");
var client_1 = require("./clients/lcd-client/client");
var bignumber_js_1 = require("bignumber.js");
// @ts-ignore
var humanize_number_1 = __importDefault(require("humanize-number"));
var encoding_1 = require("@cosmjs/encoding");
var amino_1 = require("@cosmjs/amino");
var keplr_helper_1 = require("./utils/keplr-helper");
var cosmos_1 = require("@keplr-wallet/cosmos");
/** Class representing a KyveSDK. */
var KyveSDK = /** @class */ (function () {
    /**
     * Create sdk instance.
     * @param network - The network type, e.g mainnet, testnet, etc
     */
    function KyveSDK(network) {
        this.walletSupports = new Set();
        if (typeof network === "string") {
            this.network = constants_1.KYVE_ENDPOINTS[network];
        }
        else {
            this.network = network;
        }
    }
    /**
     * Create a client from mnemonic
     * @param mnemonic
     * @return Promise<KyveClient>
     */
    KyveSDK.prototype.fromMnemonic = function (mnemonic) {
        return __awaiter(this, void 0, void 0, function () {
            var aminoSigner, signedClient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, amino_1.Secp256k1HdWallet.fromMnemonic(mnemonic, {
                            prefix: constants_1.PREFIX
                        })];
                    case 1:
                        aminoSigner = _a.sent();
                        return [4 /*yield*/, proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
                                prefix: constants_1.PREFIX
                            })];
                    case 2:
                        signedClient = _a.sent();
                        return [2 /*return*/, (0, full_client_1.getSigningKyveClient)(this.network.rpc, signedClient, aminoSigner)];
                }
            });
        });
    };
    /**
     * create a client from private key
     * @param privateKey - hex privateKey
     * @return Promise<KyveClient>
     */
    KyveSDK.prototype.fromPrivateKey = function (privateKey) {
        return __awaiter(this, void 0, void 0, function () {
            var formattedKey, signedClient, aminoSigner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formattedKey = (0, encoding_1.fromHex)(privateKey.startsWith("0x") ? privateKey.slice(2) : privateKey);
                        return [4 /*yield*/, proto_signing_1.DirectSecp256k1Wallet.fromKey(formattedKey, constants_1.PREFIX)];
                    case 1:
                        signedClient = _a.sent();
                        return [4 /*yield*/, amino_1.Secp256k1Wallet.fromKey(formattedKey, constants_1.PREFIX)];
                    case 2:
                        aminoSigner = _a.sent();
                        return [2 /*return*/, (0, full_client_1.getSigningKyveClient)(this.network.rpc, signedClient, aminoSigner)];
                }
            });
        });
    };
    /**
     * Crate a client from Keplr wallet if installed
     * @return Promise<KyveWebClient>
     */
    KyveSDK.prototype.fromKeplr = function () {
        return __awaiter(this, void 0, void 0, function () {
            var signer, walletName, keplr, keplrAminoSigner, client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof window === "undefined")
                            throw new Error("Unsupported.");
                        if (!window.keplr)
                            throw new Error("Please install Keplr.");
                        return [4 /*yield*/, window.keplr.experimentalSuggestChain(__assign(__assign({}, constants_1.KYVE_KEPLR_CONFIG), { rpc: this.network.rpc, rest: this.network.rest, chainId: this.network.chainId, chainName: this.network.chainName }))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, window.keplr.enable(this.network.chainId)];
                    case 2:
                        _a.sent();
                        window.keplr.defaultOptions = {
                            sign: {
                                preferNoSetFee: true
                            }
                        };
                        signer = window.keplr.getOfflineSigner(this.network.chainId);
                        return [4 /*yield*/, window.keplr.getKey(this.network.chainId)];
                    case 3:
                        walletName = (_a.sent()).name;
                        keplr = window.keplr;
                        keplrAminoSigner = new keplr_helper_1.KeplrAminoSigner(keplr, this.network);
                        return [4 /*yield*/, (0, full_client_1.getSigningKyveClient)(this.network.rpc, signer, keplrAminoSigner, walletName)];
                    case 4:
                        client = _a.sent();
                        this.walletSupports.add(constants_1.SUPPORTED_WALLETS.KEPLER);
                        return [2 /*return*/, client];
                }
            });
        });
    };
    /**
     * Crate a client from Cosmostaion wallet if installed
     * @return Promise<KyveWebClient>
     */
    KyveSDK.prototype.fromCosmostation = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var chain, cosmostationAccount, cosmostationSigner, client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof window === "undefined")
                            throw new Error("Unsupported.");
                        if (!window.cosmostation)
                            throw new Error("Please install cosmostation.");
                        return [4 /*yield*/, cosmostation_helper_1.cosmostationMethods.getSupportedChains()];
                    case 1:
                        chain = _a.sent();
                        if (!chain.unofficial.includes(this.network.chainName.toLowerCase().trim())) return [3 /*break*/, 3];
                        return [4 /*yield*/, cosmostation_helper_1.cosmostationMethods.requestAccount(this.network.chainName)];
                    case 2:
                        cosmostationAccount = _a.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, cosmostation_helper_1.cosmostationMethods.addChain(__assign(__assign({}, constants_1.KYVE_COSMOSTATION_CONFIG), { restURL: this.network.rest, chainId: this.network.chainId, chainName: this.network.chainName }))];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, cosmostation_helper_1.cosmostationMethods.requestAccount(this.network.chainName)];
                    case 5:
                        cosmostationAccount = _a.sent();
                        _a.label = 6;
                    case 6:
                        cosmostationSigner = new cosmostation_helper_1.CosmostationSigner(cosmostationAccount, this.network, config ? config : {});
                        return [4 /*yield*/, (0, full_client_1.getSigningKyveClient)(this.network.rpc, cosmostationSigner, null, cosmostationAccount.name)];
                    case 7:
                        client = _a.sent();
                        this.walletSupports.add(constants_1.SUPPORTED_WALLETS.COSMOSTATION);
                        return [2 /*return*/, client];
                }
            });
        });
    };
    /**
     * Listener to detect if account in wallet changed, support fromKeplr and fromCosmostation  instances
     * @param cb
     */
    KyveSDK.prototype.onAccountChange = function (cb) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.walletSupports.has(constants_1.SUPPORTED_WALLETS.COSMOSTATION))
                    return [2 /*return*/, window.cosmostation.tendermint.on("accountChanged", cb)];
                if (this.walletSupports.has(constants_1.SUPPORTED_WALLETS.KEPLER))
                    return [2 /*return*/, window.addEventListener("keplr_keystorechange", cb)];
                throw new Error("Need to initiate from wallet");
            });
        });
    };
    /**
     * create LCD client to get data from Rest api
     */
    KyveSDK.prototype.createLCDClient = function () {
        return (0, client_1.createKyveLCDClient)(this.network.rest);
    };
    /**
     * generate KyveClient instance without mnemonic
     */
    KyveSDK.prototype.generate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var signer, aminoSigner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, proto_signing_1.DirectSecp256k1HdWallet.generate(24, {
                            prefix: constants_1.PREFIX
                        })];
                    case 1:
                        signer = _a.sent();
                        return [4 /*yield*/, amino_1.Secp256k1HdWallet.fromMnemonic(signer.mnemonic, {
                                prefix: constants_1.PREFIX
                            })];
                    case 2:
                        aminoSigner = _a.sent();
                        return [2 /*return*/, (0, full_client_1.getSigningKyveClient)(this.network.rpc, signer, aminoSigner)];
                }
            });
        });
    };
    KyveSDK.formatBalance = function (balance, decimals) {
        if (decimals === void 0) { decimals = 2; }
        return (0, humanize_number_1["default"])(new bignumber_js_1.BigNumber(balance)
            .dividedBy(new bignumber_js_1.BigNumber(10).exponentiatedBy(constants_1.KYVE_DECIMALS))
            .toFixed(decimals));
    };
    KyveSDK.getAddressFromPubKey = function (pubKey) {
        return (0, amino_1.pubkeyToAddress)({ type: "tendermint/PubKeySecp256k1", value: pubKey }, constants_1.PREFIX);
    };
    KyveSDK.verifyString = function (signature, data, pubKey) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, cosmos_1.verifyADR36Amino)(constants_1.PREFIX, KyveSDK.getAddressFromPubKey(pubKey), new TextEncoder().encode(data), (0, encoding_1.fromBase64)(pubKey), (0, encoding_1.fromBase64)(signature))];
            });
        });
    };
    return KyveSDK;
}());
exports.KyveSDK = KyveSDK;
