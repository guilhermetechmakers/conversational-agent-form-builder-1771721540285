import { useParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Send, User, Bot, Copy, FileJson } from 'lucide-react'

const mockSession = {
  id: 's1',
  agentName: 'Lead Capture',
  status: 'completed' as const,
  createdAt: '2025-02-22T10:30:00',
  messages: [
    { id: 'm1', role: 'assistant' as const, content: "Hi! I'm here to help. What's your name?", timestamp: '2025-02-22T10:30:01' },
    { id: 'm2', role: 'user' as const, content: 'John Doe', timestamp: '2025-02-22T10:30:15' },
    { id: 'm3', role: 'assistant' as const, content: "Nice to meet you, John! What's your email address?", timestamp: '2025-02-22T10:30:16' },
    { id: 'm4', role: 'user' as const, content: 'john@example.com', timestamp: '2025-02-22T10:30:25' },
    { id: 'm5', role: 'assistant' as const, content: 'Thanks! All set. I\'ve captured your information.', timestamp: '2025-02-22T10:30:26' },
  ],
  capturedFields: [
    { fieldId: '1', fieldName: 'full_name', type: 'text' as const, validatedValue: 'John Doe' },
    { fieldId: '2', fieldName: 'email', type: 'email' as const, validatedValue: 'john@example.com' },
  ],
}

export function SessionViewerPage() {
  const { id } = useParams()

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Session {id}</h1>
          <p className="mt-1 text-muted-foreground">
            {mockSession.agentName} · {new Date(mockSession.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button variant="secondary">
            <FileJson className="mr-2 h-4 w-4" />
            Export JSON
          </Button>
          <Button variant="accent">
            <Send className="mr-2 h-4 w-4" />
            Resend Webhook
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Transcript */}
        <Card>
          <CardHeader>
            <CardTitle>Transcript</CardTitle>
            <CardDescription>Full conversation history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSession.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      msg.role === 'assistant' ? 'bg-accent/20' : 'bg-secondary'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <Bot className="h-4 w-4 text-accent" />
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.role === 'assistant'
                        ? 'bg-secondary/50'
                        : 'bg-accent/20'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Structured Fields */}
        <Card>
          <CardHeader>
            <CardTitle>Captured Fields</CardTitle>
            <CardDescription>Extracted structured data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSession.capturedFields.map((field) => (
                <div
                  key={field.fieldId}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div>
                    <p className="font-medium">{field.fieldName}</p>
                    <p className="text-sm text-muted-foreground">{field.type}</p>
                  </div>
                  <p className="font-mono text-sm">{String(field.validatedValue)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
