import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { mockMentors } from '../mockData';
import UserCluster from '../components/UserCluster.jsx';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export default function MentorsPage() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const recentRef = useRef(null);

  const qs = useMemo(() => ({ q: query || undefined, sortBy }), [query, sortBy]);

  function validateAndSet(value) {
    const trimmed = value.replace(/\s+/g, ' ').trimStart();
    if (trimmed.length > 50) {
      setError('Search must be 50 characters or fewer.');
    } else if (trimmed && trimmed.length < 2) {
      setError('Type at least 2 characters.');
    } else if (trimmed && !/^[a-zA-Z0-9 _\-/]+$/.test(trimmed)) {
      setError('Only letters, numbers, space, _, -, / allowed.');
    } else {
      setError('');
    }
    setQuery(trimmed.slice(0, 50));
  }

  useEffect(() => {
    setLoading(true);
    const shouldSkip = !!error || (qs.q && qs.q.length < 2);
    if (shouldSkip) {
      setLoading(false);
      return;
    }
    if (import.meta.env.VITE_USE_MOCK === '1') {
      setMentors(filterAndSort(mockMentors, qs));
      setLoading(false);
      return;
    }
    axios
      .get(`${API_BASE}/mentors`, { params: qs })
      .then((r) => setMentors(r.data.items))
      .catch(() => setMentors(filterAndSort(mockMentors, qs)))
      .finally(() => setLoading(false));
  }, [qs.q, qs.sortBy]);

function filterAndSort(items, qs) {
  let arr = items;
  if (qs.q) {
    const needle = qs.q.toLowerCase();
    arr = arr.filter((m) =>
      (m.fullName || '').toLowerCase().includes(needle) ||
      (m.title || '').toLowerCase().includes(needle) ||
      (m.bio || '').toLowerCase().includes(needle)
    );
  }
  if (qs.sortBy === 'rating') arr = [...arr].sort((a, b) => b.rating - a.rating);
  if (qs.sortBy === 'recent') arr = [...arr];
  if (qs.sortBy === 'popular') arr = [...arr].sort((a, b) => (b.followers || 0) - (a.followers || 0));
  return arr;
}

  return (
    <div>
      <header className="header">
        <h1>Explore Mentors</h1>
        <div className="controls toolbar">
          <input
            className="input search grow"
            placeholder="Search Mentors"
            value={query}
            onChange={(e) => validateAndSet(e.target.value)}
            aria-invalid={error ? 'true' : 'false'}
          />
          {error && <span className="help error">{error}</span>}
          <select className="input" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="popular">Sort by: Popular</option>
            <option value="rating">Sort by: Rating</option>
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
            <div className="section-head">
              <h2>Recent Mentors</h2>
              <div className="scroll-arrows">
                <button className="icon-btn" onClick={() => recentRef.current && recentRef.current.scrollBy({ left: -300, behavior: 'smooth' })}>◀</button>
                <button className="icon-btn" onClick={() => recentRef.current && recentRef.current.scrollBy({ left: 300, behavior: 'smooth' })}>▶</button>
              </div>
            </div>
            <div className="row-scroll" ref={recentRef}>
              {mentors.slice(0, 6).map((m) => (
                <article className="card small" key={'recent-' + m._id}>
                  <div className="card-head">
                    <img
                      className="avatar"
                      src={m.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(m.fullName)}`}
                    />
                    <div>
                      <div className="name">{m.fullName}</div>
                      <div className="muted">{m.title}</div>
                    </div>
                  </div>
                  <div className="meta">
                    <span>⭐ {Number(m.rating).toFixed(1)}</span>
                    <span>📌 {m.tasksCompleted}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section">
            <h2>Mentors</h2>
            <div className="grid">
              {mentors.map((m) => (
                <article className="card" key={m._id}>
                  <div className="card-head">
                    <img
                      className="avatar"
                      src={m.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(m.fullName)}`}
                    />
                    <div>
                      <div className="name">{m.fullName}</div>
                      <div className="muted">{m.title}</div>
                    </div>
                    <span className="chip muted">Followed</span>
                  </div>
                  <p className="bio">{m.bio}</p>
                  <div className="meta">
                    <span>⭐ {Number(m.rating).toFixed(1)} ({m.reviews})</span>
                    <span>📌 {m.tasksCompleted} Task</span>
                    <span>👥 {m.followers}</span>
                  </div>
                  <div className="actions">
                    <button className="btn">Follow</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}


