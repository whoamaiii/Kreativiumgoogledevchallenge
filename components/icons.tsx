import React from 'react';

// A generic icon wrapper to handle sizing and other props
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const Icon: React.FC<IconProps> = ({ size = 24, children, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
};

export const PlusCircle: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </Icon>
);

export const BarChart: React.FC<IconProps> = (props) => (
    <Icon {...props}>
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
    </Icon>
);

export const CheckCircle: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </Icon>
);

export const ChevronDown: React.FC<IconProps> = (props) => (
    <Icon {...props}>
        <polyline points="6 9 12 15 18 9" />
    </Icon>
);

export const Lightbulb: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2a7 7 0 0 0-7 7c0 3 2 5 2 7h10c0-2 2-4 2-7a7 7 0 0 0-7-7z" />
  </Icon>
);

export const AlertTriangle: React.FC<IconProps> = (props) => (
    <Icon {...props}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </Icon>
);

export const BrainCircuit: React.FC<IconProps> = (props) => (
    <Icon {...props}>
        <path d="M12 5a3 3 0 1 0-5.993.251" />
        <path d="M12 5a3 3 0 1 1 5.993.251" />
        <path d="M12 19a3 3 0 1 0-5.993-.251" />
        <path d="M12 19a3 3 0 1 1 5.993.251" />
        <path d="M12 12a3 3 0 1 0-5.993.251" />
        <path d="M12 12a3 3 0 1 1 5.993.251" />
        <path d="M20 12a3 3 0 1 0-5.993.251" />
        <path d="M20 12a3 3 0 1 1 5.993.251" />
        <path d="M4 12a3 3 0 1 0-5.993.251" />
        <path d="M4 12a3 3 0 1 1 5.993.251" />
        <path d="m14.5 6.5-2.5 3 2.5 3" />
        <path d="m9.5 14.5-2.5-3 2.5-3" />
        <path d="m14.5 17.5-2.5-3 2.5-3" />
        <path d="m9.5 9.5-2.5 3 2.5 3" />
    </Icon>
);

export const Loader: React.FC<IconProps> = ({ className, ...props }) => (
    <Icon {...props} className={`animate-spin ${className}`}>
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
        <line x1="2" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </Icon>
);

export const SunIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </Icon>
);

export const MoonIcon: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </Icon>
);