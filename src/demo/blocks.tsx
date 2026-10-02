import type { AboutData, Item, ItemsData, ItemsVariant, LogosData, MarqueeData, StatsData } from '@/catalog/types';
import { itemsVariant as resolveItemsVariant } from '@/catalog/layout';
import { pad, price, tx, type Ctx } from './context';
import { Btn, Head, Icon, Pic, Section, vars } from './parts';

export function Marquee({ ctx, data }: { ctx: Ctx; data: MarqueeData }) {
  const items = [...data.items, ...data.items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map(k => items.map((it, i) => <span className="marquee__item" key={`${k}-${i}`}>{tx(ctx, it)}</span>))}
      </div>
    </div>
  );
}

export function About({ ctx, data, num, alt }: { ctx: Ctx; data: AboutData; num: number; alt: boolean }) {
  const v = ctx.layout.about;
  const title = tx(ctx, data.title);
  if (v === 'scrub') {
    // One statement held on screen; its words light up one by one with the scroll.
    return (
      <Section id={data.id} className="about about--scrub" num={num} alt={alt} pin>
        <div className="pin__stage">
          <div className="wrap scrub">
            <p className="eyebrow">{tx(ctx, data.eyebrow)}</p>
            <h2 className="scrub__title">{title}</h2>
            <p className="scrub__text" data-words="">{tx(ctx, data.text[0])}</p>
            <div className="scrub__meter" aria-hidden="true"><i /></div>
          </div>
        </div>
      </Section>
    );
  }
  if (v === 'quote' && data.quote) {
    return (
      <Section id={data.id} className="about about--quote" num={num} alt={alt}>
        <div className="wrap about__in">
          <p className="eyebrow" data-reveal="">{tx(ctx, data.eyebrow)}</p>
          <blockquote className="bigquote" data-reveal="">
            <p>{tx(ctx, data.quote)}</p>
            {data.sign && <cite>{tx(ctx, data.sign)}</cite>}
          </blockquote>
          <div className="about__cols" data-reveal="">
            <h2 className="sec__title">{title}</h2>
            <div className="about__body">{data.text.map((p, i) => <p key={i}>{tx(ctx, p)}</p>)}</div>
          </div>
          <div className="about__strip" data-reveal="">
            <Pic id={data.img} alt={title} />
            {data.img2 !== undefined && <Pic id={data.img2} alt="" />}
          </div>
        </div>
      </Section>
    );
  }
  return (
    <Section id={data.id} className={`about about--${v === 'quote' ? 'split' : v}`} num={num} alt={alt}>
      <div className="wrap about__in">
        <div className="about__text">
          <Head ctx={ctx} eyebrow={data.eyebrow} title={data.title} />
          <div className="about__body" data-reveal="">{data.text.map((p, i) => <p key={i}>{tx(ctx, p)}</p>)}</div>
          {data.quote && (
            <blockquote className="about__quote" data-reveal="">
              <p>{tx(ctx, data.quote)}</p>
              {data.sign && <cite>{tx(ctx, data.sign)}</cite>}
            </blockquote>
          )}
        </div>
        <div className="about__visual" data-reveal="">
          <Pic id={data.img} alt={title} className="about__media" parallax={ctx.decor.has('parallax') ? 0.08 : undefined} />
          {data.img2 !== undefined && <Pic id={data.img2} alt="" className="about__media2" />}
        </div>
      </div>
    </Section>
  );
}

/** The variant a section actually gets: image layouts fall back when there are no photos. */
export const itemsVariant = (ctx: Ctx, data: ItemsData): ItemsVariant => resolveItemsVariant(ctx.layout, data);

function Card({ ctx, it, i, withImage }: { ctx: Ctx; it: Item; i: number; withImage: boolean }) {
  const p = price(ctx, it);
  return (
    <article className="card" data-reveal="" style={vars({ '--i': i % 4 })}>
      {it.tag && <span className="card__tag">{tx(ctx, it.tag)}</span>}
      {withImage && it.img !== undefined && <Pic id={it.img} alt={tx(ctx, it.title)} className="card__media" />}
      <div className="card__body">
        {!withImage && it.icon && <span className="card__icon"><Icon name={it.icon} /></span>}
        <h3 className="card__title">{tx(ctx, it.title)}</h3>
        {it.text && <p className="card__text">{tx(ctx, it.text)}</p>}
        {(p || it.meta) && (
          <div className="card__foot">
            {it.meta && <span className="card__meta">{tx(ctx, it.meta)}</span>}
            {p && <span className="card__price">{p}</span>}
          </div>
        )}
      </div>
    </article>
  );
}

