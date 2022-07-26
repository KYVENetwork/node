import KyveClient from "../../src/clients/rpc-client/client";
import { createValidator } from "../helper";
import * as fs from "fs";
import { resolve } from "path";
import {
  MsgClaimUploaderRole,
  MsgDefundPool,
  MsgDelegatePool,
  MsgRedelegatePool,
  MsgFundPool,
  MsgStakePool,
  MsgSubmitBundleProposal,
  MsgUndelegatePool,
  MsgUnstakePool,
  MsgUpdateMetadata,
  MsgVoteProposal,
  MsgWithdrawPool,
  MsgReactivateStaker,
  MsgUpdateCommission,
} from "@kyve/proto/dist/proto/kyve/registry/v1beta1/tx";
import Mock = jest.Mock;
import { DENOM, KYVE_DECIMALS } from "../../src/constants";
import { TextProposal } from "@kyve/proto/dist/proto/cosmos/gov/v1beta1/gov";
import { ParameterChangeProposal } from "@kyve/proto/dist/proto/cosmos/params/v1beta1/params";
import {
  CancelPoolUpgradeProposal,
  CreatePoolProposal,
  PausePoolProposal,
  ResetPoolProposal,
  SchedulePoolUpgradeProposal,
  UnpausePoolProposal,
  UpdatePoolProposal,
} from "@kyve/proto/dist/proto/kyve/registry/v1beta1/gov";
import BigNumber from "bignumber.js";
import { SigningStargateClient } from "@cosmjs/stargate";
import { cosmos } from "@keplr-wallet/cosmos";
import TxRaw = cosmos.tx.v1beta1.TxRaw;
import { OfflineAminoSigner } from "@cosmjs/amino/build/signer";
const PATH_TO_TYPES =
  "./node_modules/@kyve/proto/dist/proto/kyve/registry/v1beta1";

const typesFiles = fs
  .readdirSync(PATH_TO_TYPES)
  .filter((files) => files.endsWith("d.ts"))
  .map((dtsFiles) => resolve(PATH_TO_TYPES, dtsFiles));

const mockAccountData = {
  address: "kyve19jc64sd773gtjljksjhls0n5mqay7xj83yeqvk",
  algo: "secp256k1" as const,
  pubkey: new Uint8Array(),
};
const TEST_MEMO = "test_memo";
const TEST_FEE = 1;
const TEST_AMOUNT = "1000000000";

