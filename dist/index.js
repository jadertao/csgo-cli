#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var csgo = require("commander");
var mount = function (cli, config) {
    cli.version(config.version);
    config.command.forEach(function (cmd) {
        (_a = cli
            .command(cmd.name)
            .alias(cmd.alias)
            .description(cmd.description)).option.apply(_a, cmd.option);
        var _a;
    });
};
csgo.parse(process.argv);
