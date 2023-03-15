import React, { FC } from 'react';
import Container from '../components/Container';
import { useAppSelector } from '../store/hooks';

const ProfilePage: FC = () => {
  const { user } = useAppSelector((app) => app.auth);
  return (
    <Container>
      <section className="flex">{JSON.stringify(user, null, 2)}</section>
    </Container>
  );
};

export default ProfilePage;
