import React, { useState, useEffect, useMemo, ReactElement, FC } from 'react';
import { CssBaseline, ThemeProvider, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import { useAppDispatch } from '../../store/hooks';
import { fetchUser } from '../../features/user/userSlice';

const Layout: FC = (): ReactElement => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header colorMode={colorMode} />
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
  );
};

export default Layout;