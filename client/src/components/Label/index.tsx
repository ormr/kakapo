import React, { FC, ReactNode } from 'react';

interface LabelProps {
  children: ReactNode;
  htmlFor?: string;
}

const Label: FC<LabelProps> = ({ children, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-medium text-gray-700">
      {children}
    </label>
  )
}

export default Label;
