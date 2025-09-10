import React from 'react';

interface RangeSliderProps {
  label: string;
  id: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  id,
  value,
  onChange,
  min = 0,
  max = 10,
  step = 0.5,
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <label htmlFor={id} className="flex justify-between items-center text-sm font-medium text-muted mb-2">
        <span>{label}</span>
        <span className="text-text font-bold bg-elev px-2 py-1 rounded-md">{value.toFixed(1)}</span>
      </label>
      <div className="relative">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer range-slider"
          style={{ '--percentage': `${percentage}%` } as React.CSSProperties}
        />
      </div>
    </div>
  );
};

export default RangeSlider;