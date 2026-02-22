import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Save,
  Send,
  Settings,
  MessageSquare,
  Palette,
  FileText,
  Shield,
  Plus,
  GripVertical,
  Trash2,
} from 'lucide-react'
import type { FieldType } from '@/types'

const metadataSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  description: z.string().optional(),
})

type MetadataForm = z.infer<typeof metadataSchema>

const fieldTypes: { value: FieldType; label: string }[] = [
  { value: 'text', label: 'Text' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'number', label: 'Number' },
  { value: 'select', label: 'Select' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'date', label: 'Date' },
]

export function AgentBuilderPage() {
  const { id } = useParams()
  const isNew = id === 'new'
  const [activeTab, setActiveTab] = useState<'metadata' | 'fields' | 'persona' | 'appearance' | 'context' | 'advanced'>('metadata')
  const [fields, setFields] = useState<Array<{ id: string; type: FieldType; name: string; label: string; required: boolean }>>([
    { id: '1', type: 'text', name: 'full_name', label: 'Full Name', required: true },
    { id: '2', type: 'email', name: 'email', label: 'Email', required: true },
  ])

  const form = useForm<MetadataForm>({
    resolver: zodResolver(metadataSchema),
    defaultValues: {
      name: isNew ? '' : 'Lead Capture',
      slug: isNew ? '' : 'lead-capture',
      description: '',
    },
  })

  const onSubmit = (data: MetadataForm) => {
    console.log(data)
  }

  const addField = () => {
    setFields((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: 'text',
        name: `field_${prev.length + 1}`,
        label: `Field ${prev.length + 1}`,
        required: false,
      },
    ])
  }

  const removeField = (fieldId: string) => {
    setFields((prev) => prev.filter((f) => f.id !== fieldId))
  }

  const tabs = [
    { id: 'metadata' as const, label: 'Metadata', icon: Settings },
    { id: 'fields' as const, label: 'Fields', icon: MessageSquare },
    { id: 'persona' as const, label: 'Persona', icon: MessageSquare },
    { id: 'appearance' as const, label: 'Appearance', icon: Palette },
    { id: 'context' as const, label: 'Context', icon: FileText },
    { id: 'advanced' as const, label: 'Advanced', icon: Shield },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">
            {isNew ? 'Create Agent' : 'Edit Agent'}
          </h1>
          <p className="mt-1 text-muted-foreground">
            Configure your conversational agent and publish to a public link
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => form.handleSubmit(onSubmit)()}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button variant="accent">
            <Send className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Builder panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-2 overflow-x-auto border-b border-border pb-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {activeTab === 'metadata' && (
            <Card>
              <CardHeader>
                <CardTitle>Agent Metadata</CardTitle>
                <CardDescription>Basic information about your agent</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      {...form.register('name')}
                      placeholder="e.g. Lead Capture"
                      className="mt-2"
                    />
                    {form.formState.errors.name && (
                      <p className="mt-1 text-sm text-red-400">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug (URL path)</Label>
                    <Input
                      id="slug"
                      {...form.register('slug')}
                      placeholder="e.g. lead-capture"
                      className="mt-2"
                    />
                    {form.formState.errors.slug && (
                      <p className="mt-1 text-sm text-red-400">{form.formState.errors.slug.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      {...form.register('description')}
                      placeholder="Optional description"
                      className="mt-2"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === 'fields' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Fields</CardTitle>
                  <CardDescription>Configure fields to collect conversationally</CardDescription>
                </div>
                <Button variant="accent" size="sm" onClick={addField}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Field
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fields.map((field) => (
                    <div
                      key={field.id}
                      className="flex items-center gap-4 rounded-lg border border-border p-4"
                    >
                      <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs">Label</Label>
                          <Input
                            value={field.label}
                            onChange={(e) =>
                              setFields((prev) =>
                                prev.map((f) =>
                                  f.id === field.id ? { ...f, label: e.target.value } : f
                                )
                              )
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Type</Label>
                          <select
                            value={field.type}
                            onChange={(e) =>
                              setFields((prev) =>
                                prev.map((f) =>
                                  f.id === field.id
                                    ? { ...f, type: e.target.value as FieldType }
                                    : f
                                )
                              )
                            }
                            className="mt-1 flex h-10 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm"
                          >
                            {fieldTypes.map((t) => (
                              <option key={t.value} value={t.value}>
                                {t.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) =>
                            setFields((prev) =>
                              prev.map((f) =>
                                f.id === field.id ? { ...f, required: e.target.checked } : f
                              )
                            )
                          }
                          className="rounded border-input"
                        />
                        <span className="text-sm">Required</span>
                      </label>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeField(field.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'persona' && (
            <Card>
              <CardHeader>
                <CardTitle>Persona Settings</CardTitle>
                <CardDescription>Tone and system instructions for the agent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Tone</Label>
                  <select className="mt-2 flex h-10 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm">
                    <option>Professional</option>
                    <option>Friendly</option>
                    <option>Casual</option>
                  </select>
                </div>
                <div>
                  <Label>System Instructions</Label>
                  <textarea
                    placeholder="Instructions for how the agent should behave..."
                    className="mt-2 flex min-h-[120px] w-full rounded-lg border border-input bg-background px-4 py-2 text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Colors and branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div>
                    <Label>Primary Color</Label>
                    <input type="color" defaultValue="#26C6FF" className="mt-2 h-10 w-20 rounded border" />
                  </div>
                  <div>
                    <Label>Accent Color</Label>
                    <input type="color" defaultValue="#00FF66" className="mt-2 h-10 w-20 rounded border" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'context' && (
            <Card>
              <CardHeader>
                <CardTitle>Context</CardTitle>
                <CardDescription>FAQs, documents, URLs for agent knowledge</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>FAQ / Knowledge</Label>
                  <textarea
                    placeholder="Paste FAQ or knowledge base content..."
                    className="mt-2 flex min-h-[120px] w-full rounded-lg border border-input bg-background px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <Label>Upload Files (PDF, Markdown)</Label>
                  <div className="mt-2 flex h-24 items-center justify-center rounded-lg border border-dashed border-border">
                    <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'advanced' && (
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>Webhooks, passcode, rate limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Webhook URL</Label>
                  <Input placeholder="https://..." className="mt-2" />
                </div>
                <div>
                  <Label>Passcode Protection</Label>
                  <Input type="password" placeholder="Optional" className="mt-2" />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Preview pane */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>Live chat preview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border bg-background p-4">
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-accent/20" />
                  <span className="text-sm font-medium">
                    {form.watch('name') || 'Agent'}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="rounded-lg bg-secondary/50 p-3 text-sm">
                    Hi! I&apos;m here to help. What&apos;s your name?
                  </div>
                  <div className="ml-auto max-w-[80%] rounded-lg bg-accent/20 p-3 text-sm">
                    John Doe
                  </div>
                  <div className="rounded-lg bg-secondary/50 p-3 text-sm">
                    Nice to meet you, John! What&apos;s your email address?
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Input placeholder="Type a message..." className="flex-1" />
                  <Button size="icon">Send</Button>
                </div>
                <div className="mt-2 flex gap-1">
                  {fields.filter((f) => f.required).map((f) => (
                    <Badge key={f.id} variant="secondary" className="text-xs">
                      {f.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
