-- Agent Builder: agents table
-- Replaces invalid table name agent_builder_(create/edit) with agents

CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  fields JSONB DEFAULT '[]',
  persona JSONB DEFAULT '{}',
  appearance JSONB DEFAULT '{}',
  context JSONB DEFAULT '{}',
  advanced JSONB DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "agents_read_own" ON agents
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own data
CREATE POLICY "agents_insert_own" ON agents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own data
CREATE POLICY "agents_update_own" ON agents
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own data
CREATE POLICY "agents_delete_own" ON agents
  FOR DELETE USING (auth.uid() = user_id);

-- Public read for published agents (for chat)
CREATE POLICY "agents_public_read_published" ON agents
  FOR SELECT USING (status = 'published');

-- Storage bucket for uploads (avatars, context files)
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- RLS for storage (user_id is first folder in path; Postgres arrays are 1-based)
CREATE POLICY "uploads_insert_own" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "uploads_select_public" ON storage.objects
  FOR SELECT USING (bucket_id = 'uploads');
