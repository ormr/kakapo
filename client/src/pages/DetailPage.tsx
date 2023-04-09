import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Post from '../components/Post';
import { useGetPostByIdQuery, useToggleLikePostMutation } from '../services/api/PostsApi';

const DetailPage: FC = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { data: post, isLoading } = useGetPostByIdQuery(postId);
    const [toggleLike] = useToggleLikePostMutation();

  if (!post && isLoading) return <div>loading...</div>;

  return (
  <div>
  <Post
    onLikeClick={async () => await toggleLike({ isLiked: post.isLiked, postId: post.id })}
    onCommentClick={() => navigate(`/posts/${post.id}`)}
    onRepostClick={() => console.log('!')}
    {...post}
  />
</div >
  );
};

export default DetailPage;
