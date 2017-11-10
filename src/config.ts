
import { getTeamMatch, getTeamOverview, getTeamRanking } from './query'




export const config = {
  version: '0.1.0',
  command: [
    {
      name: 'team [name]',
      alias: 't',
      description: '查询队伍信息,每次只能查询一种',
      option: [
        ['--match -m', 'query recent matches according to team'],
        ['--overview -o', 'query overview according to team'],
        ['--ranking -r', 'query current ranking according to team']
      ],
      handler: (name: string, options: any) => {
        if (options.match && !options.overview && !options.ranking) getTeamMatch(name)
        if (!options.match && options.overview && !options.ranking) getTeamOverview(name)
        if (!options.match && !options.overview && options.ranking) getTeamRanking(name)
      }
    }
  ],
  handler: ''
}