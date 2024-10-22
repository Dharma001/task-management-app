import Index from '../pages/Dashboard/Index';
import Task from '../pages/Dashboard/Task/Index';
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
    element: <Index />,
    protected: true 
  },
  { 
    path: "/tasks",
    element: <Task />,
    protected: true 
  }
];
