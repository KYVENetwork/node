import { Command } from "commander";
import KyveSDK from "@kyve/sdk";
import { Keys } from "../backend/KeyBackend";
import prompts from "prompts";

const keys = new Command("keys").description("Manage keys of validators");

keys
  .command("add")
  .description("Add a key with the mnemonic")
  .argument("<name>", "Name of the key")
  .option("--recover", "Use a mnemonic of an already existing account")
  .action(async (key, options) => {
    let mnemonic = "";

    if (options.recover) {
      const { mnemonic: input } = await prompts(
        {
          type: "text",
          name: "mnemonic",
          message: "Enter the mnemonic",
          validate: async (value) => {
            try {
              await KyveSDK.getAddressFromMnemonic(value);
            } catch (err) {
              return `${err}`;
            }

            return true;
          },
        },
        {
          onCancel: () => {
            throw Error("Aborted mnemonic input");
          },
        }
      );

      mnemonic = input;
    } else {
      mnemonic = await KyveSDK.generateMnemonic();
    }

    await new Keys().add(key, mnemonic);
  });
keys
  .command("reveal")
  .description("Reveal the mnemonic of a key")
  .argument("<name>", "Name of the key")
  .action(async (key) => {
    const mnemonic = await new Keys().get(key);

    if (mnemonic) {
      const address = await KyveSDK.getAddressFromMnemonic(mnemonic);

      console.log(`Address:    ${address}`);
      console.log(`Mnemonic:   ${mnemonic}`);
    }
  });
keys
  .command("list")
  .description("List all available keys")
  .action(async () => {
    await new Keys().list();
  });
keys
  .command("remove")
  .description("Remove an existing key")
  .argument("<name>", "Name of the key")
  .action(async (key) => {
    await new Keys().remove(key);
  });
keys
  .command("reset")
  .description("Reset the file backend to initial state")
  .action(async () => {
    await new Keys().reset();
  });

export default keys;
