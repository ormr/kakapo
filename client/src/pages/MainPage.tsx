import React, { FC, ReactElement, useEffect, useState } from 'react';
import Post from '../components/Post';
import Container from '../components/Container';
import {
  useGetPostsQuery,
  useToggleLikePostMutation,
} from '../services/api/PostsApi';
import PlusIcon from '../assets/PlusIcon';
import AddPostForm from '../components/forms/AddPostForm';
import { useNavigate } from 'react-router-dom';

const MainPage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { data: posts, error, isLoading } = useGetPostsQuery();

  const [toggleLike] = useToggleLikePostMutation();

  return (
    <>
      <Container>
        <div className="flex flex-col gap-6">
          {posts?.items?.length
            ? posts?.items?.map((post: any) => (
                <Post
                  key={post.id}
                  onLikeClick={async () =>
                    await toggleLike({ isLiked: post.isLiked, postId: post.id })
                  }
                  onCommentClick={() => navigate(`/posts/${post.id}`)}
                  onRepostClick={() => console.log('!')}
                  {...post}
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
