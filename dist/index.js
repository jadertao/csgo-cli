#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var team_1 = require("./team");
var csgo = require("commander");
var status = {
    team: '',
    type: ''
};
var modifyType = function (type) { return status.type = type; };
var handler = function (name) {
    status.team = name;
    console.log("querying " + status.type + " info of " + status.team + ", please wait");
    if (status.type === 'battle')
        team_1.getTeam(name);
};
csgo
    .version('0.1.0')
    .parse(process.argv);
csgo
    .command('team [name]')
    .alias('t')
    .description('查询队伍信息')
    .option('--content,-c <type>', 'specify query content', modifyType)
    .action(handler);
csgo.parse(process.argv);
