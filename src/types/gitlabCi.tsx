/**
 * KEEP THIS HEADER!
 *
 * This file got generated through https://app.quicktype.io and https://github.com/SchemaStore/schemastore/blob/master/src/schemas/json/gitlab-ci.json
 * with the following settings: https://i.imgur.com/sulr7zq.png.
 *
 * Before your replace this completely, search for "CUSTOM" and keep the custom types.
 */

/**
 * Gitlab has a built-in solution for doing CI called Gitlab CI. It is configured by
 * supplying a file called `.gitlab-ci.yml`, which will list all the jobs that are going to
 * run for the project. A full list of all options can be found at
 * https://docs.gitlab.com/ee/ci/yaml/. You can read more about Gitlab CI at
 * https://docs.gitlab.com/ee/ci/README.html.
 */
export interface GitLabCi {
    after_script?: Array<string[] | string>;
    before_script?: Array<string[] | string>;
    cache?: CacheEntry[] | CacheEntry;
    default?: DefaultClass;
    image?: ImageClass | string;
    /**
     * Can be `IncludeItem` or `IncludeItem[]`. Each `IncludeItem` will be a string, or an
     * object with properties for the method if including external YAML file. The external
     * content will be fetched, included and evaluated along the `.gitlab-ci.yml`.
     */
    include?: Array<IncludeItemClass | string> | IncludeClass | string;
    /**
     * A special job used to upload static sites to Gitlab pages. Requires a `public/` directory
     * with `artifacts.path` pointing to it.
     */
    pages?: Job;
    services?: Array<ServiceClass | string>;
    /**
     * Groups jobs into stages. All jobs in one stage must complete before next stage is
     * executed. Defaults to ['build', 'test', 'deploy'].
     */
    stages?: string[];
    variables?: { [key: string]: number | VariableObject | string };
    workflow?: Workflow;
    /**
     * CUSTOM: Configure jobs here and they are appended to root object at merge time.
     */
    jobs?: {
        [key: string]: Job;
        /**
         * @see https://docs.gitlab.com/ee/ci/yaml/#pages
         */
        pages?: Job;
    };
}

/**
 * Specify files or directories to cache between jobs. Can be set globally or per job.
 */
export interface CacheEntry {
    key?: KeyObject | string;
    /**
     * List of files or paths to cache.
     */
    paths?: string[];
    /**
     * Determines the strategy for downloading and updating the cache.
     */
    policy?: Policy;
    /**
     * Set to `true` to cache untracked files.
     */
    untracked?: boolean;
}

/**
 * When you include cache:key:files, you must also list the project files that will be used
 * to generate the key, up to a maximum of two files. The cache key will be a SHA checksum
 * computed from the most recent commits (up to two, if two files are listed) that changed
 * the given files.
 */
export interface KeyObject {
    files?: string[];
}

/**
 * Unique cache ID, to allow e.g. specific branch or job cache. Environment variables can be
 * used to set up unique keys (e.g. "$CI_COMMIT_REF_SLUG" for per branch cache).
 *
 * Path to a single XML file
 *
 * A list of paths to XML files that will automatically be merged into one report
 *
 * A list of paths to XML files that will automatically be concatenated into a single file
 *
 * Used to select runners from the list of available runners. A runner must have all tags
 * listed here to run the job.
 *
 * String or regular expression to match against tag or branch names.
 *
 * The secret to be fetched from Vault (e.g. 'production/db/password@ops' translates to
 * secret 'ops/data/production/db', field `password`)
 *
 * Filter job by different keywords that determine origin or state, or by supplying
 * string/regex to check against branch/tag names.
 *
 * When a branch is pushed.
 *
 * When a tag is pushed.
 *
 * When a pipeline has been triggered by a second pipelines API (not triggers API).
 *
 * When using CI services other than Gitlab
 *
 * For multi-project triggers, created using the API with 'CI_JOB_TOKEN'.
 *
 * Pipeline is triggered by a `git push` by the user
 *
 * For scheduled pipelines.
 *
 * For pipelines created using a trigger token.
 *
 * For pipelines created using *Run pipeline* button in Gitlab UI (under your project's
 * *Pipelines*).
 *
 * Pull will download cache but skip uploading after job completes.
 *
 * Push will skip downloading cache and always recreate cache after job completes.
 *
 * Pull-push will both download cache at job start and upload cache on job success.
 */
