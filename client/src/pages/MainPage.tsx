import React, { FC, ReactElement, useEffect, useState } from 'react';
import Post from '../components/Post';
import Container from '../components/Container';
import { useGetPostsQuery } from '../services/api/PostsApi';
import PlusIcon from '../assets/PlusIcon';
import AddPostForm from '../components/forms/AddPostForm';

const MainPage: FC = (): ReactElement => {
  const { data: posts, error, isLoading } = useGetPostsQuery();

  return (
    <>
      <Container>
        <div className="flex flex-col gap-6">
          {posts?.length
            ? posts.map((postItem: any) => (
                <Post
                  id={'dcee576c-8436-4b1e-9482-2a6d15698ab3'}
                  content="Lorem ipsum dolor sit amet"
                  userName="User"
                  createdAt="12/12/2022"
                />
              ))
            : 'Постов пока нет'}
        </div>
      </Container>
      <TogglePostForm />
    </>
  );
};

const TogglePostForm = () => {
  const [showPost, setShowPost] = useState(false);
  return (
    <div>
      <div className="fixed bottom-3 right-3">
        <button
          className="rounded-full bg-neutral-800 text-white p-3"
          onClick={() => setShowPost(true)}
        >
          <PlusIcon />
        </button>
      </div>
      {showPost && <AddPostForm onFormClose={() => setShowPost(false)} />}
    </div>
  );
};

export default MainPage;
