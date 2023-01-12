import React, { FC, ReactElement } from 'react';
import { useAppSelector } from '../store/hooks';
import { BASE_URL } from '../core/axios';

const ProfilePage: FC = (): ReactElement => {
  const userData = useAppSelector((state) => state.user.data);
  const posts = useAppSelector((state) => state.post.posts);

  const {
    name,
    email,
    description,
    avatarId,
  } = userData || {};


  return (
    <div>Profile</div>
  );
};

export default ProfilePage;
