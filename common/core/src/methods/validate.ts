import { Node } from "..";

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
    this.logger.error(`Unexpected error while validating runtime. Exiting ...`);
    this.logger.debug(error);

    process.exit(1);
  }
}

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
    this.logger.error(
      `Unexpected error while validating runtime version. Exiting ...`
    );
    this.logger.debug(error);

    process.exit(1);
  }
}

/**
 * validateActiveNode checks if the staker of the node is in the active validator set
 * of the pool. If the staker is not a validator the node will exit.
 *
 * @method validateActiveNode
 * @param {Node} this
 * @return {void}
 */
export function validateActiveNode(this: Node): void {
  try {
    if (!this.pool.stakers.includes(this.staker)) {
      this.logger.error(`Node is not in the active validator set! Exiting ...`);
      process.exit(1);
    }

    this.logger.info(
      `Node running as validator on pool "${this.pool.data!.name}"`
    );
    this.logger.debug(`Successfully validated node stake\n`);
  } catch (error) {
    this.logger.error(
      `Unexpected error while validating if node is a validator. Exiting ...`
    );
    this.logger.debug(error);

    process.exit(1);
  }
}
