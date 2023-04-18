import React, { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

interface ProtectedRouteProps {
  redirectPath: string;
  children: ReactNode;
}

const ProtectedRoute = ({ redirectPath, children }: ProtectedRouteProps): any => {
  const { user } = useAppSelector((app) => app.auth);

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
