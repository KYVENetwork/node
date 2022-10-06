import { Node } from "../..";

/**
 * validateVersion checks if the version of the pool matches with the runtime
 * version of the node. If it does not match the node will exit.
 *
 * @method validateVersion
 * @param {Node} this
 * @return {void}
 */
export function validateVersion(this: Node): void {
  try {
    if (this.pool.data!.protocol!.version !== this.runtime.version) {
      this.logger.error(`Running an invalid version. Exiting ...`);
      this.logger.error(
        `Found Runtime version = ${this.runtime.version} required = ${
          this.pool.data!.protocol!.version
        }`
      );
      process.exit(1);
    }

    this.logger.info(
      `Node running on runtime version = ${this.runtime.version}`
    );
    this.logger.debug(`Successfully validated pool runtime version\n`);
  } catch (error) {
    this.logger.error(`Error while validating runtime version. Exiting ...`);
    this.logger.debug(error);

    process.exit(1);
  }
}
