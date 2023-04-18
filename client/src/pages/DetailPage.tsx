import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPostByIdQuery, useToggleLikePostMutation, useAddCommentToPostMutation } from '../services/api/PostsApi';
import Post from '../components/Post';
import Avatar from '../components/Avatar';
import AddCommentForm from '../components/forms/AddCommentForm';

interface ContainerInnerProps {
  children: React.ReactNode;
}

const ContainerInner: FC<ContainerInnerProps> = ({ children }) => (
  <div className="w-full max-w-lg mx-auto">{children}</div>
);

interface CommentProps {
  content: string;
  author: any;
}

const Comment: FC<CommentProps> = ({ content, author }) => (
  <div className="w-full flex gap-3 items-center">
    <Avatar id={author.avatarId} />
    <div className="w-full">{content}</div>
  </div>
);

const DetailPage: FC = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { data: post } = useGetPostByIdQuery(postId);
  const [addComment] = useAddCommentToPostMutation();
  const [toggleLike] = useToggleLikePostMutation();

  if (!post) return null;

  return (
    <ContainerInner>
      <section className="mb-6">
        <Post
          {...post}
          onLikeClick={async () => toggleLike({ isLiked: post.isLiked, postId: post.id })}
          onCommentClick={() => navigate(`/posts/${post.id}`)}
          onRepostClick={() => console.log('!')}
        />
      </section>
      <section className="mb-6">
        <AddCommentForm onAddComment={async (data) => addComment({ ...data, postId })} />
      </section>
      <section>
        <h4 className="mb-3">Комментарии:</h4>
        <div className="flex flex-col gap-3">
          {post?.comments.map((comment: any) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </div>
      </section>
    </ContainerInner>
  );
};

export default DetailPage;
