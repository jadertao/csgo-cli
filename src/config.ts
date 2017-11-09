import store, { action } from './store'

const modifyContent = (payload: string) => ({ type: 'content', payload })

export const config = {
  version: '0.1.0',
  command: [
    {
      name: 'team [name]',
      alias: 't',
      description: '查询队伍信息',
      option: ['--content,-c <type>', 'specify query content', modifyContent]
    }
  ]
}