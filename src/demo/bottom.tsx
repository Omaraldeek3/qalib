import type { ContactData, CtaData, FaqData, L, QuotesData } from '@/catalog/types';
import { socialLabel, socialSvg, tx, type Ctx } from './context';
import { Btn, Head, Icon, Pic, Section, initials, vars } from './parts';

export function Quotes({ ctx, data, num, alt }: { ctx: Ctx; data: QuotesData; num: number; alt: boolean }) {
  const v = ctx.layout.quotes;
  const quote = (q: QuotesData['items'][number], i: number, reveal = true) => (
    <figure className="quote" key={i} data-reveal={reveal ? '' : undefined} style={vars({ '--i': i })}>
      <blockquote><p>{tx(ctx, q.quote)}</p></blockquote>
      <figcaption>
        <span className="quote__avatar" aria-hidden="true">{initials(tx(ctx, q.name))}</span>
        <span><span className="quote__name">{tx(ctx, q.name)}</span><span className="quote__role">{tx(ctx, q.role)}</span></span>
      </figcaption>
    </figure>
  );
  let body;
  if (v === 'single') {
    body = (
      <div className="quotes__stage" data-reveal="">
        {data.items.map((q, i) => quote(q, i, false))}
        <div className="quotes__dots">
          {data.items.map((q, i) => <button key={i} type="button" aria-label={`${i + 1}`} aria-current={i === 0 ? 'true' : 'false'} />)}
        </div>
      </div>
    );
  } else if (v === 'marquee') {
    body = <div className="quotes__track">{[...data.items, ...data.items].map((q, i) => quote(q, i, false))}</div>;
  } else {
    body = <div className="quotes__grid">{data.items.map((q, i) => quote(q, i))}</div>;
  }
  return (
    <Section id={data.id} className={`quotes quotes--${v}`} num={num} alt={alt}>
      <div className="wrap"><Head ctx={ctx} eyebrow={data.eyebrow} title={data.title} center={v === 'single'} /></div>
      {v === 'marquee' ? body : <div className="wrap">{body}</div>}
    </Section>
  );
}

