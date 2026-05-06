'use client'

import { useState } from 'react'
import { Task } from '@/types'
import { useToggleTask, useDeleteTask } from '@/hooks/useTasks'
import { CATEGORY_COLORS, CATEGORY_INITIALS, cn, formatDuration } from '@/lib/utils'
import { Check, Clock, Pencil, Trash2 } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { TaskForm } from '@/components/tasks/TaskForm'
import { useUpdateTask } from '@/hooks/useTasks'
import { TaskFormData } from '@/lib/validations/schemas'

interface TaskCardProps {
  task: Task
  index: number
}

export function TaskCard({ task, index }: TaskCardProps) {
  const [editOpen, setEditOpen] = useState(false)
  const toggle = useToggleTask()
  const remove = useDeleteTask()
  const update = useUpdateTask()

  const colorClass = CATEGORY_COLORS[task.category] ?? 'bg-zinc-500'
  const initial = CATEGORY_INITIALS[task.category] ?? task.category[0]?.toUpperCase()

  function handleEdit(data: TaskFormData) {
    update.mutate(
      { id: task.id, data },
      { onSuccess: () => setEditOpen(false) }
    )
  }

  return (
    <>
      <div
        className={cn(
          'group flex items-center gap-4 bg-bg-card rounded-2xl px-4 py-3.5 border border-border',
          'hover:border-border/80 hover:bg-bg-hover transition-all duration-200 animate-slide-up',
          task.completed && 'opacity-60'
        )}
        style={{ animationDelay: `${index * 40}ms` }}
      >
        {/* Index */}
        <span className="text-xs text-text-muted font-mono w-4 shrink-0">{index + 1}</span>

        {/* Checkbox */}
        <button
          onClick={() => toggle.mutate({ id: task.id, completed: !task.completed })}
          className={cn(
            'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200',
            task.completed
              ? 'bg-accent-green border-accent-green'
              : 'border-border hover:border-accent-green'
          )}
        >
          {task.completed && <Check size={11} strokeWidth={3} className="text-bg-primary" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={cn('text-sm font-medium text-text-primary truncate', task.completed && 'line-through text-text-muted')}>
            {task.title}
          </p>
          {task.durationMinutes && (
            <p className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
              <Clock size={10} />
              {formatDuration(task.durationMinutes)}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => setEditOpen(true)}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-primary transition-colors"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => remove.mutate(task.id)}
            className="p-1.5 rounded-lg text-text-muted hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Category badge */}
        <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0', colorClass)}>
          {initial}
        </div>
      </div>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Editar tarefa">
        <TaskForm
          onSubmit={handleEdit}
          defaultValues={task}
          loading={update.isPending}
          submitLabel="Atualizar"
        />
      </Modal>
    </>
  )
}
