import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getDemandTypes,
  getDemand,
  createDemand,
  updateDemand,
  updateDemandStatus,
  createDemandComment
} from '@/api/demand'

export const useDemandStore = defineStore('demand', () => {
  const demandTypes = ref([])

  const demand = ref(null)

  const showDemand = async (id) => {
    const { data } = await getDemand(id)
    demand.value = data
  }

  const fetchDemandTypes = async () => {
    if (demandTypes.value.length > 0) return
    const { data } = await getDemandTypes()
    demandTypes.value = data
  }

  const resetDemand = () => {
    demand.value = null
  }

  const fetchDemandCreate = async (id, formData) => {
    const { data } = await createDemand(id, formData)
    return (demand.value = data)
  }

  const fetchDemandUpdate = async (id, formData) => {
    const { data } = await updateDemand(id, formData)
    return (demand.value = data)
  }

  const fetchDemandStatusUpdate = async (id, status) => {
    const { data } = await updateDemandStatus(id, status)
    return (demand.value.status = data.status)
  }

  const fetchDemandCommentCreate = async (id, comment) => {
    const { data } = await createDemandComment(id, comment)
    return (demand.value.comments = data)
  }

  fetchDemandTypes()

  return {
    demandTypes,
    demand,
    showDemand,
    resetDemand,
    fetchDemandCreate,
    fetchDemandUpdate,
    fetchDemandStatusUpdate,
    fetchDemandCommentCreate
  }
})
