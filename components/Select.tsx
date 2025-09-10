import React from 'react';
import { ChevronDown } from './icons';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, id, children, className = '', ...props }) => {
  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-muted mb-2">{label}</label>
      <div className="relative">
        <select
          id={id}
          className="w-full bg-surface border border-border rounded-lg py-3 px-4 text-text appearance-none focus:outline-none focus:ring-2 focus:ring-brand"
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted">
          <ChevronDown size={20} />
        </div>
      </div>
    </div>
  );
};

export default Select;