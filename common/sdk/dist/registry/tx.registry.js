"use strict";
exports.__esModule = true;
exports.MessageComposer = exports.withTypeUrl = exports.encodeTxMsg = exports.load = exports.registry = void 0;
var tx_1 = require("@kyve/proto/dist/proto/kyve/registry/v1beta1/tx");
var proto_1 = require("@kyve/proto");
exports.registry = [
    ["/kyve.registry.v1beta1.MsgFundPool", tx_1.MsgFundPool],
    ["/kyve.registry.v1beta1.MsgDefundPool", tx_1.MsgDefundPool],
    ["/kyve.registry.v1beta1.MsgStakePool", tx_1.MsgStakePool],
    ["/kyve.registry.v1beta1.MsgUnstakePool", tx_1.MsgUnstakePool],
    ["/kyve.registry.v1beta1.MsgDelegatePool", tx_1.MsgDelegatePool],
    ["/kyve.registry.v1beta1.MsgWithdrawPool", tx_1.MsgWithdrawPool],
    ["/kyve.registry.v1beta1.MsgRedelegatePool", tx_1.MsgRedelegatePool],
    ["/kyve.registry.v1beta1.MsgUndelegatePool", tx_1.MsgUndelegatePool],
    ["/kyve.registry.v1beta1.MsgSubmitBundleProposal", tx_1.MsgSubmitBundleProposal],
    ["/kyve.registry.v1beta1.MsgVoteProposal", tx_1.MsgVoteProposal],
    ["/kyve.registry.v1beta1.MsgClaimUploaderRole", tx_1.MsgClaimUploaderRole],
    ["/kyve.registry.v1beta1.MsgUpdateMetadata", tx_1.MsgUpdateMetadata],
    ["/kyve.registry.v1beta1.MsgUpdateCommission", tx_1.MsgUpdateCommission],
    ["/kyve.registry.v1beta1.MsgReactivateStaker", tx_1.MsgReactivateStaker],
    [
        "/cosmos.gov.v1beta1.MsgSubmitProposal",
        proto_1.cosmos.registry.v1beta1.cosmosGovTx.MsgSubmitProposal,
    ],
];
var load = function (protoRegistry) {
    exports.registry.forEach(function (_a) {
        var typeUrl = _a[0], mod = _a[1];
        protoRegistry.register(typeUrl, mod);
    });
};
exports.load = load;
exports.encodeTxMsg = {
    fundPool: function (value) {
        return {
            type_url: "/kyve.registry.v1beta1.MsgFundPool",
            value: tx_1.MsgFundPool.encode(value).finish()
        };
    },
    defundPool: function (value) {
        return {
            type_url: "/kyve.registry.v1beta1.MsgDefundPool",
            value: tx_1.MsgDefundPool.encode(value).finish()
        };
    },
    stakePool: function (value) {
        return {
            type_url: "/kyve.registry.v1beta1.MsgStakePool",
            value: tx_1.MsgStakePool.encode(value).finish()
        };
    },
    unstakePool: function (value) {
        return {
            type_url: "/kyve.registry.v1beta1.MsgUnstakePool",
            value: tx_1.MsgUnstakePool.encode(value).finish()
        };
    },
    delegatePool: function (value) {
        return {
            type_url: "/kyve.registry.v1beta1.MsgDelegatePool",
            value: tx_1.MsgDelegatePool.encode(value).finish()
        };
    },
    withdrawPool: function (value) {
        return {
            type_url: "/kyve.registry.v1beta1.MsgWithdrawPool",
            value: tx_1.MsgWithdrawPool.encode(value).finish()
        };
    },
    redelegatePool: function (value) {
        return {
            type_url: "/kyve.registry.v1beta1.MsgRedelegatePool",
            value: tx_1.MsgRedelegatePool.encode(value).finish()
        };
    },
    undelegatePool: function (value) {
        return {
            type_url: "/kyve.registry.v1beta1.MsgUndelegatePool",
            value: tx_1.MsgUndelegatePool.encode(value).finish()
        };
    },
    submitBundleProposal: function (value) {
        return {
            type_url: "/kyve.registry.v1beta1.MsgSubmitBundleProposal",
            value: tx_1.MsgSubmitBundleProposal.encode(value).finish()
        };
    },
    voteProposal: function (value) {
        return {
            type_url: "/kyve.registry.v1beta1.MsgVoteProposal",
            value: tx_1.MsgVoteProposal.encode(value).finish()
        };
    },
    claimUploaderRole: function (value) {
        return {
            type_url: "/kyve.registry.v1beta1.MsgClaimUploaderRole",
            value: tx_1.MsgClaimUploaderRole.encode(value).finish()
        };
    },
    updateMetadata: function (value) {
        return {
            type_url: "/kyve.registry.v1beta1.MsgUpdateMetadata",
            value: tx_1.MsgUpdateMetadata.encode(value).finish()
        };
    },
    updateCommission: function (value) {
        return {
            type_url: "/kyve.registry.v1beta1.MsgUpdateCommission",
            value: tx_1.MsgUpdateCommission.encode(value).finish()
        };
    },
    reactivateStaker: function (value) {
        return {
            type_url: "/kyve.registry.v1beta1.MsgReactivateStaker",
            value: tx_1.MsgReactivateStaker.encode(value).finish()
        };
    }
};
exports.withTypeUrl = {
    fundPool: function (value) {
        return {
            typeUrl: "/kyve.registry.v1beta1.MsgFundPool",
            value: value
        };
    },
    defundPool: function (value) {
        return {
            typeUrl: "/kyve.registry.v1beta1.MsgDefundPool",
            value: value
        };
    },
    stakePool: function (value) {
        return {
            typeUrl: "/kyve.registry.v1beta1.MsgStakePool",
            value: value
        };
    },
    unstakePool: function (value) {
        return {
            typeUrl: "/kyve.registry.v1beta1.MsgUnstakePool",
            value: value
        };
    },
    delegatePool: function (value) {
        return {
            typeUrl: "/kyve.registry.v1beta1.MsgDelegatePool",
            value: value
        };
    },
    withdrawPool: function (value) {
        return {
            typeUrl: "/kyve.registry.v1beta1.MsgWithdrawPool",
            value: value
        };
    },
    redelegatePool: function (value) {
        return {
            typeUrl: "/kyve.registry.v1beta1.MsgRedelegatePool",
            value: value
        };
    },
    undelegatePool: function (value) {
        return {
            typeUrl: "/kyve.registry.v1beta1.MsgUndelegatePool",
            value: value
        };
    },
    submitBundleProposal: function (value) {
        return {
            typeUrl: "/kyve.registry.v1beta1.MsgSubmitBundleProposal",
            value: value
        };
    },
    voteProposal: function (value) {
        return {
            typeUrl: "/kyve.registry.v1beta1.MsgVoteProposal",
            value: value
        };
    },
    claimUploaderRole: function (value) {
        return {
            typeUrl: "/kyve.registry.v1beta1.MsgClaimUploaderRole",
            value: value
        };
    },
    updateMetadata: function (value) {
        return {
            typeUrl: "/kyve.registry.v1beta1.MsgUpdateMetadata",
            value: value
        };
    },
    updateCommission: function (value) {
        return {
            typeUrl: "/kyve.registry.v1beta1.MsgUpdateCommission",
            value: value
        };
    },
    reactivateStaker: function (value) {
        return {
            typeUrl: "/kyve.registry.v1beta1.MsgReactivateStaker",
            value: value
        };
    }
};
exports.MessageComposer = {
    encoded: exports.encodeTxMsg,
    withTypeUrl: exports.withTypeUrl,
    toJSON: {
        fundPool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgFundPool",
                value: tx_1.MsgFundPool.toJSON(value)
            };
        },
        defundPool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgDefundPool",
                value: tx_1.MsgDefundPool.toJSON(value)
            };
        },
        stakePool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgStakePool",
                value: tx_1.MsgStakePool.toJSON(value)
            };
        },
        unstakePool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgUnstakePool",
                value: tx_1.MsgUnstakePool.toJSON(value)
            };
        },
        delegatePool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgDelegatePool",
                value: tx_1.MsgDelegatePool.toJSON(value)
            };
        },
        withdrawPool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgWithdrawPool",
                value: tx_1.MsgWithdrawPool.toJSON(value)
            };
        },
        redelegatePool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgRedelegatePool",
                value: tx_1.MsgRedelegatePool.toJSON(value)
            };
        },
        undelegatePool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgUndelegatePool",
                value: tx_1.MsgUndelegatePool.toJSON(value)
            };
        },
        submitBundleProposal: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgSubmitBundleProposal",
                value: tx_1.MsgSubmitBundleProposal.toJSON(value)
            };
        },
        voteProposal: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgVoteProposal",
                value: tx_1.MsgVoteProposal.toJSON(value)
            };
        },
        claimUploaderRole: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgClaimUploaderRole",
                value: tx_1.MsgClaimUploaderRole.toJSON(value)
            };
        },
        updateMetadata: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgUpdateMetadata",
                value: tx_1.MsgUpdateMetadata.toJSON(value)
            };
        },
        updateCommission: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgUpdateCommission",
                value: tx_1.MsgUpdateCommission.toJSON(value)
            };
        },
        reactivateStaker: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgReactivateStaker",
                value: tx_1.MsgReactivateStaker.toJSON(value)
            };
        }
    },
    fromJSON: {
        fundPool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgFundPool",
                value: tx_1.MsgFundPool.fromJSON(value)
            };
        },
        defundPool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgDefundPool",
                value: tx_1.MsgDefundPool.fromJSON(value)
            };
        },
        stakePool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgStakePool",
                value: tx_1.MsgStakePool.fromJSON(value)
            };
        },
        unstakePool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgUnstakePool",
                value: tx_1.MsgUnstakePool.fromJSON(value)
            };
        },
        delegatePool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgDelegatePool",
                value: tx_1.MsgDelegatePool.fromJSON(value)
            };
        },
        withdrawPool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgWithdrawPool",
                value: tx_1.MsgWithdrawPool.fromJSON(value)
            };
        },
        redelegatePool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgRedelegatePool",
                value: tx_1.MsgRedelegatePool.fromJSON(value)
            };
        },
        undelegatePool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgUndelegatePool",
                value: tx_1.MsgUndelegatePool.fromJSON(value)
            };
        },
        submitBundleProposal: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgSubmitBundleProposal",
                value: tx_1.MsgSubmitBundleProposal.fromJSON(value)
            };
        },
        voteProposal: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgVoteProposal",
                value: tx_1.MsgVoteProposal.fromJSON(value)
            };
        },
        claimUploaderRole: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgClaimUploaderRole",
                value: tx_1.MsgClaimUploaderRole.fromJSON(value)
            };
        },
        updateMetadata: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgUpdateMetadata",
                value: tx_1.MsgUpdateMetadata.fromJSON(value)
            };
        },
        updateCommission: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgUpdateCommission",
                value: tx_1.MsgUpdateCommission.fromJSON(value)
            };
        },
        reactivateStaker: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgReactivateStaker",
                value: tx_1.MsgReactivateStaker.fromJSON(value)
            };
        }
    },
    fromPartial: {
        fundPool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgFundPool",
                value: tx_1.MsgFundPool.fromPartial(value)
            };
        },
        defundPool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgDefundPool",
                value: tx_1.MsgDefundPool.fromPartial(value)
            };
        },
        stakePool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgStakePool",
                value: tx_1.MsgStakePool.fromPartial(value)
            };
        },
        unstakePool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgUnstakePool",
                value: tx_1.MsgUnstakePool.fromPartial(value)
            };
        },
        delegatePool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgDelegatePool",
                value: tx_1.MsgDelegatePool.fromPartial(value)
            };
        },
        withdrawPool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgWithdrawPool",
                value: tx_1.MsgWithdrawPool.fromPartial(value)
            };
        },
        redelegatePool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgRedelegatePool",
                value: tx_1.MsgRedelegatePool.fromPartial(value)
            };
        },
        undelegatePool: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgUndelegatePool",
                value: tx_1.MsgUndelegatePool.fromPartial(value)
            };
        },
        submitBundleProposal: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgSubmitBundleProposal",
                value: tx_1.MsgSubmitBundleProposal.fromPartial(value)
            };
        },
        voteProposal: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgVoteProposal",
                value: tx_1.MsgVoteProposal.fromPartial(value)
            };
        },
        claimUploaderRole: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgClaimUploaderRole",
                value: tx_1.MsgClaimUploaderRole.fromPartial(value)
            };
        },
        updateMetadata: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgUpdateMetadata",
                value: tx_1.MsgUpdateMetadata.fromPartial(value)
            };
        },
        updateCommission: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgUpdateCommission",
                value: tx_1.MsgUpdateCommission.fromPartial(value)
            };
        },
        reactivateStaker: function (value) {
            return {
                typeUrl: "/kyve.registry.v1beta1.MsgReactivateStaker",
                value: tx_1.MsgReactivateStaker.fromPartial(value)
            };
        }
    }
};
