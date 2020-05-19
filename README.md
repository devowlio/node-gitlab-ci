# node-gitlab-ci

**Dynamically create your `.gitlab-ci.yml` from TypeScript `.ts` files!**

## Installation

First of all navigate to your repository and install the package via `yarn` or `npm`:

```bash
# Yarn
yarn add -D node-gitlab-ci

# NPM
npm install --save-dev node-gitlab-ci
```

Afterwards, create a `.gitlab-ci.yml` file with the following content:

```yml
# CI pipeline is dynamically created through `node-gitlab-ci`, please checkout `.gitlab-ci.ts`!

ts config:
    image: devowliode/node-gitlab-ci:latest
    stage: build
    script: node-gitlab-ci create-yml
    artifacts:
        paths:
            - .gitlab-ci.ts.yml

trigger pipeline:
    stage: test
    trigger:
        strategy: depend
        include:
            - artifact: .gitlab-ci.ts.yml
              job: ts config
```

What does this mean? The first job creates the `.gitlab-ci.ts.yml` file dynamically and the second job triggers the child pipeline. Learn more about it [here](https://docs.gitlab.com/ee/ci/parent_child_pipelines.html).

## Usage

### Your first `.gitlab-ci.ts`

It is a good practice to create a root `.gitlab-ci.ts` in your repository:

```ts
import { Config, CreateConfigFunction } from "node-gitlab-ci";

const createConfig: CreateConfigFunction = async () => {
    const config = new Config();

    config.stages("build", "test");

    config.defaults({
        image: "alpine:latest",
    });

    // Setting variables globally or per job
    config.variable("DOCKER_DRIVER", "overlay2");

    // Run a job only in production branch
    config.job(
        "only production",
        {
            only: {
                refs: ["master"],
            },
        },
        true // Creates a hidden job (prefixed with a dot)
    );

    // Allows you to include further configurations by glob patterns
    await config.include(__dirname, ["devops/.gitlab/*.ts"]);
    await config.include(__dirname, ["packages/*/devops/.gitlab/.gitlab-ci.ts"]);

    return config;
};

export { createConfig };
```

The complete GitLab CI [pipeline configuration](https://docs.gitlab.com/ee/ci/yaml/) is typed. Give it a try within your IDE and autocomplete!

**Note**: You can not `import` (ES6) or `require` (ES5) all your installed modules. At the time of creating the dynamic pipeline, it is executed within [`devowliode/node-gitlab-ci`](https://hub.docker.com/r/devowliode/node-gitlab-ci) docker container and there are only the `node` modules like `fs`, `path`, ... available. Please read more about it below "Use installed modules".

### Dry run locally

If you have successfully created the above file open a terminal session, navigate to your repository and:

```bash
# Yarn
yarn node-gitlab-ci create-yml

# NPM
npx node-gitlab-ci create-yml
```

A file `.gitlab-ci.ts.yml` will be created.

### Monorepo support / How `include` works

The most interesting part of `node-gitlab-ci` is the monorepo support (for example you are using `yarn workspaces` or `lerna`). With `Config#include` you can dynamically include files by a glob pattern:

```ts
// Do not forget the await!
await config.include(__dirname, ["packages/*/devops/.gitlab/.gitlab-ci.ts"]);
```

The extension file `packages/test/devops/.gitlab/.gitlab-ci.ts` must look like this:

```ts
import { ExtendConfigFunction } from "node-gitlab-ci";

const extendConfig: ExtendConfigFunction = async (config) => {
    // Create a job
    config.job(/* [...] */);

    // You can include further files
    await config.include(__dirname, ["./stage-*.ts"]);
};

export { extendConfig };
```

### How `extends` work

`node-gitlab-ci` resolves automatically the [`extends`](https://docs.gitlab.com/ee/ci/yaml/#extends) keyword for you so you can fully profit from nested jobs without limitations (e. g. nested `extends` with same keys like `only` are no covered by GitLab CI). This is done a **deep merge** mechanism:

```ts
config.job(
    "only production",
    {
        only: {
            refs: ["master"],
        },
    },
    true
);

config.extends(".only production", "my-job", {
    script: ["echo This job runs only in production!"],
});
```

You can also extend from multiple jobs:

```ts
config.job(
    "common files changed",
    {
        only: {
            changes: ["common/**/*"],
        },
    },
    true
);

config.extends([".only production", ".common files changed"], "my-job", {
    script: ["echo This job runs only in production and when common files got changed!"],
});
```

### Use installed modules

As mentioned previously you can not `import` or `require` any module. If you want to do so, you need to consider the following:

-   Open a Pull Request or Issue [here](https://gitlab.com/devowlio/node-gitlab-ci) and ask to install the module globally in the image
-   Create your own `Dockerfile` with the modules installed globally (e. g. `npm install --global fs-extra`), extended from [this](https://hub.docker.com/r/devowliode/node-gitlab-ci) dockerfile
-   Modify the `ts config` job and install the modules globally or locally

## Todo:

This repository is still in beta phase and the following things should be done:

-   Use [`debug`](https://www.npmjs.com/package/debug) package instead of `console.log`
-   Create GitLab CI with [`semantic-release`](https://www.npmjs.com/package/semantic-release) to automatically publish the package to npmjs.org
-   Create and push docker image through CI instead of hub.docker.com
-   Write Tests

## License

MIT
