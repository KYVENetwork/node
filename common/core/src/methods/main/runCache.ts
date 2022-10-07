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
 * It starts by getting the current pool heights and checking at
 * from which height to which the node has to collect the data items
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
  // define current proposal heights required for running the cache
  let createdAt = 0;
  let currentHeight = 0;
  let continuationHeight = 0;
  let toHeight = 0;
  let maxRoundHeight = 0;

  // get pool state so cache can start working
  await this.syncPoolState();

  // run rounds indefinitely, continueRound returns always
  // true and is only used by unit tests to control the termination of
  // rounds by mocking it
  while (this.continueRound()) {
    try {
      // a smaller to_height means a bundle got dropped or invalidated
      if (+this.pool.bundle_proposal!.to_height < toHeight) {
        this.logger.debug(`Attempting to clear cache`);
        await this.cache.drop();
        this.m.cache_current_items.set(0);

        this.logger.info(`Cleared cache\n`);
      }

      // determine the creation time of the current bundle proposal
      // if the creation time ever increases this means a new bundle
      // proposal is available
      createdAt = +this.pool.bundle_proposal!.created_at;

      // determine the current height of the pool. All data items
      // before the current height can be deleted since they are already
      // finalized. Data items should always be cached from this height
      // and not before
      currentHeight = +this.pool.data!.current_height;

      // determine the continuation height. If the current height is zero
      // it means that the pool is in genesis state, thefore the node should
      // start at height zero. If the current height is set the node should
      // continue at the next height (+1)
      continuationHeight = !!currentHeight ? currentHeight + 1 : currentHeight;

      // determine the current height of the proposal. The data items
      // collected between the current height and the toHeight are
      // especially important to validating a bundle proposal since
      // a proposal always starts from the pool height and goes to the
      // toHeight of a proposal. If there is currently no proposal
      // take the current pool height
      toHeight =
        +this.pool.bundle_proposal!.to_height ||
        +this.pool.data!.current_height;

      // determine the max round height. Here the max height is the
      // maximum height the cache should collect data items for the
      // current round. The max round height is especially important
      // to the next uploader, since he has to assemble a bundle with
      // data items coming after the current bundle proposal which spans
      // from the current pool height to the proposal height
      maxRoundHeight = +this.pool.data!.max_bundle_size + toHeight;

      // delete all data items which came before the current height
      // because they got finalized and are not needed anymore
      for (
        let h = currentHeight;
        h >= Math.max(0, currentHeight - +this.pool.data!.max_bundle_size);
        h--
      ) {
        try {
          await this.cache.del(h.toString());
          this.m.cache_current_items.dec();
        } catch {
          continue;
        }
      }

      this.m.cache_height_tail.set(continuationHeight);

      // determine the start key for the current caching round
      // this key gets increased overtime to temp save the
      // current key while collecting the data items
      let key = this.pool.data!.current_key;

      console.log(`from ${continuationHeight} to ${maxRoundHeight}`);

      // collect all data items from current pool height to
      // the maxRoundHeight
      for (let h = continuationHeight; h <= maxRoundHeight; h++) {
        // check if data item was already collected. If it was
        // already collected we don't need to retrieve it again
        const itemFound = await this.cache.exists(h.toString());

        // retrieve the next key from the deterministic runtime
        // specific implementation. If the start key is not defined
        // the pool is in genesis state and therefore the pool
        // specific start key should be used
        const nextKey = !!key
          ? await this.runtime.getNextKey(key)
          : this.pool.data!.start_key;

        if (!itemFound) {
          // if item does not exist in cache yet collect it
          const item = await callWithBackoffStrategy(
            async () => {
              // if a new bundle proposal was created in the meantime
              // skip the current caching and proceed
              if (+this.pool.bundle_proposal!.created_at > createdAt) {
                return null;
              }

              // collect data item from runtime source
              const item = await this.runtime.getDataItem(this, nextKey);

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
          await this.cache.put(h.toString(), item);

          this.m.cache_current_items.inc();
          this.m.cache_height_head.set(h);

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
      await this.waitForCacheContinuation(createdAt);
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
