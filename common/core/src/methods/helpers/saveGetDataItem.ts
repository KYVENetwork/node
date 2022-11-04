import {
  callWithBackoffStrategy,
  DataItem,
  Node,
  standardizeJSON,
} from "../..";

/**
 * saveGetDataItem gets the data item with a backoff strategy
 *
 * @method saveGetDataItem
 * @param {Node} this
 * @param {string} source
 * @param {string} key
 * @return {Promise<DataItem | null>}
 */
export async function saveGetDataItem(
  this: Node,
  source: string,
  key: string
): Promise<DataItem | null> {
  // if item does not exist in cache yet collect it
  return await callWithBackoffStrategy(
    async () => {
      // collect data item from runtime source
      this.logger.debug(`this.runtime.getDataItem($THIS,${source},${key})`);

      const item = await this.runtime.getDataItem(this, source, key);

      this.m.runtime_get_data_item_successful.inc();

      return standardizeJSON(item);
    },
    {
      limitTimeoutMs: 5 * 60 * 1000,
      increaseByMs: 10 * 1000,
    },
    (err, ctx) => {
      this.logger.info(
        `Requesting getDataItem from source ${source} was unsuccessful. Retrying in ${(
          ctx.nextTimeoutInMs / 1000
        ).toFixed(2)}s ...`
      );
      this.logger.debug(standardizeJSON(err));

      this.m.runtime_get_data_item_failed.inc();
    }
  );
}
