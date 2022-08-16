import { Node, DataItem, IRuntime } from "../../src";

export class TestRuntime implements IRuntime {
  public name = "TestRuntime";
  public version = "0.0.0";

  public async getDataItem(core: Node, key: string): Promise<DataItem> {
    return {
      key,
      value: `${key}-value`,
    };
  }

  async validate(
    core: Node,
    uploadedBundle: DataItem[],
    validationBundle: DataItem[]
  ) {
    return true;
  }

  public async getNextKey(key: string): Promise<string> {
    return (parseInt(key) + 1).toString();
  }

  public async formatValue(value: any): Promise<string> {
    return value.hash;
  }
}
