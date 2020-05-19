/**
 * @see https://docs.gitlab.com/ee/ci/yaml/#artifacts
 */
type ArtifactsDefinition = {
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#artifactspaths
     */
    paths: string[];
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#artifactsexpose_as
     */
    expose_as?: string[];
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#artifactsname
     */
    name?: string;
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#artifactsuntracked
     */
    untracked?: boolean;
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#artifactswhen
     */
    when?: "on_success" | "on_failure" | "always";
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#artifactsexpire_in
     */
    expire_in?: string;
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#artifactsreports
     */
    reports?: {
        /**
         * @see https://docs.gitlab.com/ee/ci/pipelines/job_artifacts.html#artifactsreportsjunit
         */
        junit?: string;
        /**
         * @see https://docs.gitlab.com/ee/ci/pipelines/job_artifacts.html#artifactsreportsdotenv
         */
        dotenv?: string;
        /**
         * @see https://docs.gitlab.com/ee/ci/pipelines/job_artifacts.html#artifactsreportscobertura
         */
        cobertura?: string;
        /**
         * @see https://docs.gitlab.com/ee/ci/pipelines/job_artifacts.html#artifactsreportsterraform
         */
        terraform?: string;
        /**
         * @see https://docs.gitlab.com/ee/ci/pipelines/job_artifacts.html#artifactsreportscodequality-starter
         */
        codequality?: string;
        /**
         * @see https://docs.gitlab.com/ee/ci/pipelines/job_artifacts.html#artifactsreportssast-ultimate
         */
        sast?: string;
        /**
         * @see https://docs.gitlab.com/ee/ci/pipelines/job_artifacts.html#artifactsreportsdependency_scanning-ultimate
         */
        dependency_scanning?: string;
        /**
         * @see https://docs.gitlab.com/ee/ci/pipelines/job_artifacts.html#artifactsreportscontainer_scanning-ultimate
         */
        container_scanning?: string;
        /**
         * @see https://docs.gitlab.com/ee/ci/pipelines/job_artifacts.html#artifactsreportsdast-ultimate
         */
        dast?: string;
        /**
         * @see https://docs.gitlab.com/ee/ci/pipelines/job_artifacts.html#artifactsreportslicense_management-ultimate
         * @deprecated
         */
        license_management?: string;
        /**
         * @see https://docs.gitlab.com/ee/ci/pipelines/job_artifacts.html#artifactsreportslicense_scanning-ultimate
         */
        license_scanning?: string;
        /**
         * @see https://docs.gitlab.com/ee/ci/pipelines/job_artifacts.html#artifactsreportsperformance-premium
         */
        performance?: string;
        /**
         * @see https://docs.gitlab.com/ee/ci/pipelines/job_artifacts.html#artifactsreportsmetrics-premium
         */
        metrics?: string;
    };
};

export { ArtifactsDefinition };
