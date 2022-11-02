import { VoteType } from "@kyve/proto-beta/dist/proto/kyve/bundles/v1beta1/tx";
import { DataItem, Node, sha256 } from "../../src";

export const TestRuntime = jest.fn().mockImplementation(() => {
  return {
    name: "@kyve/evm",
    version: "0.0.0",
    getDataItem: jest.fn(async (core: Node, key: string) => ({
      key,
      value: `${key}-value`,
    })),
    transformDataItem: jest.fn(async (item: DataItem) => ({
      key: item.key,
      value: `${item.value}-transform`,
    })),
    validateBundle: jest.fn(
      async (
        core: Node,
        proposedBundle: DataItem[],
        validationBundle: DataItem[]
      ) => {
        const proposedBundleHash = sha256(
          Buffer.from(JSON.stringify(proposedBundle))
        );
        const validationBundleHash = sha256(
          Buffer.from(JSON.stringify(validationBundle))
        );

        if (proposedBundleHash === validationBundleHash) {
          return VoteType.VOTE_TYPE_YES;
        } else {
          return VoteType.VOTE_TYPE_NO;
        }
      }
    ),
    summarizeBundle: jest.fn(async (bundle: DataItem[]) =>
      JSON.stringify(bundle)
    ),
    nextKey: jest.fn(async (key: string) => (parseInt(key) + 1).toString()),
  };
});
