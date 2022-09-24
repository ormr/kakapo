import React, { FC, ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from '@src/components/Header';

import MainPage from '@src/pages/MainPage';
import DetailPage from '@src/pages/DetailPage';
import CreatePage from '@src/pages/CreatePage';
import SignInPage from '@src/pages/SignInPage';
import LogInPage from '@src/pages/LogInPage';
import ProfilePage from '@src/pages/ProfilePage';


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
      <Route path="/" element={<MainPage />} />
      <Route path="/:id" element={<DetailPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/log-in" element={<LogInPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  </>
);
