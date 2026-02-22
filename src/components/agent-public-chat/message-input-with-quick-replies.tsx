import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface MessageInputWithQuickRepliesProps {
  onSend: (message: string) => void
  placeholder?: string
  quickReplies?: string[]
  suggestedQuestions?: string[]
  disabled?: boolean
  className?: string
}

export function MessageInputWithQuickReplies({
  onSend,
  placeholder = 'Type your message...',
  quickReplies = [],
  suggestedQuestions = [],
  disabled = false,
  className,
}: MessageInputWithQuickRepliesProps) {
  const [input, setInput] = useState('')

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setInput('')
  }

  const handleQuickReply = (text: string) => {
    onSend(text)
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {suggestedQuestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => handleQuickReply(q)}
              disabled={disabled}
              className={cn(
                'rounded-full border border-border bg-card px-4 py-2 text-sm transition-all duration-200',
                'hover:border-accent/50 hover:bg-accent/10 hover:shadow-card-hover',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                'disabled:pointer-events-none disabled:opacity-50'
              )}
            >
              {q}
            </button>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
          disabled={disabled}
          className="flex-1 transition-all duration-200 focus:border-accent/50"
        />
        <Button
          variant="accent"
          size="icon"
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      {quickReplies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              type="button"
              onClick={() => handleQuickReply(reply)}
              disabled={disabled}
              className={cn(
                'rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs transition-all duration-200',
                'hover:scale-[1.02] hover:border-accent/30 hover:bg-accent/10',
                'disabled:pointer-events-none disabled:opacity-50'
              )}
            >
              {reply}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
