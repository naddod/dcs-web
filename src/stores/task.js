import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getTaskTypes,
  getTask,
  createTask,
  updateTask,
  updateTaskStatus,
  createTaskComment
} from '@/api/task'

export const useTaskStore = defineStore('task', () => {
  const taskTypes = ref([])

  const task = ref(null)

  const showTask = async (id) => {
    const { data } = await getTask(id)
    task.value = data
  }

  const fetchTaskTypes = async () => {
    if (taskTypes.value.length > 0) return
    const { data } = await getTaskTypes()
    taskTypes.value = data
  }

  const resetTask = () => {
    task.value = null
  }

  const fetchTaskCreate = async (id, formData) => {
    const { data } = await createTask(id, formData)
    return (task.value = data)
  }

  const fetchTaskUpdate = async (id, formData) => {
    const { data } = await updateTask(id, formData)
    return (task.value = data)
  }

  const fetchTaskStatusUpdate = async (id, status) => {
    const { data } = await updateTaskStatus(id, status)
    return (task.value.status = data.status)
  }

  const fetchTaskCommentCreate = async (id, comment) => {
    const { data } = await createTaskComment(id, comment)
    return (task.value.comments = data)
  }

  fetchTaskTypes()

  return {
    taskTypes,
    task,
    showTask,
    resetTask,
    fetchTaskCreate,
    fetchTaskUpdate,
    fetchTaskStatusUpdate,
    fetchTaskCommentCreate
  }
})
