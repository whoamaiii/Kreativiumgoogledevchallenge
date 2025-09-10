import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/tokens.css';
import './index.css';

// Apply theme from localStorage before mounting to prevent flash of wrong theme
const savedTheme = localStorage.getItem('kv:theme');
if (savedTheme === 'light') {
  document.documentElement.classList.add('theme-light');
} else {
  // Default to dark theme if no preference is saved
  localStorage.setItem('kv:theme', 'dark');
}

const el = document.getElementById('root');
if (!el) throw new Error('Missing #root');

const root = createRoot(el);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);