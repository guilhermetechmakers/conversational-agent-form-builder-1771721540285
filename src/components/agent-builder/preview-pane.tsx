import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Send } from 'lucide-react'
import type { AgentField } from '@/types'
import { cn } from '@/lib/utils'

interface PreviewPaneProps {
  agentName: string
  fields: AgentField[]
  primaryColor?: string
  accentColor?: string
  theme?: 'light' | 'dark'
  avatarUrl?: string
  messages?: Array<{ role: 'user' | 'assistant'; content: string }>
  onSendMessage?: (message: string) => void
  previewInput?: string
  onPreviewInputChange?: (value: string) => void
}

export function PreviewPane({
  agentName,
  fields,
  primaryColor = '#26C6FF',
  accentColor = '#00FF66',
  theme = 'dark',
  avatarUrl,
  messages = [
    { role: 'assistant', content: "Hi! I'm here to help. What's your name?" },
    { role: 'user', content: 'John Doe' },
    { role: 'assistant', content: "Nice to meet you, John! What's your email address?" },
  ],
  onSendMessage,
  previewInput = '',
  onPreviewInputChange,
}: PreviewPaneProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = previewInput.trim()
    if (msg && onSendMessage) {
      onSendMessage(msg)
      onPreviewInputChange?.('')
    }
  }

  const isLight = theme === 'light'

  return (
    <Card className="sticky top-24 transition-all duration-300 hover:shadow-card-hover">
      <CardHeader>
        <CardTitle>Live Preview</CardTitle>
        <CardDescription>
          Test prompts and field capture in real time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            'rounded-xl border p-4',
            isLight ? 'bg-gray-50 border-gray-200' : 'border-border bg-secondary/30'
          )}
        >
          <div className="mb-4 flex items-center gap-2">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
              }}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt=""
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <span className="text-sm font-bold text-white">
                  {(agentName || 'A')[0]}
                </span>
              )}
            </div>
            <span className="font-medium">
              {agentName || 'Agent'}
            </span>
          </div>
          <div className="space-y-3 max-h-[240px] overflow-y-auto">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-lg p-3 text-sm animate-fade-in',
                  m.role === 'assistant'
                    ? isLight
                      ? 'bg-gray-200 text-gray-900'
                      : 'bg-secondary/50'
                    : 'ml-auto max-w-[80%]',
                  m.role === 'user' && {
                    background: `linear-gradient(135deg, ${primaryColor}30, ${accentColor}30)`,
                  }
                )}
              >
                {m.content}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <Input
              value={previewInput}
              onChange={(e) => onPreviewInputChange?.(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit" size="icon" variant="accent">
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <div className="mt-3 flex flex-wrap gap-1">
            {fields.filter((f) => f.required).map((f) => (
              <Badge key={f.id} variant="secondary" className="text-xs">
                {f.label}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
