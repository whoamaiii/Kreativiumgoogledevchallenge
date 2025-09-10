
import React, { useState } from 'react';

interface RangeSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 10,
  step = 0.5,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex items-center gap-4 w-full group">
      <label className="text-sm text-brand-subtle-text w-28 shrink-0">{label}</label>
      <div className="relative flex-grow h-5 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute w-full h-1.5 bg-brand-border rounded-full appearance-none cursor-pointer thumb:appearance-none thumb:w-4 thumb:h-4 thumb:bg-brand-primary thumb:rounded-full"
          style={{
            background: `linear-gradient(to right, #3B82F6 ${percentage}%, #334155 ${percentage}%)`,
          }}
        />
        {(isDragging || value !== 0) && (
             <div
                className="absolute bg-brand-primary text-white text-xs font-semibold px-2 py-0.5 rounded-md -top-6 transform -translate-x-1/2 transition-opacity duration-200"
                style={{ left: `${percentage}%` }}
             >
                {value.toFixed(1)}
            </div>
        )}
      </div>
      <span className="text-sm font-medium text-brand-text w-8 text-right">{value.toFixed(1)}</span>
    </div>
  );
};

export default RangeSlider;
