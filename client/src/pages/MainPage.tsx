import React, { FC, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post';
import Container from '../components/Container';
import { useGetPostsQuery, useToggleLikePostMutation } from '../services/api/PostsApi';
import TogglePostForm from '../components/forms/TogglePostForm';

const MainPage: FC = (): ReactElement => {
  const navigate = useNavigate();
  const { data: posts } = useGetPostsQuery();

  const [toggleLike] = useToggleLikePostMutation();

  return (
    <>
      <Container>
        <div className="flex flex-col gap-6">
          {posts?.items?.length
            ? posts?.items?.map((post: any) => (
                <Post
                  key={post.id}
                  onLikeClick={async () => toggleLike({ isLiked: post.isLiked, postId: post.id })}
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

export default MainPage;
