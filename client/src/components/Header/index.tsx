import React, { FC, ReactElement } from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import ToolbarUser from './Tools/User';
import { useAppSelector } from '../../store/hooks';

interface HeaderProps {
  colorMode: {
    mode: string;
    toggleColorMode: () => void;
  };
}

const Header: FC<HeaderProps> = ({ colorMode }): ReactElement => {
  const userData = useAppSelector((state) => state.user.data);

  return (
    <AppBar color="primary" position="static" sx={{ boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Blog
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/create"
            sx={{
              mr: 2,
              flexGrow: 10,
              display: { xs: 'none', md: 'flex' },
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Create post
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Something
          </Typography>
          <Box>
            <Button onClick={() => colorMode.toggleColorMode()}>
              {colorMode.mode ? <LightModeIcon sx={{ fill: '#FFF' }} /> : <DarkModeIcon />}
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <ToolbarUser userData={userData} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
