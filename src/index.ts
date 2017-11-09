#! /usr/bin/env node

import { classify } from './query'
import * as csgo from 'commander'



// const handler = (name: string) => {
//   status.team = name
//   console.log(`querying ${status.type} info of ${status.team}, please wait`)
//   classify(status.type)(name)
// }


// csgo
//   .version('0.1.0')

// csgo
//   .command('team [name]')
//   .alias('t')
//   .description('查询队伍信息')
//   .option('--content,-c <type>', 'specify query content', modifyType)
//   .action(handler)

const mount = (cli, config) => {
  cli.version(config.version)

  config.command.forEach(cmd => {
    cli
      .command(cmd.name)
      .alias(cmd.alias)
      .description(cmd.description)
      .option(...cmd.option)
    // TODO: add handler
  })
}

csgo.parse(process.argv)