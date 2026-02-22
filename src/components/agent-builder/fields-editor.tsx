import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, type SelectOption } from '@/components/ui/select'
import { ChevronUp, ChevronDown, Plus, Trash2 } from 'lucide-react'
import type { AgentField, FieldType } from '@/types'

const fieldTypes: SelectOption[] = [
  { value: 'text', label: 'Text' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'number', label: 'Number' },
  { value: 'select', label: 'Select' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'date', label: 'Date' },
]

interface FieldsEditorProps {
  fields: AgentField[]
  onFieldsChange: (fields: AgentField[]) => void
}

export function FieldsEditor({ fields, onFieldsChange }: FieldsEditorProps) {
  const addField = () => {
    onFieldsChange([
      ...fields,
      {
        id: crypto.randomUUID(),
        type: 'text' as FieldType,
        name: `field_${fields.length + 1}`,
        label: `Field ${fields.length + 1}`,
        required: false,
        placeholder: '',
        sampleData: '',
      },
    ])
  }

  const removeField = (id: string) => {
    onFieldsChange(fields.filter((f) => f.id !== id))
  }

  const updateField = (id: string, updates: Partial<AgentField>) => {
    onFieldsChange(
      fields.map((f) => (f.id === id ? { ...f, ...updates } : f))
    )
  }

  const moveField = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= fields.length) return
    const next = [...fields]
    ;[next[index], next[newIndex]] = [next[newIndex], next[index]]
    onFieldsChange(next)
  }

  const addOption = (fieldId: string) => {
    const field = fields.find((f) => f.id === fieldId)
    if (!field || field.type !== 'select') return
    const options = field.options ?? []
    const newOpt = { label: `Option ${options.length + 1}`, value: `opt_${options.length + 1}` }
    updateField(fieldId, { options: [...options, newOpt] })
  }

  const updateOption = (fieldId: string, optIndex: number, label: string, value: string) => {
    const field = fields.find((f) => f.id === fieldId)
    if (!field?.options) return
    const next = [...field.options]
    next[optIndex] = { label, value: value || label.toLowerCase().replace(/\s/g, '-') }
    updateField(fieldId, { options: next })
  }

  const removeOption = (fieldId: string, optIndex: number) => {
    const field = fields.find((f) => f.id === fieldId)
    if (!field?.options) return
    updateField(fieldId, {
      options: field.options.filter((_, i) => i !== optIndex),
    })
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-card-hover">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Fields Editor</CardTitle>
          <CardDescription>
            Add, remove, and reorder fields. Configure validation, placeholders, and sample data.
          </CardDescription>
        </div>
        <Button
          variant="accent"
          size="sm"
          onClick={addField}
          className="transition-transform hover:scale-105"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Field
        </Button>
      </CardHeader>
      <CardContent>
        {fields.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12">
            <p className="text-sm font-medium text-muted-foreground">No fields yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Add fields to collect data conversationally
            </p>
            <Button variant="outline" size="sm" className="mt-4" onClick={addField}>
              <Plus className="mr-2 h-4 w-4" />
              Add First Field
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="animate-fade-in rounded-lg border border-border bg-card/50 p-4 transition-all hover:border-accent/30"
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col gap-1 pt-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => moveField(index, 'up')}
                      disabled={index === 0}
                      aria-label="Move up"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => moveField(index, 'down')}
                      disabled={index === fields.length - 1}
                      aria-label="Move down"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label className="text-xs">Label</Label>
                        <Input
                          value={field.label}
                          onChange={(e) =>
                            updateField(field.id, {
                              label: e.target.value,
                              name: e.target.value
                                .toLowerCase()
                                .replace(/\s+/g, '_')
                                .replace(/[^a-z0-9_]/g, '') || field.name,
                            })
                          }
                          placeholder="e.g. Full Name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Type</Label>
                        <Select
                          options={fieldTypes}
                          value={field.type}
                          onChange={(e) =>
                            updateField(field.id, { type: e.target.value as FieldType })
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label className="text-xs">Placeholder</Label>
                        <Input
                          value={field.placeholder ?? ''}
                          onChange={(e) =>
                            updateField(field.id, { placeholder: e.target.value })
                          }
                          placeholder="e.g. Enter your name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Sample Data</Label>
                        <Input
                          value={field.sampleData ?? ''}
                          onChange={(e) =>
                            updateField(field.id, { sampleData: e.target.value })
                          }
                          placeholder="For preview/testing"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) =>
                            updateField(field.id, { required: e.target.checked })
                          }
                          className="rounded border-input"
                        />
                        <span className="text-sm">Required</span>
                      </label>
                    </div>
                    {field.type === 'select' && (
                      <div>
                        <Label className="text-xs">Options</Label>
                        <div className="mt-2 space-y-2">
                          {(field.options ?? []).map((opt, i) => (
                            <div key={i} className="flex gap-2">
                              <Input
                                value={opt.label}
                                onChange={(e) =>
                                  updateOption(
                                    field.id,
                                    i,
                                    e.target.value,
                                    opt.value
                                  )
                                }
                                placeholder="Option label"
                                className="flex-1"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeOption(field.id, i)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addOption(field.id)}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Option
                          </Button>
                        </div>
                      </div>
                    )}
                    {(field.type === 'text' ||
                      field.type === 'email' ||
                      field.type === 'number') && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label className="text-xs">Min Length</Label>
                          <Input
                            type="number"
                            min={0}
                            value={field.validation?.minLength ?? ''}
                            onChange={(e) =>
                              updateField(field.id, {
                                validation: {
                                  ...field.validation,
                                  minLength: e.target.value
                                    ? parseInt(e.target.value, 10)
                                    : undefined,
                                },
                              })
                            }
                            placeholder="Optional"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Max Length</Label>
                          <Input
                            type="number"
                            min={0}
                            value={field.validation?.maxLength ?? ''}
                            onChange={(e) =>
                              updateField(field.id, {
                                validation: {
                                  ...field.validation,
                                  maxLength: e.target.value
                                    ? parseInt(e.target.value, 10)
                                    : undefined,
                                },
                              })
                            }
                            placeholder="Optional"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeField(field.id)}
                    className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    aria-label={`Remove ${field.label}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
