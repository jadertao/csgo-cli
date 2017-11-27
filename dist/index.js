#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csgo = require("commander");
const config_1 = require("./config");
const mount = (cli, config) => {
    cli.version(config.version);
    config.command.forEach(cmd => {
        let _cli = cli.command(cmd.name);
        _cli.alias(cmd.alias).description(cmd.description);
        if (cmd.option.length)
            cmd.option.forEach(o => _cli.option(o[0], o[1]));
        _cli.action(cmd.handler);
    });
};
mount(csgo, config_1.config);
csgo.parse(process.argv);
