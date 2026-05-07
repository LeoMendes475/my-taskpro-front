'use client'

import { useState } from 'react'
import { Task } from '@/types'
import { useToggleTask, useDeleteTask, useUpdateTask } from '@/hooks/useTasks'
import { cn, formatDuration } from '@/lib/utils'
import { Clock, Pencil, Trash2, CheckCircle2, Circle } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { ConfirmModal } from '@/components/ui/ConfirmModal'
import { CategoryIcon } from '@/components/ui/CategoryIcon'
import { TaskDetailModal } from '@/components/tasks/TaskDetailModal'
import { TaskForm } from '@/components/tasks/TaskForm'
import { TaskFormData } from '@/lib/validations/schemas'

interface TaskCardProps {
  task: Task
  index: number
}

export function TaskCard({ task, index }: TaskCardProps) {
  const [detailOpen, setDetailOpen] = useState(false)
  const [editOpen, setEditOpen]     = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const toggle = useToggleTask()
  const remove = useDeleteTask()
  const update = useUpdateTask()

  const isToggling = toggle.isPending && toggle.variables?.id === task.id
  const isDeleting = remove.isPending && remove.variables === task.id

  function handleToggle() {
    toggle.mutate({ id: task.id, completed: !task.completed })
  }

  function handleEdit(data: TaskFormData) {
    update.mutate({ id: task.id, data }, { onSuccess: () => setEditOpen(false) })
  }

  function handleDelete() {
    remove.mutate(task.id, { onSuccess: () => setDeleteOpen(false) })
  }

  function openEdit() {
    setDetailOpen(false)
    setEditOpen(true)
  }

  return (
    <>
      {/* Card row */}
      <div
        onClick={() => setDetailOpen(true)}
        className={cn(
          'group flex items-center gap-3 bg-bg-card rounded-2xl px-4 py-3.5 border border-border cursor-pointer',
          'hover:border-border/60 hover:bg-bg-hover transition-all duration-200 animate-slide-up',
          task.completed && 'opacity-55',
          isDeleting && 'opacity-40 pointer-events-none'
        )}
        style={{ animationDelay: `${index * 40}ms` }}
      >
        {/* Index */}
        <span className="text-xs text-text-muted font-mono w-4 shrink-0 text-center">{index + 1}</span>

        {/* Toggle button */}
        <button
          onClick={(e) => { e.stopPropagation(); handleToggle() }}
          disabled={isToggling}
          title={task.completed ? 'Reabrir' : 'Concluir'}
          className={cn(
            'shrink-0 transition-all duration-200 rounded-full',
            'focus:outline-none focus:ring-2 focus:ring-accent-green/40',
            isToggling && 'animate-pulse',
            task.completed
              ? 'text-accent-green hover:text-accent-green/70'
              : 'text-text-muted hover:text-accent-green'
          )}
        >
          {task.completed
            ? <CheckCircle2 size={22} strokeWidth={2} />
            : <Circle size={22} strokeWidth={1.5} />
          }
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={cn(
            'text-sm font-medium text-text-primary truncate transition-all duration-200',
            task.completed && 'line-through text-text-muted'
          )}>
            {task.title}
          </p>
          {task.durationMinutes ? (
            <p className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
              <Clock size={10} />
              {formatDuration(task.durationMinutes)}
            </p>
          ) : null}
        </div>

        {/* Action buttons */}
        <div
          className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setEditOpen(true)}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-primary transition-colors"
            title="Editar"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => setDeleteOpen(true)}
            className="p-1.5 rounded-lg text-text-muted hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Excluir"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Category icon */}
        <CategoryIcon category={task.category} />
      </div>

      {/* Detail modal */}
      <TaskDetailModal
        task={task}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onEdit={openEdit}
        onToggle={handleToggle}
        isToggling={isToggling}
      />

      {/* Edit modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Editar tarefa">
        <TaskForm
          onSubmit={handleEdit}
          defaultValues={task}
          loading={update.isPending}
          submitLabel="Atualizar"
        />
      </Modal>

      {/* Delete confirmation */}
      <ConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        loading={isDeleting}
        title="Excluir tarefa?"
        description={`"${task.title}" será removida permanentemente.`}
      />
    </>
  )
}
