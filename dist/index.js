#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var csgo = require("commander");
var config_1 = require("./config");
var mount = function (cli, config) {
    cli.version(config.version);
    config.command.forEach(function (cmd) {
        var _cli = cli.command(cmd.name);
        _cli.alias(cmd.alias)
            .description(cmd.description);
        if (cmd.option.length) {
            cmd.option.forEach(function (o) {
                _cli.option(o[0], o[1]);
            });
        }
        _cli.action(cmd.handler);
    });
};
mount(csgo, config_1.config);
csgo.parse(process.argv);
