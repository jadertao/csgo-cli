import { HLTV } from 'hltv'
import { TEAM } from './constant'


const handleError = err => console.log(`${err.name} ${err.errno}`)

export const getTeamMatch = (name: string) => HLTV.getTeam({ id: TEAM[name] }).then(res => console.log(res.recentResults), handleError)

export const getTeamStats = (name: string) => HLTV.getTeamStats({ id: TEAM[name] }).then(console.log, handleError)

const classifyMap = {
  match: getTeamMatch,
  stats: getTeamStats
}

export const classify = (type: string) => classifyMap[type]