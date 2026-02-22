import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { AlertCircle, Home } from 'lucide-react'

export function ErrorPage() {
  const is404 = true

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-accent/20">
          <AlertCircle className="h-12 w-12 text-accent" />
        </div>
        <h1 className="mt-6 text-4xl font-bold text-foreground">
          {is404 ? '404' : 'Something went wrong'}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {is404
            ? "The page you're looking for doesn't exist."
            : 'An unexpected error occurred.'}
        </p>
        <Link to="/" className="mt-8 inline-block">
          <Button variant="accent" className="gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
