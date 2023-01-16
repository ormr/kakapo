import React, {
  useState,
  useEffect,
  useMemo,
  FC,
  ReactNode,
  useRef,
} from 'react';
import { useAppDispatch } from '../../store/hooks';
import { requestUserData } from '../../features/user/actions';
import Header from '../Header';
import PlusIcon from '../../assets/PlusIcon';
import ImageIcon from '../../assets/ImageIcon';
import VideoIcon from '../../assets/VideoIcon';
import PaperclipIcon from '../../assets/Paperclip';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestUserData());
  }, []);

  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode]
  );

  return (
    <div className="relative">
      <Header />
      <main>{children}</main>
      <CreatePost />
      {/* <AddPostButton onClick={() => console.log('!')}/> */}
    </div>
  );
};

const CreatePost = () => {
  const maxValue = 250;
  const rawText = useRef('');
  const [plainText, setPlainText] = useState('');

  const handleChange = (value: string) => {
    const text = value;
    const arrayText = text.split('');

    if (arrayText.length > maxValue) {
      rawText.current = arrayText.slice(0, maxValue).join('') +
        '<span class="bg-red-700 text-white">'
        + sanitizeHtml(arrayText.slice(maxValue, arrayText.length - 1).join('')) + '</span>';
    } else {
      rawText.current = sanitizeHtml(value);
    }

    setPlainText(value.replace(/<\/?[^>]+(>|$)/g, ''));
  };

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 bg-neutral-700 bg-opacity-50">
      <div className="w-full h-72 fixed bottom-0 bg-white py-6 px-3">
        <h3 className="mb-3 font-bold">Create post</h3>
        <Textarea value={rawText.current} onChange={handleChange} />
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
        <button className="w-full p-4 bg-black text-white border-1">
          Post
        </button>
      </div>
    </div>
  );
};

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
}

const Textarea: FC<TextareaProps> = ({ value, onChange }) => {

  const handleCopy = (event: any) => {
    const selection = document.getSelection();
    event.clipboardData.setData('text/plain', sanitizeHtml(`${selection}`));
  }

  return (
    <ContentEditable
      className="h-30 py-2.5 px-2 w-full shadow-none block border-2 border-neutral-300 focus:ring-blue-500 focus:border-blue-500 rounded-sm resize-none overflow-hidden"
      contentEditable={false}
      html={value}
      onChange={(event) => onChange(event.target.value)}
      onCopy={(event) => handleCopy(event)}
      onPaste={(event) => console.log(event)}
    />
  )
};

interface ProgressbarProps {
  value: number;
  maxValue: number;
}

const Progressbar: FC<ProgressbarProps> = ({ value, maxValue }) => {
  const getTextFullness = () => {
    if (value >= maxValue - 20 && value < maxValue) {
      return '#71767B';
    }

    if (value >= maxValue) {
      return '#F4212E';
    }

    return '#1D9BF9';
  };

  const getPathColor = () => {
    if (value >= maxValue - 20 && value < maxValue) {
      return '#FFD400';
    }

    if (value >= maxValue && value <= maxValue + 10) {
      return '#F4212E';
    }

    if (value > maxValue + 10) {
      return 'transparent';
    }
  };

  const getTrailColor = () => {
    if (value > maxValue + 10) {
      return 'transparent';
    }
  };

  return (
    <div className="flex-1 flex justify-end">
      <div className="w-7 h-7">
        <CircularProgressbar
          value={value}
          maxValue={maxValue}
          text={value >= maxValue - 20 ? `${maxValue - value}` : ''}
          styles={buildStyles({
            textSize: '2.5rem',
            pathColor: getPathColor(),
            textColor: getTextFullness(),
            trailColor: getTrailColor(),
          })}
        />
      </div>
    </div>
  );
};

interface AddPostButton {
  onClick: VoidFunction;
}

const AddPostButton: FC<AddPostButton> = ({ onClick }) => (
  <div className="fixed bottom-3 right-3">
    <button
      className="rounded-full bg-neutral-800 text-white p-3"
      onClick={onClick}
    >
      <PlusIcon />
    </button>
  </div>
);

export default Layout;
