import { printTeamMatches, printTeamOverview, printTeamRanking, printUpcomingMatches, printPlayer, printTeamPlayers } from './query'
import { teamCheck, playerCheck } from './util'

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
          console.log(`querying recent matches of team ${name}...`)
          printTeamMatches(name)
          return
        }
        if (!options.match && options.overview && !options.player && !options.ranking) {
          if (!teamCheck(name)) return
          console.log(`querying team overview of team ${name}...`)
          printTeamOverview(name)
          return
        }
        if (!options.match && !options.overview && options.player && !options.ranking) {
          if (!teamCheck(name)) return
          console.log(`querying players of team ${name}...`)
          printTeamPlayers(name)
          return
        }
        if (!options.match && !options.overview && options.ranking) {
          console.log(`querying current team ranking of all team...`)
          printTeamRanking()
          return
        }
        console.log("a valid option is required, see 'csgo team -h'")
      }
    },
    {
      name: 'match',
      alias: 'm',
      description: 'query the time table of upcoming matches',
      option: [],
      handler: () => {
        console.log('querying the time table of upcoming matches...')
        printUpcomingMatches()
      }
    },
    {
      name: 'player',
      alias: 'p',
      description: 'query player info',
      option: [],
      handler: (name) => {
        if (!playerCheck(name)) return
        console.log(`querying info of ${name}...`)
        printPlayer(name)
      }
    }
  ]
}
