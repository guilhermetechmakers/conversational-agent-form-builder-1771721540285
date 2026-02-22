import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Settings</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your account and workspace
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Profile</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input defaultValue="John Doe" className="mt-2" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" defaultValue="john@example.com" className="mt-2" />
          </div>
          <Button variant="accent">Save changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team & Seats</CardTitle>
          <CardDescription>Invite team members and manage roles</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="secondary">Invite member</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Webhooks</CardTitle>
          <CardDescription>Manage workspace webhooks</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="secondary">Add webhook</Button>
        </CardContent>
      </Card>
    </div>
  )
}
