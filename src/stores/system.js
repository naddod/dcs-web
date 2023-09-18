import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getSystems } from '@/api/system'

export const useSystemStore = defineStore('system', () => {
  const systems = ref([])

  const fetchSystems = async () => {
    if (systems.value.length > 0) return
    const { data } = await getSystems()
    systems.value = data.data
  }

  fetchSystems()

  return { systems }
})
