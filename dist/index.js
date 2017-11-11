#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var csgo = require("commander");
var config_1 = require("./config");
var mount = function (cli, config) {
    cli.version(config.version);
    config.command.forEach(function (cmd) {
        cli
            .command(cmd.name)
            .alias(cmd.alias)
            .description(cmd.description);
        cmd.option.forEach(function (o) {
            cli.option(o[0], o[1]);
        });
        cli.action(cmd.handler);
    });
    return cli;
};
mount(csgo, config_1.config).parse(process.argv);
