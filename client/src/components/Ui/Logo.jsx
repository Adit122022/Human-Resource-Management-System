import React from 'react';
import { Building2 } from 'lucide-react';

const Logo = ({ 
  size = 'md', 
  showText = true, 
  variant = 'default',
  className = '' 
}) => {
  const sizes = {
    xs: { container: 'w-6 h-6', icon: 'w-3 h-3', text: 'text-xs' },
    sm: { container: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-sm' },
    md: { container: 'w-10 h-10', icon: 'w-5 h-5', text: 'text-base' },
    lg: { container: 'w-12 h-12', icon: 'w-6 h-6', text: 'text-lg' },
    xl: { container: 'w-16 h-16', icon: 'w-8 h-8', text: 'text-xl' },
    '2xl': { container: 'w-20 h-20', icon: 'w-10 h-10', text: 'text-2xl' }
  };

  const variants = {
    default: {
      container: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      icon: 'text-white',
      text: 'text-gray-900'
    },
    white: {
      container: 'bg-white shadow-lg',
      icon: 'text-blue-600',
      text: 'text-gray-900'
    },
    dark: {
      container: 'bg-gray-800',
      icon: 'text-white',
      text: 'text-white'
    },
    minimal: {
      container: 'bg-transparent',
      icon: 'text-blue-600',
      text: 'text-gray-900'
    }
  };

  const sizeConfig = sizes[size] || sizes.md;
  const variantConfig = variants[variant] || variants.default;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`
        ${sizeConfig.container} 
        ${variantConfig.container} 
        rounded-xl flex items-center justify-center
        shadow-sm transition-all duration-200
      `}>
        <Building2 className={`${sizeConfig.icon} ${variantConfig.icon}`} />
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`
            font-bold leading-tight tracking-tight
            ${sizeConfig.text} ${variantConfig.text}
          `}>
            WorkFlow
          </span>
          <span className={`
            text-xs leading-none tracking-wide
            ${variantConfig.text} opacity-60
          `}>
            HRMS
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;