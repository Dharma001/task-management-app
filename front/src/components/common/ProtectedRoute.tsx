import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, isLoading = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    setIsAuthenticated(!!token);
    setAuthLoading(false);
  }, []);

  if (isLoading || authLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/mero-task" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
