#!/usr/bin/env node
import yargs, { ArgumentsCamelCase, Argv } from "yargs";
import { hideBin } from "yargs/helpers";
import { add } from "./Operations";
import process from "node:process";

interface Arguments {
  a: number;
  b: number;
}

const argv = yargs(hideBin(process.argv))
  .scriptName("math")
  .usage("Usage: $0 <command> [options]")
  .demandCommand(1, "You need at least one command before moving on");

argv.command("add <a> <b>",
    "Add two numbers",
    (yargs: Argv) => {
        return yargs.positional("a", {
          describe: "First number",
          type: "number",
          demandOption: true
        })
        .positional("b", {
          describe: "Second number",
          type: "number",
          demandOption: true
        });
    },
    (args: ArgumentsCamelCase<Arguments>) => {
      const result = add(args.a, args.b);
      console.log(`Result: ${result}`);
    }
);

export default argv.parse();
