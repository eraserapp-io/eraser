oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g ecli
$ ecli COMMAND
running command...
$ ecli (--version)
ecli/0.0.0 darwin-arm64 node-v17.9.0
$ ecli --help [COMMAND]
USAGE
  $ ecli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ecli hello PERSON`](#ecli-hello-person)
* [`ecli hello world`](#ecli-hello-world)
* [`ecli help [COMMAND]`](#ecli-help-command)
* [`ecli plugins`](#ecli-plugins)
* [`ecli plugins:install PLUGIN...`](#ecli-pluginsinstall-plugin)
* [`ecli plugins:inspect PLUGIN...`](#ecli-pluginsinspect-plugin)
* [`ecli plugins:install PLUGIN...`](#ecli-pluginsinstall-plugin-1)
* [`ecli plugins:link PLUGIN`](#ecli-pluginslink-plugin)
* [`ecli plugins:uninstall PLUGIN...`](#ecli-pluginsuninstall-plugin)
* [`ecli plugins:uninstall PLUGIN...`](#ecli-pluginsuninstall-plugin-1)
* [`ecli plugins:uninstall PLUGIN...`](#ecli-pluginsuninstall-plugin-2)
* [`ecli plugins update`](#ecli-plugins-update)

## `ecli hello PERSON`

Say hello

```
USAGE
  $ ecli hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.types.ts)
```

_See code: [dist/commands/hello/index.types.ts](https://github.com/nickdebaise/eraser-cli/blob/v0.0.0/dist/commands/hello/index.ts)_

## `ecli hello world`

Say hello world

```
USAGE
  $ ecli hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `ecli help [COMMAND]`

Display help for ecli.

```
USAGE
  $ ecli help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for ecli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `ecli plugins`

List installed plugins.

```
USAGE
  $ ecli plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ ecli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `ecli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ ecli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ ecli plugins add

EXAMPLES
  $ ecli plugins:install myplugin 

  $ ecli plugins:install https://github.com/someuser/someplugin

  $ ecli plugins:install someuser/someplugin
```

## `ecli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ ecli plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ ecli plugins:inspect myplugin
```

## `ecli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ ecli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ ecli plugins add

EXAMPLES
  $ ecli plugins:install myplugin 

  $ ecli plugins:install https://github.com/someuser/someplugin

  $ ecli plugins:install someuser/someplugin
```

## `ecli plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ ecli plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ ecli plugins:link myplugin
```

## `ecli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ ecli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ecli plugins unlink
  $ ecli plugins remove
```

## `ecli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ ecli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ecli plugins unlink
  $ ecli plugins remove
```

## `ecli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ ecli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ ecli plugins unlink
  $ ecli plugins remove
```

## `ecli plugins update`

Update installed plugins.

```
USAGE
  $ ecli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
