import HLTV from 'hltv'
import * as Table from 'cli-table2'

import { TEAM, PLAYER } from './constant'

// TODO: adjust API according to schema

const handleError = err => console.log(`${err.name} ${err.errno}`)

const getTeam = (name: string) => HLTV.getTeam({ id: TEAM[name] })

const getTeamStats = (name: string) => HLTV.getTeamStats({ id: TEAM[name] })

export const getTeamMatch = (name: string) => getTeam(name).then(res => {
  const table = new Table({
    head: ['opponent', 'result', 'event']
  })
  res.recentResults.forEach(m => {
    table.push(
      [m.enemyTeam.name, m.result, m.event.name]
    )
  })
  console.log(table.toString())
}, handleError)

export const getTeamOverview = (name: string) => {
  getTeamStats(name).then(res => {
    const o_table = new Table()
    const p_table = new Table({
      head: ['currentPlayers', 'historicPlayers', 'standinPlayers']
    })
    const { currentLineup, historicPlayers, standins } = res
    const length = Math.max(currentLineup.length, historicPlayers.length, standins.length)
    Array.from({ length })
    const keys = Object.keys(res.overview)
    keys.forEach(k => {
      let item = {}
      item[k] = res.overview[k]
      o_table.push(item)
    })
    console.log(o_table.toString())
  }, handleError)
}

export const getTeamRanking = (name: string) => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const day = today.getDate()
  HLTV.getTeamRanking({ year: `${year}`, month: `${month}`, day: `${day}` }).then(console.log, handleError)
}

export const getMatches = () => HLTV.getMatches().then(console.log, handleError)

export const getPlayer = (name: string) => HLTV.getPlayer({ id: PLAYER[name] }).then(console.log, handleError)