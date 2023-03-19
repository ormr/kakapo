import React, { ReactElement, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { setCredentials } from './features/auth/authSlice';
import { useAuthQuery } from './services/api/AuthApi';
import { useAppDispatch } from './store/hooks';

const MainPage = React.lazy(() => import('./pages/MainPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const LogInPage = React.lazy(() => import('./pages/LogInPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const DetailPage = React.lazy(() => import('./pages/DetailPage'));

const App = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { data: user } = useAuthQuery();

  useEffect(() => {
    if (user) {
      dispatch(setCredentials(user));
    }
  }, [user, dispatch]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/posts/:postId" element={<DetailPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Suspense>
  );
};

export default App;
