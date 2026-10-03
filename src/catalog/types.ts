// The shape of everything in the catalogue. A design is pure data: the demo
// generator and the prompt builder both read it, so they cannot disagree.

export type Lang = 'ar' | 'en';
export const langs = ['ar', 'en'] as const satisfies readonly Lang[];

/** A piece of text in both languages. */
export type L = { ar: string; en: string };

export type CategoryId =
  | 'classic' | 'vintage' | 'modern' | 'animated' | 'heritage' | 'digital'
  | 'minimal' | 'luxury' | 'playful' | 'editorial' | 'brutalist' | 'glass'
  | 'retro' | 'organic' | 'artdeco' | 'handdrawn' | 'geometric' | 'conventional'
  | 'interactive' | 'bento' | 'clay' | 'soft' | 'aurora' | 'y2k' | 'pixel' | 'skeuo';

export type ProfileId =
  | 'restaurant' | 'cafe' | 'sweets' | 'farm' | 'construction' | 'agency'
  | 'software' | 'clinic' | 'perfume' | 'boutique' | 'photographer' | 'app'
  | 'wedding' | 'conference' | 'signage' | 'hotel' | 'academy' | 'gym'
  | 'realestate' | 'law';

/** A photo in public/img, named by its Lorem Picsum id. */
export type ImgId = number;

// ---- Demo content -------------------------------------------------------

export type Item = {
  title: L;
  text?: L;
  /** Already formatted, e.g. "18 ₪" or "$29"; words need both languages. */
  price?: string | L;
  /** A short label: a duration, a time, a unit, a place. */
  meta?: L;
  img?: ImgId;
  /** A lucide icon name. */
  icon?: string;
  tag?: L;
  /** Bullet points, e.g. what a plan includes. */
  list?: L[];
  featured?: boolean;
};

export type ItemsRole = 'offer' | 'gallery' | 'pricing' | 'process' | 'schedule' | 'extra';

export type HeroData = {
  kind: 'hero';
  eyebrow: L;
  title: L;
  lead: L;
  cta: L;
  cta2?: L;
  img: ImgId;
  /** Extra photos for collage heroes. */
  imgs?: ImgId[];
  badge?: L;
  /** ISO date for countdowns (events). */
  date?: string;
  place?: L;
};

export type AboutData = {
  kind: 'about'; id: string; nav: L;
  eyebrow: L; title: L; text: L[];
  img: ImgId; img2?: ImgId;
  quote?: L; sign?: L;
};

export type ItemsData = {
  kind: 'items'; id: string; nav?: L; role: ItemsRole;
  eyebrow: L; title: L; lead?: L;
  items: Item[];
  /** Menus are grouped: starters, mains, drinks… */
  groups?: { name: L; items: Item[] }[];
  cta?: L;
};

export type StatsData = { kind: 'stats'; items: { value: string; label: L }[] };
export type MarqueeData = { kind: 'marquee'; items: L[] };
export type LogosData = { kind: 'logos'; title: L; items: string[] };
export type QuotesData = {
  kind: 'testimonials'; id: string; nav?: L;
  eyebrow: L; title: L;
  items: { quote: L; name: L; role: L }[];
};
export type FaqData = { kind: 'faq'; id: string; nav?: L; eyebrow: L; title: L; items: { q: L; a: L }[] };
export type CtaData = { kind: 'cta'; title: L; text: L; cta: L; img?: ImgId };
export type ContactData = {
  kind: 'contact'; id: string; nav: L;
  eyebrow: L; title: L; text: L;
  phone: string; whatsapp: string; email: string;
  address: L;
  hours: { d: L; t: L }[];
  cta: L;
};

export type Section =
  | HeroData | AboutData | ItemsData | StatsData | MarqueeData | LogosData
  | QuotesData | FaqData | CtaData | ContactData;

export type Social = 'instagram' | 'facebook' | 'x' | 'linkedin' | 'youtube' | 'behance';

/** A believable business whose one-page site the demos show. */
export type Profile = {
  id: ProfileId;
  /** The kind of site: "Restaurant". */
  label: L;
  brand: L;
  /** One or two letters for the logo mark. */
  mark: L;
  tagline: L;
  navCta: L;
  sections: Section[];
  socials: Social[];
};

// ---- Layout variants ----------------------------------------------------

