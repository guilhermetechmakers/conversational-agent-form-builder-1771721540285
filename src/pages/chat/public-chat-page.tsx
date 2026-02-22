import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Bot, User } from 'lucide-react'

const mockAgent = {
  name: 'Lead Capture',
  avatarUrl: null,
  primaryColor: '#26C6FF',
}

const mockMessages = [
  { id: '1', role: 'assistant' as const, content: "Hi! I'm here to help collect your information. What's your name?" },
]

type ChatMessage = { id: string; role: 'user' | 'assistant'; content: string }

export function PublicChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: input.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: "Thanks! I've noted that. How can I help you further?",
        },
      ])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ backgroundColor: `${mockAgent.primaryColor}33` }}
          >
            <Bot className="h-5 w-5" style={{ color: mockAgent.primaryColor }} />
          </div>
          <span className="font-semibold">{mockAgent.name}</span>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-2xl space-y-4">
          {messages.map((msg) => (
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
                className={`max-w-[80%] rounded-xl px-4 py-3 ${
                  msg.role === 'assistant'
                    ? 'bg-card border border-border'
                    : 'bg-accent/20'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20">
                <Bot className="h-4 w-4 text-accent" />
              </div>
              <div className="flex items-center gap-1 rounded-xl bg-card border border-border px-4 py-3">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="mx-auto flex max-w-2xl gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button variant="accent" size="icon" onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-center gap-4 border-t border-border py-2 text-xs text-muted-foreground">
        <span>Privacy notice</span>
        <span>·</span>
        <button type="button" className="hover:text-foreground">Report abuse</button>
        <span>·</span>
        <button type="button" className="hover:text-foreground">End session</button>
      </footer>
    </div>
  )
}
