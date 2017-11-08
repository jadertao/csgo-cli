#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = require("./query");
var csgo = require("commander");
var status = {
    team: '',
    type: ''
};
var modifyType = function (type) { return status.type = type; };
var handler = function (name) {
    status.team = name;
    console.log("querying " + status.type + " info of " + status.team + ", please wait");
    query_1.classify(status.type)(name);
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
