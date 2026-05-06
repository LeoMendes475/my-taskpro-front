'use client'

import { FilterPeriod } from '@/types'
import { CATEGORIES, cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface FilterBarProps {
  period: FilterPeriod
  onPeriodChange: (p: FilterPeriod) => void
  category: string
  onCategoryChange: (c: string) => void
}

const PERIODS: { value: FilterPeriod; label: string }[] = [
  { value: 'day', label: 'Hoje' },
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mês' },
]

export function FilterBar({ period, onPeriodChange, category, onCategoryChange }: FilterBarProps) {
  const [catOpen, setCatOpen] = useState(false)

  return (
    <div className="flex items-center gap-2 mb-4">
      {/* Period filter */}
      <div className="flex bg-bg-card border border-border rounded-xl p-0.5 gap-0.5">
        {PERIODS.map((p) => (
          <button
            key={p.value}
            onClick={() => onPeriodChange(p.value)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
              period === p.value
                ? 'bg-accent-green text-bg-primary'
                : 'text-text-muted hover:text-text-primary'
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="relative">
        <button
          onClick={() => setCatOpen(!catOpen)}
          className="flex items-center gap-1.5 px-3 py-2 bg-bg-card border border-border rounded-xl text-xs text-text-secondary hover:text-text-primary transition-colors"
        >
          {category || 'Categoria'}
          <ChevronDown size={12} className={cn('transition-transform', catOpen && 'rotate-180')} />
        </button>

        {catOpen && (
          <div className="absolute top-full left-0 mt-1.5 w-40 bg-bg-secondary border border-border rounded-xl py-1 z-10 shadow-xl animate-scale-in">
            <button
              onClick={() => { onCategoryChange(''); setCatOpen(false) }}
              className="w-full text-left px-3 py-2 text-xs text-text-muted hover:text-text-primary hover:bg-bg-hover transition-colors"
            >
              Todas
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => { onCategoryChange(c); setCatOpen(false) }}
                className={cn(
                  'w-full text-left px-3 py-2 text-xs hover:bg-bg-hover transition-colors',
                  category === c ? 'text-accent-green' : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
