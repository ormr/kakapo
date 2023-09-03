import React, { FC } from 'react';
import FilePreviewItem from './FilePreviewItem';

interface FilesPreviewProps {
  files: string[];
  onDelete: (file: any) => void;
}

const FilesPreview: FC<FilesPreviewProps> = ({ files, onDelete }) => (
  <div className="flex w-full">
    {files.map((fileName, index) => (
      <FilePreviewItem fileName={fileName} onClick={() => onDelete(index)} />
    ))}
  </div>
);

export default FilesPreview;
