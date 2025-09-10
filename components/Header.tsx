import React, { useState, useEffect } from 'react';
import { BrainCircuit, PlusCircle, BarChart, SunIcon, MoonIcon } from './icons';
import { Route } from '../App';

interface HeaderProps {
  activeRoute: Route;
}

const Header: React.FC<HeaderProps> = ({ activeRoute }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('kv:theme') || 'dark');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('theme-light');
      localStorage.setItem('kv:theme', 'light');
    } else {
      document.documentElement.classList.remove('theme-light');
      localStorage.setItem('kv:theme', 'dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const getLinkClasses = (route: Route) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
      activeRoute === route
        ? 'bg-brand text-white'
        : 'text-muted hover:bg-surface hover:text-text'
    }`;

  return (
    <header className="bg-bg/75 backdrop-blur-sm sticky top-0 z-10 border-b border-border">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <a href="#/track" className="flex items-center gap-3 text-2xl font-bold text-text">
          <BrainCircuit size={32} className="text-brand" />
          <span>Kreativium</span>
        </a>
        <div className="flex items-center gap-4">
          <a href="#/track" className={getLinkClasses('/track')} aria-current={activeRoute === '/track' ? 'page' : undefined}>
            <PlusCircle size={20} />
            <span className="hidden md:inline">Track Session</span>
          </a>
          <a href="#/reports" className={getLinkClasses('/reports')} aria-current={activeRoute === '/reports' ? 'page' : undefined}>
            <BarChart size={20} />
            <span className="hidden md:inline">Reports</span>
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-muted hover:bg-surface hover:text-text transition-colors duration-200"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;