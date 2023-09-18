import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getRedirectUri,
  login as loginRequest,
  logout as logoutRequest,
  getUserInfo
} from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const authToken = ref('')

  const user = ref(null)

  const redirect_uri = window.location.origin + '/login'

  const redirectUri = async () => {
    const { data } = await getRedirectUri({ redirect_uri })
    localStorage.setItem('code_verifier', data.code_verifier)
    return data
  }

  const login = async (code) => {
    const code_verifier = localStorage.getItem('code_verifier')
    const { data } = await loginRequest({ code, code_verifier, redirect_uri })
    if (data) {
      await setTokenAndUser(data.access_token)
    }
  }

  const setTokenAndUser = async (token) => {
    authToken.value = token
    localStorage.setItem('auth_token', token)
    await getUser()
    localStorage.removeItem('code_verifier', token)
  }

  const logout = async () => {
    await logoutRequest({ redirect_uri })
    resetAuth()
  }

  const initUser = async () => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      authToken.value = token
      if (!user.value) getUser()
    }
  }

  const getUser = async () => {
    const { data } = await getUserInfo()
    if (data) user.value = data
  }

  const resetAuth = () => {
    authToken.value = ''
    user.value = null
    localStorage.removeItem('auth_token')
  }

  initUser()

  return { authToken, user, redirectUri, login, logout, resetAuth }
})
