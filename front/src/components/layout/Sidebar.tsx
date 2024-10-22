import React from 'react';
import SidebarLink from '../specific/SidebarLink';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

const Sidebar: React.FC = () => {
  const showText = useSelector((state: RootState) => state.toggle.isSidebarToggled);

  return (
    <aside className='w-full z-0 h-full p-4 space-y-4 overflow-y-auto'>
      <div className='flex px-4 gap-2 items-end border-b-2 pb-4 border-gray-400 border-opacity-30'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 lg:w-[31px] lg:h-[31px] text-indigo-500"
          width="1.7rem" height="1.7rem" viewBox="0 0 16 16"><rect width="16" height="16" fill="none" /><path fill="currentColor" d="M6 5h6.75C13.44 5 14 4.44 14 3.75v-.5C14 2.56 13.44 2 12.75 2H6zM5 2H3.25C2.56 2 2 2.56 2 3.25v.5C2 4.44 2.56 5 3.25 5H5zm3 8h4.75c.69 0 1.25-.56 1.25-1.25v-1.5C14 6.56 13.44 6 12.75 6H8zM7 6H5.25C4.56 6 4 6.56 4 7.25v1.5C4 9.44 4.56 10 5.25 10H7zm5.75 8H8v-3h4.75c.69 0 1.25.56 1.25 1.25v.5c0 .69-.56 1.25-1.25 1.25m-7.5-3H7v3H5.25C4.56 14 4 13.44 4 12.75v-.5c0-.69.56-1.25 1.25-1.25" />
        </svg>
        <p className={`text-xl font-semibold text-indigo-600 ${showText ? 'hidden' : ''}`}>Mero Task</p>
      </div>
      <nav className='relative'>
        <ul className='text-black  space-y-2'>
          <SidebarLink
            to="/"
            label="Dashboard"
            activeIcon={
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24"><rect width="24" height="24" fill="none" /><path fill="currentColor" d="M13 3v6h8V3m-8 18h8V11h-8M3 21h8v-6H3m0-2h8V3H3z" /></svg>
            }
            inactiveIcon={
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 4h8v6h-8zm0 17V11h8v10zm-9 0v-6h8v6zm0-7V4h8v10zm1-9v8h6V5zm9 0v4h6V5zm0 7v8h6v-8zm-9 4v4h6v-4z" />
              </svg>
            }
          />
          <SidebarLink
            to="/tasks"
            label="Tasks"
            activeIcon={
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 28 28">
                <path fill="currentColor" d="M7.25 2A3.25 3.25 0 0 0 4 5.25v17.5A3.25 3.25 0 0 0 7.25 26h9.568l-2.157-2.157a2.25 2.25 0 1 1 3.182-3.182l1.407 1.407l4.409-4.409q.16-.16.341-.28V5.25A3.25 3.25 0 0 0 20.75 2zm3.25 6.75a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0m-1.25 6.5a1.25 1.25 0 1 1 0-2.5a1.25 1.25 0 0 1 0 2.5m0 5.25a1.25 1.25 0 1 1 0-2.5a1.25 1.25 0 0 1 0 2.5M12.75 8h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5M12 14a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 12 14m.75 4.5h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5m7.03 7.28l6-6a.75.75 0 1 0-1.06-1.06l-5.47 5.47l-2.468-2.468a.75.75 0 0 0-1.06 1.06l2.998 2.998a.75.75 0 0 0 1.06 0" />
              </svg>
            }
            inactiveIcon={
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 28 28">
                <path fill="currentColor" d="M4 5.25A3.25 3.25 0 0 1 7.25 2h13.5A3.25 3.25 0 0 1 24 5.25v12.129q-.181.12-.341.28L22.5 18.818V5.25a1.75 1.75 0 0 0-1.75-1.75H7.25A1.75 1.75 0 0 0 5.5 5.25v17.5c0 .966.784 1.75 1.75 1.75h8.068l1.5 1.5H7.25A3.25 3.25 0 0 1 4 22.75zm6.5 3.5a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0m-1.25 6.5a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5m0 5.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5M12.75 8a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5zM12 14a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 12 14m.75 4.5a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5zm13.03 1.28l-6 6a.75.75 0 0 1-1.06 0l-2.998-2.998a.75.75 0 0 1 1.06-1.06l2.468 2.467l5.47-5.47a.75.75 0 1 1 1.06 1.061" />
              </svg>
            }
          />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
