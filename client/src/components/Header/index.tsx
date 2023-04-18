import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import Avatar from '../Avatar';
import Container from '../Container';
import Logo from './Logo';
import Tools from './Tools';

const Header: FC = () => {
  const { user } = useAppSelector((app) => app.auth);

  return (
    <Container>
      <div className="flex justify-between items-center py-5">
        <Link to="/profile">
          <Avatar id={user?.avatarId} />
        </Link>
        <Link to="/">
          <Logo />
        </Link>
        <Tools />
      </div>
    </Container>
  );
};

export default Header;
