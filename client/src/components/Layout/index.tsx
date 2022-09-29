import React, { useState, useMemo } from 'react'
import { CssBaseline, ThemeProvider, Box } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { Outlet } from 'react-router-dom'
import { Header} from '@src/components/Header';

export const Layout = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  )

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <main>
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 3,
              pb: 3,
            }}
          >
            <Outlet />
          </Box>
        </main>
      </ThemeProvider>
    </>
  )
};