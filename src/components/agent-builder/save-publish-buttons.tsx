import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Save, Send, Loader2, CheckCircle } from 'lucide-react'
interface SavePublishButtonsProps {
  onSave: () => void
  onPublish: () => void
  isSaving?: boolean
  isPublishing?: boolean
  status?: 'draft' | 'published'
  hasValidationErrors?: boolean
  validationErrors?: string[]
}

export function SavePublishButtons({
  onSave,
  onPublish,
  isSaving = false,
  isPublishing = false,
  status = 'draft',
  hasValidationErrors = false,
  validationErrors = [],
}: SavePublishButtonsProps) {
  const isBusy = isSaving || isPublishing

  return (
    <div className="flex flex-wrap items-center gap-3">
      {status === 'published' && (
        <Badge variant="success" className="gap-1">
          <CheckCircle className="h-3 w-3" />
          Published
        </Badge>
      )}
      {hasValidationErrors && validationErrors.length > 0 && (
        <span className="text-sm text-red-400">
          {validationErrors[0]}
        </span>
      )}
      <Button
        variant="secondary"
        onClick={onSave}
        disabled={isBusy || hasValidationErrors}
        isLoading={isSaving}
        className="transition-transform hover:scale-[1.02]"
      >
        {isSaving ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Save className="mr-2 h-4 w-4" />
        )}
        Save Draft
      </Button>
      <Button
        variant="accent"
        onClick={onPublish}
        disabled={isBusy || hasValidationErrors}
        isLoading={isPublishing}
        className="transition-transform hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(38,198,255,0.4)]"
      >
        {isPublishing ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Send className="mr-2 h-4 w-4" />
        )}
        Publish
      </Button>
    </div>
  )
}
