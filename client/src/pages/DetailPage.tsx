import React, { FC, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../services/api/PostsApi';
import Post from '../components/Post';
import Avatar from '../components/Avatar';
import AddCommentForm from '../components/forms/AddCommentForm';
import { useAddCommentToPostMutation } from '../services/api/PostsApi';

const DetailPage: FC = () => {
  const { postId } = useParams();
  const { data: post } = useGetPostByIdQuery(postId);
  const [addComment] = useAddCommentToPostMutation();

  if (!post) return null;

  return (
    <ContainerInner>
      <section className="mb-6">
        <Post {...post} />
      </section>
      <section className="mb-6">
        <AddCommentForm
          onAddComment={async (data) => addComment({ ...data, postId })}
        />
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

export default DetailPage;
