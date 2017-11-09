const store = {
  state: {
    team: '',
    player: '',
    content: ''
  },
  dispatch(action: action) {
    this.state[action.type] = action.payload
  },
  getState(type: string) {
    return this.state[type]
  }
}

export default store

export interface action {
  type: string,
  payload: string
}