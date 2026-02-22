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

export interface FieldValidation {
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: string
  patternMessage?: string
}

export interface AgentField {
  id: string
  type: FieldType
  name: string
  label: string
  required: boolean
  placeholder?: string
  sampleData?: string
  options?: FieldOption[]
  validation?: FieldValidation
}

export type AgentTone = 'formal' | 'friendly' | 'sales-y'

export interface Agent {
  id: string
  name: string
  slug: string
  description?: string
  tags?: string[]
  fields: AgentField[]
  persona?: {
    tone?: AgentTone
    systemInstructions?: string
    avatarUrl?: string
  }
  appearance?: {
    primaryColor?: string
    accentColor?: string
    theme?: 'light' | 'dark'
    logoUrl?: string
  }
  context?: {
    faq?: string
    fileUrls?: string[]
    docUrls?: string[]
    productDocUrl?: string
  }
  advanced?: {
    webhookUrls?: string[]
    passcodeEnabled?: boolean
    passcode?: string
    rateLimit?: number
    retentionDays?: number
  }
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

export interface AgentBuilderFormState {
  name: string
  slug: string
  description: string
  tags: string[]
  fields: AgentField[]
  persona: {
    tone: AgentTone
    systemInstructions: string
    avatarUrl: string
  }
  appearance: {
    primaryColor: string
    accentColor: string
    theme: 'light' | 'dark'
    logoUrl: string
  }
  context: {
    faq: string
    fileUrls: string[]
    docUrls: string[]
    productDocUrl: string
  }
  advanced: {
    webhookUrls: string[]
    passcodeEnabled: boolean
    passcode: string
    rateLimit: number
    retentionDays: number
  }
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

export interface AgentPublicChat {
  id: string
  user_id: string
  title: string
  description?: string
  status: string
  created_at: string
  updated_at: string
}
