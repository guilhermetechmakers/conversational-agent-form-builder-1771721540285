import { CheckCircle2, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AgentField } from '@/types'
import type { CapturedField } from '@/types'

export interface ProgressFieldCollectionIndicatorProps {
  requiredFields: AgentField[]
  capturedFields: CapturedField[]
  className?: string
}

export function ProgressFieldCollectionIndicator({
  requiredFields,
  capturedFields,
  className,
}: ProgressFieldCollectionIndicatorProps) {
  const capturedIds = new Set(capturedFields.map((f) => f.fieldId))
  const completed = requiredFields.filter((f) => capturedIds.has(f.id))
  const progress = requiredFields.length > 0
    ? Math.round((completed.length / requiredFields.length) * 100)
    : 100

  if (requiredFields.length === 0) return null

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-lg border border-border bg-card/50 px-4 py-3',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          Progress
        </span>
        <span className="text-xs font-medium text-accent">
          {completed.length}/{requiredFields.length} fields
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {requiredFields.map((field) => {
          const isCaptured = capturedIds.has(field.id)
          return (
            <div
              key={field.id}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-2 py-1 text-xs transition-colors duration-200',
                isCaptured
                  ? 'bg-accent-green/20 text-accent-green'
                  : 'bg-secondary/80 text-muted-foreground'
              )}
            >
              {isCaptured ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <Circle className="h-3.5 w-3.5" />
              )}
              <span>{field.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
