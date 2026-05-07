'use client'

import { useState, useMemo } from 'react'
import { useMe, useLogout } from '@/hooks/useAuth'
import { useTasks, useCreateTask } from '@/hooks/useTasks'
import { FilterPeriod } from '@/types'
import { TaskCard } from '@/components/tasks/TaskCard'
import { TaskListSkeleton } from '@/components/tasks/TaskSkeleton'
import { TaskForm } from '@/components/tasks/TaskForm'
import { ProgressBar } from '@/components/tasks/ProgressBar'
import { FilterBar } from '@/components/tasks/FilterBar'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Pagination } from '@/components/ui/Pagination'
import { TaskFormData } from '@/lib/validations/schemas'
import { TASKS_PER_PAGE, formatDuration } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Plus, LogOut, CheckCircle2, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const { data: user, isLoading: userLoading } = useMe()
  const logout = useLogout()

  const [period, setPeriod] = useState<FilterPeriod>('day')
  const [category, setCategory] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const [pendingPage, setPendingPage] = useState(1)
  const [donePage, setDonePage] = useState(1)

  const { data: tasks = [], isLoading: tasksLoading } = useTasks(period, category)
  const createTask = useCreateTask()

  if (!userLoading && !user) {
    router.push('/auth/login')
    return null
  }

  const pending = tasks.filter((t) => !t.completed)
  const done    = tasks.filter((t) => t.completed)
  const totalDoneMinutes = done.reduce((acc, t) => acc + (t.durationMinutes ?? 0), 0)

  // Pagination
  const pendingTotalPages = Math.ceil(pending.length / TASKS_PER_PAGE)
  const doneTotalPages    = Math.ceil(done.length / TASKS_PER_PAGE)

  const pendingPage_ = Math.min(pendingPage, pendingTotalPages || 1)
  const donePage_    = Math.min(donePage, doneTotalPages || 1)

  const pendingSlice = pending.slice((pendingPage_ - 1) * TASKS_PER_PAGE, pendingPage_ * TASKS_PER_PAGE)
  const doneSlice    = done.slice((donePage_ - 1) * TASKS_PER_PAGE, donePage_ * TASKS_PER_PAGE)

  function handleCreate(data: TaskFormData) {
    createTask.mutate(data, { onSuccess: () => setCreateOpen(false) })
  }

  function handlePeriodChange(p: FilterPeriod) {
    setPeriod(p)
    setPendingPage(1)
    setDonePage(1)
  }

  function handleCategoryChange(c: string) {
    setCategory(c)
    setPendingPage(1)
    setDonePage(1)
  }

  const today = format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1)

  return (
    <main className="min-h-screen bg-bg-primary">
      <div className="max-w-md mx-auto px-4 pt-10 pb-28">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-accent-green flex items-center justify-center">
              <CheckCircle2 size={16} className="text-bg-primary" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xs text-text-muted leading-none">Olá, {user?.name?.split(' ')[0]}</p>
              <p className="text-sm font-semibold leading-tight">{todayCapitalized}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
            title="Sair"
          >
            <LogOut size={16} />
          </button>
        </div>

        {/* Filters */}
        <FilterBar
          period={period}
          onPeriodChange={handlePeriodChange}
          category={category}
          onCategoryChange={handleCategoryChange}
        />

        {/* Progress */}
        {tasks.length > 0 && <ProgressBar tasks={tasks} />}

        {/* Pending tasks */}
        {tasksLoading ? (
          <TaskListSkeleton count={4} />
        ) : pending.length > 0 ? (
          <>
            <div className="flex flex-col gap-2">
              {pendingSlice.map((task, i) => (
                <TaskCard key={task.id} task={task} index={(pendingPage_ - 1) * TASKS_PER_PAGE + i} />
              ))}
            </div>
            <Pagination
              page={pendingPage_}
              totalPages={pendingTotalPages}
              onPageChange={setPendingPage}
            />
          </>
        ) : null}

        {/* Empty state */}
        {!tasksLoading && tasks.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-14 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-bg-card border border-border flex items-center justify-center">
              <CheckCircle2 size={24} className="text-text-muted" />
            </div>
            <div>
              <p className="text-text-primary font-medium">Nenhuma tarefa</p>
              <p className="text-text-muted text-sm mt-0.5">Adicione sua primeira tarefa do período</p>
            </div>
          </div>
        )}

        {/* Done section */}
        {done.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-text-muted uppercase tracking-widest">
                {done.length} Concluída{done.length > 1 ? 's' : ''}
              </p>
              {totalDoneMinutes > 0 && (
                <p className="text-xs text-text-muted flex items-center gap-1">
                  <Clock size={11} />
                  {formatDuration(totalDoneMinutes)}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              {doneSlice.map((task, i) => (
                <TaskCard key={task.id} task={task} index={(donePage_ - 1) * TASKS_PER_PAGE + i} />
              ))}
            </div>
            <Pagination
              page={donePage_}
              totalPages={doneTotalPages}
              onPageChange={setDonePage}
            />
          </div>
        )}
      </div>

      {/* FAB */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <Button
          onClick={() => setCreateOpen(true)}
          size="lg"
          loading={createTask.isPending}
          className="shadow-lg shadow-accent-green/20 px-6 rounded-2xl"
        >
          <Plus size={18} strokeWidth={2.5} />
          Nova tarefa
        </Button>
      </div>

      {/* Create modal */}
      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Nova tarefa">
        <TaskForm
          onSubmit={handleCreate}
          loading={createTask.isPending}
          submitLabel="Criar tarefa"
        />
      </Modal>
    </main>
  )
}
