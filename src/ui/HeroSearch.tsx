'use client';

import { useState } from 'react';
import { SEARCH_EVENT } from './Catalog';

/** The search box in the hero hands its words to the catalogue below. */
export function HeroSearch({ placeholder, button }: { placeholder: string; button: string }) {
  const [q, setQ] = useState('');
  return (
    <form className="hsearch" role="search" onSubmit={e => {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent(SEARCH_EVENT, { detail: q }));
      document.getElementById('designs')?.scrollIntoView({ behavior: 'smooth' });
    }}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
      <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder={placeholder} aria-label={placeholder} />
      <button type="submit" className="btn btn--accent">{button}</button>
    </form>
  );
}
