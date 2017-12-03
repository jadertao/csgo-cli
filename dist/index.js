#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csgo = require("commander");
const config_1 = require("./config");
const mount = (cli, cliConfig) => {
    cli.version(cliConfig.version);
    cliConfig.command.forEach((cmd) => {
        const cliT = cli.command(cmd.name);
        cliT.alias(cmd.alias).description(cmd.description);
        if (cmd.option.length) {
            cmd.option.forEach((o) => cliT.option(o[0], o[1]));
        }
        cliT.action(cmd.handler);
    });
};
mount(csgo, config_1.config);
csgo.parse(process.argv);
