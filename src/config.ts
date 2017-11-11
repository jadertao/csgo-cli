
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
        ['-m --match', 'query recent matches according to team'],
        ['-o --overview', 'query overview according to team'],
        ['-r --ranking', 'query current ranking according to team']
      ],
      handler: (name: string, options: any) => {
        console.log(name)
        if (options.match && !options.overview && !options.ranking) {
          console.log(`querying recent matches of ${name},pleaze wait`)
          getTeamMatch(name)
        }
        if (!options.match && options.overview && !options.ranking) {
          console.log(`querying team overview of ${name},pleaze wait`)
          getTeamOverview(name)
        }
        if (!options.match && !options.overview && options.ranking) {
          console.log(`querying current team ranking of ${name},pleaze wait`)
          getTeamRanking(name)
        }
      }
    }
  ]
}