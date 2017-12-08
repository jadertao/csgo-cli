#! /usr/bin/env node
import * as csgo from 'commander'
import { config } from './config'

const mount = (cli, cliConfig) => {
  cli.version(cliConfig.version)

  cliConfig.command.forEach((cmd) => {
    // CARE: the return value of cli#command is wired, so take it out
    const cliT = cli.command(cmd.name)

    cliT.alias(cmd.alias).description(cmd.description)

    if (cmd.option.length) { cmd.option.forEach((o) => cliT.option(o[0], o[1])) }

    cliT.action(cmd.handler)
  })
}

mount(csgo, config)
csgo.parse(process.argv)
