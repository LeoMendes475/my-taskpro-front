// ── Auth ──────────────────────────────────────────────────────────────────────

export interface User {
  id: string
  name: string
  email: string
}

export interface AuthResponse {
  token: string
  user: User
}

// ── Task ──────────────────────────────────────────────────────────────────────

export type TaskCategory =
  | 'Trabalho'
  | 'Pessoal'
  | 'Estudos'
  | 'Saúde'
  | 'Finanças'
  | 'Outro'

export interface Task {
  id: string
  title: string
  category: TaskCategory | string
  completed: boolean
  durationMinutes?: number
  userId: string
  createdAt: string
  updatedAt: string
}

export interface CreateTaskInput {
  title: string
  category: string
  durationMinutes?: number
}

export interface UpdateTaskInput {
  title?: string
  category?: string
  completed?: boolean
  durationMinutes?: number
}

// ── Filter ────────────────────────────────────────────────────────────────────

export type FilterPeriod = 'day' | 'week' | 'month'

export interface TaskFilters {
  period: FilterPeriod
  category?: string
  completed?: boolean
}

// ── API ───────────────────────────────────────────────────────────────────────

export interface ApiError {
  status: string
  message: string
  errors?: { field: string; message: string }[]
}
