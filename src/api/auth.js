import request from '@/utils/request'

export function getRedirectUri(params = {}) {
  return request({ url: '/auth/redirectUri', method: 'get', params })
}

export function login(data = {}) {
  return request({ url: '/auth/login', method: 'post', data })
}

export function logout(params = {}) {
  return request({ url: '/auth/logout', method: 'get', params })
}

export function getUserInfo() {
  return request({ url: '/auth/user', method: 'get' })
}
