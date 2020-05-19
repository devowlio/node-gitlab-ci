/**
 * @see https://docs.gitlab.com/ee/ci/yaml/#environment
 */
type EnvironmentDefinition =
    | string
    | {
          /**
           * @see https://docs.gitlab.com/ee/ci/yaml/#environmentname
           */
          name: string;
          /**
           * @see https://docs.gitlab.com/ee/ci/yaml/#environmenturl
           */
          url?: string;
          /**
           * @see https://docs.gitlab.com/ee/ci/yaml/#environmenton_stop
           */
          on_stop?: string;
          /**
           * @see https://docs.gitlab.com/ee/ci/yaml/#environmentaction
           */
          action?: "stop" | string;
          /**
           * @see https://docs.gitlab.com/ee/ci/yaml/#environmentauto_stop_in
           */
          auto_stop_in?: string;
          /**
           * @see https://docs.gitlab.com/ee/ci/yaml/#environmentkubernetes
           */
          kubernetes?: {
              namespace: string;
          };
      };

export { EnvironmentDefinition };
