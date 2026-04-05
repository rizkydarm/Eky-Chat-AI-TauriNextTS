import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import type { ReactNode } from 'react'
import { theme } from '../theme'

interface AppLayoutProps {
  children: ReactNode
  sidebar?: ReactNode
}

export function AppLayout({ children, sidebar }: AppLayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {sidebar && (
          <Box
            component="aside"
            sx={{
              width: 280,
              borderRight: 1,
              borderColor: 'divider',
              display: { xs: 'none', md: 'block' },
            }}
          >
            {sidebar}
          </Box>
        )}
        <Box component="main" sx={{ flex: 1, overflow: 'auto' }}>
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}
