import { Node } from "../..";

/**
 * validateIsNodeValidator checks if the staker of the node is in the
 * active validator set of the pool. If the staker is not a validator
 * the node will exit.
 *
 * @method validateIsNodeValidator
 * @param {Node} this
 * @return {void}
 */
export function validateIsNodeValidator(this: Node): void {
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
      `Error while validating if node is a validator. Exiting ...`
    );
    this.logger.debug(error);

    process.exit(1);
  }
}
