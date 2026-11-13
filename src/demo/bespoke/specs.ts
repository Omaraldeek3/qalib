import type { L } from '@/catalog/types';
import type { OutlineItem } from '@/prompt/data';

const t = (ar: string, en: string): L => ({ ar, en });

export type BespokeKey =
  | 'monolith-split'
  | 'bento-studio'
  | 'swiss-broadsheet'
  | 'index-stage'
  | 'terminal-workbench'
  | 'cad-blueprint'
  | 'spatial-chapters'
  | 'noir-cinema'
  | 'kinetic-marquee'
  | 'aurora-prism'
  | 'solar-horizon'
  | 'kufic-arch'
  | 'tactile-binder'
  | 'paper-atelier'
  | 'exposed-spec';

export type BespokeMeta = {
  demoType: L;
  outline: OutlineItem[];
};

const item = (kind: string, label: L, desc: L, title?: L): OutlineItem => ({
  kind, label, ...(title ? { title } : {}), desc,
});

export const BESPOKE_SPECS: Record<BespokeKey, BespokeMeta> = {
  'monolith-split': {
    demoType: t('بورتفوليو بتقسيم عمودي ثابت ومحتوى متدفق', 'Split-viewport fixed-rail portfolio'),
    outline: [
      item('bespoke-rail', t('العمود الثابت (٤٠٪)', 'Pinned identity rail (40%)'),
        t('شريط جانبي مثبت بالارتفاع الكامل (sticky 100vh) يحمل الشعار، حالة التوفر المباشرة، فهرس الفصول المرقّم بتتبع التمرير، وزر نسخ البريد الفوري.', 'Full-height sticky spine rail with monogram, live availability pulse, numbered scroll-spy chapters and instant copy-email action.')),
      item('bespoke-stream', t('مسار القدرات والأكورديون (٦٠٪)', 'Scrolling thesis & capability ledger'),
        t('عنوان معماري عريض في العمود الثاني تتبعه شبكة قدرات (٢×٢) تفتح تفاصيل التقنية عند النقر وشريط أرقام.', 'Wide architectural thesis statement followed by an expandable 2x2 capability deck and metric ledger.')),
      item('bespoke-works', t('سجل الأعمال المباشر', 'Interactive project ledger'),
        t('قائمة أعمال مرقّمة بشارات التخصص والتقنيات، مع معاينة بصرية مدمجة.', 'Numbered project dossier cards with discipline tags, metrics and visual previews.')),
      item('bespoke-contact', t('ملخص تواصل مدمج', 'Integrated brief composer'),
        t('صندوق تواصل سريع مدمج بنهاية المسار المتدفق.', 'Compact direct inquiry composer closing the scrolling pane.')),
    ],
  },
  'bento-studio': {
    demoType: t('بورتفوليو بمقصورة بينتو تفاعلية ورصيف عائم', 'Interactive Bento Cockpit portfolio'),
    outline: [
      item('bespoke-dock', t('رصيف تنقل سفلي عائم', 'Floating bottom pill dock'),
        t('إزالة الشريط العلوي تماماً والاستعاضة عنه برصيف كبسولي مثبت أسفل الشاشة للانتقال الفوري.', 'Top header omitted in favour of a fixed frosted bottom dock linking directly to modules.')),
      item('bespoke-cockpit', t('شبكة بينتو من ١٢ عموداً في الشاشة الأولى', 'Above-the-fold 12-col architectural bento'),
        t('شاشة افتتاحية مقسمة إلى خلايا متفاوتة: بطاقة تعريف، محوّل معاينة حية للمشاريع (Harf/Naqsh/Cut Studio)، مخطط عقد أتمتة SVG متحرك، ومربعات أرقام.', 'Viewport opens straight into asymmetric bento modules: identity plate, interactive 3-tool preview canvas, live SVG automation node graph, and KPI blocks.')),
      item('bespoke-cases', t('دراسات حالة مختارة ونموذج سريع', 'Selected case plates & instant contact'),
        t('صف ثانٍ من دراسات الحالة المصوّرة يختتم ببطاقة تواصل ثنائية العمود.', 'Editorial photo case cards followed by a crisp bilingual direct contact module.')),
    ],
  },
  'swiss-broadsheet': {
    demoType: t('بورتفوليو بهيكل صحيفة سويسرية ذات أعمدة وقواعد فصل عمودية', 'Swiss multi-column newspaper broadsheet portfolio'),
    outline: [
      item('bespoke-masthead', t('ترويسة الصحيفة السويسرية', 'Double-ruled typographic masthead'),
        t('شريط إصدار ورقم عدد في الأعلى يفصله خطان متوازيان (سميك ورفيع) واسم الاستوديو بخط مذيّل عريض.', 'Double thick/thin hairline masthead with issue metadata boxes, edition date and oversized Didone nameplate.')),
      item('bespoke-columns', t('تقسيم ٣ أعمدة غير متماثلة بفواصل عمودية كاملة', 'Asymmetric 3-column front page with vertical rules'),
        t('عمود اقتباس جانبي ضيق، عمود رئيسي بحرف استهلالي كبير (Drop Cap) ولوحة صورة عرضية مقصوصة، وعمود أخبار المختبر القابل للتصفية.', 'Narrow manifesto margin bay, central 2-column drop-cap lead with halftone image plate, and filterable dispatches index.')),
      item('bespoke-archive', t('جدول الفهرس الصحفي والتواصل', 'Broadsheet classified index & contact colophon'),
        t('جدول أعمال مرقم بأعمدة صحفية يتبعه تذييل بيانات اتصال مصاغ كبيان طباعة.', 'Ruled multi-column archive table concluding in a colophon contact strip.')),
    ],
  },
  'index-stage': {
    demoType: t('بورتفوليو بفهرس مسرحي تفاعلي صامت', 'Gallery minimalist interactive hover-stage index'),
    outline: [
      item('bespoke-header', t('شريط إحداثيات صامت أعلى الصفحة', 'Hairline metadata top bar'),
        t('سطر رفيع واحد يحمل الاسم، الإحداثيات الجغرافية، وحالة التوفر بلا أزرار ملونة.', 'Single clean strip carrying name, studio coordinates and quiet availability notice.')),
      item('bespoke-stage', t('فهرس تفاعلي ثنائي (قائمة ٦٠٪ + منصة معاينة ٤٠٪)', '60/40 Split Ledger & Pinned Preview Stage'),
        t('قائمة أعمال مرقّمة بأسطر رفيعة، وبجانبها منصة معاينة ثابتة تتبدل صورتها ومواصفاتها فور التمرير أو النقر على أي صف.', 'Numbered typographic index rows paired beside a sticky stage panel whose image, vector emblem and specs swap live per row.')),
      item('bespoke-footer', t('بيان ومعلومات تواصل موجزة', 'Condensed thesis & direct colophon'),
        t('ثلاثة أعمدة نصية هادئة للتخصص والتواصل دون بطاقات أو ظلال.', 'Quiet 3-column typographic bio and contact strip with zero heavy framing.')),
    ],
  },
  'terminal-workbench': {
    demoType: t('بورتفوليو بواجهة بيئة تطوير وطرفية حية', 'Developer IDE & terminal workbench portfolio'),
    outline: [
      item('bespoke-chrome', t('شريط نافذة التطوير', 'IDE workspace window chrome'),
        t('شريط علوي بأيقونة الفرع البرمجي ومسار الملف المفتوح.', 'Top editor bar showing repository branch, active file path and language state.')),
      item('bespoke-tree', t('مستكشف ملفات تفاعلي (يسار/يمين حسب اللغة)', 'Interactive file explorer sidebar'),
        t('شجرة ملفات حقيقية (README، أنظمة الأتمتة، محرك حرف، المهارات، تواصل) تفتح محتواها في المحرر الوسطي.', 'Clickable project file tree (README.md, pipelines/n8n.ts, lab/harf.ts, stack.json, contact.sh) switching the central buffer live.')),
      item('bespoke-inspector', t('المحرّر الوسطي ولوحة القياس الجانبية', 'Line-numbered center buffer & telemetry inspector'),
        t('محرر مرقّم الأسطر يعرض مخطط النظام والكود، مع عمود قياسات وأداء حي على الطرف المقابل.', 'Line-numbered code/architecture canvas alongside a telemetry metrics & execution log panel.')),
    ],
  },
  'cad-blueprint': {
    demoType: t('بورتفوليو بمخطط هندسي بمقياس رسم وطبقات تفاعلية', 'Engineering CAD blueprint canvas with toggleable layers'),
    outline: [
      item('bespoke-rulers', t('مساطر إحداثيات وعلامات ضبط الطباعة', 'Millimetre coordinate rulers & crop marks'),
        t('حواف الشاشة مقسمة بتدريجات مسطرة هندسية وعلامات تقاطع + في الزوايا.', 'Edge-calibrated scale ticks, registration crosshairs and architectural blueprint gridlines.')),
      item('bespoke-schematic', t('مخطط معماري تفاعلي مع مفاتيح إظهار الطبقات', 'Interactive layer-toggle SVG architecture diagram'),
        t('رسم هندسي يربط واجهة المستخدم وخطوط الأتمتة وأدوات الليزر، مع أزرار تبديل حية لإظهار وإخفاء الشبكة والعقد والأبعاد.', 'Live wireframe schematic connecting UI, AI buses and laser SVG fabrication with working checkboxes to toggle drawing layers.')),
      item('bespoke-titleblock', t('لوحة المواصفات المعمارية وجدول الأنظمة', 'Engineering title block & specification sheet'),
        t('جدول مواصفات قياسي للمشروع (Scale 1:1) وقائمة أدوات منظمة كجداول رسم.', 'Technical title block plus ruled subsystem index below.')),
    ],
  },
  'spatial-chapters': {
    demoType: t('بورتفوليو كطاولة استوديو بطبقات متداخلة ولوحة تفاصيل', 'Layered studio-table composition with case drawer'),
    outline: [
      item('bespoke-filter', t('لوح تعريف علوي وفلاتر التخصص', 'Floating studio header & discipline filter'),
        t('شريط ترشيح (الكل، الهندسة، الأتمتة، التصميم) يبرز الألواح المطابقة ويخفت الباقي.', 'Discipline filter bar dimming non-matching plates while highlighting active work.')),
      item('bespoke-plates', t('ألواح أعمال متداخلة بأعماق مختلفة', 'Overlapping staggered case plates on dark slate'),
        t('بطاقات بصرية متدرجة بإزاحات متعمدة وملصقات زوايا؛ النقر على أي لوح يفتح درج تفاصيل المشروع.', 'Staggered asymmetric overlapping prints with corner index tabs that open an in-page case study inspection modal.')),
      item('bespoke-notes', t('مقتطفات فلسفة العمل والتواصل', 'Working manifesto & quick inquiry strip'),
        t('صف مبادئ موجز يليه رابط حجز جلسة عمل.', 'Concise working principles strip closing into project initiation.')),
    ],
  },
  'noir-cinema': {
    demoType: t('بورتفوليو سينمائي عريض مع شريط أفلام ومبدّل فصول حي', 'Widescreen cinema spotlight portfolio with live reel switcher'),
    outline: [
      item('bespoke-letterbox', t('إطار عرض سينمائي بإحداثيات المشهد', 'Letterbox frame & director top bar'),
        t('رأس سينمائي رفيع (المشهد ٠١ / ٠٥) مع حواف فاصلة فاخرة وخط مذيّل عريض.', 'Thin director frame header with chapter telemetry and high-contrast Didone headlines.')),
      item('bespoke-spotlight', t('المسرح البصري المتبدل', 'Interactive widescreen hero stage'),
        t('صورة درامية مقصوصة بتدرج جانبي وعنوان ذهبي متقاطع تتغير محتوياتهما فور اختيار أي فصل.', 'High-contrast portrait plate intersecting editorial serif type that swaps cleanly on chapter click.')),
      item('bespoke-reel', t('شريط الفصول الأفقي التفاعلي', 'Horizontal chapter filmstrip selector'),
        t('خمس بطاقات أفلام مرقّمة أسفل الواجهة تتحكم بالمشهد الرئيسي، يليها سجل الأعمال والتواصل.', 'Interactive 5-frame filmstrip controlling the spotlight hero, plus archival bio and contact studio strip.')),
    ],
  },
  'kinetic-marquee': {
    demoType: t('بورتفوليو كملصق طباعي حركي بملفات تقنية قابلة للطي', 'Kinetic typographic poster wall with accordion dossiers'),
    outline: [
      item('bespoke-poster', t('جدار عنوان عملاق وشريط مائل متحرك', 'Full-bleed poster headline & tilted ticker ribbon'),
        t('عنوان طباعي يمتد على عرض الشاشة يقطعه شريط إعلاني مائل متحرك يختصر الأرقام.', 'Edge-to-edge display typography intersected by an angled running ticker strip.')),
      item('bespoke-pillars', t('أعمدة الملصق الثلاثة', '3-column numbered poster pillars'),
        t('ثلاث كتل هندسية بأرقام عملاقة (01، 02، 03) تشرح طبقات العمل بلا صور حشو.', 'Three sharp structural bays anchored by giant tabular indices.')),
      item('bespoke-dossiers', t('ملفات مشاريع بأكورديون تقني', 'Expandable technical project dossiers'),
        t('صفوف مرقمة تتوسع بالنقر لعرض معمارية النظام، التقنيات والأثر.', 'Interactive `[+]` project rows expanding to reveal stack and delivery specs.')),
    ],
  },
  'aurora-prism': {
    demoType: t('بورتفوليو زجاجي مكاني مع محاكي أوضاع حي', 'Spatial frosted glass canvas with interactive 3-mode simulator'),
    outline: [
      item('bespoke-pill', t('شريط تنقل طافٍ في المنتصف', 'Centered frosted floating navigation pill'),
        t('قائمة كبسولية شفافة تطفو أعلى المسرح الزجاجي.', 'Translucent centered navigation capsule detached above the main canvas.')),
      item('bespoke-prism', t('منشور زجاجي يضم محاكياً تفاعلياً بثلاثة أوضاع', 'Iridescent glass prism frame with live 3-tab simulator'),
        t('نافذة زجاجية مركزية بحدود مضيئة تتبدل بين ثلاث معاينات تفاعلية حية (واجهة الويب، خط الأتمتة، محرك SVG).', 'Hero glass workbench switching live between interactive Web UI, AI Node Pipeline, and SVG Fabricator previews.')),
      item('bespoke-tiles', t('ألواح قدرات شفافة وتواصل مباشر', 'Spatial feature tiles & translucent inquiry card'),
        t('شبكة ألواح ضبابية للمختبر والأرقام تختتم بنموذج تواصل زجاجي.', 'Balanced spatial cards with luminance borders and direct brief card.')),
    ],
  },
  'solar-horizon': {
    demoType: t('بورتفوليو إشراقي غير متماثل مع مقدّر نطاق المشروع الحي', 'Asymmetric warm editorial with live project scope configurator'),
    outline: [
      item('bespoke-sidebar', t('شريط جانبي دافئ للتعريف والتخصصات', 'Asymmetric 28% editorial masthead column'),
        t('عمود بداية ضيق يثبت الهوية، الشعار الدائري، ووسوم التقنية على خلفية رملية بإضاءة هادئة.', 'Narrow start masthead anchoring identity, availability pill and craft domains.')),
      item('bespoke-stagger', t('لوحة صور غير متوازنة ومقدّر نطاق المشروع التفاعلي', 'Staggered twin photo plates & live scope builder'),
        t('عمودان متفاوتا الارتفاع يجمعهما مقدّر تفاعلي يختار العميل فيه نوع البناء (موقع، أتمتة، أداة) ليظهر الجدول والمخرجات.', 'Offset photography plates leading into a working interactive scope configurator that calculates deliverables and timeframe.')),
      item('bespoke-tools', t('رف المختبر المفتوح والتواصل', 'Open lab shelf & closing invite'),
        t('قائمة أدوات المختبر بتفاصيل واضحة وختام تواصلي دافئ.', 'Curated open-source tool cards and atmospheric inquiry invitation.')),
    ],
  },
  'kufic-arch': {
    demoType: t('بورتفوليو معماري عربي معاصر بقوس هندسي ومتصفح زخارف SVG', 'Contemporary Levantine monograph with pointed arch & vector explorer'),
    outline: [
      item('bespoke-portal', t('بوابة القوس المعماري المزدوج الإطار', 'Framed monograph portal with pointed arch viewport'),
        t('إطاران خطيان رفيعان يحيطان ببوابة قوس هندسي في الوسط، محاطاً بعمود عربي وإنجليزي متناظر.', 'Double hairline architectural margin containing a central pointed arch portal flanked by bilingual specimen panels.')),
      item('bespoke-motif', t('متصفح الزخرفة الهندسية التفاعلي (نقش)', 'Interactive Naqsh procedural geometric SVG explorer'),
        t('لوح تفاعلي يبدل بين ٣ أنماط هندسية (نجمة ثمانية، شبكة سداسية، تطريز) كمعاينة حية لـ«نقش» و«شكل».', 'Live SVG pattern switcher cycling between Eight-Point Star, Hex Lattice and Tatreez bands.')),
      item('bespoke-gallery', t('قاعة عرض الأعمال الثلاثية', 'Three-bay gallery catalog plaques'),
        t('ثلاث لوحات عرض تشبه بطاقات المعارض الفنية لتلخيص الويب، الخطوط، والأتمتة.', 'Triptych exhibition plates detailing Web, Arabic Typography, and Automation systems.')),
    ],
  },
  'tactile-binder': {
    demoType: t('بورتفوليو بهيكل لوحة أجهزة صناعية وشاشة OLED حية', 'Industrial hardware instrument panel with interactive channels & LCD'),
    outline: [
      item('bespoke-bezel', t('إطار ألومنيوم صناعي ومسامير زاوية', 'Machined metallic chassis & dark OLED status strip'),
        t('واجهة مقسمة كأداة هندسية بمظهر ملموس وشاشة قياسات رقمية عالية التباين في الأعلى.', 'Anodized bezel framing an interactive OLED diagnostic readout along the top rail.')),
      item('bespoke-channels', t('لوحة مفاتيح قنوات حية (CH-01 .. CH-04)', 'Tactile hardware channel selector grid'),
        t('أربعة مفاتيح قنوات ميكانيكية المظهر (الويب، الأتمتة، حرف، القص بالليزر) تغير قراءة الشاشة ومواصفات النظام فور الضغط.', 'Physical-styled channel toggle keys swapping live LCD specs, signal visualization and action trigger.')),
      item('bespoke-manual', t('كتيب المواصفات وجدول الاتصال الهندسي', 'Hardware spec ledger & rotary comms strip'),
        t('جداول بيانات ومواصفات ككتالوج أجهزة دقيق.', 'Technical specification sheet styled as an equipment reference card.')),
    ],
  },
  'paper-atelier': {
    demoType: t('بورتفوليو على هيئة دفتر أستوديو مفتوح بصفحتين وألسنة تبويب', 'Two-page open studio spread notebook with stitched spine & bookmarks'),
    outline: [
      item('bespoke-spread', t('انتشار الصفحتين وكعب الدفتر المخيّط', 'Central stitched spine splitting opposing studio pages'),
        t('تصميم يحاكي كتاباً مفتوحاً على مكتب: كعب عمودي مخيّط في المنتصف يفصل صفحة التعريف والصورة عن صفحة المحتوى المتبدل.', 'Book spread centered on a visible vertical stitched spine dividing the portrait & bio folio from the interactive directory folio.')),
      item('bespoke-bookmarks', t('ألسنة فهرس جانبية تقلب الصفحات', 'Interactive index bookmark dividers'),
        t('أربعة ألسنة بارزة في حافة الصفحة (٠١ المختبر، ٠٢ الأتمتة، ٠٣ المنهج، ٠٤ تواصل) تبدّل الصفحة المقابلة.', 'Protruding tabbed bookmarks along the page edge flipping the opposite folio contents instantly.')),
      item('bespoke-colophon', t('ملحق الدفتر السفلي', 'Lower folio studio notes & archive strip'),
        t('شريط شهادات وملاحظات من مستخدمي الأدوات مع إغلاق ورقي دافئ.', 'Notes from tool users set like marginalia above a quiet colophon.')),
    ],
  },
  'exposed-spec': {
    demoType: t('بورتفوليو بشبكة جداول مكشوفة بلا هوامش خارجية وفلاتر حية', 'Edge-to-edge zero-margin exposed structural grid & filterable matrix'),
    outline: [
      item('bespoke-topbar', t('خلايا الرأس الممتدة من الحافة للحافة', 'Zero-margin 3-cell structural header grid'),
        t('صف خلايا بعرض ١٠٠٪ متصل بحدود سوداء حادة ١.٥ بكسل بلا أي فراغات خارجية.', 'Full-bleed exposed 1.5px black hairline border cells running edge to edge.')),
      item('bespoke-splitbox', t('كتلة بيان عريضة بجانب صندوق إحصاءات داكن معكوس', 'Wide display manifesto cell + inverted neon status block'),
        t('خلية عنوان ضخم تشغل ثلثي العرض وتقابلها كتلة سوداء تحمل أزرار التصفية المباشرة ومؤشرات الأداء بلون ليموني فاقع.', '2/3 brutalist typography cell paired with an inverted high-contrast dark terminal panel holding live category filters.')),
      item('bespoke-matrix', t('صف الأرقام الرباعي وجدول الأنظمة المرشّح', '4-cell KPI strip & live-filtered systems ledger'),
        t('أربعة أعمدة أرقام متساوية تتبعها صفوف جدولية للأدوات تتصفى لحظياً وتُختتم بخلية تواصل مباشرة.', 'Equal 4-cell KPI strip above a live-filterable project directory table.')),
    ],
  },
};

export function bespokeOutline(key: string): OutlineItem[] {
  return BESPOKE_SPECS[key as BespokeKey]?.outline ?? [];
}

export function bespokeDemoType(key: string): L | undefined {
  return BESPOKE_SPECS[key as BespokeKey]?.demoType;
}
