import axios from 'axios'
import Cookies from 'js-cookie'

const TOKEN_KEY = 'mytask_token'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333',
  headers: { 'Content-Type': 'application/json' },
})

// Inject token on every request
api.interceptors.request.use((config) => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 globally — redirect to login
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      Cookies.remove(TOKEN_KEY)
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

export const setToken = (token: string) =>
  Cookies.set(TOKEN_KEY, token, { expires: 1, sameSite: 'strict' })

export const removeToken = () => Cookies.remove(TOKEN_KEY)

export const getToken = () => Cookies.get(TOKEN_KEY)
