import chalk from 'chalk'
import * as Progress from 'progress'
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

export class waitingHint {
  private timer
  private hint
  public bar
  constructor(hint) {
    this.hint = hint
    this.bar = new Progress(':title :bar', {
      complete: '.',
      incomplete: ' ',
      total: 6
    })
    this.terminate = () => {
      clearTimeout(this.timer)
      this.bar.terminate.call(this.bar)
    }
  }

  public forward = () => {
    this.bar.tick(1, { title: this.hint })
    if (this.bar.curr > 4) {
      this.backward()
    } else {
      this.timer = setTimeout(this.forward, 500)
    }
  }

  public backward = () => {
    this.bar.tick(-1, { title: this.hint })
    if (this.bar.curr === 0) {
      this.forward()
    } else {
      this.timer = setTimeout(this.backward, 500)
    }
  }

  public terminate
}


