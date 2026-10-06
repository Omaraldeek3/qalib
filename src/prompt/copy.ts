import type { L } from '@/catalog/types';

// Every sentence the prompt builder can write, in Arabic and English.

const t = (ar: string, en: string): L => ({ ar, en });

export const navText: Record<string, L> = {
  bar: t('شريط ثابت أعلى الصفحة: الشعار في البداية، ثم الروابط، وزر دعوة للإجراء في النهاية؛ يتحول إلى زر قائمة على الجوال.', 'A sticky bar: logo at the start, then the links, and a call-to-action button at the end; it collapses into a menu button on phones.'),
  center: t('الشعار في المنتصف أعلى الصفحة والروابط في سطر تحته كالترويسة، وزر الإجراء في الطرف.', 'The logo centred on top with the links in a row beneath it, like a masthead; the call-to-action sits at the end.'),
  split: t('الروابط في جهة، والشعار في المنتصف تمامًا، وزر الإجراء في الجهة الأخرى.', 'Links on one side, the logo in the exact centre, the call-to-action on the other side.'),
  minimal: t('اسم النشاط وروابط نصية صغيرة فقط، بلا زر.', 'Just the name and a few small text links; no button.'),
  pill: t('قائمة طافية على شكل حبة بخلفية ضبابية، منفصلة عن أعلى الصفحة.', 'A floating rounded "pill" menu with a frosted background, detached from the top edge.'),
};

export const heroText: Record<string, L> = {
  split: t('عمودان: العنوان والنص التمهيدي وزران في جهة، وصورة طولية في الجهة الأخرى.', 'Two columns: headline, lead text and two buttons on one side; a tall photo on the other.'),
  centered: t('عنوان ونص في المنتصف مع الأزرار، تليها صورة عريضة بانورامية.', 'A centred headline and lead with the buttons, followed by a wide panoramic photo.'),
  fullbleed: t('صورة تملأ الشاشة عليها تدرج داكن، والعنوان والأزرار فوقها باللون الأبيض.', 'A full-screen photo under a dark gradient; the headline and buttons sit on top in white.'),
  type: t('الخط أولًا: عنوان ضخم بعرض الصفحة، نص قصير وأزرار، ثم صورة عريضة أسفلها.', 'Typography first: a giant headline across the page, a short lead and buttons, then a wide photo below.'),
  collage: t('النص في جهة، وتركيب من ثلاث صور متداخلة في الجهة الأخرى.', 'Text on one side; a collage of three overlapping photos on the other.'),
  framed: t('العنوان والنص والأزرار في المنتصف داخل إطار زخرفي، وتحته صورة عريضة.', 'Headline, lead and buttons centred inside a decorative frame, with a wide photo underneath.'),
  editorial: t('كغلاف مجلة: عنوان ضخم فوق خط فاصل، ثم ثلاثة أعمدة: النص التمهيدي، صورة، وملاحظات جانبية.', 'Like a magazine cover: a huge headline over a rule, then three columns: the lead, a photo and side notes.'),
  device: t('النص في جهة، وهاتفان يعرضان شاشة التطبيق في الجهة الأخرى.', 'Text on one side; two phone mockups showing the app screen on the other.'),
  poster: t('تكوين كالملصق: عنوان كبير جدًا يتداخل مع صورة كبيرة.', 'A poster composition: a very large headline overlapping a big photo.'),
  arch: t('النص في جهة، وصورة طولية مقصوصة على شكل قوس في الجهة الأخرى.', 'Text on one side; a tall photo cut into an arch on the other.'),
  zoom: t('واجهة مثبتة: العنوان والتمهيد في الأعلى، وتحتهما صورة في بطاقة مستديرة تكبر مع التمرير حتى تملأ الشاشة، ثم تظهر عليها الدعوة والأزرار.', 'A pinned hero: headline and lead at the top, a photo below in a rounded card that grows with the scroll to fill the screen, then the offer and buttons appear on it.'),
  curtain: t('واجهة مثبتة: لوحان بلون التمييز يحملان اسم النشاط يغطيان الشاشة وينفتحان كبابين مع التمرير على صورة كاملة فيها العنوان والأزرار.', 'A pinned hero: two accent-coloured panels bearing the brand name cover the screen and open like doors with the scroll onto a full photo with the headline and buttons.'),
  layers: t('عنوان كبير في المنتصف مع النص والأزرار، وحوله خمس صور ونقطتان تطفو على أعماق مختلفة وتتبع المؤشر.', 'A big centred headline with lead and buttons, surrounded by five photos and two dots floating at different depths that follow the pointer.'),
  spotlight: t('واجهة معتمة بملء الشاشة: صورة بالأبيض والأسود وعنوان مفرّغ، والمؤشر يحمل دائرة ضوء تكشف الصورة الملونة والعنوان المملوء تحتها.', 'A dark full-screen hero: a grayscale photo and an outlined headline; the pointer carries a circle of light that reveals the colour photo and the filled headline underneath.'),
  trail: t('عنوان ضخم في المنتصف على خلفية فاتحة جدًا، وحركة المؤشر تُسقط خلفها صورًا تظهر ثم تتلاشى.', 'A huge centred headline on a very light background; moving the pointer drops photos behind it that pop in and fade.'),
  tilt: t('النص في جهة، وفي الأخرى هاتف أو بطاقة صورة تميل نحو المؤشر مع لمعة متحركة وبطاقتين صغيرتين عائمتين.', 'Text on one side; on the other a phone or photo card that leans toward the pointer, with a moving glare and two small floating chips.'),
};

