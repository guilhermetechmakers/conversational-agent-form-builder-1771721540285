import { useQuery } from '@tanstack/react-query'
import { fetchAgentBySlug } from '@/api/agents'

const QUERY_KEY = ['agent-by-slug'] as const

export function useAgentBySlug(slug: string | undefined, enabled = true) {
  return useQuery({
    queryKey: [...QUERY_KEY, slug ?? ''],
    queryFn: () => fetchAgentBySlug(slug!),
    enabled: Boolean(slug) && enabled,
  })
}
