import type { Emotion, SensoryChannel, SessionEntry } from '../types';
import { SENSORY_CHANNELS } from '../constants';

// --- Analytics Event Tracking (Mock) ---

type EventName = 'session_tracked' | 'analysis_viewed' | 'page_viewed';
interface EventProperties { [key: string]: string | number | boolean; }

const track = (eventName: EventName, properties: EventProperties = {}) => {
  console.log(`[Analytics] Event: ${eventName}`, properties);
};
export const analytics = { track };


// --- Data Processing Functions for Reports ---

const emotionScoreMap: Record<Emotion, number> = {
    'Calm': 8,
    'Happy': 7,
    'Anxious': 5,
    'Frustrated': 4,
    'Overwhelmed': 3
};

/**
 * Calculates a numerical score for a given emotion.
 */
export const emotionScore = (emotion: Emotion): number => emotionScoreMap[emotion] || 0;

/**
 * Generates data points for an emotion trend sparkline.
 */
export const trendPoints = (sessions: SessionEntry[]): { x: Date; y: number }[] => {
  if (!sessions || sessions.length === 0) return [];
  
  return sessions
    .map(session => {
      const totalScore = session.emotions.reduce((sum, emotion) => sum + emotionScore(emotion), 0);
      const avgScore = session.emotions.length > 0 ? totalScore / session.emotions.length : 0;
      return { x: new Date(session.timeISO), y: avgScore };
    })
    .sort((a, b) => a.x.getTime() - b.x.getTime());
};

/**
 * Calculates the frequency of non-zero sensory inputs over the last 30 days.
 */
export const sensoryFrequency = (sessions: SessionEntry[]): { label: SensoryChannel; value: number }[] => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentSessions = sessions.filter(s => new Date(s.timeISO) >= thirtyDaysAgo);
  
  const counts = SENSORY_CHANNELS.reduce((acc, channel) => {
      acc[channel] = 0;
      return acc;
  }, {} as Record<SensoryChannel, number>);

  let totalNonZeroEvents = 0;
  
  for (const session of recentSessions) {
    for (const channel of SENSORY_CHANNELS) {
      if (session.sensory[channel] > 0) {
        counts[channel]++;
        totalNonZeroEvents++;
      }
    }
  }

  if (totalNonZeroEvents === 0) {
      return SENSORY_CHANNELS.map(channel => ({ label: channel, value: 0 }));
  }

  return SENSORY_CHANNELS.map(channel => ({
    label: channel,
    value: (counts[channel] / totalNonZeroEvents) * 100,
  }));
};

/**
 * Creates a histogram of hours where sensory input spiked (>= 7).
 */
export const hourlyAvoidance = (sessions: SessionEntry[]): { label: string; value: number }[] => {
    const hourlySpikes: Record<number, number> = Array.from({ length: 24 }, () => 0);
    let totalSpikes = 0;

    for (const session of sessions) {
        const hasSpike = SENSORY_CHANNELS.some(channel => session.sensory[channel] >= 7);
        if (hasSpike) {
            const hour = new Date(session.timeISO).getHours();
            hourlySpikes[hour]++;
            totalSpikes++;
        }
    }
    
    const results: { label: string; value: number }[] = [];
    for (let i = 0; i < 24; i++) {
        const ampm = i >= 12 ? 'PM' : 'AM';
        const hour12 = i % 12 === 0 ? 12 : i % 12;
        results.push({
            label: `${hour12}${ampm}`,
            value: totalSpikes > 0 ? (hourlySpikes[i] / totalSpikes) * 100 : 0,
        });
    }

    return results;
};
