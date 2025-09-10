import React from 'react';

interface ChipProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

const Chip: React.FC<ChipProps> = ({ label, isSelected = false, onClick, className = '' }) => {
  const baseClasses = 'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer';
  
  const selectedClasses = isSelected
    ? 'bg-brand text-white'
    : 'bg-elev text-muted hover:bg-border hover:text-text';

  return (
    <div
      className={`${baseClasses} ${selectedClasses} ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      {label}
    </div>
  );
};

export default Chip;