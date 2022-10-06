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
import { Link } from 'react-router-dom';
import ToolbarUser from './Tools/User';
import { useAppSelector } from '../../store/hooks';

interface HeaderProps {
  colorMode: {
    mode: string;
    toggleColorMode: () => void;
  };
}

const Header: FC<HeaderProps> = ({ colorMode }): ReactElement => (
  <AppBar color="primary" position="static" sx={{ boxShadow: 'none' }}>
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
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
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Blog
          </Link>
        </Typography>
        <Typography
          variant="h6"
          noWrap
          // component="a"
          // href="/create"
          sx={{
            mr: 2,
            flexGrow: 10,
            display: { xs: 'none', md: 'flex' },
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <Link to="/create" style={{ color: 'white', textDecoration: 'none' }}>
            Create post
          </Link>
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
            {colorMode.mode === 'light' ? (
              <DarkModeIcon sx={{ fill: '#FFF' }} />
            ) : (
              <LightModeIcon sx={{ fill: '#FFF' }} />
            )}
          </Button>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <ToolbarUser />
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Header;
