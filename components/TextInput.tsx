
import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

const TextInput: React.FC<TextInputProps> = ({ label, icon, ...props }) => {
  return (
    <div className="w-full">
      <label className="block text-xs font-medium text-brand-subtle-text mb-1.5">{label}</label>
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-brand-subtle-text">
            {icon}
          </div>
        )}
        <input
          className={`w-full bg-brand-surface border border-brand-border rounded-lg py-2.5 text-brand-text placeholder-brand-subtle-text focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent ${icon ? 'pl-10 pr-3' : 'pl-3 pr-3'}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default TextInput;
