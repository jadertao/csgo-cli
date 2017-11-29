import { TEAM, PLAYER } from './constant'


export const paramCheck = name => {
  if (!name) {
    console.log('team or player name is required')
    return false
  }
  return true
}

export const teamCheck = name => {
  if (!paramCheck(name)) return false
  if (name in TEAM) {
    return true
  } else {
    console.log('there is no such a team')
  }
}
export const playerCheck = name => {
  if (!paramCheck(name)) return false
  if (name in TEAM) {
    return true
  } else {
    console.log('there is no such a player')
  }
}