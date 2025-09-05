import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import MentorsPage from './pages/MentorsPage.jsx';
import TasksPage from './pages/TasksPage.jsx';
import OverviewPage from './pages/OverviewPage.jsx';
import MessagePage from './pages/MessagePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import HelpCenterCard from './components/HelpCenterCard.jsx';
import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand">DNX</div>
          <nav className="nav">
            <NavLink to="/" end className={({isActive})=> isActive? 'nav-item active':'nav-item'}>
              <span className="icon">◰</span>
              <span>Overview</span>
            </NavLink>
            <NavLink to="/tasks" className={({isActive})=> isActive? 'nav-item active':'nav-item'}>
              <span className="icon">📘</span>
              <span>Task</span>
            </NavLink>
            <NavLink to="/mentors" className={({isActive})=> isActive? 'nav-item active':'nav-item'}>
              <span className="icon">👤</span>
              <span>Mentors</span>
            </NavLink>
            <NavLink to="/message" className={({isActive})=> isActive? 'nav-item active':'nav-item'}>
              <span className="icon">💬</span>
              <span>Message</span>
            </NavLink>
            <NavLink to="/settings" className={({isActive})=> isActive? 'nav-item active':'nav-item'}>
              <span className="icon">⚙️</span>
              <span>Settings</span>
            </NavLink>
          </nav>
          <HelpCenterCard />
        </aside>
        <main className="content">
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/mentors" element={<MentorsPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/message" element={<MessagePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<App />);


