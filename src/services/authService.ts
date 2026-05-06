import { api, setToken, removeToken } from '@/lib/api/client'
import { AuthResponse, User } from '@/types'
import { LoginFormData, RegisterFormData } from '@/lib/validations/schemas'

export const authService = {
  async login(data: LoginFormData): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>('/auth/login', data)
    setToken(res.data.token)
    return res.data
  },

  async register(data: Omit<RegisterFormData, 'confirmPassword'>): Promise<{ user: User }> {
    const res = await api.post<{ user: User }>('/auth/register', data)
    return res.data
  },

  async me(): Promise<User> {
    const res = await api.get<{ user: User }>('/auth/me')
    return res.data.user
  },

  logout() {
    removeToken()
  },
}
