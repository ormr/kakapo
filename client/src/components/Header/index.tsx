import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import Avatar from '../Avatar';
import Container from '../Container';
import Logo from './Logo';

const Header: FC = () => {
  const { user } = useAppSelector((app) => app.auth);

  return (
    <Container className="h-20">
      <div className="flex items-center py-5">
        <Link to="/profile">
          <Avatar id={user?.avatarId} />
        </Link>
        <Link to="/" className="mx-auto">
          <Logo />
        </Link>
      </div>
    </Container>
  );
};

export default Header;
