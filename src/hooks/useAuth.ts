'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/authService'
import { LoginFormData, RegisterFormData } from '@/lib/validations/schemas'

export const AUTH_KEY = ['auth', 'me']

export function useMe() {
  return useQuery({
    queryKey: AUTH_KEY,
    queryFn: authService.me,
    retry: false,
    staleTime: 1000 * 60 * 5,
  })
}

export function useLogin() {
  const router = useRouter()
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: LoginFormData) => authService.login(data),
    onSuccess: (res) => {
      qc.setQueryData(AUTH_KEY, res.user)
      router.push('/dashboard')
    },
  })
}

export function useRegister() {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: Omit<RegisterFormData, 'confirmPassword'>) =>
      authService.register(data),
    onSuccess: () => {
      router.push('/auth/login?registered=true')
    },
  })
}

export function useLogout() {
  const router = useRouter()
  const qc = useQueryClient()

  return () => {
    authService.logout()
    qc.clear()
    router.push('/auth/login')
  }
}
