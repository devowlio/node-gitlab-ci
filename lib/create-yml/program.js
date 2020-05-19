"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createYmlCommand = void 0;
var path_1 = require("path");
var commander_1 = require("commander");
var _1 = require(".");
var createYmlCommand = commander_1.command("create-yml")
    .description("Create .gitlab-ci.yml dynamically from a .gitlab-ci.ts file.")
    .option("--file <value>", "The path to the .gitlab-ci.ts file", ".gitlab-ci.ts")
    .option("--output <value>", "The result gets output to this file", ".gitlab-ci.ts.yml")
    .action(function (args) {
    if (!args.file.startsWith("/")) {
        args.file = path_1.join(process.cwd(), args.file);
    }
    if (!args.output.startsWith("/")) {
        args.output = path_1.join(process.cwd(), args.output);
    }
    _1.executeCreateYml(args);
});
exports.createYmlCommand = createYmlCommand;
