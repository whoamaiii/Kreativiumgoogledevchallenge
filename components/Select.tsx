
import React from 'react';
import { ChevronDownIcon } from './icons';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  icon?: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, children, icon, ...props }) => {
  return (
    <div className="w-full">
      <label className="block text-xs font-medium text-brand-subtle-text mb-1.5">{label}</label>
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </div>
        )}
        <select
          className={`w-full bg-brand-surface border border-brand-border rounded-lg py-2.5 text-brand-text placeholder-brand-subtle-text focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent appearance-none ${icon ? 'pl-10 pr-10' : 'pl-3 pr-10'}`}
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-brand-subtle-text">
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default Select;