const validator = createValidator(typesFiles);
const BaseMethods = [
  {
    methodName: "fundPool",
    parameters: {
      params: MsgFundPool.fromJSON({}),
      schema: validator.typeQuerySchemas.getSchemaForSymbol("MsgFundPool"),
    },
  },
  {
    methodName: "defundPool",
    parameters: {
      params: MsgDefundPool.fromJSON({}),
      schema: validator.typeQuerySchemas.getSchemaForSymbol("MsgDefundPool"),
    },
  },
  {
    methodName: "stakePool",
    parameters: {
      params: MsgStakePool.fromJSON({}),
      schema: validator.typeQuerySchemas.getSchemaForSymbol("MsgStakePool"),
    },
  },
  {
    methodName: "unstakePool",
    parameters: {
      params: MsgUnstakePool.fromJSON({}),
      schema: validator.typeQuerySchemas.getSchemaForSymbol("MsgUnstakePool"),
    },
  },
  {
    methodName: "delegatePool",
    parameters: {
      params: MsgDelegatePool.fromJSON({}),
      schema: validator.typeQuerySchemas.getSchemaForSymbol("MsgDelegatePool"),
    },
  },
  {
    methodName: "redelegatePool",
    parameters: {
      params: MsgRedelegatePool.fromJSON({}),
      schema:
        validator.typeQuerySchemas.getSchemaForSymbol("MsgRedelegatePool"),
    },
  },
  {
    methodName: "withdrawPool",
    parameters: {
      params: MsgWithdrawPool.fromJSON({}),
      schema: validator.typeQuerySchemas.getSchemaForSymbol("MsgWithdrawPool"),
    },
  },
  {
    methodName: "undelegatePool",
    parameters: {
      params: MsgUndelegatePool.fromJSON({}),
      schema:
        validator.typeQuerySchemas.getSchemaForSymbol("MsgUndelegatePool"),
    },
  },
  {
    methodName: "submitBundleProposal",
    parameters: {
      params: MsgSubmitBundleProposal.fromJSON({}),
      schema: validator.typeQuerySchemas.getSchemaForSymbol(
        "MsgSubmitBundleProposal"
      ),
    },
  },
  {
    methodName: "voteProposal",
    parameters: {
      params: MsgVoteProposal.fromJSON({}),
      schema: validator.typeQuerySchemas.getSchemaForSymbol("MsgVoteProposal"),
    },
  },
  {
    methodName: "claimUploaderRole",
    parameters: {
      params: MsgClaimUploaderRole.fromJSON({}),
      schema: validator.typeQuerySchemas.getSchemaForSymbol(
        "MsgClaimUploaderRole"
      ),
    },
  },
  {
    methodName: "updateMetadata",
    parameters: {
      params: MsgUpdateMetadata.fromJSON({}),
      schema:
        validator.typeQuerySchemas.getSchemaForSymbol("MsgUpdateMetadata"),
    },
  },
  {
    methodName: "updateMetadata",
    parameters: {
      params: MsgUpdateMetadata.fromJSON({}),
      schema:
        validator.typeQuerySchemas.getSchemaForSymbol("MsgUpdateMetadata"),
    },
  },
  {
    methodName: "updateCommission",
    parameters: {
      params: MsgUpdateCommission.fromJSON({}),
      schema: validator.typeQuerySchemas.getSchemaForSymbol(
        "MsgUpdateCommission"
      ),
    },
  },
  {
    methodName: "reactivateStaker",
    parameters: {
      params: MsgReactivateStaker.fromJSON({}),
      schema: validator.typeQuerySchemas.getSchemaForSymbol(
        "MsgReactivateStaker"
      ),
    },
  },
] as const;
let kyveClient: KyveClient;
let mockSign: Mock;
let mockSendTokens: Mock;
let mockGetBalance: Mock;
beforeEach(() => {
  mockSign = jest.fn(() => TxRaw.create());
  mockSendTokens = jest.fn();
  mockGetBalance = jest.fn(() => ({ amount: 0 }));
  const mockNativeClient = {
    simulate: () => Promise.resolve(1),
    sign: mockSign,
    sendTokens: mockSendTokens,
    getBalance: mockGetBalance,
  } as unknown as SigningStargateClient;
  const mockAminoSigner = {
    signAmino() {},
    getAccounts() {},
  } as unknown as OfflineAminoSigner;
  kyveClient = new KyveClient(
    mockNativeClient,
    mockAccountData,
    mockAminoSigner
  );
});

describe("Base Methods", () => {
  BaseMethods.forEach((method) => {
    it(`method ${method.methodName}`, async () => {
      await kyveClient.kyve.v1beta1.base[method.methodName](
        //@ts-ignore have no idea how to create it generic. btw ts-ignore is ok, because we check params from json schema
        method.parameters.params,
        { memo: TEST_MEMO, fee: TEST_FEE }
      );

      expect(mockSign).toHaveBeenCalledTimes(1);

      const [[testAddress, [tx], fee, memo]] = mockSign.mock.calls;
      expect(testAddress).toEqual(mockAccountData.address);

      expect(tx).toEqual(
        expect.objectContaining({
          typeUrl: expect.any(String),
          value: expect.any(Object),
        })
      );
      expect(memo).toEqual(TEST_MEMO);
      const validationResult = validator.validate(
        method.parameters.schema,
        tx.value
      );
      expect(validationResult.valid).toBeTruthy();
      expect(Object.keys(fee).sort()).toEqual(["amount", "gas"].sort());
    });
  });

  it("transfer", async () => {
    const testRecipient = "kyveTestRecipient";
    const testAmount = "1";
    await kyveClient.kyve.v1beta1.base.transfer(testRecipient, testAmount, {
      memo: TEST_MEMO,
      fee: TEST_FEE,
    });
    expect(mockSendTokens).toHaveBeenCalledTimes(1);
    const [[ownerAddress, recipient, [coin], fee, memo]] =
      mockSendTokens.mock.calls;
    expect(ownerAddress).toEqual(mockAccountData.address);
    expect(recipient).toEqual(testRecipient);
    expect(memo).toEqual(TEST_MEMO);
    expect(fee).toEqual(TEST_FEE);
    expect(coin).toEqual({
      denom: DENOM,
      amount: new BigNumber(10).pow(KYVE_DECIMALS).toString(),
    });
  });

  it("getKyveBalance", async () => {
    const result = await kyveClient.kyve.v1beta1.base.getKyveBalance();
    expect(mockGetBalance).toHaveBeenCalledTimes(1);
    const [[ownerAddress, denom]] = mockGetBalance.mock.calls;
    expect(ownerAddress).toEqual(mockAccountData.address);
    expect(denom).toEqual(DENOM);
    expect(result).toEqual(0);
  });
});