/** How each interaction works, precisely enough to rebuild it. */
export const interactionText: Record<string, L> = {
  zoom: t(
    'التكبير: اجعل الواجهة قسمًا طويلًا (نحو 260vh) فيه مسرح ثابت (sticky) بارتفاع 100svh. التقدّم p صفر عند أعلى القسم وواحد حين تصل نهايته إلى أسفل الشاشة. الصورة تملأ المسرح لكنها مقصوصة بـ `clip-path: inset()`، فتبدأ بطاقةً مستديرة الزوايا تحت العنوان مباشرة وتنفتح حتى تملأ الشاشة كلما اقتربت p من الواحد (الهوامش ونصف قطر الزوايا مضروبة في `1 − p`)، والصورة في داخلها تصغر من 1.18 إلى 1. العنوان يصعد ويختفي عند p ≈ 0.4، ثم تظهر الدعوة (سطر العرض والأزرار) فوق الصورة بعد p ≈ 0.6 مع تدرّج داكن للوضوح، وتلميح «مرّر للأسفل» صغير يختفي حين يبدأ التمرير.',
    'Zoom: make the hero a tall section (about 260vh) holding a sticky stage of 100svh. Progress p is 0 at the top of the section and 1 when its end reaches the bottom of the screen. The photo fills the stage but is clipped with `clip-path: inset()`: it starts as a rounded card just below the headline and opens to the full screen as p nears 1 (the insets and corner radius multiplied by `1 − p`), while the image inside scales from 1.18 to 1. The headline moves up and fades out by p ≈ 0.4; the call to action (the offer line and buttons) fades in over the photo after p ≈ 0.6 on a dark gradient for legibility. A small "scroll down" hint fades as soon as scrolling starts.',
  ),
  curtain: t(
    'الستارة: قسم طويل (نحو 240vh) فيه مسرح ثابت. في الخلف الصورة بملء الشاشة مع العنوان والنص والأزرار، وفي الأمام لوحان، كلٌّ بنصف العرض، بلون التمييز (أحدهما أغمق قليلًا)، يحملان اسم النشاط مقسومًا عليهما بخط عرض ضخم، ومقبض دائري صغير قرب حافة الالتقاء. حين تنتقل p من 0.06 إلى 0.66 ينزلق اللوحان إلى جانبيهما (`translateX` حتى ±101%)، وتصغر الصورة من 1.16 إلى 1، ويصعد النص ويظهر. أخفِ اللوحين بعد p = 0.7.',
    'Curtain: a tall section (about 240vh) with a sticky stage. Behind, the full-screen photo with the headline, lead and buttons; in front, two panels, each half the width, in the accent colour (one slightly darker), carrying the brand name split across them in huge display type, with a small round knob near the meeting edge. As p goes from 0.06 to 0.66 the panels slide out to their sides (`translateX` up to ±101%), the photo eases from scale 1.16 to 1, and the text rises and fades in. Hide the panels after p = 0.7.',
  ),
  layers: t(
    'الطبقات: تتبّع المؤشر فوق الواجهة كقيمتين من −1 إلى 1 تقتربان من الهدف بتدرّج في كل إطار (lerp نحو 0.07)، وحرّك كل صورة ونقطة بمقدار القيمة × عمقها بالبكسل (من −42 إلى 92) مع ميل ثابت خفيف لكل بطاقة. أبقِ النص فوق الطبقات والبطاقات بعيدة عنه، واعرض على الهاتف أربع بطاقات أصغر.',
    'Layers: track the pointer over the hero as two values from −1 to 1, eased toward the target each frame (lerp about 0.07), and move each photo and dot by value × its depth in pixels (from −42 to 92), each card keeping a slight fixed rotation. Keep the text above the layers and the cards clear of it; on phones show four smaller cards.',
  ),
  spotlight: t(
    'الكشّاف: نسختان متطابقتان من الواجهة فوق بعضهما تمامًا. السفلى تعرض الصورة بالأبيض والأسود بسطوع نحو 30% والعنوان مفرّغًا، والعليا (`aria-hidden` وبلا روابط) تعرض الصورة بألوانها والعنوان مملوءًا بلون التمييز، مقصوصةً بـ `mask-image: radial-gradient(circle R at x y, #000 40%, transparent 100%)` حيث x وy تتبعان المؤشر بتدرّج (نحو 0.2 في كل إطار) وR نحو 17vw، والضغط يوسّعها إلى نحو 34vw بانتقال ناعم (سجّل نصف القطر بـ `@property`).',
    'Spotlight: two identical copies of the hero stacked exactly. The bottom one shows the photo in grayscale at about 30% brightness and the headline as an outline; the top one (`aria-hidden`, no links) shows the photo in full colour and the headline filled with the accent colour, masked with `mask-image: radial-gradient(circle R at x y, #000 40%, transparent 100%)`, where x and y follow the pointer, eased (about 0.2 per frame), and R is about 17vw; pressing widens it to about 34vw with a transition (register the radius with `@property`).',
  ),
  trail: t(
    'الأثر: كلما قطع المؤشر 85px أسقِط صورة من صور النشاط (طولية، بعرض نحو 15vw) عنده بميل عشوائي ±8°؛ تظهر بتكبير من 0.45 إلى 1 ثم تتلاشى خلال نحو 1.1 ثانية وتُحذف، وبحد أقصى 14 صورة على الشاشة. التمهيد والعنوان والسطر الصغير بالأبيض مع `mix-blend-mode: difference` فوق الصور، فتبقى مقروءة على الخلفية الفاتحة وتنقلب ألوانها فوق الصور (يحتاج القسم `isolation: isolate` وخلفية خاصة به).',
    'Trail: every time the pointer travels 85px, drop one of the business\'s photos (portrait, about 15vw wide) at the pointer with a random tilt of ±8°; it pops in (scale 0.45 to 1), fades out over about 1.1s and is removed, with at most 14 on screen. The eyebrow, headline and lead are white with `mix-blend-mode: difference` above the photos, so they read on the light background and invert over the photos (the hero needs `isolation: isolate` and its own background).',
  ),
  tilt: t(
    'الميل: الهاتف أو بطاقة الصورة داخل منظور (1000px) يميل نحو المؤشر (`rotateY` حتى 16° و`rotateX` حتى 12° بتدرّج) ويستدير بضع درجات أثناء مرور الواجهة في الشاشة، ولمعة بيضاء دائرية تتحرك مع المؤشر على سطحه. وبطاقتان صغيرتان عائمتان (شارة ورقم بارز) في زاويتين متقابلتين تتحركان بعمقين مختلفين.',
    'Tilt: the phone or photo card sits in perspective (1000px), leans toward the pointer (`rotateY` up to 16°, `rotateX` up to 12°, eased) and turns a few degrees as the hero passes through the screen, with a round white glare moving across its surface with the pointer. Two small floating chips (a badge and a key figure) sit at opposite corners and move at different depths.',
  ),
  scrub: t(
    'العبارة: قسم «من نحن» طويل (نحو 220vh) فيه مسرح ثابت يحمل تسمية القسم وعنوانًا صغيرًا والفقرة الأولى بخط العناوين وبحجم كبير جدًا. قسّم الفقرة إلى كلمات، وشفافية كل كلمة `clamp(0.16, p × (عدد الكلمات + 8) − ترتيبها, 1)`، فتُضاء الكلمات واحدة بعد أخرى مع التمرير، وتحتها خط تقدّم رفيع.',
    'Statement: the about section is tall (about 220vh) with a sticky stage holding the section label, a small heading and the first paragraph set very large in the display face. Split the paragraph into words; each word\'s opacity is `clamp(0.16, p × (words + 8) − index, 1)`, so the words light up one after another as you scroll, over a thin progress line.',
  ),
  rail: t(
    'الشريط الأفقي: قسم فيه مسرح ثابت يحمل العنوان وصفًا واحدًا من بطاقات الصور الطولية أعرض من الشاشة. اجعل ارتفاع القسم ارتفاع الشاشة مضافًا إليه ما يفيض من الصف (`100vh × 1.15 + الفائض`)، وحرّك الصف بمقدار `p × الفائض` نحو جهة البداية (إلى اليمين في العربية وإلى اليسار في الإنجليزية) مع خط تقدّم تحته. ومن دون حركة يُمرَّر الصف جانبيًا باليد.',
    'Rail: a section with a sticky stage holding the heading and a single row of tall photo cards wider than the screen. Make the section as tall as the screen plus the row\'s overflow (`100vh × 1.15 + overflow`) and translate the row by `p × overflow` toward the start side (rightward in Arabic, leftward in English), with a progress line below. Without motion the row simply scrolls sideways by hand.',
  ),
};

