import { Config } from "../config";
/**
 * Block this pipeline from generating until the ref pipeline has finished.
 *
 * @param config
 * @param ref Default is current branch
 * @param max Default is 1 (one pipeline per branch)
 */
declare function waitRef(config: Config, ref?: string, max?: number): Promise<void>;
export { waitRef };
