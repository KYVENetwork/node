import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { kyve, cosmos } from "@kyve/proto";
/** pool **/
import MsgFundPool = kyve.registry.v1beta1.kyvePool.MsgFundPool;
import MsgDefundPool = kyve.registry.v1beta1.kyvePool.MsgDefundPool;

/** stakers **/
import MsgCreateStaker = kyve.registry.v1beta1.kyveStakers.MsgCreateStaker;
import MsgUpdateMetadata = kyve.registry.v1beta1.kyveStakers.MsgUpdateMetadata;
import MsgJoinPool = kyve.registry.v1beta1.kyveStakers.MsgJoinPool;
import MsgUpdateCommission = kyve.registry.v1beta1.kyveStakers.MsgUpdateCommission;
import MsgLeavePool = kyve.registry.v1beta1.kyveStakers.MsgLeavePool;

/** delegations **/
import MsgDelegate = kyve.registry.v1beta1.kyveDelegation.MsgDelegate;
import MsgWithdrawRewards = kyve.registry.v1beta1.kyveDelegation.MsgWithdrawRewards;
import MsgRedelegate = kyve.registry.v1beta1.kyveDelegation.MsgRedelegate;
import MsgUndelegate = kyve.registry.v1beta1.kyveDelegation.MsgUndelegate;

/** bundles **/
import MsgSubmitBundleProposal = kyve.registry.v1beta1.kyveBundles.MsgSubmitBundleProposal;
import MsgVoteBundleProposal = kyve.registry.v1beta1.kyveBundles.MsgVoteBundleProposal;
import MsgClaimUploaderRole = kyve.registry.v1beta1.kyveBundles.MsgClaimUploaderRole;
import MsgSkipUploaderRole = kyve.registry.v1beta1.kyveBundles.MsgSkipUploaderRole;

/** cosmos **/
import MsgSubmitProposal = cosmos.registry.v1beta1.cosmosGovTx.MsgSubmitProposal;

export const registry: ReadonlyArray<[string, GeneratedType]> = [
  /**pool **/
  ["/kyve.pool.v1beta1.MsgFundPool", MsgFundPool],
  ["/kyve.pool.v1beta1.MsgDefundPool", MsgDefundPool],
  /** stakers **/
  ["/kyve.stakers.v1beta1.MsgCreateStaker", MsgCreateStaker],
  ["/kyve.stakers.v1beta1.MsgUpdateMetadata", MsgUpdateMetadata],
  ["/kyve.stakers.v1beta1.MsgUpdateCommission", MsgUpdateCommission],
  ["/kyve.stakers.v1beta1.MsgJoinPool", MsgJoinPool],
  ["/kyve.stakers.v1beta1.MsgLeavePool", MsgLeavePool],
  /** delegations  **/
  ["/kyve.delegation.v1beta1.MsgDelegate", MsgDelegate],
  ["/kyve.delegation.v1beta1.MsgWithdrawRewards", MsgWithdrawRewards],
  ["/kyve.delegation.v1beta1.MsgUndelegate", MsgUndelegate],
  ["/kyve.delegation.v1beta1.MsgRedelegate", MsgRedelegate],
  /** bundles **/
  ["/kyve.bundles.v1beta1.MsgSubmitBundleProposal", MsgSubmitBundleProposal],
  ["/kyve.bundles.v1beta1.MsgVoteBundleProposal", MsgVoteBundleProposal],
  ["/kyve.bundles.v1beta1.MsgClaimUploaderRole", MsgClaimUploaderRole],
  ["/kyve.bundles.v1beta1.MsgSkipUploaderRole", MsgSkipUploaderRole],
  /** cosmos **/
  ["/cosmos.gov.v1beta1.MsgSubmitProposal", MsgSubmitProposal],
];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const encodeTxMsg = {
  fundPool(value: MsgFundPool) {
    return {
      type_url: "/kyve.pool.v1beta1.MsgFundPool",
      value: MsgFundPool.encode(value).finish(),
    };
  },

  defundPool(value: MsgDefundPool) {
    return {
      type_url: "/kyve.pool.v1beta1.MsgDefundPool",
      value: MsgDefundPool.encode(value).finish(),
    };
  },

  createStaker(value: MsgCreateStaker) {
    return {
      type_url: "/kyve.stakers.v1beta1.MsgCreateStaker",
      value: MsgCreateStaker.encode(value).finish(),
    };
  },

  updateMetadata(value: MsgUpdateMetadata) {
    return {
      type_url: "/kyve.stakers.v1beta1.MsgUpdateMetadata",
      value: MsgUpdateMetadata.encode(value).finish(),
    };
  },

  updateCommission(value: MsgUpdateCommission) {
    return {
      type_url: "/kyve.stakers.v1beta1.MsgUpdateCommission",
      value: MsgUpdateCommission.encode(value).finish(),
    };
  },

  joinPool(value: MsgJoinPool) {
    return {
      type_url: "/kyve.stakers.v1beta1.MsgJoinPool",
      value: MsgJoinPool.encode(value).finish(),
    };
  },

  leavePool(value: MsgJoinPool) {
    return {
      type_url: "/kyve.stakers.v1beta1.MsgLeavePool",
      value: MsgLeavePool.encode(value).finish(),
    };
  },

  delegate(value: MsgDelegate) {
    return {
      type_url: "/kyve.delegation.v1beta1.MsgDelegate",
      value: MsgDelegate.encode(value).finish(),
    };
  },

  withdrawRewards(value: MsgWithdrawRewards) {
    return {
      type_url: "/kyve.delegation.v1beta1.MsgWithdrawRewards",
      value: MsgWithdrawRewards.encode(value).finish(),
    };
  },
  undelegate(value: MsgUndelegate) {
    return {
      type_url: "/kyve.delegation.v1beta1.MsgUndelegate",
      value: MsgUndelegate.encode(value).finish(),
    };
  },

  redelegate(value: MsgRedelegate) {
    return {
      type_url: "/kyve.delegation.v1beta1.MsgRedelegate",
      value: MsgRedelegate.encode(value).finish(),
    };
  },

  submitBundleProposal(value: MsgSubmitBundleProposal) {
    return {
      type_url: "/kyve.bundles.v1beta1.MsgSubmitBundleProposal",
      value: MsgSubmitBundleProposal.encode(value).finish(),
    };
  },

  voteBundleProposal(value: MsgVoteBundleProposal) {
    return {
      type_url: "/kyve.bundles.v1beta1.MsgVoteBundleProposal",
      value: MsgVoteBundleProposal.encode(value).finish(),
    };
  },

  claimUploaderRole(value: MsgClaimUploaderRole) {
    return {
      type_url: "/kyve.bundles.v1beta1.MsgClaimUploaderRole",
      value: MsgClaimUploaderRole.encode(value).finish(),
    };
  },
};

