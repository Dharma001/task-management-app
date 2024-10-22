import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  routeName?: string;
  icon: React.ReactNode;
  type?: 'create' | 'delete' | 'edit' | string;
  label?: string | number;
  roundedFull?: boolean;
  small?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  routeName,
  icon,
  type = 'edit',
  label,
  roundedFull = false,
  small = false,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const tooltipText = useMemo(() => {
    switch (type) {
      case 'create':
        return 'Create';
      case 'delete':
        return 'Delete';
      case 'edit':
        return 'Edit';
      default:
        return '';
    }
  }, [type]);

  const buttonColorClass = useMemo(() => {
    switch (type) {
      case 'create':
        return 'bg-indigo-600 hover:bg-indigo-700';
      case 'delete':
        return 'bg-pink-600 hover:bg-pink-700';
      case 'edit':
        return 'bg-purple-600 hover:bg-purple-700';
      default:
        return 'bg-black hover:bg-gray-600';
    }
  }, [type]);

  const isRounded = roundedFull || !small;
  const isLink = !!routeName;

  const buttonClasses = [
    'flex items-center relative justify-center py-2 px-2 text-white transition duration-300',
    buttonColorClass,
    isRounded ? 'rounded-full' : 'rounded-md',
    small ? 'text-sm py-1 px-2' : 'text-sm py-2 px-2',
    !isRounded ? 'hover:shadow-lg' : '',
  ].join(' ');

  const renderButtonContent = () => (
    <>
      {label ? (
        <span className="flex items-center space-x-1">
          <span className="text-white font-bold text-[1.3rem]">{icon}</span>
          <span className="ml-1">{label}</span>
        </span>
      ) : (
        <span className="text-white font-bold text-[1.2rem]">{icon}</span>
      )}
      {tooltipText && (
        <div
          className={`tooltip absolute z-50 top-full left-1/2 transform -translate-x-1/2 mt-2 ${
            showTooltip ? 'block' : 'hidden'
          } bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-no-wrap`}
        >
          {tooltipText}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-800" />
        </div>
      )}
    </>
  );

  return (
    <div className="group flex items-center justify-end">
      {isLink ? (
        <Link to={routeName}>
          <button
            className={buttonClasses}
            onMouseOver={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            aria-label={tooltipText}
          >
            {renderButtonContent()}
          </button>
        </Link>
      ) : (
        <button
          className={buttonClasses}
          onMouseOver={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label={tooltipText}
        >
          {renderButtonContent()}
        </button>
      )}
    </div>
  );
};

export default ButtonComponent;
