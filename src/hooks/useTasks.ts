'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { taskService } from '@/services/taskService'
import { CreateTaskInput, FilterPeriod, Task, UpdateTaskInput } from '@/types'
import { isAfter, startOfDay, startOfMonth, startOfWeek, subDays } from 'date-fns'

export const TASKS_KEY = ['tasks']

function filterByPeriod(tasks: Task[], period: FilterPeriod): Task[] {
  const now = new Date()
  let from: Date

  if (period === 'day') from = startOfDay(now)
  else if (period === 'week') from = startOfWeek(now, { weekStartsOn: 1 })
  else from = startOfMonth(now)

  return tasks.filter((t) => isAfter(new Date(t.createdAt), subDays(from, 1)))
}

export function useTasks(period: FilterPeriod = 'day', category?: string) {
  return useQuery({
    queryKey: [...TASKS_KEY, period, category],
    queryFn: async () => {
      const all = await taskService.list()
      let filtered = filterByPeriod(all, period)
      if (category) filtered = filtered.filter((t) => t.category === category)
      return filtered
    },
    staleTime: 1000 * 30,
  })
}

export function useCreateTask() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateTaskInput) => taskService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  })
}

export function useUpdateTask() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskInput }) =>
      taskService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  })
}

export function useDeleteTask() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => taskService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  })
}

export function useToggleTask() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      taskService.update(id, { completed }),
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  })
}
