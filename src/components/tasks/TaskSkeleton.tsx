import { cn } from '@/lib/utils'

function SkeletonLine({ className }: { className?: string }) {
  return <div className={cn('bg-bg-hover rounded-lg animate-pulse', className)} />
}

function TaskSkeletonCard() {
  return (
    <div className="flex items-center gap-4 bg-bg-card rounded-2xl px-4 py-3.5 border border-border">
      <SkeletonLine className="w-4 h-3 shrink-0" />
      <SkeletonLine className="w-5 h-5 rounded-full shrink-0" />
      <div className="flex-1 flex flex-col gap-2">
        <SkeletonLine className="h-3.5 w-3/4" />
        <SkeletonLine className="h-2.5 w-1/4" />
      </div>
      <SkeletonLine className="w-8 h-8 rounded-xl shrink-0" />
    </div>
  )
}

export function TaskListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <TaskSkeletonCard key={i} />
      ))}
    </div>
  )
}
