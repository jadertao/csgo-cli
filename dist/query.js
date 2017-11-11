"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hltv_1 = require("hltv");
var constant_1 = require("./constant");
var handleError = function (err) { return console.log(err.name + " " + err.errno); };
var getTeam = function (name) { return hltv_1.HLTV.getTeam({ id: constant_1.TEAM[name] }); };
var getTeamStats = function (name) { return hltv_1.HLTV.getTeamStats({ id: constant_1.TEAM[name] }); };
exports.getTeamMatch = function (name) { return getTeam(name).then(function (res) { return console.log(res.recentResults); }, handleError); };
exports.getTeamOverview = function (name) { return getTeamStats(name).then(function (res) { return console.log(res.overview); }, handleError); };
exports.getTeamRanking = function (name) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var day = today.getDate();
    hltv_1.HLTV.getTeamRanking({ year: "" + year, month: "" + month, day: "" + day }).then(console.log, handleError);
};
