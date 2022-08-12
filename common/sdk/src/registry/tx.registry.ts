import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import {
  MsgFundPool,
  MsgDefundPool,
  MsgStakePool,
  MsgUnstakePool,
  MsgDelegatePool,
  MsgWithdrawPool,
  MsgUndelegatePool,
  MsgSubmitBundleProposal,
  MsgVoteProposal,
  MsgClaimUploaderRole,
  MsgUpdateMetadata,
  MsgUpdateCommission,
  MsgReactivateStaker,
  MsgRedelegatePool,
} from "@kyvenetwork/proto/dist/proto/kyve/registry/v1beta1/tx";
import { cosmos } from "@kyvenetwork/proto";

export const registry: ReadonlyArray<[string, GeneratedType]> = [
  ["/kyve.registry.v1beta1.MsgFundPool", MsgFundPool],
  ["/kyve.registry.v1beta1.MsgDefundPool", MsgDefundPool],
  ["/kyve.registry.v1beta1.MsgStakePool", MsgStakePool],
  ["/kyve.registry.v1beta1.MsgUnstakePool", MsgUnstakePool],
  ["/kyve.registry.v1beta1.MsgDelegatePool", MsgDelegatePool],
  ["/kyve.registry.v1beta1.MsgWithdrawPool", MsgWithdrawPool],
  ["/kyve.registry.v1beta1.MsgRedelegatePool", MsgRedelegatePool],
  ["/kyve.registry.v1beta1.MsgUndelegatePool", MsgUndelegatePool],
  ["/kyve.registry.v1beta1.MsgSubmitBundleProposal", MsgSubmitBundleProposal],
  ["/kyve.registry.v1beta1.MsgVoteProposal", MsgVoteProposal],
  ["/kyve.registry.v1beta1.MsgClaimUploaderRole", MsgClaimUploaderRole],
  ["/kyve.registry.v1beta1.MsgUpdateMetadata", MsgUpdateMetadata],
  ["/kyve.registry.v1beta1.MsgUpdateCommission", MsgUpdateCommission],
  ["/kyve.registry.v1beta1.MsgReactivateStaker", MsgReactivateStaker],
  [
    "/cosmos.gov.v1beta1.MsgSubmitProposal",
    cosmos.registry.v1beta1.cosmosGovTx.MsgSubmitProposal,
  ],
];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const encodeTxMsg = {
  fundPool(value: MsgFundPool) {
    return {
      type_url: "/kyve.registry.v1beta1.MsgFundPool",
      value: MsgFundPool.encode(value).finish(),
    };
  },

  defundPool(value: MsgDefundPool) {
    return {
      type_url: "/kyve.registry.v1beta1.MsgDefundPool",
      value: MsgDefundPool.encode(value).finish(),
    };
  },

  stakePool(value: MsgStakePool) {
    return {
      type_url: "/kyve.registry.v1beta1.MsgStakePool",
      value: MsgStakePool.encode(value).finish(),
    };
  },

  unstakePool(value: MsgUnstakePool) {
    return {
      type_url: "/kyve.registry.v1beta1.MsgUnstakePool",
      value: MsgUnstakePool.encode(value).finish(),
    };
  },

  delegatePool(value: MsgDelegatePool) {
    return {
      type_url: "/kyve.registry.v1beta1.MsgDelegatePool",
      value: MsgDelegatePool.encode(value).finish(),
    };
  },

  withdrawPool(value: MsgWithdrawPool) {
    return {
      type_url: "/kyve.registry.v1beta1.MsgWithdrawPool",
      value: MsgWithdrawPool.encode(value).finish(),
    };
  },

  redelegatePool(value: MsgRedelegatePool) {
    return {
      type_url: "/kyve.registry.v1beta1.MsgRedelegatePool",
      value: MsgRedelegatePool.encode(value).finish(),
    };
  },

  undelegatePool(value: MsgUndelegatePool) {
    return {
      type_url: "/kyve.registry.v1beta1.MsgUndelegatePool",
      value: MsgUndelegatePool.encode(value).finish(),
    };
  },

  submitBundleProposal(value: MsgSubmitBundleProposal) {
    return {
      type_url: "/kyve.registry.v1beta1.MsgSubmitBundleProposal",
      value: MsgSubmitBundleProposal.encode(value).finish(),
    };
  },

  voteProposal(value: MsgVoteProposal) {
    return {
      type_url: "/kyve.registry.v1beta1.MsgVoteProposal",
      value: MsgVoteProposal.encode(value).finish(),
    };
  },

  claimUploaderRole(value: MsgClaimUploaderRole) {
    return {
      type_url: "/kyve.registry.v1beta1.MsgClaimUploaderRole",
      value: MsgClaimUploaderRole.encode(value).finish(),
    };
  },

  updateMetadata(value: MsgUpdateMetadata) {
    return {
      type_url: "/kyve.registry.v1beta1.MsgUpdateMetadata",
      value: MsgUpdateMetadata.encode(value).finish(),
    };
  },

  updateCommission(value: MsgUpdateCommission) {
    return {
      type_url: "/kyve.registry.v1beta1.MsgUpdateCommission",
      value: MsgUpdateCommission.encode(value).finish(),
    };
  },

  reactivateStaker(value: MsgReactivateStaker) {
    return {
      type_url: "/kyve.registry.v1beta1.MsgReactivateStaker",
      value: MsgReactivateStaker.encode(value).finish(),
    };
  },
};
export const withTypeUrl = {
  fundPool(value: MsgFundPool) {
    return {
      typeUrl: "/kyve.registry.v1beta1.MsgFundPool",
      value,
    };
  },

  defundPool(value: MsgDefundPool) {
    return {
      typeUrl: "/kyve.registry.v1beta1.MsgDefundPool",
      value,
    };
  },

  stakePool(value: MsgStakePool) {
    return {
      typeUrl: "/kyve.registry.v1beta1.MsgStakePool",
      value,
    };
  },

  unstakePool(value: MsgUnstakePool) {
    return {
      typeUrl: "/kyve.registry.v1beta1.MsgUnstakePool",
      value,
    };
  },

  delegatePool(value: MsgDelegatePool) {
    return {
      typeUrl: "/kyve.registry.v1beta1.MsgDelegatePool",
      value,
    };
  },

  withdrawPool(value: MsgWithdrawPool) {
    return {
      typeUrl: "/kyve.registry.v1beta1.MsgWithdrawPool",
      value,
    };
  },

  redelegatePool(value: MsgRedelegatePool) {
    return {
      typeUrl: "/kyve.registry.v1beta1.MsgRedelegatePool",
      value,
    };
  },

  undelegatePool(value: MsgUndelegatePool) {
    return {
      typeUrl: "/kyve.registry.v1beta1.MsgUndelegatePool",
      value,
    };
  },

  submitBundleProposal(value: MsgSubmitBundleProposal) {
    return {
      typeUrl: "/kyve.registry.v1beta1.MsgSubmitBundleProposal",
      value,
    };
  },

  voteProposal(value: MsgVoteProposal) {
    return {
      typeUrl: "/kyve.registry.v1beta1.MsgVoteProposal",
      value,
    };
  },

  claimUploaderRole(value: MsgClaimUploaderRole) {
    return {
      typeUrl: "/kyve.registry.v1beta1.MsgClaimUploaderRole",
      value,
    };
  },

  updateMetadata(value: MsgUpdateMetadata) {
    return {
      typeUrl: "/kyve.registry.v1beta1.MsgUpdateMetadata",
      value,
    };
  },

  updateCommission(value: MsgUpdateCommission) {
    return {
      typeUrl: "/kyve.registry.v1beta1.MsgUpdateCommission",
      value,
    };
  },

  reactivateStaker(value: MsgReactivateStaker) {
    return {
      typeUrl: "/kyve.registry.v1beta1.MsgReactivateStaker",
      value,
    };
  },
};
export const MessageComposer = {
  encoded: encodeTxMsg,
  withTypeUrl,
  toJSON: {
    fundPool(value: MsgFundPool) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgFundPool",
        value: MsgFundPool.toJSON(value),
      };
    },

    defundPool(value: MsgDefundPool) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgDefundPool",
        value: MsgDefundPool.toJSON(value),
      };
    },

    stakePool(value: MsgStakePool) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgStakePool",
        value: MsgStakePool.toJSON(value),
      };
    },

    unstakePool(value: MsgUnstakePool) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgUnstakePool",
        value: MsgUnstakePool.toJSON(value),
      };
    },

    delegatePool(value: MsgDelegatePool) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgDelegatePool",
        value: MsgDelegatePool.toJSON(value),
      };
    },

    withdrawPool(value: MsgWithdrawPool) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgWithdrawPool",
        value: MsgWithdrawPool.toJSON(value),
      };
    },

    redelegatePool(value: MsgRedelegatePool) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgRedelegatePool",
        value: MsgRedelegatePool.toJSON(value),
      };
    },

    undelegatePool(value: MsgUndelegatePool) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgUndelegatePool",
        value: MsgUndelegatePool.toJSON(value),
      };
    },

    submitBundleProposal(value: MsgSubmitBundleProposal) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgSubmitBundleProposal",
        value: MsgSubmitBundleProposal.toJSON(value),
      };
    },

    voteProposal(value: MsgVoteProposal) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgVoteProposal",
        value: MsgVoteProposal.toJSON(value),
      };
    },

    claimUploaderRole(value: MsgClaimUploaderRole) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgClaimUploaderRole",
        value: MsgClaimUploaderRole.toJSON(value),
      };
    },

    updateMetadata(value: MsgUpdateMetadata) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgUpdateMetadata",
        value: MsgUpdateMetadata.toJSON(value),
      };
    },

    updateCommission(value: MsgUpdateCommission) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgUpdateCommission",
        value: MsgUpdateCommission.toJSON(value),
      };
    },

    reactivateStaker(value: MsgReactivateStaker) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgReactivateStaker",
        value: MsgReactivateStaker.toJSON(value),
      };
    },
  },
  fromJSON: {
    fundPool(value: any) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgFundPool",
        value: MsgFundPool.fromJSON(value),
      };
    },

    defundPool(value: any) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgDefundPool",
        value: MsgDefundPool.fromJSON(value),
      };
    },

    stakePool(value: any) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgStakePool",
        value: MsgStakePool.fromJSON(value),
      };
    },

    unstakePool(value: any) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgUnstakePool",
        value: MsgUnstakePool.fromJSON(value),
      };
    },

    delegatePool(value: any) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgDelegatePool",
        value: MsgDelegatePool.fromJSON(value),
      };
    },

    withdrawPool(value: any) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgWithdrawPool",
        value: MsgWithdrawPool.fromJSON(value),
      };
    },

    redelegatePool(value: any) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgRedelegatePool",
        value: MsgRedelegatePool.fromJSON(value),
      };
    },

    undelegatePool(value: any) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgUndelegatePool",
        value: MsgUndelegatePool.fromJSON(value),
      };
    },

    submitBundleProposal(value: any) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgSubmitBundleProposal",
        value: MsgSubmitBundleProposal.fromJSON(value),
      };
    },

    voteProposal(value: any) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgVoteProposal",
        value: MsgVoteProposal.fromJSON(value),
      };
    },

    claimUploaderRole(value: any) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgClaimUploaderRole",
        value: MsgClaimUploaderRole.fromJSON(value),
      };
    },

    updateMetadata(value: any) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgUpdateMetadata",
        value: MsgUpdateMetadata.fromJSON(value),
      };
    },

    updateCommission(value: any) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgUpdateCommission",
        value: MsgUpdateCommission.fromJSON(value),
      };
    },

    reactivateStaker(value: any) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgReactivateStaker",
        value: MsgReactivateStaker.fromJSON(value),
      };
    },
  },
  fromPartial: {
    fundPool(value: MsgFundPool) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgFundPool",
        value: MsgFundPool.fromPartial(value),
      };
    },

    defundPool(value: MsgDefundPool) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgDefundPool",
        value: MsgDefundPool.fromPartial(value),
      };
    },

    stakePool(value: MsgStakePool) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgStakePool",
        value: MsgStakePool.fromPartial(value),
      };
    },

    unstakePool(value: MsgUnstakePool) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgUnstakePool",
        value: MsgUnstakePool.fromPartial(value),
      };
    },

    delegatePool(value: MsgDelegatePool) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgDelegatePool",
        value: MsgDelegatePool.fromPartial(value),
      };
    },

    withdrawPool(value: MsgWithdrawPool) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgWithdrawPool",
        value: MsgWithdrawPool.fromPartial(value),
      };
    },

    redelegatePool(value: MsgRedelegatePool) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgRedelegatePool",
        value: MsgRedelegatePool.fromPartial(value),
      };
    },

    undelegatePool(value: MsgUndelegatePool) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgUndelegatePool",
        value: MsgUndelegatePool.fromPartial(value),
      };
    },

    submitBundleProposal(value: MsgSubmitBundleProposal) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgSubmitBundleProposal",
        value: MsgSubmitBundleProposal.fromPartial(value),
      };
    },

    voteProposal(value: MsgVoteProposal) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgVoteProposal",
        value: MsgVoteProposal.fromPartial(value),
      };
    },

    claimUploaderRole(value: MsgClaimUploaderRole) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgClaimUploaderRole",
        value: MsgClaimUploaderRole.fromPartial(value),
      };
    },

    updateMetadata(value: MsgUpdateMetadata) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgUpdateMetadata",
        value: MsgUpdateMetadata.fromPartial(value),
      };
    },

    updateCommission(value: MsgUpdateCommission) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgUpdateCommission",
        value: MsgUpdateCommission.fromPartial(value),
      };
    },

    reactivateStaker(value: MsgReactivateStaker) {
      return {
        typeUrl: "/kyve.registry.v1beta1.MsgReactivateStaker",
        value: MsgReactivateStaker.fromPartial(value),
      };
    },
  },
};
