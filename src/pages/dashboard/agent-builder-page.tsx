import { useState, useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  AgentMetadata,
  FieldsEditor,
  PersonaSettings,
  AppearanceSettings,
  ContextUpload,
  AdvancedSettings,
  PreviewPane,
  SavePublishButtons,
} from '@/components/agent-builder'
import { getAgent, updateAgent, createAgent, publishAgent } from '@/api/agents'
import { uploadFile, uploadFiles } from '@/api/uploads'
import type { AgentField, AgentTone } from '@/types'

const agentBuilderSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  description: z.string().optional().default(''),
  tags: z.array(z.string()).default([]),
  persona: z.object({
    tone: z.enum(['formal', 'friendly', 'sales-y']).default('friendly'),
    systemInstructions: z.string().default(''),
    avatarUrl: z.string().default(''),
  }),
  appearance: z.object({
    primaryColor: z.string().default('#26C6FF'),
    accentColor: z.string().default('#00FF66'),
    theme: z.enum(['light', 'dark']).default('dark'),
    logoUrl: z.string().default(''),
  }),
  context: z.object({
    faq: z.string().default(''),
    fileUrls: z.array(z.string()).default([]),
    docUrls: z.array(z.string()).default([]),
    productDocUrl: z.string().default(''),
  }),
  advanced: z.object({
    webhookUrls: z.array(z.string()).default([]),
    passcodeEnabled: z.boolean().default(false),
    passcode: z.string().default(''),
    rateLimit: z.number().default(60),
    retentionDays: z.number().default(30),
  }),
})

type AgentBuilderForm = z.infer<typeof agentBuilderSchema>

const defaultFields: AgentField[] = [
  { id: crypto.randomUUID(), type: 'text', name: 'full_name', label: 'Full Name', required: true },
  { id: crypto.randomUUID(), type: 'email', name: 'email', label: 'Email', required: true },
]

const tabs = [
  { id: 'metadata' as const, label: 'Metadata', icon: 'Settings' },
  { id: 'fields' as const, label: 'Fields', icon: 'MessageSquare' },
  { id: 'persona' as const, label: 'Persona', icon: 'User' },
  { id: 'appearance' as const, label: 'Appearance', icon: 'Palette' },
  { id: 'context' as const, label: 'Context', icon: 'FileText' },
  { id: 'advanced' as const, label: 'Advanced', icon: 'Shield' },
]

