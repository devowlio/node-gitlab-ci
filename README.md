# node-gitlab-ci

<img align="right" src="https://assets.devowl.io/git/node-gitlab-ci/logo.png" alt="node-gitlab-ci Logo" height="180" />

**Create dynamic GitLab CI pipelines in JavaScript or TypeScript for each project. Reuse and inherit instructions and avoid duplicate code!**

Continuous Integration (CI) and Continuous Deployment (CD) are fantastic concepts for process automation in software development. We love GitLab CI because it implements the concept in an integrated solution with powerful configuration capabilities. However, pipeline configurations are stored in a static `.gitlab-ci.yml` file.

node-gitlab-ci allows you to **develop pipeline configurations dynamically in TypeScript and avoid duplicates in the statements with programming concepts like inheritance or functions.** This way you can perfectly integrate e.g. monorepos with many similiar projects into the CI/CD.

## Installation

Navigate to your repository and install the package via `yarn` or `npm`:

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

What does this statement do? The first job creates the `.gitlab-ci.ts.yml` file dynamically and the second job triggers the child pipeline. Learn more about this [in the GitLab documentation for child pipelines](https://docs.gitlab.com/ee/ci/parent_child_pipelines.html). It is recommended to add the `.gitlab-ci.ts.yml` file to your `.gitignore` file.

## Usage

### Your first `.gitlab-ci.ts`

It is a good practice to create a `.gitlab-ci.ts` in the root directory of your repository:

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

### How `include` works

The most interesting part of `node-gitlab-ci` is how `include` works (for example you are using `yarn workspaces` or `lerna`). With `Config#include` you can dynamically include files by a glob pattern:

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

### How `macro` works

With macros you can define callbacks and consume them with a set of parameters so you can dynamically create jobs with "hard coded" variables. The most excited use case is `only` in a monorepo:

```ts
type EsLintMacroArgs = MacroArgs & {
    prefix: string;
};

config.macro<EsLintMacroArgs>("lint eslint", (self, { prefix }) => {
    config.extends([`.common files changed`, `.lint eslint`], `${prefix} lint eslint`, {
        only: {
            changes: [`packages/${packageName}/{lib,scripts,test}/**/*.{js,jsx,tsx,ts}`],
        },
    });
});
```

And in your package you can use this macro as follow:

```ts
config.from<EsLintMacroArgs>("lint eslint", { prefix: "utils" });
```

### Interact with the GitLab REST API

This package comes with [`@gitbeaker/node`](https://github.com/jdalrymple/gitbeaker) bundled, so you can directly communicate with the [GitLab REST API](https://docs.gitlab.com/ee/api/api_resources.html). The API handler is brought to you with the following functionality:

```typescript
// List last 500 jobs in your project
config.api.Jobs.all(1 /* your project id */, {
    maxPages: 5,
    perPage: 100,
});
```

### Get changed files

If you need to detect changed file while child pipeline generation, you can use the following:

```typescript
const changed = config.hasChanged(); // returns string[]
const specificFileHasChanged = config.hasChanged(/^packages\/my-package\//gm);
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
