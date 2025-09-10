
import React, { useState } from 'react';
import Header from './components/Header';
import TrackSessionPage from './pages/TrackSessionPage';
import ComponentShowcase from './pages/ComponentShowcase';

type Page = 'track' | 'showcase' | 'students' | 'reports' | 'recommendations';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('track');

  const renderPage = () => {
    switch (activePage) {
      case 'track':
        return <TrackSessionPage />;
      case 'showcase':
        return <ComponentShowcase />;
      default:
        return <div className="p-8 text-brand-subtle-text">Page not yet implemented.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-brand-background text-brand-text">
      <Header activePage={activePage} setActivePage={setActivePage} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
