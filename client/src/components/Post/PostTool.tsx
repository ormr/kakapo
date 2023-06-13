import { FC, ReactNode } from 'react';

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

export default PostTool;
