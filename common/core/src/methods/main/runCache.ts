import { Node } from "../..";
import { callWithBackoffStrategy, sleep } from "../../utils";

/**
 * runCache is the other main execution thread for collecting data items
 * which will get packed into bundles and submitted to the network
 * in order to archive them. This method should run indefinitely.
 *
 * This method stays in sync with the bundle proposal rounds
 * where the other main method "runNode" takes part. It works
 * by running in parallel to the validation and submission of
 * bundle proposals. When data needs to be validated or proposed
 * the other method simply looks in the globally available cache
 * and checks if this method already added some items into it.
 *
 * It starts by getting the current pool index and checking at
 * from which index to which the node has to collect the data items
 * in order to participate in the current proposal round.
 *
 * After a bundle proposal got finalized the cache gets cleared of
 * all finalized data items since they are not needed anymore and
 * starts collecting the data items which are needed for the
 * following round.
 *
 * @method runCache
 * @param {Node} this
 * @return {Promise<void>}
 */
export async function runCache(this: Node): Promise<void> {
  // get pool state so cache can start working
  await this.syncPoolState();

  // run rounds indefinitely, continueRound returns always
  // true and is only used by unit tests to control the termination of
  // rounds by mocking it
  while (this.continueRound()) {
    try {
      // if there is no storage id we can assume that the last
      // bundle has been dropped or invalidated. In that case we
      // reset the cache
      if (!this.pool.bundle_proposal!.storage_id) {
        this.logger.debug(`Attempting to clear cache`);

        await this.cache.drop();

        this.m.cache_current_items.set(0);
        this.logger.info(`Cleared cache\n`);
      }

      // determine the creation time of the current bundle proposal
      // if the creation time ever increases this means a new bundle
      // proposal is available
      const updatedAt = parseInt(this.pool.bundle_proposal!.updated_at);

      // determine the current index of the pool. All data items
      // before the current index can be deleted since they are already
      // finalized. Data items should always be cached from this index
      // and not before
      const currentIndex = parseInt(this.pool.data!.current_index);

      // determine the target index. Here the target index is the
      // index the cache should collect data in this particular round.
      // We start from the current index and first index all the way
      // to the current bundle proposal. Since the next uploader
      // creates a bundle starting from the current bundle proposal
      // we further index to the maximum possible bundle size ahead
      const targetIndex =
        currentIndex +
        parseInt(this.pool.bundle_proposal!.bundle_size) +
        parseInt(this.pool.data!.max_bundle_size);

      // delete all data items which came before the current index
      // because they got finalized and are not needed anymore
      for (
        let i = Math.max(0, currentIndex - 1);
        i >=
        Math.max(0, currentIndex - parseInt(this.pool.data!.max_bundle_size));
        i--
      ) {
        try {
          await this.cache.del(i.toString());
          this.m.cache_current_items.dec();
        } catch {
          continue;
        }
      }

      this.m.cache_index_tail.set(Math.max(0, currentIndex - 1));

      // determine the start key for the current caching round
      // this key gets increased overtime to temp save the
      // current key while collecting the data items
      let key = this.pool.data!.current_key;

      // collect all data items from current pool index to
      // the target index
      for (let i = currentIndex; i <= targetIndex; i++) {
        // check if data item was already collected. If it was
        // already collected we don't need to retrieve it again
        const itemFound = await this.cache.exists(i.toString());

        // retrieve the next key from the deterministic runtime
        // specific implementation. If the start key is not defined
        // the pool is in genesis state and therefore the pool
        // specific start key should be used
        const nextKey = !!key
          ? await this.runtime.nextKey(key)
          : this.pool.data!.start_key;

        if (!itemFound) {
          // if item does not exist in cache yet collect it
          const item = await callWithBackoffStrategy(
            async () => {
              // if a new bundle proposal was created in the meantime
              // skip the current caching and proceed
              if (+this.pool.bundle_proposal!.updated_at > updatedAt) {
                return null;
              }

              // collect data item from runtime source
              const item = await this.runtime.getDataItemByKey(this, nextKey);

              this.m.runtime_get_data_item_successful.inc();

              return item;
            },
            {
              limitTimeoutMs: 5 * 60 * 1000,
              increaseByMs: 10 * 1000,
            },
            (error, ctx) => {
              this.logger.debug(
                `Failed to get data item with key ${nextKey}. Retrying in ${(
                  ctx.nextTimeoutInMs / 1000
                ).toFixed(2)}s ...`
              );
              this.logger.debug(error);

              this.m.runtime_get_data_item_failed.inc();
            }
          );

          // abort caching of current proposal round and proceed
          // to next one
          if (!item) {
            break;
          }

          // add this data item to the cache
          await this.cache.put(i.toString(), item);

          this.m.cache_current_items.inc();
          this.m.cache_index_head.set(i);

          // add a timeout so that the runtime data source
          // is not overloaded with requests
          await sleep(50);
        }

        // assign the next key for the next round
        key = nextKey;
      }

      // wait until a new bundle proposal is available. We don't need
      // to sync the pool here because the pool state already gets
      // synced in the other main function "runNode" so we only listen
      await this.waitForCacheContinuation(updatedAt);
    } catch (error) {
      this.logger.warn(
        ` Unexpected error collecting data items to local cache. Continuing ...`
      );
      this.logger.error(error);

      try {
        // drop cache if an unexpected error occurs during caching
        this.logger.debug(`Attempting to clear cache`);
        await this.cache.drop();
        this.m.cache_current_items.set(0);

        this.logger.info(`Cleared cache\n`);
      } catch (dropError) {
        this.logger.warn(
          ` Unexpected error dropping local cache. Continuing ...`
        );
        this.logger.error(dropError);
      }
    }
  }
}