function Tile({ ctx, it, i }: { ctx: Ctx; it: Item; i: number }) {
  return (
    <figure className="tile" data-reveal="" style={vars({ '--i': i % 4 })}>
      <img src={`../../img/${it.img}.webp`} alt={tx(ctx, it.title)} loading="lazy" decoding="async" />
      <figcaption><span className="tile__title">{tx(ctx, it.title)}</span>{it.meta && <span className="tile__meta">{tx(ctx, it.meta)}</span>}</figcaption>
    </figure>
  );
}

function Menu({ ctx, data }: { ctx: Ctx; data: ItemsData }) {
  const groups = data.groups ?? [{ name: undefined, items: data.items }];
  return (
    <div className="menu">
      {groups.map((g, gi) => (
        <div className="menu__group" key={gi} data-reveal="" style={vars({ '--i': gi })}>
          {g.name && <h3 className="menu__name">{tx(ctx, g.name)}</h3>}
          <ul className="menu__list">
            {g.items.map((it, i) => (
              <li className="menu__item" key={i}>
                <div className="menu__line">
                  <span className="menu__title">{tx(ctx, it.title)}</span>
                  <span className="menu__dots" aria-hidden="true" />
                  {it.price && <span className="menu__price">{price(ctx, it)}</span>}
                </div>
                {it.text && <p className="menu__text">{tx(ctx, it.text)}</p>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function Items({ ctx, data, num, alt }: { ctx: Ctx; data: ItemsData; num: number; alt: boolean }) {
  const v = itemsVariant(ctx, data);
  const items = data.items;
  const withImages = items.every(i => i.img !== undefined) && ctx.decor.has('no-card-images') === false && data.role !== 'process';
  if (v === 'rail') {
    // The vertical scroll slides the row of cards sideways, then the page carries on.
    return (
      <Section id={data.id} className={`items items--rail role-${data.role}`} num={num} alt={alt} pin rail>
        <div className="pin__stage">
          <div className="wrap"><Head ctx={ctx} eyebrow={data.eyebrow} title={data.title} lead={data.lead} /></div>
          <div className="rail__view">
            <div className="rail__track">
              {items.map((it, i) => {
                const p = price(ctx, it);
                return (
                  <article className="rail__card" key={i}>
                    <Pic id={it.img!} alt={tx(ctx, it.title)} className="rail__media" />
                    <h3 className="rail__title">{tx(ctx, it.title)}</h3>
                    {(p || it.meta) && <p className="rail__meta">{it.meta && <span>{tx(ctx, it.meta)}</span>}{p && <span className="rail__price">{p}</span>}</p>}
                  </article>
                );
              })}
            </div>
          </div>
          <div className="wrap rail__meter" aria-hidden="true"><i /></div>
        </div>
      </Section>
    );
  }
  let body;
  switch (v) {
    case 'cards':
      body = <div className="items__grid">{items.map((it, i) => <Card key={i} ctx={ctx} it={it} i={i} withImage={withImages && (it.icon === undefined || ctx.decor.has('icons') === false)} />)}</div>;
      break;
    case 'bento':
      body = data.role === 'gallery'
        ? <div className="bento bento--tiles">{items.map((it, i) => <Tile key={i} ctx={ctx} it={it} i={i} />)}</div>
        : <div className="bento">{items.map((it, i) => <Card key={i} ctx={ctx} it={it} i={i} withImage={withImages && !ctx.decor.has('icons')} />)}</div>;
      break;
    case 'menu':
      body = <Menu ctx={ctx} data={data} />;
      break;
    case 'list':
      body = data.groups && data.role === 'offer' ? <Menu ctx={ctx} data={data} /> : (
        <ol className="list">
          {items.map((it, i) => (
            <li className="row" key={i} data-reveal="" style={vars({ '--i': i % 4 })}>
              <span className="row__num">{pad(i + 1)}</span>
              <div><h3 className="row__title">{tx(ctx, it.title)}</h3>{it.text && <p className="row__text">{tx(ctx, it.text)}</p>}</div>
              <div className="row__end">
                {it.price && <span className="row__price">{price(ctx, it)}</span>}
                {it.meta && <span className="row__meta">{tx(ctx, it.meta)}</span>}
              </div>
            </li>
          ))}
        </ol>
      );
      break;
    case 'zigzag':
      body = (
        <div className="zig">
          {items.slice(0, 4).map((it, i) => (
            <article className="zig__row" key={i} data-reveal="">
              <Pic id={it.img!} alt={tx(ctx, it.title)} className="zig__media" />
              <div className="zig__body">
                <span className="zig__num">{pad(i + 1)}</span>
                {it.tag && <span className="badge">{tx(ctx, it.tag)}</span>}
                <h3 className="zig__title">{tx(ctx, it.title)}</h3>
                {it.text && <p className="zig__text">{tx(ctx, it.text)}</p>}
                {(it.price || it.meta) && <div className="zig__foot">{it.price && <span className="zig__price">{price(ctx, it)}</span>}{it.meta && <span className="zig__meta">{tx(ctx, it.meta)}</span>}</div>}
              </div>
            </article>
          ))}
        </div>
      );
      break;
    case 'gallery':
      body = <div className="gallery">{items.slice(0, 6).map((it, i) => <Tile key={i} ctx={ctx} it={it} i={i} />)}</div>;
      break;
    case 'masonry':
      body = <div className="masonry">{items.map((it, i) => <Tile key={i} ctx={ctx} it={it} i={i} />)}</div>;
      break;
    case 'strip':
      body = <div className="strip">{items.map((it, i) => <Tile key={i} ctx={ctx} it={it} i={i} />)}</div>;
      break;
    case 'timeline':
      body = (
        <ol className="timeline">
          {items.map((it, i) => (
            <li className="tl" key={i} data-reveal="" style={vars({ '--i': i % 4 })}>
              <span className="tl__time">{tx(ctx, it.meta) || pad(i + 1)}</span>
              <span className="tl__dot" aria-hidden="true" />
              <div><h3 className="tl__title">{tx(ctx, it.title)}</h3>{it.text && <p className="tl__text">{tx(ctx, it.text)}</p>}</div>
            </li>
          ))}
        </ol>
      );
      break;
    case 'pricing':
      body = (
        <div className="plans">
          {items.map((it, i) => (
            <article className={it.featured ? 'plan is-featured' : 'plan'} key={i} data-reveal="" style={vars({ '--i': i })}>
              {it.tag && <span className="plan__tag">{tx(ctx, it.tag)}</span>}
              <h3 className="plan__name">{tx(ctx, it.title)}</h3>
              <p className="plan__price"><span className="plan__amount">{price(ctx, it)}</span>{it.meta && <span className="plan__per">{tx(ctx, it.meta)}</span>}</p>
              {it.text && <p className="card__text">{tx(ctx, it.text)}</p>}
              {it.list && <ul className="plan__list">{it.list.map((l, k) => <li key={k}>{tx(ctx, l)}</li>)}</ul>}
              <Btn ctx={ctx} label={ctx.profile.navCta} kind={it.featured ? 'primary' : 'ghost'} />
            </article>
          ))}
        </div>
      );
      break;
    case 'steps':
      body = (
        <ol className="steps">
          {items.map((it, i) => (
            <li className="step" key={i} data-reveal="" style={vars({ '--i': i })}>
              <span className="step__num">{pad(i + 1)}</span>
              {it.icon && <span className="step__icon"><Icon name={it.icon} /></span>}
              <h3 className="step__title">{tx(ctx, it.title)}</h3>
              {it.text && <p className="step__text">{tx(ctx, it.text)}</p>}
            </li>
          ))}
        </ol>
      );
      break;
    case 'table':
      body = (
        <div className="tbl" role="list">
          {items.map((it, i) => (
            <div className="tbl__row" role="listitem" key={i} data-reveal="" style={vars({ '--i': i % 4 })}>
              <span className="tbl__num">{data.role === 'schedule' ? tx(ctx, it.meta) : pad(i + 1)}</span>
              <span className="tbl__title">{tx(ctx, it.title)}</span>
              <span className="tbl__text">{tx(ctx, it.text)}{it.list && it.list.map(l => tx(ctx, l)).join(' · ')}</span>
              <span className="tbl__end">{price(ctx, it)}{data.role !== 'schedule' && it.meta && <small>{tx(ctx, it.meta)}</small>}</span>
            </div>
          ))}
        </div>
      );
      break;
  }
  return (
    <Section id={data.id} className={`items items--${v} role-${data.role}`} num={num} alt={alt}>
      <div className="wrap">
        <Head ctx={ctx} eyebrow={data.eyebrow} title={data.title} lead={data.lead} />
        {body}
        {data.cta && <div className="sec__cta" data-reveal=""><Btn ctx={ctx} label={data.cta} kind="ghost" arrow /></div>}
      </div>
    </Section>
  );
}

export function Stats({ ctx, data }: { ctx: Ctx; data: StatsData }) {
  return (
    <section className={`stats stats--${ctx.layout.stats}`} aria-label={ctx.lang === 'ar' ? 'أرقام' : 'Figures'}>
      <div className="wrap stats__grid">
        {data.items.map((s, i) => (
          <div className="stat" key={i} data-reveal="" style={vars({ '--i': i })}>
            <span className="stat__value" data-count={/\d/.test(s.value) ? s.value : undefined}>{s.value}</span>
            <span className="stat__label">{tx(ctx, s.label)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Logos({ ctx, data }: { ctx: Ctx; data: LogosData }) {
  return (
    <section className="logos">
      <div className="wrap">
        <p className="logos__title">{tx(ctx, data.title)}</p>
        <div className="logos__row">{data.items.map(l => <span className="logo-word" key={l}>{l}</span>)}</div>
      </div>
    </section>
  );
}
