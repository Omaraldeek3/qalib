import { tx, type Ctx } from './context';
import { vars } from './parts';

// Ornaments. Which ones a page gets is decided by the design's `decor` list;
// how they look is up to the style's kit.

const wave = (() => {
  let d = 'M0 20';
  for (let x = 0; x < 1200; x += 100) d += ` Q ${x + 25} 4 ${x + 50} 20 T ${x + 100} 20`;
  return d;
})();
const zigzag = (() => {
  let d = 'M0 18';
  for (let x = 0; x < 1200; x += 24) d += ` L${x + 12} 6 L${x + 24} 18`;
  return d;
})();

const dividers: Record<string, string> = {
  fleuron: '<svg viewBox="0 0 120 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M60 3l7 9-7 9-7-9z" fill="currentColor" stroke="none"/><path d="M50 12c-6-7.5-14-7.5-21 0 7 7.5 15 7.5 21 0zM70 12c6-7.5 14-7.5 21 0-7 7.5-15 7.5-21 0z"/><circle cx="22" cy="12" r="2.2" fill="currentColor" stroke="none"/><circle cx="98" cy="12" r="2.2" fill="currentColor" stroke="none"/></svg>',
  star8: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="9" y="9" width="22" height="22"/><rect x="9" y="9" width="22" height="22" transform="rotate(45 20 20)"/><circle cx="20" cy="20" r="3.5" fill="currentColor" stroke="none"/></svg>',
  deco: '<svg viewBox="0 0 140 28" fill="none" stroke="currentColor"><path d="M0 14h50M90 14h50" stroke-width="1.2"/><path d="M8 9h40M92 9h40M8 19h40M92 19h40" stroke-width=".7"/><path d="M70 2l12 12-12 12-12-12z" stroke-width="1.5"/><path d="M70 8l6 6-6 6-6-6z" fill="currentColor" stroke="none"/></svg>',
  leaf: '<svg viewBox="0 0 120 30" fill="currentColor"><path d="M8 15h104" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M38 15c4-9 14-10 19-7-4 6-11 9-19 7zM60 15c4 9 14 10 19 7-4-6-11-9-19-7zM82 15c4-9 13-10 18-7-4 6-10 9-18 7z"/></svg>',
  dots: '<svg viewBox="0 0 60 12" fill="currentColor"><circle cx="10" cy="6" r="3"/><circle cx="30" cy="6" r="3"/><circle cx="50" cy="6" r="3"/></svg>',
  scribble: '<svg viewBox="0 0 160 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 14c10-10 18 8 28-2s16-8 24 2 18 6 26-4 16-4 24 4 16 6 24-2 14-6 26 2"/></svg>',
  wave: `<svg viewBox="0 0 1200 28" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width="2.5"><path d="${wave}"/></svg>`,
  zigzag: `<svg viewBox="0 0 1200 24" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width="3"><path d="${zigzag}"/></svg>`,
};

export const dividerTypes = Object.keys(dividers);

export function Divider({ type }: { type: string }) {
  return <div className={`divider divider--${type}`} aria-hidden="true" dangerouslySetInnerHTML={{ __html: dividers[type] }} />;
}

const sparkle = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0z"/></svg>';

const sunburst = (() => {
  let lines = '';
  for (let a = 0; a < 360; a += 7.5) {
    const r = (a * Math.PI) / 180;
    lines += `<line x1="${(300 + Math.cos(r) * 70).toFixed(1)}" y1="${(300 + Math.sin(r) * 70).toFixed(1)}" x2="${(300 + Math.cos(r) * 300).toFixed(1)}" y2="${(300 + Math.sin(r) * 300).toFixed(1)}"/>`;
  }
  return `<svg viewBox="0 0 600 600" fill="none" stroke="currentColor" stroke-width="1">${lines}<circle cx="300" cy="300" r="60"/><circle cx="300" cy="300" r="52"/></svg>`;
})();

