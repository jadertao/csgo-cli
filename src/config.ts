import {
  printPlayerTime,
  printTeamMatchesTime,
  printTeamOverviewTime,
  printTeamPlayersTime,
  printTeamRankingTime,
  printUpcomingMatchesTime,
} from './query'
import { DynamicHint, log, pickOption, playerCheck, teamCheck, WaitingHint } from './util'

interface ICommand {
  name: string,
  alias: string,
  description: string,
  option: string[][],
  handler: any
}

interface IConfig {
  version: string,
  command: ICommand[]
}

export const config: IConfig = {
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
      handler: (name: string, options: any) => {
        if (name) { name = name.toLowerCase() }
        const optionList = ['match', 'overview', 'player', 'ranking']
        const mountedOption = pickOption(optionList, options)
        const optionEntry = {
          match: (teamName) => {
            if (!teamCheck(name)) { return false }
            const worker = new WaitingHint(
              DynamicHint,
              `querying recent matches of team ${teamName}`,
              printTeamMatchesTime.bind(null, teamName))
            worker.trigger()
          },
          overview: (teamName) => {
            if (!teamCheck(teamName)) { return false }
            const worker = new WaitingHint(
              DynamicHint,
              `querying team overview of team ${teamName}`,
              printTeamOverviewTime.bind(null, teamName))
            worker.trigger()
          },
          player: (teamName) => {
            if (!teamCheck(teamName)) { return false }
            const worker = new WaitingHint(
              DynamicHint,
              `querying players of team ${teamName}`,
              printTeamPlayersTime.bind(null, teamName))
            worker.trigger()
          },
          ranking: () => {
            const workder = new WaitingHint(
              DynamicHint,
              `querying current team ranking of all team`,
              printTeamRankingTime)
            workder.trigger()
          },
        }
        if (mountedOption.isSuccess) {
          optionEntry[mountedOption.value](name)
        } else {
          log.warn("a valid option is required, see 'csgo team -h'")
        }
      },
    },
    {
      name: 'match',
      alias: 'm',
      description: 'query the time table of upcoming matches',
      option: [],
      handler: () => {
        const worker = new WaitingHint(
          DynamicHint,
          'querying the time table of upcoming matches',
          printUpcomingMatchesTime)
        worker.trigger()
      },
    },
    {
      name: 'player',
      alias: 'p',
      description: 'query player info',
      option: [],
      handler: (playerName) => {
        if (!playerCheck(playerName)) { return false }
        const worker = new WaitingHint(
          DynamicHint,
          `querying info of ${name}`,
          printPlayerTime.bind(null, name))
        worker.trigger()
      },
    },
  ],
}
