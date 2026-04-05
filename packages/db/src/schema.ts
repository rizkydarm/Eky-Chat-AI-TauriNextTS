export interface DBSchema {
  conversations: {
    id: string
    title: string
    created_at: string
    updated_at: string
  }
  messages: {
    id: string
    conversation_id: string
    content: string
    role: 'user' | 'assistant'
    timestamp: string
  }
}

export const CREATE_TABLES_SQL = `
CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  content TEXT NOT NULL,
  role TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);
`
