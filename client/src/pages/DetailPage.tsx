import React, { FC, ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

const DetailPage: FC = (): ReactElement => {
  const location = useLocation();
  return (
    <>
      <div>Детальная страница: {location.pathname}</div>
    </>
  );
};

export default DetailPage;
