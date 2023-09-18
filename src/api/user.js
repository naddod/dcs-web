import request from '@/utils/request'

export function getUsers() {
  return request({ url: '/user', method: 'get' })
}

export function getLeaders() {
  return request({ url: '/user/leaders', method: 'get' })
}
