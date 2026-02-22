import { useRef, useEffect } from 'react'
import { Bot, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Message } from '@/types'
import type { Agent } from '@/types'
import { TypingStreamingIndicator } from './typing-streaming-indicator'

export interface FullScreenChatViewportProps {
  messages: Message[]
  isStreaming?: boolean
  streamingContent?: string
  agent: Agent
  className?: string
}

export function FullScreenChatViewport({
  messages,
  isStreaming = false,
  streamingContent = '',
  agent,
  className,
}: FullScreenChatViewportProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const primaryColor = agent.appearance?.primaryColor ?? '#26C6FF'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isStreaming, streamingContent])

  return (
    <main
      className={cn(
        'flex flex-1 flex-col overflow-y-auto p-4',
        className
      )}
    >
      <div className="mx-auto w-full max-w-2xl space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              'flex gap-3 animate-fade-in-up',
              msg.role === 'user' && 'flex-row-reverse'
            )}
          >
            <div
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200',
                msg.role === 'assistant' ? 'bg-accent/20' : 'bg-secondary'
              )}
              style={msg.role === 'assistant' ? { backgroundColor: `${primaryColor}33` } : undefined}
            >
              {msg.role === 'assistant' ? (
                <Bot className="h-4 w-4" style={{ color: primaryColor }} />
              ) : (
                <User className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div
              className={cn(
                'max-w-[80%] rounded-xl px-4 py-3 transition-all duration-200',
                msg.role === 'assistant'
                  ? 'border border-border bg-card shadow-card hover:shadow-card-hover'
                  : 'bg-accent/20'
              )}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {isStreaming && (
          <TypingStreamingIndicator content={streamingContent} primaryColor={primaryColor} />
        )}
        <div ref={messagesEndRef} aria-hidden />
      </div>
    </main>
  )
}
