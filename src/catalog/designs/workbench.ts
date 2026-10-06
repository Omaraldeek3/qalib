import type { DesignInput } from './input';

// Twelve working tools, each behind one of the demo businesses, each laid out
// and dressed differently: where the navigation sits, which side the settings
// take, what the workspace shows and how the controls look.

export const workbench: DesignInput[] = [
  {
    slug: 'bench', profile: 'signage',
    name: { ar: 'منضدة', en: 'Bench' },
    blurb: { ar: 'منضدة عمل للورش: أدوات مرتبة في شريط جانبي، وإعدادات بجانب لوح القص، وبرتقالي الليزر للزر الذي يهم.', en: 'A workshop bench: tools grouped down a sidebar, settings beside the cutting sheet, and laser orange for the one button that matters.' },
    scheme: 'light',
    palette: { bg: '#F2F1ED', surface: '#FFFFFF', ink: '#181B17', muted: '#5E635B', accent: '#C9431B', accent2: '#2F5DB8', line: '#E1DFD7', onAccent: '#FFFFFF' },
    fonts: { display: 'manrope', body: 'manrope', displayAr: 'tajawal', bodyAr: 'tajawal' },
    app: { nav: 'sidebar', panel: 'start', view: 'canvas' },
    radius: 10,
  },
  {
    slug: 'site-plan', profile: 'construction',
    name: { ar: 'مخطط أزرق', en: 'Blueprint' },
    blurb: { ar: 'مخطط هندسي أزرق بخطوط بيضاء وأرقام بخط آلة كاتبة، وشريط أيقونات ضيق يترك الرسم يملأ الشاشة.', en: 'An engineering blueprint: white linework, typewriter figures and a narrow icon rail that leaves the drawing the whole screen.' },
    scheme: 'dark',
    palette: { bg: '#0E2A4A', surface: '#123457', ink: '#EAF2FF', muted: '#A9C1DE', accent: '#FFD34D', accent2: '#7FD1FF', line: '#2A5582', onAccent: '#0E2A4A' },
    fonts: { display: 'ibm-plex-mono', body: 'ibm-plex-sans', displayAr: 'ibm-plex-sans-arabic', bodyAr: 'ibm-plex-sans-arabic', accent: 'ibm-plex-mono' },
    app: { nav: 'rail', panel: 'end', view: 'plan' },
    radius: 2,
    css: `.ws-view { background-color: #0B2442; background-image: linear-gradient(rgba(127,209,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(127,209,255,.08) 1px, transparent 1px); background-size: 24px 24px; }
.app-stat strong, .app-field input { font-family: var(--font-accent); }`,
  },
  {
    slug: 'graphite', profile: 'agency',
    name: { ar: 'جرافيت', en: 'Graphite' },
    blurb: { ar: 'لوحة مشاريع داكنة بلمسة بنفسجية: بطاقات تنتقل بين الأعمدة، ولوحة تفاصيل تنزلق من الجانب.', en: 'A dark project board with a violet edge: cards move between columns and a detail panel slides in from the side.' },
    scheme: 'dark',
    palette: { bg: '#15161A', surface: '#1E2026', ink: '#EDEDF0', muted: '#9B9DA8', accent: '#8B7CF6', accent2: '#4FD1C5', line: '#2C2E37', onAccent: '#0F0F14' },
    fonts: { display: 'inter', body: 'inter', displayAr: 'ibm-plex-sans-arabic', bodyAr: 'ibm-plex-sans-arabic' },
    app: { nav: 'sidebar', panel: 'end', view: 'kanban' },
    radius: 8,
  },
  {
    slug: 'docket', profile: 'law',
    name: { ar: 'سجلّ', en: 'Docket' },
    blurb: { ar: 'سجل قضايا على ورق عاجي بخط مذيل وعنابي القضاة؛ جدول هادئ تقرؤه كالدفتر.', en: 'A case register on ivory paper in a serif and a judge\'s oxblood; a quiet table that reads like a ledger.' },
    scheme: 'light',
    palette: { bg: '#F6F1E7', surface: '#FFFDF8', ink: '#2A2420', muted: '#6F655A', accent: '#7A2531', accent2: '#A27C45', line: '#E3D9C7', onAccent: '#FFFFFF' },
    fonts: { display: 'libre-baskerville', body: 'source-serif-4', displayAr: 'amiri', bodyAr: 'noto-naskh-arabic' },
    app: { nav: 'topbar', panel: 'end', view: 'table' },
    radius: 2,
    css: `.ws-table tbody tr:nth-child(odd) td { background: color-mix(in srgb, var(--surface) 70%, var(--bg)); }
.ws-head h1 { font-weight: 400; }`,
  },
  {
    slug: 'calm-desk', profile: 'clinic',
    name: { ar: 'استقبال هادئ', en: 'Calm desk' },
    blurb: { ar: 'تقويم عيادة بألوان النعناع وحواف ناعمة: مواعيد ملونة بحسب الطبيب، ونموذج حجز دائم بجانبها.', en: 'A clinic calendar in mint with soft edges: appointments coloured by dentist and a booking form always beside them.' },
    scheme: 'light',
    palette: { bg: '#F2F8F6', surface: '#FFFFFF', ink: '#16302B', muted: '#4F6A63', accent: '#0B7A6A', accent2: '#E08A3C', line: '#DCE9E5', onAccent: '#FFFFFF' },
    fonts: { display: 'plus-jakarta-sans', body: 'plus-jakarta-sans', displayAr: 'readex-pro', bodyAr: 'readex-pro' },
    app: { nav: 'sidebar', panel: 'start', view: 'week' },
    radius: 16,
  },
  {
    slug: 'night-audit', profile: 'hotel',
    name: { ar: 'مناوبة ليلية', en: 'Night audit' },
    blurb: { ar: 'مكتب استقبال فندق بالكحلي والنحاسي: الغرف أسطر والإقامات أشرطة، وعناوين بخط مذيل فاخر.', en: 'A hotel front desk in navy and brass: rooms are rows, stays are bars, and headings in a luxe serif.' },
    scheme: 'dark',
    palette: { bg: '#0F1626', surface: '#172238', ink: '#F1ECE2', muted: '#A7ADBB', accent: '#C9A45C', accent2: '#6FA8DC', line: '#28354F', onAccent: '#0F1626' },
    fonts: { display: 'dm-serif-display', body: 'dm-sans', displayAr: 'el-messiri', bodyAr: 'alexandria' },
    app: { nav: 'topbar', panel: 'end', view: 'timeline' },
    radius: 6,
  },
  {
    slug: 'pass', profile: 'restaurant',
    name: { ar: 'الكاونتر', en: 'The pass' },
    blurb: { ar: 'شاشة مطبخ تُقرأ من مترين: أسود عالي التباين، أصفر الطباشير للعاجل، وأرقام طلبات ضخمة.', en: 'A kitchen screen you read from two metres: high-contrast black, chalk yellow for rush and giant order numbers.' },
    scheme: 'dark',
    palette: { bg: '#111111', surface: '#1C1C1C', ink: '#F5F5F0', muted: '#A6A69E', accent: '#FFC93C', accent2: '#FF6A3D', line: '#2E2E2E', onAccent: '#111111' },
    fonts: { display: 'bebas-neue', body: 'work-sans', displayAr: 'lalezar', bodyAr: 'cairo' },
    app: { nav: 'rail', panel: 'end', view: 'kanban' },
    radius: 4,
    css: `.ws-card strong { font-family: var(--font-display); font-size: 1.35rem; letter-spacing: .02em; }
html[lang="ar"] .ws-card strong { font-size: 1.2rem; }`,
  },
  {
    slug: 'mono-shop', profile: 'boutique',
    name: { ar: 'رفّ', en: 'Rack' },
    blurb: { ar: 'إدارة متجر بلا ألوان: صور المنتجات تملأ الشبكة، وحبر أسود، وتفاصيل كمجلة أزياء.', en: 'A shop admin without colour: product photos fill the grid, black ink and fashion-magazine details.' },
    scheme: 'light',
    palette: { bg: '#FFFFFF', surface: '#F5F4F2', ink: '#111111', muted: '#66665F', accent: '#111111', accent2: '#B08A5E', line: '#E8E7E3', onAccent: '#FFFFFF' },
    fonts: { display: 'inter-tight', body: 'inter', displayAr: 'alexandria', bodyAr: 'alexandria' },
    app: { nav: 'topbar', panel: 'start', view: 'grid' },
    radius: 0,
    css: `.ws-tile figure { aspect-ratio: 3 / 4; }
.app-nav-top a { text-transform: uppercase; letter-spacing: .08em; font-size: .75rem; }
html[lang="ar"] .app-nav-top a { letter-spacing: 0; font-size: .85rem; text-transform: none; }`,
  },
  {
    slug: 'kpi-board', profile: 'software',
    name: { ar: 'مقياس', en: 'Metric' },
    blurb: { ar: 'لوحة بيانات نظيفة بشريط جانبي نيلي، أرقام كبيرة، ورسم بياني بخطين ومنحنيات ناعمة.', en: 'A clean data dashboard with an indigo sidebar, big figures and a two-line chart with soft curves.' },
    scheme: 'light',
    palette: { bg: '#F7F8FA', surface: '#FFFFFF', ink: '#101828', muted: '#5A667D', accent: '#4F46E5', accent2: '#12A35A', line: '#E4E7EC', onAccent: '#FFFFFF' },
    fonts: { display: 'figtree', body: 'figtree', displayAr: 'noto-kufi-arabic', bodyAr: 'noto-sans-arabic' },
    app: { nav: 'sidebar', panel: 'end', view: 'dashboard' },
    radius: 12,
    css: `.app-side { background: var(--accent); color: var(--on-accent); border-color: transparent; }
.app-side .app-group h2, .app-side .app-search { color: color-mix(in srgb, var(--on-accent) 70%, transparent); }
.app-side .app-search { background: color-mix(in srgb, var(--on-accent) 12%, transparent); border-color: transparent; }
.app-side .app-groups a, .app-side .app-groups a > span:not(.icon) { color: color-mix(in srgb, var(--on-accent) 86%, transparent); }
.app-side .app-brand-name small { color: color-mix(in srgb, var(--on-accent) 70%, transparent); }
.app-side .app-groups a.is-active, .app-side .app-groups a:hover { background: color-mix(in srgb, var(--on-accent) 16%, transparent); color: var(--on-accent); }
.app-side .app-groups a.is-active::before { background: var(--on-accent); }
.app-side .app-brand-mark { background: var(--on-accent); color: var(--accent); }
.app-side .app-foot { color: color-mix(in srgb, var(--on-accent) 70%, transparent); border-color: color-mix(in srgb, var(--on-accent) 18%, transparent); }`,
  },
  {
    slug: 'loupe', profile: 'photographer',
    name: { ar: 'عدسة مكبّرة', en: 'Loupe' },
    blurb: { ar: 'غرفة فرز صور برمادي محايد لا يغيّر الألوان، نجوم وأعلام بالكهرماني، وشريط أيقونات ضيق.', en: 'A culling room in a neutral grey that leaves colours alone, amber stars and flags, and a slim icon rail.' },
    scheme: 'dark',
    palette: { bg: '#2A2A2A', surface: '#333333', ink: '#EDEDED', muted: '#ABABAB', accent: '#FFB547', accent2: '#6CC5FF', line: '#414141', onAccent: '#1B1B1B' },
    fonts: { display: 'manrope', body: 'manrope', displayAr: 'zain', bodyAr: 'zain' },
    app: { nav: 'rail', panel: 'end', view: 'gallery' },
    radius: 4,
  },
  {
    slug: 'lesson-book', profile: 'academy',
    name: { ar: 'كرّاسة', en: 'Notebook' },
    blurb: { ar: 'محرر دروس كدفتر دافئ: خط مذيل ودود للعناوين، كتل محتوى تُسحب، واختبار قصير في آخر الصفحة.', en: 'A lesson editor like a warm notebook: a friendly serif for headings, draggable content blocks and a short quiz at the end.' },
    scheme: 'light',
    palette: { bg: '#FBF7EE', surface: '#FFFFFF', ink: '#23201A', muted: '#665F52', accent: '#2E6E4F', accent2: '#D9952C', line: '#EDE4D3', onAccent: '#FFFFFF' },
    fonts: { display: 'fraunces', body: 'lexend', displayAr: 'markazi-text', bodyAr: 'readex-pro' },
    app: { nav: 'topbar', panel: 'start', view: 'document' },
    radius: 12,
    css: `.ws-doc { background-image: repeating-linear-gradient(to bottom, transparent 0 31px, color-mix(in srgb, var(--accent2) 18%, transparent) 31px 32px); }`,
  },
  {
    slug: 'stage-plan', profile: 'conference',
    name: { ar: 'خشبة', en: 'Stage plan' },
    blurb: { ar: 'برنامج مؤتمر بأسلوب جريء: حدود سوداء سميكة، مرجاني وأزرق صافيان، وقاعات كمسارات على الشاشة.', en: 'A conference planner in a bold style: thick black borders, pure coral and blue, and halls as lanes across the screen.' },
    scheme: 'light',
    palette: { bg: '#FFFCF5', surface: '#FFFFFF', ink: '#111111', muted: '#55554F', accent: '#FF5A36', accent2: '#2D5BFF', line: '#111111', onAccent: '#111111' },
    fonts: { display: 'space-grotesk', body: 'space-grotesk', displayAr: 'cairo', bodyAr: 'cairo' },
    app: { nav: 'rail', panel: 'start', view: 'timeline' },
    radius: 0,
    css: `.app-panel, .ws-frame, .app-stat, .app-btn, .app-rail, .app-top { border-width: 2px; }
.app-btn, .app-stat, .ws-bar { box-shadow: 3px 3px 0 var(--ink); }
.app-btn--primary:hover { transform: translate(-1px, -1px); box-shadow: 4px 4px 0 var(--ink); }`,
  },
];
