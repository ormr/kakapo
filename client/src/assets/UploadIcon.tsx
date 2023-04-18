import React, { FC } from 'react';

interface UploadIconProps {
  className?: string;
}

const UploadIcon: FC<UploadIconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="800"
    height="800"
    fill="#000"
    version="1.1"
    viewBox="0 0 489.95 489.95"
    xmlSpace="preserve"
    className={className}
  >
    <path d="M431.175 427.85v-200.5c0-34.2-27.9-62.1-62.1-62.1h-40.2c-6.8 0-12.3 5.5-12.3 12.3s5.5 12.3 12.3 12.3h40.2c20.7 0 37.6 16.9 37.6 37.6v200.6c0 20.7-16.9 37.6-37.6 37.6h-248.2c-20.7 0-37.6-16.9-37.6-37.6v-200.7c0-20.7 16.9-37.6 37.6-37.6h40.2c6.8 0 12.3-5.5 12.3-12.3s-5.5-12.3-12.3-12.3h-40.2c-34.2 0-62.1 27.9-62.1 62.1v200.6c0 34.2 27.9 62.1 62.1 62.1h248.2c34.3 0 62.1-27.8 62.1-62.1z" />
    <path d="M152.475 104.55c4.8 4.8 12.5 4.8 17.3 0l63-63v229.8c0 6.8 5.5 12.3 12.3 12.3 6.8 0 12.3-5.5 12.3-12.3V41.65l63 63c2.4 2.4 5.5 3.6 8.7 3.6s6.3-1.2 8.7-3.6c4.8-4.8 4.8-12.5 0-17.3l-83.9-83.9c-4.6-4.6-12.7-4.6-17.3 0l-83.9 83.9c-5 4.7-5 12.4-.2 17.2z" />
  </svg>
);

UploadIcon.defaultProps = {
  className: '',
};

export default UploadIcon;
