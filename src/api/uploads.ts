const API_BASE = import.meta.env.VITE_API_URL ?? '/api'

export interface UploadResponse {
  url: string
  key: string
}

/**
 * Upload file via Supabase Edge Function (object storage).
 * Client calls supabase.functions.invoke('upload-file', { body: formData })
 * or a REST endpoint that proxies to the Edge Function.
 */
export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)

  const token = localStorage.getItem('auth_token')
  const headers: HeadersInit = {}
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers,
    body: formData,
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.message ?? 'Upload failed')
  }

  const data = (await response.json()) as UploadResponse
  return data.url
}

export async function uploadFiles(files: File[]): Promise<string[]> {
  const urls = await Promise.all(files.map(uploadFile))
  return urls
}
