'use client'

import Link from 'next/link'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, RegisterFormData } from '@/lib/validations/schemas'
import { useRegister } from '@/hooks/useAuth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { PasswordStrength } from '@/components/ui/PasswordStrength'
import { CheckCircle2, Mail, Lock, User } from 'lucide-react'
import { AxiosError } from 'axios'

export default function RegisterPage() {
  const register_ = useRegister()

  const { register, handleSubmit, setError, control, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  })

  const passwordValue = useWatch({ control, name: 'password', defaultValue: '' })

  async function onSubmit({ confirmPassword: _, ...data }: RegisterFormData) {
    register_.mutate(data, {
      onError: (err) => {
        const axiosErr = err as AxiosError<{ message: string }>
        setError('root', { message: axiosErr.response?.data?.message ?? 'Erro ao criar conta' })
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
            <h1 className="text-2xl font-bold">Crie sua conta</h1>
            <p className="text-text-secondary text-sm mt-1">Comece a organizar suas tarefas hoje</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Nome"
            type="text"
            placeholder="João Silva"
            icon={<User size={16} />}
            error={errors.name?.message}
            autoComplete="name"
            {...register('name')}
          />
          <Input
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            icon={<Mail size={16} />}
            error={errors.email?.message}
            autoComplete="email"
            {...register('email')}
          />

          {/* Password with strength indicator */}
          <div className="flex flex-col gap-3">
            <Input
              label="Senha"
              type="password"
              placeholder="Mínimo 8 caracteres"
              icon={<Lock size={16} />}
              error={errors.password?.message}
              autoComplete="new-password"
              {...register('password')}
            />
            <PasswordStrength password={passwordValue} />
          </div>

          <Input
            label="Confirmar senha"
            type="password"
            placeholder="Repita a senha"
            icon={<Lock size={16} />}
            error={errors.confirmPassword?.message}
            autoComplete="new-password"
            {...register('confirmPassword')}
          />

          {errors.root && (
            <p className="text-sm text-rose-400 text-center bg-rose-500/10 border border-rose-500/20 rounded-xl py-2.5 px-4">
              {errors.root.message}
            </p>
          )}

          <Button type="submit" loading={register_.isPending} size="lg" className="mt-1 w-full">
            Criar conta
          </Button>
        </form>

        <p className="text-center text-sm text-text-muted">
          Já tem uma conta?{' '}
          <Link href="/auth/login" className="text-accent-green hover:underline font-medium">
            Fazer login
          </Link>
        </p>
      </div>
    </main>
  )
}
