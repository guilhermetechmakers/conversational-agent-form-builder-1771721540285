import { api } from '@/lib/api'
import type { Agent } from '@/types'

export interface AgentBySlugResponse {
  agent: Agent
}

function getMockAgent(slug: string): Agent {
  return {
    id: 'mock-1',
    name: 'Lead Capture',
    slug,
    description: 'Collect visitor information conversationally',
    fields: [
      { id: '1', type: 'text', name: 'full_name', label: 'Full Name', required: true },
      { id: '2', type: 'email', name: 'email', label: 'Email', required: true },
    ],
    persona: { tone: 'friendly', avatarUrl: undefined },
    appearance: { primaryColor: '#26C6FF', accentColor: '#00FF66' },
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export async function fetchAgentBySlug(slug: string): Promise<Agent> {
  try {
    const res = await api.get<Agent | AgentBySlugResponse>(`/agents/by-slug/${slug}`)
    return 'agent' in res ? res.agent : (res as Agent)
  } catch {
    return getMockAgent(slug)
  }
}

export interface AgentPayload {
  name: string
  slug: string
  description?: string
  tags?: string[]
  fields: Agent['fields']
  persona?: Agent['persona']
  appearance?: Agent['appearance']
  context?: Agent['context']
  advanced?: Agent['advanced']
  status?: 'draft' | 'published'
}

export async function getAgent(id: string): Promise<Agent> {
  return api.get<Agent>(`/agents/${id}`)
}

export async function createAgent(payload: AgentPayload): Promise<Agent> {
  return api.post<Agent>('/agents', payload)
}

export async function updateAgent(id: string, payload: Partial<AgentPayload>): Promise<Agent> {
  return api.patch<Agent>(`/agents/${id}`, payload)
}

export async function deleteAgent(id: string): Promise<void> {
  return api.delete(`/agents/${id}`)
}

export async function publishAgent(id: string): Promise<Agent> {
  return api.post<Agent>(`/agents/${id}/publish`)
}
