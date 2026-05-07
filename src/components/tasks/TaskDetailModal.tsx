'use client'

import { Task } from '@/types'
import { Modal } from '@/components/ui/Modal'
import { CategoryIcon } from '@/components/ui/CategoryIcon'
import { CATEGORY_BG, formatDuration, cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Clock, Calendar, CheckCircle2, Circle, Tag, RefreshCw } from 'lucide-react'

interface TaskDetailModalProps {
  task: Task | null
  open: boolean
  onClose: () => void
  onEdit: () => void
  onToggle: () => void
  isToggling?: boolean
}

function DetailRow({
  icon,
  label,
  value,
  valueClass,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
  valueClass?: string
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-2 text-text-muted">
        {icon}
        <span className="text-xs uppercase tracking-widest font-medium">{label}</span>
      </div>
      <div className={cn('text-sm font-medium text-text-primary text-right', valueClass)}>
        {value}
      </div>
    </div>
  )
}

export function TaskDetailModal({
  task,
  open,
  onClose,
  onEdit,
  onToggle,
  isToggling,
}: TaskDetailModalProps) {
  if (!task) return null

  const colorBg = CATEGORY_BG[task.category] ?? 'bg-zinc-500/15 text-zinc-400'
  const createdAt = format(new Date(task.createdAt), "d 'de' MMMM 'de' yyyy", { locale: ptBR })
  const updatedAt = format(new Date(task.updatedAt), "d 'de' MMMM, HH:mm", { locale: ptBR })

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-5">

        {/* Header */}
        <div className="flex items-start gap-3">
          <CategoryIcon category={task.category} size={16} className="w-10 h-10 rounded-xl mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-text-muted uppercase tracking-widest mb-1">{task.category}</p>
            <h2 className={cn(
              'text-base font-semibold text-text-primary leading-snug',
              task.completed && 'line-through text-text-muted'
            )}>
              {task.title}
            </h2>
          </div>
          <span className={cn(
            'shrink-0 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap',
            task.completed
              ? 'bg-accent-green/15 text-accent-green'
              : 'bg-bg-hover text-text-muted border border-border'
          )}>
            {task.completed ? 'Concluída' : 'Pendente'}
          </span>
        </div>

        {/* Details table */}
        <div className="bg-bg-primary rounded-2xl px-4">
          <DetailRow
            icon={<Tag size={12} />}
            label="Categoria"
            value={
              <span className={cn('px-2 py-0.5 rounded-lg text-xs font-semibold', colorBg)}>
                {task.category}
              </span>
            }
          />
          <DetailRow
            icon={<Clock size={12} />}
            label="Duração"
            value={formatDuration(task.durationMinutes) || '—'}
          />
          <DetailRow
            icon={<Calendar size={12} />}
            label="Criada em"
            value={createdAt}
          />
          <DetailRow
            icon={<RefreshCw size={12} />}
            label="Atualizada"
            value={updatedAt}
          />
          <DetailRow
            icon={task.completed ? <CheckCircle2 size={12} /> : <Circle size={12} />}
            label="Status"
            value={task.completed ? 'Concluída' : 'Pendente'}
            valueClass={task.completed ? 'text-accent-green' : 'text-text-muted'}
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2.5 pb-1">
          <button
            onClick={onToggle}
            disabled={isToggling}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 border',
              task.completed
                ? 'border-border text-text-secondary hover:bg-bg-hover active:scale-[0.98]'
                : 'border-accent-green/40 bg-accent-green/10 text-accent-green hover:bg-accent-green/20 active:scale-[0.98]',
              isToggling && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isToggling ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : task.completed ? (
              <Circle size={15} />
            ) : (
              <CheckCircle2 size={15} />
            )}
            {task.completed ? 'Reabrir' : 'Concluir'}
          </button>

          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium border border-border text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-all duration-200 active:scale-[0.98]"
          >
            Editar
          </button>
        </div>
      </div>
    </Modal>
  )
}
