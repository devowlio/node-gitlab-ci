import merge from "deepmerge";
import { sync as globSync } from "glob";
import { Gitlab } from "@gitbeaker/node";
import { execSync } from "child_process";
import { GitLabCi, Job } from "../types";

type JobDefinitionExtends = Job & { needsExtends?: string[] };
type MacroArgs = Record<string, any>;

type ConstructedType<Constructor> = Constructor extends {
    new (...args: any[]): infer B;
}
    ? B
    : never;

type GitlabType = ConstructedType<typeof Gitlab>;

/**
 * A global OOP-style GitLab CI configurator.
 */
class Config {
    /**
     * Holding the complete GitLab CI configuration as plain object instead
     * of classes so all is done within this class.
     */
    private plain: GitLabCi = {};

    /**
     * See macro() method.
     */
    private macros: { [key: string]: (config: Config, args: any) => void } = {};

    /**
     * See patch() method.
     */
    private patchers: Array<(plain: GitLabCi) => void> = [];

    /**
     * REST API handler.
     */
    private gapi?: GitlabType;

    /**
     * Get the REST API handler.
     *
     * @see https://www.npmjs.com/package/node-gitlab
     */
    public get api() {
        if (!this.gapi) {
            const { CI_JOB_TOKEN, GITLAB_TOKEN, CI_SERVER_URL } = process.env;
            this.gapi = new Gitlab({
                host: CI_SERVER_URL,
                token: GITLAB_TOKEN,
                ...(GITLAB_TOKEN ? {} : { jobToken: CI_JOB_TOKEN }),
                rejectUnauthorized: true,
            }) as GitlabType;
        }
        return this.gapi;
    }

    /**
     * The top-level `workflow:` key applies to the entirety of a pipeline, and will determine whether
     * or not a pipeline is created. It currently accepts a single `rules:` key that operates similarly
     * to `rules:` defined within jobs, enabling dynamic configuration of the pipeline.
     */
    public workflow(workflow: GitLabCi["workflow"]) {
        if (!this.plain.workflow) {
            this.plain.workflow = { rules: [] };
        }
        this.plain.workflow = merge(this.plain.workflow, workflow);
    }

    /**
     * `stages` is used to define stages that can be used by jobs and is defined globally.
     *
     * @see https://devowl.io/knowledge-base/success-message-but-when-reloading-the-page-i-do-not-see-a-new-item/
     */
    public stages(...stages: string[]) {
        if (!this.plain.stages) {
            this.plain.stages = [];
        }
        this.plain.stages.push(...stages);
    }

    /**
     * Some parameters can be set globally as the default for all jobs using the `default:` keyword.
     * Default parameters can then be overridden by job-specific configuration.
     *
     * @see https://docs.gitlab.com/ee/ci/yaml/#global-defaults
     */
    public defaults(defaults: GitLabCi["default"]) {
        if (!this.plain.default) {
            this.plain.default = {};
        }
        this.plain.default = merge(this.plain.default, defaults);
    }

    /**
     * GitLab CI/CD allows you to define variables inside .gitlab-ci.yml that are then passed in the job environment.
     * They can be set globally and per-job. When the variables keyword is used on a job level, it will override the global YAML
     * variables and predefined ones of the same name.
     *
     * @see https://docs.gitlab.com/ee/ci/yaml/#variables
     */
    public variable(key: string, value: GitLabCi["variables"][0]) {
        if (!this.plain.variables) {
            this.plain.variables = {};
        }
        this.plain.variables[key] = value;
    }

    /**
     * Get variable from job.
     */
    public getVariable(job: string, key: string) {
        const jobVariable = this.plain.jobs[job]?.variables[key];
        if (jobVariable !== undefined) {
            return jobVariable;
        }

        return this.plain.variables?.[key];
    }

    /**
     * Register a macro. A macro can be used to define jobs from a given variable map.
     *
     * @param key
     * @param callback
     */
    public macro<T extends MacroArgs>(key: string, callback: (config: Config, args: T) => void) {
        if (this.macros[key]) {
            throw new Error(`Macro ${key} already defined! You are not allowed to overwrite it.`);
        }

        this.macros[key] = callback;
    }

    /**
     * Apply a macro.
     *
     * @param key
     * @param args
     */
    public from<T extends MacroArgs>(key: string, args: T) {
        if (!this.macros[key]) {
            throw new Error(
                `Macro ${key} not found, please register it with Config#macro! Consider also, that you need to register the macro before you execute from it.`
            );
        }

        this.macros[key](this, args);
    }

    /**
     * Allows to run a callback on the resulting GitLab CI Yaml object (after recursively applying
     * extends and macros).
     */
    public patch(callback: Config["patchers"][0]) {
        this.patchers.push(callback);
    }

    /**
     * A job is defined as a list of parameters that define the job’s behavior.
     *
     * @see https://docs.gitlab.com/ee/ci/yaml/#configuration-parameters
     * @param name The new job name
     * @param job Job definition
     * @param hidden See https://docs.gitlab.com/ee/ci/yaml/#hide-jobs for more infos
     */
    public job(name: string, job: GitLabCi["jobs"][0], hidden = false) {
        if (!this.plain.jobs) {
            this.plain.jobs = {};
        }

        const useName = hidden && !name.startsWith(".") ? `.${name}` : name;

        if (!this.plain.jobs[useName]) {
            this.plain.jobs[useName] = job;
            console.log(`Job "${useName}" created successfully!`);
        } else {
            console.info(`Job "${useName}" already exists, skipping...`);
        }
    }

