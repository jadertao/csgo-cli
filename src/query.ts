import HLTV from 'hltv'
import * as Table from 'cli-table2'

import { TEAM, PLAYER, MONTH } from './constant'

// TODO: adjust API according to schema

/**
 * used as Promise reject handler
 * TODO: handle errors properly
 * @param err  error
 */
const handleError = err => console.log(`${err.name} ${err.errno}`)

/**
 * public part of some of the following query functions
 * @param name team name
 */
const getTeam = (name: string) => HLTV.getTeam({ id: TEAM[name] })

/**
 * public part of some of the following query functions
 * @param name team name
 */
const getTeamStats = (name: string) => HLTV.getTeamStats({ id: TEAM[name] })

/**
 * query recent match according to team name
 * log a table in console
 * @param name team name 
 */
export const getTeamMatch = (name: string) => getTeam(name).then(res => {
  const table = new Table({
    head: ['opponent', 'result', 'event']
  })
  res.recentResults.forEach(m => {
    table.push([m.enemyTeam.name, m.result, m.event.name])
  })
  console.log(table.toString())
}, handleError)

/**
 * query overview according to team name
 * log a table in console
 * @param name team name
 */
export const getTeamOverview = (name: string) => {
  getTeamStats(name).then(res => {
    const o_table = new Table({
      head: ['key', 'value']
    })
    const p_table = new Table({
      head: ['currentPlayers', 'historicPlayers', 'standinPlayers']
    })


    const keys = Object.keys(res.overview)
    keys.forEach(k => {
      let item = {}
      item[k] = res.overview[k]
      o_table.push(item)
    })

    console.log(o_table.toString())

  }, handleError)
}

export const getTeamPlayer = (name: string) => {
  getTeamStats(name).then(res => {
    const p_table = new Table({
      head: ['currentPlayers', 'historicPlayers', 'standinPlayers']
    })
    const { currentLineup, historicPlayers, standins } = res

    const length = Math.max(currentLineup.length, historicPlayers.length, standins.length)

    Array.from({ length }, (v, i) => i).forEach(n => {
      let row = []
      row[0] = currentLineup[n] ? currentLineup[n].name : ''
      row[1] = historicPlayers[n] ? historicPlayers[n].name : ''
      row[2] = standins[n] ? standins[n].name : ''
      p_table.push(row)
    })
    console.log(p_table.toString())
  }, handleError)
}

/**
 * query all team rankings for now
 * log a table in console
 * TODO: support query historic rankings
 */
export const getTeamRanking = () => {
  HLTV.getTeamRanking().then(res => {
    const table = new Table({
      head: ['ranking', 'name', 'points', 'change']
    })
    res.forEach(p => {
      let row = [p.place, p.team.name, p.points, p.change]
      table.push(row)
    })
    console.log(table.toString())
  }, handleError)
}

/**
 * query all upcoming matches
 * log a table in console
 */
export const getMatches = () => HLTV.getMatches().then(res => {
  const table = new Table({
    head: ['stars', 'date', 'team-A', 'team-B', 'format', 'event']
  })
  res.forEach(m => {
    const container = '★ ★ ★ ★ ★ ★ ★ ★ ★ ★'
    let star_num: number = m.stars
    let stars: string = container.slice(0, 2 * star_num)

    let date: string = '-'
    if ('date' in m) {
      date = m['date']
      const _date: Date = new Date(date)
      date = _date.toLocaleString()
    }

    let team1: string = ''
    let team2: string = ''
    if (m.team1) team1 = m.team1.name
    if (m.team2) team2 = m.team2.name

    let event: string = ''
    if (m.event) event = m.event.name

    table.push([stars, date, team1, team2, m.format, event])
  })
  console.log(table.toString())
}, handleError)

/**
 * //TODO: tablify it
 * @param name player name
 */
export const getPlayer = (name: string) => HLTV.getPlayer({ id: PLAYER[name] }).then(console.log, handleError)