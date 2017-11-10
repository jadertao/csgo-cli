import { HLTV } from 'hltv'
import { TEAM } from './constant'

// TODO: adjust API according to schema

const handleError = err => console.log(`${err.name} ${err.errno}`)

const getTeam = (name: string) => HLTV.getTeam({ id: TEAM[name] })

export const getTeamMatch = (name: string) => getTeam(name).then(res => console.log(res.recentResults), handleError)

export const getTeamOverview = (name: string) => getTeam(name).then(res => console.log(res.overview), handleError)

export const getTeamRanking = (name: string) => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const day = today.getDate()
  HLTV.getTeamRanking({ year, month, day }).then(console.log, handleError)
}

export const getTeamStats = (name: string) => HLTV.getTeamStats({ id: TEAM[name] }).then(console.log, handleError)

const classifyMap = {
  match: getTeamMatch,
  stats: getTeamStats
}

export const classify = (type: string) => classifyMap[type]