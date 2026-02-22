import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AppearanceSettingsProps } from './types'

const themeOptions = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

export function AppearanceSettings({ watch, setValue }: AppearanceSettingsProps) {
  const primaryColor = watch('appearance.primaryColor') ?? '#26C6FF'
  const accentColor = watch('appearance.accentColor') ?? '#00FF66'
  const theme = watch('appearance.theme') ?? 'dark'

  return (
    <Card className="transition-all duration-300 hover:shadow-card-hover">
      <CardHeader>
        <CardTitle>Appearance Settings</CardTitle>
        <CardDescription>
          Customize colors and theme for your agent&apos;s chat interface.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Primary Color</Label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setValue('appearance.primaryColor', e.target.value)}
                className="h-10 w-14 cursor-pointer rounded-lg border border-input bg-transparent"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setValue('appearance.primaryColor', e.target.value)}
                className="flex h-10 flex-1 rounded-lg border border-input bg-background px-3 py-2 font-mono text-sm"
              />
            </div>
          </div>
          <div>
            <Label>Accent Color</Label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setValue('appearance.accentColor', e.target.value)}
                className="h-10 w-14 cursor-pointer rounded-lg border border-input bg-transparent"
              />
              <input
                type="text"
                value={accentColor}
                onChange={(e) => setValue('appearance.accentColor', e.target.value)}
                className="flex h-10 flex-1 rounded-lg border border-input bg-background px-3 py-2 font-mono text-sm"
              />
            </div>
          </div>
        </div>
        <div>
          <Label>Theme</Label>
          <div className="mt-2 flex gap-2">
            {themeOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setValue('appearance.theme', opt.value as 'light' | 'dark')}
                className={cn(
                  'flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-all',
                  theme === opt.value
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-input hover:border-accent/30'
                )}
              >
                {opt.value === 'light' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label>Logo / Avatar Preview</Label>
          <div
            className="mt-2 flex h-24 items-center justify-center rounded-xl border border-border"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
            }}
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                color: 'white',
              }}
            >
              A
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
