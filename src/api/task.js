import request from '@/utils/request'

export function getTaskList(page = 1, type_id = '', status = '') {
  return request({ url: '/task', method: 'get', params: { page, type_id, status } })
}

export function getRecentTasks() {
  return request({ url: '/task/recent', method: 'get' })
}

export function createTask(formdata) {
  return request({
    url: '/task',
    method: 'post',
    data: formdata,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function getTask(id) {
  return request({ url: `/task/${id}`, method: 'get' })
}

export function getCreatedTasks() {
  return request({ url: '/task/created', method: 'get' })
}

export function getAssignedTasks() {
  return request({ url: '/task/assigned', method: 'get' })
}

export function updateTask(id, formdata) {
  return request({ url: `/task/${id}`, method: 'post', data: formdata })
}

export function updateTaskStatus(id, data = {}) {
  return request({ url: `/task/${id}/status`, method: 'post', data })
}

export function createTaskComment(id, data = {}) {
  return request({ url: `/task/${id}/comment`, method: 'post', data })
}

export function searchTask() {
  return request({ url: '/task/search', method: 'get' })
}

export function getTaskTypes() {
  return request({ url: '/task/types', method: 'get' })
}

export function getMyTasks(params = {}) {
  return request({ url: '/task/my', method: 'get', params })
}

export function getTaskStatistics() {
  return request({ url: '/task/statistics', method: 'get' })
}

export function getTaskUserStatistics(params = {}) {
  return request({ url: '/task/userStatistics', method: 'get', params })
}
