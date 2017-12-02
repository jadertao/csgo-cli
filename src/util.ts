import chalk from 'chalk'
import * as Progress from 'progress'
import { TEAM, PLAYER } from './constant'


export const log = {
  default: console.log,
  hint: v => console.log(chalk.greenBright(v)),
  warn: v => console.log(chalk.yellowBright(v)),
  error: v => console.log(chalk.redBright(v))
}

export const teamCheck = (name?: string) => {
  if (!name) {
    log.warn('team name is required')
    return false
  }
  if (name in TEAM) {
    return true
  } else {
    log.warn('there is no such a team')
    return false
  }
}
export const playerCheck = (name?: string) => {
  if (!name) {
    log.warn('player name is required')
    return false
  }
  if (name in PLAYER) {
    return true
  } else {
    log.warn('there is no such a player')
    return false
  }
}

export class dynamicHint {
  private timer
  private hint
  public bar
  constructor(hint) {
    this.hint = hint
    this.bar = new Progress(':title:bar', {
      complete: '.',
      incomplete: ' ',
      total: 6
    })
    this.terminate = () => {
      clearTimeout(this.timer)
      this.bar.terminate()
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

export class waitingHint {
  private dynamicHint
  private hint
  private fn
  constructor(dynamicHint, hint: string, fn) {
    this.dynamicHint = new dynamicHint(hint)
    this.fn = fn
    this.trigger()
  }
  public trigger = async () => {
    this.dynamicHint.forward()
    await this.fn()
    this.dynamicHint.terminate()
  }
}

export const printTimeWrap = fn => async (name?: any) => {
  const startTime = (new Date()).getTime()
  await fn(name)
  const endTime = (new Date()).getTime()
  const duringSecond = (endTime - startTime) / 1000
  log.hint(`takes ${duringSecond} second`)
}


export const pickOption = (config: string[], object) => {
  const res = {
    isSuccess: false,
    value: ''
  }
  const filter = config.filter(v => object[v])
  if (filter.length === 1) {
    res.isSuccess = true
    res.value = filter.join('')
  }
  return res
}
