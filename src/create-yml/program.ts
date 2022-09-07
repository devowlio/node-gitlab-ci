import { join } from "path";
import { Command } from "commander";
import { executeCreateYml } from ".";

type CreateYmlOpts = {
    file: string;
    output: string;
    pretty: boolean;
};

function createYmlCommand(program: Command) {
    program
        .command("create-yml")
        .description("Create .gitlab-ci.yml dynamically from a .gitlab-ci.ts file.")
        .option("--file <value>", "The path to the .gitlab-ci.ts file", ".gitlab-ci.ts")
        .option("--output <value>", "The result gets output to this file", ".gitlab-ci.ts.yml")
        .option("--pretty", "The result gets output prettified", false)
        .action((args: CreateYmlOpts) => {
            if (!args.file.startsWith("/")) {
                args.file = join(process.cwd(), args.file);
            }

            if (!args.output.startsWith("/")) {
                args.output = join(process.cwd(), args.output);
            }
            executeCreateYml(args);
        });
}

export { CreateYmlOpts, createYmlCommand };