const star8 = '<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="40" y="40" width="120" height="120"/><rect x="40" y="40" width="120" height="120" transform="rotate(45 100 100)"/><rect x="62" y="62" width="76" height="76"/><rect x="62" y="62" width="76" height="76" transform="rotate(45 100 100)"/><circle cx="100" cy="100" r="22"/><circle cx="100" cy="100" r="92"/></svg>';

const leaf = '<svg viewBox="0 0 120 160" fill="currentColor"><path d="M60 158C58 120 50 70 18 30c26 6 46 26 52 60 6-30 22-60 46-74-14 40-30 90-34 142z" opacity=".9"/></svg>';

/** The ornaments behind a hero, chosen by the design's decor list. */
export function HeroDeco({ ctx }: { ctx: Ctx }) {
  const has = (k: string) => ctx.decor.has(k);
  const p = ctx.design.palette;
  const brand = tx(ctx, ctx.profile.brand);
  const confetti = has('confetti')
    ? Array.from({ length: 14 }, (_, i) => {
        const colors = [p.accent, p.accent2, p.ink];
        return (
          <i key={i} style={vars({
            '--x': `${(i * 37) % 100}%`, '--y': `${(i * 53 + 11) % 92}%`, '--r': `${(i * 47) % 360}deg`,
            '--c': colors[i % 3], '--d': `${(i % 5) * -1.3}s`,
          })} className={['dot', 'sq', 'bar'][i % 3]} />
        );
      })
    : null;
  return (
    <div className="hero__deco" aria-hidden="true">
      {has('grid') && <div className="deco-grid" style={{ position: 'absolute', inset: 0 }} />}
      {has('blobs') && <div className="deco-blobs"><i /><i /><i /></div>}
      {has('sunburst') && <div className="deco-sunburst" dangerouslySetInnerHTML={{ __html: sunburst }} />}
      {has('star') && <div className="deco-star" dangerouslySetInnerHTML={{ __html: star8 }} />}
      {has('sun') && <div className="deco-sun"><span className="deco-sun__disc" /><span className="deco-sun__floor" /></div>}
      {has('shapes') && <div className="deco-shapes"><i className="s1" /><i className="s2" /><i className="s3" /><i className="s4" /></div>}
      {has('stripes') && <div className="deco-stripes"><i /><i /><i /><i /></div>}
      {has('leaves') && <div className="deco-leaves"><span dangerouslySetInnerHTML={{ __html: leaf }} /><span dangerouslySetInnerHTML={{ __html: leaf }} /></div>}
      {has('sparkles') && <div className="deco-sparkles" dangerouslySetInnerHTML={{ __html: sparkle + sparkle + sparkle }} />}
      {confetti && <div className="deco-confetti">{confetti}</div>}
      {has('stamp') && (
        <div className="deco-stamp">
          <svg viewBox="0 0 200 200">
            <defs><path id="stamp-circle" d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1-148 0" /></defs>
            <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="100" cy="100" r="54" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <text fontSize="19" letterSpacing={ctx.lang === 'ar' ? 0 : 4} fill="currentColor"><textPath href="#stamp-circle">{`${brand} ✦ ${tx(ctx, ctx.profile.tagline).slice(0, 26)} ✦`}</textPath></text>
            <text x="100" y="112" textAnchor="middle" fontSize="34" fill="currentColor" fontWeight="700">{tx(ctx, ctx.profile.mark)}</text>
          </svg>
        </div>
      )}
    </div>
  );
}

/** Page-wide overlays: grain, scanlines, a progress bar, a cursor. */
export function Fx({ ctx }: { ctx: Ctx }) {
  return (
    <>
      {ctx.decor.has('progress') && <div className="fx-progress" aria-hidden="true" />}
      {ctx.decor.has('grain') && <div className="fx-grain" aria-hidden="true" />}
      {ctx.decor.has('scanlines') && <div className="fx-scan" aria-hidden="true" />}
      {ctx.decor.has('cursor') && <div className="fx-cursor" aria-hidden="true" />}
    </>
  );
}
