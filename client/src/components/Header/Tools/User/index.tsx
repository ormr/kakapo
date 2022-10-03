import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { User } from '../../../../services/api/UserApi';

// TODO:
// Компонент отвечает за логику отображения ссылки на профиль либо кнопки авторизации

interface ToolbarUserProps {
  userData?: User;
}

const ToolbarUser: FC<ToolbarUserProps> = ({ userData }): ReactElement => (
  <Box>
    {userData?.name ? (
      <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
        {userData?.name}
      </Link>
    ) : (
      'Войти'
    )}
  </Box>
);

ToolbarUser.defaultProps = {
  userData: undefined,
}

export default ToolbarUser;
