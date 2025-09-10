import React, { useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Chip from '../components/Chip';
import RangeSlider from '../components/RangeSlider';
import SegmentedControl from '../components/SegmentedControl';
import Select from '../components/Select';
import TextInput from '../components/TextInput';
import { EMOTIONS, SENSORY_CHANNELS, TEACHER_REACTIONS, QUICK_ADD_TRIGGERS } from '../constants';
import { SessionEntry, SensoryChannel, Emotion } from '../types';
import { store } from '../services/store';
import { api } from '../services/api';
import { toastService } from '../services/toast';

const initialSensoryState = SENSORY_CHANNELS.reduce((acc, channel) => {
    acc[channel] = 5;
    return acc;
}, {} as Record<SensoryChannel, number>);

const TrackSessionPage: React.FC = () => {
    const [student, setStudent] = useState('');
    const [location, setLocation] = useState('Classroom');
    const [activity, setActivity] = useState('');
    const [peers, setPeers] = useState<'Present' | 'Absent'>('Present');
    const [selectedEmotions, setSelectedEmotions] = useState<Emotion[]>([]);
    const [sensory, setSensory] = useState(initialSensoryState);
    const [triggers, setTriggers] = useState<string[]>([]);
    const [teacherActions, setTeacherActions] = useState<string[]>([]);
    const [notes, setNotes] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const toggleMultiSelect = (setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
        setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    };

    const handleSensoryChange = (channel: SensoryChannel, value: number) => {
        setSensory(prev => ({ ...prev, [channel]: value }));
    };

    const buildSessionEntry = (): SessionEntry | null => {
        if (!student || !activity) {
            toastService.show('Please fill in Student Name and Activity.');
            return null;
        }
        return {
            id: crypto.randomUUID(), // Use browser-native UUID generation
            student,
            timeISO: new Date().toISOString(),
            location,
            activity,
            peers,
            emotions: selectedEmotions,
            sensory,
            triggers,
            teacherActions,
            notes,
        };
    };

    const handleSaveObservation = () => {
        const newEntry = buildSessionEntry();
        if (newEntry) {
            store.addSession(newEntry);
            toastService.show('Observation saved successfully!');
            console.log('Saved observation', newEntry.id);
        }
    };
    
    const handleSaveAndAnalyze = async () => {
        const newEntry = buildSessionEntry();
        if (newEntry) {
            setIsSaving(true);
            store.addSession(newEntry);
            try {
                const analysis = await api.analyzeSession(newEntry);
                store.saveAnalysis(newEntry.id, analysis);
                toastService.show('Analysis complete!');
                window.location.hash = `/reports?sessionId=${newEntry.id}`;
            } catch (error) {
                console.error("Failed to analyze session", error);
                toastService.show("Error: Failed to get analysis.");
            } finally {
                setIsSaving(false);
            }
        }
    };

    return (
        <div className="pb-24"> {/* Padding bottom to prevent content being hidden by sticky footer */}
            <div className="space-y-8">
                <h1 className="text-4xl font-bold">Track New Session</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Column 1: Core Info */}
                    <Card className="col-span-1 space-y-6">
                        <h2 className="text-xl font-semibold">Core Information</h2>
                        <TextInput id="student-name" label="Student Name" value={student} onChange={e => setStudent(e.target.value)} placeholder="Enter student's name" required />
                        <TextInput id="activity" label="Activity" value={activity} onChange={e => setActivity(e.target.value)} placeholder="e.g., Circle Time, Math" required />
                         <Select id="location" label="Location" value={location} onChange={e => setLocation(e.target.value)}>
                            <option>Classroom</option>
                            <option>Playground</option>
                            <option>Cafeteria</option>
                            <option>Hallway</option>
                            <option>Therapy Room</option>
                        </Select>
                        <SegmentedControl<'Present' | 'Absent'>
                            label="Peers Present?"
                            options={[{ label: 'Present', value: 'Present' }, { label: 'Absent', value: 'Absent' }]}
                            value={peers}
                            onChange={setPeers}
                        />
                    </Card>

                    {/* Column 2: Emotions & Triggers */}
                    <Card className="col-span-1 space-y-6">
                        <h2 className="text-xl font-semibold">Observed Emotions</h2>
                        <div className="flex flex-wrap gap-2">
                            {EMOTIONS.map(emotion => (
                                <Chip key={emotion} label={emotion} isSelected={selectedEmotions.includes(emotion)} onClick={() => toggleMultiSelect(setSelectedEmotions as any, emotion)} />
                            ))}
                        </div>

                        <h2 className="text-xl font-semibold">Potential Triggers</h2>
                        <div className="flex flex-wrap gap-2">
                            {QUICK_ADD_TRIGGERS.map(trigger => (
                                <Chip key={trigger} label={trigger} isSelected={triggers.includes(trigger)} onClick={() => toggleMultiSelect(setTriggers, trigger)} />
                            ))}
                        </div>
                    </Card>
                    
                    {/* Column 3: Teacher Actions */}
                    <Card className="col-span-1 space-y-6">
                         <h2 className="text-xl font-semibold">Teacher Actions</h2>
                        <div className="flex flex-wrap gap-2">
                            {TEACHER_REACTIONS.map(action => (
                                <Chip key={action} label={action} isSelected={teacherActions.includes(action)} onClick={() => toggleMultiSelect(setTeacherActions, action)} />
                            ))}
                        </div>
                    </Card>

                    {/* Full Width: Sensory Input */}
                    <Card className="md:col-span-2 lg:col-span-3">
                        <h2 className="text-xl font-semibold mb-4">Sensory Input Levels</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-6">
                            {SENSORY_CHANNELS.map(channel => (
                                <RangeSlider key={channel} id={`sensory-${channel}`} label={channel} value={sensory[channel]} onChange={value => handleSensoryChange(channel, value)} />
                            ))}
                        </div>
                    </Card>

                    {/* Full Width: Notes */}
                    <Card className="md:col-span-2 lg:col-span-3">
                         <h2 className="text-xl font-semibold mb-2">Additional Notes</h2>
                         <textarea
                            id="additional-notes"
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            placeholder="Add any other relevant observations..."
                            className="w-full h-32 bg-surface border border-border rounded-lg py-3 px-4 text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand"
                        ></textarea>
                    </Card>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-sm z-10 border-t border-border">
                <div className="container mx-auto p-4 flex justify-end gap-4">
                    <Button variant="secondary" onClick={handleSaveObservation} disabled={isSaving}>Save Observation</Button>
                    <Button variant="primary" onClick={handleSaveAndAnalyze} isLoading={isSaving}>Save & Analyze</Button>
                </div>
            </div>
        </div>
    );
};

export default TrackSessionPage;