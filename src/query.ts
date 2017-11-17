import HLTV from 'hltv'
import * as Table from 'cli-table2'

import { TEAM, PLAYER, MONTH } from './constant'

// TODO: adjust API according to schema

const handleError = err => console.log(`${err.name} ${err.errno}`)

const getTeam = (name: string) => HLTV.getTeam({ id: TEAM[name] })

const getTeamStats = (name: string) => HLTV.getTeamStats({ id: TEAM[name] })

export const getTeamMatch = (name: string) => getTeam(name).then(res => {
  const table = new Table({
    head: ['opponent', 'result', 'event']
  })
  res.recentResults.forEach(m => {
    table.push([m.enemyTeam.name, m.result, m.event.name])
  })
  console.log(table.toString())
}, handleError)

export const getTeamOverview = (name: string) => {
  getTeamStats(name).then(res => {
    const o_table = new Table({
      head:['key','value']
    })
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

    const keys = Object.keys(res.overview)
    keys.forEach(k => {
      let item = {}
      item[k] = res.overview[k]
      o_table.push(item)
    })

    console.log(o_table.toString())
    console.log(p_table.toString())
  }, handleError)
}

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

export const getMatches = () => HLTV.getMatches().then(console.log, handleError)

export const getPlayer = (name: string) => HLTV.getPlayer({ id: PLAYER[name] }).then(console.log, handleError)