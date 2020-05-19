type WhenOptions = "on_success" | "on_failure" | "always" | "manual" | "delayed";

/**
 * @see https://docs.gitlab.com/ee/ci/yaml/#when
 */
type WhenDefinition = WhenOptions;

export { WhenOptions, WhenDefinition };
