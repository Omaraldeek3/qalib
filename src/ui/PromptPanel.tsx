'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Lang } from '@/catalog/types';
import { buildPrompt, emptyBrief, type Brief } from '@/prompt/build';
import { stackName, stacks } from '@/prompt/copy';
import type { PromptData } from '@/prompt/data';

export type PromptCopy = {
  title: string; lead: string; brief: string; name: string; namePh: string; type: string; typeNone: string; typeOther: string; typeOtherPh: string;
  description: string; descriptionPh: string; languages: string; langAr: string; langEn: string; langBoth: string; pages: string; pagesOne: string; pagesMulti: string;
  stack: string; contact: string; contactPh: string; assets: string; notes: string; notesPh: string; outLang: string; css: string; cssHint: string;
  copy: string; copied: string; chars: string; reset: string; pasteHint: string;
};

const KEY = 'qalib:brief';

function loadBrief(): Brief {
  try { return { ...emptyBrief, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') }; } catch { return emptyBrief; }
}

/** The brief form and the prompt it produces, kept in sync as you type. */
export function PromptPanel({ data, locale, c, types, origin }: { data: PromptData; locale: Lang; c: PromptCopy; types: { id: string; name: string }[]; origin: string }) {
  const [brief, setBrief] = useState<Brief>(emptyBrief);
  const [lang, setLang] = useState<Lang>(locale);
  const [withCss, setWithCss] = useState(false);
  const [css, setCss] = useState<string>();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // The brief follows the person from design to design, in this browser only.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBrief(loadBrief());
  }, []);

  useEffect(() => {
    if (!withCss || css !== undefined) return;
    let gone = false;
    fetch(`/demos/${data.slug}/style.css`).then(r => r.text()).then(text => { if (!gone) setCss(text); }).catch(() => { if (!gone) setCss(''); });
    return () => { gone = true; };
  }, [withCss, css, data.slug]);

  const set = <K extends keyof Brief>(k: K, v: Brief[K]) => setBrief(prev => {
    const next = { ...prev, [k]: v };
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* private mode */ }
    return next;
  });

  const prompt = useMemo(() => buildPrompt(data, brief, lang, { origin, css: withCss ? css : undefined }), [data, brief, lang, withCss, css, origin]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = prompt;
      document.body.append(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const id = (s: string) => `brief-${s}`;

  return (
    <section className="pp" id="prompt" aria-labelledby="pp-title">
      <header className="pp__head">
        <h2 id="pp-title" className="section-title">{c.title}</h2>
        <p className="section-lead">{c.lead}</p>
      </header>
      <div className="pp__grid">
        <form className="brief" onSubmit={e => e.preventDefault()}>
          <p className="brief__title mono">{c.brief}</p>
          <label className="bf" htmlFor={id('name')}><span>{c.name}</span>
            <input id={id('name')} value={brief.name} placeholder={c.namePh} onChange={e => set('name', e.target.value)} />
          </label>
          <label className="bf" htmlFor={id('type')}><span>{c.type}</span>
            <select id={id('type')} value={brief.type} onChange={e => set('type', e.target.value)}>
              <option value="">{c.typeNone}</option>
              {types.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
              <option value="other">{c.typeOther}</option>
            </select>
          </label>
          {brief.type === 'other' && (
            <label className="bf" htmlFor={id('other')}><span>{c.typeOther}</span>
              <input id={id('other')} value={brief.typeOther} placeholder={c.typeOtherPh} onChange={e => set('typeOther', e.target.value)} />
            </label>
          )}
          <label className="bf" htmlFor={id('desc')}><span>{c.description}</span>
            <textarea id={id('desc')} rows={3} value={brief.description} placeholder={c.descriptionPh} onChange={e => set('description', e.target.value)} />
          </label>
          <fieldset className="bf">
            <legend>{c.languages}</legend>
            <div className="seg">
              {([['ar', c.langAr], ['en', c.langEn], ['both', c.langBoth]] as const).map(([v, label]) => (
                <button key={v} type="button" aria-pressed={brief.languages === v} onClick={() => set('languages', v)}>{label}</button>
              ))}
            </div>
          </fieldset>
          <fieldset className="bf">
            <legend>{c.pages}</legend>
            <div className="seg">
              {([['one', c.pagesOne], ['multi', c.pagesMulti]] as const).map(([v, label]) => (
                <button key={v} type="button" aria-pressed={brief.pages === v} onClick={() => set('pages', v)}>{label}</button>
              ))}
            </div>
          </fieldset>
          <label className="bf" htmlFor={id('stack')}><span>{c.stack}</span>
            <select id={id('stack')} value={brief.stack} onChange={e => set('stack', e.target.value as Brief['stack'])}>
              {stacks.map(s => <option key={s} value={s}>{stackName[s][locale]}</option>)}
            </select>
          </label>
          <label className="bf" htmlFor={id('contact')}><span>{c.contact}</span>
            <textarea id={id('contact')} rows={2} value={brief.contact} placeholder={c.contactPh} onChange={e => set('contact', e.target.value)} />
          </label>
          <label className="check"><input type="checkbox" checked={brief.assets} onChange={e => set('assets', e.target.checked)} /><span>{c.assets}</span></label>
          <label className="bf" htmlFor={id('notes')}><span>{c.notes}</span>
            <textarea id={id('notes')} rows={2} value={brief.notes} placeholder={c.notesPh} onChange={e => set('notes', e.target.value)} />
          </label>
          <button type="button" className="link" onClick={() => { setBrief(emptyBrief); try { localStorage.removeItem(KEY); } catch { /* ignore */ } }}>{c.reset}</button>
        </form>

        <div className="out">
          <div className="out__bar">
            <div className="seg" role="group" aria-label={c.outLang}>
              {(['ar', 'en'] as const).map(l => <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)} lang={l}>{l === 'ar' ? 'عربي' : 'English'}</button>)}
            </div>
            <label className="check check--small" title={c.cssHint}><input type="checkbox" checked={withCss} onChange={e => setWithCss(e.target.checked)} /><span>{c.css}</span></label>
          </div>
          <pre className="out__text" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang} tabIndex={0}>{prompt}</pre>
          <div className="out__foot">
            <button type="button" className={copied ? 'btn btn--accent is-done' : 'btn btn--accent'} onClick={copy}>{copied ? c.copied : c.copy}</button>
            <span className="out__meta mono">{c.chars.replace('{n}', prompt.length.toLocaleString(locale))}</span>
          </div>
          <p className="out__hint">{c.pasteHint}</p>
        </div>
      </div>
    </section>
  );
}
