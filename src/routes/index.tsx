import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { LandingPage } from '@/pages/landing-page'
import { DashboardPage } from '@/pages/dashboard/dashboard-page'
import { AgentsPage } from '@/pages/dashboard/agents-page'
import { AgentBuilderPage } from '@/pages/dashboard/agent-builder-page'
import { SessionsPage } from '@/pages/dashboard/sessions-page'
import { SessionViewerPage } from '@/pages/dashboard/session-viewer-page'
import { SettingsPage } from '@/pages/dashboard/settings-page'
import { AnalyticsPage } from '@/pages/dashboard/analytics-page'
import { PublicChatPage } from '@/pages/chat/public-chat-page'
import AgentPublicChat from '@/pages/AgentPublicChat'
import { LoginPage } from '@/pages/auth/login-page'
import { SignupPage } from '@/pages/auth/signup-page'
import { ForgotPasswordPage } from '@/pages/auth/forgot-password-page'
import { HelpPage } from '@/pages/help-page'
import { ErrorPage } from '@/pages/error-page'
import { LegalPage } from '@/pages/legal-page'

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/help', element: <HelpPage /> },
  { path: '/privacy', element: <Navigate to="/legal/privacy" replace /> },
  { path: '/terms', element: <Navigate to="/legal/terms" replace /> },
  { path: '/legal/:type', element: <LegalPage /> },
  { path: '/chat/:slug', element: <PublicChatPage /> },
  { path: '/agent-public-chat', element: <AgentPublicChat /> },
  { path: '/agent-public-chat/:slug', element: <AgentPublicChat /> },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'agents', element: <AgentsPage /> },
      { path: 'agents/new', element: <AgentBuilderPage /> },
      { path: 'agents/:id', element: <AgentBuilderPage /> },
      { path: 'sessions', element: <SessionsPage /> },
      { path: 'sessions/:id', element: <SessionViewerPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
    ],
  },
  { path: '*', element: <ErrorPage /> },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
