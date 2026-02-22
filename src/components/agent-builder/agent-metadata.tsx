import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AgentMetadataProps } from './types'

function getErrorMessage(err: unknown): string | null {
  if (typeof err === 'string') return err
  if (err && typeof err === 'object' && 'message' in err && typeof (err as { message: unknown }).message === 'string') {
    return (err as { message: string }).message
  }
  return null
}

export function AgentMetadata({ register, watch, setValue, errors }: AgentMetadataProps) {
  const tags: string[] = Array.isArray(watch('tags')) ? (watch('tags') as string[]) : []
  const name: string = typeof watch('name') === 'string' ? watch('name') : ''

  const slugFromName = (n: string) =>
    n
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

  const handleNameBlur = () => {
    const currentSlug = typeof watch('slug') === 'string' ? watch('slug') : ''
    if (!currentSlug && name) {
      setValue('slug', slugFromName(name))
    }
  }

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const value = input.value.trim()
    if ((e.key === 'Enter' || e.key === ',') && value && !tags.includes(value)) {
      e.preventDefault()
      setValue('tags', [...tags, value])
      input.value = ''
    }
  }

  const removeTag = (index: number) => {
    setValue(
      'tags',
      tags.filter((_, i) => i !== index)
    )
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-card-hover">
      <CardHeader>
        <CardTitle>Agent Metadata</CardTitle>
        <CardDescription>
          Basic information about your agent. The slug is used in the public URL path.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register('name', { required: 'Name is required' })}
            placeholder="e.g. Lead Capture"
            className="mt-2"
            onBlur={handleNameBlur}
          />
          {errors.name && getErrorMessage(errors.name) && (
            <p className="mt-1 text-sm text-red-400">{getErrorMessage(errors.name)}</p>
          )}
        </div>
        <div>
          <Label htmlFor="slug">Slug (Public Path)</Label>
          <Input
            id="slug"
            {...register('slug', {
              required: 'Slug is required',
              pattern: {
                value: /^[a-z0-9-]+$/,
                message: 'Slug must be lowercase with hyphens only',
              },
            })}
            placeholder="e.g. lead-capture"
            className="mt-2 font-mono text-sm"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Public URL: /chat/{(typeof watch('slug') === 'string' ? watch('slug') : '') || 'your-slug'}
          </p>
          {errors.slug && getErrorMessage(errors.slug) && (
            <p className="mt-1 text-sm text-red-400">{getErrorMessage(errors.slug)}</p>
          )}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            {...register('description')}
            placeholder="Optional description for your agent"
            className="mt-2"
          />
        </div>
        <div>
          <Label>Tags</Label>
          <div className="mt-2 flex flex-wrap gap-2 rounded-lg border border-input bg-background p-2">
            {tags.map((tag, i) => (
              <Badge
                key={`${tag}-${i}`}
                variant="secondary"
                className="gap-1 pr-1 transition-all hover:scale-105"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(i)}
                  className="rounded-full p-0.5 hover:bg-secondary"
                  aria-label={`Remove tag ${tag}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Input
              placeholder="Add tag (Enter or comma)"
              className={cn(
                'min-w-[120px] flex-1 border-0 bg-transparent p-0 focus-visible:ring-0'
              )}
              onKeyDown={addTag}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
