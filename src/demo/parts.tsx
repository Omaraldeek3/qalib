import type { CSSProperties, ReactNode } from 'react';
import type { L } from '@/catalog/types';
import { iconSvg, img, tx, type Ctx } from './context';

export const vars = (v: Record<string, string | number>) => v as CSSProperties;

export function Icon({ name, flip }: { name: string; flip?: boolean }) {
  return <span className={flip ? 'icon flip' : 'icon'} aria-hidden="true" dangerouslySetInnerHTML={{ __html: iconSvg(name) }} />;
}

export function Btn({ ctx, label, kind = 'primary', href = '#', arrow, className }: { ctx: Ctx; label: L; kind?: 'primary' | 'ghost'; href?: string; arrow?: boolean; className?: string }) {
  return (
    <a className={`btn btn--${kind}${className ? ' ' + className : ''}`} href={href}>
      <span>{tx(ctx, label)}</span>
      {arrow && <Icon name="arrow-right" flip />}
    </a>
  );
}

export function Pic({ id, alt, className = '', parallax, ratio }: { id: number; alt: string; className?: string; parallax?: number; ratio?: string }) {
  return (
    <figure className={`media ${className}`.trim()} style={ratio ? { aspectRatio: ratio } : undefined}>
      <img src={img(id)} alt={alt} loading="lazy" decoding="async" data-parallax={parallax} />
    </figure>
  );
}

export function Head({ ctx, eyebrow, title, lead, center }: { ctx: Ctx; eyebrow?: L; title: L; lead?: L; center?: boolean }) {
  return (
    <header className={center ? 'sec__head sec__head--center' : 'sec__head'} data-reveal="">
      {eyebrow && <p className="eyebrow">{tx(ctx, eyebrow)}</p>}
      <h2 className="sec__title">{tx(ctx, title)}</h2>
      {lead && <p className="sec__lead">{tx(ctx, lead)}</p>}
    </header>
  );
}

/** A page section. `pin` makes it a scroll-driven stage (see runtime.js); `rail` also slides its track sideways. */
export function Section({ id, className, children, num, alt, pin, rail }: { id?: string; className: string; children: ReactNode; num?: number; alt?: boolean; pin?: boolean; rail?: boolean }) {
  return (
    <section id={id} className={`sec ${className}${alt ? ' sec--alt' : ''}`} data-num={num === undefined ? undefined : String(num).padStart(2, '0')} data-pin={pin ? '' : undefined} data-rail={rail ? '' : undefined}>
      {children}
    </section>
  );
}

/** Initials for testimonial avatars. */
export const initials = (name: string) => {
  const parts = name.replace(/^(د\.|م\.|Dr\.|Eng\.)\s*/, '').split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map(p => p[0]).join(parts[0] && /[؀-ۿ]/.test(parts[0]) ? ' ' : '').toUpperCase();
};
