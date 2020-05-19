/**
 * @see https://docs.gitlab.com/ee/ci/yaml/#variables
 */
type VariablesDefinition = {
    [key: string]: string | number | boolean;
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#git-strategy
     */
    GIT_STRATEGY?: "clone" | "fetch" | "none";
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#git-submodule-strategy
     */
    GIT_SUBMODULE_STRATEGY?: "none" | "normal" | "recursive";
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#git-checkout
     */
    GIT_CHECKOUT?: boolean;
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#git-clean-flags
     */
    GIT_CLEAN_FLAGS?: string;
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#job-stages-attempts
     */
    GET_SOURCES_ATTEMPTS?: number;
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#job-stages-attempts
     */
    ARTIFACT_DOWNLOAD_ATTEMPTS?: number;
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#job-stages-attempts
     */
    RESTORE_CACHE_ATTEMPTS?: number;
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#job-stages-attempts
     */
    EXECUTOR_JOB_SECTION_ATTEMPTS?: number;
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#shallow-cloning
     */
    GIT_DEPTH?: number;
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#custom-build-directories
     */
    GIT_CLONE_PATH?: string;
};

export { VariablesDefinition };