export enum Policy {
    Pull = "pull",
    PullPush = "pull-push",
    Push = "push",
}

export interface DefaultClass {
    after_script?: Array<string[] | string>;
    artifacts?: Artifacts;
    before_script?: Array<string[] | string>;
    cache?: CacheEntry[] | CacheEntry;
    image?: ImageClass | string;
    interruptible?: boolean;
    retry?: RetryClass | number;
    services?: Array<ServiceClass | string>;
    tags?: string[];
    timeout?: string;
}

/**
 * Used to specify a list of files and directories that should be attached to the job if it
 * succeeds. Artifacts are sent to Gitlab where they can be downloaded.
 */
export interface Artifacts {
    /**
     * A list of paths to files/folders that should be excluded in the artifact.
     */
    exclude?: string[];
    /**
     * How long artifacts should be kept. They are saved 30 days by default. Artifacts that have
     * expired are removed periodically via cron job. Supports a wide variety of formats, e.g.
     * '1 week', '3 mins 4 sec', '2 hrs 20 min', '2h20min', '6 mos 1 day', '47 yrs 6 mos and
     * 4d', '3 weeks and 2 days'.
     */
    expire_in?: string;
    /**
     * Can be used to expose job artifacts in the merge request UI. GitLab will add a link
     * <expose_as> to the relevant merge request that points to the artifact.
     */
    expose_as?: string;
    /**
     * Name for the archive created on job success. Can use variables in the name, e.g.
     * '$CI_JOB_NAME'
     */
    name?: string;
    /**
     * A list of paths to files/folders that should be included in the artifact.
     */
    paths?: string[];
    /**
     * Reports will be uploaded as artifacts, and often displayed in the Gitlab UI, such as in
     * Merge Requests.
     */
    reports?: Reports;
    /**
     * Whether to add all untracked files (along with 'artifacts.paths') to the artifact.
     */
    untracked?: boolean;
    /**
     * Configure when artifacts are uploaded depended on job status.
     */
    when?: ArtifactsWhen;
}

/**
 * Reports will be uploaded as artifacts, and often displayed in the Gitlab UI, such as in
 * Merge Requests.
 */
export interface Reports {
    /**
     * Path for file(s) that should be parsed as Cobertura XML coverage report
     */
    cobertura?: string[] | string;
    /**
     * Path to file or list of files with code quality report(s) (such as Code Climate).
     */
    codequality?: string[] | string;
    /**
     * Path to file or list of files with Container scanning vulnerabilities report(s).
     */
    container_scanning?: string[] | string;
    /**
     * Path to file or list of files with DAST vulnerabilities report(s).
     */
    dast?: string[] | string;
    /**
     * Path to file or list of files with Dependency scanning vulnerabilities report(s).
     */
    dependency_scanning?: string[] | string;
    /**
     * Path to file or list of files containing runtime-created variables for this job.
     */
    dotenv?: string[] | string;
    /**
     * Path for file(s) that should be parsed as JUnit XML result
     */
    junit?: string[] | string;
    /**
     * Deprecated in 12.8: Path to file or list of files with license report(s).
     */
    license_management?: string[] | string;
    /**
     * Path to file or list of files with license report(s).
     */
    license_scanning?: string[] | string;
    /**
     * Path to file or list of files containing code intelligence (Language Server Index Format).
     */
    lsif?: string[] | string;
    /**
     * Path to file or list of files with custom metrics report(s).
     */
    metrics?: string[] | string;
    /**
     * Path to file or list of files with performance metrics report(s).
     */
    performance?: string[] | string;
    /**
     * Path to file or list of files with requirements report(s).
     */
    requirements?: string[] | string;
    /**
     * Path to file or list of files with SAST vulnerabilities report(s).
     */
    sast?: string[] | string;
    /**
     * Path to file or list of files with secret detection report(s).
     */
    secret_detection?: string[] | string;
    /**
     * Path to file or list of files with terraform plan(s).
     */
    terraform?: string[] | string;
}

