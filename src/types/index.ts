export type FieldType =
  | 'text'
  | 'email'
  | 'phone'
  | 'number'
  | 'select'
  | 'checkbox'
  | 'textarea'
  | 'date'

export interface FieldOption {
  label: string
  value: string
}

export interface AgentField {
  id: string
  type: FieldType
  name: string
  label: string
  required: boolean
  placeholder?: string
  options?: FieldOption[]
  validation?: Record<string, unknown>
}

export interface Agent {
  id: string
  name: string
  slug: string
  description?: string
  tags?: string[]
  fields: AgentField[]
  persona?: {
    tone?: string
    systemInstructions?: string
    avatarUrl?: string
  }
  appearance?: {
    primaryColor?: string
    accentColor?: string
    logoUrl?: string
  }
  context?: {
    faq?: string
    fileUrls?: string[]
    docUrls?: string[]
  }
  advanced?: {
    webhookUrls?: string[]
    passcode?: string
    rateLimit?: number
    retentionDays?: number
  }
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface CapturedField {
  fieldId: string
  fieldName: string
  type: FieldType
  validatedValue: unknown
  rawValue?: string
}

export interface Session {
  id: string
  agentId: string
  agentName?: string
  status: 'active' | 'completed' | 'abandoned'
  messages: Message[]
  capturedFields: CapturedField[]
  visitorMetadata?: {
    ip?: string
    userAgent?: string
    referrer?: string
  }
  createdAt: string
  updatedAt: string
}
