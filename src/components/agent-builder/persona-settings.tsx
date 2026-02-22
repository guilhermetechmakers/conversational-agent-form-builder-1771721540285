import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, type SelectOption } from '@/components/ui/select'
import { Upload, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PersonaSettingsProps } from './types'

const toneOptions: SelectOption[] = [
  { value: 'formal', label: 'Formal' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'sales-y', label: 'Sales-y' },
]

export function PersonaSettings({
  register,
  watch,
  setValue,
  errors,
  onAvatarUpload,
  isUploading = false,
}: PersonaSettingsProps) {
  const avatarUrl = watch('persona.avatarUrl') as string

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !onAvatarUpload) return
    try {
      const url = await onAvatarUpload(file)
      setValue('persona.avatarUrl', url)
    } catch {
      // Error handled by parent
    }
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-card-hover">
      <CardHeader>
        <CardTitle>Persona Settings</CardTitle>
        <CardDescription>
          Set the tone, system instructions, and avatar for your agent.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="tone">Tone</Label>
          <Select
            id="tone"
            options={toneOptions}
            value={watch('persona.tone')}
            onChange={(e) => setValue('persona.tone', e.target.value as 'formal' | 'friendly' | 'sales-y')}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="systemInstructions">System Instructions</Label>
          <Textarea
            id="systemInstructions"
            {...register('persona.systemInstructions')}
            placeholder="Instructions for how the agent should behave, e.g. 'You are a helpful assistant that collects lead information. Be concise and friendly.'"
            className="mt-2 min-h-[120px]"
          />
          {errors.persona?.systemInstructions?.message && (
            <p className="mt-1 text-sm text-red-400">
              {String(errors.persona.systemInstructions.message)}
            </p>
          )}
        </div>
        <div>
          <Label>Avatar Upload</Label>
          <div className="mt-2 flex items-center gap-4">
            <div
              className={cn(
                'flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-border bg-secondary/50',
                'transition-all hover:border-accent/50 hover:bg-accent/5'
              )}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Agent avatar"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleFileChange}
                  disabled={!onAvatarUpload || isUploading}
                />
                <span
                  className={cn(
                    'inline-flex items-center gap-2 rounded-lg border border-input px-4 py-2 text-sm transition-all',
                    'hover:border-accent/50 hover:bg-accent/5',
                    (!onAvatarUpload || isUploading) && 'cursor-not-allowed opacity-50'
                  )}
                >
                  <Upload className="h-4 w-4" />
                  {isUploading ? 'Uploading...' : 'Upload avatar'}
                </span>
              </label>
              <p className="mt-1 text-xs text-muted-foreground">
                PNG, JPG, or WebP. Max 2MB.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
