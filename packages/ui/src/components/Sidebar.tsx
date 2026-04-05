import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material'
import { useConversationStore } from '@eky/core'

export function Sidebar() {
  const {
    conversations,
    selectedConversationId,
    sidebarExpanded,
    isEditingId,
    editText,
    isAddDialogOpen,
    confirmAddConversation,
    closeAddDialog,
    deleteConversation,
    selectConversation,
    toggleSidebar,
    startEditing,
    cancelEditing,
    finishEditing,
    setEditText,
    init,
    addConversation,
  } = useConversationStore()

  const [newChatName, setNewChatName] = useState('')
  const editInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    init()
  }, [init])

  useEffect(() => {
    if (isEditingId && editInputRef.current) {
      editInputRef.current.focus()
      editInputRef.current.select()
    }
  }, [isEditingId])

  const handleKeyDown = useCallback((e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      finishEditing(id)
    } else if (e.key === 'Escape') {
      cancelEditing()
    }
  }, [finishEditing, cancelEditing])

  const handleConfirmAdd = () => {
    confirmAddConversation(newChatName)
    setNewChatName('')
  }

  const handleAddDialogClose = () => {
    closeAddDialog()
    setNewChatName('')
  }

  return (
    <>
      <Box sx={{
        width: sidebarExpanded ? 280 : 64,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        borderRight: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        transition: 'width 0.2s ease',
        overflow: 'hidden',
      }}>
        <Box sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarExpanded ? 'space-between' : 'center',
          minHeight: 64,
          borderBottom: 1,
          borderColor: 'divider',
        }}>
          {sidebarExpanded && (
            <Typography variant="h6" fontWeight={600}>
              Eky Chat
            </Typography>
          )}
          <IconButton size="small" onClick={toggleSidebar}>
            {sidebarExpanded ? <ChevronLeftIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
          </IconButton>
        </Box>

        <List sx={{ flex: 1, overflow: 'auto', p: 0.5 }}>
          {conversations.map(conversation => (
            <ListItem key={conversation.id} disablePadding secondaryAction={
              sidebarExpanded && isEditingId !== conversation.id ? (
                <IconButton
                  size="small"
                  edge="end"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteConversation(conversation.id)
                  }}
                  sx={{ opacity: 0, '&:hover': { opacity: 1 } }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              ) : null
            }
              sx={{
                mb: 0.5,
                borderRadius: 1,
                '&:hover .MuiIconButton-root': { opacity: 1 },
              }}
            >
              {isEditingId === conversation.id ? (
                <TextField
                  inputRef={editInputRef}
                  fullWidth
                  size="small"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => finishEditing(conversation.id)}
                  onKeyDown={(e) => handleKeyDown(e, conversation.id)}
                  sx={{ mx: 1 }}
                />
              ) : (
                <ListItemButton
                  selected={selectedConversationId === conversation.id}
                  onClick={() => selectConversation(conversation.id)}
                  onDoubleClick={(e) => {
                    e.stopPropagation()
                    startEditing(conversation.id, conversation.title)
                  }}
                  sx={{ borderRadius: 1, pr: sidebarExpanded ? 5 : 1 }}
                >
                  <ListItemText
                    primary={conversation.title}
                    primaryTypographyProps={{
                      noWrap: true,
                      fontSize: 14,
                    }}
                  />
                </ListItemButton>
              )}
            </ListItem>
          ))}

          <ListItem disablePadding sx={{ mb: 0.5, borderRadius: 1 }}>
            <ListItemButton
              onClick={addConversation}
              sx={{ borderRadius: 1 }}
            >
              <AddIcon fontSize="small" sx={{ mr: 1 }} />
              {sidebarExpanded && (
                <ListItemText
                  primary="+ Add"
                  primaryTypographyProps={{ fontSize: 14 }}
                />
              )}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
        <DialogTitle>New Chat</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Chat Name"
            fullWidth
            variant="standard"
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleConfirmAdd()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button onClick={handleConfirmAdd}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
