import type { ChatSession } from '@/types';

export interface IChatSessionRepository {
  getAll(): Promise<ChatSession[]>;
  getById(id: string): Promise<ChatSession | null>;
  create(session: Omit<ChatSession, 'id' | 'createdAt' | 'updatedAt'>): Promise<ChatSession>;
  update(id: string, updates: Partial<Pick<ChatSession, 'title' | 'lastMessagePreview' | 'updatedAt'>>): Promise<void>;
  delete(id: string): Promise<void>;
}
