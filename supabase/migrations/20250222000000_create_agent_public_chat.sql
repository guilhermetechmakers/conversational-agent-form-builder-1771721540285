-- agent_public_chat table
CREATE TABLE IF NOT EXISTS agent_public_chat (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE agent_public_chat ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "agent_public_chat_read_own" ON agent_public_chat
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own data
CREATE POLICY "agent_public_chat_insert_own" ON agent_public_chat
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own data
CREATE POLICY "agent_public_chat_update_own" ON agent_public_chat
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own data
CREATE POLICY "agent_public_chat_delete_own" ON agent_public_chat
  FOR DELETE USING (auth.uid() = user_id);
