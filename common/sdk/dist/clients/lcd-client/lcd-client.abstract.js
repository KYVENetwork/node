"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.AbstractKyveLCDClient = void 0;
var axios_1 = __importDefault(require("axios"));
var qs_1 = __importDefault(require("qs"));
axios_1["default"].interceptors.request.use(function (config) {
    config.paramsSerializer = function (params) {
        return qs_1["default"].stringify(params, {
            allowDots: true,
            encode: false
        });
    };
    return config;
});
var AbstractKyveLCDClient = /** @class */ (function () {
    function AbstractKyveLCDClient(restEndpoint) {
        var _this = this;
        this.restEndpoint = restEndpoint;
        this.request = function (url, params) {
            return axios_1["default"]
                .get(new URL(url, _this.restEndpoint).href, { params: params })
                .then(function (res) { return res.data; });
        };
    }
    return AbstractKyveLCDClient;
}());
exports.AbstractKyveLCDClient = AbstractKyveLCDClient;
