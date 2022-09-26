import { Command } from "commander";
import valaccounts from "./commands/valaccounts";
import start from "./commands/start";

const main = async () => {
  // define main program
  const program = new Command();

  // add valaccounts commands
  // TODO: save valaccounts under $HOME/.kysor/valaccounts/
  program.addCommand(valaccounts);

  // add start commands
  program.addCommand(start);

  // bootstrap program
  program.parse();
};

main();
