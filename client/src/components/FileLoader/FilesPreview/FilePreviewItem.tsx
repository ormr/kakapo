import React, { FC } from 'react';
import PlusIcon from '../../../assets/PlusIcon';

interface FilePreviewItemProps {}

interface FilePreviewItemProps {
  fileName: string;
  onClick: VoidFunction;
}

const FilePreviewItem: FC<FilePreviewItemProps> = ({ fileName, onClick }) => (
  <div className="bg-gray-100 w-auto w-lg-max rounded-md px-2 py-2 pr-6 m-1 relative">
    <div>{fileName}</div>
    <button className="absolute top-1/2 -translate-y-1/2 right-0 p-0.5" onClick={onClick}>
      <PlusIcon width={24} height={24} fill="red" className="rotate-45" />
    </button>
  </div>
);

export default FilePreviewItem;
