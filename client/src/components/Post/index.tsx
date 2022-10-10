import React, { FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './post.module.scss';
import { Post as PostProps } from '../../features/posts/postSlice';
import Author from './Author';
import { BASE_URL } from '../../core/axios';

const Post: FC<PostProps> = (props): ReactElement => {
  const { id, title, content, createdAt, author, imageId } = props;

  return (
    <Box className={styles.post}>
      <Box className={styles.header}>
        <Author name={author?.name || 'Author'} image={`${BASE_URL}/local-files/${author?.avatarId}`} />
        <Box className={styles.date}>{createdAt}</Box>
      </Box>
      <Box>
        <Box className={styles.image}>
          <Link to={`/posts/${id}`}>
            <img src={`${BASE_URL}/local-files/${imageId}`} alt="post" />
          </Link>
        </Box>
        <Box className={styles.title}>{title}</Box>
      </Box>
      <Box className={styles.preview}>{content}</Box>
    </Box>
  );
};

export default Post;
