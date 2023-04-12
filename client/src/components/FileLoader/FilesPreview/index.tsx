import React, { FC } from 'react';
import FilePreviewItem from './FilePreviewItem';

interface FilesPreviewProps {
  files: File[];
  onDelete: (file: any) => void;
}

const FilesPreview: FC<FilesPreviewProps> = ({ files, onDelete }) => {
  return (
    <div className="flex w-full">
      {files.map((file, index) => (
        <FilePreviewItem fileName={file.name} onClick={() => onDelete(index)} />
      ))}
    </div>
  );
};

export default FilesPreview;
