import React, { FC, ReactNode } from 'react';
import Avatar from '../Avatar';
import DotIcon from '../../assets/DotIcon';
import DotsIcon from '../../assets/DotsIcon';
import HeartIcon from '../../assets/HeartIcon';
import CommentIcon from '../../assets/CommentIcon';
import ShareIcon from '../../assets/ShareIcon';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface PostProps {
  id: string;
  userName?: string;
  avatarId?: string;
  createdAt: string;
  content: string;
}

const Post: FC<PostProps> = ({
  id,
  userName,
  avatarId,
  createdAt,
  content,
}) => (
  <div className="w-full max-w-lg mx-auto flex flex-col gap-3.5">
    <header className="flex justify-between">
      <div className="flex items-center gap-1.5">
        <Link to={`/users/${id}`}>
          <Avatar id={avatarId} />
        </Link>
        <div>@{userName}</div>
        <DotIcon />
        <div>{format(new Date(createdAt), 'dd/MM/yyyy hh:mm')}</div>
      </div>
      <Button onClick={() => console.log('dots menu opening')}>
        <DotsIcon />
      </Button>
    </header>
    <div>{content}</div>
    <footer className="flex flex-wrap gap-3 text-sm">
      <PostTool icon={<HeartIcon />} count={125} />
      <PostTool icon={<CommentIcon />} count={45} />
      <PostTool icon={<ShareIcon />} count={2} />
    </footer>
  </div>
);

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

export default Post;