export const aboutText: Record<string, L> = {
  scrub: t('عبارة واحدة كبيرة جدًا تثبت على الشاشة وتُضاء كلماتها واحدة بعد أخرى مع التمرير.', 'One very large statement held on screen, its words lighting up one after another as you scroll.'),
  split: t('عمودان: عنوان وفقرات واقتباس قصير بتوقيع، وصورة طولية تتداخل مع زاويتها صورة أصغر.', 'Two columns: heading, paragraphs and a short signed quote; a tall photo with a smaller photo overlapping its corner.'),
  quote: t('اقتباس كبير في المنتصف بتوقيع، ثم العنوان والفقرات في عمودين، ثم شريط من صورتين.', 'A large centred quote with a signature, then the heading and paragraphs in two columns, then a strip of two photos.'),
  columns: t('العنوان في جهة والفقرات في عمودين نصيين في الجهة الأخرى، ثم صورة عريضة.', 'The heading on one side, the paragraphs in two text columns on the other, then a wide photo.'),
  overlap: t('صورة عريضة تتداخل مع حافتها السفلية بطاقة نصية.', 'A wide photo with a text card overlapping its lower edge.'),
};

export const itemsText: Record<string, L> = {
  rail: t('صف من بطاقات الصور الطولية ينزلق جانبيًا مع التمرير للأسفل والقسم ثابت في مكانه', 'a row of tall photo cards that slides sideways as you scroll down while the section holds still'),
  cards: t('شبكة بطاقات (صورة أو أيقونة، عنوان، نص قصير، سعر أو ملاحظة)', 'a grid of cards (photo or icon, title, short text, price or note)'),
  list: t('قائمة صفوف مرقّمة: العنوان والنص، والسعر في الطرف', 'a numbered list of rows: title and text, with the price at the end'),
  menu: t('قائمة طعام في مجموعات، وكل صنف بخط منقّط يمتد إلى سعره', 'a menu in groups, each item with a dotted leader running to its price'),
  zigzag: t('صفوف متناوبة من صورة كبيرة ونص، تتبادل الجهات في كل صف', 'alternating rows of a large photo and text, switching sides on every row'),
  gallery: t('شبكة صور بمربع كبير واحد وتسميات على الصور', 'a photo grid with one large tile and captions on the photos'),
  masonry: t('جدار صور بارتفاعات متفاوتة (masonry)', 'a masonry wall of photos with mixed heights'),
  strip: t('شريط أفقي من الصور الطولية يتحرك جانبيًا', 'a horizontal strip of tall photos that scrolls sideways'),
  bento: t('شبكة بينتو: مربع كبير ومربعات أصغر بأحجام مختلفة', 'a bento grid: one big tile and smaller tiles of different sizes'),
  timeline: t('خط زمني عمودي: الأوقات في جهة وخط بنقاط', 'a vertical timeline: times on one side, a line with dots'),
  pricing: t('بطاقات أسعار تبرز فيها الباقة المميزة، مع قائمة مزايا وزر', 'pricing cards with the featured option highlighted, a feature list and a button'),
  steps: t('خطوات مرقّمة في صف بأرقام كبيرة', 'numbered steps in a row with big numbers'),
  table: t('جدول بخطوط: رقم، عنوان، وصف، وسعر أو وقت', 'a ruled table: number, title, description, and price or time'),
};

export const quotesText: Record<string, L> = {
  cards: t('ثلاث بطاقات آراء مع دوائر بالأحرف الأولى', 'three testimonial cards with initials avatars'),
  single: t('رأي واحد كبير في المنتصف يتبدل كل بضع ثوانٍ، مع نقاط للتنقل', 'one large centred testimonial at a time, rotating every few seconds, with dots'),
  wall: t('جدار من بطاقات الآراء في أعمدة', 'a wall of testimonial cards in columns'),
  marquee: t('صف من بطاقات الآراء يتحرك ببطء جانبيًا ويتوقف عند المرور', 'a row of testimonial cards drifting sideways, pausing on hover'),
};

export const contactText: Record<string, L> = {
  split: t('عمودان: عنوان ونص والعنوان والهاتف والبريد بأيقونات، ولوحة بساعات العمل وزر واتساب.', 'Two columns: heading, text and address/phone/email with icons; a panel with opening hours and a WhatsApp button.'),
  center: t('عنوان ونص في المنتصف، زر واتساب كبير، معلومات التواصل في صف، وساعات العمل تحتها.', 'A centred heading and text, a large WhatsApp button, contact details in a row and the hours below.'),
  card: t('بطاقة كبيرة على خلفية ملونة: معلومات التواصل في جهة، وساعات العمل والزر في الأخرى.', 'A large card on a tinted background: contact details on one side, the hours and button on the other.'),
  form: t('معلومات التواصل وساعات العمل في جهة، ونموذج (الاسم، الهاتف، الرسالة) في لوحة بالجهة الأخرى.', 'Contact details and hours on one side; a form (name, phone, message) in a panel on the other.'),
};

export const ctaText: Record<string, L> = {
  band: t('شريط ملون بعرض الصفحة فيه عنوان وسطر وزر', 'a full-width coloured band with a heading, a line of text and a button'),
  big: t('سطر ضخم في المنتصف تحته زر', 'a huge centred line of text with a button under it'),
  image: t('شريط بصورة خلفية تحت طبقة داكنة، نص أبيض وزر', 'a band with a background photo under a dark overlay, white text and a button'),
};

