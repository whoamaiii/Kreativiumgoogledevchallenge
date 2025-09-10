
export type Emotion = "Calm" | "Happy" | "Anxious" | "Frustrated" | "Overwhelmed";

export type SensoryChannel = "Auditory" | "Visual" | "Tactile" | "Vestibular" | "Proprioceptive" | "Olfactory" | "Gustatory";

export interface SessionEntry {
  id: string;
  student: string;
  timeISO: string;
  location: string;
  activity: string;
  peers: "Present" | "Absent";
  emotions: Emotion[];
  sensory: Record<SensoryChannel, number>;
  triggers: string[];
  teacherActions: string[];
  notes: string;
}

export interface AIAnalysis {
  summary: string;
  keyFindings: string[];
  patterns: { pattern: string; evidence: string[] }[];
  triggers: { label: string; confidence: number; evidence?: string[] }[];
  recommendations: { proactive: string[]; environmental: string[]; reactive: string[] };
  suggestedGoal: { statement: string; timeframeWeeks: number };
  caveats: string[];
  model?: string;
  latencyMs?: number;
}
