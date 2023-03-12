import React, { FC } from 'react';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
}

const Textarea: FC<TextareaProps> = ({ value, onChange }) => {
  const handleCopy = (event: any) => {
    const selection = document.getSelection();
    event.clipboardData.setData('text/plain', sanitizeHtml(`${selection}`));
  };

  return (
    <ContentEditable
      className="h-24 py-2.5 px-2 w-full shadow-none block border-2 border-neutral-300 focus:ring-blue-500 focus:border-blue-500 rounded-sm resize-none overflow-hidden"
      contentEditable={false}
      html={value}
      onChange={(event) => onChange(event.target.value)}
      onCopy={(event) => handleCopy(event)}
      onPaste={(event) => console.log(event)}
    />
  );
};

export default Textarea;
