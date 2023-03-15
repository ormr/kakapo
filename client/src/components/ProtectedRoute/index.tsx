import React, { FC, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

interface ProtectedRouteProps {
  redirectPath?: string;
  children: any;
}

const ProtectedRoute = ({
  redirectPath = '/login',
  children,
}: ProtectedRouteProps) => {
  const { user } = useAppSelector((app) => app.auth);

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
