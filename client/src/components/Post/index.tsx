import React, { FC, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import clsx from 'clsx';
import Avatar from '../Avatar';
import DotIcon from '../../assets/DotIcon';
import DotsIcon from '../../assets/DotsIcon';
import HeartIcon from '../../assets/HeartIcon';
import CommentIcon from '../../assets/CommentIcon';
import ShareIcon from '../../assets/ShareIcon';
import { Post as PostEntity } from '../../services/api/PostsApi';

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
        <figure className={clsx('w-full h-full', currentFilesPositionStyles.figure(index))}>
          <img className="w-full h-full object-cover block" src={`/local-files/${id}`} alt={`post-${index}`} />
        </figure>
      ))}
    </div>
  );
};

interface PostToolProps {
  icon: ReactNode;
  count: number;
  onClick: VoidFunction;
}

const PostTool: FC<PostToolProps> = ({ icon, count, onClick }) => (
  <button type="button" className="flex gap-1.5 select-none" onClick={onClick}>
    {icon}
    {count}
  </button>
);

interface ButtonProps {
  children: ReactNode;
  onClick: VoidFunction;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
);

interface PostProps {
  likesCount?: number;
  commentsCount?: number;
  repostsCount?: number;
  isLiked?: boolean;
  onLikeClick: VoidFunction;
  onCommentClick: VoidFunction;
  onRepostClick: VoidFunction;
}

const Post: FC<PostEntity & PostProps> = ({
  id,
  author,
  createdAt,
  fileIds,
  content,
  onLikeClick,
  onCommentClick,
  onRepostClick,
  likesCount: defaultLikesCount = 0,
  commentsCount = 0,
  repostsCount = 0,
  isLiked: isLikedByUser = false,
}) => {
  const [isLiked, setIsLiked] = useState(isLikedByUser);
  const [likesCount, setLikesCount] = useState(defaultLikesCount);

  const handleLikePost = () => {
    setIsLiked((prevState) => !prevState);
    setLikesCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
    onLikeClick();
  };

  return (
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
      {fileIds.length ? <PostFilesPreview fileIds={fileIds} /> : undefined}
      <div>{content}</div>
      <footer className="flex flex-wrap gap-3 text-sm">
        <PostTool icon={<HeartIcon fill={isLiked} />} onClick={handleLikePost} count={likesCount} />
        <PostTool icon={<CommentIcon />} onClick={onCommentClick} count={commentsCount} />
        <PostTool icon={<ShareIcon />} onClick={onRepostClick} count={repostsCount} />
      </footer>
    </div>
  );
};

Post.defaultProps = {
  likesCount: 0,
  commentsCount: 0,
  repostsCount: 0,
  isLiked: false,
};

export default Post;
