
# CSGO-Cli &middot; [![Build Status](https://travis-ci.org/JadeTao/csgo-cli.svg?branch=master)](https://travis-ci.org/JadeTao/csgo-cli) <a target="_blank" href="https://opensource.org/licenses/MIT" title="License: MIT"><img src="https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square"></a>

get CSGO professional infomation easily via cli, match, team and player.

## Install

To use csgo-cli, [Node](https://nodejs.org/) v6.0.0 is required.

[![NPM CS-GO](https://nodei.co/npm/csgo-cli.png)](https://nodei.co/npm/csgo-cli/)

## Usage

![help](https://raw.githubusercontent.com/JadeTao/csgo-cli/master/.github/help.png)

## Example

### help

```shell
$ csgo -h
$ csgo --help
$ csgo team -h

get the infomation of one command
```

### version

```shell
$ csgo -v
$ csgo --version

get the overview of this cli
```

### match schedule

```shell
$ csgo m
$ csgo match

querying the time table of upcoming matches...
```

### team infomation

```shell
$ csgo t -o navi
$ csgo team -o navi

uerying team overview of team navi...
```

run `csgo t -h` from more

### play infomation

```shell
$ csgo p s1mple
$ csgo player s1mple
querying info of s1mple..
```

## Issue & Feature Request

create an issue please.