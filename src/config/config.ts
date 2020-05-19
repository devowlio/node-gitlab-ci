import { GitLabCi, JobDefinition } from ".";
import merge from "deepmerge";
import { sync as globSync } from "glob";

/**
 * A global OOP-style GitLab CI configurator.
 *
 * TODO: check if all available properties can be set by this class.
 */
class Config {
    /**
     * Holding the complete GitLab CI configuration as plain object instead
     * of classes so all is done within this class.
     */
    private plain: GitLabCi = {};

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

        function recursivelyExtend(key: string, job: JobDefinition) {
            if (job.extends) {
                let result: typeof job = {};

                for (const from of job.extends) {
                    const jobObj = copy.jobs?.[from] || copy.jobs?.[`.${from}`];
                    if (!jobObj) {
                        console.warn(`The job "${from}" does not exist, skipping...`);
                        continue;
                    }

                    result = merge(result, recursivelyExtend(key, jobObj));
                }

                return merge(result, job);
            }
            return job;
        }

        // Resolve `extends`
        const jobIds = Object.keys(copy.jobs);
        for (const key of jobIds) {
            const job = copy.jobs[key];
            if (job.extends) {
                copy.jobs[key] = recursivelyExtend(key, job);
            }
        }

        // Finally, remove all existing `extends`
        for (const key of jobIds) {
            const job = copy.jobs[key];
            if (job.extends) {
                job.extends = job.extends.filter((job) => jobIds.indexOf(job) === -1);
                if (!job.extends.length) {
                    delete job.extends;
                }
            }
        }

        // Move jobs to root
        copy = {
            ...copy,
            ...copy.jobs,
        };
        delete copy.jobs;

        return copy;
    }
}

type CreateConfigFunction = () => Promise<Config>;
type ExtendConfigFunction = (config: Config) => void;

export { Config, CreateConfigFunction, ExtendConfigFunction };
