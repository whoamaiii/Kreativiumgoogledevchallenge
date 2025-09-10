import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Chip from '../components/Chip';
import RangeSlider from '../components/RangeSlider';
import SegmentedControl from '../components/SegmentedControl';
import Select from '../components/Select';
import TextInput from '../components/TextInput';
import { Lightbulb } from '../components/icons';

const ComponentShowcase: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(5);
  const [segmentedValue, setSegmentedValue] = useState<'yes' | 'no'>('yes');
  const [selectedChips, setSelectedChips] = useState<string[]>(['Chip 1']);

  const toggleChip = (label: string) => {
    setSelectedChips(prev => 
      prev.includes(label) ? prev.filter(c => c !== label) : [...prev, label]
    );
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Component Showcase</h1>
      
      <Card>
        <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="primary" isLoading>Loading...</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Inputs</h2>
          <div className="space-y-4">
            <TextInput id="showcase-student-name" label="Student Name" placeholder="e.g., Jane Doe" />
            <Select id="showcase-location" label="Location">
              <option>Classroom</option>
              <option>Playground</option>
              <option>Cafeteria</option>
            </Select>
          </div>
        </Card>
        
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Controls</h2>
          <div className="space-y-6">
            <SegmentedControl<'yes' | 'no'>
              label="Peers Present?"
              options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]}
              value={segmentedValue}
              onChange={setSegmentedValue}
            />
            <RangeSlider id="showcase-sensory-slider" label="Sensory Input Level" value={sliderValue} onChange={setSliderValue} />
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-2xl font-semibold mb-4">Chips</h2>
        <div className="flex flex-wrap gap-2">
          {['Chip 1', 'Chip 2', 'Another Chip', 'Selectable'].map(chip => (
            <Chip 
              key={chip} 
              label={chip} 
              isSelected={selectedChips.includes(chip)} 
              onClick={() => toggleChip(chip)} 
            />
          ))}
        </div>
      </Card>

      <Card isHoverable>
        <h2 className="text-2xl font-semibold mb-4">Hoverable Card with Icon</h2>
        <div className="flex items-center gap-4">
          <Lightbulb size={40} className="text-warn" />
          <p>This card has a subtle hover effect to draw attention. Useful for interactive elements or dashboards.</p>
        </div>
      </Card>
    </div>
  );
};

export default ComponentShowcase;