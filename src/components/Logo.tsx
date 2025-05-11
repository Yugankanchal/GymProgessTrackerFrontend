import React from 'react';
import { Shield } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 40 }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-2 shadow-md">
        <Shield size={size} className="text-white" />
      </div>
    </div>
  );
};

export default Logo;