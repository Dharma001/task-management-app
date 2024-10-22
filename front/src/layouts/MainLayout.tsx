import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleSidebar } from '../redux/toggleSlice';
import Sidebar from '../components/layout/Sidebar';

const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state: RootState) => state.toggle.isSidebarToggled);

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="bg-white h-screen">
      <div className='flex gap-1 w-full h-full'>
        <div className={`relative ${toggle ? 'w-[9%] lg:w-[5%]' : 'w-[25%] lg:w-[14%]'}`}>
          <Sidebar />
          <button onClick={handleToggle} className='border bg-white rounded-md border-indigo-500 z-50 p-2 flex absolute top-10 -right-5'>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024"><rect width="1024" height="1024" fill="none"/><path fill="currentColor" d="M609.408 149.376L277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0a30.59 30.59 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.59 30.59 0 0 0 0-42.688a29.12 29.12 0 0 0-41.728 0"/></svg>
          </button>
        </div>
        <main className='flex-1 w-[80%] border-r border-l border-gray-900 border-opacity-90 pl-4 lg:w-[69%] overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