const GovMethods = [
  {
    method: "submitTextProposal",
    decoder: TextProposal,
  },
  {
    method: "parameterChangeProposal",
    decoder: ParameterChangeProposal,
  },
  {
    method: "pausePoolProposal",
    decoder: PausePoolProposal,
  },
  {
    method: "updatePoolProposal",
    decoder: UpdatePoolProposal,
  },
  {
    method: "pausePoolProposal",
    decoder: PausePoolProposal,
  },
  {
    method: "unpausePoolProposal",
    decoder: UnpausePoolProposal,
  },
  {
    method: "schedulePoolUpgradeProposal",
    decoder: SchedulePoolUpgradeProposal,
  },
  {
    method: "cancelPoolUpgradeProposal",
    decoder: CancelPoolUpgradeProposal,
  },
  {
    method: "resetPoolProposal",
    decoder: ResetPoolProposal,
  },
  {
    method: "createPoolProposal",
    decoder: CreatePoolProposal,
  },
] as const;

describe("Gov methods", () => {
  GovMethods.forEach((method) => {
    it(`${method.method}`, async () => {
      const govParam = method.decoder.fromJSON({});
      //@ts-ignore
      await kyveClient.kyve.v1beta1.gov[method.method](TEST_AMOUNT, govParam, {
        isExpedited: true,
      });
      expect(mockSign).toHaveBeenCalledTimes(1);
      const [[testAddress, [tx], fee]] = mockSign.mock.calls;
      expect(testAddress).toEqual(mockAccountData.address);
      expect(tx).toEqual(
        expect.objectContaining({
          typeUrl: expect.any(String),
          value: {
            content: {
              typeUrl: expect.any(String),
              value: expect.any(Uint8Array),
            },
            initial_deposit: [
              {
                denom: DENOM,
                amount: TEST_AMOUNT,
              },
            ],
            proposer: mockAccountData.address,
            is_expedited: true,
          },
        })
      );

      expect(Object.keys(fee).sort()).toEqual(["amount", "gas"].sort());
      expect(method.decoder.decode(tx.value.content.value)).toEqual(govParam);
    });
  });
  it("`govVote`", async () => {
    const testProposalNumber = "1";
    const testVoteOptions = "Yes";
    await kyveClient.kyve.v1beta1.gov.govVote(
      testProposalNumber,
      testVoteOptions
    );
    expect(mockSign).toHaveBeenCalledTimes(1);
    const [[testAddress, [tx], fee]] = mockSign.mock.calls;
    expect(testAddress).toEqual(mockAccountData.address);
    expect(Object.keys(fee).sort()).toEqual(["amount", "gas"].sort());
    expect(tx).toEqual({
      typeUrl: "/cosmos.gov.v1beta1.MsgVote",
      value: {
        proposalId: testProposalNumber,
        voter: mockAccountData.address,
        option: 1,
      },
    });
  });
});
