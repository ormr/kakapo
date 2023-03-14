import React, { FC } from 'react';

interface AvatarProps {
  imageSrc: string;
}

const Avatar: FC<AvatarProps> = ({ imageSrc }) => (
  <div className="h-10 w-10">
    <img
      className="h-full w-full rounded-full object-cover object-center"
      src={imageSrc}
      alt="" />
  </div>
);

export default Avatar;
