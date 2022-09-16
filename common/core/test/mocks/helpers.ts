export const successfulExecuteMock = jest.fn().mockResolvedValue({
  code: 0,
});

export const unsuccessfulExecuteMock = jest.fn().mockResolvedValue({
  code: 1,
});

export const claimUploaderRoleMock = jest.fn().mockResolvedValue({
  txHash: "test_hash",
  execute: successfulExecuteMock,
});

export const skipUploaderRoleMock = jest.fn().mockResolvedValue({
  txHash: "test_hash",
  execute: successfulExecuteMock,
});

export const voteBundleProposalMock = jest.fn().mockResolvedValue({
  txHash: "test_hash",
  execute: successfulExecuteMock,
});

export const submitBundleProposalMock = jest.fn().mockResolvedValue({
  txHash: "test_hash",
  execute: successfulExecuteMock,
});

export const canVoteMock = jest.fn().mockResolvedValue({
  possible: true,
  reason: "",
});

export const canProposeMock = jest.fn().mockResolvedValue({
  possible: true,
  reason: "",
});

export const client = () =>
  ({
    kyve: {
      bundles: {
        v1beta1: {
          claimUploaderRole: claimUploaderRoleMock,
          skipUploaderRole: skipUploaderRoleMock,
          voteBundleProposal: voteBundleProposalMock,
          submitBundleProposal: submitBundleProposalMock,
        },
      },
    },
    account: {
      address: "test_valaddress",
      algo: "ed25519",
      pubkey: new Uint8Array(),
    },
  } as any);

export const lcd = () =>
  ({
    kyve: {
      query: {
        v1beta1: {
          canVote: canVoteMock,
          canPropose: canProposeMock,
        },
      },
    },
  } as any);

export const base_pool = {
  id: "0",
  data: {
    id: "0",
    name: "Moonbeam",
    runtime: "@kyve/evm",
    logo: "9FJDam56yBbmvn8rlamEucATH5UcYqSBw468rlCXn8E",
    config:
      '{"rpc":"https://rpc.api.moonbeam.network","github":"https://github.com/KYVENetwork/evm"}',
    start_key: "0",
    current_key: "",
    current_value: "",
    current_height: "0",
    total_bundles: "0",
    upload_interval: "120",
    operating_cost: "2500000000",
    min_stake: "0",
    max_bundle_size: "100",
    paused: false,
    funders: [
      {
        address: "test_funder",
        amount: "100000000000",
      },
    ],
    total_funds: "100000000000",
    protocol: {
      version: "0.0.0",
      binaries:
        '{"macos":"https://github.com/kyve-org/evm/releases/download/v1.0.5/kyve-evm-macos.zip"}',
      last_upgrade: "0",
    },
    upgrade_plan: {
      version: "",
      binaries: "",
      scheduled_at: "0",
      duration: "0",
    },
  },
  bundle_proposal: {
    pool_id: "0",
    storage_id: "",
    uploader: "",
    next_uploader: "",
    byte_size: "0",
    to_height: "0",
    to_key: "",
    to_value: "",
    bundle_hash: "",
    created_at: "0",
    voters_valid: [],
    voters_invalid: [],
    voters_abstain: [],
  },
  stakers: ["test_staker"],
  total_self_delegation: "100000000000",
  total_delegation: "100000000000",
  status: "POOL_STATUS_ACTIVE",
};
