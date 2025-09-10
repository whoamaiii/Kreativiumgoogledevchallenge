
import React from 'react';

interface SegmentedControlProps<T extends string> {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}

const SegmentedControl = <T extends string,>({ options, value, onChange, label }: SegmentedControlProps<T>) => {
  return (
    <div>
      <label className="block text-xs font-medium text-brand-subtle-text mb-1.5">{label}</label>
      <div className="flex w-full p-1 space-x-1 bg-brand-surface rounded-lg border border-brand-border">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`w-full px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none ${
              value === option.value
                ? 'bg-brand-primary text-white shadow'
                : 'text-brand-subtle-text hover:bg-slate-600'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SegmentedControl;