/**
 * Configure when artifacts are uploaded depended on job status.
 *
 * Upload artifacts only when the job succeeds (this is the default).
 *
 * Upload artifacts only when the job fails.
 *
 * Upload artifacts regardless of job status.
 */
export enum ArtifactsWhen {
    Always = "always",
    OnFailure = "on_failure",
    OnSuccess = "on_success",
}

/**
 * Specifies the docker image to use for the job or globally for all jobs. Job configuration
 * takes precedence over global setting. Requires a certain kind of Gitlab runner executor.
 */
export interface ImageClass {
    /**
     * Command or script that should be executed as the container's entrypoint. It will be
     * translated to Docker's --entrypoint option while creating the container. The syntax is
     * similar to Dockerfile's ENTRYPOINT directive, where each shell token is a separate string
     * in the array.
     */
    entrypoint?: any[];
    /**
     * Full name of the image that should be used. It should contain the Registry part if needed.
     */
    name: string;
}

export interface RetryClass {
    max?: number;
    /**
     * Either a single or array of error types to trigger job retry.
     */
    when?: any;
}

export interface ServiceClass {
    /**
     * Additional alias that can be used to access the service from the job's container. Read
     * Accessing the services for more information.
     */
    alias?: string;
    /**
     * Command or script that should be used as the container's command. It will be translated
     * to arguments passed to Docker after the image's name. The syntax is similar to
     * Dockerfile's CMD directive, where each shell token is a separate string in the array.
     */
    command?: string[];
    /**
     * Command or script that should be executed as the container's entrypoint. It will be
     * translated to Docker's --entrypoint option while creating the container. The syntax is
     * similar to Dockerfile's ENTRYPOINT directive, where each shell token is a separate string
     * in the array.
     */
    entrypoint?: string[];
    /**
     * Full name of the image that should be used. It should contain the Registry part if needed.
     */
    name: string;
}

export interface IncludeItemClass {
    /**
     * Relative path from local repository root (`/`) to the `yaml`/`yml` file template. The
     * file must be on the same branch, and does not work across git submodules.
     */
    local?: string;
    file?: string[] | string;
    /**
     * Path to the project, e.g. `group/project`, or `group/sub-group/project`.
     */
    project?: string;
    /**
     * Branch/Tag/Commit-hash for the target project.
     */
    ref?: string;
    /**
     * Use a `.gitlab-ci.yml` template as a base, e.g. `Nodejs.gitlab-ci.yml`.
     */
    template?: string;
    /**
     * URL to a `yaml`/`yml` template file using HTTP/HTTPS.
     */
    remote?: string;
}

export interface IncludeClass {
    /**
     * Relative path from local repository root (`/`) to the `yaml`/`yml` file template. The
     * file must be on the same branch, and does not work across git submodules.
     */
    local?: string;
    file?: string[] | string;
    /**
     * Path to the project, e.g. `group/project`, or `group/sub-group/project`.
     */
    project?: string;
    /**
     * Branch/Tag/Commit-hash for the target project.
     */
    ref?: string;
    /**
     * Use a `.gitlab-ci.yml` template as a base, e.g. `Nodejs.gitlab-ci.yml`.
     */
    template?: string;
    /**
     * URL to a `yaml`/`yml` template file using HTTP/HTTPS.
     */
    remote?: string;
}

/**
 * A special job used to upload static sites to Gitlab pages. Requires a `public/` directory
 * with `artifacts.path` pointing to it.
 */
