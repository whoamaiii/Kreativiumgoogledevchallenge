import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import TrackSessionPage from './pages/TrackSessionPage';
import ReportsPage from './pages/Reports';
import ComponentShowcase from './pages/ComponentShowcase';
import ToastContainer from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';
import { readHash } from './utils/hashParams';


export type Route = '/track' | '/reports' | '/showcase';

function resolveRouteFromPath(path: string): Route {
    if (path.startsWith('/reports')) return '/reports';
    if (path.startsWith('/showcase')) return '/showcase';
    return '/track'; // Default and fallback route
}


function App() {
  const [route, setRoute] = useState<Route>(resolveRouteFromPath(readHash()));

  useEffect(() => {
    // Ensure there's always a hash for consistent routing
    if (!window.location.hash) {
      window.location.hash = '/track';
    }
    
    const onHashChange = () => setRoute(resolveRouteFromPath(readHash()));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const renderPage = () => {
    switch (route) {
      case '/track':
        return <TrackSessionPage />;
      case '/reports':
        return <ReportsPage />;
      case '/showcase':
        return <ComponentShowcase />;
      default:
        return <TrackSessionPage />;
    }
  };

  return (
    <div className="bg-bg text-text min-h-screen font-sans">
      <Header activeRoute={route} />
      <main className="container mx-auto p-4 md:p-8">
        <ErrorBoundary>
            {renderPage()}
        </ErrorBoundary>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;