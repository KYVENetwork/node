import { Node } from "..";
import { ERROR_IDLE_TIME, sleep } from "../utils";

export async function runCache(this: Node): Promise<void> {
  let createdAt = 0;
  let currentHeight = 0;
  let toHeight = 0;
  let maxHeight = 0;

  while (true) {
    // a smaller to_height means a bundle got dropped or invalidated
    if (+this.pool.bundle_proposal!.to_height < toHeight) {
      this.logger.debug(`Attempting to clear cache`);
      await this.cache.drop();
      this.prom.cache_current_items.set(0);

      this.logger.info(`Cleared cache\n`);
    }

    // cache data items from current height to required height
    createdAt = +this.pool.bundle_proposal!.created_at;
    currentHeight = +this.pool.data!.current_height;
    toHeight =
      +this.pool.bundle_proposal!.to_height || +this.pool.data!.current_height;
    maxHeight = +this.pool.data!.max_bundle_size + toHeight;

    // clear finalized items
    let current = currentHeight;

    while (current > 0) {
      current--;

      try {
        await this.cache.del(current.toString());
        this.prom.cache_current_items.dec();
      } catch {
        break;
      }
    }

    this.prom.cache_height_tail.set(currentHeight);

    let startHeight: number;
    let key: string;

    // determine from which height to continue caching
    if (await this.cache.exists((toHeight - 1).toString())) {
      startHeight = toHeight;
      key = this.pool.bundle_proposal!.to_key;
    } else {
      startHeight = currentHeight;
      key = this.pool.data!.current_key;
    }

    this.logger.debug(`Caching from height ${startHeight} to ${maxHeight} ...`);

    let height = startHeight;

    while (height < maxHeight) {
      try {
        let nextKey;

        if (key) {
          nextKey = await this.runtime.getNextKey(key);
        } else {
          nextKey = this.pool.data!.start_key;
        }

        const item = await this.runtime.getDataItem(this, nextKey);
        this.prom.runtime_get_data_item_successful.inc();

        await this.cache.put(height.toString(), item);
        this.prom.cache_current_items.inc();
        this.prom.cache_height_head.set(height);

        await sleep(50);

        key = nextKey;
        height++;
      } catch {
        this.logger.warn(` Failed to get data item from height ${height}`);
        this.prom.runtime_get_data_item_failed.inc();

        await sleep(ERROR_IDLE_TIME);
      }
    }

    // wait until new bundle proposal gets created
    while (createdAt === +this.pool.bundle_proposal!.created_at) {
      await sleep(1000);
    }
  }
}
