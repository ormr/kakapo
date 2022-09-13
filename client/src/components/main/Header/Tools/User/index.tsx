import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

// TODO:
// Компонент отвечает за логику отображения ссылки на профиль либо кнопки авторизации
export const ToolbarUser = () => {
  // const userNotLogIn
  const user = {
    // name: undefined,
    name: 'Serafim',
  }

  return (
    <Box>
      {user?.name ? (
        <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>{user.name}</Link>
      ) : 'Войти'}
    </Box>
  );
}
