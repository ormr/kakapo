import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';

export const Header: FC = () => (
  <div className={styles.title}>
    <div>Serafim Gavrilov</div>
    <div>
      <div><Link to="/">Home</Link></div>
      <div><Link to="/about">About yourself</Link></div>
    </div>
  </div>
);
