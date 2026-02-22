import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Book, Mail } from 'lucide-react'

const articles = [
  { id: '1', title: 'Getting Started', description: 'Create your first agent in 5 minutes' },
  { id: '2', title: 'Field Configuration', description: 'Configure text, email, select, and more' },
  { id: '3', title: 'Webhook Setup', description: 'Forward sessions to your CRM or API' },
  { id: '4', title: 'API Reference', description: 'Integrate with our REST API' },
]

export function HelpPage() {
  const [search, setSearch] = useState('')

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl font-semibold text-foreground">Help & Documentation</h1>
        <p className="mt-2 text-muted-foreground">
          Find answers and learn how to use Agent Builder
        </p>

        <div className="relative mt-8">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <Card key={article.id} className="cursor-pointer transition-colors hover:border-accent/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Book className="h-5 w-5 text-accent" />
                  {article.title}
                </CardTitle>
                <CardDescription>{article.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-accent" />
              Contact Support
            </CardTitle>
            <CardDescription>Need help? Reach out to our team</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              support@agentbuilder.example.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
