import { getTeamMatch, getTeamOverview, getTeamRanking } from './query'

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
      description: '查询队伍信息,每次只能查询一种',
      option: [
        ['-m --match', 'query recent matches'],
        ['-o --overview', 'query overview'],
        ['-r --ranking', 'query current ranking']
      ],
      handler: (name: string, options: any) => {
        name = name.toLowerCase()
        if (options.match && !options.overview && !options.ranking) {
          console.log(`querying recent matches of team ${name}...`)
          getTeamMatch(name)
        }
        if (!options.match && options.overview && !options.ranking) {
          console.log(`querying team overview of team ${name}...`)
          getTeamOverview(name)
        }
        if (!options.match && !options.overview && options.ranking) {
          console.log(`querying current team ranking of team ${name}...`)
          getTeamRanking(name)
        }
      }
    }
  ]
}
