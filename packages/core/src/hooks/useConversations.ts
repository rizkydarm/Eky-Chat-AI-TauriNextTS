import { useState, useEffect, useCallback } from 'react'
import type { Conversation } from '@eky/types'

interface UseConversationsReturn {
  conversations: Conversation[]
  isLoading: boolean
  createConversation: (title: string) => Promise<Conversation>
  deleteConversation: (id: string) => Promise<void>
  updateConversation: (id: string, updates: Partial<Conversation>) => Promise<void>
}

export function useConversations(): UseConversationsReturn {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load conversations from storage
    setIsLoading(true)
    // Placeholder: Load from DB
    setIsLoading(false)
  }, [])

  const createConversation = useCallback(async (title: string): Promise<Conversation> => {
    const newConversation: Conversation = {
      id: crypto.randomUUID(),
      title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    setConversations((prev) => [newConversation, ...prev])
    return newConversation
  }, [])

  const deleteConversation = useCallback(async (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const updateConversation = useCallback(async (id: string, updates: Partial<Conversation>) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c
      )
    )
  }, [])

  return {
    conversations,
    isLoading,
    createConversation,
    deleteConversation,
    updateConversation,
  }
}
