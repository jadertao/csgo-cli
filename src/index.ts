#! /usr/bin/env node
import * as csgo from 'commander'

import { config } from './config'

// TODO: a chain function calling bug to be fixed

const mount = (cli, config) => {
  cli.version(config.version)

  config.command.forEach(cmd => {
    cli
      .command(cmd.name)
      .alias(cmd.alias)
      .description(cmd.description)

    cmd.option.forEach(o => {
      cli.option(o[0], o[1])
    })

    cli.action(cmd.handler)
  })
  return cli
}
mount(csgo, config).parse(process.argv)

