import type { L } from '@/catalog/types';

const t = (ar: string, en: string): L => ({ ar, en });

export type WorkItem = {
  id: string;
  no: string;
  title: L;
  cat: 'web' | 'ai' | 'svg';
  catLabel: L;
  year: string;
  metric: L;
  stack: string[];
  summary: L;
  img: number;
};

export type StatItem = {
  value: string;
  label: L;
  code: string;
};

export type CapItem = {
  no: string;
  title: L;
  short: L;
  spec: L;
  tools: string[];
};

export const IDENTITY = {
  brand: t('عمر الديك', 'Omar Aldeek'),
  mark: t('ع', 'OA'),
  role: t('مطور ويب · مصمم واجهات · باني أتمتة', 'Web Developer · UI Designer · Automation Builder'),
  location: t('فلسطين · استوديو مستقل', 'Palestine · One-person studio'),
  coords: '31.90°N 35.20°E',
  availability: t('متاح للمشاريع المختارة', 'Open for select builds'),
  email: 'hello@omardeek.tech',
  headline: t('أبني مواقع وأدوات وأنظمة تعمل وحدها', 'I build websites, browser tools & self-running systems'),
  lead: t(
    'أصمم واجهات عربية وإنجليزية متوازنة، أشحن تطبيقات Next.js سريعة، وأبني أدوات متصفح مفتوحة وخطوط أتمتة بالذكاء الاصطناعي.',
    'I design native RTL/LTR interfaces, ship fast Next.js software, and build open browser utilities paired with autonomous AI workflows.',
  ),
  manifesto: t('أبدأ بالمشكلة الفعلية، وأترك الأداة مفتوحة للجميع.', 'Start from the real bottleneck, then leave the tool open for everyone.'),
};

export const STATS: StatItem[] = [
  { value: '29', code: 'LAB_TOOLS', label: t('أداة متصفح مجانية', 'free browser tools') },
  { value: '436', code: 'FONTS_DB', label: t('خط عربي ولاتيني في حرف', 'Arabic & Latin fonts') },
  { value: '480', code: 'SVG_LIB', label: t('زخرفة فيكتور للقص الليزري', '1:1 geometric SVGs') },
  { value: '9', code: 'AI_FLOWS', label: t('خطوط أتمتة تعمل يومياً', 'autonomous AI flows') },
];

export const CAPABILITIES: CapItem[] = [
  {
    no: '01',
    title: t('واجهات ويب ثنائية اللغة', 'Native Bilingual Web UI'),
    short: t('مواقع وتطبيقات Next.js تبدأ من العربية والاتجاهين وتلتزم بأداء 100/100.', 'Fast React/Next.js apps architected from day one for RTL Arabic and LTR parity.'),
    spec: t('تخطيطات منطقية بـ CSS Logical Properties، خطوط عربية محلية، وتجربة خالية من الحشو.', 'Zero-bloat CSS logical properties, self-hosted Arabic type scales, and crisp Core Web Vitals.'),
    tools: ['Next.js 16', 'TypeScript', 'CSS Grid', 'RTL/LTR'],
  },
  {
    no: '02',
    title: t('خطوط الأتمتة بالذكاء الاصطناعي', 'Autonomous AI Pipelines'),
    short: t('ربط النماذج اللغوية وn8n ومراقبي الخلفية لإنجاز المهام المتكررة بدقة.', 'Orchestrating LLMs, n8n workers and webhooks to run daily operations reliably.'),
    spec: t('معالجة أخطاء صريحة، تخزين مؤقت منظم، وتنبيهات فورية دون مراقبة بشرية مستمرة.', 'Explicit retry logic, structured JSON schemas, and deterministic background execution.'),
    tools: ['n8n', 'Agents', 'Webhooks', 'Node.js'],
  },
  {
    no: '03',
    title: t('أدوات المتصفح وأنظمة SVG', 'Local Browser Labs & Vector'),
    short: t('أدوات قص بالليزر، استعراض خطوط، ومنتجات ويب تعمل محلياً بلا تسجيل.', 'Client-side font inspectors, laser-cut generators and instant canvas utilities.'),
    spec: t('معالجة مباشرة على جهاز المستخدم مع تصدير Vector 1:1 بدقة المليمتر.', 'In-browser geometry kernels producing clean 1:1 millimetre-accurate SVG outputs.'),
    tools: ['SVG 1:1', 'Canvas', 'WebAssembly', 'PDF'],
  },
  {
    no: '04',
    title: t('أنظمة التصميم والمنتجات الرقمية', 'Design Systems & SaaS UI'),
    short: t('مكتبات مكونات متماسكة ولوحات تحكم توازن الكثافة والوضوح.', 'Cohesive token architectures and dense SaaS control panels engineered for daily use.'),
    spec: t('متغيرات ألوان محكومة، تباين WCAG AA مضمون، ومكونات قابلة للصيانة السريعة.', 'Audited contrast ratios, documented component variants and clean handoff specs.'),
    tools: ['Tokens', 'Figma', 'React', 'WCAG AA'],
  },
];

