import type { HeroData, L } from '@/catalog/types';
import { tx, type Ctx } from './context';
import { HeroDeco } from './decor';
import { Btn, Pic } from './parts';

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

/** A phone showing a generic app screen in the design's colours. */
function Phones({ ctx }: { ctx: Ctx }) {
  const screen = (big: boolean) => (
    <div className="device__screen">
      <span className="ui__hello">{ctx.lang === 'ar' ? 'صباح الخير، سلمى' : 'Good morning, Salma'}</span>
      <span className="ui__title">{tx(ctx, ctx.profile.brand)}</span>
      <div className="ui__card"><small>{ctx.lang === 'ar' ? 'هذا الأسبوع' : 'This week'}</small><span className="ui__big">{big ? '12' : '4.8'}</span></div>
      <div className="ui__chart">{[40, 65, 50, 85, 60, 95, 72].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
      {[0, 1, 2].map(i => <div className="ui__row" key={i}><span className="ui__dot" /><span className="ui__line"><i /><i /></span></div>)}
    </div>
  );
  return (
    <div className="phones" data-reveal="">
      <div className="device device--back">{screen(false)}</div>
      <div className="device device--front">{screen(true)}</div>
    </div>
  );
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
  }
  return (
    <section className={`hero hero--${v}`} id="top">
      <HeroDeco ctx={ctx} />
      {body}
    </section>
  );
}
