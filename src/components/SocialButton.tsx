import React from 'react';
import { ToggleLeft as Google } from 'lucide-react';

interface SocialButtonProps {
  provider: 'google' | 'apple' | 'github' | 'facebook';
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  onClick,
  className = '',
  icon
}) => {
  const getProviderName = () => {
    return provider.charAt(0).toUpperCase() + provider.slice(1);
  };

  const getProviderIcon = () => {
    if (icon) return icon;
    
    switch (provider) {
      case 'google':
        return <Google className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex items-center justify-center w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all duration-200 ${className}`}
    >
      <span className="absolute left-3">{getProviderIcon()}</span>
      <span>{getProviderName()}</span>
    </button>
  );
};

export default SocialButton;