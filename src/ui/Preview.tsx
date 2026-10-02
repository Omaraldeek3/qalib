'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type Device = 'desktop' | 'tablet' | 'phone';
const SIZES: Record<Device, { w: number; h: number }> = { desktop: { w: 1280, h: 800 }, tablet: { w: 820, h: 1080 }, phone: { w: 390, h: 780 } };

export type PreviewCopy = { desktop: string; tablet: string; phone: string; language: string; loading: string; newTab: string };

const icons: Record<Device, React.ReactNode> = {
  desktop: <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M8 20h8M12 16v4" /></svg>,
  tablet: <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="2.5" width="14" height="19" rx="2" /><path d="M11 18.5h2" /></svg>,
  phone: <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M11 18.5h2" /></svg>,
};

/** The live demo in a frame, scaled to fit, at three device widths and in either language. */
export function Preview({ slug, locale, c, cover }: { slug: string; locale: 'ar' | 'en'; c: PreviewCopy; cover: string }) {
  const [device, setDevice] = useState<Device>('desktop');
  const [lang, setLang] = useState<'ar' | 'en'>(locale);
  const [loaded, setLoaded] = useState(false);
  const [width, setWidth] = useState(0);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Phones open on the phone view; everyone else starts on desktop.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (matchMedia('(max-width: 700px)').matches) setDevice('phone');
  }, []);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const size = SIZES[device];
  const scale = width ? Math.min(1, (width - (device === 'desktop' ? 0 : 24)) / size.w) : 0;
  const src = `/demos/${slug}/${lang}.html`;

  return (
    <section className="preview" aria-label={c.language}>
      <div className="preview__bar">
        <div className="seg" role="group" aria-label="Device">
          {(Object.keys(SIZES) as Device[]).map(d => (
            <button key={d} type="button" aria-pressed={device === d} onClick={() => setDevice(d)} title={c[d]}>
              {icons[d]}<span>{c[d]}</span>
            </button>
          ))}
        </div>
        <div className="seg seg--lang" role="group" aria-label={c.language}>
          {(['ar', 'en'] as const).map(l => (
            <button key={l} type="button" aria-pressed={lang === l} onClick={() => { setLang(l); setLoaded(false); }} lang={l}>{l === 'ar' ? 'عربي' : 'English'}</button>
          ))}
        </div>
        <a className="preview__open" href={src} target="_blank" rel="noopener">
          <span>{c.newTab}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>
        </a>
      </div>
      <div ref={box} className={`preview__stage preview__stage--${device}`} style={{ height: scale ? size.h * scale + (device === 'desktop' ? 0 : 24) : undefined }}>
        {scale > 0 && (
          <div className={`preview__device preview__device--${device}`} style={{ width: size.w, height: size.h, transform: `scale(${scale})` }}>
            {!loaded && <div className="preview__loading" style={{ backgroundImage: `url(${cover})` }}><span>{c.loading}</span></div>}
            <iframe key={`${device}-${lang}`} src={src} title={slug} width={size.w} height={size.h} onLoad={() => setLoaded(true)} />
          </div>
        )}
      </div>
    </section>
  );
}
