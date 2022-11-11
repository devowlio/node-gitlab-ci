import { GitLabCi } from "../types";
declare type MacroArgs = Record<string, any>;
/**
 * A global OOP-style GitLab CI configurator.
 */
declare class Config {
    /**
     * Holding the complete GitLab CI configuration as plain object instead
     * of classes so all is done within this class.
     */
    private plain;
    /**
     * See macro() method.
     */
    private macros;
    /**
     * See patch() method.
     */
    private patchers;
    /**
     * REST API handler.
     */
    private gapi?;
    /**
     * Get the REST API handler.
     *
     * @see https://www.npmjs.com/package/node-gitlab
     */
    get api(): import("@gitbeaker/core/dist/types").Gitlab<boolean>;
    /**
     * The top-level `workflow:` key applies to the entirety of a pipeline, and will determine whether
     * or not a pipeline is created. It currently accepts a single `rules:` key that operates similarly
     * to `rules:` defined within jobs, enabling dynamic configuration of the pipeline.
     */
    workflow(workflow: GitLabCi["workflow"]): void;
    /**
     * `stages` is used to define stages that can be used by jobs and is defined globally.
     *
     * @see https://devowl.io/knowledge-base/success-message-but-when-reloading-the-page-i-do-not-see-a-new-item/
     */
    stages(...stages: string[]): void;
    /**
     * Some parameters can be set globally as the default for all jobs using the `default:` keyword.
     * Default parameters can then be overridden by job-specific configuration.
     *
     * @see https://docs.gitlab.com/ee/ci/yaml/#global-defaults
     */
    defaults(defaults: GitLabCi["default"]): void;
    /**
     * GitLab CI/CD allows you to define variables inside .gitlab-ci.yml that are then passed in the job environment.
     * They can be set globally and per-job. When the variables keyword is used on a job level, it will override the global YAML
     * variables and predefined ones of the same name.
     *
     * @see https://docs.gitlab.com/ee/ci/yaml/#variables
     */
    variable(key: string, value: GitLabCi["variables"][0]): void;
    /**
     * Get variable from job.
     */
    getVariable(job: string, key: string): string | number | import("../types").VariableObject;
    /**
     * Register a macro. A macro can be used to define jobs from a given variable map.
     *
     * @param key
     * @param callback
     */
    macro<T extends MacroArgs>(key: string, callback: (config: Config, args: T) => void): void;
    /**
     * Apply a macro.
     *
     * @param key
     * @param args
     */
    from<T extends MacroArgs>(key: string, args: T): void;
    /**
     * Allows to run a callback on the resulting GitLab CI Yaml object (after recursively applying
     * extends and macros).
     */
    patch(callback: Config["patchers"][0]): void;
    /**
     * A job is defined as a list of parameters that define the job’s behavior.
     *
     * @see https://docs.gitlab.com/ee/ci/yaml/#configuration-parameters
     * @param name The new job name
     * @param job Job definition
     * @param hidden See https://docs.gitlab.com/ee/ci/yaml/#hide-jobs for more infos
     */
    job(name: string, job: GitLabCi["jobs"][0], hidden?: boolean): void;
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
    extends(fromName: string | string[], name: string, job: GitLabCi["jobs"][0], hidden?: boolean): void;
    /**
     * Include further `.ts` configurations by a glob. This is similar to [`include:local`](https://docs.gitlab.com/ee/ci/yaml/#includelocal)
     * but this implementation should be used instead!
     *
     * @param cwd Current working directy, use `process.cwd()`
     * @param globs See https://www.npmjs.com/package/glob for more information
     */
    include(cwd: string, globs: string[]): Promise<void>;
    /**
     * Get the whole configuration as yaml-serializable object.
     */
    getPlainObject(): GitLabCi;
    /**
     * Check if files got changed by a commit by a regexp. E. g. `^\.vscode\/launch\.json$`.
     */
    hasChanged(regexp?: RegExp, sha?: string, cwd?: string): Promise<boolean | string[]>;
    private recursivelyExtend;
    /**
     * Resolves all `extends` and puts it in correct order.
     *
     * @param pipeline
     */
    private resolveExtends;
    /**
     * Clear temporary hold variables.
     *
     * @param pipeline
     */
    private clear;
}
declare type CreateConfigFunction = () => Promise<Config>;
declare type ExtendConfigFunction = (config: Config) => void;
export { Config, CreateConfigFunction, ExtendConfigFunction, MacroArgs };
