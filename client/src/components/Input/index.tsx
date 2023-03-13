import React, { ChangeEvent, FC } from 'react';

interface InputProps {
  id?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({ id, type = 'text', placeholder, value, onChange }) => (
  <input
    id={id}
    type={type}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
  />
);

export default Input;
