import { Command } from "commander";
declare type CreateYmlOpts = {
    file: string;
    output: string;
    pretty: boolean;
};
declare function createYmlCommand(program: Command): void;
export { CreateYmlOpts, createYmlCommand };
