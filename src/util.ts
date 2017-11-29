import chalk from 'chalk'
import { TEAM, PLAYER } from './constant'

export const log = {
  default: console.log,
  hint: v => console.log(chalk.greenBright(v)),
  warn: v => console.log(chalk.yellowBright(v)),
  error: v => console.log(chalk.redBright(v))
}

export const paramCheck = name => {
  if (!name) {
    log.warn('team or player name is required')
    return false
  }
  return true
}

export const teamCheck = name => {
  if (!paramCheck(name)) return false
  if (name in TEAM) {
    return true
  } else {
    log.warn('there is no such a team')
  }
}
export const playerCheck = name => {
  if (!paramCheck(name)) return false
  if (name in PLAYER) {
    return true
  } else {
    log.warn('there is no such a player')
  }
}


