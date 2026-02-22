import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Bot, MessageSquare, Zap, ArrowRight } from 'lucide-react'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 md:px-6 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-green/5" />
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Turn Forms Into
              <span className="block bg-gradient-to-r from-accent to-accent-green bg-clip-text text-transparent">
                Conversations
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Create AI-powered conversational agents that collect structured data through natural chat.
              No code required. Publish in minutes.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/signup">
                <Button variant="accent" size="lg" className="gap-2 text-base">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/agent-public-chat/lead-capture">
                <Button variant="outline" size="lg" className="gap-2">
                  Try Demo Agent
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Bento grid */}
      <section className="border-t border-border px-4 py-24 md:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-semibold text-foreground">
            Everything you need to capture leads conversationally
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Build, customize, and publish AI agents that feel human.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-card-hover">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                <Bot className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-4 font-semibold">Agent Builder</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Configure fields, persona, and appearance. No coding required.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-card-hover">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                <MessageSquare className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-4 font-semibold">Public Chat Links</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Publish unique URLs. Visitors chat naturally. Data flows to you.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-card-hover">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-4 font-semibold">Webhooks & Export</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Forward completed sessions to CRMs. Export JSON/CSV. Full transcripts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-4 py-24 md:px-6">
        <div className="mx-auto max-w-4xl rounded-2xl border border-accent/30 bg-card p-12 text-center">
          <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
            Ready to boost your conversions?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join teams using conversational capture to qualify leads better.
          </p>
          <Link to="/signup" className="mt-8 inline-block">
            <Button variant="accent" size="lg">
              Start Building Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-12 md:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <span className="text-sm text-muted-foreground">© 2025 Agent Builder</span>
          <div className="flex gap-6">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">
              Login
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
