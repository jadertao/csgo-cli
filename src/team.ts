import { HLTV } from 'hltv'
import { TEAM } from './constant'

export const getTeam = (name: string) => HLTV.getTeam({ id: TEAM[name] }).then(console.log, console.log)