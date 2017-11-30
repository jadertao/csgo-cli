import { printTeamMatchesTime, printTeamOverviewTime, printTeamRankingTime, printUpcomingMatchesTime, printPlayerTime, printTeamPlayersTime } from './query'
import { teamCheck, playerCheck, log } from './util'

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
        if (options.match && !options.overview && !options.player && !options.ranking) {
          if (!teamCheck(name)) return
          log.hint(`querying recent matches of team ${name}...`)
          printTeamMatchesTime(name)
          return
        }
        if (!options.match && options.overview && !options.player && !options.ranking) {
          if (!teamCheck(name)) return
          log.hint(`querying team overview of team ${name}...`)
          printTeamOverviewTime(name)
          return
        }
        if (!options.match && !options.overview && options.player && !options.ranking) {
          if (!teamCheck(name)) return
          log.hint(`querying players of team ${name}...`)
          printTeamPlayersTime(name)
          return
        }
        if (!options.match && !options.overview && options.ranking) {
          log.hint(`querying current team ranking of all team...`)
          printTeamRankingTime()
          return
        }
        log.warn("a valid option is required, see 'csgo team -h'")
      }
    },
    {
      name: 'match',
      alias: 'm',
      description: 'query the time table of upcoming matches',
      option: [],
      handler: () => {
        log.hint('querying the time table of upcoming matches...')
        printUpcomingMatchesTime()
      }
    },
    {
      name: 'player',
      alias: 'p',
      description: 'query player info',
      option: [],
      handler: (name) => {
        if (!playerCheck(name)) return
        log.hint(`querying info of ${name}...`)
        printPlayerTime(name)
      }
    }
  ]
}
