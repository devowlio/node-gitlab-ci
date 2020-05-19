/**
 * @see https://docs.gitlab.com/ee/ci/yaml/#cache
 */
type CacheDefinition = {
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#cachepaths
     */
    paths?: string[];
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#cacheuntracked
     */
    untracked?: boolean;
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#cachepolicy
     */
    policy?: "pull-push" | "push";
    /**
     * @see https://docs.gitlab.com/ee/ci/yaml/#cachekey
     */
    key?:
        | string
        | {
              /**
               * @see https://docs.gitlab.com/ee/ci/yaml/#cachekeyfiles
               */
              files: [string] | [string, string];
              /**
               * @see https://docs.gitlab.com/ee/ci/yaml/#cachekeyprefix
               */
              prefix?: string;
          };
};

export { CacheDefinition };
