import { Command } from "commander";
import KyveSDK from "@kyve/sdk";
import { Keys } from "../backend/KeyBackend";

const tx = new Command("tx").description("Perform txs with validator account");

tx.command("create-validator")
  .description("Become a protocol validator")
  .requiredOption(
    "--amount <string>",
    "Amount of tkyve the validator should self delegate"
  )
  .requiredOption("--network <string>", "The network of the chain")
  .requiredOption("--from <string>", "The name of the key")
  .action(async (options) => {
    try {
      const mnemonic = await new Keys().get(options.from);

      if (mnemonic) {
        const sdk = new KyveSDK(options.network);
        const client = await sdk.fromMnemonic(mnemonic);

        const tx = await client.kyve.stakers.v1beta1.createStaker({
          amount: options.amount,
        });

        const receipt = await tx.execute();
        console.log(receipt);
      }
    } catch (err) {
      console.log(`Could not create validator: ${err}`);
    }
  });

tx.command("self-delegate")
  .description("Self delegate to validator")
  .requiredOption(
    "--amount <string>",
    "Amount of tkyve the validator should self delegate"
  )
  .requiredOption("--network <string>", "The network of the chain")
  .requiredOption("--from <string>", "The name of the key")
  .action(async (options) => {
    try {
      const mnemonic = await new Keys().get(options.from);

      if (mnemonic) {
        const sdk = new KyveSDK(options.network);
        const client = await sdk.fromMnemonic(mnemonic);

        const tx = await client.kyve.delegation.v1beta1.delegate({
          staker: client.account.address,
          amount: options.amount,
        });

        const receipt = await tx.execute();
        console.log(receipt);
      }
    } catch (err) {
      console.log(`Could not delegate to validator: ${err}`);
    }
  });

tx.command("self-undelegate")
  .description("Self undelegate from validator")
  .requiredOption(
    "--amount <string>",
    "Amount of tkyve the validator should self undelegate"
  )
  .requiredOption("--network <string>", "The network of the chain")
  .requiredOption("--from <string>", "The name of the key")
  .action(async (options) => {
    try {
      const mnemonic = await new Keys().get(options.from);

      if (mnemonic) {
        const sdk = new KyveSDK(options.network);
        const client = await sdk.fromMnemonic(mnemonic);

        const tx = await client.kyve.delegation.v1beta1.undelegate({
          staker: client.account.address,
          amount: options.amount,
        });

        const receipt = await tx.execute();
        console.log(receipt);
      }
    } catch (err) {
      console.log(`Could not undelegate from validator: ${err}`);
    }
  });

export default tx;