export const withTypeUrl = {
  fundPool(value: MsgFundPool) {
    return {
      typeUrl: "/kyve.pool.v1beta1.MsgFundPool",
      value,
    };
  },

  defundPool(value: MsgDefundPool) {
    return {
      typeUrl: "/kyve.pool.v1beta1.MsgDefundPool",
      value,
    };
  },

  createStaker(value: MsgCreateStaker) {
    return {
      typeUrl: "/kyve.stakers.v1beta1.MsgCreateStaker",
      value,
    };
  },

  updateMetadata(value: MsgUpdateMetadata) {
    return {
      typeUrl: "/kyve.stakers.v1beta1.MsgUpdateMetadata",
      value,
    };
  },
  updateCommission(value: MsgUpdateCommission) {
    return {
      typeUrl: "/kyve.stakers.v1beta1.MsgUpdateCommission",
      value,
    };
  },
  joinPool(value: MsgJoinPool) {
    return {
      typeUrl: "/kyve.stakers.v1beta1.MsgJoinPool",
      value,
    };
  },
  leavePool(value: MsgLeavePool) {
    return {
      typeUrl: "/kyve.stakers.v1beta1.MsgLeavePool",
      value,
    };
  },
  delegate(value: MsgDelegate) {
    return {
      typeUrl: "/kyve.delegation.v1beta1.MsgDelegate",
      value,
    };
  },
  withdrawRewards(value: MsgWithdrawRewards) {
    return {
      typeUrl: "/kyve.delegation.v1beta1.MsgWithdrawRewards",
      value,
    };
  },
  undelegate(value: MsgUndelegate) {
    return {
      typeUrl: "/kyve.delegation.v1beta1.MsgUndelegate",
      value,
    };
  },
  redelegate(value: MsgRedelegate) {
    return {
      typeUrl: "/kyve.delegation.v1beta1.MsgRedelegate",
      value,
    };
  },
  submitBundleProposal(value: MsgSubmitBundleProposal) {
    return {
      typeUrl: "/kyve.bundles.v1beta1.MsgSubmitBundleProposal",
      value,
    };
  },
  voteBundleProposal(value: MsgVoteBundleProposal) {
    return {
      typeUrl: "/kyve.bundles.v1beta1.MsgVoteBundleProposal",
      value,
    };
  },
  skipUploaderRole(value: MsgSkipUploaderRole) {
    return {
      typeUrl: "/kyve.bundles.v1beta1.MsgVoteBundleProposal",
      value,
    };
  },
  claimUploaderRole(value: MsgClaimUploaderRole) {
    return {
      typeUrl: "/kyve.bundles.v1beta1.MsgClaimUploaderRole",
      value,
    };
  },
};