export const footerText: Record<string, L> = {
  simple: t('سطر واحد: الشعار والوصف، أيقونات التواصل، حقوق النشر', 'a single row: logo and tagline, social icons, copyright'),
  columns: t('أربعة أعمدة (الشعار والوصف، روابط الصفحة، التواصل، المتابعة) وشريط سفلي', 'four columns (brand and tagline, page links, contact, social) and a bottom bar'),
  big: t('اسم النشاط بخط ضخم يملأ عرض التذييل فوق الأعمدة', 'the business name set huge across the footer, above the columns'),
};

export const statsText: Record<string, L> = {
  row: t('صف من أربعة أرقام مع تسمياتها', 'a row of four numbers with labels'),
  big: t('أربعة أرقام كبيرة جدًا تعدّ تصاعديًا عند ظهورها', 'four very large numbers that count up as they scroll into view'),
};

export const kindLabel: Record<string, L> = {
  nav: t('الترويسة', 'Header'),
  hero: t('الواجهة', 'Hero'),
  marquee: t('شريط نصي متحرك', 'Running text band'),
  about: t('من نحن', 'About'),
  offer: t('العرض الرئيسي', 'Main offering'),
  gallery: t('معرض الصور', 'Gallery'),
  pricing: t('الأسعار', 'Pricing'),
  process: t('خطوات العمل', 'Process'),
  schedule: t('الجدول', 'Schedule'),
  extra: t('قسم إضافي', 'Extra section'),
  stats: t('أرقام', 'Figures'),
  logos: t('شعارات', 'Logos'),
  testimonials: t('آراء العملاء', 'Testimonials'),
  faq: t('أسئلة شائعة', 'FAQ'),
  cta: t('دعوة للإجراء', 'Call to action'),
  contact: t('التواصل', 'Contact'),
  footer: t('التذييل', 'Footer'),
};

// ---- App interfaces (the workbench style) ----

export const appKindLabel: Record<string, L> = {
  'app-nav': t('التنقل', 'Navigation'),
  'app-head': t('رأس مساحة العمل', 'Workspace header'),
  'app-panel': t('لوحة الإعدادات', 'Settings panel'),
  'app-view': t('مساحة العمل', 'Workspace'),
  'app-stats': t('الأرقام', 'Figures'),
  'app-status': t('شريط الحالة', 'Status bar'),
};

export const appNavText: Record<string, L> = {
  sidebar: t('شريط جانبي ثابت بعرض 248px: الشعار واسم الأداة، حقل بحث، ثم الأدوات في مجموعات بعناوين صغيرة، لكل أداة أيقونة وشارة عدد عند الحاجة، والعنصر النشط بخلفية بلون التمييز الخافت وخط على حافته.', 'A fixed 248px sidebar: logo and tool name, a search field, then the tools in groups with small headings, each with an icon and a count badge where needed; the active item has a faint accent background and a bar on its edge.'),
  rail: t('شريط أيقونات ضيق بعرض 68px: أيقونة لكل أداة بتلميح يظهر عند المرور، وشارة عدد صغيرة، وصورة المستخدم في الأسفل؛ يترك المساحة كلها لمساحة العمل.', 'A narrow 68px icon rail: one icon per tool with a tooltip on hover, a small count badge and the user\'s avatar at the bottom; it leaves the whole screen to the workspace.'),
  topbar: t('شريط علوي ثابت: الشعار، ثم الأدوات كتبويبات أفقية بخط سفلي للنشط، ثم البحث وصورة المستخدم.', 'A sticky top bar: logo, then the tools as horizontal tabs underlined when active, then search and the user\'s avatar.'),
};

export const appPanelText: Record<string, L> = {
  start: t('لوحة إعدادات بعرض 300px في بداية السطر، ثابتة أثناء التمرير، مقسمة إلى أقسام مرقمة فيها حقول بوحدات ومفاتيح تبديل وأشرطة تمرير ومحددات مقطعية.', 'A 300px settings panel at the start edge, sticky while scrolling, in numbered sections of fields with units, switches, sliders and segmented controls.'),
  end: t('لوحة تفاصيل بعرض 300px في نهاية السطر تعرض العنصر المحدد في مساحة العمل وتعدّله، ثابتة أثناء التمرير.', 'A 300px details panel at the end edge that shows and edits whatever is selected in the workspace; sticky while scrolling.'),
};

export const appViewText: Record<string, L> = {
  canvas: t('لوح عمل بخلفية محايدة عليه ورقة بيضاء بظل، وعليها رسم القص بخطوط حمراء رفيعة والحفر بالأزرق، وتحتها المقاسات بالملليمتر.', 'A neutral board holding a white sheet with a shadow, the cutting drawing on it in thin red lines and engraving in blue, with the size in millimetres beneath.'),
  plan: t('مخطط معماري بخطوط بيضاء على شبكة، الغرف بأسمائها ومساحاتها، وخط أبعاد بخط ثابت العرض.', 'An architectural plan in white lines on a grid, rooms with their names and areas, and a dimension line in a monospaced face.'),
  kanban: t('لوحة أعمدة (جديد، قيد العمل، مراجعة، منجز) بعدّاد لكل عمود وبطاقات فيها عنوان وسطر وصف ووسم ملون وأحرف المسؤول.', 'A board of columns (new, doing, review, done) with a count per column and cards holding a title, a line of detail, a coloured tag and the owner\'s initials.'),
  table: t('جدول بيانات بخلفية بيضاء: رؤوس رمادية صغيرة، أسطر بفواصل رفيعة، أرقام بعرض ثابت، ووسم حالة ملون في آخر عمود، والسطر المحدد بلون التمييز الخافت.', 'A data table on white: small grey headers, hairline rows, tabular numbers and a coloured status tag in the last column; the selected row in a faint accent.'),
  week: t('تقويم أسبوعي: أعمدة للأيام وأسطر للساعات، والمواعيد كتل ملونة بحسب الشخص بخط ملون على حافتها.', 'A week calendar: days as columns, hours as rows, and appointments as blocks coloured by person with a coloured bar on their edge.'),
  timeline: t('لوحة زمنية: سطر لكل مورد (غرفة أو قاعة) وأعمدة للوقت، والحجوزات أشرطة ملونة بأسمائها تمتد على مدتها.', 'A timeline: one row per resource (room or hall), time across the top, and bookings as named coloured bars spanning their length.'),
  grid: t('شبكة بطاقات بصور طولية، وعليها وسم صغير، وتحتها الاسم والكمية والسعر.', 'A grid of cards with tall photos, a small tag on top, and the name, quantity and price below.'),
  dashboard: t('لوحة قياس: رسم بياني خطي لسنتين بمساحة ملونة تحت الخط الحالي وخط متقطع للسابق، وبجانبه قائمة بنسب وأشرطة.', 'A dashboard: a two-year line chart with a filled area under the current line and a dashed line for the previous one, beside a list of shares with bars.'),
  gallery: t('شبكة صور متساوية بنجوم تقييم وأعلام اختيار أو رفض، والصور المرفوضة باهتة بالأبيض والأسود.', 'An even grid of photos with star ratings and pick or reject flags; rejected photos are faded to greyscale.'),
  document: t('محرر مستند بعرض قراءة مريح: كتل (عنوان، فقرة، صورة، قائمة، سؤال اختبار) لكل منها مقبض سحب يظهر عند المرور، وزر «أضف كتلة».', 'A document editor at a comfortable measure: blocks (heading, paragraph, image, list, quiz question), each with a drag handle on hover, and an "add a block" button.'),
};

