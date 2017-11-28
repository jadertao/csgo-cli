"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("./query");
const paramCheck = name => {
    if (!name) {
        console.log('team or player name is required');
        return false;
    }
    return true;
};
exports.config = {
    version: '0.1.0',
    command: [
        {
            name: 'team [name]',
            alias: 't',
            description: 'query team info, one team for one time',
            option: [
                ['-m --match', 'query recent matches'],
                ['-o --overview', 'query overview'],
                ['-p --player', 'query players of this team'],
                ['-r --ranking', 'query current ranking']
            ],
            handler: (name, options) => {
                if (name)
                    name = name.toLowerCase();
                if (options.match && !options.overview && !options.player && !options.ranking) {
                    if (!paramCheck(name))
                        return;
                    console.log(`querying recent matches of team ${name}...`);
                    query_1.printTeamMatches(name);
                    return;
                }
                if (!options.match && options.overview && !options.player && !options.ranking) {
                    if (!paramCheck(name))
                        return;
                    console.log(`querying team overview of team ${name}...`);
                    query_1.printTeamOverview(name);
                    return;
                }
                if (!options.match && !options.overview && options.player && !options.ranking) {
                    if (!paramCheck(name))
                        return;
                    console.log(`querying players of team ${name}...`);
                    query_1.printTeamPlayers(name);
                    return;
                }
                if (!options.match && !options.overview && options.ranking) {
                    console.log(`querying current team ranking of all team...`);
                    query_1.printTeamRanking();
                    return;
                }
                console.log("a valid option is required, see 'csgo team -h'");
            }
        },
        {
            name: 'match',
            alias: 'm',
            description: 'query upcoming matches schedule',
            option: [],
            handler: () => {
                console.log('querying upcoming matches schedule');
                query_1.printUpcomingMatches();
            }
        },
        {
            name: 'player',
            alias: 'p',
            description: 'query player info',
            option: [],
            handler: (name) => {
                if (!paramCheck(name))
                    return;
                console.log(`querying info of ${name}`);
                query_1.printPlayer(name);
            }
        }
    ]
};