export interface Job {
    after_script?: Array<string[] | string>;
    /**
     * Setting this option to true will allow the job to fail while still letting the pipeline
     * pass.
     */
    allow_failure?: boolean;
    artifacts?: Artifacts;
    before_script?: Array<string[] | string>;
    cache?: CacheEntry[] | CacheEntry;
    /**
     * Must be a regular expression, optionally but recommended to be quoted, and must be
     * surrounded with '/'. Example: '/Code coverage: \d+\.\d+/'
     */
    coverage?: string;
    /**
     * Specify a list of job names from earlier stages from which artifacts should be loaded. By
     * default, all previous artifacts are passed. Use an empty array to skip downloading
     * artifacts.
     */
    dependencies?: string[];
    /**
     * Used to associate environment metadata with a deploy. Environment can have a name and URL
     * attached to it, and will be displayed under /environments under the project.
     */
    environment?: EnvironmentClass | string;
    /**
     * Job will run *except* for when these filtering options match.
     */
    except?: string[] | FilterClass;
    /**
     * The name of one or more jobs to inherit configuration from.
     */
    extends?: string[] /* CUSTOM: Remove: | string */;
    image?: ImageClass | string;
    /**
     * Controls inheritance of globally-defined defaults and variables. Boolean values control
     * inheritance of all default: or variables: keywords. To inherit only a subset of default:
     * or variables: keywords, specify what you wish to inherit. Anything not listed is not
     * inherited.
     */
    inherit?: Inherit;
    interruptible?: boolean;
    /**
     * The list of jobs in previous stages whose sole completion is needed to start the current
     * job.
     */
    needs?: Array<NeedClass | string>;
    /**
     * Job will run *only* when these filtering options match.
     */
    only?: string[] | FilterClass;
    /**
     * Parallel will split up a single job into several, and provide `CI_NODE_INDEX` and
     * `CI_NODE_TOTAL` environment variables for the running jobs.
     */
    parallel?: ParallelClass | number;
    /**
     * Indicates that the job creates a Release.
     */
    release?: Release;
    /**
     * Limit job concurrency. Can be used to ensure that the Runner will not run certain jobs
     * simultaneously.
     */
    resource_group?: string;
    retry?: RetryClass | number;
    rules?: JobRule[];
    /**
     * Shell scripts executed by the Runner. The only required property of jobs. Be careful with
     * special characters (e.g. `:`, `{`, `}`, `&`) and use single or double quotes to avoid
     * issues.
     */
    script?: Array<string[] | string> | string;
    secrets?: { [key: string]: { [key: string]: Secret } };
    services?: Array<ServiceClass | string>;
    /**
     * Define what stage the job will run in.
     */
    stage?: string;
    start_in?: string;
    tags?: string[];
    timeout?: string;
    /**
     * Trigger allows you to define downstream pipeline trigger. When a job created from trigger
     * definition is started by GitLab, a downstream pipeline gets created. Read more:
     * https://docs.gitlab.com/ee/ci/yaml/README.html#trigger
     */
    trigger?: TriggerClass | string;
    variables?: { [key: string]: number | string };
    when?: JobWhen;
}

export interface EnvironmentClass {
    /**
     * Specifies what this job will do. 'start' (default) indicates the job will start the
     * deployment. 'prepare' indicates this will not affect the deployment. 'stop' indicates
     * this will stop the deployment.
     */
    action?: Action;
    /**
     * The amount of time it should take before Gitlab will automatically stop the environment.
     * Supports a wide variety of formats, e.g. '1 week', '3 mins 4 sec', '2 hrs 20 min',
     * '2h20min', '6 mos 1 day', '47 yrs 6 mos and 4d', '3 weeks and 2 days'.
     */
    auto_stop_in?: string;
    /**
     * Explicitly specifies the tier of the deployment environment if non-standard environment
     * name is used.
     */
    deployment_tier?: DeploymentTier;
    /**
     * Used to configure the kubernetes deployment for this environment. This is currently not
     * supported for kubernetes clusters that are managed by Gitlab.
     */
    kubernetes?: KubernetesObject;
    /**
     * The name of the environment, e.g. 'qa', 'staging', 'production'.
     */
    name: string;
    /**
     * The name of a job to execute when the environment is about to be stopped.
     */
    on_stop?: string;
    /**
     * When set, this will expose buttons in various places for the current environment in
     * Gitlab, that will take you to the defined URL.
     */
    url?: string;
}

