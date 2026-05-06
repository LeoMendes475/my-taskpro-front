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

export const CATEGORY_COLORS: Record<string, string> = {
  Trabalho: 'bg-blue-500',
  Pessoal: 'bg-purple-500',
  Estudos: 'bg-green-500',
  Saúde: 'bg-rose-500',
  Finanças: 'bg-yellow-500',
  Outro: 'bg-zinc-500',
}

export const CATEGORY_INITIALS: Record<string, string> = {
  Trabalho: 'T',
  Pessoal: 'P',
  Estudos: 'E',
  Saúde: 'S',
  Finanças: 'F',
  Outro: 'O',
}
