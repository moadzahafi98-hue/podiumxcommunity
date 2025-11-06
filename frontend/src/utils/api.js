import axios from 'axios'
import store from '../store'

const apiClient = axios.create({
  baseURL: '/api'
})

apiClient.interceptors.request.use((config) => {
  const state = store.getState()
  const token = state.auth.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authApi = axios.create({
  baseURL: '/api/auth'
})

authApi.interceptors.request.use((config) => {
  const state = store.getState()
  const token = state.auth.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export { apiClient }
