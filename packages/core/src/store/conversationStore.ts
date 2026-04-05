import { create } from 'zustand'
import type { Conversation } from '@eky/types'
import { 
  fetchAllConversations, 
  insertConversation, 
  updateConversationTitle as updateDbTitle,
  deleteConversationById,
  initDatabase
} from '../db/sqlite'

interface ConversationState {
  conversations: Conversation[]
  selectedConversationId: string | null
  sidebarExpanded: boolean
  isEditingId: string | null
  editText: string
  isAddDialogOpen: boolean
  isLoading: boolean

  loadConversations: () => Promise<void>
  init: () => Promise<void>
  addConversation: () => void
  confirmAddConversation: (title: string) => Promise<void>
  closeAddDialog: () => void
  deleteConversation: (id: string) => Promise<void>
  updateConversationTitle: (id: string, title: string) => Promise<void>
  selectConversation: (id: string | null) => void
  toggleSidebar: () => void
  setSidebarExpanded: (expanded: boolean) => void
  startEditing: (id: string, currentTitle: string) => void
  cancelEditing: () => void
  finishEditing: (id: string) => void
  setEditText: (text: string) => void
}

export const useConversationStore = create<ConversationState>((set, get) => ({
  conversations: [],
  selectedConversationId: null,
  sidebarExpanded: true,
  isEditingId: null,
  editText: '',
  isAddDialogOpen: false,
  isLoading: false,

  init: async () => {
    set({ isLoading: true })
    await initDatabase()
    await get().loadConversations()
    set({ isLoading: false })
  },

  loadConversations: async () => {
    const conversations = await fetchAllConversations()
    set({ conversations })
  },

  addConversation: () => {
    set({ isAddDialogOpen: true })
  },

  confirmAddConversation: async (title: string) => {
    const newConversation: Conversation = {
      id: crypto.randomUUID(),
      title: title.trim() || 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await insertConversation(newConversation)
    
    set(state => ({
      conversations: [newConversation, ...state.conversations],
      selectedConversationId: newConversation.id,
      isAddDialogOpen: false
    }))
  },

  closeAddDialog: () => {
    set({ isAddDialogOpen: false })
  },

  deleteConversation: async (id: string) => {
    await deleteConversationById(id)
    const state = get()
    set({
      conversations: state.conversations.filter(c => c.id !== id),
      selectedConversationId: state.selectedConversationId === id ? null : state.selectedConversationId
    })
  },

  updateConversationTitle: async (id: string, title: string) => {
    await updateDbTitle(id, title)
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

  finishEditing: async (id: string) => {
    const state = get()
    if (state.editText.trim()) {
      await state.updateConversationTitle(id, state.editText.trim())
    }
    set({ isEditingId: null, editText: '' })
  },

  setEditText: (text: string) => set({ editText: text }),
}))
