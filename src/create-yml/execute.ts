import { join, dirname } from "path";
import { CreateYmlOpts } from ".";
import { existsSync, writeFileSync } from "fs";
import { stringify } from "yamljs";
import { Config } from "../config";

async function executeCreateYml(opts: CreateYmlOpts) {
    // Check if file exists
    if (!existsSync(opts.file)) {
        throw new Error(`The passed file ${opts.file} does not exist!`);
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("ts-node").register({
        dir: join(dirname(opts.file)),
        transpileOnly: true,
    });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const exported = await import(opts.file);
    if (!exported?.createConfig) {
        throw new Error(`Please export a function createConfig which returns a Config instance!`);
    }

    if (!(exported.createConfig instanceof Function)) {
        throw new Error(`The exported createConfig is not a function!`);
    }

    // Create resulting yml file
    const config = (await exported.createConfig()) as Config;
    if (!(config instanceof Config)) {
        throw new Error(`The result of createConfig is not a Config instance!`);
    }

    const result = stringify(config.getPlainObject(), opts.pretty ? 4 : 0);
    writeFileSync(opts.output, result, { encoding: "utf-8" });
    console.log(`Successfully wrote YAML to ${opts.output}!`);
}

export { executeCreateYml };
