import React, { FC, ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';

export const App: FC = (): ReactElement => (
  <div>
    <Routes>
      <Route path="/home" component={() => <div>Home</div>} />
    </Routes>
  </div>
);
