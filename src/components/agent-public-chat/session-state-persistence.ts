import { useCallback, useEffect } from 'react'
import type { Message } from '@/types'
import type { CapturedField } from '@/types'

const STORAGE_KEY_PREFIX = 'agent-public-chat-session'

export interface SessionState {
  sessionId: string
  agentSlug: string
  messages: Message[]
  capturedFields: CapturedField[]
  lastUpdated: string
}

export function getSessionStorageKey(agentSlug: string): string {
  return `${STORAGE_KEY_PREFIX}-${agentSlug}`
}

export function loadSessionFromStorage(agentSlug: string): SessionState | null {
  try {
    const key = getSessionStorageKey(agentSlug)
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw) as SessionState
    if (parsed.agentSlug !== agentSlug) return null
    return parsed
  } catch {
    return null
  }
}

export function saveSessionToStorage(state: SessionState): void {
  try {
    const key = getSessionStorageKey(state.agentSlug)
    const toSave = { ...state, lastUpdated: new Date().toISOString() }
    localStorage.setItem(key, JSON.stringify(toSave))
  } catch {
    // Ignore storage errors
  }
}

export function clearSessionFromStorage(agentSlug: string): void {
  try {
    localStorage.removeItem(getSessionStorageKey(agentSlug))
  } catch {
    // Ignore
  }
}

export interface UseSessionPersistenceOptions {
  agentSlug: string
  messages: Message[]
  capturedFields: CapturedField[]
  sessionId: string
  onRestore?: (state: SessionState) => void
}

export function useSessionPersistence({
  agentSlug,
  messages,
  capturedFields,
  sessionId,
  onRestore,
}: UseSessionPersistenceOptions): void {
  const save = useCallback(() => {
    saveSessionToStorage({
      sessionId,
      agentSlug,
      messages,
      capturedFields,
      lastUpdated: new Date().toISOString(),
    })
  }, [sessionId, agentSlug, messages, capturedFields])

  useEffect(() => {
    save()
  }, [save])

  useEffect(() => {
    if (!agentSlug || !onRestore) return
    const stored = loadSessionFromStorage(agentSlug)
    if (stored && stored.messages.length > 0) {
      onRestore(stored)
    }
  }, [agentSlug, onRestore])
}
