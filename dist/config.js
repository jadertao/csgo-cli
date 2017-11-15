"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = require("./query");
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
            handler: function (name, options) {
                name = name.toLowerCase();
                if (options.match && !options.overview && !options.ranking) {
                    console.log("querying recent matches of team " + name + "...");
                    query_1.getTeamMatch(name);
                    return;
                }
                if (!options.match && options.overview && !options.ranking) {
                    console.log("querying team overview of team " + name + "...");
                    query_1.getTeamOverview(name);
                    return;
                }
                if (!options.match && !options.overview && options.ranking) {
                    console.log("querying current team ranking of team " + name + "...");
                    query_1.getTeamRanking(name);
                    return;
                }
                console.log('no valid input');
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
