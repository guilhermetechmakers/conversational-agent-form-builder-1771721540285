import * as React from 'react'
import { cn } from '@/lib/utils'

interface SheetProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onClose?: () => void
  side?: 'left' | 'right'
}

const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(
  ({ className, open, onClose, side = 'left', children, ...props }, ref) => {
    return (
      <>
        {open && (
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
            aria-hidden
          />
        )}
        <div
          ref={ref}
          className={cn(
            'fixed top-0 z-50 h-full w-72 bg-background border-border shadow-lg transition-transform duration-300',
            side === 'left' ? 'left-0 border-r' : 'right-0 border-l',
            open ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </>
    )
  }
)
Sheet.displayName = 'Sheet'

export { Sheet }