export const WORKS: WorkItem[] = [
  {
    id: 'cut-studio', no: '01',
    title: t('Cut Studio · أستوديو القص', 'Cut Studio'),
    cat: 'svg', catLabel: t('تصنيع وليزر', 'Vector & Laser'), year: '2026',
    metric: t('٢٩ أداة متصفح حية', '29 local tools'),
    stack: ['SVG', 'Canvas', 'TypeScript'],
    summary: t('حزمة أدوات متصفح لورش الليزر والتصميم تعمل محلياً بلا حساب: تفريغ الصور، الصناديق المبرمجة، والتعشيق.', '29 zero-signup workshop browser utilities: box generators, bitmap tracing and laser nesting.'),
    img: 252,
  },
  {
    id: 'harf', no: '02',
    title: t('حرف · Harf', 'Harf Font Engine'),
    cat: 'svg', catLabel: t('الخطوط والفيكتور', 'Arabic Type'), year: '2026',
    metric: t('٤٣٦ خطاً عربياً ولاتينياً', '436 fonts indexed'),
    stack: ['OpenType', 'SVG Paths', 'Next.js'],
    summary: t('منصة لاستعراض الخطوط العربية واللاتينية وتحويل النصوص فوراً إلى مسارات SVG جاهزة لبرامج القص.', 'Live dual-script typography previewer with instant glyph-to-SVG path outline conversion.'),
    img: 366,
  },
  {
    id: 'naqsh', no: '03',
    title: t('نقش · Naqsh', 'Naqsh Library'),
    cat: 'svg', catLabel: t('الزخرفة الهندسية', 'Geometric Art'), year: '2025',
    metric: t('٤٨٠ زخرفة هندسية', '480 clean SVGs'),
    stack: ['SVG', 'Procedural', 'UI'],
    summary: t('مكتبة مفتوحة تضم ٤٨٠ نقشاً هندسياً وعربياً بمقاييس نظيفة للاستخدام الفوري في الويب والطباعة.', 'Curated library of 480 geometric rosettes and arabesque ornaments with zero-cleanup vectors.'),
    img: 352,
  },
  {
    id: 'ai-automation', no: '04',
    title: t('خطوط الأتمتة بالذكاء الاصطناعي', 'AI Automation Pipelines'),
    cat: 'ai', catLabel: t('أتمتة ذكية', 'AI Systems'), year: '2026',
    metric: t('٩ أنظمة تعمل يومياً', '9 daily workers'),
    stack: ['n8n', 'LLMs', 'APIs'],
    summary: t('منظومة وكلاء وn8n تجمع المحتوى، تلخّص البيانات، وترسل تقارير منظمة وتحديثات نشر دون تدخل.', 'Autonomous production workflows chaining model reasoning, queues, and scheduled publishing.'),
    img: 60,
  },
  {
    id: 'qalib', no: '05',
    title: t('قالب · Qalib Library', 'Qalib Design System'),
    cat: 'web', catLabel: t('أنظمة التصميم', 'Web Architecture'), year: '2026',
    metric: t('+٣٢٤ تصميماً ثنائي اللغة', '324+ bilingual builds'),
    stack: ['Next.js', 'Tokens', 'Playwright'],
    summary: t('مكتبة تصاميم ثنائية اللغة بالكامل تولّد مراجع بصرية وأوامر بناء دقيقة لمختلف الأنشطة.', 'Comprehensive RTL/LTR web design specimen library with executable visual prompts.'),
    img: 0,
  },
  {
    id: 'shakl', no: '06',
    title: t('شكل · Shakl 3D', 'Shakl 3D Craft'),
    cat: 'svg', catLabel: t('تصميم ثلاثي للخشب', '3D Joinery'), year: '2025',
    metric: t('٣٠٢ نموذج قابل للتعديل', '302 structural models'),
    stack: ['Parametric', 'DXF/SVG', 'WebGL'],
    summary: t('قوالب تركيب خشبية ثلاثية الأبعاد بفتحات محسوبة تلقائياً لسماكات الخشب المختلفة.', 'Parametric 3D interlocking joinery templates adapting slot tolerances automatically.'),
    img: 180,
  },
  {
    id: 'sira', no: '07',
    title: t('سيرة · Sira CV', 'Sira Bilingual CV'),
    cat: 'web', catLabel: t('تطبيقات الويب', 'Web Utility'), year: '2025',
    metric: t('تصدير PDF ثنائي اللغة', 'Instant ATS PDF'),
    stack: ['React', 'Print CSS', 'LocalStorage'],
    summary: t('منشئ سيرة ذاتية سريع بالعربية والإنجليزية يحفظ بياناتك محلياً ويصدر PDF متقن الإخراج.', 'Privacy-first local bilingual CV composer outputting pixel-tight printable PDFs.'),
    img: 526,
  },
];

