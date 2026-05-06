'use client'

import { Task } from '@/types'
import { formatDuration } from '@/lib/utils'

interface ProgressBarProps {
  tasks: Task[]
}

export function ProgressBar({ tasks }: ProgressBarProps) {
  const total = tasks.length
  const done = tasks.filter((t) => t.completed).length
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)

  const totalMinutes = tasks.reduce((acc, t) => acc + (t.durationMinutes ?? 0), 0)

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex items-center justify-between text-xs text-text-muted">
        <span>Est: {formatDuration(totalMinutes) || '—'}</span>
        <span className="font-mono">
          {done}/{total} DONE
        </span>
      </div>
      <div className="h-1.5 bg-bg-card rounded-full overflow-hidden">
        <div
          className="h-full bg-accent-green rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
