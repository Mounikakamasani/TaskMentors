import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { mockTasks } from '../mockData';
import UserCluster from '../components/UserCluster.jsx';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export default function TasksPage() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('deadline');
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const qs = useMemo(() => ({ q: query || undefined, sortBy, category: category || undefined }), [query, sortBy, category]);

  useEffect(() => {
    setLoading(true);
    const shouldSkip = !!error || !!categoryError || (qs.q && qs.q.length < 2);
    if (shouldSkip) {
      setLoading(false);
      return;
    }
    if (import.meta.env.VITE_USE_MOCK === '1') {
      setTasks(filterAndSort(mockTasks, qs));
      setLoading(false);
      return;
    }
    axios
      .get(`${API_BASE}/tasks`, { params: qs })
      .then((r) => setTasks(r.data.items))
      .catch(() => setTasks(filterAndSort(mockTasks, qs)))
      .finally(() => setLoading(false));
  }, [qs.q, qs.sortBy, qs.category]);

function filterAndSort(items, qs) {
  let arr = items;
  if (qs.q) arr = arr.filter((t) => t.title.toLowerCase().includes(qs.q.toLowerCase()));
  if (qs.category) arr = arr.filter((t) => t.category === qs.category);
  if (qs.sortBy === 'progress') arr = [...arr].sort((a, b) => b.progressPercent - a.progressPercent);
  if (qs.sortBy === 'recent') arr = [...arr];
  return arr;
}

  return (
    <div>
      <header className="header">
        <h1>Explore Task</h1>
        <div className="controls">
          <input
            className="input search"
            placeholder="Search Task"
            value={query}
            onChange={(e) => {
              const v = e.target.value.replace(/\s+/g, ' ').trimStart();
              if (v.length > 50) setError('Search must be 50 characters or fewer.');
              else if (v && v.length < 2) setError('Type at least 2 characters.');
              else if (v && !/^[a-zA-Z0-9 _-]+$/.test(v)) setError('Only letters, numbers, space, _ and - allowed.');
              else setError('');
              setQuery(v.slice(0, 50));
            }}
            aria-invalid={error ? 'true' : 'false'}
          />
          {error && <span className="help error">{error}</span>}
          <select
            value={category}
            onChange={(e) => {
              const allowed = ['', 'Time Limit', 'New Task'];
              const v = e.target.value;
              if (!allowed.includes(v)) {
                setCategoryError('Invalid category selected.');
              } else {
                setCategoryError('');
                setCategory(v);
              }
            }}
            aria-invalid={categoryError ? 'true' : 'false'}
          >
            <option value="">All Categories</option>
            <option value="Time Limit">Time Limit</option>
            <option value="New Task">New Task</option>
          </select>
          {categoryError && <span className="help error">{categoryError}</span>}
          <select className="input" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="deadline">Sort by: Deadline</option>
            <option value="progress">Sort by: Progress</option>
            <option value="recent">Sort by: Recent</option>
          </select>
        </div>
        <div className="right"><UserCluster /></div>
      </header>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <section className="section">
            <h2>Time Limit</h2>
            <div className="grid">
              {tasks
                .filter((t) => t.category === 'Time Limit')
                .map((t) => (
                  <TaskCard key={t._id} task={t} />
                ))}
            </div>
          </section>
          <section className="section">
            <h2>New Task</h2>
            <div className="grid">
              {tasks
                .filter((t) => t.category === 'New Task')
                .map((t) => (
                  <TaskCard key={t._id} task={t} />
                ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function TaskCard({ task }) {
  return (
    <article className="card task">
      <div className="thumb" />
      <div className="pad">
        <div className="muted">{task.role}</div>
        <div className="name">{task.title}</div>
        <div className="progress">
          <div className="bar" style={{ width: `${task.progressPercent}%` }} />
          <span>{task.progressPercent}%</span>
        </div>
        <div className="meta">
          <span>⏱ {task.durationLabel}</span>
          <span className="avatars">
            {(task.mentors || []).slice(0, 5).map((m) => (
              <img
                key={m._id}
                className="avatar small"
                src={m.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(m.fullName)}`}
              />
            ))}
          </span>
        </div>
      </div>
    </article>
  );
}


