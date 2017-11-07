#! /usr/bin/env node

import { getTeam } from './team'
import * as csgo from 'commander'

const status = {
  team: '',
  type: ''
}

const modifyType = (type: string) => status.type = type

const handler = (name: string) => {
  status.team = name
  console.log(`querying ${status.type} info of ${status.team}, please wait`)
  if (status.type === 'battle') getTeam(name)
}
csgo
  .version('0.1.0')
  .parse(process.argv)

csgo
  .command('team [name]')
  .alias('t')
  .description('查询队伍信息')
  .option('--content,-c <type>', 'specify query content', modifyType)
  .action(handler)



csgo.parse(process.argv)