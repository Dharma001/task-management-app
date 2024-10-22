import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import MainLayout from '../layouts/MainLayout';
import { routeConfig } from './routeConfig';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {routeConfig
        .filter(route => !route.protected)
        .map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}

      <Route element={<MainLayout />}>
        {routeConfig
          .filter(route => route.protected) 
          .map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute>
                  {route.element}
                </ProtectedRoute>
              }
            />
          ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
