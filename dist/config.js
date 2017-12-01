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
                ['-r --ranking', 'query current ranking']
            ],
            handler: (name, options) => {
                if (name)
                    name = name.toLowerCase();
                const config = ['match', 'overview', 'player', 'ranking'];
                const mountedOption = util_1.pickOption(config, options);
                const optionEntry = {
                    match: name => {
                        if (!util_1.teamCheck(name))
                            return;
                        new util_1.waitingHint(util_1.dynamicHint, `querying recent matches of team ${name}`, query_1.printTeamMatchesTime.bind(null, name));
                    },
                    overview: name => {
                        if (!util_1.teamCheck(name))
                            return;
                        new util_1.waitingHint(util_1.dynamicHint, `querying team overview of team ${name}`, query_1.printTeamOverviewTime.bind(null, name));
                    },
                    player: name => {
                        if (!util_1.teamCheck(name))
                            return;
                        new util_1.waitingHint(util_1.dynamicHint, `querying players of team ${name}`, query_1.printPlayerTime.bind(null, name));
                    },
                    ranking: name => {
                        if (!util_1.teamCheck(name))
                            return;
                        new util_1.waitingHint(util_1.dynamicHint, `querying current team ranking of all team`, query_1.printTeamRankingTime);
                    }
                };
                if (mountedOption.isSuccess) {
                    optionEntry[mountedOption.value]();
                }
                else {
                    util_1.log.warn("a valid option is required, see 'csgo team -h'");
                }
            }
        },
        {
            name: 'match',
            alias: 'm',
            description: 'query the time table of upcoming matches',
            option: [],
            handler: () => {
                new util_1.waitingHint(util_1.dynamicHint, 'querying the time table of upcoming matches', query_1.printUpcomingMatchesTime);
            }
        },
        {
            name: 'player',
            alias: 'p',
            description: 'query player info',
            option: [],
            handler: name => {
                if (!util_1.playerCheck(name))
                    return;
                new util_1.waitingHint(util_1.dynamicHint, `querying info of ${name}`, query_1.printPlayerTime.bind(null, name));
            }
        }
    ]
};
