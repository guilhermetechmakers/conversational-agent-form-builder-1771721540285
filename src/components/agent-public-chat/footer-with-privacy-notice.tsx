import { Flag, Shield, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FooterWithPrivacyNoticeProps {
  onEndSession?: () => void
  privacyUrl?: string
  reportAbuseUrl?: string
  className?: string
}

export function FooterWithPrivacyNotice({
  onEndSession,
  privacyUrl = '/legal/privacy',
  reportAbuseUrl,
  className,
}: FooterWithPrivacyNoticeProps) {
  return (
    <footer
      className={cn(
        'flex shrink-0 flex-wrap items-center justify-center gap-2 border-t border-border py-3 px-4 text-xs text-muted-foreground',
        className
      )}
    >
      <a
        href={privacyUrl}
        className="flex items-center gap-1.5 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
      >
        <Shield className="h-3.5 w-3.5" />
        Privacy notice
      </a>
      <span aria-hidden>·</span>
      <a
        href={reportAbuseUrl ?? 'mailto:abuse@example.com'}
        className="flex items-center gap-1.5 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
      >
        <Flag className="h-3.5 w-3.5" />
        Report abuse
      </a>
      <span aria-hidden>·</span>
      <button
        type="button"
        onClick={onEndSession}
        className="flex items-center gap-1.5 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
      >
        <LogOut className="h-3.5 w-3.5" />
        End session
      </button>
    </footer>
  )
}
