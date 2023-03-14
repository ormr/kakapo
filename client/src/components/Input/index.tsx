import React, { ChangeEvent, FC, HTMLInputTypeAttribute } from 'react';

interface InputProps {
  id?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  name?: string;
  value?: string | ReadonlyArray<string> | number | undefined;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
  id,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
}) => (
  <input
    id={id}
    type={type}
    name={name}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
  />
);

export default Input;
