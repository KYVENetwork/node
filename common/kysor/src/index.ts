import { Command } from "commander";
import { Keys } from "./backend/KeyBackend";
import keysCommands from "./commands/keys";
import txCommands from "./commands/tx";

const main = async () => {
  // define main program
  const program = new Command();

  // define start command
  program
    .command("init")
    .description("Initialize KYSOR on this machine")
    .action(() => {
      new Keys().init();
    });

  // add keys commands
  program.addCommand(keysCommands);

  // add txs commands
  program.addCommand(txCommands);

  // bootstrap program
  program.parse();
};

main();
