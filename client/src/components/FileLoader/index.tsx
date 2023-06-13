import { FC, ReactNode, useState, useRef, useMemo, useEffect } from 'react';
import FilesContext from './context';
import FilesPreview from './FilesPreview';
import { attachmentMap, AttachmentType } from './utils';

interface AddFileProps {
  fileIds?: (File | string)[];
  onChange: (files: (File | string)[]) => void;
  children: ReactNode;
}

const FileLoader: FC<AddFileProps> = ({ children, fileIds: existingFileIds = [], onChange }) => {
  const [files, setFiles] = useState<(File | string)[]>(existingFileIds);
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
      <FilesPreview
        files={files.map((file) => (typeof file === 'string' ? file : file.name))}
        onDelete={handleDelete}
      />
    </div>
  );
};

FileLoader.defaultProps = {
  fileIds: [],
};

export default FileLoader;
