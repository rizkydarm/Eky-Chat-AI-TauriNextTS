import { Box, Paper, Typography } from '@mui/material'

interface ChatBubbleProps {
  message: string
  isUser: boolean
}

export function ChatBubble({ message, isUser }: ChatBubbleProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 1,
      }}
    >
      <Paper
        sx={{
          p: 1.5,
          maxWidth: '70%',
          bgcolor: isUser ? 'primary.main' : 'grey.100',
          color: isUser ? 'white' : 'text.primary',
          borderRadius: 2,
        }}
      >
        <Typography variant="body2">{message}</Typography>
      </Paper>
    </Box>
  )
}
