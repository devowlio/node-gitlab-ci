/**
 * @see https://docs.gitlab.com/ee/ci/yaml/#include
 */
type IncludeDefinition =
    | string
    | string[]
    | Array<
          | {
                /**
                 * @see https://docs.gitlab.com/ee/ci/yaml/#includelocal
                 */
                local: string;
            }
          | {
                /**
                 * @see https://docs.gitlab.com/ee/ci/yaml/#includefile
                 */
                project: string;
                /**
                 * @see https://docs.gitlab.com/ee/ci/yaml/#includefile
                 */
                file?: string;
                /**
                 * @see https://docs.gitlab.com/ee/ci/yaml/#includefile
                 */
                ref?: string;
            }
          | {
                /**
                 * @see https://docs.gitlab.com/ee/ci/yaml/#includeremote
                 */
                remote: string;
            }
          | {
                /**
                 * @see https://docs.gitlab.com/ee/ci/yaml/#includetemplate
                 */
                template: string;
            }
      >;

export { IncludeDefinition };
