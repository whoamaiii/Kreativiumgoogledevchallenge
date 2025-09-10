
import React from 'react';
import { SettingsIcon } from './icons';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: 'track' | 'showcase' | 'students' | 'reports' | 'recommendations') => void;
}

const NavItem: React.FC<{
  label: string;
  page: 'track' | 'showcase' | 'students' | 'reports' | 'recommendations';
  activePage: string;
  onClick: (page: any) => void;
}> = ({ label, page, activePage, onClick }) => {
  const isActive = activePage === page;
  return (
    <button
      onClick={() => onClick(page)}
      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        isActive
          ? 'bg-brand-primary text-white'
          : 'text-brand-subtle-text hover:text-brand-text hover:bg-white/10'
      }`}
    >
      {label}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
  return (
    <header className="sticky top-0 z-10">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 glass-card rounded-b-xl px-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0 text-white font-bold text-lg">
                        Kreativium
                    </div>
                    <nav className="hidden md:block ml-10">
                        <div className="flex items-baseline space-x-4">
                            <NavItem label="Dashboard" page={'track'} activePage={activePage} onClick={setActivePage} />
                            <NavItem label="Students" page={'students'} activePage={activePage} onClick={setActivePage} />
                            <NavItem label="Reports" page={'reports'} activePage={activePage} onClick={setActivePage} />
                            <NavItem label="Recommendations" page={'recommendations'} activePage={activePage} onClick={setActivePage} />
                            <NavItem label="Component Showcase" page={'showcase'} activePage={activePage} onClick={setActivePage} />
                        </div>
                    </nav>
                </div>
                <div className="flex items-center">
                    <button className="p-1 rounded-full text-brand-subtle-text hover:text-brand-text focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-white">
                        <SettingsIcon className="w-6 h-6" />
                    </button>
                    <div className="ml-3 relative">
                        <div>
                            <button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                <img className="h-8 w-8 rounded-full" src="https://picsum.photos/id/237/32/32" alt="User avatar" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
};

export default Header;