export function AgentBuilderPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isNew = id === 'new' || !id

  const [activeTab, setActiveTab] = useState<(typeof tabs)[0]['id']>('metadata')
  const [fields, setFields] = useState<AgentField[]>(defaultFields)
  const [previewMessages, setPreviewMessages] = useState<
    Array<{ role: 'user' | 'assistant'; content: string }>
  >([
    { role: 'assistant', content: "Hi! I'm here to help. What's your name?" },
    { role: 'user', content: 'John Doe' },
    { role: 'assistant', content: "Nice to meet you, John! What's your email address?" },
  ])
  const [previewInput, setPreviewInput] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isIndexing, setIsIndexing] = useState(false)

  const { data: agent, isLoading, error } = useQuery({
    queryKey: ['agent', id],
    queryFn: () => getAgent(id!),
    enabled: !isNew,
    retry: false,
  })

  const form = useForm<AgentBuilderForm>({
    resolver: zodResolver(agentBuilderSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      tags: [],
      persona: { tone: 'friendly', systemInstructions: '', avatarUrl: '' },
      appearance: { primaryColor: '#26C6FF', accentColor: '#00FF66', theme: 'dark', logoUrl: '' },
      context: { faq: '', fileUrls: [], docUrls: [], productDocUrl: '' },
      advanced: { webhookUrls: [], passcodeEnabled: false, passcode: '', rateLimit: 60, retentionDays: 30 },
    },
  })

  useEffect(() => {
    if (!agent) return
    form.reset({
      name: agent.name,
      slug: agent.slug,
      description: agent.description ?? '',
      tags: agent.tags ?? [],
      persona: {
        tone: (agent.persona?.tone as AgentTone) ?? 'friendly',
        systemInstructions: agent.persona?.systemInstructions ?? '',
        avatarUrl: agent.persona?.avatarUrl ?? '',
      },
      appearance: {
        primaryColor: agent.appearance?.primaryColor ?? '#26C6FF',
        accentColor: agent.appearance?.accentColor ?? '#00FF66',
        theme: agent.appearance?.theme ?? 'dark',
        logoUrl: agent.appearance?.logoUrl ?? '',
      },
      context: {
        faq: agent.context?.faq ?? '',
        fileUrls: agent.context?.fileUrls ?? [],
        docUrls: agent.context?.docUrls ?? [],
        productDocUrl: agent.context?.productDocUrl ?? '',
      },
      advanced: {
        webhookUrls: agent.advanced?.webhookUrls ?? [],
        passcodeEnabled: agent.advanced?.passcodeEnabled ?? false,
        passcode: agent.advanced?.passcode ?? '',
        rateLimit: agent.advanced?.rateLimit ?? 60,
        retentionDays: agent.advanced?.retentionDays ?? 30,
      },
    })
    if (agent.fields?.length) {
      setFields(agent.fields)
    }
  }, [agent])

  const saveMutation = useMutation({
    mutationFn: async () => {
      const values = form.getValues()
      const payload = {
        name: values.name,
        slug: values.slug,
        description: values.description || undefined,
        tags: values.tags,
        fields,
        persona: values.persona,
        appearance: values.appearance,
        context: values.context,
        advanced: values.advanced,
        status: 'draft' as const,
      }
      if (isNew) {
        return createAgent(payload)
      }
      return updateAgent(id!, payload)
    },
    onSuccess: (data) => {
      toast.success('Draft saved')
      if (isNew) navigate(`/dashboard/agents/${data.id}`)
      queryClient.invalidateQueries({ queryKey: ['agent', id] })
    },
    onError: (err: Error) => {
      toast.error(err.message ?? 'Failed to save')
    },
  })

  const publishMutation = useMutation({
    mutationFn: async () => {
      const values = form.getValues()
      const payload = {
        name: values.name,
        slug: values.slug,
        description: values.description || undefined,
        tags: values.tags,
        fields,
        persona: values.persona,
        appearance: values.appearance,
        context: values.context,
        advanced: values.advanced,
        status: 'published' as const,
      }
      if (isNew) {
        const created = await createAgent({ ...payload, status: 'published' })
        return created
      }
      return publishAgent(id!)
    },
    onSuccess: (data) => {
      toast.success('Agent published')
      if (isNew) navigate(`/dashboard/agents/${data.id}`)
      queryClient.invalidateQueries({ queryKey: ['agent', id] })
    },
    onError: (err: Error) => {
      toast.error(err.message ?? 'Failed to publish')
    },
  })

  const handleAvatarUpload = useCallback(async (file: File): Promise<string> => {
    setIsUploading(true)
    try {
      const url = await uploadFile(file)
      return url
    } finally {
      setIsUploading(false)
    }
  }, [])

  const handleFileUpload = useCallback(async (files: File[]): Promise<string[]> => {
    setIsUploading(true)
    try {
      return await uploadFiles(files)
    } finally {
      setIsUploading(false)
    }
  }, [])

  const handleIndexKnowledge = useCallback(async () => {
    setIsIndexing(true)
    try {
      await new Promise((r) => setTimeout(r, 1500))
      toast.success('Knowledge indexed')
    } catch {
      toast.error('Indexing failed')
    } finally {
      setIsIndexing(false)
    }
  }, [])

  const handlePreviewSend = useCallback((msg: string) => {
    setPreviewMessages((prev) => [...prev, { role: 'user', content: msg }])
    setPreviewMessages((prev) => [
      ...prev,
      { role: 'assistant', content: `Thanks! I've noted: ${msg}` },
    ])
  }, [])

  const handleSave = () => form.handleSubmit(() => saveMutation.mutate())()
  const handlePublish = () => form.handleSubmit(() => publishMutation.mutate())()

  const validationErrors: string[] = []
  if (form.formState.errors.name) validationErrors.push(form.formState.errors.name.message!)
  if (form.formState.errors.slug) validationErrors.push(form.formState.errors.slug.message!)
  const hasValidationErrors = validationErrors.length > 0

  if (!isNew && isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-pulse rounded-full bg-accent/30" />
      </div>
    )
  }

  if (!isNew && error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-border py-16">
        <p className="text-muted-foreground">Failed to load agent</p>
        <button
          type="button"
          onClick={() => queryClient.invalidateQueries({ queryKey: ['agent', id] })}
          className="mt-4 text-accent hover:underline"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">
            {isNew ? 'Create Agent' : 'Edit Agent'}
          </h1>
          <p className="mt-1 text-muted-foreground">
            Configure your conversational agent and publish to a public link
          </p>
        </div>
        <SavePublishButtons
          onSave={handleSave}
          onPublish={handlePublish}
          isSaving={saveMutation.isPending}
          isPublishing={publishMutation.isPending}
          status={agent?.status}
          hasValidationErrors={hasValidationErrors}
          validationErrors={validationErrors}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="flex gap-2 overflow-x-auto border-b border-border pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all hover:scale-[1.02] ${
                  activeTab === tab.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'metadata' && (
            <AgentMetadata
              register={form.register as never}
              watch={form.watch as never}
              setValue={form.setValue as never}
              errors={form.formState.errors}
            />
          )}

          {activeTab === 'fields' && (
            <FieldsEditor fields={fields} onFieldsChange={setFields} />
          )}

          {activeTab === 'persona' && (
            <PersonaSettings
              register={form.register as never}
              watch={form.watch as never}
              setValue={form.setValue as never}
              errors={form.formState.errors}
              onAvatarUpload={handleAvatarUpload}
              isUploading={isUploading}
            />
          )}

          {activeTab === 'appearance' && (
            <AppearanceSettings
              watch={form.watch as never}
              setValue={form.setValue as never}
            />
          )}

          {activeTab === 'context' && (
            <ContextUpload
              register={form.register as never}
              watch={form.watch as never}
              setValue={form.setValue as never}
              onFileUpload={handleFileUpload}
              onIndexKnowledge={handleIndexKnowledge}
              isUploading={isUploading}
              isIndexing={isIndexing}
            />
          )}

          {activeTab === 'advanced' && (
            <AdvancedSettings
              register={form.register as never}
              watch={form.watch as never}
              setValue={form.setValue as never}
            />
          )}
        </div>

        <div className="lg:col-span-1">
          <PreviewPane
            agentName={form.watch('name')}
            fields={fields}
            primaryColor={form.watch('appearance.primaryColor')}
            accentColor={form.watch('appearance.accentColor')}
            theme={form.watch('appearance.theme')}
            avatarUrl={form.watch('persona.avatarUrl')}
            messages={previewMessages}
            onSendMessage={handlePreviewSend}
            previewInput={previewInput}
            onPreviewInputChange={setPreviewInput}
          />
        </div>
      </div>
    </div>
  )
}
