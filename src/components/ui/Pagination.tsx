'use client'

import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="p-1.5 rounded-lg border border-border text-text-muted hover:text-text-primary hover:bg-bg-hover disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1
          const isActive = p === page
          const isNear = Math.abs(p - page) <= 1 || p === 1 || p === totalPages

          if (!isNear) {
            if (p === page - 2 || p === page + 2) {
              return <span key={p} className="text-text-muted text-xs px-1">…</span>
            }
            return null
          }

          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={cn(
                'w-7 h-7 rounded-lg text-xs font-medium transition-all duration-200',
                isActive
                  ? 'bg-accent-green text-bg-primary'
                  : 'text-text-muted hover:text-text-primary hover:bg-bg-hover border border-border'
              )}
            >
              {p}
            </button>
          )
        })}
      </div>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="p-1.5 rounded-lg border border-border text-text-muted hover:text-text-primary hover:bg-bg-hover disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