/**
 * Specifies what this job will do. 'start' (default) indicates the job will start the
 * deployment. 'prepare' indicates this will not affect the deployment. 'stop' indicates
 * this will stop the deployment.
 */
export enum Action {
    Prepare = "prepare",
    Start = "start",
    Stop = "stop",
}

/**
 * Explicitly specifies the tier of the deployment environment if non-standard environment
 * name is used.
 */
export enum DeploymentTier {
    Development = "development",
    Other = "other",
    Production = "production",
    Staging = "staging",
    Testing = "testing",
}

/**
 * Used to configure the kubernetes deployment for this environment. This is currently not
 * supported for kubernetes clusters that are managed by Gitlab.
 */
export interface KubernetesObject {
    /**
     * The kubernetes namespace where this environment should be deployed to.
     */
    namespace?: string;
}

export interface FilterClass {
    /**
     * Filter job creation based on files that were modified in a git push.
     */
    changes?: string[];
    /**
     * Filter job based on if Kubernetes integration is active.
     */
    kubernetes?: KubernetesEnum;
    refs?: string[];
    /**
     * Filter job by checking comparing values of environment variables. Read more about
     * variable expressions:
     * https://docs.gitlab.com/ee/ci/variables/README.html#variables-expressions
     */
    variables?: string[];
}

/**
 * Filter job based on if Kubernetes integration is active.
 */
export enum KubernetesEnum {
    Active = "active",
}

/**
 * Controls inheritance of globally-defined defaults and variables. Boolean values control
 * inheritance of all default: or variables: keywords. To inherit only a subset of default:
 * or variables: keywords, specify what you wish to inherit. Anything not listed is not
 * inherited.
 */
export interface Inherit {
    /**
     * Whether to inherit all globally-defined defaults or not. Or subset of inherited defaults
     */
    default?: DefaultElement[] | boolean;
    /**
     * Whether to inherit all globally-defined variables or not. Or subset of inherited variables
     */
    variables?: string[] | boolean;
}

export enum DefaultElement {
    AfterScript = "after_script",
    Artifacts = "artifacts",
    BeforeScript = "before_script",
    Cache = "cache",
    Image = "image",
    Interruptible = "interruptible",
    Retry = "retry",
    Services = "services",
    Tags = "tags",
    Timeout = "timeout",
}

export interface NeedClass {
    artifacts?: boolean;
    job: string;
    optional?: boolean;
    pipeline?: string;
    project?: string;
    ref?: string;
}

export interface ParallelClass {
    /**
     * Defines different variables for jobs that are running in parallel.
     */
    matrix: { [key: string]: any[] | number | string }[];
}

/**
 * Indicates that the job creates a Release.
 */
export interface Release {
    assets?: Assets;
    /**
     * Specifies the longer description of the Release.
     */
    description: string;
    /**
     * The title of each milestone the release is associated with.
     */
    milestones?: string[];
    /**
     * The Release name. If omitted, it is populated with the value of release: tag_name.
     */
    name?: string;
    /**
     * If the release: tag_name doesn’t exist yet, the release is created from ref. ref can be a
     * commit SHA, another tag name, or a branch name.
     */
    ref?: string;
    /**
     * The date and time when the release is ready. Defaults to the current date and time if not
     * defined. Should be enclosed in quotes and expressed in ISO 8601 format.
     */
    released_at?: Date;
    /**
     * The tag_name must be specified. It can refer to an existing Git tag or can be specified
     * by the user.
     */
    tag_name: string;
}

export interface Assets {
    /**
     * Include asset links in the release.
     */
    links: Link[];
}

export interface Link {
    /**
     * The redirect link to the url.
     */
    filepath?: string;
    /**
     * The content kind of what users can download via url.
     */
    link_type?: LinkType;
    /**
     * The name of the link.
     */
    name: string;
    /**
     * The URL to download a file.
     */
    url: string;
}

