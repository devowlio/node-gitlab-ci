import {
    VariablesDefinition,
    JobDefinition,
    ImageExpression,
    ServicesDefinition,
    CacheDefinition,
    ArtifactsDefinition,
    RetryDefinition,
    ScriptDefinition,
    RulesDefinition,
    IncludeDefinition,
} from ".";

/**
 * Main configuration.
 *
 * @see https://docs.gitlab.com/ee/ci/yaml/
 */
interface GitLabCi {
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#stages
     */
    stages?: string[];
    include?: IncludeDefinition;
    variables?: VariablesDefinition;
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#workflowrules
     */
    workflow?: {
        rules: RulesDefinition;
    };
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#global-defaults
     */
    default?: {
        image?: ImageExpression;
        services?: ServicesDefinition;
        /**
         * @see https://docs.gitlab.com/ee/ci/yaml/#before_script-and-after_script
         */
        before_script?: ScriptDefinition;
        /**
         * @see https://docs.gitlab.com/ee/ci/yaml/#before_script-and-after_script
         */
        after_script?: ScriptDefinition;
        /**
         * @see https://docs.gitlab.com/ee/ci/yaml/#tags
         */
        tags?: string[];
        cache?: CacheDefinition;
        artifacts?: ArtifactsDefinition;
        retry?: RetryDefinition;
        /**
         * @see https://docs.gitlab.com/ee/ci/yaml/#timeout
         */
        timeout?: string;
        /**
         * @see https://docs.gitlab.com/ee/ci/yaml/#interruptible
         */
        interruptible?: boolean;
    };
    jobs?: {
        [key: string]: JobDefinition;
        /**
         * @see https://docs.gitlab.com/ee/ci/yaml/#pages
         */
        pages?: JobDefinition;
    };
}

export { GitLabCi };
