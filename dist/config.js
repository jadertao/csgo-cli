"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("./query");
const util_1 = require("./util");
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
                ['-r --ranking', 'query current ranking of all team'],
            ],
            handler: (name, options) => {
                if (name) {
                    name = name.toLowerCase();
                }
                const optionList = ['match', 'overview', 'player', 'ranking'];
                const mountedOption = util_1.pickOption(optionList, options);
                const optionEntry = {
                    match: (teamName) => {
                        if (!util_1.teamCheck(name)) {
                            return false;
                        }
                        const worker = new util_1.WaitingHint(util_1.DynamicHint, `querying recent matches of team ${teamName}`, query_1.printTeamMatchesTime.bind(null, teamName));
                        worker.trigger();
                    },
                    overview: (teamName) => {
                        if (!util_1.teamCheck(teamName)) {
                            return false;
                        }
                        const worker = new util_1.WaitingHint(util_1.DynamicHint, `querying team overview of team ${teamName}`, query_1.printTeamOverviewTime.bind(null, teamName));
                        worker.trigger();
                    },
                    player: (teamName) => {
                        if (!util_1.teamCheck(teamName)) {
                            return false;
                        }
                        const worker = new util_1.WaitingHint(util_1.DynamicHint, `querying players of team ${teamName}`, query_1.printTeamPlayersTime.bind(null, teamName));
                        worker.trigger();
                    },
                    ranking: () => {
                        const workder = new util_1.WaitingHint(util_1.DynamicHint, `querying current team ranking of all team`, query_1.printTeamRankingTime);
                        workder.trigger();
                    },
                };
                if (mountedOption.isSuccess) {
                    optionEntry[mountedOption.value](name);
                }
                else {
                    util_1.log.warn("a valid option is required, see 'csgo team -h'");
                }
            },
        },
        {
            name: 'match',
            alias: 'm',
            description: 'query the time table of upcoming matches',
            option: [],
            handler: () => {
                const worker = new util_1.WaitingHint(util_1.DynamicHint, 'querying the time table of upcoming matches', query_1.printUpcomingMatchesTime);
                worker.trigger();
            },
        },
        {
            name: 'player',
            alias: 'p',
            description: 'query player info',
            option: [],
            handler: (playerName) => {
                if (!util_1.playerCheck(playerName)) {
                    return false;
                }
                const worker = new util_1.WaitingHint(util_1.DynamicHint, `querying info of ${name}`, query_1.printPlayerTime.bind(null, name));
                worker.trigger();
            },
        },
    ],
};
