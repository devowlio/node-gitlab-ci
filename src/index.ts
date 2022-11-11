#!/usr/bin/env node

import { Command } from "commander";
import { createYmlCommand } from "./create-yml";

const program = new Command();
createYmlCommand(program);
program.parse(process.argv);

// If no argument is passed show help
if (process.argv.length < 3) {
    program.help();
}

export * from "./config";
export * from "./utils";
export * from "./types";
