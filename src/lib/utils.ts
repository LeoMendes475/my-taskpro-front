import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(minutes?: number): string {
  if (!minutes) return ''
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}min`
  if (m === 0) return `${h}hr`
  return `${h}hr ${m}min`
}

export const CATEGORIES = [
  'Trabalho',
  'Pessoal',
  'Estudos',
  'Saúde',
  'Finanças',
  'Outro',
] as const

// Tailwind bg color per category
export const CATEGORY_COLORS: Record<string, string> = {
  Trabalho: 'bg-blue-500',
  Pessoal:  'bg-purple-500',
  Estudos:  'bg-emerald-500',
  Saúde:    'bg-rose-500',
  Finanças: 'bg-amber-500',
  Outro:    'bg-zinc-500',
}

// Subtle background for icon badge
export const CATEGORY_BG: Record<string, string> = {
  Trabalho: 'bg-blue-500/15 text-blue-400',
  Pessoal:  'bg-purple-500/15 text-purple-400',
  Estudos:  'bg-emerald-500/15 text-emerald-400',
  Saúde:    'bg-rose-500/15 text-rose-400',
  Finanças: 'bg-amber-500/15 text-amber-400',
  Outro:    'bg-zinc-500/15 text-zinc-400',
}

export const TASKS_PER_PAGE = 8
