import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bot, MessageSquare, TrendingUp, Plus, ArrowRight } from 'lucide-react'

const stats = [
  { label: 'Total Sessions', value: '1,247', trend: '+12%', icon: MessageSquare },
  { label: 'Completions', value: '892', trend: '+8%', icon: TrendingUp },
  { label: 'Active Agents', value: '12', trend: '+2', icon: Bot },
]

const recentAgents = [
  { id: '1', name: 'Lead Capture', sessions: 156, conversion: 72, status: 'published' as const },
  { id: '2', name: 'Support Qualifier', sessions: 89, conversion: 65, status: 'published' as const },
  { id: '3', name: 'Event Registration', sessions: 0, conversion: 0, status: 'draft' as const },
]

const recentSessions = [
  { id: 's1', agentName: 'Lead Capture', status: 'completed', time: '2 min ago' },
  { id: 's2', agentName: 'Support Qualifier', status: 'active', time: '5 min ago' },
  { id: 's3', agentName: 'Lead Capture', status: 'completed', time: '12 min ago' },
]

export function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Monitor agent performance and manage your conversational flows
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="animate-fade-in-up">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{stat.value}</div>
              <p className="text-xs text-accent-green">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Agent List */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Agents</CardTitle>
              <CardDescription>Your conversational agents</CardDescription>
            </div>
            <Link to="/dashboard/agents/new">
              <Button variant="accent" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Create
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAgents.map((agent) => (
                <Link
                  key={agent.id}
                  to={`/dashboard/agents/${agent.id}`}
                  className="block rounded-lg border border-border p-4 transition-colors hover:border-accent/30 hover:bg-secondary/50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {agent.sessions} sessions · {agent.conversion}% conversion
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={agent.status === 'published' ? 'success' : 'secondary'}
                      >
                        {agent.status}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
            <CardDescription>Latest visitor interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSessions.map((session) => (
                <Link
                  key={session.id}
                  to={`/dashboard/sessions/${session.id}`}
                  className="block rounded-lg border border-border p-4 transition-colors hover:border-accent/30 hover:bg-secondary/50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{session.agentName}</p>
                      <p className="text-sm text-muted-foreground">{session.time}</p>
                    </div>
                    <Badge
                      variant={
                        session.status === 'completed' ? 'success' : 'default'
                      }
                    >
                      {session.status}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
