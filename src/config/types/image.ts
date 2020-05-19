/**
 * @see https://docs.gitlab.com/ee/ci/yaml/#image
 */
type ImageExpression =
    | string
    | {
          name: string;
          entrypoint?: string | string[];
      };

export { ImageExpression };
