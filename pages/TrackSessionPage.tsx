
import React, { useState, useCallback } from 'react';
import type { SessionEntry, Emotion, SensoryChannel } from '../types';
import { EMOTIONS, SENSORY_CHANNELS, TEACHER_REACTIONS, QUICK_ADD_TRIGGERS } from '../constants';
import { EmotionIcons, ClockIcon, PlusIcon, XMarkIcon, ClearIcon } from '../components/icons';
import Button from '../components/Button';
import Card from '../components/Card';
import Select from '../components/Select';
import TextInput from '../components/TextInput';
import SegmentedControl from '../components/SegmentedControl';
import RangeSlider from '../components/RangeSlider';
import Chip from '../components/Chip';
import { api } from '../services/api';
import { store } from '../services/store';

const initialSensoryState = SENSORY_CHANNELS.reduce((acc, channel) => {
    acc[channel] = 0;
    return acc;
}, {} as Record<SensoryChannel, number>);

const getInitialFormState = () => ({
    student: 'Alex Doe',
    location: 'classroom',
    activity: 'reading',
    peers: 'Present' as 'Present' | 'Absent',
    triggers: [],
    emotions: [] as Emotion[],
    sensory: initialSensoryState,
    teacherActions: [],
    notes: '',
});


const TrackSessionPage: React.FC = () => {
    const [formState, setFormState] = useState(getInitialFormState());
    const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    const [otherReactionNote, setOtherReactionNote] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (field: keyof typeof formState, value: any) => {
        setFormState(prev => ({ ...prev, [field]: value }));
    };

    const handleSensoryChange = (channel: SensoryChannel, value: number) => {
        setFormState(prev => ({
            ...prev,
            sensory: { ...prev.sensory, [channel]: value },
        }));
    };
    
    const handleEmotionToggle = (emotion: Emotion) => {
        setFormState(prev => {
            const newEmotions = prev.emotions.includes(emotion)
                ? prev.emotions.filter(e => e !== emotion)
                : [...prev.emotions, emotion];
            return { ...prev, emotions: newEmotions };
        });
    };

    const handleTeacherReactionToggle = (reaction: string) => {
        setFormState(prev => {
            const newReactions = prev.teacherActions.includes(reaction)
                ? prev.teacherActions.filter(r => r !== reaction)
                : [...prev.teacherActions, reaction];
            return { ...prev, teacherActions: newReactions };
        });
    };
    
    const addTrigger = (trigger: string) => {
        if (trigger && !formState.triggers.includes(trigger)) {
            handleInputChange('triggers', [...formState.triggers, trigger]);
        }
    };
    
    const removeTrigger = (triggerToRemove: string) => {
        handleInputChange('triggers', formState.triggers.filter(t => t !== triggerToRemove));
    };
    
    const clearForm = useCallback(() => {
        setFormState(getInitialFormState());
        setOtherReactionNote('');
        setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, []);

    const createSessionEntry = (): SessionEntry => {
        const finalTeacherActions = [...formState.teacherActions];
        if (formState.teacherActions.includes('Other') && otherReactionNote.trim()) {
            const otherIndex = finalTeacherActions.indexOf('Other');
            finalTeacherActions.splice(otherIndex, 1, `Other: ${otherReactionNote.trim()}`);
        }

        return {
            ...formState,
            id: crypto.randomUUID ? crypto.randomUUID() : `session_${Date.now()}`,
            timeISO: new Date().toISOString(),
            teacherActions: finalTeacherActions,
        };
    };

    const handleSaveObservation = async () => {
        setIsLoading(true);
        try {
            const entry = createSessionEntry();
            store.addSession(entry);
            console.log('Session saved:', entry);
            // TODO: show success toast
            clearForm();
        } catch (error) {
            console.error('Failed to save session', error);
            // TODO: show error toast
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSaveAndAnalyze = async () => {
        setIsLoading(true);
        try {
            const entry = createSessionEntry();
            store.addSession(entry);
            console.log('Session saved, now analyzing:', entry);
            
            const analysis = await api.analyzeSession(entry);
            store.saveAnalysis(entry.id, analysis);
            console.log('Analysis complete and saved:', analysis);

            // TODO: show success toast
            clearForm();
        } catch (error) {
            console.error('Failed to save and analyze session', error);
            // TODO: show error toast
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="max-w-screen-2xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column: New Session Details */}
            <Card className="lg:col-span-1 space-y-6 sticky top-24">
                <h2 className="text-xl font-bold text-brand-text">New Session</h2>
                <Select label="Student" value={formState.student} onChange={(e) => handleInputChange('student', e.target.value)}>
                    <option value="Alex Doe">Alex Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                </Select>
                <TextInput label="Time of Day" type="time" icon={<ClockIcon className="w-5 h-5"/>} value={time} onChange={(e) => setTime(e.target.value)} />
                <Select label="Location" value={formState.location} onChange={(e) => handleInputChange('location', e.target.value)}>
                    <option value="classroom">Classroom</option>
                    <option value="playground">Playground</option>
                    <option value="cafeteria">Cafeteria</option>
                </Select>
                <Select label="Activity" value={formState.activity} onChange={(e) => handleInputChange('activity', e.target.value)}>
                    <option value="reading">Reading</option>
                    <option value="math">Math</option>
                    <option value="free_play">Free Play</option>
                </Select>
                <SegmentedControl
                    label="Peers"
                    options={[{ label: 'Present', value: 'Present' }, { label: 'Absent', value: 'Absent' }]}
                    value={formState.peers}
                    onChange={(val) => handleInputChange('peers', val)}
                />
                <div>
                    <label className="block text-xs font-medium text-brand-subtle-text mb-1.5">Known Triggers</label>
                    <div className="min-h-[6rem] p-2 bg-brand-surface rounded-lg border border-brand-border flex flex-wrap gap-2 content-start">
                        {formState.triggers.map(trigger => (
                            <span key={trigger} className="flex items-center bg-brand-primary/20 text-brand-primary text-sm font-medium px-2 py-1 rounded-full">
                                {trigger}
                                <button onClick={() => removeTrigger(trigger)} className="ml-1.5 text-brand-primary/70 hover:text-brand-primary"><XMarkIcon /></button>
                            </span>
                        ))}
                    </div>
                     <div className="flex flex-wrap gap-2 mt-3">
                        {QUICK_ADD_TRIGGERS.map(trigger => (
                            <button key={trigger} onClick={() => addTrigger(trigger)} className="flex items-center gap-1 text-sm text-brand-subtle-text hover:text-brand-text bg-brand-surface px-2 py-1 rounded-md border border-brand-border transition-colors">
                                <PlusIcon className="w-4 h-4" /> {trigger}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Right Column: Quick Log */}
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-brand-text">Quick Log</h2>
                        <Button variant="tertiary" onClick={clearForm}><ClearIcon className="mr-2"/> Clear All</Button>
                    </div>

                    <div className="space-y-8">
                        {/* Emotions */}
                        <div>
                            <h3 className="text-lg font-semibold text-brand-text mb-4">Emotions</h3>
                            <div className="flex justify-around items-center p-2 rounded-lg bg-brand-surface border border-brand-border">
                                {EMOTIONS.map(emotion => {
                                    const Icon = EmotionIcons[emotion];
                                    const isSelected = formState.emotions.includes(emotion);
                                    return (
                                        <div key={emotion} className="flex flex-col items-center gap-2">
                                            <button 
                                                onClick={() => handleEmotionToggle(emotion)}
                                                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${isSelected ? 'bg-brand-primary/20 scale-110' : 'hover:bg-slate-600'}`}
                                            >
                                                <Icon className="text-4xl" />
                                            </button>
                                            <span className={`text-sm font-medium ${isSelected ? 'text-brand-text' : 'text-brand-subtle-text'}`}>{emotion}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Sensory Inputs */}
                        <div>
                            <h3 className="text-lg font-semibold text-brand-text mb-4">Sensory Inputs</h3>
                            <div className="space-y-4">
                                {SENSORY_CHANNELS.map(channel => (
                                    <RangeSlider 
                                        key={channel}
                                        label={channel}
                                        value={formState.sensory[channel]}
                                        onChange={(val) => handleSensoryChange(channel, val)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Teacher Reactions */}
                         <div>
                            <h3 className="text-lg font-semibold text-brand-text mb-4">Teacher Reactions</h3>
                            <div className="flex flex-wrap gap-3">
                                {TEACHER_REACTIONS.map(reaction => (
                                    <Chip 
                                        key={reaction}
                                        label={reaction}
                                        isSelected={formState.teacherActions.includes(reaction)}
                                        onSelect={() => handleTeacherReactionToggle(reaction)}
                                    />
                                ))}
                            </div>
                            {formState.teacherActions.includes('Other') && (
                                <div className="mt-4">
                                    <TextInput label="Other Reaction Note" placeholder="Describe the other reaction..." value={otherReactionNote} onChange={e => setOtherReactionNote(e.target.value)} />
                                </div>
                            )}
                        </div>

                        {/* General Notes */}
                        <div>
                            <h3 className="text-lg font-semibold text-brand-text mb-2">General Notes</h3>
                            <textarea
                                value={formState.notes}
                                onChange={e => handleInputChange('notes', e.target.value)}
                                rows={4}
                                placeholder="Any other notes about the session..."
                                className="w-full bg-brand-surface border border-brand-border rounded-lg p-3 text-brand-text placeholder-brand-subtle-text focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                            />
                        </div>
                    </div>
                </Card>
            </div>
            
            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-brand-background/50 backdrop-blur-thin border-t border-brand-border z-20">
                <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 md:px-8">
                    <Button variant="secondary" onClick={handleSaveObservation} disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Observation'}
                    </Button>
                    <Button variant="primary" onClick={handleSaveAndAnalyze} disabled={isLoading}>
                        {isLoading ? 'Analyzing...' : 'Save & Analyze'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TrackSessionPage;
