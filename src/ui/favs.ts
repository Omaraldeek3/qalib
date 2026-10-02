'use client';

import { useCallback, useSyncExternalStore } from 'react';

// Favourite designs, kept in this browser only.

const KEY = 'qalib:favs';
const EVENT = 'qalib:favs';

function read(): string[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); } catch { return []; }
}
let cache: string[] | null = null;
const snapshot = () => (cache ??= read());
const EMPTY: string[] = [];
const serverSnapshot = () => EMPTY;
function subscribe(cb: () => void) {
  const on = () => { cache = null; cb(); };
  window.addEventListener(EVENT, on);
  window.addEventListener('storage', on);
  return () => { window.removeEventListener(EVENT, on); window.removeEventListener('storage', on); };
}

export function useFavs() {
  const favs = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const toggle = useCallback((slug: string) => {
    const now = read();
    const next = now.includes(slug) ? now.filter(s => s !== slug) : [...now, slug];
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* private mode: keep it for this visit */ }
    cache = next;
    window.dispatchEvent(new Event(EVENT));
  }, []);
  return { favs, toggle };
}
