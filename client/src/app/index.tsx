import { LogIn } from '@src/components/auth/LogIn';
import { SignIn } from '@src/components/auth/SignIn';
import { About } from '@src/components/main/About';
import { Feed } from '@src/components/main/Feed';
import { Footer } from '@src/components/main/Footer';
import { Header } from '@src/components/main/Header';
import { Profile } from '@src/components/profile';
import React, { FC, ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';

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
      <Route path="/" element={<Feed />} />
      <Route path="/create" element={<Feed />} />
      <Route path="/about" element={<About />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/log-in" element={<LogIn />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
    <Footer />
  </>
);
