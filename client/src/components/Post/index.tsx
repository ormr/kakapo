import { Box } from '@mui/material'
import React, { FC, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import styles from './post.module.scss'
import { Post as PostProps } from '../../features/posts/postSlice'
import { Author } from './Author'

export const Post: FC<PostProps> = (props): ReactElement => {
  const { id, title, content, createdAt, author, image } = props

  return (
    <Box className={styles.post}>
      <Box className={styles.header}>
        <Author name={author || 'asdashdj'} />
        <Box className={styles.date}>{createdAt}</Box>
      </Box>
      <Box>
        <Box className={styles.image}>
          <Link to={id}>
            <img src={image} />
          </Link>
        </Box>
        <Box className={styles.title}>{title}</Box>
      </Box>
      <Box className={styles.preview}>{content}</Box>
    </Box>
  )
}
