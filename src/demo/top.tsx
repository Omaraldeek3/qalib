import type { HeroData, L } from '@/catalog/types';
import { img, tx, type Ctx } from './context';
import { HeroDeco } from './decor';
import { Btn, Icon, Pic } from './parts';

export function Nav({ ctx, links, ctaHref }: { ctx: Ctx; links: { id: string; label: L }[]; ctaHref: string }) {
  const v = ctx.layout.nav;
  return (
    <header className={`nav nav--${v}`} data-nav="">
      <div className="wrap nav__in">
        <a className="brand" href="#top" aria-label={tx(ctx, ctx.profile.brand)}>
          <span className="brand__mark" aria-hidden="true">{tx(ctx, ctx.profile.mark)}</span>
          <span className="brand__name">{tx(ctx, ctx.profile.brand)}</span>
        </a>
        <nav className="nav__links" aria-label={ctx.lang === 'ar' ? 'القائمة الرئيسية' : 'Main'}>
          {links.map(l => <a key={l.id} href={`#${l.id}`}>{tx(ctx, l.label)}</a>)}
        </nav>
        <Btn ctx={ctx} label={ctx.profile.navCta} href={ctaHref} className="nav__cta" />
        <button className="nav__toggle" type="button" aria-label={ctx.lang === 'ar' ? 'فتح القائمة' : 'Open menu'} aria-expanded="false"><span /><span /></button>
      </div>
    </header>
  );
}

function Countdown({ ctx, date }: { ctx: Ctx; date: string }) {
  const units: [string, L][] = [['d', { ar: 'يوم', en: 'days' }], ['h', { ar: 'ساعة', en: 'hours' }], ['m', { ar: 'دقيقة', en: 'min' }], ['s', { ar: 'ثانية', en: 'sec' }]];
  return (
    <div className="countdown" data-countdown={date} role="timer">
      {units.map(([u, label]) => (
        <div className="countdown__box" key={u}>
          <span className="countdown__num" data-unit={u}>00</span>
          <span className="countdown__label">{tx(ctx, label)}</span>
        </div>
      ))}
    </div>
  );
}

function Text({ ctx, hero, ctaHref, secondHref }: { ctx: Ctx; hero: HeroData; ctaHref: string; secondHref: string }) {
  const split = ctx.design.motion === 'rich' || ctx.cat.motion === 'rich';
  return (
    <div className="hero__text">
      <p className="eyebrow" data-reveal="" data-type={ctx.decor.has('typing') ? '' : undefined}>{tx(ctx, hero.eyebrow)}</p>
      <h1 className="hero__title" data-split={split ? '' : undefined} data-reveal={split ? undefined : ''}>{tx(ctx, hero.title)}</h1>
      <p className="hero__lead" data-reveal="" style={{ ['--i' as string]: 1 }}>{tx(ctx, hero.lead)}</p>
      {hero.place && <p className="hero__place" data-reveal="">{tx(ctx, hero.place)}</p>}
      {hero.date && <Countdown ctx={ctx} date={hero.date} />}
      <div className="hero__actions" data-reveal="" style={{ ['--i' as string]: 2 }}>
        <Btn ctx={ctx} label={hero.cta} href={ctaHref} arrow />
        {hero.cta2 && <Btn ctx={ctx} label={hero.cta2} kind="ghost" href={secondHref} />}
      </div>
      {hero.badge && !hero.date && <p className="hero__badge badge" data-reveal="" style={{ ['--i' as string]: 3 }}>{tx(ctx, hero.badge)}</p>}
    </div>
  );
}

