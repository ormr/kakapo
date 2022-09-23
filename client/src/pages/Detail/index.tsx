import React, { FC, ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

export const Detail: FC = (): ReactElement => {
  const location = useLocation();
  return (
    <div>Детальная страница: {location.pathname}</div>
  );
}