export const appKindText: Record<string, L> = {
  'app-head': t('مسار تنقل صغير، عنوان الصفحة وسطر وصف، أزرار الإجراء في الطرف (زر واحد فقط بلون التمييز)، وتبويبات مقطعية تحتها.', 'A small breadcrumb, the page title with a line of description, action buttons at the end (only one in the accent colour), and segmented tabs beneath.'),
  'app-stats': t('أربعة مربعات أرقام بعرض متساوٍ: تسمية صغيرة رمادية ورقم كبير بأرقام ثابتة العرض ووحدته.', 'Four equal figure tiles: a small grey label and a large tabular number with its unit.'),
  'app-status': t('شريط حالة سفلي: نقطة خضراء ونص حالة في جهة، و«محفوظ» في الأخرى.', 'A status bar at the bottom: a green dot and a status line on one side, "Saved" on the other.'),
};

export const kindText: Record<string, L> = {
  marquee: t('شريط من كلمات قصيرة يتحرك باستمرار بين الأقسام', 'a band of short words running continuously sideways'),
  logos: t('صف من أسماء العملاء أو الشركاء كشعارات نصية', 'a row of client or partner names set as wordmarks'),
  faq: t('أسئلة قابلة للطي، والأول مفتوح', 'an accordion of questions with the first one open'),
};

export const motionText: Record<string, L> = {
  calm: t('هادئة: تلاشٍ ناعم فقط (نحو ثانية) عند ظهور الأقسام، ولا حركة عند المرور إلا تغيّر اللون.', 'Calm: only soft fades (about 1s) as sections enter; no movement on hover beyond colour.'),
  subtle: t('خفيفة: تصعد العناصر نحو ٢٤ بكسل بتلاشٍ عند ظهورها بتتابع ٧٠ms، وارتفاع خفيف عند المرور.', 'Subtle: elements fade up about 24px as they enter, staggered by 70ms; light lifts on hover.'),
  lively: t('حيوية: ظهور أكبر (٣٢ بكسل)، حركات مرور مرنة، وزخارف تطفو بهدوء.', 'Lively: larger 32px reveals, bouncy hovers and gently floating decorations.'),
  rich: t('غنية: العنوان يصعد كلمة كلمة، ظهور بتتابع ٩٠ms، أزرار مغناطيسية، صور بعمق متحرك وعدّادات؛ وكل ذلك يتوقف مع prefers-reduced-motion.', 'Rich: the headline rises word by word, 90ms staggered reveals, magnetic buttons, parallax photos and counters; all of it off under prefers-reduced-motion.'),
};

const dividerKind: Record<string, L> = {
  fleuron: t('زخرفة كلاسيكية بخطوط شعرية', 'a classical fleuron with hairlines'),
  star8: t('نجمة ثمانية', 'an eight-point star'),
  deco: t('معيّن آرت ديكو بخطوط متوازية', 'an Art Deco diamond with parallel lines'),
  leaf: t('غصن بأوراق', 'a leafy sprig'),
  dots: t('ثلاث نقاط', 'three dots'),
  scribble: t('خربشة مرسومة باليد', 'a hand-drawn squiggle'),
  wave: t('خط متموج بعرض الصفحة', 'a full-width wavy line'),
  zigzag: t('خط متعرج بعرض الصفحة', 'a full-width zigzag'),
};

