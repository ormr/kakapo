import React, { FC } from 'react';
import Container from '../components/Container';
import UploadProfilePicture from '../components/UploadProfilePicture';
import { BASE_URL } from '../core/axios';
import { useAddProfilePictureMutation } from '../services/api/UsersApi';
import { useAppSelector } from '../store/hooks';

const ProfilePage: FC = () => {
  const { user } = useAppSelector((app) => app.auth);
  const [addProfilePicture] = useAddProfilePictureMutation();

  return (
    <Container>
      <section className="px-40 flex gap-10 items-center">
        <UploadProfilePicture
          href={user?.avatarId}
          onChange={async (file) => addProfilePicture(file)}
        />
        <div className="flex items-center">
          <div>
            <div>name: {user?.name}</div>
            <div>email: {user?.email}</div>
            <div>
              description:{' '}
              {user?.description ? user?.description : 'No description'}
            </div>
          </div>
        </div>
      </section>
      <section>
        <h1>Posts:</h1>
        <div></div>
      </section>
    </Container>
  );
};

export default ProfilePage;
