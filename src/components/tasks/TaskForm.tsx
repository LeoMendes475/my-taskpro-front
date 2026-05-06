'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskSchema, TaskFormData } from '@/lib/validations/schemas'
import { Task } from '@/types'
import { CATEGORIES } from '@/lib/utils'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Clock, Tag, Type } from 'lucide-react'

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void
  defaultValues?: Partial<Task>
  loading?: boolean
  submitLabel?: string
}

export function TaskForm({ onSubmit, defaultValues, loading, submitLabel = 'Salvar' }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: defaultValues?.title ?? '',
      category: defaultValues?.category ?? '',
      durationMinutes: defaultValues?.durationMinutes,
    },
  })

  useEffect(() => {
    if (defaultValues) {
      reset({
        title: defaultValues.title ?? '',
        category: defaultValues.category ?? '',
        durationMinutes: defaultValues.durationMinutes,
      })
    }
  }, [defaultValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Título"
        placeholder="O que precisa ser feito?"
        icon={<Type size={16} />}
        error={errors.title?.message}
        {...register('title')}
      />

      <Select
        label="Categoria"
        placeholder="Selecione uma categoria"
        icon={<Tag size={16} />}
        error={errors.category?.message}
        options={CATEGORIES.map((c) => ({ value: c, label: c }))}
        {...register('category')}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-text-secondary uppercase tracking-widest">
          Duração (minutos)
        </label>
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">
            <Clock size={16} />
          </div>
          <input
            type="number"
            min={1}
            max={1440}
            placeholder="ex: 90"
            className="w-full bg-bg-card border border-border rounded-xl px-4 py-3 pl-10 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-green focus:ring-1 focus:ring-accent-green/20 transition-all duration-200"
            {...register('durationMinutes', { valueAsNumber: true })}
          />
        </div>
        {errors.durationMinutes && (
          <p className="text-xs text-rose-400">⚠ {errors.durationMinutes.message}</p>
        )}
      </div>

      <Button type="submit" loading={loading} className="mt-2 w-full" size="lg">
        {submitLabel}
      </Button>
    </form>
  )
}
