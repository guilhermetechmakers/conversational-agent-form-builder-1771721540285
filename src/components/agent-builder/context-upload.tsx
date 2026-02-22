import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { FileText, Link, Database, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ContextUploadProps } from './types'

export function ContextUpload({
  register,
  watch,
  setValue,
  onFileUpload,
  onIndexKnowledge,
  isUploading = false,
  isIndexing = false,
}: ContextUploadProps) {
  const fileUrls = watch('context.fileUrls') ?? []
  const docUrls = watch('context.docUrls') ?? []

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (!files.length || !onFileUpload) return
    try {
      const urls = await onFileUpload(files)
      setValue('context.fileUrls', [...fileUrls, ...urls])
    } catch {
      // Error handled by parent
    }
    e.target.value = ''
  }

  const addDocUrl = () => {
    const url = watch('context.productDocUrl')
    if (url && !docUrls.includes(url)) {
      setValue('context.docUrls', [...docUrls, url])
      setValue('context.productDocUrl', '')
    }
  }

  const removeFileUrl = (index: number) => {
    setValue(
      'context.fileUrls',
      fileUrls.filter((_, i) => i !== index)
    )
  }

  const removeDocUrl = (index: number) => {
    setValue(
      'context.docUrls',
      docUrls.filter((_, i) => i !== index)
    )
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-card-hover">
      <CardHeader>
        <CardTitle>Context Upload</CardTitle>
        <CardDescription>
          Add FAQs, upload PDF/Markdown files, and link product docs for agent knowledge.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="faq">FAQ / Knowledge Base</Label>
          <Textarea
            id="faq"
            {...register('context.faq')}
            placeholder="Paste FAQ or knowledge base content here. The agent will use this to answer questions."
            className="mt-2 min-h-[120px]"
          />
        </div>
        <div>
          <Label>File Upload (PDF, Markdown)</Label>
          <label
            className={cn(
              'mt-2 flex min-h-[100px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/20 p-6 transition-all',
              'hover:border-accent/50 hover:bg-accent/5',
              (!onFileUpload || isUploading) && 'cursor-not-allowed opacity-50'
            )}
          >
            <input
              type="file"
              accept=".pdf,.md,.markdown"
              multiple
              className="sr-only"
              onChange={handleFileChange}
              disabled={!onFileUpload || isUploading}
            />
            <Upload className="h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              {isUploading
                ? 'Uploading...'
                : 'Drag & drop or click to upload PDF/Markdown'}
            </p>
          </label>
          {fileUrls.length > 0 && (
            <ul className="mt-2 space-y-1">
              {fileUrls.map((url, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <FileText className="h-4 w-4" />
                  {url.split('/').pop()}
                  <button
                    type="button"
                    onClick={() => removeFileUrl(i)}
                    className="text-red-400 hover:text-red-300"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <Label>URL for Product Doc</Label>
          <div className="mt-2 flex gap-2">
            <Input
              {...register('context.productDocUrl')}
              placeholder="https://docs.example.com/product"
              className="flex-1"
            />
            <Button
              type="button"
              variant="secondary"
              onClick={addDocUrl}
              disabled={!watch('context.productDocUrl')}
            >
              <Link className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
          {docUrls.length > 0 && (
            <ul className="mt-2 space-y-1">
              {docUrls.map((url, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Link className="h-4 w-4" />
                  {url}
                  <button
                    type="button"
                    onClick={() => removeDocUrl(i)}
                    className="text-red-400 hover:text-red-300"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {onIndexKnowledge && (
          <div>
            <Button
              type="button"
              variant="outline"
              onClick={onIndexKnowledge}
              disabled={isIndexing}
            >
              <Database className="mr-2 h-4 w-4" />
              {isIndexing ? 'Indexing...' : 'Index Knowledge'}
            </Button>
            <p className="mt-1 text-xs text-muted-foreground">
              Optional: Index uploaded content for semantic search.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
