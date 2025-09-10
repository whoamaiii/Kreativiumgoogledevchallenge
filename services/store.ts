
import type { SessionEntry, AIAnalysis } from '../types';

let sessions: SessionEntry[] = [];
let analyses: Record<string, AIAnalysis> = {};

const SESSIONS_KEY = 'kreativium_sessions';
const ANALYSES_KEY = 'kreativium_analyses';

// Guard for server-side rendering or environments where localStorage is not available
const isBrowser = typeof window !== 'undefined';

function loadFromStorage() {
  if (!isBrowser) return;
  try {
    const storedSessions = localStorage.getItem(SESSIONS_KEY);
    const storedAnalyses = localStorage.getItem(ANALYSES_KEY);
    if (storedSessions) {
      sessions = JSON.parse(storedSessions);
    }
    if (storedAnalyses) {
      analyses = JSON.parse(storedAnalyses);
    }
    console.log('Store loaded from localStorage.');
  } catch (error) {
    console.error("Failed to load from localStorage", error);
    sessions = [];
    analyses = {};
  }
}

function saveToStorage() {
  if (!isBrowser) return;
  try {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    localStorage.setItem(ANALYSES_KEY, JSON.stringify(analyses));
  } catch (error) {
    console.error("Failed to save to localStorage", error);
  }
}

// Initial load on module import
loadFromStorage();

export const store = {
  listSessions: (): SessionEntry[] => sessions,
  
  getSession: (id: string): SessionEntry | undefined => sessions.find(s => s.id === id),
  
  addSession: (entry: SessionEntry): void => {
    sessions = [...sessions.filter(s => s.id !== entry.id), entry];
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
