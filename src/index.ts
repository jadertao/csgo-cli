#! /usr/bin/env node
import * as csgo from 'commander'
import { config } from './config'


const mount = (cli, config) => {
  cli.version(config.version)

  config.command.forEach(cmd => {
    // CARE: the return value of cli#command is wired, so take it out
    let _cli = cli.command(cmd.name)

    _cli.alias(cmd.alias).description(cmd.description)

    if (cmd.option.length) {
      cmd.option.forEach(o => {
        _cli.option(o[0], o[1])
      })
    }

    _cli.action(cmd.handler)
  })
}

mount(csgo, config)
csgo.parse(process.argv)
