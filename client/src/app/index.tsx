import React, { FC, ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { About } from '@src/components/About';
import { Header } from '@src/components/Header';

import { Main } from '@src/pages/Main';
import { Profile } from '@src/pages/Profile';
import { Create } from '@src/pages/Create';
import { Detail } from '@src/pages/Detail';
import { SignIn } from '@src/pages/SignIn';
import { LogIn } from '@src/pages/LogIn';

/*
  TODO:
  1. Базовая верстка всех компонентов
  2. Отладка компонента Feed на тестовых данных
  3. Страница создания статьи
  4. Авторизация
*/

export const App: FC = (): ReactElement => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/:id" element={<Detail />} />
      <Route path="/create" element={<Create />} />
      <Route path="/about" element={<About />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/log-in" element={<LogIn />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </>
);
