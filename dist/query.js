"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hltv_1 = require("hltv");
const Table = require("cli-table2");
const constant_1 = require("./constant");
const handleError = err => console.log(`${err.name} ${err.errno}`);
const getTeam = (name) => hltv_1.default.getTeam({ id: constant_1.TEAM[name] });
const getTeamStats = (name) => hltv_1.default.getTeamStats({ id: constant_1.TEAM[name] });
exports.getTeamMatch = (name) => getTeam(name).then(res => {
    const table = new Table({
        head: ['opponent', 'result', 'event']
    });
    res.recentResults.forEach(m => {
        table.push([m.enemyTeam.name, m.result, m.event.name]);
    });
    console.log(table.toString());
}, handleError);
exports.getTeamOverview = (name) => {
    getTeamStats(name).then(res => {
        const o_table = new Table({
            head: ['key', 'value']
        });
        const p_table = new Table({
            head: ['currentPlayers', 'historicPlayers', 'standinPlayers']
        });
        const { currentLineup, historicPlayers, standins } = res;
        const length = Math.max(currentLineup.length, historicPlayers.length, standins.length);
        Array.from({ length }, (v, i) => i).forEach(n => {
            let row = [];
            row[0] = currentLineup[n] ? currentLineup[n].name : '';
            row[1] = historicPlayers[n] ? historicPlayers[n].name : '';
            row[2] = standins[n] ? standins[n].name : '';
            p_table.push(row);
        });
        const keys = Object.keys(res.overview);
        keys.forEach(k => {
            let item = {};
            item[k] = res.overview[k];
            o_table.push(item);
        });
        console.log(o_table.toString());
        console.log(p_table.toString());
    }, handleError);
};
exports.getTeamRanking = () => {
    hltv_1.default.getTeamRanking().then(res => {
        const table = new Table({
            head: ['ranking', 'name', 'points', 'change']
        });
        res.forEach(p => {
            let row = [p.place, p.team.name, p.points, p.change];
            table.push(row);
        });
        console.log(table.toString());
    }, handleError);
};
exports.getMatches = () => hltv_1.default.getMatches().then(console.log, handleError);
exports.getPlayer = (name) => hltv_1.default.getPlayer({ id: constant_1.PLAYER[name] }).then(console.log, handleError);
