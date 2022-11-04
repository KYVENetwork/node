import {
  callWithBackoffStrategy,
  DataItem,
  Node,
  standardizeJSON,
} from "../..";

/**
 * saveGetAndTransformDataItem tries to retrieve the $KYVE balance of the staker account, the $KYVE
 * balance of the valaccount and the balance of the storage provider which
 * can be of any currency for metrics
 *
 * @method saveGetAndTransformDataItem
 * @param {Node} this
 * @param {string} source
 * @param {string} key
 * @param {number} updatedAt
 * @return {Promise<DataItem | null>}
 */
export async function saveGetAndTransformDataItem(
  this: Node,
  source: string,
  key: string
): Promise<DataItem | null> {
  // if item does not exist in cache yet collect it
  let item = await callWithBackoffStrategy(
    async () => {
      // collect data item from runtime source
      this.logger.debug(`this.runtime.getDataItem($THIS,${source},${key})`);

      const item = await this.runtime.getDataItem(this, source, key);

      this.m.runtime_get_data_item_successful.inc();

      return item;
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

  // transform data item
  try {
    this.logger.debug(`this.runtime.transformDataItem($ITEM)`);
    item = await this.runtime.transformDataItem(item);
  } catch (err) {
    this.logger.error(
      `Unexpected error transforming data item. Skipping transformation ...`
    );
    this.logger.error(standardizeJSON(err));
  }

  return standardizeJSON({
    key,
    value: item,
  });
}
