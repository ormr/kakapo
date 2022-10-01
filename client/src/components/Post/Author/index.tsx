import { Avatar, Box } from '@mui/material'
import React, { FC } from 'react'
import styles from './author.module.scss'

interface AuthorProps {
  name: string
  image?: string
}

export const Author: FC<AuthorProps> = ({ name, image }) => (
  <Box className={styles.item}>
    <Avatar sx={{ bgcolor: '#1976d2' }} src={image}>
      {!image && name.slice(0, 1).toUpperCase()}
    </Avatar>
    <Box className={styles.name}>{name}</Box>
  </Box>
)
