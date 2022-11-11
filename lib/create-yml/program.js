"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createYmlCommand = void 0;
var path_1 = require("path");
var _1 = require(".");
function createYmlCommand(program) {
    program
        .command("create-yml")
        .description("Create .gitlab-ci.yml dynamically from a .gitlab-ci.ts file.")
        .option("--file <value>", "The path to the .gitlab-ci.ts file", ".gitlab-ci.ts")
        .option("--output <value>", "The result gets output to this file", ".gitlab-ci.ts.yml")
        .option("--pretty", "The result gets output prettified", false)
        .action(function (args) {
        if (!args.file.startsWith("/")) {
            args.file = (0, path_1.join)(process.cwd(), args.file);
        }
        if (!args.output.startsWith("/")) {
            args.output = (0, path_1.join)(process.cwd(), args.output);
        }
        (0, _1.executeCreateYml)(args);
    });
}
exports.createYmlCommand = createYmlCommand;
