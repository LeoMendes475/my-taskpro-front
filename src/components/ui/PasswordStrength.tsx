'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'

interface Rule {
  label: string
  test: (v: string) => boolean
}

const RULES: Rule[] = [
  { label: 'Mínimo 8 caracteres', test: (v) => v.length >= 8 },
  { label: 'Letra maiúscula',      test: (v) => /[A-Z]/.test(v) },
  { label: 'Número',               test: (v) => /[0-9]/.test(v) },
  { label: 'Caractere especial',   test: (v) => /[^a-zA-Z0-9]/.test(v) },
]

function getStrength(password: string): { score: number; label: string; color: string } {
  const passed = RULES.filter((r) => r.test(password)).length

  if (!password) return { score: 0, label: '',        color: '' }
  if (passed <= 1) return { score: 1, label: 'Fraca',  color: 'bg-rose-500' }
  if (passed === 2) return { score: 2, label: 'Média',  color: 'bg-yellow-400' }
  if (passed === 3) return { score: 3, label: 'Boa',    color: 'bg-blue-400' }
  return              { score: 4, label: 'Forte',  color: 'bg-accent-green' }
}

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const { score, label, color } = useMemo(() => getStrength(password), [password])

  if (!password) return null

  return (
    <div className="flex flex-col gap-3 animate-fade-in">
      {/* Strength bar */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1 flex-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={cn(
                'h-1 flex-1 rounded-full transition-all duration-300',
                i <= score ? color : 'bg-bg-hover'
              )}
            />
          ))}
        </div>
        <span
          className={cn(
            'text-xs font-medium w-10 text-right transition-colors duration-300',
            score === 1 && 'text-rose-400',
            score === 2 && 'text-yellow-400',
            score === 3 && 'text-blue-400',
            score === 4 && 'text-accent-green',
          )}
        >
          {label}
        </span>
      </div>

      {/* Rules checklist */}
      <div className="grid grid-cols-2 gap-1.5">
        {RULES.map((rule) => {
          const ok = rule.test(password)
          return (
            <div key={rule.label} className="flex items-center gap-1.5">
              <div
                className={cn(
                  'w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200',
                  ok ? 'bg-accent-green' : 'bg-bg-hover border border-border'
                )}
              >
                {ok && (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4L3 5.5L6.5 2" stroke="#0f0f0f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className={cn('text-xs transition-colors duration-200', ok ? 'text-text-secondary' : 'text-text-muted')}>
                {rule.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
