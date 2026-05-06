import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-medium text-text-secondary uppercase tracking-widest">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            'w-full bg-bg-card border border-border rounded-xl px-4 py-3 text-text-primary',
            'focus:outline-none focus:border-accent-green focus:ring-1 focus:ring-accent-green/20',
            'transition-all duration-200 appearance-none cursor-pointer',
            error && 'border-rose-500',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-bg-card">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-rose-400">⚠ {error}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'
