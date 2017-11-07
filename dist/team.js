"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hltv_1 = require("hltv");
var constant_1 = require("./constant");
exports.getTeam = function (name) { return hltv_1.HLTV.getTeam({ id: constant_1.TEAM[name] }).then(console.log, console.log); };
