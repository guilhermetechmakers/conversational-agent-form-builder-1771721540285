import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, Filter, Download } from 'lucide-react'

const mockSessions = [
  { id: 's1', agentName: 'Lead Capture', status: 'completed' as const, createdAt: '2025-02-22T10:30:00' },
  { id: 's2', agentName: 'Support Qualifier', status: 'active' as const, createdAt: '2025-02-22T10:25:00' },
  { id: 's3', agentName: 'Lead Capture', status: 'completed' as const, createdAt: '2025-02-22T10:15:00' },
  { id: 's4', agentName: 'Event Registration', status: 'abandoned' as const, createdAt: '2025-02-22T09:45:00' },
]

export function SessionsPage() {
  const [search, setSearch] = useState('')

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Sessions</h1>
          <p className="mt-1 text-muted-foreground">
            View and manage conversation sessions
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search sessions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="secondary">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="secondary">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-4 text-left text-sm font-medium text-muted-foreground">Session</th>
                  <th className="pb-4 text-left text-sm font-medium text-muted-foreground">Agent</th>
                  <th className="pb-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="pb-4 text-left text-sm font-medium text-muted-foreground">Created</th>
                  <th className="pb-4 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockSessions.map((session) => (
                  <tr
                    key={session.id}
                    className="border-b border-border transition-colors hover:bg-secondary/30"
                  >
                    <td className="py-4">
                      <Link
                        to={`/dashboard/sessions/${session.id}`}
                        className="font-mono text-sm text-accent hover:underline"
                      >
                        {session.id}
                      </Link>
                    </td>
                    <td className="py-4 text-muted-foreground">{session.agentName}</td>
                    <td className="py-4">
                      <Badge
                        variant={
                          session.status === 'completed'
                            ? 'success'
                            : session.status === 'active'
                            ? 'default'
                            : 'destructive'
                        }
                      >
                        {session.status}
                      </Badge>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {new Date(session.createdAt).toLocaleString()}
                    </td>
                    <td className="py-4 text-right">
                      <Link to={`/dashboard/sessions/${session.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
