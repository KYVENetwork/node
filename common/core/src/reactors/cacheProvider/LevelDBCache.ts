import { readFile } from "jsonfile";
import { existsSync, mkdirSync, promises as fs } from "fs";
import fse from "fs-extra";
import { DataItem, ICacheProvider } from "../../types";
import { Level } from "level";

export class LevelDBCache implements ICacheProvider {
  public name = "LevelDBCache";
  public path!: string;

  private db!: Level<string, DataItem>;

  init(path: string): this {
    this.path = path;

    if (!existsSync(this.path)) {
      mkdirSync(this.path, { recursive: true });
    }

    this.db = new Level(this.path, {
      valueEncoding: "json",
    });

    return this;
  }

  public async put(key: string, value: DataItem): Promise<void> {
    await this.db.put(key, value);
  }

  public async get(key: string): Promise<DataItem> {
    return await this.db.get(key);
  }

  public async exists(key: string): Promise<boolean> {
    try {
      await this.db.get(key);
      return true;
    } catch {
      return false;
    }
  }

  public async del(key: string): Promise<void> {
    await this.db.del(key);
  }

  public async drop(): Promise<void> {
    await this.db.clear();
  }
}
