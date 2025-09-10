
import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import TextInput from '../components/TextInput';
import Select from '../components/Select';
import RangeSlider from '../components/RangeSlider';

const ColorSwatch: React.FC<{ name: string; hex: string; className: string }> = ({ name, hex, className }) => (
    <div className="flex flex-col items-center space-y-2">
        <div className={`w-20 h-20 rounded-lg ${className}`}></div>
        <div className="text-center">
            <p className="font-semibold text-brand-text">{name}</p>
            <p className="text-sm text-brand-subtle-text">{hex}</p>
        </div>
    </div>
);

const ComponentShowcase: React.FC = () => {
    const [sliderValue, setSliderValue] = useState(5.5);
    const colorPalette = {
        Primary: { hex: '#3B82F6', class: 'bg-brand-primary' },
        Secondary: { hex: '#8B5CF6', class: 'bg-brand-secondary' },
        Accent: { hex: '#10B981', class: 'bg-brand-accent' },
        Background: { hex: '#0F172A', class: 'bg-brand-background border border-brand-border' },
        Surface: { hex: '#1E293B', class: 'bg-brand-surface' },
        Text: { hex: '#E2E8F0', class: 'bg-brand-text' },
        'Subtle Text': { hex: '#94A3B8', class: 'bg-brand-subtle-text' },
        Error: { hex: '#EF4444', class: 'bg-brand-error' },
        Border: { hex: '#334155', class: 'bg-brand-border' },
    };

    const emotionalPalette = {
        Calm: { hex: '#3B82F6', class: 'bg-emotion-calm' },
        Happy: { hex: '#10B981', class: 'bg-emotion-happy' },
        Anxious: { hex: '#F97316', class: 'bg-emotion-anxious' },
        Frustrated: { hex: '#EF4444', class: 'bg-emotion-frustrated' },
        Overwhelmed: { hex: '#8B5CF6', class: 'bg-emotion-overwhelmed' },
    };

    return (
        <div className="max-w-screen-xl mx-auto p-4 md:p-8 space-y-12">
            <div>
                <h1 className="text-4xl font-bold text-brand-text">Component Showcase</h1>
                <p className="mt-2 text-brand-subtle-text max-w-2xl">A curated collection of UI components, design tokens, and interaction patterns that form the foundation of the Kreativium application.</p>
            </div>

            <section>
                <h2 className="text-2xl font-semibold text-brand-text mb-4">Colors</h2>
                <h3 className="text-lg font-medium text-brand-subtle-text mb-6">Palette</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-9 gap-6">
                    {Object.entries(colorPalette).map(([name, { hex, class: className }]) => (
                        <ColorSwatch key={name} name={name} hex={hex} className={className} />
                    ))}
                </div>
                <h3 className="text-lg font-medium text-brand-subtle-text mt-10 mb-6">Emotional</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                     {Object.entries(emotionalPalette).map(([name, { hex, class: className }]) => (
                        <ColorSwatch key={name} name={name} hex={hex} className={className} />
                    ))}
                </div>
            </section>
            
            <section>
                <h2 className="text-2xl font-semibold text-brand-text mb-6">Buttons</h2>
                <div className="flex flex-wrap items-center gap-4">
                    <Button variant="primary">Primary Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="tertiary">Tertiary Button</Button>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-brand-text mb-6">Form Elements</h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-xl">
                    <TextInput label="Text Input" placeholder="Enter student name..." />
                    <Select label="Select Menu">
                        <option>Select an option</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                    </Select>
                    <div className="md:col-span-2">
                         <RangeSlider label="Emotional State Slider" value={sliderValue} onChange={setSliderValue} />
                    </div>
                </div>
            </section>

             <section>
                <h2 className="text-2xl font-semibold text-brand-text mb-6">Cards</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <h3 className="font-bold text-lg text-brand-text">Data Card</h3>
                        <p className="text-brand-subtle-text mt-1">A versatile card component for displaying key metrics and information.</p>
                    </Card>
                    <Card isHoverable={true}>
                        <h3 className="font-bold text-lg text-brand-text">Interactive Card</h3>
                        <p className="text-brand-subtle-text mt-1">This card variation can contain interactive elements like buttons or charts, providing a rich user experience.</p>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default ComponentShowcase;
