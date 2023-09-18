import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getTeams } from '@/api/team'

export const useTeamStore = defineStore('team', () => {
  const teams = ref([])

  const fetchTeams = async () => {
    if (teams.value.length > 0) return
    const { data } = await getTeams()
    teams.value = data.data
  }

  fetchTeams()

  return { teams }
})
