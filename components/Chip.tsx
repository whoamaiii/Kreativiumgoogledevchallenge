
import React from 'react';

interface ChipProps {
  label: string;
  onSelect: () => void;
  isSelected: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const Chip: React.FC<ChipProps> = ({ label, onSelect, isSelected, prefix, suffix }) => {
  const baseClasses = 'flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full cursor-pointer transition-colors duration-200';
  const selectedClasses = 'bg-brand-primary/20 text-brand-primary border border-brand-primary';
  const unselectedClasses = 'bg-brand-surface text-brand-subtle-text hover:bg-slate-600 border border-brand-border';
  
  return (
    <button onClick={onSelect} className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}>
      {prefix}
      <span>{label}</span>
      {suffix}
    </button>
  );
};

export default Chip;
