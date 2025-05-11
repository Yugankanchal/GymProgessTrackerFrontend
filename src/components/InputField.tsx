import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  name: string;
  icon?: React.ReactNode;
  error?: string;
  togglePassword?: boolean;
  fullWidth?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  icon,
  error,
  togglePassword = false,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    props.onChange?.(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = togglePassword && props.type === 'password'
    ? (showPassword ? 'text' : 'password')
    : props.type;

  const widthClass = fullWidth ? 'w-full' : '';
  const floatingLabelClass = focused || hasValue
    ? 'transform -translate-y-[22px] scale-75 text-blue-600'
    : 'text-gray-500';

  return (
    <div className={`relative ${widthClass} ${className}`}>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}

        <input
          id={name}
          name={name}
          type={inputType}
          className={`peer ${className} block w-full rounded-lg border ${error ? 'border-red-500' : focused ? 'border-blue-500' : 'border-gray-300'} bg-transparent px-3 ${icon ? 'pl-10' : ''} py-3 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-200' : 'focus:ring-blue-200'} transition-all duration-200`}
          placeholder={label}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />

        <label
          htmlFor={name}
          className={`absolute left-3 ${icon ? 'left-10' : ''} top-1/2 -translate-y-1/2 ${floatingLabelClass} origin-[0] transition-all duration-200 pointer-events-none text-sm ml-[1.5rem]`}
        >
          {label}
        </label>

        {togglePassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-red-600 animate-slideIn">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;