    /**
     * Similar to [`extends`](https://docs.gitlab.com/ee/ci/yaml/#extends) but it uses
     * a deep-merge mechanism instead of the built-in extend functionality of GitLab CI.
     * This ensures more granular configuration!
     *
     * @param fromName The job name you want to extend from
     * @param name The new job name
     * @param job Job definition
     * @param hidden See https://docs.gitlab.com/ee/ci/yaml/#hide-jobs for more infos
     */
    public extends(fromName: string | string[], name: string, job: GitLabCi["jobs"][0], hidden = false) {
        this.job(name, merge(job, { extends: Array.isArray(fromName) ? fromName : [fromName] }), hidden);
    }

    /**
     * Include further `.ts` configurations by a glob. This is similar to [`include:local`](https://docs.gitlab.com/ee/ci/yaml/#includelocal)
     * but this implementation should be used instead!
     *
     * @param cwd Current working directy, use `process.cwd()`
     * @param globs See https://www.npmjs.com/package/glob for more information
     */
    public async include(cwd: string, globs: string[]) {
        for (const glob of globs) {
            const files = globSync(glob, {
                absolute: true,
                cwd,
                dot: true,
            });

            for (const file of files) {
                console.log(`Include file "${file}..."`);
                const exported = await import(file);
                if (!exported?.extendConfig) {
                    throw new Error(`Please export a function extendConfig which returns a Config instance!`);
                }

                if (!(exported.extendConfig instanceof Function)) {
                    throw new Error(`The exported extendConfig is not a function!`);
                }

                await exported.extendConfig(this);
            }
        }
    }

    /**
     * Get the whole configuration as yaml-serializable object.
     */
    public getPlainObject() {
        let copy = JSON.parse(JSON.stringify(this.plain)) as GitLabCi;

        this.resolveExtends(copy);
        this.clear(copy);

        for (const patcher of this.patchers) {
            patcher(copy);
        }

        // Move jobs to root
        copy = {
            ...copy,
            ...copy.jobs,
        };
        delete copy.jobs;

        return copy;
    }

    /**
     * Check if files got changed by a commit by a regexp. E. g. `^\.vscode\/launch\.json$`.
     */
    public async hasChanged(regexp?: RegExp, sha?: string, cwd = process.cwd()) {
        const useSha =
            sha ||
            process.env.CI_COMMIT_SHA ||
            execSync("git rev-parse HEAD", {
                encoding: "utf-8",
                cwd,
            });
        const list = execSync("git diff-tree --no-commit-id --name-only -r " + useSha, {
            encoding: "utf-8",
            cwd,
        }).toString();

        if (!regexp) {
            return list.split("\n");
        }

        return regexp.test(list);
    }

    private recursivelyExtend(
        pipeline: GitLabCi,
        firstJob: JobDefinitionExtends,
        job: JobDefinitionExtends = firstJob
    ) {
        if (job.extends) {
            if (!job.needsExtends) {
                job.needsExtends = [];
            }

            for (const from of job.extends) {
                let jobKey: string;
                if (pipeline.jobs?.[from]) {
                    jobKey = from;
                } else if (pipeline.jobs?.[`.${from}`]) {
                    jobKey = `.${from}`;
                }

                if (!jobKey) {
                    console.warn(`The job "${from}" does not exist, skipping...`);
                    continue;
                }
                const jobObj = pipeline.jobs[jobKey];
                firstJob.needsExtends.unshift(from);

                this.recursivelyExtend(pipeline, firstJob, jobObj);
            }
        }
    }

    /**
     * Resolves all `extends` and puts it in correct order.
     *
     * @param pipeline
     */
    private resolveExtends(pipeline: GitLabCi) {
        const jobIds = Object.keys(pipeline.jobs ?? {});
        for (const key of jobIds) {
            const job = pipeline.jobs[key];
            if (job.extends && !key.startsWith(".")) {
                this.recursivelyExtend(pipeline, job);

                let result: JobDefinitionExtends = {};
                const { needsExtends } = job as JobDefinitionExtends;
                for (const extendKey of needsExtends) {
                    result = merge(result, pipeline.jobs[extendKey]);
                }

                // The main job definition has highest priority
                pipeline.jobs[key] = merge(result, job);
            }
        }
    }

    /**
     * Clear temporary hold variables.
     *
     * @param pipeline
     */
    private clear(pipeline: GitLabCi) {
        // Finally, remove all existing `extends`
        const jobIds = Object.keys(pipeline.jobs ?? {});
        for (const key of jobIds) {
            const job = pipeline.jobs[key] as JobDefinitionExtends;
            if (job.extends) {
                job.extends = job.extends.filter((job) => jobIds.indexOf(job) === -1);
                if (!job.extends.length) {
                    delete job.extends;
                    delete job.needsExtends;
                }
            }
        }
    }
}

type CreateConfigFunction = () => Promise<Config>;
type ExtendConfigFunction = (config: Config) => void;

export { Config, CreateConfigFunction, ExtendConfigFunction, MacroArgs };
