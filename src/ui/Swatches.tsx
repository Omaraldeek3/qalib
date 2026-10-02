'use client';

import { useState } from 'react';

/** Colour chips that copy their hex code when clicked. */
export function Swatches({ colors, hint, done }: { colors: { role: string; hex: string }[]; hint: string; done: string }) {
  const [copied, setCopied] = useState<string>();
  return (
    <ul className="sw">
      {colors.map(({ role, hex }) => (
        <li key={role}>
          <button type="button" title={hint} onClick={async () => {
            try { await navigator.clipboard.writeText(hex); } catch { /* clipboard blocked */ }
            setCopied(hex);
            setTimeout(() => setCopied(undefined), 1600);
          }}>
            <span className="sw__chip" style={{ background: hex }} />
            <span className="sw__role">{role}</span>
            <span className="sw__hex mono">{copied === hex ? done : hex}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
