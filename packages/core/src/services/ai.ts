import type { ChatMessage, Conversation } from '@eky/types'

export interface AIService {
  sendMessage(content: string, history: ChatMessage[]): Promise<string>
  streamMessage(
    content: string,
    history: ChatMessage[],
    onChunk: (chunk: string) => void
  ): Promise<void>
}

export class MockAIService implements AIService {
  async sendMessage(_content: string, _history: ChatMessage[]): Promise<string> {
    return 'This is a mock AI response. Replace with actual AI API integration.'
  }

  async streamMessage(
    _content: string,
    _history: ChatMessage[],
    onChunk: (chunk: string) => void
  ): Promise<void> {
    const chunks = ['This', ' is', ' a', ' streaming', ' response', '.']
    for (const chunk of chunks) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      onChunk(chunk)
    }
  }
}

export class ChatService {
  constructor(private aiService: AIService) {}

  async sendMessage(
    conversation: Conversation,
    content: string
  ): Promise<ChatMessage> {
    const response = await this.aiService.sendMessage(
      content,
      conversation.messages
    )

    return {
      id: crypto.randomUUID(),
      content: response,
      role: 'assistant',
      timestamp: new Date(),
    }
  }
}
