import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface SidebarLinkProps {
  to: string;
  activeIcon: JSX.Element;
  inactiveIcon: JSX.Element;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, activeIcon, inactiveIcon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const showText = useSelector((state: RootState) => state.toggle.isSidebarToggled);

  return (
    <li>
      <Link to={to} className=''>
        <span className={`hover:bg-indigo-600 px-4 py-3 rounded-full hover:bg-opacity-20 hover:text-black hover:font-semibold flex items-center gap-1 ${isActive ? 'bg-indigo-500 text-white' : ''} ${showText ? 'flex items-center justify-center' : ''}`}>
          {isActive ? activeIcon : inactiveIcon}
          {!showText && (
            <span className={`ml-2 text-md ${isActive ? 'font-semibold' : 'font-normal'}`}>
              {label}
            </span>
          )}
        </span>
      </Link>
    </li>
  );
};

export default SidebarLink;
