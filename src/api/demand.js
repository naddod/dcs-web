import request from '@/utils/request'

export function getDemandList(page = 1, type_id = '', status = '') {
  return request({ url: '/demand', method: 'get', params: { page, type_id, status } })
}

export function getRecentDemands() {
  return request({ url: '/demand/recent', method: 'get' })
}

export function createDemand(formdata) {
  return request({
    url: '/demand',
    method: 'post',
    data: formdata,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function getDemand(id) {
  return request({ url: `/demand/${id}`, method: 'get' })
}

export function getMyDemands() {
  return request({ url: '/demand/my', method: 'get' })
}

export function updateDemand(id, formdata) {
  return request({ url: `/demand/${id}`, method: 'post', data: formdata })
}

export function updateDemandStatus(id, data = {}) {
  return request({ url: `/demand/${id}/status`, method: 'post', data })
}

export function createDemandComment(id, data = {}) {
  return request({ url: `/demand/${id}/comment`, method: 'post', data })
}

export function searchDemand(params = {}) {
  return request({ url: '/demand/search', method: 'get', params })
}

export function getDemandTypes() {
  return request({ url: '/demand/types', method: 'get' })
}

export function getDemandStatistics() {
  return request({ url: '/demand/statistics', method: 'get' })
}

export function getDemandUserStatistics(params = {}) {
  return request({ url: '/demand/userStatistics', method: 'get', params })
}
