import type { ChatMessage } from '@/types';

export interface IChatMessageRepository {
  findAllBySessionId(sessionId: string): Promise<ChatMessage[]>;
  findById(id: string): Promise<ChatMessage | null>;
  create(message: Omit<ChatMessage, 'id' | 'createdAt'>): Promise<ChatMessage>;
  deleteById(id: string): Promise<void>;
  deleteAllBySessionId(sessionId: string): Promise<void>;
}
