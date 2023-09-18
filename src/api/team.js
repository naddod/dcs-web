import request from '@/utils/request'

export function getTeams() {
  return request({ url: '/team', method: 'get' })
}
