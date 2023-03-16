import React, { FC, useRef } from 'react';
import UploadIcon from '../../assets/UploadIcon';

interface UploadProfilePictureProps {
  href?: string;
}

const UploadProfilePicture: FC<UploadProfilePictureProps> = ({ href }) => {
  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <div className="w-64 h-64" onClick={() => ref?.current?.click()}>
      <input ref={ref} type="file" accept="image/png, image/jpeg" hidden />
      <div className="relative w-64 h-64">
        <img
          className="w-64 h-64 rounded-full absolute"
          src={
            href
              ? href
              : '/default-picture.jpg'
          }
          alt="Profile picture"
        />
        <div className="w-64 h-64 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
          <UploadIcon className="hidden group-hover:block w-12" />
        </div>
      </div>
    </div>
  );
};

export default UploadProfilePicture;
