import { printTeamMatchesTime, printTeamOverviewTime, printTeamRankingTime, printUpcomingMatchesTime, printPlayerTime, printTeamPlayersTime } from './query'
import { teamCheck, playerCheck, log, pickOption, waitingHint, dynamicHint } from './util'

interface command {
  name: string,
  alias: string,
  description: string,
  option: Array<Array<string>>,
  handler: any
}

interface config {
  version: string,
  command: Array<command>
}


export const config: config = {
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
      handler: (name: string, options: any) => {
        if (name) name = name.toLowerCase()
        const config = ['match', 'overview', 'player', 'ranking']
        const mountedOption = pickOption(config, options)
        const optionEntry = {
          match: name => {
            if (!teamCheck(name)) return
            new waitingHint(dynamicHint, `querying recent matches of team ${name}`, printTeamMatchesTime.bind(null, name))
          },
          overview: name => {
            if (!teamCheck(name)) return
            new waitingHint(dynamicHint, `querying team overview of team ${name}`, printTeamOverviewTime.bind(null, name))
          },
          player: name => {
            if (!teamCheck(name)) return
            new waitingHint(dynamicHint, `querying players of team ${name}`, printPlayerTime.bind(null, name))
          },
          ranking: name => {
            if (!teamCheck(name)) return
            new waitingHint(dynamicHint, `querying current team ranking of all team`, printTeamRankingTime)
          }
        }
        if (mountedOption.isSuccess) {
          optionEntry[mountedOption.value]()
        } else {
          log.warn("a valid option is required, see 'csgo team -h'")
        }
      }
    },
    {
      name: 'match',
      alias: 'm',
      description: 'query the time table of upcoming matches',
      option: [],
      handler: () => {
        new waitingHint(dynamicHint, 'querying the time table of upcoming matches', printUpcomingMatchesTime)
      }
    },
    {
      name: 'player',
      alias: 'p',
      description: 'query player info',
      option: [],
      handler: name => {
        if (!playerCheck(name)) return
        new waitingHint(dynamicHint, `querying info of ${name}`, printPlayerTime.bind(null, name))
      }
    }
  ]
}
