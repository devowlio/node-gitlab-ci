/**
 * @see https://docs.gitlab.com/ee/ci/yaml/#services
 */
type ServicesDefinition =
    | string[]
    | Array<{
          /**
           * @see https://docs.gitlab.com/ee/ci/yaml/#servicesname
           */
          name: string;
          /**
           * @see https://docs.gitlab.com/ee/ci/yaml/#servicesalias
           */
          alias?: string;
          /**
           * @see https://docs.gitlab.com/ee/ci/yaml/#servicesentrypoint
           */
          entrypoint?: string;
          /**
           * @see https://docs.gitlab.com/ee/ci/yaml/#servicescommand
           */
          command?: string;
      }>;

export { ServicesDefinition };
