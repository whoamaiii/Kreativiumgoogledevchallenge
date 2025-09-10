import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, id, className = '', ...props }) => {
  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-muted mb-2">{label}</label>
      <input
        id={id}
        className="w-full bg-surface border border-border rounded-lg py-3 px-4 text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand"
        {...props}
      />
    </div>
  );
};

export default TextInput;