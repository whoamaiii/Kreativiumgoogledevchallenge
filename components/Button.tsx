
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseClasses =
    'px-4 py-2.5 text-sm font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-background transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-brand-primary text-white hover:bg-blue-500 focus:ring-brand-primary shadow-glow',
    secondary:
      'bg-brand-surface text-brand-text hover:bg-slate-600 focus:ring-brand-subtle-text border border-brand-border',
    tertiary: 'bg-transparent text-brand-subtle-text hover:bg-brand-surface/50 hover:text-brand-text focus:ring-brand-subtle-text',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
