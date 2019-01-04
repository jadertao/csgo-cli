import {
  printPlayerTime,
  printTeamMatchesTime,
  printTeamOverviewTime,
  printTeamPlayersTime,
  printTeamRankingTime,
  printUpcomingMatchesTime,
} from './query'
import { log, pickOption, playerCheck, teamCheck, WaitingHint } from './util'
import * as pkg from '../package-lock.json'

interface ICommand {
  name: string;
  alias: string;
  description: string;
  option: string[][];
  handler: any;
}

interface IConfig {
  version: string;
  command: ICommand[];
}

export const config: IConfig = {
  version: pkg.version,
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
          match: (teamName: string) => {
            if (!teamCheck(name)) { return false }
            const worker = new WaitingHint(
              `querying recent matches of team ${teamName}`,
              printTeamMatchesTime.bind(null, teamName))
            worker.trigger()
          },
          overview: (teamName: string) => {
            if (!teamCheck(teamName)) { return false }
            const worker = new WaitingHint(
              `querying team overview of team ${teamName}`,
              printTeamOverviewTime.bind(null, teamName))
            worker.trigger()
          },
          player: (teamName: string) => {
            if (!teamCheck(teamName)) { return false }
            const worker = new WaitingHint(
              `querying players of team ${teamName}`,
              printTeamPlayersTime.bind(null, teamName))
            worker.trigger()
          },
          ranking: () => {
            const workder = new WaitingHint(
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
      handler: (playerName: string) => {
        if (!playerCheck(playerName)) { return false }
        const worker = new WaitingHint(
          `querying info of ${playerName}`,
          printPlayerTime.bind(null, playerName))
        worker.trigger()
      },
    },
  ],
}
