import clsx from 'clsx';
import React, { FC } from 'react';

interface PostFilesPreviewProps {
  fileIds: string[];
}

interface FilePositionsStyles {
  [key: number]: {
    wrapper: string;
    figure: (index: number) => string | undefined;
  };
}

const filePositionsByLength: FilePositionsStyles = {
  1: {
    wrapper: 'grid-cols-1',
    figure: () => undefined,
  },
  2: {
    wrapper: 'grid-cols-2 gap-1',
    figure: () => undefined,
  },
  3: {
    wrapper: 'grid-cols-2 gap-1',
    figure: (index: number) => (index === 1 ? 'row-span-2' : undefined),
  },
};

const PostFilesPreview: FC<PostFilesPreviewProps> = ({ fileIds }) => {
  const currentFilesPositionStyles = filePositionsByLength[fileIds.length];

  return (
    <div className={clsx('grid auto-rows-max', currentFilesPositionStyles.wrapper)}>
      {fileIds.map((id, index) => (
        <figure key={id + index} className={clsx('w-full h-[512px]', currentFilesPositionStyles.figure(index))}>
          <img className="w-full h-full object-cover rounded-lg" src={`/local-files/${id}`} alt={`post-${index}`} />
        </figure>
      ))}
    </div>
  );
};

export default PostFilesPreview;
