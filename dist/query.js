"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hltv_1 = require("hltv");
var constant_1 = require("./constant");
var handleError = function (err) { return console.log(err.name + " " + err.errno); };
exports.getTeamMatch = function (name) { return hltv_1.HLTV.getTeam({ id: constant_1.TEAM[name] }).then(function (res) { return console.log(res.recentResults); }, handleError); };
exports.getTeamStats = function (name) { return hltv_1.HLTV.getTeamStats({ id: constant_1.TEAM[name] }).then(console.log, handleError); };
var classifyMap = {
    match: exports.getTeamMatch,
    stats: exports.getTeamStats
};
exports.classify = function (type) { return classifyMap[type]; };
