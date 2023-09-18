import request from '@/utils/request'

export function getSystems() {
  return request({ url: '/system', method: 'get' })
}
