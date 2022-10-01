import React, { ReactElement, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const MainPage = React.lazy(() => import('./pages/MainPage'));
const DetailPage = React.lazy(() => import('./pages/DetailPage'));
const CreatePage = React.lazy(() => import('./pages/CreatePage'));
const SignInPage = React.lazy(() => import('./pages/SignInPage'));
const LogInPage = React.lazy(() => import('./pages/LogInPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));

const App = (): ReactElement => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/:id" element={<DetailPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/log-in" element={<LogInPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  </Suspense>
);

export default App;
