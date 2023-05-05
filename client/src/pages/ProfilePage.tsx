import React, { FC } from 'react';
import Container from '../components/Container';
import Post from '../components/Post';
import UploadProfilePicture from '../components/UploadProfilePicture';
import { useGetPostsByUserIdQuery } from '../services/api/PostsApi';
import { useAddProfilePictureMutation } from '../services/api/UsersApi';
import { useAppSelector } from '../store/hooks';

const ProfilePage: FC = () => {
  const { user } = useAppSelector((app) => app.auth);
  const [addProfilePicture] = useAddProfilePictureMutation();
  const { data: posts } = useGetPostsByUserIdQuery(user?.id);

  return (
    <Container>
      <section className="px-40 flex gap-10 items-center">
        <UploadProfilePicture href={user?.avatarId} onChange={async (file) => addProfilePicture(file)} />
        <div className="flex items-center">
          <div>
            <div>name: {user?.name}</div>
            <div>email: {user?.email}</div>
            <div>description: {user?.description ? user?.description : 'No description'}</div>
          </div>
        </div>
      </section>
      <section className="mx-auto">
        <h1 className="text-center my-2 text-black">Posts:</h1>
        <div className="flex flex-col gap-6">
          {posts?.items.length
            ? posts?.items.map((post) => (
                <Post
                  key={post.id}
                  onLike={() => console.log('!')}
                  onComment={() => console.log('!')}
                  onRepost={() => console.log('!')}
                  onEdit={() => {}}
                  onReport={() => {}}
                  onDelete={() => {}}
                  {...post}
                />
              ))
            : 'Постов пока нет'}
        </div>
      </section>
    </Container>
  );
};

export default ProfilePage;
