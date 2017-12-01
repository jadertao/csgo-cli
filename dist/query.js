"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hltv_1 = require("hltv");
const Table = require("cli-table2");
const constant_1 = require("./constant");
const util_1 = require("./util");
const handleError = err => util_1.log.error(`${err.name} ${err.errno}`);
const getTeam = (name) => hltv_1.default.getTeam({ id: constant_1.TEAM[name] });
const getTeamStats = (name) => hltv_1.default.getTeamStats({ id: constant_1.TEAM[name] });
const getTeamMatches = (name) => __awaiter(this, void 0, void 0, function* () {
    try {
        const res = yield getTeam(name);
        const tableData = {
            head: ['opponent', 'result', 'event'],
            value: []
        };
        res.recentResults.forEach(m => {
            tableData.value.push([m.enemyTeam.name, m.result, m.event.name]);
        });
        return tableData;
    }
    catch (e) {
        handleError(e);
    }
});
const getTeamOverview = (name) => __awaiter(this, void 0, void 0, function* () {
    try {
        const res = yield getTeamStats(name);
        const tableData = {
            head: ['key', 'value'],
            value: []
        };
        const keys = Object.keys(res.overview);
        keys.forEach(k => {
            let item = {};
            item[k] = res.overview[k];
            tableData.value.push(item);
        });
        return tableData;
    }
    catch (e) {
        handleError(e);
    }
});
const getTeamPlayers = (name) => __awaiter(this, void 0, void 0, function* () {
    try {
        const res = yield getTeamStats(name);
        const tableData = {
            head: ['currentPlayers', 'historicPlayers', 'standinPlayers'],
            value: []
        };
        const { currentLineup, historicPlayers, standins } = res;
        const length = Math.max(currentLineup.length, historicPlayers.length, standins.length);
        Array.from({ length }, (v, i) => i).forEach(n => {
            let row = [];
            row[0] = currentLineup[n] ? currentLineup[n].name : '';
            row[1] = historicPlayers[n] ? historicPlayers[n].name : '';
            row[2] = standins[n] ? standins[n].name : '';
            tableData.value.push(row);
        });
        return tableData;
    }
    catch (e) {
        handleError(e);
    }
});
const getTeamRanking = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const res = yield hltv_1.default.getTeamRanking();
        const tableData = {
            head: ['ranking', 'name', 'points', 'change'],
            value: []
        };
        res.forEach(p => {
            let row = [p.place, p.team.name, p.points, p.change];
            tableData.value.push(row);
        });
        return tableData;
    }
    catch (e) {
        handleError(e);
    }
});
const getUpcomingMatches = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const res = yield hltv_1.default.getMatches();
        const tableData = {
            head: ['stars', 'date', 'team-A', 'team-B', 'format', 'event'],
            value: []
        };
        res.forEach(m => {
            const container = '★ ★ ★ ★ ★ ★ ★ ★ ★ ★';
            let star_num = m.stars;
            let stars = container.slice(0, 2 * star_num);
            let date = '-';
            if ('date' in m) {
                date = m['date'];
                const _date = new Date(date);
                date = _date.toLocaleString();
            }
            let team1 = '';
            let team2 = '';
            if (m.team1)
                team1 = m.team1.name;
            if (m.team2)
                team2 = m.team2.name;
            let event = '';
            if (m.event)
                event = m.event.name;
            tableData.value.push([stars, date, team1, team2, m.format, event]);
        });
        return tableData;
    }
    catch (e) {
        handleError(e);
    }
});
const getPlayer = (name) => __awaiter(this, void 0, void 0, function* () {
    try {
        const res = yield hltv_1.default.getPlayer({ id: constant_1.PLAYER[name] });
        const tableData = {
            head: ['key', 'value'],
            value: []
        };
        const value = tableData.value;
        value.push({ name: res.name });
        value.push({ ['name in game']: res.ign });
        value.push({ age: res.age });
        value.push({ team: res.team && res.team.name || '' });
        value.push({ country: res.country.name });
        value.push({ [' ']: ' ' });
        value.push({ statistics: '' });
        value.push({ rating: res.statistics.rating });
        value.push({ killsPerRound: res.statistics.killsPerRound });
        value.push({ headshots: `${res.statistics.headshots}%` });
        value.push({ mapsPlayed: res.statistics.mapsPlayed });
        value.push({ deathPerRound: res.statistics.deathsPerRound });
        value.push({ roundsContributed: res.statistics.roundsContributed });
        value.push({ [' ']: ' ' });
        value.push({ achievements: '' });
        res.achievements.forEach(a => {
            let item = {};
            item[`placed ${a.place} in`] = a.event.name;
            value.push(item);
        });
        return tableData;
    }
    catch (e) {
        handleError(e);
    }
});
const dataToTable = (data) => {
    if (!data) {
        util_1.log.error('no valid result');
        return;
    }
    const table = new Table({
        head: data.head
    });
    data.value.forEach(i => {
        table.push(i);
    });
    util_1.log.default('\n');
    util_1.log.default(table.toString());
};
const logWrap = (fn) => (name) => __awaiter(this, void 0, void 0, function* () {
    try {
        const tableData = yield fn(name);
        dataToTable(tableData);
    }
    catch (e) {
        handleError(e);
    }
});
exports.printTeamMatches = logWrap(getTeamMatches);
exports.printTeamOverview = logWrap(getTeamOverview);
exports.printTeamRanking = logWrap(getTeamRanking);
exports.printUpcomingMatches = logWrap(getUpcomingMatches);
exports.printPlayer = logWrap(getPlayer);
exports.printTeamPlayers = logWrap(getTeamPlayers);
exports.printTeamMatchesTime = util_1.printTimeWrap(exports.printTeamMatches);
exports.printTeamOverviewTime = util_1.printTimeWrap(exports.printTeamOverview);
exports.printTeamRankingTime = util_1.printTimeWrap(exports.printTeamRanking);
exports.printUpcomingMatchesTime = util_1.printTimeWrap(exports.printUpcomingMatches);
exports.printPlayerTime = util_1.printTimeWrap(exports.printPlayer);
exports.printTeamPlayersTime = util_1.printTimeWrap(exports.printTeamPlayers);