export function Faq({ ctx, data, num, alt }: { ctx: Ctx; data: FaqData; num: number; alt: boolean }) {
  return (
    <Section id={data.id} className="faq" num={num} alt={alt}>
      <div className="wrap">
        <Head ctx={ctx} eyebrow={data.eyebrow} title={data.title} />
        <div className="faq__list" data-reveal="">
          {data.items.map((f, i) => (
            <details className="faq__item" key={i} open={i === 0}>
              <summary>{tx(ctx, f.q)}</summary>
              <p>{tx(ctx, f.a)}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function Cta({ ctx, data, href }: { ctx: Ctx; data: CtaData; href: string }) {
  const v = ctx.layout.cta === 'image' && data.img === undefined ? 'band' : ctx.layout.cta;
  return (
    <section className={`cta cta--${v}`}>
      {v === 'image' && data.img !== undefined && <Pic id={data.img} alt="" className="cta__bg" />}
      <div className="wrap cta__in" data-reveal="">
        <div>
          <h2 className="cta__title">{tx(ctx, data.title)}</h2>
          <p className="cta__text">{tx(ctx, data.text)}</p>
        </div>
        <Btn ctx={ctx} label={data.cta} href={href} arrow />
      </div>
    </section>
  );
}

function Info({ icon, label, value, ltr }: { icon: string; label: string; value: string; ltr?: boolean }) {
  return (
    <div className="info">
      <Icon name={icon} />
      <div><span className="info__label">{label}</span><span className="info__value" dir={ltr ? 'ltr' : undefined}>{value}</span></div>
    </div>
  );
}

export function Contact({ ctx, data, num, alt }: { ctx: Ctx; data: ContactData; num: number; alt: boolean }) {
  const v = ctx.layout.contact;
  const ar = ctx.lang === 'ar';
  const info = (
    <div className="contact__info" data-reveal="">
      <Info icon="map-pin" label={ar ? 'العنوان' : 'Address'} value={tx(ctx, data.address)} />
      <Info icon="phone" label={ar ? 'الهاتف' : 'Phone'} value={data.phone} ltr />
      <Info icon="mail" label={ar ? 'البريد' : 'Email'} value={data.email} ltr />
    </div>
  );
  const hours = (
    <div className="hours">
      {data.hours.map((h, i) => <div className="hours__row" key={i}><span>{tx(ctx, h.d)}</span><span>{tx(ctx, h.t)}</span></div>)}
    </div>
  );
  const whatsapp = <Btn ctx={ctx} label={data.cta} arrow />;
  const hoursTitle: L = { ar: 'المواعيد', en: 'Hours' };
  const form = (
    <form className="form" data-reveal="">
      <div className="field"><label htmlFor="f-name">{ar ? 'الاسم' : 'Name'}</label><input id="f-name" name="name" autoComplete="name" /></div>
      <div className="field"><label htmlFor="f-phone">{ar ? 'الهاتف' : 'Phone'}</label><input id="f-phone" name="phone" type="tel" dir="ltr" autoComplete="tel" /></div>
      <div className="field"><label htmlFor="f-msg">{ar ? 'رسالتك' : 'Message'}</label><textarea id="f-msg" name="message" /></div>
      <button className="btn btn--primary" type="submit">{tx(ctx, data.cta)}</button>
      <p className="form__note" role="status">{ar ? 'شكرًا! سنتواصل معك قريبًا.' : 'Thank you! We\'ll be in touch soon.'}</p>
    </form>
  );
  let body;
  if (v === 'center') {
    body = (
      <div className="wrap contact__in">
        <Head ctx={ctx} eyebrow={data.eyebrow} title={data.title} lead={data.text} center />
        <div className="contact__big" data-reveal="">{whatsapp}</div>
        {info}
        <div className="contact__panel" data-reveal=""><h3>{tx(ctx, hoursTitle)}</h3>{hours}</div>
      </div>
    );
  } else if (v === 'card') {
    body = (
      <div className="wrap contact__in">
        <div className="contact__card" data-reveal="">
          <div><Head ctx={ctx} eyebrow={data.eyebrow} title={data.title} lead={data.text} />{info}</div>
          <div><h3 className="contact__hours-title">{tx(ctx, hoursTitle)}</h3>{hours}<div className="sec__cta">{whatsapp}</div></div>
        </div>
      </div>
    );
  } else if (v === 'form') {
    body = (
      <div className="wrap contact__in">
        <div><Head ctx={ctx} eyebrow={data.eyebrow} title={data.title} lead={data.text} />{info}<div className="contact__hours" data-reveal="">{hours}</div></div>
        <div className="contact__panel">{form}</div>
      </div>
    );
  } else {
    body = (
      <div className="wrap contact__in">
        <div><Head ctx={ctx} eyebrow={data.eyebrow} title={data.title} lead={data.text} />{info}</div>
        <div className="contact__panel" data-reveal=""><h3>{tx(ctx, hoursTitle)}</h3>{hours}{whatsapp}</div>
      </div>
    );
  }
  return <Section id={data.id} className={`contact contact--${v}`} num={num} alt={alt}>{body}</Section>;
}

export function Footer({ ctx, links, contact }: { ctx: Ctx; links: { id: string; label: L }[]; contact?: ContactData }) {
  const v = ctx.layout.footer;
  const ar = ctx.lang === 'ar';
  const brand = tx(ctx, ctx.profile.brand);
  const year = 2026;
  const socials = (
    <div className="socials">
      {ctx.profile.socials.map(s => <a key={s} className="social" href="#" aria-label={socialLabel[s]} dangerouslySetInnerHTML={{ __html: socialSvg[s] }} />)}
    </div>
  );
  const copy = <span>© {year} {brand}. {ar ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</span>;
  const brandBlock = (
    <div>
      <a className="brand" href="#top"><span className="brand__mark" aria-hidden="true">{tx(ctx, ctx.profile.mark)}</span><span className="brand__name">{brand}</span></a>
      <p className="foot__tagline">{tx(ctx, ctx.profile.tagline)}</p>
    </div>
  );
  if (v === 'simple') {
    return (
      <footer className="foot foot--simple">
        <div className="wrap foot__row">{brandBlock}{socials}</div>
        <div className="wrap foot__bottom">{copy}<span>{contact?.email}</span></div>
      </footer>
    );
  }
  const cols = (
    <div className="foot__cols">
      {brandBlock}
      <div><p className="foot__title">{ar ? 'الصفحة' : 'Explore'}</p><div className="foot__links">{links.map(l => <a key={l.id} href={`#${l.id}`}>{tx(ctx, l.label)}</a>)}</div></div>
      <div>
        <p className="foot__title">{ar ? 'تواصل' : 'Contact'}</p>
        {contact && <div className="foot__links"><span>{tx(ctx, contact.address)}</span><span dir="ltr">{contact.phone}</span><span dir="ltr">{contact.email}</span></div>}
      </div>
      <div><p className="foot__title">{ar ? 'تابعنا' : 'Follow'}</p>{socials}</div>
    </div>
  );
  return (
    <footer className={`foot foot--${v}`}>
      <div className="wrap">
        {v === 'big' && <p className="foot__word" aria-hidden="true">{brand}</p>}
        {cols}
        <div className="foot__bottom">{copy}<span>{tx(ctx, ctx.profile.label)}</span></div>
      </div>
    </footer>
  );
}

/** A slim bar above the menu with the phone, email and hours (conventional sites). */
export function Topbar({ ctx, contact }: { ctx: Ctx; contact: ContactData }) {
  return (
    <div className="topbar">
      <div className="wrap topbar__in">
        <span className="topbar__item"><Icon name="phone" /><span dir="ltr">{contact.phone}</span></span>
        <span className="topbar__item"><Icon name="mail" /><span dir="ltr">{contact.email}</span></span>
        {contact.hours[0] && <span className="topbar__item"><Icon name="clock" />{tx(ctx, contact.hours[0].d)} · {tx(ctx, contact.hours[0].t)}</span>}
        <div className="socials">
          {ctx.profile.socials.map(s => <a key={s} className="social" href="#" aria-label={socialLabel[s]} dangerouslySetInnerHTML={{ __html: socialSvg[s] }} />)}
        </div>
      </div>
    </div>
  );
}

/** A floating chat button in the corner. */
export function WhatsApp({ ctx }: { ctx: Ctx }) {
  return <a className="wa-float" href="#" aria-label={ctx.lang === 'ar' ? 'راسلنا على واتساب' : 'Message us on WhatsApp'}><Icon name="message-circle" /></a>;
}
