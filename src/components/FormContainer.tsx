import React from 'react';

interface FormContainerProps {
  children: React.ReactNode;
  className?: string;
}

const FormContainer: React.FC<FormContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl ${className}`}>
      {children}
    </div>
  );
};

export default FormContainer;