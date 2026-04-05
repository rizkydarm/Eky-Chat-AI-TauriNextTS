import Database from '@tauri-apps/plugin-sql'
import type { Conversation, ChatMessage } from '@eky/types'

let db: Database | null = null

async function getDatabase(): Promise<Database> {
  if (!db) {
    db = await Database.load('sqlite:conversations.db')
  }
  return db
}

export async function initDatabase(): Promise<void> {
  const database = await getDatabase()
  
  await database.execute(`
    CREATE TABLE IF NOT EXISTS conversations (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `)

  await database.execute(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      conversation_id TEXT NOT NULL,
      content TEXT NOT NULL,
      role TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
    )
  `)
}

export async function fetchAllConversations(): Promise<Conversation[]> {
  const database = await getDatabase()
  const rows = await database.select<{
    id: string
    title: string
    created_at: string
    updated_at: string
  }[]>(`
    SELECT id, title, created_at, updated_at 
    FROM conversations 
    ORDER BY updated_at DESC
  `)

  return rows.map(row => ({
    id: row.id,
    title: row.title,
    messages: [],
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  }))
}

export async function insertConversation(conversation: Conversation): Promise<void> {
  const database = await getDatabase()
  await database.execute(`
    INSERT INTO conversations (id, title, created_at, updated_at)
    VALUES (?, ?, ?, ?)
  `, [
    conversation.id,
    conversation.title,
    conversation.createdAt.toISOString(),
    conversation.updatedAt.toISOString(),
  ])
}

export async function updateConversationTitle(id: string, title: string): Promise<void> {
  const database = await getDatabase()
  await database.execute(`
    UPDATE conversations 
    SET title = ?, updated_at = ? 
    WHERE id = ?
  `, [title, new Date().toISOString(), id])
}

export async function deleteConversationById(id: string): Promise<void> {
  const database = await getDatabase()
  await database.execute(`
    DELETE FROM conversations WHERE id = ?
  `, [id])
}
