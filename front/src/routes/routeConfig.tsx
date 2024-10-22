import Index from '../pages/Dashboard/Index';
import TaskCreate from '../pages/Dashboard/Task/Create';
import TaskEdit from '../pages/Dashboard/Task/Edit';
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
  },
  { 
    path: "/tasks/create",
    element: <TaskCreate />,
    protected: true 
  },
  { 
    path: "/tasks/edit/:taskId", 
    element: <TaskEdit />,
    protected: true 
  }
];
