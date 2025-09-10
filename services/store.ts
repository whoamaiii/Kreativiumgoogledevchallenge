import type { SessionEntry, AIAnalysis } from '../types';

const SCHEMA_VERSION = 1;
const SESSIONS_KEY = 'kreativium_sessions';
const ANALYSES_KEY = 'kreativium_analyses';
const SCHEMA_KEY = 'kreativium_schema_version';

type StoredSessionEntry = SessionEntry & { isDemo?: boolean };

let sessions: StoredSessionEntry[] = [];
let analyses: Record<string, AIAnalysis> = {};

const isBrowser = typeof window !== 'undefined';

function createDemoData() {
    // TODO: Only log in development
    console.log("No existing data found. Seeding demo sessions.");
    const now = new Date();
    const demoSessions: StoredSessionEntry[] = [
        {
            id: 'demo-1',
            student: "Alex Doe",
            timeISO: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
            location: "Classroom",
            activity: "Math Lesson",
            peers: "Present",
            emotions: ["Frustrated", "Anxious"],
            sensory: { "Auditory": 8, "Visual": 6, "Tactile": 5, "Vestibular": 4, "Proprioceptive": 5, "Olfactory": 3, "Gustatory": 2 },
            triggers: ["Loud noises", "Difficult tasks"],
            teacherActions: ["Redirect", "Sensory Tool"],
            notes: "Alex became visibly upset when the fire alarm drill started. Provided noise-cancelling headphones which helped.",
            isDemo: true,
        },
        {
            id: 'demo-2',
            student: "Alex Doe",
            timeISO: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
            location: "Playground",
            activity: "Recess",
            peers: "Present",
            emotions: ["Happy", "Calm"],
            sensory: { "Auditory": 5, "Visual": 5, "Tactile": 6, "Vestibular": 7, "Proprioceptive": 8, "Olfactory": 4, "Gustatory": 3 },
            triggers: [],
            teacherActions: ["Positive Reinforcement"],
            notes: "Positive peer interaction observed on the swings. Seemed calm and engaged.",
            isDemo: true,
        }
    ];
    sessions = demoSessions;
    analyses = {}; // No initial analyses for demo data
}


function loadFromStorage() {
  if (!isBrowser) return;
  try {
    const storedSchemaVersion = localStorage.getItem(SCHEMA_KEY);
    if (storedSchemaVersion && parseInt(storedSchemaVersion, 10) === SCHEMA_VERSION) {
        const storedSessions = localStorage.getItem(SESSIONS_KEY);
        const storedAnalyses = localStorage.getItem(ANALYSES_KEY);
        if (storedSessions) {
            sessions = JSON.parse(storedSessions);
        } else {
             // Data is missing but schema is present, seed data
            createDemoData();
            saveToStorage();
            return;
        }
        if (storedAnalyses) {
            analyses = JSON.parse(storedAnalyses);
        }
        // TODO: Only log in development
        console.log('Store loaded from localStorage.');
    } else {
        // Schema is old or doesn't exist, start fresh
        createDemoData();
        saveToStorage(); // Save the new demo data and schema version
    }
  } catch (error) {
    console.error("Failed to load from localStorage, seeding demo data.", error);
    createDemoData();
    saveToStorage();
  }
}

function saveToStorage() {
  if (!isBrowser) return;
  try {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    localStorage.setItem(ANALYSES_KEY, JSON.stringify(analyses));
    localStorage.setItem(SCHEMA_KEY, SCHEMA_VERSION.toString());
  } catch (error) {
    console.error("Failed to save to localStorage", error);
  }
}

// Initial load
loadFromStorage();

export const store = {
  listSessions: (): SessionEntry[] => sessions,
  
  getSession: (id: string): SessionEntry | undefined => sessions.find(s => s.id === id),
  
  addSession: (entry: SessionEntry): void => {
    const isOnlyDemoDataPresent = sessions.length > 0 && sessions.every(s => s.isDemo);
    if (isOnlyDemoDataPresent) {
      sessions = [entry]; // Replace demo data with the first real entry
    } else {
      sessions.push(entry);
    }
    saveToStorage();
  },
  
  updateSession: (updatedEntry: SessionEntry): void => {
    sessions = sessions.map(s => s.id === updatedEntry.id ? updatedEntry : s);
    saveToStorage();
  },
  
  getAnalysis: (sessionId: string): AIAnalysis | undefined => analyses[sessionId],
  
  saveAnalysis: (sessionId: string, analysis: AIAnalysis): void => {
    analyses = { ...analyses, [sessionId]: analysis };
    saveToStorage();
  }
};