'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginFormData } from '@/lib/validations/schemas'
import { useLogin } from '@/hooks/useAuth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, Mail, Lock } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { AxiosError } from 'axios'

function LoginForm() {
  const searchParams = useSearchParams()
  const registered = searchParams.get('registered')
  const login = useLogin()

  const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginFormData) {
    login.mutate(data, {
      onError: (err) => {
        const axiosErr = err as AxiosError<{ message: string }>
        setError('root', { message: axiosErr.response?.data?.message ?? 'Erro ao fazer login' })
      },
    })
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm flex flex-col gap-8 animate-slide-up">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-accent-green flex items-center justify-center">
              <CheckCircle2 size={18} className="text-bg-primary" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg">MyTask Pro</span>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
            <p className="text-text-secondary text-sm mt-1">Entre na sua conta para continuar</p>
          </div>
        </div>

        {/* Success message */}
        {registered && (
          <div className="bg-accent-green/10 border border-accent-green/30 rounded-xl px-4 py-3 text-accent-green text-sm text-center">
            ✓ Conta criada! Faça login para continuar.
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            icon={<Mail size={16} />}
            error={errors.email?.message}
            autoComplete="email"
            {...register('email')}
          />
          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            icon={<Lock size={16} />}
            error={errors.password?.message}
            autoComplete="current-password"
            {...register('password')}
          />

          {errors.root && (
            <p className="text-sm text-rose-400 text-center bg-rose-500/10 border border-rose-500/20 rounded-xl py-2.5 px-4">
              {errors.root.message}
            </p>
          )}

          <Button type="submit" loading={login.isPending} size="lg" className="mt-1 w-full">
            Entrar
          </Button>
        </form>

        <p className="text-center text-sm text-text-muted">
          Não tem conta?{' '}
          <Link href="/auth/register" className="text-accent-green hover:underline font-medium">
            Criar conta
          </Link>
        </p>
      </div>
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