/**
 * The content kind of what users can download via url.
 */
export enum LinkType {
    Image = "image",
    Other = "other",
    Package = "package",
    Runbook = "runbook",
}

/**
 * rules allows for an array of individual rule objects to be evaluated in order, until one
 * matches and dynamically provides attributes to the job.
 */
export interface JobRule {
    /**
     * Setting this option to true will allow the job to fail while still letting the pipeline
     * pass.
     */
    allow_failure?: boolean;
    /**
     * Additional attributes will be provided to job if any of the provided paths matches a
     * modified file
     */
    changes?: string[];
    /**
     * Additional attributes will be provided to job if any of the provided paths matches an
     * existing file in the repository
     */
    exists?: string[];
    /**
     * Expression to evaluate whether additional attributes should be provided to the job
     */
    if?: string;
    start_in?: string;
    variables?: { [key: string]: number | string };
    when?: JobWhen;
}

/**
 * Describes the conditions for when to run the job. Defaults to 'on_success'.
 *
 * Execute job only when all jobs from prior stages succeed.
 *
 * Execute job when at least one job from prior stages fails.
 *
 * Execute job regardless of the status from prior stages.
 *
 * Execute the job manually from Gitlab UI or API. Read more:
 * https://docs.gitlab.com/ee/ci/yaml/#when-manual
 *
 * Execute a job after the time limit in 'start_in' expires. Read more:
 * https://docs.gitlab.com/ee/ci/yaml/#when-delayed
 *
 * Never execute the job.
 */
export enum JobWhen {
    Always = "always",
    Delayed = "delayed",
    Manual = "manual",
    Never = "never",
    OnFailure = "on_failure",
    OnSuccess = "on_success",
}

/**
 * Environment variable name
 */
export interface Secret {
    vault: VaultObject | string;
}

export interface VaultObject {
    engine: Engine;
    field: string;
    path: string;
}

export interface Engine {
    name: string;
    path: string;
}

/**
 * Trigger a multi-project pipeline. Read more:
 * https://docs.gitlab.com/ee/ci/yaml/README.html#simple-trigger-syntax-for-multi-project-pipelines
 *
 * Trigger a child pipeline. Read more:
 * https://docs.gitlab.com/ee/ci/yaml/README.html#trigger-syntax-for-child-pipeline
 */
export interface TriggerClass {
    /**
     * The branch name that a downstream pipeline will use
     */
    branch?: string;
    /**
     * Path to the project, e.g. `group/project`, or `group/sub-group/project`.
     */
    project?: string;
    /**
     * You can mirror the pipeline status from the triggered pipeline to the source bridge job
     * by using strategy: depend
     */
    strategy?: Strategy;
    include?: IncludeElement[] | string;
}

/**
 * References a local file or an artifact from another job to define the pipeline
 * configuration.
 */
export interface IncludeElement {
    /**
     * Relative path from local repository root (`/`) to the local YAML file to define the
     * pipeline configuration.
     */
    local?: string;
    /**
     * Name of the template YAML file to use in the pipeline configuration.
     */
    template?: string;
    /**
     * Relative path to the generated YAML file which is extracted from the artifacts and used
     * as the configuration for triggering the child pipeline.
     */
    artifact?: string;
    /**
     * Job name which generates the artifact
     */
    job?: string;
}

/**
 * You can mirror the pipeline status from the triggered pipeline to the source bridge job
 * by using strategy: depend
 */
export enum Strategy {
    Depend = "depend",
}

export interface VariableObject {
    /**
     * Explains what the variable is used for, what the acceptable values are.
     */
    description?: string;
    value?: string;
}

export interface Workflow {
    rules?: WorkflowRule[];
}

export interface WorkflowRule {
    if?: string;
    variables?: { [key: string]: number | string };
    when?: PurpleWhen;
}

export enum PurpleWhen {
    Always = "always",
    Never = "never",
}
