import React, { FC, ReactNode, useContext } from 'react';
import { AttachmentType } from '.';
import { FilesContext } from './context';

interface FileLoaderButtonProps {
  children: ReactNode;
  type: AttachmentType;
}

const FileLoaderButton: FC<FileLoaderButtonProps> = ({ type, children }) => {
  const { htmlForName, addFile } = useContext(FilesContext);

  return (
    <label htmlFor={htmlForName}>
      <button onClick={() => addFile(type)}>{children}</button>
    </label>
  );
};

export default FileLoaderButton;
