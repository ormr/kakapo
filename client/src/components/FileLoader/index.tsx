import React, { FC, ReactNode, useState, useRef, useMemo } from 'react';
import { FilesContext } from './context';

export enum AttachmentType {
  IMAGE = 'image',
  VIDEO = 'video',
  DOC = 'doc',
}

const attachmentMap = {
  [AttachmentType.IMAGE]: 'image/png, image/jpeg',
  [AttachmentType.VIDEO]: 'video/mp4',
  [AttachmentType.DOC]: '.doc,.docx,.xml',
};

interface AddFileProps {
  children: ReactNode;
}

const FileLoader: FC<AddFileProps> = ({ children }) => {
  const [files, setFiles] = useState<File[]>([]);
  const ref = useRef<HTMLInputElement>(null);

  const htmlForName = 'fileUpload';

  const tools = useMemo(
    () => ({
      htmlForName: 'fileUpload',
      addFile: (type: AttachmentType) => {
        ref.current?.setAttribute('accept', attachmentMap[type]);
        ref.current?.click();
      },
    }),
    []
  );

  const handleChange = (e: any) => {
    if (e.target.files.length) {
      setFiles((prevFiles) => [...prevFiles, e.target.files[0]]);
    }
  };

  const handleDelete = (fileIndex: number) => {
    const filesCopy = [...files];
    setFiles(filesCopy.filter((_, index) => index !== fileIndex));
  };

  return (
    <div>
      <div className="flex">
        <FilesContext.Provider value={tools}>{children}</FilesContext.Provider>
      </div>
      <input
        ref={ref}
        name={htmlForName}
        onChange={handleChange}
        type="file"
        hidden
      />
      <FilesPreview files={files} onDelete={handleDelete} />
    </div>
  );
};

interface FilesPreviewProps {
  files: File[];
  onDelete: (file: any) => void;
}

const FilesPreview: FC<FilesPreviewProps> = ({ files, onDelete }) => {
  return (
    <div className="flex">
      {files.map((file, index) => (
        <div
          className="bg-gray-100 rounded-md p-2 m-1"
          onClick={() => onDelete(index)}
        >
          <div>{file?.name}</div>
          <button>X</button>
        </div>
      ))}
    </div>
  );
};

export default FileLoader;
