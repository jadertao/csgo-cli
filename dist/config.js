"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("./query");
const paramCheck = name => {
    if (!name) {
        console.log('team name is required');
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
                ['-r --ranking', 'query current ranking']
            ],
            handler: (name, options) => {
                if (name)
                    name = name.toLowerCase();
                if (options.match && !options.overview && !options.ranking) {
                    if (!paramCheck(name))
                        return;
                    console.log(`querying recent matches of team ${name}...`);
                    query_1.getTeamMatch(name);
                    return;
                }
                if (!options.match && options.overview && !options.ranking) {
                    if (!paramCheck(name))
                        return;
                    console.log(`querying team overview of team ${name}...`);
                    query_1.getTeamOverview(name);
                    return;
                }
                if (!options.match && !options.overview && options.ranking) {
                    console.log(`querying current team ranking of all team...`);
                    query_1.getTeamRanking();
                    return;
                }
                console.log("a valid option is required, see 'csgo team -h'");
            }
        },
        {
            name: 'match',
            alias: 'm',
            description: 'query matches schedule',
            option: [],
            handler: query_1.getMatches
        },
        {
            name: 'player',
            alias: 'p',
            description: 'query player info',
            option: [],
            handler: query_1.getPlayer
        }
    ]
};
