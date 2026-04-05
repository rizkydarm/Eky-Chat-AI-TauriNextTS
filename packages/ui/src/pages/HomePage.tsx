import { Box, Typography, CssBaseline, ThemeProvider } from '@mui/material'
import { Sidebar } from '../components/Sidebar'
import { theme } from '../theme'

export interface HomePageProps {
  variant?: 'web' | 'native'
}

export function HomePage({ variant = 'web' }: HomePageProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
          }}
        >
          <Typography variant="h5" color="text.secondary">
            Select or create a chat to start
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
