"use strict";
/**
 * KEEP THIS HEADER!
 *
 * This file got generated through https://app.quicktype.io and https://github.com/SchemaStore/schemastore/blob/master/src/schemas/json/gitlab-ci.json
 * with the following settings: https://i.imgur.com/sulr7zq.png.
 *
 * Before your replace this completely, search for "CUSTOM" and keep the custom types.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurpleWhen = exports.Strategy = exports.JobWhen = exports.LinkType = exports.DefaultElement = exports.KubernetesEnum = exports.DeploymentTier = exports.Action = exports.ArtifactsWhen = exports.Policy = void 0;
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
var Policy;
(function (Policy) {
    Policy["Pull"] = "pull";
    Policy["PullPush"] = "pull-push";
    Policy["Push"] = "push";
})(Policy = exports.Policy || (exports.Policy = {}));
/**
 * Configure when artifacts are uploaded depended on job status.
 *
 * Upload artifacts only when the job succeeds (this is the default).
 *
 * Upload artifacts only when the job fails.
 *
 * Upload artifacts regardless of job status.
 */
var ArtifactsWhen;
(function (ArtifactsWhen) {
    ArtifactsWhen["Always"] = "always";
    ArtifactsWhen["OnFailure"] = "on_failure";
    ArtifactsWhen["OnSuccess"] = "on_success";
})(ArtifactsWhen = exports.ArtifactsWhen || (exports.ArtifactsWhen = {}));
/**
 * Specifies what this job will do. 'start' (default) indicates the job will start the
 * deployment. 'prepare' indicates this will not affect the deployment. 'stop' indicates
 * this will stop the deployment.
 */
var Action;
(function (Action) {
    Action["Prepare"] = "prepare";
    Action["Start"] = "start";
    Action["Stop"] = "stop";
})(Action = exports.Action || (exports.Action = {}));
/**
 * Explicitly specifies the tier of the deployment environment if non-standard environment
 * name is used.
 */
var DeploymentTier;
(function (DeploymentTier) {
    DeploymentTier["Development"] = "development";
    DeploymentTier["Other"] = "other";
    DeploymentTier["Production"] = "production";
    DeploymentTier["Staging"] = "staging";
    DeploymentTier["Testing"] = "testing";
})(DeploymentTier = exports.DeploymentTier || (exports.DeploymentTier = {}));
/**
 * Filter job based on if Kubernetes integration is active.
 */
var KubernetesEnum;
(function (KubernetesEnum) {
    KubernetesEnum["Active"] = "active";
})(KubernetesEnum = exports.KubernetesEnum || (exports.KubernetesEnum = {}));
var DefaultElement;
(function (DefaultElement) {
    DefaultElement["AfterScript"] = "after_script";
    DefaultElement["Artifacts"] = "artifacts";
    DefaultElement["BeforeScript"] = "before_script";
    DefaultElement["Cache"] = "cache";
    DefaultElement["Image"] = "image";
    DefaultElement["Interruptible"] = "interruptible";
    DefaultElement["Retry"] = "retry";
    DefaultElement["Services"] = "services";
    DefaultElement["Tags"] = "tags";
    DefaultElement["Timeout"] = "timeout";
})(DefaultElement = exports.DefaultElement || (exports.DefaultElement = {}));
/**
 * The content kind of what users can download via url.
 */
var LinkType;
(function (LinkType) {
    LinkType["Image"] = "image";
    LinkType["Other"] = "other";
    LinkType["Package"] = "package";
    LinkType["Runbook"] = "runbook";
})(LinkType = exports.LinkType || (exports.LinkType = {}));
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
var JobWhen;
(function (JobWhen) {
    JobWhen["Always"] = "always";
    JobWhen["Delayed"] = "delayed";
    JobWhen["Manual"] = "manual";
    JobWhen["Never"] = "never";
    JobWhen["OnFailure"] = "on_failure";
    JobWhen["OnSuccess"] = "on_success";
})(JobWhen = exports.JobWhen || (exports.JobWhen = {}));
/**
 * You can mirror the pipeline status from the triggered pipeline to the source bridge job
 * by using strategy: depend
 */
var Strategy;
(function (Strategy) {
    Strategy["Depend"] = "depend";
})(Strategy = exports.Strategy || (exports.Strategy = {}));
var PurpleWhen;
(function (PurpleWhen) {
    PurpleWhen["Always"] = "always";
    PurpleWhen["Never"] = "never";
})(PurpleWhen = exports.PurpleWhen || (exports.PurpleWhen = {}));
