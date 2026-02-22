import { Bot } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TypingStreamingIndicatorProps {
  content?: string
  primaryColor?: string
  className?: string
}

export function TypingStreamingIndicator({
  content = '',
  primaryColor = '#26C6FF',
  className,
}: TypingStreamingIndicatorProps) {
  const showDots = !content

  return (
    <div
      className={cn(
        'flex gap-3 animate-fade-in',
        className
      )}
    >
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: `${primaryColor}33` }}
      >
        <Bot className="h-4 w-4" style={{ color: primaryColor }} />
      </div>
      <div className="flex items-center gap-1 rounded-xl border border-border bg-card px-4 py-3 shadow-card">
        {showDots ? (
          <div className="flex gap-1">
            <span
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ backgroundColor: primaryColor, animationDelay: '0ms' }}
            />
            <span
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ backgroundColor: primaryColor, animationDelay: '150ms' }}
            />
            <span
              className="h-2 w-2 animate-pulse rounded-full"
              style={{ backgroundColor: primaryColor, animationDelay: '300ms' }}
            />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {content}
            <span
              className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-accent"
              style={{ backgroundColor: primaryColor }}
              aria-hidden
            />
          </p>
        )}
      </div>
    </div>
  )
}
