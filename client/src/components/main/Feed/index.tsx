import { RootState } from '@src/app/store';
import { addPost, Post } from '@src/slices/postSlice';
import React, { FC, ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const author = 'Serafim Gavrilov <seraf.gavrilov@gmail.com>';
const initialValue = {
  title: '',
  text: '',
  author,
};

export const Feed: FC = (): ReactElement => {
  const { posts } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();
  const [currentPost, setCurrentPost] = useState<Post>(initialValue);

  const handleSubmit = () => {
    dispatch(addPost(currentPost));
    setCurrentPost(initialValue);
  };

  return (
    <div>
      <div>
        {posts.map((item) => (
          <div>
            <div>{item.title}</div>
            <div>{item.text}</div>
            <div>Автор: {item.author}</div>
          </div>
        ))}
      </div>
      <div>
        <div>
          <label htmlFor="title">Заголовок</label>
          <input
            id="title"
            type="text"
            value={currentPost.title}
            onChange={(e) =>
              setCurrentPost({
                ...currentPost,
                title: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label htmlFor="text">Текст</label>
          <input
            id="text"
            type="text"
            value={currentPost.text}
            onChange={(e) =>
              setCurrentPost({
                ...currentPost,
                text: e.target.value,
              })
            }
          />
        </div>
        <button onClick={handleSubmit}>Добавить</button>
      </div>
    </div>
  );
};
