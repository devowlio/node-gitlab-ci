/**
 * @see https://docs.gitlab.com/ee/ci/yaml/#linking-pipelines-with-triggerstrategy
 */
type Strategy = "depend";

/**
 * @see https://docs.gitlab.com/ee/ci/yaml/#complex-trigger-syntax-for-multi-project-pipelines
 */
type MultiProjectPipeline =
    | string
    | {
          project: string;
          strategy?: Strategy;
          branch?: string;
      };

/**
 * @see https://docs.gitlab.com/ee/ci/yaml/#trigger-syntax-for-child-pipeline
 */
type ChildPipeline = {
    include:
        | string
        | Array<{
              local: string;
              strategy?: Strategy;
          }>
        | Array<{
              artifact: string;
              job: string;
              strategy?: Strategy;
          }>;
    strategy?: string;
};

/**
 * @see https://docs.gitlab.com/ee/ci/yaml/#trigger
 */
type TriggerDefinition = MultiProjectPipeline;

export { TriggerDefinition };
