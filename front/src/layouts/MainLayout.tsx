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
          <button 
            onClick={handleToggle} 
            className='border bg-white rounded-md border-indigo-500 z-50 p-2 flex absolute top-10 -right-5'
            aria-label="Toggle Sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024">
              <rect width="1024" height="1024" fill="none" />
              <path fill="currentColor" d="M609.408 149.376L277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0a30.59 30.59 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.59 30.59 0 0 0 0-42.688a29.12 29.12 0 0 0-41.728 0" />
            </svg>
          </button>
        </div>
        <main className='flex-1 w-[80%] border-r border-opacity-30 border-l border-gray-900 lg:w-[69%] overflow-y-auto'>
          <div className="p-4 border-stone-500 border-b border-opacity-30 w-full flex items-center justify-end">
            <div className="">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 36 36">
                <path fill="currentColor" d="M32.51 27.83A14.4 14.4 0 0 1 30 24.9a12.6 12.6 0 0 1-1.35-4.81v-4.94A10.81 10.81 0 0 0 19.21 4.4V3.11a1.33 1.33 0 1 0-2.67 0v1.31a10.81 10.81 0 0 0-9.33 10.73v4.94a12.6 12.6 0 0 1-1.35 4.81a14.4 14.4 0 0 1-2.47 2.93a1 1 0 0 0-.34.75v1.36a1 1 0 0 0 1 1h27.8a1 1 0 0 0 1-1v-1.36a1 1 0 0 0-.34-.75M5.13 28.94a16.2 16.2 0 0 0 2.44-3a14.2 14.2 0 0 0 1.65-5.85v-4.94a8.74 8.74 0 1 1 17.47 0v4.94a14.2 14.2 0 0 0 1.65 5.85a16.2 16.2 0 0 0 2.44 3Z" className="clr-i-outline clr-i-outline-path-1" />
                <path fill="currentColor" d="M18 34.28A2.67 2.67 0 0 0 20.58 32h-5.26A2.67 2.67 0 0 0 18 34.28" />
                <path fill="none" d="M0 0h36v36H0z" />
              </svg>
            </div>
          </div>
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
