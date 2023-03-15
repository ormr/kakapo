import React, { FC, ReactNode } from 'react';
import Avatar from '../Avatar';
import DotIcon from '../../assets/DotIcon';
import DotsIcon from '../../assets/DotsIcon';
import HeartIcon from '../../assets/HeartIcon';
import CommentIcon from '../../assets/CommentIcon';
import ShareIcon from '../../assets/ShareIcon';
import { Link } from 'react-router-dom';

interface PostProps {
  id: string;
  userName?: string;
  createdAt: string;
  content: string;
}

const Post: FC<PostProps> = ({ id, userName, createdAt, content }) => (
  <div className="w-full max-w-lg mx-auto flex flex-col gap-3.5">
    <header className="flex justify-between">
      <div className="flex items-center gap-1.5">
        <Link to={`/users/${id}`}>
          <Avatar
            imageSrc={'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
          />
        </Link>
        <div>{userName}</div>
        <DotIcon />
        <div>{'4m'}</div>
      </div>
      <Button onClick={() => console.log('dots menu opening')}>
        <DotsIcon />
      </Button>
    </header>
    <div>{content}</div>
    <footer className="flex flex-wrap gap-3 text-sm">
      <PostTool
        icon={<HeartIcon />}
        count={125}
      />
      <PostTool
        icon={<CommentIcon />}
        count={45}
      />
      <PostTool
        icon={<ShareIcon />}
        count={2}
      />
    </footer>
  </div>
);

interface PostToolProps {
  icon: ReactNode;
  count: number;
};

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
