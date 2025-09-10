import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseClasses = 'px-6 py-3 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'bg-brand text-white hover:opacity-90 focus:ring-brand disabled:bg-brand/50 disabled:cursor-not-allowed',
    secondary: 'bg-elev text-text hover:bg-border focus:ring-muted disabled:bg-elev/50 disabled:cursor-not-allowed',
    ghost: 'bg-transparent text-muted hover:bg-surface hover:text-text focus:ring-muted disabled:text-muted/50 disabled:cursor-not-allowed',
  };

  const loadingClasses = isLoading ? 'opacity-75 cursor-wait' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${loadingClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;