import { readFile, writeFile } from "jsonfile";
import { existsSync, mkdirSync, promises as fs } from "fs";
import fse from "fs-extra";
import { DataItem, ICache } from "../../types";

export class JsonFileCache implements ICache {
  public name = "JsonFileCache";
  public path!: string;

  init(path: string): this {
    this.path = path;

    if (!existsSync(this.path)) {
      mkdirSync(this.path, { recursive: true });
    }

    return this;
  }

  public async put(key: string, value: DataItem): Promise<void> {
    await writeFile(`${this.path}/${key}.json`, value);
  }

  public async get(key: string): Promise<DataItem> {
    return await readFile(`${this.path}/${key}.json`);
  }

  public async exists(key: string): Promise<boolean> {
    return await fse.pathExists(`${this.path}/${key}.json`);
  }

  public async del(key: string): Promise<void> {
    await fs.unlink(`${this.path}/${key}.json`);
  }

  public async drop(): Promise<void> {
    await fse.emptyDir(`${this.path}/`);
  }
}
