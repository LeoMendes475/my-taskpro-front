import { api } from '@/lib/api/client'
import { Task, CreateTaskInput, UpdateTaskInput } from '@/types'

export const taskService = {
  async list(): Promise<Task[]> {
    const res = await api.get<Task[]>('/tasks')
    return res.data
  },

  async create(data: CreateTaskInput): Promise<Task> {
    const res = await api.post<Task>('/tasks', data)
    return res.data
  },

  async update(id: string, data: UpdateTaskInput): Promise<Task> {
    const res = await api.put<Task>(`/tasks/${id}`, data)
    return res.data
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`)
  },
}
