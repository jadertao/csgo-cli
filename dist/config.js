"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = require("./query");
exports.config = {
    version: '0.1.0',
    command: [
        {
            name: 'team [name]',
            alias: 't',
            description: '查询队伍信息,每次只能查询一种',
            option: [
                ['-m --match', 'query recent matches according to team'],
                ['-o --overview', 'query overview according to team'],
                ['-r --ranking', 'query current ranking according to team']
            ],
            handler: function (name, options) {
                console.log(name);
                if (options.match && !options.overview && !options.ranking) {
                    console.log("querying recent matches of " + name + ",pleaze wait");
                    query_1.getTeamMatch(name);
                }
                if (!options.match && options.overview && !options.ranking) {
                    console.log("querying team overview of " + name + ",pleaze wait");
                    query_1.getTeamOverview(name);
                }
                if (!options.match && !options.overview && options.ranking) {
                    console.log("querying current team ranking of " + name + ",pleaze wait");
                    query_1.getTeamRanking(name);
                }
            }
        }
    ]
};
