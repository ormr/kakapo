import { Routes, Route } from 'react-router-dom';
import { ReactElement, Suspense, useEffect, lazy } from 'react';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { setCredentials } from './features/auth/authSlice';
import { useAuthQuery } from './services/api/AuthApi';
import { useAppDispatch } from './store/hooks';

const MainPage = lazy(() => import('./pages/MainPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LogInPage = lazy(() => import('./pages/LogInPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const DetailPage = lazy(() => import('./pages/DetailPage'));

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
              <ProtectedRoute redirectPath="/login">
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
