import React, { ChangeEvent, FC } from 'react';

interface CheckboxProps {
  id?: string;
  name?: string;
  value?: string | ReadonlyArray<string> | number | undefined;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Checkbox: FC<CheckboxProps> = ({ id, name, value, onChange, label }) => (
  <label className="flex gap-4">
    <input
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      type="checkbox"
      className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
    />

    <span className="text-sm text-gray-700">{label}</span>
  </label>
);

export default Checkbox;