export const decorText: Record<string, L> = {
  grain: t('نسيج حبيبي ناعم فوق الصفحة كلها (طبقة ضوضاء SVG بشفافية نحو ٨٪)', 'a fine film-grain texture over the whole page (an SVG noise overlay at about 8% opacity)'),
  stamp: t('ختم دائري يحمل اسم النشاط على مسار دائري', 'a round rubber stamp with the business name on a circular path'),
  progress: t('شريط تقدم رفيع أعلى الصفحة يبيّن موضع التمرير', 'a thin progress bar along the top edge showing the scroll position'),
  cursor: t('مؤشر دائري مخصص يكبر فوق الروابط (للفأرة فقط)', 'a custom ring cursor that grows over links (fine pointers only)'),
  parallax: t('صور تتحرك أبطأ قليلًا من الصفحة (parallax)', 'photos that move slightly slower than the page (parallax)'),
  blobs: t('بقع لونية ضبابية كبيرة تتحرك ببطء خلف الواجهة', 'large blurred colour blobs drifting slowly behind the hero'),
  sparkles: t('بضع نجوم صغيرة تلمع', 'a few twinkling sparkles'),
  confetti: t('قصاصات صغيرة (نقاط، مربعات، أشرطة) تطفو في الواجهة', 'small confetti shapes (dots, squares, bars) floating in the hero'),
  grid: t('شبكة قياس خافتة في الخلفية', 'a faint measurement grid in the background'),
  scanlines: t('خطوط مسح أفقية خافتة فوق الصفحة', 'faint horizontal scanlines over the page'),
  typing: t('السطر فوق العنوان يُكتب حرفًا حرفًا مع مؤشر يومض', 'the line above the headline types itself letter by letter with a blinking caret'),
  glow: t('توهج نيون على العناوين والأزرار', 'neon glow on headings and buttons'),
  neon: t('العنوان الرئيسي يتوهج ويومض كأنبوب نيون', 'the main headline glows and flickers like a neon tube'),
  pixel: t('حدود وظلال بكسلية متدرجة بدل الناعمة', 'stepped pixel borders and shadows instead of smooth ones'),
  blueprint: t('خطوط شبكة المخططات الهندسية وصور مصبوغة بالأزرق', 'blueprint grid lines and photos tinted blue like a cyanotype'),
  mono: t('الصور بالأبيض والأسود', 'photographs in black and white'),
  marble: t('عروق رخام فاتحة في الخلفية', 'pale marble veining in the background'),
  'script-title': t('العنوان الرئيسي بخط يدوي منحني', 'the main headline in a script face'),
  pattern: t('نقش متكرر خافت من النجوم الثمانية خلف الأقسام المتناوبة', 'a faint repeating eight-point-star pattern behind alternate sections'),
  tatreez: t('شرائط تطريز فلسطيني (معينات من مربعات صغيرة) تحت الواجهة وفوق التذييل', 'Palestinian cross-stitch bands (diamonds built from small squares) under the hero and above the footer'),
  zellige: t('شرائط من نجوم الزليج خلف الأرقام والدعوة للإجراء', 'zellige star-tile bands behind the figures and the call to action'),
  star: t('نجمة ثمانية كبيرة تدور ببطء شديد خلف الواجهة', 'a large eight-point star outline rotating very slowly behind the hero'),
  sunburst: t('أشعة شمس آرت ديكو ذهبية رفيعة خلف الواجهة', 'an Art Deco sunburst of thin gold rays behind the hero'),
  leaves: t('أوراق مرسومة تتمايل بهدوء في زوايا الواجهة', 'drawn leaves swaying gently in the corners of the hero'),
  honeycomb: t('نقش خلايا سداسية وأشكال مقصوصة سداسيًا', 'a honeycomb pattern and hexagon-cut shapes'),
  shapes: t('أشكال باوهاوس (دائرة، مربع، مثلث، نصف دائرة) تنزلق إلى أماكنها في الواجهة', 'Bauhaus shapes (circle, square, triangle, half-circle) sliding into place in the hero'),
  'circle-img': t('صورة الواجهة مقصوصة دائرة كاملة', 'the hero photo cropped into a full circle'),
  mondrian: t('معرض الصور كشبكة موندريان بخطوط سوداء سميكة وكتل ألوان أساسية', 'the gallery as a Mondrian grid with thick black lines and primary colour blocks'),
  hazard: t('أشرطة تحذير سوداء وصفراء على الشريط النصي والتذييل', 'black-and-yellow hazard stripes on the text band and footer'),
  airmail: t('أشرطة البريد الجوي الحمراء والزرقاء على الترويسة والتذييل', 'red-and-blue airmail stripes along the header and footer'),
  seventies: t('أشرطة قوس قزح السبعينات وعناوين منتفخة بظلال متدرجة', 'seventies rainbow stripes and puffy headings with stacked shadows'),
  stripes: t('أشرطة ملونة مائلة خلف الواجهة', 'diagonal colour stripes behind the hero'),
  synth: t('شمس سينثويف مخططة فوق شبكة نيون منظورية متحركة', 'a striped synthwave sun over a moving neon perspective grid'),
  sun: t('شمس ريترو مخططة', 'a striped retro sun'),
  win98: t('واجهة ويندوز ٩٨: نوافذ رمادية بارزة بأشرطة عنوان زرقاء وأزرار بارزة', 'a Windows 98 interface: grey bevelled windows with blue title bars and raised buttons'),
  memphis: t('نقوش ممفيس: خلفية نقاط، بطاقات مائلة، كتل ألوان جريئة', 'Memphis patterns: a dot-grid background, tilted cards and bold colour blocks'),
  diner: t('أشرطة مربعات حمراء وبيضاء وظلال كالكروم', 'red-and-white checkerboard bands and chrome-like shadows'),
  arcade: t('خط أركيد بكسلي ومؤشر مربع يومض وأخضر نيون', 'pixel arcade type, a blinking block cursor and neon green'),
  notebook: t('ورق دفتر مسطّر بخط هامش أحمر', 'ruled notebook paper with a red margin line'),
  graph: t('خلفية ورق مربعات', 'a graph-paper background'),
  tape: t('صور مثبتة بشرائط لاصقة شفافة', 'photos held on with strips of translucent tape'),
  chalk: t('سبورة: حدود طباشير متقطعة ونص طباشيري', 'a chalkboard: dashed chalk borders and chalky text'),
  icons: t('بطاقات الخدمات بأيقونات خطية بدل الصور', 'service cards use line icons rather than photos'),
  topbar: t('شريط علوي رفيع بالهاتف والبريد وساعات العمل', 'a slim top bar with phone, email and hours'),
  whatsapp: t('زر واتساب دائري عائم في الزاوية', 'a floating round WhatsApp button in the corner'),
};
for (const [k, v] of Object.entries(dividerKind)) {
  decorText[`divider-${k}`] = { ar: `فواصل زخرفية صغيرة بين الأقسام: ${v.ar}`, en: `small ornamental dividers between sections: ${v.en}` };
}

export const roleText: Record<string, L> = {
  bg: t('خلفية الصفحة', 'page background'),
  surface: t('البطاقات واللوحات والأقسام المتناوبة', 'cards, panels, alternate sections'),
  ink: t('النص الرئيسي', 'main text'),
  muted: t('النص الثانوي', 'secondary text'),
  accent: t('الأزرار والروابط والإبراز', 'buttons, links, highlights'),
  accent2: t('لون إبراز ثانٍ', 'second highlight'),
  line: t('الخطوط والحدود', 'rules and borders'),
  onAccent: t('النص فوق لون الإبراز', 'text on the accent colour'),
};

export const stacks = ['auto', 'html', 'next', 'astro', 'react', 'wordpress'] as const;
export type Stack = (typeof stacks)[number];
export const stackText: Record<Stack, L> = {
  auto: t('اختر التقنية الأنسب للمشروع، ويُفضّل HTML وCSS وJavaScript ثابتة ما لم يحتج أكثر.', 'Choose the stack that fits the project; prefer static HTML, CSS and JavaScript unless it needs more.'),
  html: t('HTML وCSS وJavaScript عادية بلا أدوات بناء.', 'Plain HTML, CSS and vanilla JavaScript, with no build step.'),
  next: t('Next.js (App Router) مع TypeScript وCSS عادي أو CSS Modules.', 'Next.js (App Router) with TypeScript and plain CSS or CSS Modules.'),
  astro: t('Astro مع CSS عادي.', 'Astro with plain CSS.'),
  react: t('React مع Vite وTypeScript.', 'React with Vite and TypeScript.'),
  wordpress: t('قالب ووردبريس مخصص (قوالب PHP بلا محرر صفحات).', 'A custom WordPress theme (PHP templates, no page builder).'),
};
export const stackName: Record<Stack, L> = {
  auto: t('يقرر Claude', 'Let Claude decide'),
  html: t('HTML ثابت', 'Static HTML'),
  next: t('Next.js', 'Next.js'),
  astro: t('Astro', 'Astro'),
  react: t('React + Vite', 'React + Vite'),
  wordpress: t('ووردبريس', 'WordPress'),
};