export const navVariants = ['bar', 'center', 'split', 'minimal', 'pill'] as const;
export const heroVariants = ['split', 'centered', 'fullbleed', 'type', 'collage', 'framed', 'editorial', 'device', 'poster', 'arch',
  // Interactive heroes: driven by the scroll (zoom, curtain) or the pointer (layers, spotlight, trail, tilt).
  'zoom', 'layers', 'spotlight', 'trail', 'tilt', 'curtain'] as const;
export const aboutVariants = ['split', 'quote', 'columns', 'overlap', 'scrub'] as const;
export const itemsVariants = ['cards', 'list', 'menu', 'zigzag', 'gallery', 'masonry', 'strip', 'bento', 'timeline', 'pricing', 'steps', 'table', 'rail'] as const;
export const quotesVariants = ['cards', 'single', 'wall', 'marquee'] as const;
export const contactVariants = ['split', 'center', 'card', 'form'] as const;
export const ctaVariants = ['band', 'big', 'image'] as const;
export const footerVariants = ['simple', 'columns', 'big'] as const;
export const statsVariants = ['row', 'big'] as const;

export type NavVariant = (typeof navVariants)[number];
export type HeroVariant = (typeof heroVariants)[number];
export type AboutVariant = (typeof aboutVariants)[number];
export type ItemsVariant = (typeof itemsVariants)[number];
export type QuotesVariant = (typeof quotesVariants)[number];
export type ContactVariant = (typeof contactVariants)[number];
export type CtaVariant = (typeof ctaVariants)[number];
export type FooterVariant = (typeof footerVariants)[number];
export type StatsVariant = (typeof statsVariants)[number];

/** Which variant every part of the page uses. Items are chosen by role. */
export type Layout = {
  nav: NavVariant;
  hero: HeroVariant;
  about: AboutVariant;
  quotes: QuotesVariant;
  contact: ContactVariant;
  cta: CtaVariant;
  footer: FooterVariant;
  stats: StatsVariant;
  offer: ItemsVariant;
  gallery: ItemsVariant;
  pricing: ItemsVariant;
  process: ItemsVariant;
  schedule: ItemsVariant;
  extra: ItemsVariant;
};

// ---- Styles and designs -------------------------------------------------

/** How much the page moves. */
export type Motion = 'calm' | 'subtle' | 'lively' | 'rich';

export type Palette = {
  /** Page background. */
  bg: string;
  /** Cards, panels, alternate sections. */
  surface: string;
  /** Main text. */
  ink: string;
  /** Secondary text. */
  muted: string;
  /** Buttons, links, highlights. */
  accent: string;
  /** A second highlight colour. */
  accent2: string;
  /** Rules and borders. */
  line: string;
  /** Text on the accent colour. */
  onAccent: string;
};

export type DesignFonts = {
  /** Latin headings. */
  display: string;
  /** Latin text. */
  body: string;
  /** Arabic headings. */
  displayAr: string;
  /** Arabic text. */
  bodyAr: string;
  /** Labels, numbers or flourishes (mono or script); optional. */
  accent?: string;
};

export type Category = {
  id: CategoryId;
  name: L;
  /** One line under the name. */
  tagline: L;
  /** A paragraph for the style page and the prompt. */
  description: L;
  /** What defines the style, used verbatim in prompts. */
  dna: {
    type: L; color: L; layout: L; shape: L; imagery: L; motion: L; details: L; avoid: L;
  };
  defaults: Layout;
  motion: Motion;
  /** Corner radius in px for cards and images. */
  radius: number;
  /** How the style's tile looks in the library. */
  tile: { bg: string; ink: string; accent: string; font: string; fontAr: string };
};

export type Design = {
  slug: string;
  /** Catalogue number, from 1. */
  no: number;
  cat: CategoryId;
  profile: ProfileId;
  name: L;
  /** One sentence about the design's character. */
  blurb: L;
  scheme: 'light' | 'dark';
  palette: Palette;
  fonts: DesignFonts;
  /** Overrides of the style's default layout. */
  layout?: Partial<Layout>;
  motion?: Motion;
  /** Style-specific ornaments switched on for this design. */
  decor?: string[];
  radius?: number;
  /** Extra CSS for this design only, appended after the style's kit. */
  css?: string;
};
