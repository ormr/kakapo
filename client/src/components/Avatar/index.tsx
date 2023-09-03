import React, { FC } from 'react';

interface AvatarProps {
  id?: string;
}

const Avatar: FC<AvatarProps> = ({ id }) => (
  <div className="h-10 w-10">
    <img
      className="h-inherit w-inherit rounded-full object-cover object-center"
      src={id ? `/api/local-files/${id}` : '/default-picture.jpg'}
      alt="avatar"
    />
  </div>
);

Avatar.defaultProps = {
  id: undefined,
};

export default Avatar;
