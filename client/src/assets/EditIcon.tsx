import React, { FC, SVGProps } from 'react';

interface EditIconProps {
  active?: boolean;
}

const EditIcon: FC<EditIconProps & SVGProps<SVGSVGElement>> = ({ active, ...props }) =>
  active ? (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 13V16H7L16 7L13 4L4 13Z" fill="#8B5CF6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  ) : (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 13V16H7L16 7L13 4L4 13Z" fill="#EDE9FE" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );

export default EditIcon;
