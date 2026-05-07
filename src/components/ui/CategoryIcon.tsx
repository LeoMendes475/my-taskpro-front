import { Briefcase, User, BookOpen, Heart, DollarSign, Tag } from 'lucide-react'
import { cn, CATEGORY_BG } from '@/lib/utils'

const ICONS: Record<string, React.ElementType> = {
  Trabalho: Briefcase,
  Pessoal:  User,
  Estudos:  BookOpen,
  Saúde:    Heart,
  Finanças: DollarSign,
  Outro:    Tag,
}

interface CategoryIconProps {
  category: string
  size?: number
  className?: string
}

export function CategoryIcon({ category, size = 14, className }: CategoryIconProps) {
  const Icon = ICONS[category] ?? Tag
  const colorClass = CATEGORY_BG[category] ?? 'bg-zinc-500/15 text-zinc-400'

  return (
    <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center shrink-0', colorClass, className)}>
      <Icon size={size} strokeWidth={2} />
    </div>
  )
}