export const NOTES = [
  {
    quote: t('حرف اختصر ساعات من تنزيل الخطوط وتجربتها على تصاميم العملاء قبل التقطيع.', 'Harf eliminated hours of downloading and trial-cutting fonts for client signage.'),
    name: t('طارق السالم', 'Tareq Al-Salem'),
    role: t('مصمم هوية وخطوط', 'Brand & Type Designer'),
  },
  {
    quote: t('أدوات Cut Studio تعمل فوراً من المتصفح دون تسجيل، وهذا ما تحتاجه الورش كل يوم.', 'Cut Studio runs straight in the browser with zero sign-up — built for actual workshops.'),
    name: t('ليلى منصور', 'Laila Mansour'),
    role: t('صاحبة ورشة تصنيع ليزري', 'Laser Workshop Lead'),
  },
  {
    quote: t('نظام الأتمتة حوّل أسبوع متابعة يدوية إلى خط إنتاج هادئ ومراقَب بالكامل.', 'The automation pipeline turned a full week of repetitive sorting into a monitored stream.'),
    name: t('رامي خليل', 'Rami Khalil'),
    role: t('مؤسس منصة رقمية', 'Digital Platform Founder'),
  },
];

/* Crisp procedural SVGs using theme tokens (`currentColor` + CSS vars) */
export const SVG_NAQSH_ROSETTE = `<svg viewBox="0 0 220 220" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.2">
  <circle cx="110" cy="110" r="96" stroke-dasharray="3 4" opacity=".45"/>
  <circle cx="110" cy="110" r="76" stroke="var(--accent)" stroke-width="1.4"/>
  <polygon points="110,22 135,85 198,110 135,135 110,198 85,135 22,110 85,85" stroke="currentColor"/>
  <polygon points="48,48 110,72 172,48 148,110 172,172 110,148 48,172 72,110" stroke="var(--accent2, currentColor)" opacity=".8"/>
  <circle cx="110" cy="110" r="24" stroke="var(--accent)" stroke-width="1.6"/>
  <circle cx="110" cy="110" r="6" fill="var(--accent)" stroke="none"/>
</svg>`;

export const SVG_NAQSH_LATTICE = `<svg viewBox="0 0 220 220" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="1.2">
  <rect x="20" y="20" width="180" height="180" opacity=".4"/>
  <path d="M110 20 L190 65 L190 155 L110 200 L30 155 L30 65 Z" stroke="var(--accent)" stroke-width="1.5"/>
  <path d="M110 46 L167 78 L167 142 L110 174 L53 142 L53 78 Z" opacity=".7"/>
  <path d="M30 65 L190 155 M190 65 L30 155 M110 20 L110 200" opacity=".45"/>
  <polygon points="110,70 145,110 110,150 75,110" stroke="var(--accent2, var(--accent))" stroke-width="1.4"/>
</svg>`;

export const SVG_NAQSH_TATREEZ = `<svg viewBox="0 0 220 220" width="100%" height="100%" fill="none">
  <g stroke="currentColor" stroke-width="1" opacity=".3"><line x1="20" y1="110" x2="200" y2="110"/><line x1="110" y1="20" x2="110" y2="200"/></g>
  <g fill="var(--accent)">
    <rect x="104" y="40" width="12" height="12"/><rect x="92" y="52" width="12" height="12"/><rect x="116" y="52" width="12" height="12"/>
    <rect x="80" y="64" width="12" height="12"/><rect x="128" y="64" width="12" height="12"/>
    <rect x="68" y="76" width="12" height="12"/><rect x="140" y="76" width="12" height="12"/>
    <rect x="56" y="88" width="12" height="12"/><rect x="152" y="88" width="12" height="12"/>
    <rect x="68" y="100" width="12" height="12"/><rect x="140" y="100" width="12" height="12"/>
    <rect x="80" y="112" width="12" height="12"/><rect x="128" y="112" width="12" height="12"/>
    <rect x="92" y="124" width="12" height="12"/><rect x="116" y="124" width="12" height="12"/>
    <rect x="104" y="136" width="12" height="12"/>
  </g>
  <g fill="currentColor" opacity=".8">
    <rect x="104" y="82" width="12" height="12"/><rect x="92" y="94" width="12" height="12"/>
    <rect x="116" y="94" width="12" height="12"/><rect x="104" y="106" width="12" height="12"/>
  </g>
</svg>`;

