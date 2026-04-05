import { create } from 'zustand'
import type { Conversation } from '@eky/types'

interface ConversationState {
  conversations: Conversation[]
  selectedConversationId: string | null
  sidebarExpanded: boolean
  isEditingId: string | null
  editText: string

  addConversation: () => void
  deleteConversation: (id: string) => void
  updateConversationTitle: (id: string, title: string) => void
  selectConversation: (id: string | null) => void
  toggleSidebar: () => void
  setSidebarExpanded: (expanded: boolean) => void
  startEditing: (id: string, currentTitle: string) => void
  cancelEditing: () => void
  finishEditing: (id: string) => void
  setEditText: (text: string) => void
}

export const useConversationStore = create<ConversationState>((set, get) => ({
  conversations: [
    { id: '1', title: 'Welcome Chat', messages: [], createdAt: new Date(), updatedAt: new Date() },
    { id: '2', title: 'React 19 Features', messages: [], createdAt: new Date(), updatedAt: new Date() },
    { id: '3', title: 'Tauri v2 Guide', messages: [], createdAt: new Date(), updatedAt: new Date() },
  ],
  selectedConversationId: null,
  sidebarExpanded: true,
  isEditingId: null,
  editText: '',

  addConversation: () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    set(state => ({
      conversations: [newConversation, ...state.conversations],
      selectedConversationId: newConversation.id
    }))
  },

  deleteConversation: (id: string) => {
    const state = get()
    set({
      conversations: state.conversations.filter(c => c.id !== id),
      selectedConversationId: state.selectedConversationId === id ? null : state.selectedConversationId
    })
  },

  updateConversationTitle: (id: string, title: string) => {
    set(state => ({
      conversations: state.conversations.map(c =>
        c.id === id ? { ...c, title, updatedAt: new Date() } : c
      )
    }))
  },

  selectConversation: (id: string | null) => set({ selectedConversationId: id }),

  toggleSidebar: () => set(state => ({ sidebarExpanded: !state.sidebarExpanded })),

  setSidebarExpanded: (expanded: boolean) => set({ sidebarExpanded: expanded }),

  startEditing: (id: string, currentTitle: string) => set({ isEditingId: id, editText: currentTitle }),

  cancelEditing: () => set({ isEditingId: null, editText: '' }),

  finishEditing: (id: string) => {
    const state = get()
    if (state.editText.trim()) {
      state.updateConversationTitle(id, state.editText.trim())
    }
    set({ isEditingId: null, editText: '' })
  },

  setEditText: (text: string) => set({ editText: text }),
}))
