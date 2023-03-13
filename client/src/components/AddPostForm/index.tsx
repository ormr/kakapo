import { FC, useRef, useState } from "react";
import sanitizeHtml from 'sanitize-html';
import ImageIcon from "../../assets/ImageIcon";
import PaperclipIcon from "../../assets/Paperclip";
import VideoIcon from "../../assets/VideoIcon";
import useOnClickOutside from "../../hooks/useOutsideClick";
import Button from "../Button";
import TextArea from '../Textarea';
import Progressbar from "./ProgressBar";

interface AddPostFormProps {
  onFormClose: VoidFunction;
}

const AddPostForm: FC<AddPostFormProps> = ({ onFormClose }) => {
  const maxValue = 250;
  const rawText = useRef('');
  const [plainText, setPlainText] = useState('');
  const formRef = useRef() as any;

  const handleChange = (value: string) => {
    const testTags = new RegExp(/<\/?[^>]+(>|$)/g);

    // if (value.length > maxValue && !testTags.test(value)) {
    //   rawText.current =
    //     value.slice(0, maxValue) +
    //     '<span class="bg-red-700 text-white">' +
    //     sanitizeHtml(value.slice(maxValue, value.length - 1)) +
    //     '</span>';
    // } else {
    rawText.current = value;
    // }

    setPlainText(sanitizeHtml(value));
  };

  const handleAddPost = () => {
    console.log('post has been created');

    onFormClose();
  }

  const isMoreThanMaxValue = plainText.length > maxValue;

  useOnClickOutside(formRef, () => onFormClose());

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 bg-neutral-700 bg-opacity-50">
      <div ref={formRef} className="w-full h-72 fixed bottom-0 bg-white py-6 px-3">
        <h3 className="mb-3 font-bold">Create post</h3>
        <TextArea value={rawText.current} onChange={handleChange} />
        <div className="w-full flex items-center gap-3.5 mt-2 mb-4">
          <p className="text-xs text-gray-400">Add:</p>
          <button>
            <ImageIcon />
          </button>
          <button>
            <VideoIcon />
          </button>
          <button>
            <PaperclipIcon />
          </button>
          <Progressbar value={plainText.length} maxValue={maxValue} />
        </div>
        <Button onClick={handleAddPost} disabled={isMoreThanMaxValue} />
      </div>
    </div>
  );
};

export default AddPostForm;
