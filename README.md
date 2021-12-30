# monorepo-next

A simple monorepo sample reference using [turborepo](https://turborepo.org/), [lernajs](https://github.com/lerna/lerna) and [pnpm](https://pnpm.io/)

- [monorepo-next](#monorepo-next)
  - [Getting started](#getting-started)
  - [Features](#features)
  - [What's inside](#whats-inside)
  - [Configuration](#configuration)
    - [Workspace management & dependency hoisting](#workspace-management--dependency-hoisting)
    - [Package versioning](#package-versioning)
    - [Conventional commits](#conventional-commits)
    - [Commit message linting](#commit-message-linting)
    - [Configurable Build System](#configurable-build-system)
  - [Structure](#structure)
  - [Sample packages](#sample-packages)
  - [Scripts](#scripts)


## Getting started

Managing monorepos has become more than a trending topic but a key argument to consider and to master in managing large and complex projects, or even projects including multiple packages. There is a huge literature all around about techniques, management, pros&cons, benefits and more, a good place to find references could be [Awesome monorepo](https://github.com/korfuri/awesome-monorepo).

Usually managing monorepos in nodejs/javascript is often made using [lernajs](https://github.com/lerna/lerna) althought some alternatives during the time has been implemented, The basic toolchain usually relied on lerna and a package manager between **npm** and **yarn**.  

Althought there are several tools and farmeworks too to manage monorepos for several languages & runtimes, this repository aim to provide a simple *sample reference* for nodejs monorepos considering a powerful and strong toolchain splitting the responsibilities in:

1. Build system
2. Monorepo management
3. Package management

## Features

- Configurable build system
- Dependency hoisting
- Workspace management
- (Independent) Packages versioning
- Conventional commits
- Commit message linting
- Changelog generation per package
- Git integration

## What's inside

This monorepo configuration makes use of the following packages per feature:

| Feat                                      | Name            | Package(s)                            | Notes |
| ----------------------------------------- | --------------- | ------------------------------------- | ----- |
| Configurable Build System                 | **Turborepo**   | ```turbo```                           |       |
| Packages versioning                       | **Lerna**       | ```lerna```                           |       |
|                                           |                 | ```@lerna/project```                  |       |
| Dependency hoisting, Workspace management | **Pnpm**        | ```-```                               |       |
| Conventional commits                      | **Committizen** | ```commitizen```                      |       |
|                                           |                 | ```cz-conventional-changelog```       |       |
|                                           |                 | ```cz-lerna-changelog```              |       |
| Commit message linting                    | **Commitlint**  | ```@commitlint/cli```                 |       |
|                                           |                 | ```@commitlint/config-conventional``` |       |
|                                           |                 | ```@commitlint/core"```               |       |
|                                           |                 | ```@commitlint/prompt```              |       |
| Git integration                           | **Husky**       | ```husky```                           |       |

## Configuration

### Workspace management & dependency hoisting

**1. [Workspaces](https://pnpm.io/workspaces)**
- enabled through [pnpm](https://pnpm.io/) within the file `pnpm-workspace.yaml`
- manage packages in `packages` folder
- exclude everything inside any `test` folder

**2. [Dependency hoisting](https://pnpm.io/npmrc#dependency-hoisting-settings)**
- configured within `.npmrc` file
- [`shamefully-hoist: true`](https://pnpm.io/npmrc#shamefully-hoist)

**3. Packages management & resolution**
- configured within `.npmrc` file
- [`prefer-workspace-package: true`](https://pnpm.io/workspaces#prefer-workspace-packages)
- [`save-workspace-protocol: false`](https://pnpm.io/workspaces#save-workspace-protocol)

### Package versioning

**1. version command enhancement**
- configured within `lerna.json` file, versioning supported only in `main` branch using **conventionalCommits** through a `chore(release)` message:
  ```json
  ...
  "command": {
    "version": {
      "allowBranch": "main",
      "conventionalCommits": true,
      "exact": true,
      "message": "chore(release): %s"
    }
  },
  ...
  ```
**2. version independent**
- configured within `lerna.json` file, permit an independent versioning strategy per affected package:
  ```json
  ...
  "version": "independent",
  ...
  ```
**3. npmClient override**
- configured within `lerna.json` file, permit to use as npmClient a different package manager, here **pnpm**
  ```json
  ...
  "npmClient": "pnpm",
  ...
  ```
**4. workspaces**
- althought workspaces are managed and configured using pnpm, lerna requires to have visibility of such configuration within `lerna.json` file
  ```json
  ...
  "useWorkspaces": "true",
  ...
  ```

### Conventional commits

**1. Changelog generation per package**
- configured within `package.json` file, permit to specify what strategy to use for changelog generation based on conventional commits. Considering the **independent versioning management per package through lerna**, the package `cz-lerna-changelog` permit to manage it according to monorepo packages:
  ```json
  ...
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-lerna-changelog"
    }
  }
  ...
  ```
conventional commits are then managed via terminal as
![](https://www.evernote.com/l/AAVyZb3cVbpP0oFqYnkpGMAFIbBW3JRGOEUB/image.png "Commit message configuration")  

### Commit message linting

**1. Git integration**
- configured within `package.json` file, permit to apply linting to commit messages
  ```json
  ...
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -e $HUSKY_GIT_PARAMS"
    }
  },
  ...
  ```
  
### Configurable Build System

**1. Turborepo integration**
- configured within `package.json` file
 ```json
  ...
  "turbo": {
    "baseBranch": "origin/main"
  },
  ...
  ```
 
> Note: Although Turborepo support a [rich and versatile configuration and toolchain for managing monorepos](https://turborepo.org/docs/guides/>complimentary-tools), this monorepo is configured for minimal integration alongside to lernajs for **versioning and changelog generation**. 

***At present, a sample [pipeline](https://turborepo.org/docs/features/pipelines) is not yet configured.***

## Structure

The actual monorepo configuration support the management of packages within the usual `packages` folder

## Sample packages

As a sample structure, there are two sample packages
1. [service-one](/packages/service-one)
2. [service-two](/packages/service-one)

both are implemented using a sample [Fastify](https://github.com/fastify/fastify) structure with:
- [`fastify`](https://github.com/fastify/fastify)
- [`fastify-cli`](https://github.com/fastify/fastify-cli)
- [`fastify-autoload`](https://github.com/fastify/fastify-autoload)

## Scripts

The monorepo manage the following scripts:

| Name              | Purpose                                                                            | Notes                                            |
| ----------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------ |
| `preinstall`      | check no package manager can be used but **pnpm**                                  |                                                  |
| `commit`          | execute [conventional commits](#conventional-commits) prompt                       |                                                  |
| `build`           | execute the build using [turbo repo build system](#configurable-build-system)      | ***A pipeline is required in order to execute*** |
| `dev`             | execute the dev script using [turbo repo build system](#configurable-build-system) | ***A pipeline is required in order to execute*** |
| `lint`            | execute the linter using [turbo repo build system](#configurable-build-system)     | ***A pipeline is required in order to execute*** |
| `format`          | prettify code files                                                                | C3                                               |
| `clean`           | perform a global monorepo cleanup                                                  | shortcut for `clean:artifacts`                   |
| `clean:artifacts` | perform a cleanup purging all node_modules folders                                 | recursive                                        |
| `run:service:one` | execute the run script and start service-one                                       | service-one on `PORT 3001`                       |
| `run:service:two` | execute the run script and start service-two                                       | service-two on `PORT 3002`                       |