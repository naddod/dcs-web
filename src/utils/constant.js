const demandStatus = [
  // { value: 'total', label: '全部', tag: 'info' },
  { value: 'pending', label: '待处理', tag: 'warning' },
  { value: 'rejected', label: '已拒绝', tag: 'error' },
  { value: 'processing', label: '处理中', tag: 'info' },
  { value: 'solved', label: '已完成', tag: 'success' },
  { value: 'closed', label: '已关闭', tag: 'default' }
]

const demandUrgency = [
  { value: 'normal', label: '正常', tag: 'info' },
  { value: 'urgent', label: '紧急', tag: 'warning' },
  { value: 'very_urgent', label: '十分紧急', tag: 'error' }
]

const taskStatus = [
  { value: 'not_started', label: '未开始', tag: 'warning' },
  { value: 'in_progress', label: '处理中', tag: 'info' },
  { value: 'submitted', label: '已提交', tag: 'success' },
  { value: 'closed', label: '已关闭', tag: 'error' },
  { value: 'completed', label: '已完成', tag: 'success' }
]

const taskPriority = [
  { value: 'normal', label: '正常', tag: 'info' },
  { value: 'urgent', label: '紧急', tag: 'warning' },
  { value: 'very_urgent', label: '十分紧急', tag: 'error' }
]

const projectStatus = [
  { value: 'in_progress', label: '处理中', tag: 'info' },
  { value: 'completed', label: '已完成', tag: 'success' },
  { value: 'closed', label: '已关闭', tag: 'error' }
]

export { demandStatus, demandUrgency, taskStatus, taskPriority, projectStatus }
