/**
 * @see https://docs.gitlab.com/ee/ci/yaml/#retry
 */
type RetryDefinition =
    | number
    | {
          max?: number;
          when?: Array<
              | "always"
              | "unknown_failure"
              | "script_failure"
              | "api_failure"
              | "stuck_or_timeout_failure"
              | "runner_system_failure"
              | "missing_dependency_failure"
              | "runner_unsupported"
              | "stale_schedule"
              | "job_execution_timeout"
              | "archived_failure"
              | "unmet_prerequisites"
              | "scheduler_failure"
              | "data_integrity_failure"
          >;
      };

export { RetryDefinition };
