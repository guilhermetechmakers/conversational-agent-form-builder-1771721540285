import { useParams, useLocation, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const privacyContent = `
## Privacy Policy

Last updated: February 2025

### Data Collection
We collect information you provide when using our service, including agent configurations, session transcripts, and captured field values.

### Data Retention
Session data is retained according to your configured retention policy. You can request deletion at any time.

### PII Handling
Fields marked as PII are encrypted at rest. We do not share your data with third parties except as required for service operation.

### Processors
We use trusted infrastructure providers for hosting and processing. All processors comply with applicable data protection regulations.
`

const termsContent = `
## Terms of Service

Last updated: February 2025

### Acceptance
By using Agent Builder, you agree to these terms.

### Use of Service
You may use the service to create and publish conversational agents. You are responsible for the content and behavior of your agents.

### Prohibited Uses
You may not use the service for illegal activities, spam, or to collect data without consent.

### Limitation of Liability
We provide the service "as is." We are not liable for indirect or consequential damages.
`

export function LegalPage() {
  const { type } = useParams()
  const location = useLocation()
  const pathType = type ?? (location.pathname.includes('privacy') ? 'privacy' : 'terms')
  const isPrivacy = pathType === 'privacy'
  const content = isPrivacy ? privacyContent : termsContent
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service'

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <h1 className="mt-8 text-3xl font-semibold text-foreground">{title}</h1>
        <div className="prose prose-invert mt-8 max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-sm text-muted-foreground">
            {content.trim()}
          </pre>
        </div>
      </div>
    </div>
  )
}
