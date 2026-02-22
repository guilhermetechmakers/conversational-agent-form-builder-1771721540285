import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Plus, Trash2 } from 'lucide-react'
import type { AdvancedSettingsProps } from './types'

export function AdvancedSettings({ register, watch, setValue }: AdvancedSettingsProps) {
  const webhookUrls = watch('advanced.webhookUrls') ?? []
  const passcodeEnabled = watch('advanced.passcodeEnabled') ?? false

  const addWebhook = () => {
    setValue('advanced.webhookUrls', [...webhookUrls, ''])
  }

  const updateWebhook = (index: number, value: string) => {
    const next = [...webhookUrls]
    next[index] = value
    setValue('advanced.webhookUrls', next)
  }

  const removeWebhook = (index: number) => {
    setValue(
      'advanced.webhookUrls',
      webhookUrls.filter((_, i) => i !== index)
    )
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-card-hover">
      <CardHeader>
        <CardTitle>Advanced Settings</CardTitle>
        <CardDescription>
          Webhooks, passcode protection, rate limits, and session retention.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Webhook URL(s)</Label>
          <p className="mt-1 text-xs text-muted-foreground">
            Receive session data when forms are completed.
          </p>
          <div className="mt-2 space-y-2">
            {webhookUrls.map((url, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={url}
                  onChange={(e) => updateWebhook(i, e.target.value)}
                  placeholder="https://your-server.com/webhook"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeWebhook(i)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addWebhook}>
              <Plus className="mr-2 h-4 w-4" />
              Add Webhook
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div>
            <Label htmlFor="passcodeEnabled">Passcode Protection</Label>
            <p className="text-xs text-muted-foreground">
              Require a passcode to access the agent chat.
            </p>
          </div>
          <Switch
            checked={passcodeEnabled}
            onCheckedChange={(v) => setValue('advanced.passcodeEnabled', v)}
          />
        </div>
        {passcodeEnabled && (
          <div className="animate-fade-in">
            <Label htmlFor="passcode">Passcode</Label>
            <Input
              id="passcode"
              type="password"
              {...register('advanced.passcode')}
              placeholder="Enter passcode"
              className="mt-2"
            />
          </div>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="rateLimit">Rate Limit (requests/hour)</Label>
            <Input
              id="rateLimit"
              type="number"
              min={0}
              {...register('advanced.rateLimit', { valueAsNumber: true })}
              placeholder="e.g. 60"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="retentionDays">Session Retention (days)</Label>
            <Input
              id="retentionDays"
              type="number"
              min={1}
              {...register('advanced.retentionDays', { valueAsNumber: true })}
              placeholder="e.g. 30"
              className="mt-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
