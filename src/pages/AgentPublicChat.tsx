import { useState, useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAgentBySlug } from '@/hooks/use-agent-by-slug'
import {
  HeaderWithAgentNameAvatar,
  FullScreenChatViewport,
  MessageInputWithQuickReplies,
  ProgressFieldCollectionIndicator,
  useSessionPersistence,
  clearSessionFromStorage,
  FooterWithPrivacyNotice,
} from '@/components/agent-public-chat'
import type { SessionState } from '@/components/agent-public-chat'
import type { Message, AgentField, CapturedField } from '@/types'

const INITIAL_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! I'm here to help collect your information. What's your name?",
  timestamp: new Date().toISOString(),
}

function generateSessionId(): string {
  return crypto.randomUUID()
}

export default function AgentPublicChat() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data: agent, isLoading, isError, refetch } = useAgentBySlug(slug)

  const [sessionId, setSessionId] = useState(() => generateSessionId())
  const [messages, setMessages] = useState<Message[]>([])
  const [capturedFields, setCapturedFields] = useState<CapturedField[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingContent, setStreamingContent] = useState('')
  const [hasRestoredSession, setHasRestoredSession] = useState(false)

  const requiredFields = agent?.fields?.filter((f: AgentField) => f.required) ?? []

  const onRestore = useCallback((stored: SessionState) => {
    if (stored.messages.length > 0) {
      setMessages(stored.messages)
      setCapturedFields(stored.capturedFields)
      setSessionId(stored.sessionId)
      setHasRestoredSession(true)
    }
  }, [])

  useSessionPersistence({
    agentSlug: slug ?? '',
    messages,
    capturedFields,
    sessionId,
    onRestore,
  })

  useEffect(() => {
    if (agent && messages.length === 0 && !hasRestoredSession) {
      setMessages([INITIAL_MESSAGE])
    }
  }, [agent, messages.length, hasRestoredSession])

  const handleSend = useCallback(
    (text: string) => {
      if (!agent) return

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: text,
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, userMessage])
      setIsStreaming(true)
      setStreamingContent('')

      setTimeout(() => {
        const mockReply =
          capturedFields.length < requiredFields.length
            ? `Thanks! I've noted that. ${requiredFields[capturedFields.length] ? `What's your ${requiredFields[capturedFields.length].label.toLowerCase()}?` : 'How can I help you further?'}`
            : "Thanks for providing all the information! I've recorded everything. Is there anything else you'd like to share?"
        setStreamingContent(mockReply)
        setTimeout(() => {
          const assistantMessage: Message = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: mockReply,
            timestamp: new Date().toISOString(),
          }
          setMessages((prev) => [...prev, assistantMessage])
          setStreamingContent('')
          setIsStreaming(false)
          if (requiredFields[capturedFields.length]) {
            setCapturedFields((prev) => [
              ...prev,
              {
                fieldId: requiredFields[capturedFields.length].id,
                fieldName: requiredFields[capturedFields.length].name,
                type: requiredFields[capturedFields.length].type,
                validatedValue: text,
                rawValue: text,
              },
            ])
          }
        }, 800)
      }, 300)
    },
    [agent, capturedFields, requiredFields]
  )

  const handleEndSession = useCallback(() => {
    if (slug) clearSessionFromStorage(slug)
    setSessionId(generateSessionId())
    setMessages([INITIAL_MESSAGE])
    setCapturedFields([])
    setHasRestoredSession(false)
  }, [slug])

  const suggestedQuestions = requiredFields
    .filter((f: AgentField) => !capturedFields.some((c: CapturedField) => c.fieldId === f.id))
    .slice(0, 3)
    .map((f: AgentField) => `What's your ${f.label.toLowerCase()}?`)

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <header className="flex h-14 items-center gap-3 border-b border-border px-4">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-5 w-32" />
        </header>
        <main className="flex-1 space-y-4 p-4">
          <div className="mx-auto max-w-2xl space-y-4">
            <Skeleton className="h-16 w-3/4 rounded-xl" />
            <Skeleton className="ml-auto h-12 w-1/3 rounded-xl" />
            <Skeleton className="h-16 w-2/3 rounded-xl" />
          </div>
        </main>
        <div className="border-t border-border p-4">
          <Skeleton className="mx-auto h-10 max-w-2xl rounded-lg" />
        </div>
      </div>
    )
  }

  if (!slug) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-4">
        <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 text-center max-w-md">
          <h2 className="text-lg font-semibold text-foreground">Agent not specified</h2>
          <p className="text-sm text-muted-foreground">
            Please use a valid agent URL, e.g. /agent-public-chat/lead-capture
          </p>
          <Button variant="accent" onClick={() => navigate('/agent-public-chat/lead-capture')}>
            Try demo agent
          </Button>
        </div>
      </div>
    )
  }

  if (isError || !agent) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-4">
        <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 text-center max-w-md">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
            <AlertCircle className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Unable to load agent</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The agent could not be found or there was a connection error.
            </p>
          </div>
          <Button variant="accent" onClick={() => refetch()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <HeaderWithAgentNameAvatar agent={agent} />
      <FullScreenChatViewport
        messages={messages}
        isStreaming={isStreaming}
        streamingContent={streamingContent}
        agent={agent}
      />
      <div className="shrink-0 border-t border-border p-4">
        <div className="mx-auto max-w-2xl space-y-3">
          {requiredFields.length > 0 && (
            <ProgressFieldCollectionIndicator
              requiredFields={requiredFields}
              capturedFields={capturedFields}
            />
          )}
          <MessageInputWithQuickReplies
            onSend={handleSend}
            placeholder="Type your message..."
            suggestedQuestions={suggestedQuestions}
            disabled={isStreaming}
          />
        </div>
      </div>
      <FooterWithPrivacyNotice onEndSession={handleEndSession} />
    </div>
  )
}
