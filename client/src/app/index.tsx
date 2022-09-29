import React, { FC, ReactElement, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@src/components/Layout';

const MainPage = React.lazy(() => import('@src/pages/MainPage'));
const DetailPage = React.lazy(() => import('@src/pages/DetailPage'));
const CreatePage = React.lazy(() => import('@src/pages/CreatePage'));
const SignInPage = React.lazy(() => import('@src/pages/SignInPage'));
const LogInPage = React.lazy(() => import('@src/pages/LogInPage'));
const ProfilePage = React.lazy(() => import('@src/pages/ProfilePage'));


/*
  TODO:
  1. Базовая верстка всех компонентов
  2. Отладка компонента Feed на тестовых данных
  3. Страница создания статьи
  4. Авторизация
*/

export const App: FC = (): ReactElement => (
  <>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/:id" element={<DetailPage />}></Route>
          <Route path="/create" element={<CreatePage />}></Route>
          <Route path="/sign-in" element={<SignInPage />}></Route>
          <Route path="/log-in" element={<LogInPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Route>
      </Routes>
    </Suspense>
  </>
);
