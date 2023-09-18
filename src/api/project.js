import request from '@/utils/request'

export function getProjectList(page = 1, type_id = '', status = '') {
  return request({ url: '/project', method: 'get', params: { page, type_id, status } })
}

export function getRecentProjects() {
  return request({ url: '/project/recent', method: 'get' })
}

export function createProject(formdata) {
  return request({
    url: '/project',
    method: 'post',
    data: formdata,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function getProject(id) {
  return request({ url: `/project/${id}`, method: 'get' })
}

export function getCreatedProjects() {
  return request({ url: '/project/created', method: 'get' })
}

export function getAssignedProjects() {
  return request({ url: '/project/assigned', method: 'get' })
}

export function updateProject(id, formdata) {
  return request({ url: `/project/${id}`, method: 'post', data: formdata })
}

export function updateProjectStatus(id, data = {}) {
  return request({ url: `/project/${id}/status`, method: 'post', data })
}

export function createProjectComment(id, data = {}) {
  return request({ url: `/project/${id}/comment`, method: 'post', data })
}

export function searchProject(params = {}) {
  return request({ url: '/project/search', method: 'get', params })
}

export function getProjectTypes() {
  return request({ url: '/project/types', method: 'get' })
}
