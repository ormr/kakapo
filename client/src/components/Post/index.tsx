import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Avatar from '../Avatar';
import DotIcon from '../../assets/DotIcon';
import DotsIcon from '../../assets/DotsIcon';
import HeartIcon from '../../assets/HeartIcon';
import CommentIcon from '../../assets/CommentIcon';
import ShareIcon from '../../assets/ShareIcon';
import { Post as PostProps } from '../../services/api/PostsApi';
import clsx from 'clsx';

interface PostToolProps {
  icon: ReactNode;
  count: number;
}

const PostTool: FC<PostToolProps> = ({ icon, count }) => (
  <div className="flex gap-1.5">
    {icon}
    {count}
  </div>
);

interface ButtonProps {
  children: ReactNode;
  onClick: VoidFunction;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
);

const Post: FC<PostProps & { likesCount?: number; commentsCount?: number }> = ({
  id,
  author,
  createdAt,
  content,
  fileIds,
  commentsCount = 0,
  likesCount = 0,
}) => (
  <div className="w-full max-w-lg mx-auto flex flex-col gap-3.5">
    <header className="flex justify-between">
      <div className="flex items-center gap-1.5">
        <Link to={`/users/${id}`}>
          <Avatar id={author?.avatarId} />
        </Link>
        <div>@{author?.name}</div>
        <DotIcon />
        <div>{format(new Date(createdAt), 'dd/MM/yyyy hh:mm')}</div>
      </div>
      <Button onClick={() => console.log('dots menu opening')}>
        <DotsIcon />
      </Button>
    </header>
    <PostFilesPreview fileIds={fileIds} />
    <div>{content}</div>
    <footer className="flex flex-wrap gap-3 text-sm">
      <PostTool icon={<HeartIcon />} count={likesCount} />
      <PostTool icon={<CommentIcon />} count={commentsCount} />
      <PostTool icon={<ShareIcon />} count={2} />
    </footer>
  </div>
);

interface PostFilesPreviewProps {
  fileIds: string[];
}

interface FilePositionsStyles {
  [key: number]: {
    wrapper: string;
    figure: (index: number) => string | undefined;
  };
}

const PostFilesPreview: FC<PostFilesPreviewProps> = ({ fileIds }) => {
  const filePositionsByLength: FilePositionsStyles = {
    1: {
      wrapper: 'grid grid-cols-1',
      figure: () => undefined,
    },
    2: {
      wrapper: 'grid-cols-2 gap-1',
      figure: () => undefined,
    },
    3: {
      wrapper: 'grid-cols-2 gap-1',
      figure: (index: number) => (index === 1 ? 'row-span-2' : undefined),
    },
  };

  const currentFilesPositionStyles = filePositionsByLength[fileIds.length];

  return (
    <div className={clsx('grid', currentFilesPositionStyles.wrapper)}>
      {fileIds.map((id, index) => (
        <figure
          className={clsx(
            'w-full h-full',
            currentFilesPositionStyles.figure(index)
          )}
        >
          <img
            className="w-full h-full object-cover block"
            src={`/local-files/${id}`}
            alt={`post-image-${index}`}
          />
        </figure>
      ))}
    </div>
  );
};

export default Post;
