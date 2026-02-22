import { Bot } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Agent } from '@/types'

export interface HeaderWithAgentNameAvatarProps {
  agent: Agent
  className?: string
}

export function HeaderWithAgentNameAvatar({ agent, className }: HeaderWithAgentNameAvatarProps) {
  const primaryColor = agent.appearance?.primaryColor ?? '#26C6FF'
  const avatarUrl = agent.persona?.avatarUrl

  return (
    <header
      className={cn(
        'flex h-14 shrink-0 items-center justify-between border-b border-border px-4 transition-all duration-300',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full transition-shadow duration-200 hover:shadow-[0_0_12px_rgba(38,198,255,0.3)]"
          style={{
            backgroundColor: avatarUrl ? 'transparent' : `${primaryColor}33`,
          }}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={agent.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <Bot className="h-5 w-5" style={{ color: primaryColor }} />
          )}
        </div>
        <div className="min-w-0">
          <span className="truncate font-semibold text-foreground">{agent.name}</span>
          {agent.description && (
            <p className="truncate text-xs text-muted-foreground">{agent.description}</p>
          )}
        </div>
      </div>
    </header>
  )
}
