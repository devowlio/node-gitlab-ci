#!/usr/bin/env node

import { parse } from "commander";
import "./create-yml";

const program = parse(process.argv);

// If no argument is passed show help
if (process.argv.length < 3) {
    program.help();
}

export * from "./config";
export * from "./utils";
export * from "./types";
