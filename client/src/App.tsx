import React, { ReactElement, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const MainPage = React.lazy(() => import('./pages/MainPage'));
const DetailPage = React.lazy(() => import('./pages/DetailPage'));
// const CreatePage = React.lazy(() => import('./pages/CreatePage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const LogInPage = React.lazy(() => import('./pages/LogInPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));

const App = (): ReactElement => (
  <Suspense fallback={<div>Loading...</div>}>
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:id" element={<DetailPage />} />
        {/* <Route path="/create" element={<CreatePage />} /> */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Layout>
  </Suspense>
);

export default App;