export const SVG_PIPELINE_NODE_MAP = `<svg viewBox="0 0 420 110" width="100%" height="100%" fill="none">
  <path class="pipe-wire" d="M62 55 H150 M205 55 H295 M345 55 H370" stroke="var(--accent)" stroke-width="2" stroke-dasharray="5 5"/>
  <rect x="14" y="34" width="54" height="42" rx="8" fill="var(--bg)" stroke="var(--line)" stroke-width="1.5"/>
  <text x="41" y="59" text-anchor="middle" fill="var(--ink)" font-size="11" font-family="monospace">CRON</text>
  <rect x="140" y="28" width="74" height="54" rx="10" fill="var(--bg)" stroke="var(--accent)" stroke-width="1.8"/>
  <text x="177" y="52" text-anchor="middle" fill="var(--accent)" font-size="11" font-weight="700" font-family="monospace">AI AGENT</text>
  <text x="177" y="67" text-anchor="middle" fill="var(--muted)" font-size="9" font-family="monospace">n8n.run()</text>
  <rect x="284" y="34" width="66" height="42" rx="8" fill="var(--bg)" stroke="var(--accent2, var(--line))" stroke-width="1.5"/>
  <text x="317" y="59" text-anchor="middle" fill="var(--ink)" font-size="11" font-family="monospace">WEBHOOK</text>
  <circle cx="386" cy="55" r="16" fill="var(--accent)" opacity=".18"/>
  <circle cx="386" cy="55" r="7" fill="var(--accent)"/>
</svg>`;

export const SVG_CAD_SCHEMATIC = `<svg viewBox="0 0 640 340" width="100%" height="100%" fill="none">
  <g class="cad-layer-grid" stroke="currentColor" stroke-width=".6" opacity=".18">
    <line x1="40" y1="20" x2="40" y2="320"/><line x1="160" y1="20" x2="160" y2="320"/><line x1="320" y1="20" x2="320" y2="320"/>
    <line x1="480" y1="20" x2="480" y2="320"/><line x1="600" y1="20" x2="600" y2="320"/>
    <line x1="20" y1="60" x2="620" y2="60"/><line x1="20" y1="170" x2="620" y2="170"/><line x1="20" y1="280" x2="620" y2="280"/>
  </g>
  <g class="cad-layer-vectors" stroke="var(--accent2, currentColor)" stroke-width="1.3">
    <rect x="44" y="66" width="136" height="92" rx="3"/><line x1="44" y1="90" x2="180" y2="90"/>
    <rect x="248" y="48" width="150" height="128" rx="3" stroke="var(--accent)" stroke-width="1.6"/>
    <circle cx="323" cy="122" r="32" stroke-dasharray="4 3"/>
    <rect x="462" y="66" width="136" height="92" rx="3"/><line x1="462" y1="90" x2="598" y2="90"/>
    <rect x="248" y="216" width="350" height="72" rx="3"/>
    <text x="112" y="82" text-anchor="middle" fill="var(--ink)" font-size="10" font-family="monospace">01.UI / NEXT.JS</text>
    <text x="112" y="124" text-anchor="middle" fill="var(--muted)" font-size="9" font-family="monospace">RTL + LTR PARITY</text>
    <text x="323" y="72" text-anchor="middle" fill="var(--accent)" font-size="10" font-weight="700" font-family="monospace">02.AI CORE BUS</text>
    <text x="530" y="82" text-anchor="middle" fill="var(--ink)" font-size="10" font-family="monospace">03.SVG / HARF</text>
    <text x="530" y="124" text-anchor="middle" fill="var(--muted)" font-size="9" font-family="monospace">1:1 VECTOR PATHS</text>
    <text x="423" y="256" text-anchor="middle" fill="var(--ink)" font-size="10" font-family="monospace">04.EXECUTION ENGINE // 29 TOOLS · 9 DAILY WORKERS</text>
  </g>
  <g class="cad-layer-bus" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="6 4">
    <path d="M180 112 H248"/><path d="M398 112 H462"/><path d="M323 176 V216"/><path d="M530 158 V216"/>
    <circle cx="214" cy="112" r="3.5" fill="var(--accent)"/><circle cx="430" cy="112" r="3.5" fill="var(--accent)"/>
  </g>
  <g class="cad-layer-dims" stroke="currentColor" stroke-width=".9" opacity=".7">
    <path d="M44 36 H598 M44 30 V42 M598 30 V42"/>
    <text x="320" y="30" text-anchor="middle" fill="var(--muted)" font-size="9" font-family="monospace">SPAN: 1280.0 MM // SCALE 1:1</text>
  </g>
</svg>`;
