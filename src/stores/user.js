import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getUsers, getLeaders } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const users = ref([])
  const leaders = ref([])

  const fetchUsers = async () => {
    if (users.value.length > 0) return
    const { data } = await getUsers()
    users.value = data.data
  }

  const fetchLeaders = async () => {
    if (leaders.value.length > 0) return
    const { data } = await getLeaders()
    leaders.value = data.data
  }

  Promise.all([fetchUsers(), fetchLeaders()])

  return { users, leaders }
})
