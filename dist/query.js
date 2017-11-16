"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hltv_1 = require("hltv");
var cli_table2_1 = require("cli-table2");
var constant_1 = require("./constant");
var handleError = function (err) { return console.log(err.name + " " + err.errno); };
var getTeam = function (name) { return hltv_1.default.getTeam({ id: constant_1.TEAM[name] }); };
var getTeamStats = function (name) { return hltv_1.default.getTeamStats({ id: constant_1.TEAM[name] }); };
exports.getTeamMatch = function (name) { return getTeam(name).then(function (res) {
    var table = new cli_table2_1.default({
        head: ['opponent', 'result', 'event']
    });
    res.recentResults.forEach(function (m) {
        table.push([m.enemyTeam.name, m.result, m.event.name]);
    });
    console.log(table.toString());
}, handleError); };
exports.getTeamOverview = function (name) { return getTeamStats(name).then(function (res) { return console.log(res.overview); }, handleError); };
exports.getTeamRanking = function (name) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    hltv_1.default.getTeamRanking({ year: "" + year, month: "" + month, day: "" + day }).then(console.log, handleError);
};
exports.getMatches = function () { return hltv_1.default.getMatches().then(console.log, handleError); };
exports.getPlayer = function (name) { return hltv_1.default.getPlayer({ id: constant_1.PLAYER[name] }).then(console.log, handleError); };
