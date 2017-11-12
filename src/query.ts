import { HLTV } from 'hltv'
import { TEAM } from './constant'

// TODO: adjust API according to schema

const handleError = err => console.log(`${err.name} ${err.errno}`)

const getTeam = (name: string) => HLTV.getTeam({ id: TEAM[name] })

const getTeamStats = (name: string) => HLTV.getTeamStats({ id: TEAM[name] })

export const getTeamMatch = (name: string) => getTeam(name).then(res => console.log(res.recentResults), handleError)

export const getTeamOverview = (name: string) => getTeamStats(name).then(res => console.log(res.overview), handleError)

export const getTeamRanking = (name: string) => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const day = today.getDate()
  HLTV.getTeamRanking({ year: `${year}`, month: `${month}`, day: `${day}` }).then(console.log, handleError)
}
