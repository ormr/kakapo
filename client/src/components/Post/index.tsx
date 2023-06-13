import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Avatar from '../Avatar';
import DotIcon from '../../assets/DotIcon';
import HeartIcon from '../../assets/HeartIcon';
import CommentIcon from '../../assets/CommentIcon';
import { Post as PostEntity } from '../../services/api/PostsApi';
import PostFilesPreview from './PostFilesPreview';
import PostTool from './PostTool';
import PostMenuButton from './PostMenu';

interface PostProps {
  likesCount?: number;
  commentsCount?: number;
  isLiked?: boolean;
  onLike: VoidFunction;
  onComment: VoidFunction;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
}

const Post: FC<PostEntity & PostProps> = ({
  id,
  author,
  createdAt,
  fileIds,
  content,
  onLike,
  onComment,
  onEdit,
  onDelete,
  likesCount: defaultLikesCount = 0,
  commentsCount = 0,
  isLiked: isLikedByUser = false,
}) => {
  const [isLiked, setIsLiked] = useState(isLikedByUser);
  const [likesCount, setLikesCount] = useState(defaultLikesCount);

  const handleLikePost = () => {
    setIsLiked((prevState) => !prevState);
    setLikesCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
    onLike();
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-3.5">
      <header className="flex justify-between">
        <div className="flex items-center gap-1.5 w-full">
          <Link to={`/users/${id}`}>
            <Avatar id={author?.avatarId} />
          </Link>
          <div>@{author?.name}</div>
          <DotIcon />
          <div className="w-full">{format(new Date(createdAt), 'dd/MM/yyyy hh:mm')}</div>
          <PostMenuButton onEdit={onEdit} onDelete={onDelete} />
        </div>
      </header>
      {fileIds.length ? <PostFilesPreview fileIds={fileIds} /> : undefined}
      <div>{content}</div>
      <footer className="flex flex-wrap gap-3 text-sm">
        <PostTool icon={<HeartIcon fill={isLiked} />} onClick={handleLikePost} count={likesCount} />
        <PostTool icon={<CommentIcon />} onClick={onComment} count={commentsCount} />
      </footer>
    </div>
  );
};

Post.defaultProps = {
  likesCount: 0,
  commentsCount: 0,
  isLiked: false,
};

export default Post;
