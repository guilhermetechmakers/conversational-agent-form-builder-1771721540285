import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'destructive'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-accent/20 text-accent': variant === 'default',
          'bg-secondary text-muted-foreground': variant === 'secondary',
          'bg-accent-green/20 text-accent-green': variant === 'success',
          'bg-notification/20 text-notification': variant === 'warning',
          'bg-red-500/20 text-red-400': variant === 'destructive',
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
