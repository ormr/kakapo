import React, { FC, SVGProps } from 'react';

interface EditIconProps {
  active?: boolean;
}

const EditIcon: FC<EditIconProps & SVGProps<SVGSVGElement>> = ({ active, ...props }) =>
  active ? (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 13V16H7L16 7L13 4L4 13Z" fill="#9CDD05" stroke="#e9f7c6" strokeWidth="2" />
    </svg>
  ) : (
    <svg {...props} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 13V16H7L16 7L13 4L4 13Z" fill="#e9f7c6" stroke="#9CDD05" strokeWidth="2" />
    </svg>
  );

EditIcon.defaultProps = {
  active: false,
};

export default EditIcon;
