export type MessageRole = 'user' | 'assistant' | 'system';

export type ChatMessage = {
  id: string;
  sessionId: string;
  role: MessageRole;
  content: string;
  createdAt: number;
};

export type ChatSession = {
  id: string;
  title: string;
  lastMessagePreview: string;
  createdAt: number;
  updatedAt: number;
};

export type AIProvider = {
  id: string;
  name: string;
  endpointUrl: string;
  apiKey: string;
  defaultModel: string;
  isDefault: boolean;
};

export type ChatSettings = {
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  topP: number;
  streamingEnabled: boolean;
};

export type UserSettings = {
  defaultProviderId: string;
  chatSettings: ChatSettings;
  fontSize: number;
};
