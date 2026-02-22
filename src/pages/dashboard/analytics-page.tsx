import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const sessionsData = [
  { date: 'Feb 16', sessions: 120, completions: 85 },
  { date: 'Feb 17', sessions: 145, completions: 98 },
  { date: 'Feb 18', sessions: 132, completions: 92 },
  { date: 'Feb 19', sessions: 168, completions: 115 },
  { date: 'Feb 20', sessions: 155, completions: 108 },
  { date: 'Feb 21', sessions: 178, completions: 124 },
  { date: 'Feb 22', sessions: 142, completions: 98 },
]

export function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Analytics</h1>
          <p className="mt-1 text-muted-foreground">
            Agent performance and key metrics
          </p>
        </div>
        <Button variant="secondary">Export CSV</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sessions Over Time</CardTitle>
          <CardDescription>Daily sessions and completions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sessionsData}>
                <defs>
                  <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(38, 198, 255)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="rgb(38, 198, 255)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(49, 52, 58)" />
                <XAxis dataKey="date" stroke="rgb(192, 198, 209)" fontSize={12} />
                <YAxis stroke="rgb(192, 198, 209)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgb(35, 38, 43)',
                    border: '1px solid rgb(49, 52, 58)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'rgb(255, 255, 255)' }}
                />
                <Area
                  type="monotone"
                  dataKey="sessions"
                  stroke="rgb(38, 198, 255)"
                  fillOpacity={1}
                  fill="url(#colorSessions)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="completions"
                  stroke="rgb(0, 255, 102)"
                  fillOpacity={0}
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
