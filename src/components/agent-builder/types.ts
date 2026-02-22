import type { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from 'react-hook-form'

export interface AgentBuilderFormValues {
  name: string
  slug: string
  description: string
  tags: string[]
  persona: {
    tone: 'formal' | 'friendly' | 'sales-y'
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

export interface AgentMetadataProps {
  register: UseFormRegister<AgentBuilderFormValues>
  watch: UseFormWatch<AgentBuilderFormValues>
  setValue: UseFormSetValue<AgentBuilderFormValues>
  errors: FieldErrors<AgentBuilderFormValues>
}

export interface PersonaSettingsProps {
  register: UseFormRegister<AgentBuilderFormValues>
  watch: UseFormWatch<AgentBuilderFormValues>
  setValue: UseFormSetValue<AgentBuilderFormValues>
  errors: FieldErrors<AgentBuilderFormValues>
  onAvatarUpload?: (file: File) => Promise<string>
  isUploading?: boolean
}

export interface AppearanceSettingsProps {
  watch: UseFormWatch<AgentBuilderFormValues>
  setValue: UseFormSetValue<AgentBuilderFormValues>
}

export interface ContextUploadProps {
  register: UseFormRegister<AgentBuilderFormValues>
  watch: UseFormWatch<AgentBuilderFormValues>
  setValue: UseFormSetValue<AgentBuilderFormValues>
  onFileUpload?: (files: File[]) => Promise<string[]>
  onIndexKnowledge?: () => Promise<void>
  isUploading?: boolean
  isIndexing?: boolean
}

export interface AdvancedSettingsProps {
  register: UseFormRegister<AgentBuilderFormValues>
  watch: UseFormWatch<AgentBuilderFormValues>
  setValue: UseFormSetValue<AgentBuilderFormValues>
}
