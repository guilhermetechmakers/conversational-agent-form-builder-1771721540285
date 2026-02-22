import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { AppRouter } from '@/routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgb(35, 38, 43)',
            border: '1px solid rgb(49, 52, 58)',
            color: 'rgb(255, 255, 255)',
          },
        }}
      />
    </QueryClientProvider>
  )
}
