/**
 * @see https://docs.gitlab.com/ee/ci/yaml/#needs
 */
type NeedsDefinition =
    | string[]
    | Array<{
          job: string;
          /**
           * @see https://docs.gitlab.com/ee/ci/yaml/#artifact-downloads-with-needs
           */
          artifacts?: boolean;
      }>
    | {
          /**
           * @see https://docs.gitlab.com/ee/ci/yaml/#complex-trigger-syntax-for-multi-project-pipelines
           */
          pipeline: string;
      };

export { NeedsDefinition };
