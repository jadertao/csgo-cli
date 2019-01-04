import chalk from 'chalk'
import * as Progress from 'progress'
import { PLAYER, TEAM } from './constant'

export const log = {
  default: console.log,
  hint: (v: any) => console.log(chalk.greenBright(v)),
  warn: (v: any) => console.log(chalk.yellowBright(v)),
  error: (v: any) => console.log(chalk.redBright(v)),
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

export class DynamicHint {
  public bar: Progress
  public terminate: () => void

  private timer: NodeJS.Timer
  private hint: string

  constructor(hint: string) {
    this.hint = hint
    this.bar = new Progress(':title:bar', {
      complete: '.',
      incomplete: ' ',
      total: 6,
    })
    this.terminate = () => {
      clearTimeout(this.timer)
      this.bar.terminate()
    }
  }

  public forward = () => {
    this.bar.tick(1, { title: this.hint })
    if (this.bar.curr > 4) {
      this.timer = setTimeout(this.backward, 700)
    } else {
      this.timer = setTimeout(this.forward, 700)
    }
  }

  public backward = () => {
    this.bar.tick(-1, { title: this.hint })
    if (this.bar.curr === 0) {
      this.timer = setTimeout(this.forward, 700)
    } else {
      this.timer = setTimeout(this.backward, 700)
    }
  }
}

export class WaitingHint {

  private dynamicHint: DynamicHint
  constructor(hint: string, private fn: () => void, dynamicHint: typeof DynamicHint = DynamicHint) {
    this.dynamicHint = new dynamicHint(hint)
    this.fn = fn
  }
  public trigger = async () => {
    this.dynamicHint.forward()
    await this.fn()
    this.dynamicHint.terminate()
  }
}

/**
 * print the executing time of the function
 * @param fn
 */
export const printTimeWrap = (fn: (...args: any) => void) => async (name?: any) => {
  const startTime = (new Date()).getTime()
  await fn(name)
  const endTime = (new Date()).getTime()
  const duringSecond = (endTime - startTime) / 1000
  log.hint(`takes ${duringSecond} second`)
}

export const pickOption = (config: string[], object: any) => {
  const res = {
    isSuccess: false,
    value: '',
  }
  const filter = config.filter((v) => object[v])
  if (filter.length === 1) {
    res.isSuccess = true
    res.value = filter.join('')
  }
  return res
}
