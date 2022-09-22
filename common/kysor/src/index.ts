import { Command } from "commander";
import { Keys } from "./backend/KeyBackend";
import keysCommands from "./commands/keys";

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

  // bootstrap program
  program.parse();
};

main();
