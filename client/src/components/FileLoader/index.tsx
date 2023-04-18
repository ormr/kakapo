import React, { FC, ReactNode, useState, useRef, useMemo, useEffect } from 'react';
import { FilesContext } from './context';
import FilesPreview from './FilesPreview';

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
  files?: File[];
  onChange: (files: File[]) => void;
  children: ReactNode;
}

const FileLoader: FC<AddFileProps> = ({ children, files: defaultFiles = [], onChange }) => {
  const [files, setFiles] = useState<File[]>(defaultFiles);
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

  useEffect(() => {
    onChange(files);
  }, [files]);

  return (
    <div className="w-full">
      <div className="flex gap-3.5 pb-2">
        <p className="text-xs text-gray-400">Add:</p>
        <div className="flex space-x-3">
          <FilesContext.Provider value={tools}>{children}</FilesContext.Provider>
        </div>
      </div>
      <input ref={ref} name={htmlForName} onChange={handleChange} type="file" hidden />
      <FilesPreview files={files} onDelete={handleDelete} />
    </div>
  );
};

export default FileLoader;
