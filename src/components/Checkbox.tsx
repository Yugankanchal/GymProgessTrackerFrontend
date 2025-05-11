import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked = false,
  onChange,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative flex items-center">
        <input
          id={id}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
          {...props}
        />
        <div
          className={`h-5 w-5 rounded border ${
            checked 
              ? 'bg-blue-600 border-blue-600' 
              : 'bg-white border-gray-300'
          } flex items-center justify-center transition-colors duration-200`}
        >
          {checked && <Check className="h-3.5 w-3.5 text-white stroke-2" />}
        </div>
      </div>
      <label
        htmlFor={id}
        className="ml-2 text-sm text-gray-700 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;