import React, { FC, ReactElement, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../../../services/api/UserApi';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { BASE_URL } from '../../../../core/axios';
import { requestLogOut } from '../../../../features/user/actions';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../store/hooks';

// TODO:
// Компонент отвечает за логику отображения ссылки на профиль либо кнопки авторизации

// interface ToolbarUserProps {
//   userData?: User;
// }

// {userData?.name ? (
//   <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
//     {userData?.name}
//   </Link>
// ) : (
//   <Link to="/log-in" style={{ color: 'white', textDecoration: 'none' }}>
//     Войти
//   </Link>
// )}

interface Menu {
  id: string;
  name?: string;
  route?: string;
  action?: () => void;
}

const initialMenu = [
  {
    id: 'login',
    name: 'Войти',
    route: '/log-in',
  }
];

const ToolbarUser: FC = (): ReactElement => {
  const userData = useAppSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [menu, setMenu] = React.useState<Menu[]>(initialMenu);

  useEffect(() => {
    if (userData) {
      setMenu([{
        id: 'profile',
        name: userData.name,
        route: '/profile',
      },
      {
        id: 'logout',
        name: 'Выйти',
        action: () => dispatch(requestLogOut())
      }]);
    } else {
      setMenu(initialMenu);
    }
  }, [userData]);


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (menuItem: Menu) => {
    handleCloseUserMenu();
    return menuItem.action && menuItem.action();
  }


  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu}>
          {userData?.avatarId ? <Avatar alt="Profile" src={`${BASE_URL}/local-files/${userData?.avatarId}`} /> : <AccountCircle />}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {menu.map((menuItem) => (
          <MenuItem>
            <Typography textAlign="center">
              <Link
                to={menuItem.route || ''}
                style={{ textDecoration: 'none', color: 'black' }}
                onClick={() => handleClick(menuItem)}
              >
                {menuItem.name}
              </Link>
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
};

ToolbarUser.defaultProps = {
  userData: undefined,
}

export default ToolbarUser;
