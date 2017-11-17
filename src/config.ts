import { getTeamMatch, getTeamOverview, getTeamRanking, getMatches, getPlayer } from './query'


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
const paramCheck = name => {
  if (!name) {
    console.log('team name is required')
    return false
  }
  return true
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
        ['-r --ranking', 'query current ranking']
      ],
      handler: (name: string, options: any) => {
        if (name) name = name.toLowerCase()
        if (options.match && !options.overview && !options.ranking) {
          if (!paramCheck(name)) return
          console.log(`querying recent matches of team ${name}...`)
          getTeamMatch(name)
          return
        }
        if (!options.match && options.overview && !options.ranking) {
          if (!paramCheck(name)) return
          console.log(`querying team overview of team ${name}...`)
          getTeamOverview(name)
          return
        }
        if (!options.match && !options.overview && options.ranking) {
          console.log(`querying current team ranking of all team...`)
          getTeamRanking()
          return
        }
        console.log("a valid option is required, see 'csgo team -h'")
      }
    },
    {
      name: 'match',
      alias: 'm',
      description: 'query matches schedule',
      option: [],
      handler: getMatches
    },
    {
      name: 'player',
      alias: 'p',
      description: 'query player info',
      option: [],
      handler: getPlayer
    }
  ]
}