export const pr = {
  title: t('ابنِ موقعًا بتصميم «{name}»', 'Build a website in the "{name}" style'),
  appTitle: t('ابنِ واجهة تطبيق بتصميم «{name}»', 'Build an app interface in the "{name}" style'),
  appIntro: t('أنت تبني واجهة أداة عمل جاهزة للاستخدام اليومي، لا صفحة تعريفية. اتبع نظام التصميم أدناه بدقة، واجعل كل أداة في المشروع صفحة بالهيكل نفسه. التصميم مأخوذ من مكتبة قالب (التصميم رقم {no}).', 'You are building the interface of a working tool for daily use, not a landing page. Follow the design system below exactly, and give every tool in the project a page with the same shell. The design comes from the Qalib library (design No. {no}).'),
  appNote: t('الهيكل نفسه لكل أداة: التنقل ثابت، ورأس مساحة العمل يتغير عنوانه وأزراره، ولوحة الإعدادات تعرض حقول الأداة المفتوحة، ومساحة العمل تعرض ما تنتجه. على الجوال تصبح لوحة الإعدادات درجًا سفليًا يفتحه زر في الرأس.', 'The same shell for every tool: fixed navigation, a workspace header whose title and actions change, a settings panel holding the open tool\'s fields, and a workspace showing what the tool makes. On phones the settings panel becomes a bottom drawer opened from a button in the header.'),
  intro: t('أنت تبني موقعًا جاهزًا للنشر. اتبع نظام التصميم أدناه بدقة، وطوّع المحتوى للمشروع. التصميم مأخوذ من مكتبة قالب (التصميم رقم {no}).', 'You are building a production-ready website. Follow the design system below exactly and adapt the content to the project. The design comes from the Qalib library (design No. {no}).'),
  project: t('المشروع', 'The project'),
  name: t('الاسم', 'Name'),
  type: t('نوع الموقع', 'Type of site'),
  about: t('عن النشاط', 'What it does'),
  languages: t('اللغات', 'Languages'),
  pages: t('الصفحات', 'Pages'),
  contact: t('بيانات التواصل', 'Contact details'),
  assets: t('الملفات', 'Assets'),
  notes: t('ملاحظات', 'Notes'),
  fill: t('[اكتب هنا]', '[fill in]'),
  langAr: t('العربية فقط (dir="rtl")', 'Arabic only (dir="rtl")'),
  langEn: t('الإنجليزية فقط', 'English only'),
  langBoth: t('العربية والإنجليزية: العربية أولًا (RTL) ونسخة إنجليزية كاملة (LTR) مع زر تبديل اللغة', 'Arabic and English: Arabic first (RTL) and a full English version (LTR) with a language switch'),
  pagesOne: t('صفحة واحدة بأقسام وروابط تنقل داخلية', 'One page with sections and anchor links'),
  pagesMulti: t('عدة صفحات (الرئيسية، من نحن، الخدمات أو المنتجات، التواصل…) بنفس التصميم', 'Several pages (Home, About, Services or Products, Contact…) in the same design'),
  assetsYes: t('شعار العميل وصوره في المجلد ./assets، استخدمها وحسّن أحجامها.', 'The client\'s logo and photos are in ./assets; use them and optimise their sizes.'),
  assetsNo: t('لا توجد صور بعد: استخدم صورًا مؤقتة مناسبة واكتب بجانب كل منها TODO لاستبدالها.', 'No photos yet: use suitable placeholders and mark each one TODO for replacement.'),
  reference: t('المرجع البصري', 'Visual reference'),
  demoAr: t('العرض الحي (عربي)', 'Live demo (Arabic)'),
  demoEn: t('العرض الحي (إنجليزي)', 'Live demo (English)'),
  referenceNote: t('كل عرض ملف HTML واحد فيه كل CSS داخل وسم <style>. نزّل الملف الخام (مثلًا `curl -s <الرابط>`) لا ملخصًا له، واعتمد CSS فيه مصدرًا للمسافات والأحجام والتأثيرات. نشاط العرض ونصوصه وهمية: لا تنسخها.', 'Each demo is one HTML file with all its CSS in a <style> tag. Download the raw file (for example `curl -s <url>`), not a summary of it, and treat its CSS as the source of truth for spacing, sizes and effects. The demo\'s business and text are fictional: never copy them.'),
  dna: t('روح التصميم: {style}', 'Design DNA: {style}'),
  dnaType: t('الخطوط', 'Typography'),
  dnaColor: t('الألوان', 'Colour'),
  dnaLayout: t('التخطيط', 'Layout'),
  dnaShape: t('الأشكال', 'Shapes'),
  dnaImagery: t('الصور', 'Imagery'),
  dnaMotion: t('الحركة', 'Motion'),
  dnaDetails: t('التفاصيل', 'Details'),
  dnaAvoid: t('تجنّب', 'Avoid'),
  thisDesign: t('هذا التصميم تحديدًا', 'This design in particular'),
  tokens: t('القيم الأساسية', 'Design tokens'),
  scheme: t('نمط الألوان', 'Colour scheme'),
  light: t('فاتح', 'light'),
  dark: t('داكن', 'dark'),
  fonts: t('الخطوط (متوفرة على Google Fonts وfontsource؛ استضفها على الموقع نفسه)', 'Fonts (available on Google Fonts and fontsource; self-host them)'),
  fontDisplayAr: t('عناوين عربية', 'Arabic headings'),
  fontBodyAr: t('نص عربي', 'Arabic text'),
  fontDisplay: t('عناوين لاتينية', 'Latin headings'),
  fontBody: t('نص لاتيني', 'Latin text'),
  fontAccent: t('خط مساعد (تسميات وأرقام)', 'Accent (labels and numbers)'),
  scale: t('مقاسات الخط', 'Type scale'),
  scaleValue: t('h1: clamp(2.7rem, 6.2vw, 5.4rem) · h2: clamp(2rem, 4.2vw, 3.3rem) · h3: 1.25rem · النص: 17px بارتفاع سطر 1.7 (العربي 18px و1.9) · العرض الأقصى 1200px · مسافات الأقسام clamp(72px, 10vw, 136px)', 'h1: clamp(2.7rem, 6.2vw, 5.4rem) · h2: clamp(2rem, 4.2vw, 3.3rem) · h3: 1.25rem · text: 17px with 1.7 line height (Arabic 18px and 1.9) · max width 1200px · section spacing clamp(72px, 10vw, 136px)'),
  structure: t('بنية الصفحة', 'Page structure'),
  structureIntro: t('العرض يقدّم «{demo}». ابنِ الأقسام بهذه المعالجات البصرية، بهذا الترتيب:', 'The demo shows a {demo}. Build the sections with these visual treatments, in this order:'),
  suggested: t('أقسام مقترحة لموقع «{type}» (أعد استخدام أقرب معالجة من العرض لكل قسم):', 'Suggested sections for a {type} site (reuse the closest treatment from the demo for each one):'),
  motion: t('الحركة', 'Motion'),
  decor: t('زخارف هذا التصميم', 'Decorations in this design'),
  interactions: t('التفاعلات', 'Interactions'),
  interactionsIntro: t(
    'ابنِها بلا مكتبات. الأقسام المثبتة طويلة وفي داخلها مسرح `position: sticky; top: 0; height: 100svh`. معالج تمرير واحد مقيّد بـ requestAnimationFrame يكتب تقدّم كل قسم p (من 0 إلى 1) في متغير CSS، وCSS يحوّله إلى تحويلات و`clip-path` وشفافية عبر `calc()`. تأثيرات المؤشر تكتب متغيرات متدرّجة (من −1 إلى 1، ومواضع بالبكسل) في حلقة رسم واحدة تعمل فقط والقسم ظاهر، وإذا غاب المؤشر ثانيتين تنساب القيم وحدها ببطء حتى يرى أصحاب الشاشات اللمسية التأثير. لا تثبّت شيئًا إلا إذا عمل JavaScript ولم يكن `prefers-reduced-motion` مفعّلًا؛ وإلا فكل قسم تخطيط ثابت يظهر فيه المحتوى كاملًا (صورة التكبير مؤطّرة ومعها الدعوة، والستارة مفتوحة، والعبارة مضاءة كلها، والشريط يُمرَّر باليد). ولا تغيّر سرعة التمرير ولا تمنع العجلة أبدًا.',
    'Build them without libraries. Pinned sections are tall, with a stage inside that is `position: sticky; top: 0; height: 100svh`. One requestAnimationFrame-throttled scroll handler writes each section\'s progress p (0 to 1) to a CSS variable, and CSS turns it into transforms, `clip-path` and opacity with `calc()`. Pointer effects write eased variables (−1 to 1, and pixel positions) in a single animation loop that runs only while the section is on screen; with no pointer for two seconds the values drift slowly on their own, so touch screens see the effect too. Pin only when JavaScript runs and `prefers-reduced-motion` is not set; otherwise every section is a still layout with all of its content visible (the zoom photo framed with its call to action, the curtain open, the statement fully lit, the rail scrollable by hand). Never change the scroll speed or block the wheel.',
  ),
  tech: t('المتطلبات التقنية', 'Technical requirements'),
  stack: t('التقنية', 'Stack'),
  techList: [
    t('HTML دلالي، والتصميم يبدأ من الجوال ويتكيف مع 360 و768 و1024 و1440 بكسل، بلا تمرير أفقي.', 'Semantic HTML, mobile first, adapting at 360, 768, 1024 and 1440px, with no horizontal scrolling.'),
    t('العربية: <html lang="ar" dir="rtl">، خصائص CSS المنطقية (margin-inline-start وinset-inline-end…)، اعكس الأيقونات الاتجاهية، ولا تباعد بين الحروف العربية ولا تحوّلها لأحرف كبيرة، وحجم النص العربي 18px على الأقل.', 'Arabic: <html lang="ar" dir="rtl">, CSS logical properties (margin-inline-start, inset-inline-end…), mirrored directional icons, never letter-space or uppercase Arabic, and Arabic text at 18px or more.'),
    t('الوصول: تباين WCAG AA، حالات تركيز واضحة، نص بديل للصور، وكل الحركة تتوقف مع prefers-reduced-motion.', 'Accessibility: WCAG AA contrast, visible focus states, alt text on images, and all motion off under prefers-reduced-motion.'),
    t('الأداء: خطوط مستضافة ذاتيًا مع font-display: swap وبالأوزان والحروف اللازمة فقط، صور WebP أو AVIF بأبعاد محددة، تحميل كسول لما تحت الشاشة الأولى، ولا مكتبات ثقيلة لتأثيرات بسيطة.', 'Performance: self-hosted fonts with font-display: swap and only the weights and subsets in use, WebP or AVIF images with set dimensions, lazy loading below the first screen, and no heavy libraries for simple effects.'),
    t('محركات البحث: عنوان ووصف لكل صفحة، Open Graph، أيقونة، وبيانات منظمة LocalBusiness عند الحاجة.', 'SEO: a title and description for every page, Open Graph, a favicon, and LocalBusiness structured data where relevant.'),
    t('الأزرار: روابط واتساب بصيغة https://wa.me/<الرقم>، والهاتف tel:، والبريد mailto:.', 'Buttons: WhatsApp links as https://wa.me/<number>, phone as tel:, email as mailto:.'),
  ],
  deliver: t('التسليم', 'Delivery'),
  deliverList: [
    t('ابدأ بكتابة القيم الأساسية والأنماط العامة، ثم ابنِ الأقسام من الأعلى إلى الأسفل.', 'Start with the tokens and base styles, then build the sections from top to bottom.'),
    t('قارن النتيجة بالعرض الحي على عرض جوال وعرض حاسوب قبل أن تنهي.', 'Compare the result with the live demo at phone and desktop widths before you finish.'),
    t('اكتب في النهاية كيف يُشغَّل الموقع وكيف يُنشر.', 'Finish with how to run the site and how to deploy it.'),
  ],
  cssAppendix: t('ملحق: CSS المرجعي الكامل للعرض', 'Appendix: the demo\'s full reference CSS'),
  cssNote: t('هذا هو CSS العرض كما هو؛ أعد استخدام القيم والأنماط، وأعد تسمية الأصناف بما يناسب مشروعك.', 'This is the demo\'s CSS as is; reuse its values and patterns, renaming classes to suit your project.'),
};
