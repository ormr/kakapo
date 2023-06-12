import React, { ChangeEvent, FC, useRef } from 'react';
import UploadIcon from '../../assets/UploadIcon';

interface UploadProfilePictureProps {
  href: string | undefined;
  onChange: (file: File) => void;
}

const UploadProfilePicture: FC<UploadProfilePictureProps> = ({ href, onChange }) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onChange(e.target.files[0]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      ref?.current?.click();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="absolute -m-16 max-w-[150px] w-full" onClick={() => ref?.current?.click()}
      onKeyDown={handleKeyDown}
    >
      <div className="w-full">
        <input ref={ref} type="file" accept="image/png, image/jpeg" onChange={handleChange} hidden />
        <div className="relative h-[150px] w-[150px]">
          <figure className="rounded-full overflow-hidden w-full h-full">
            <img
              src={href ? `/local-files/${href}` : '/default-picture.jpg'}
              className="w-full h-full object-cover rounded-lg"
              alt="profile"
            />
          </figure>
          <div className="top-0 right-0 left-0 bottom-0 h-full w-full group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
            <UploadIcon className="hidden group-hover:block w-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadProfilePicture;
