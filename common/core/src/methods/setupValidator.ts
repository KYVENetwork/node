import Prando from "prando";
import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { Node } from "..";

/**
 * setupValidator ensures the node starts as a valid validator
 * and logs some basic validator starting information
 *
 * @method setupValidator
 * @param {Node} this
 * @return {Promise<void>}
 */
export async function setupValidator(this: Node): Promise<void> {
  try {
    // generate deterministic valname based on network, pool id,
    // runtime, runtime version and valaddress
    const r = new Prando(
      `${this.network}-${this.poolId}-${this.runtime.name}-${this.runtime.version}-${this.client.account.address}`
    );

    this.name = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      separator: "-",
      length: 3,
      style: "lowerCase",
      seed: r.nextInt(0, adjectives.length * colors.length * animals.length),
    }).replace(" ", "-");

    // check if valaccount was already authorized by a validator
    await this.authorizeValaccount();

    // log basic node info on startup
    this.logger.info("Starting node ...\n");
    this.logger.info(`Name \t\t = ${this.name}`);
    this.logger.info(`Address \t\t = ${this.client.account.address}`);
    this.logger.info(`Pool Id \t\t = ${this.poolId}\n`);

    this.logger.info(`Runtime \t\t = ${this.runtime.name}`);
    this.logger.info(`Storage \t\t = ${this.storageProvider.name}`);
    this.logger.info(`Compression \t = ${this.compression.name}`);
    this.logger.info(`Cache \t\t = ${this.cache.name}\n`);

    this.logger.info(`Network \t\t = ${this.network}`);
    this.logger.info(`@kyve/core \t = v${this.coreVersion}`);
    this.logger.info(`${this.runtime.name} \t = v${this.runtime.version}\n`);

    // clear node cache before startup
    this.logger.debug(`Attempting to clear cache`);

    await this.cache.drop();
    this.prom.cache_current_items.set(0);

    this.logger.info(`Cleared cache\n`);
  } catch (error) {
    this.logger.error(`Failed to setup validator. Exiting ...`);
    this.logger.debug(error);

    process.exit(1);
  }
}
