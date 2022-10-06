import { Node } from "../..";

/**
 * validateRuntime checks if the runtime of the pool matches with the runtime of
 * the node. If it does not match the node will exit.
 *
 * @method validateRuntime
 * @param {Node} this
 * @return {void}
 */
export function validateRuntime(this: Node): void {
  try {
    if (this.pool.data!.runtime !== this.runtime.name) {
      this.logger.error(
        `Specified pool does not match the integration runtime! Exiting ...`
      );
      this.logger.error(
        `Found = ${this.runtime.name} required = ${this.pool.data!.runtime}`
      );
      process.exit(1);
    }

    this.logger.info(`Node running on runtime = ${this.runtime.name}`);
    this.logger.debug(`Successfully validated pool runtime\n`);
  } catch (error) {
    this.logger.error(`Error while validating runtime. Exiting ...`);
    this.logger.debug(error);

    process.exit(1);
  }
}
