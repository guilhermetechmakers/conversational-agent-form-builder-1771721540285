import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Plus, Search, MoreVertical, ExternalLink } from 'lucide-react'

const mockAgents = [
  { id: '1', name: 'Lead Capture', slug: 'lead-capture', sessions: 156, conversion: 72, status: 'published' as const },
  { id: '2', name: 'Support Qualifier', slug: 'support-qualifier', sessions: 89, conversion: 65, status: 'published' as const },
  { id: '3', name: 'Event Registration', slug: 'event-reg', sessions: 0, conversion: 0, status: 'draft' as const },
]

export function AgentsPage() {
  const [search, setSearch] = useState('')

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Agents</h1>
          <p className="mt-1 text-muted-foreground">
            Create and manage your conversational agents
          </p>
        </div>
        <Link to="/dashboard/agents/new">
          <Button variant="accent" className="gap-2">
            <Plus className="h-4 w-4" />
            Create Agent
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="secondary">Filter</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-4 text-left text-sm font-medium text-muted-foreground">Agent</th>
                  <th className="pb-4 text-left text-sm font-medium text-muted-foreground">Sessions</th>
                  <th className="pb-4 text-left text-sm font-medium text-muted-foreground">Conversion</th>
                  <th className="pb-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="pb-4 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockAgents.map((agent) => (
                  <tr
                    key={agent.id}
                    className="border-b border-border transition-colors hover:bg-secondary/30"
                  >
                    <td className="py-4">
                      <Link
                        to={`/dashboard/agents/${agent.id}`}
                        className="font-medium text-foreground hover:text-accent"
                      >
                        {agent.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">/{agent.slug}</p>
                    </td>
                    <td className="py-4 text-muted-foreground">{agent.sessions}</td>
                    <td className="py-4 text-muted-foreground">{agent.conversion}%</td>
                    <td className="py-4">
                      <Badge variant={agent.status === 'published' ? 'success' : 'secondary'}>
                        {agent.status}
                      </Badge>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <a href={`/chat/${agent.slug}`} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
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
