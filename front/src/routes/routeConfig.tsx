import Home from '../pages/Home';
import LoginAuth from '../pages/LoginAuth';

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  protected: boolean;
}

export const routeConfig: RouteConfig[] = [
  { 
     path: "/mero-task",
     element: <LoginAuth />,
     protected: false
  },
  { 
    path: "/",
    element: <Home />,
    protected: true 
  }
];