/** A generic app screen in the design's colours. */
function Screen({ ctx, big }: { ctx: Ctx; big: boolean }) {
  return (
    <div className="device__screen">
      <span className="ui__hello">{ctx.lang === 'ar' ? 'صباح الخير، سلمى' : 'Good morning, Salma'}</span>
      <span className="ui__title">{tx(ctx, ctx.profile.brand)}</span>
      <div className="ui__card"><small>{ctx.lang === 'ar' ? 'هذا الأسبوع' : 'This week'}</small><span className="ui__big">{big ? '12' : '4.8'}</span></div>
      <div className="ui__chart">{[40, 65, 50, 85, 60, 95, 72].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
      {[0, 1, 2].map(i => <div className="ui__row" key={i}><span className="ui__dot" /><span className="ui__line"><i /><i /></span></div>)}
    </div>
  );
}

/** Two phones showing the app screen. */
function Phones({ ctx }: { ctx: Ctx }) {
  return (
    <div className="phones" data-reveal="">
      <div className="device device--back"><Screen ctx={ctx} big={false} /></div>
      <div className="device device--front"><Screen ctx={ctx} big /></div>
    </div>
  );
}

/** Every photo the demo business has, the hero's first, for heroes that need many. */
function photos(ctx: Ctx, hero: HeroData): number[] {
  const ids = [hero.img, ...(hero.imgs ?? [])];
  for (const s of ctx.profile.sections) {
    if (s.kind === 'about') ids.push(s.img, ...(s.img2 === undefined ? [] : [s.img2]));
    if (s.kind === 'items') for (const it of s.items) if (it.img !== undefined) ids.push(it.img);
    if (s.kind === 'cta' && s.img !== undefined) ids.push(s.img);
  }
  return [...new Set(ids)];
}

/**
 * The hero's words without entrance animations, for stages where the text is
 * placed exactly (a second copy sits under the spotlight) or driven by the scroll.
 * `live` false renders the buttons as plain shapes for the decorative copy.
 */
function StillText({ ctx, hero, ctaHref, secondHref, live = true, actions = true }: { ctx: Ctx; hero: HeroData; ctaHref: string; secondHref: string; live?: boolean; actions?: boolean }) {
  const btn = (label: L, kind: 'primary' | 'ghost', href: string, arrow?: boolean) => live
    ? <Btn ctx={ctx} label={label} kind={kind} href={href} arrow={arrow} />
    : <span className={`btn btn--${kind}`}><span>{tx(ctx, label)}</span>{arrow && <Icon name="arrow-right" flip />}</span>;
  const Title = live ? 'h1' : 'p';
  return (
    <div className="hero__text">
      <p className="eyebrow">{tx(ctx, hero.eyebrow)}</p>
      <Title className="hero__title">{tx(ctx, hero.title)}</Title>
      <p className="hero__lead">{tx(ctx, hero.lead)}</p>
      {actions && (
        <div className="hero__actions">
          {btn(hero.cta, 'primary', ctaHref, true)}
          {hero.cta2 && btn(hero.cta2, 'ghost', secondHref)}
        </div>
      )}
    </div>
  );
}

const check = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>;
const star = <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" /></svg>;

/** A short line that the scroll-driven heroes show at the bottom of their stage. */
function Hint({ ctx }: { ctx: Ctx }) {
  return <span className="pin__hint" aria-hidden="true">{ctx.lang === 'ar' ? 'مرّر للأسفل' : 'Scroll down'}</span>;
}

export function Hero({ ctx, hero, ctaHref, secondHref }: { ctx: Ctx; hero: HeroData; ctaHref: string; secondHref: string }) {
  const v = ctx.layout.hero;
  const alt = tx(ctx, hero.title);
  const extra = hero.imgs ?? [];
  const text = <Text ctx={ctx} hero={hero} ctaHref={ctaHref} secondHref={secondHref} />;
  const parallax = ctx.decor.has('parallax') ? 0.12 : undefined;
  let body;
  switch (v) {
    case 'split':
    case 'arch':
      body = <div className="wrap hero__in">{text}<Pic id={hero.img} alt={alt} className="hero__media" parallax={parallax} /></div>;
      break;
    case 'centered':
      body = <div className="wrap hero__in">{text}<Pic id={hero.img} alt={alt} className="hero__media" parallax={parallax} /></div>;
      break;
    case 'fullbleed':
      body = <><Pic id={hero.img} alt={alt} className="hero__media" /><div className="hero__in">{text}</div></>;
      break;
    case 'type':
      body = (
        <div className="wrap hero__in">
          {text}
          <Pic id={hero.img} alt={alt} className="hero__media" parallax={parallax} />
        </div>
      );
      break;
    case 'collage':
      body = (
        <div className="wrap hero__in">
          {text}
          <div className="collage" data-reveal="">{[hero.img, ...extra].slice(0, 3).map((id, i) => <Pic key={id} id={id} alt={i === 0 ? alt : ''} />)}</div>
        </div>
      );
      break;
    case 'framed':
      body = (
        <div className="wrap hero__in">
          <div className="hero__frame">{text}</div>
          <Pic id={hero.img} alt={alt} className="hero__media" parallax={parallax} />
        </div>
      );
      break;
    case 'editorial': {
      const lead = tx(ctx, hero.lead);
      body = (
        <div className="wrap hero__in">
          <p className="eyebrow" data-reveal="">{tx(ctx, hero.eyebrow)}</p>
          <h1 className="hero__title" data-reveal="">{tx(ctx, hero.title)}</h1>
          <div className="hero__cols">
            <div className="hero__text">
              <p className="hero__lead" data-reveal="">{lead}</p>
              {hero.date && <Countdown ctx={ctx} date={hero.date} />}
              <div className="hero__actions" data-reveal=""><Btn ctx={ctx} label={hero.cta} href={ctaHref} arrow /></div>
            </div>
            <Pic id={hero.img} alt={alt} className="hero__media" />
            <div className="hero__meta" data-reveal="">
              {hero.badge && <span><strong>{tx(ctx, hero.badge)}</strong></span>}
              <span>{tx(ctx, ctx.profile.tagline)}</span>
              {hero.place && <span>{tx(ctx, hero.place)}</span>}
              {hero.cta2 && <Btn ctx={ctx} label={hero.cta2} kind="ghost" href={secondHref} />}
            </div>
          </div>
        </div>
      );
      break;
    }
    case 'device':
      body = <div className="wrap hero__in">{text}<Phones ctx={ctx} /></div>;
      break;
    case 'poster':
      body = <div className="wrap hero__in">{text}<Pic id={hero.img} alt={alt} className="hero__media" parallax={parallax} /></div>;
      break;

    // ---- Interactive heroes ----
    case 'zoom':
      // The stage holds while the photo opens from a framed card to the full screen.
      return (
        <section className="hero hero--zoom" id="top" data-pin="">
          <div className="pin__stage">
            <div className="wrap zoom__head">
              <StillText ctx={ctx} hero={hero} ctaHref={ctaHref} secondHref={secondHref} actions={false} />
            </div>
            <figure className="zoom__media"><img src={img(hero.img)} alt={alt} decoding="async" /></figure>
            <div className="wrap zoom__end">
              {hero.badge && <p className="zoom__badge">{tx(ctx, hero.badge)}</p>}
              {hero.date && <Countdown ctx={ctx} date={hero.date} />}
              <div className="hero__actions">
                <Btn ctx={ctx} label={hero.cta} href={ctaHref} arrow />
                {hero.cta2 && <Btn ctx={ctx} label={hero.cta2} kind="ghost" href={secondHref} />}
              </div>
            </div>
            <Hint ctx={ctx} />
          </div>
        </section>
      );
    case 'curtain': {
      // Two panels carrying the brand name open like doors with the scroll.
      const words = tx(ctx, ctx.profile.brand).split(/\s+/);
      const half = Math.ceil(words.length / 2);
      const [first, second] = words.length > 1 ? [words.slice(0, half).join(' '), words.slice(half).join(' ')] : [words[0], tx(ctx, ctx.profile.mark)];
      return (
        <section className="hero hero--curtain" id="top" data-pin="">
          <div className="pin__stage">
            <div className="curtain__back">
              <img className="curtain__img" src={img(hero.img)} alt={alt} decoding="async" />
              <div className="wrap hero__in"><StillText ctx={ctx} hero={hero} ctaHref={ctaHref} secondHref={secondHref} /></div>
            </div>
            <div className="curtain__panel curtain__panel--start" aria-hidden="true"><span>{first}</span></div>
            <div className="curtain__panel curtain__panel--end" aria-hidden="true"><span>{second}</span></div>
            <Hint ctx={ctx} />
          </div>
        </section>
      );
    }
    case 'layers': {
      // Photos and dots float at different depths and follow the pointer.
      const pics = photos(ctx, hero).slice(0, 5);
      return (
        <section className="hero hero--layers" id="top" data-mouse="">
          <HeroDeco ctx={ctx} />
          <div className="layers" aria-hidden="true">
            {pics.map((id, i) => <span className={`layers__card layers__card--${i + 1}`} key={id}><img src={img(id)} alt="" decoding="async" /></span>)}
            <span className="layers__dot layers__dot--1" />
            <span className="layers__dot layers__dot--2" />
          </div>
          <div className="wrap hero__in">{text}</div>
        </section>
      );
    }
    case 'spotlight':
      // A dark copy of the hero; the pointer carries a light that shows the colour copy underneath.
      return (
        <section className="hero hero--spotlight" id="top" data-mouse="fast">
          <div className="spot__layer spot__base">
            <img className="spot__img" src={img(hero.img)} alt={alt} decoding="async" />
            <div className="wrap hero__in"><StillText ctx={ctx} hero={hero} ctaHref={ctaHref} secondHref={secondHref} /></div>
          </div>
          <div className="spot__layer spot__lit" aria-hidden="true">
            <img className="spot__img" src={img(hero.img)} alt="" decoding="async" />
            <div className="wrap hero__in"><StillText ctx={ctx} hero={hero} ctaHref={ctaHref} secondHref={secondHref} live={false} /></div>
          </div>
        </section>
      );
    case 'trail':
      // Moving the pointer drops the business's photos, which pop in and fade.
      return (
        <section className="hero hero--trail" id="top" data-trail={photos(ctx, hero).slice(0, 14).map(img).join(' ')}>
          <div className="wrap hero__in">{text}</div>
        </section>
      );
    case 'tilt': {
      // A phone or a photo card leans toward the pointer and turns a little with the scroll.
      const stats = ctx.profile.sections.find(s => s.kind === 'stats');
      const chips = [hero.badge ? tx(ctx, hero.badge) : tx(ctx, ctx.profile.tagline), stats && stats.kind === 'stats' ? `${stats.items[0].value} ${tx(ctx, stats.items[0].label)}` : tx(ctx, hero.place)].filter(Boolean);
      const phone = ctx.profile.id === 'app';
      return (
        <section className="hero hero--tilt" id="top" data-mouse="" data-view="">
          <HeroDeco ctx={ctx} />
          <div className="wrap hero__in">
            {text}
            <div className="tilt__stage">
              <div className={phone ? 'tilt__card tilt__card--phone' : 'tilt__card'}>
                {phone ? <Screen ctx={ctx} big /> : <img src={img(hero.img)} alt={alt} decoding="async" />}
              </div>
              {chips.map((c, i) => <span className={`tilt__chip tilt__chip--${i + 1}`} key={i} aria-hidden="true">{i === 0 ? check : star}{c}</span>)}
            </div>
          </div>
        </section>
      );
    }
  }
  return (
    <section className={`hero hero--${v}`} id="top">
      <HeroDeco ctx={ctx} />
      {body}
    </section>
  );
}
