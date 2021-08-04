import { Config } from "../config";

/**
 * Block this pipeline from generating until the ref pipeline has finished.
 *
 * @param config
 * @param ref Default is current branch
 * @param max Default is 1 (one pipeline per branch)
 */
async function waitRef(config: Config, ref = process.env.CI_COMMIT_REF_NAME, max = 1) {
    if (!process.env.CI) {
        return;
    }

    let didOutputParallelInfo = false;
    while (
        (
            await config.api.Pipelines.all(+process.env.CI_PROJECT_ID, {
                order_by: "id",
                sort: "asc",
                ref,
                scope: "running",
            })
        ).length > max
    ) {
        if (!didOutputParallelInfo) {
            console.log(`There is still a pipeline of "${ref}" running, we need to wait...`);
            didOutputParallelInfo = true;
        }
        await new Promise((r) => setTimeout(r, 10000));
    }
}

export { waitRef };
