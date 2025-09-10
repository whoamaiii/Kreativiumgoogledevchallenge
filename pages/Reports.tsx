import React, { useEffect, useMemo, useState } from 'react';
import { store } from '../services/store';
import { AIAnalysis, SessionEntry } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';
import { Loader, AlertTriangle, Lightbulb } from '../components/icons';
import { api } from '../services/api';
import { parseHashSearch } from '../utils/hashParams';

function useHashSearchParams() {
  const [params, setParams] = useState(parseHashSearch());

  useEffect(() => {
    const onHashChange = () => setParams(parseHashSearch());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return params;
}

const ReportDetail: React.FC<{ sessionId: string }> = ({ sessionId }) => {
    const [session, setSession] = useState<SessionEntry | undefined>(undefined);
    const [analysis, setAnalysis] = useState<AIAnalysis | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAndAnalyze = async () => {
            setIsLoading(true);
            setError(null);
            
            const existingSession = store.getSession(sessionId);
            if (!existingSession) {
                setError('Session not found.');
                setIsLoading(false);
                return;
            }
            setSession(existingSession);

            const existingAnalysis = store.getAnalysis(sessionId);
            if (existingAnalysis) {
                setAnalysis(existingAnalysis);
            } else {
                try {
                    // If no analysis exists, run it on the fly
                    const newAnalysis = await api.analyzeSession(existingSession);
                    store.saveAnalysis(sessionId, newAnalysis);
                    setAnalysis(newAnalysis);
                } catch (err) {
                    setError('Failed to get AI analysis. Please try again later.');
                    console.error(err);
                }
            }
            setIsLoading(false);
        };
        fetchAndAnalyze();
    }, [sessionId]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader size={48} />
                <h2 className="text-2xl font-semibold text-muted">Loading Analysis...</h2>
            </div>
        );
    }
    
    if (error || !session) {
         return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
                <AlertTriangle size={48} className="text-error" />
                <h2 className="text-2xl font-semibold text-error">{error ? "An Error Occurred" : "Session Not Found"}</h2>
                <p className="text-muted">{error || `Could not find a session with the ID: ${sessionId}`}</p>
                 <a href="#/reports" className="mt-4">
                    <Button variant="secondary">Back to All Reports</Button>
                </a>
            </div>
        );
    }

    if (!analysis) {
         return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
                <AlertTriangle size={48} className="text-warn" />
                <h2 className="text-2xl font-semibold">Analysis Not Available</h2>
                <p className="text-muted">The analysis for this session could not be loaded.</p>
                 <Button variant="primary" onClick={() => window.location.reload()} className="mt-4">
                    Retry Analysis
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold">Analysis for {session.student}</h1>
            <p className="text-muted">
                Session recorded on {new Date(session.timeISO).toLocaleString()} in {session.location}.
            </p>

            <Card>
                <h2 className="text-2xl font-semibold mb-3">AI Summary</h2>
                <p className="text-muted leading-relaxed">{analysis.summary}</p>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                    <h2 className="text-2xl font-semibold mb-3">Key Findings & Patterns</h2>
                    <ul className="space-y-2 list-disc list-inside text-muted">
                        {analysis.keyFindings.map((finding, i) => <li key={i}>{finding}</li>)}
                    </ul>
                </Card>

                <Card>
                    <h2 className="text-2xl font-semibold mb-3">Identified Triggers</h2>
                     <ul className="space-y-3">
                        {analysis.triggers.map((trigger, i) => (
                            <li key={i} className="flex items-center justify-between gap-2">
                                <span className="text-muted flex-shrink-0">{trigger.label}</span>
                                <span className="text-sm text-right font-medium bg-brand/20 text-brand px-2 py-1 rounded-full">
                                    {Math.round(trigger.confidence * 100)}% Conf.
                                </span>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

            <Card>
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Lightbulb className="text-warn" />Recommendations</h2>
                <div className="grid md:grid-cols-3 gap-x-6 gap-y-4">
                    <div>
                        <h3 className="font-semibold mb-2 text-lg">Proactive</h3>
                        <ul className="list-disc list-inside space-y-1 text-muted">{analysis.recommendations.proactive.map((rec, i) => <li key={i}>{rec}</li>)}</ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2 text-lg">Environmental</h3>
                        <ul className="list-disc list-inside space-y-1 text-muted">{analysis.recommendations.environmental.map((rec, i) => <li key={i}>{rec}</li>)}</ul>
                    </div>
                     <div>
                        <h3 className="font-semibold mb-2 text-lg">Reactive</h3>
                        <ul className="list-disc list-inside space-y-1 text-muted">{analysis.recommendations.reactive.map((rec, i) => <li key={i}>{rec}</li>)}</ul>
                    </div>
                </div>
            </Card>
        </div>
    );
};

const SessionList: React.FC = () => {
    const sessions = store.listSessions().sort((a, b) => new Date(b.timeISO).getTime() - new Date(a.timeISO).getTime());

    if (sessions.length === 0) {
        return (
            <div className="text-center min-h-[60vh] flex flex-col justify-center items-center">
                <h2 className="text-2xl font-semibold text-muted">No Reports Yet</h2>
                <p className="text-muted mt-2">Track a session to generate your first AI-powered report.</p>
                <a href="#/track" className="mt-6">
                    <Button variant="primary">Track First Session</Button>
                </a>
            </div>
        );
    }
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold">All Session Reports</h1>
               <a href="#/track">
                  <Button variant="primary">Track New Session</Button>
               </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions.map(session => (
                    <a href={`#/reports?sessionId=${session.id}`} key={session.id} className="block focus:outline-none focus:ring-2 focus:ring-brand rounded-xl">
                        <Card isHoverable className="h-full">
                            <h3 className="text-xl font-semibold text-text">{session.student}</h3>
                            <p className="text-muted">{new Date(session.timeISO).toLocaleString()}</p>
                            <p className="text-sm text-muted/75 mt-2">Activity: {session.activity}</p>
                        </Card>
                    </a>
                ))}
            </div>
        </div>
    );
};

const ReportsPage: React.FC = () => {
    const params = useHashSearchParams();
    const sessionId = params.get('sessionId');

    // If a sessionId is in the URL, show the detail page.
    // Otherwise, show the list of all sessions.
    return sessionId ? <ReportDetail sessionId={sessionId} /> : <SessionList />;
};

export default ReportsPage;