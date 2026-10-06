import type { L, ProfileId } from './types';

// The working tools behind the demo businesses: the app a sign shop cuts its
// jobs in, the board a kitchen cooks from, the calendar a clinic books in.
// The workbench style shows these instead of a website. Pure data, like the
// profiles; the demo renderer and the prompt builder both read it.

const t = (ar: string, en: string): L => ({ ar, en });

export type Tone = 'ok' | 'warn' | 'info' | 'muted' | 'accent';

export type AppField =
  | { kind: 'number'; label: L; value: string; unit?: string }
  | { kind: 'select'; label: L; value: L }
  | { kind: 'toggle'; label: L; on: boolean }
  | { kind: 'range'; label: L; value: number; min: number; max: number; unit?: string }
  | { kind: 'segment'; label: L; options: L[]; active: number }
  | { kind: 'chips'; label: L; options: L[]; active: number[] }
  | { kind: 'text'; label: L; value: L };

export type AppView =
  | { kind: 'canvas'; caption: L; size: string }
  | { kind: 'plan'; caption: L; rooms: { label: L; x: number; y: number; w: number; h: number }[] }
  | { kind: 'kanban'; columns: { title: L; tone: Tone; cards: { title: L; meta: L; tag?: L; who?: string }[] }[] }
  | { kind: 'table'; columns: L[]; rows: { cells: (L | string)[]; status: { label: L; tone: Tone } }[] }
  | { kind: 'week'; days: L[]; from: number; to: number; events: { day: number; at: number; len: number; title: L; who: L; tone: Tone }[] }
  | { kind: 'timeline'; lanes: L[]; slots: L[]; bars: { lane: number; from: number; to: number; label: L; tone: Tone }[] }
  | { kind: 'grid'; tiles: { title: L; meta: L; price: string; img: number; badge?: L }[] }
  | { kind: 'dashboard'; chart: L; months: L[]; series: number[]; series2: number[]; legend: [L, L]; list: L; rows: { label: L; value: string; share: number }[] }
  | { kind: 'gallery'; photos: { img: number; rating: number; flag?: 'pick' | 'reject' }[] }
  | { kind: 'document'; blocks: ({ kind: 'h'; text: L } | { kind: 'p'; text: L } | { kind: 'list'; items: L[] } | { kind: 'media'; img: number; caption: L } | { kind: 'quiz'; q: L; options: L[]; answer: number })[] };

export type AppContent = {
  /** The tool's own name, beside the business's mark. */
  name: L;
  search: L;
  groups: { title: L; items: { label: L; icon: string; badge?: string }[] }[];
  /** Which navigation item is open, counting across the groups. */
  active: number;
  title: L;
  subtitle: L;
  actions: { label: L; icon: string; primary?: boolean }[];
  tabs: L[];
  panelTitle: L;
  panel: { title: L; fields: AppField[] }[];
  stats: { label: L; value: string; unit?: string | L }[];
  status: L;
  view: AppView;
};

const DAYS = [t('الأحد', 'Sun'), t('الاثنين', 'Mon'), t('الثلاثاء', 'Tue'), t('الأربعاء', 'Wed'), t('الخميس', 'Thu')];

export const APPS: Partial<Record<ProfileId, AppContent>> = {
  signage: {
    name: t('منضدة القص', 'Cutting bench'),
    search: t('ابحث في ٢٦ أداة', 'Search 26 tools'),
    groups: [
      { title: t('التصميم', 'Artwork'), items: [
        { label: t('تحويل صورة إلى فيكتور', 'Image to vector'), icon: 'spline' },
        { label: t('الكتابة العربية', 'Arabic lettering'), icon: 'type' },
        { label: t('الكونتور والإزاحة', 'Contour & offset'), icon: 'circle-dashed' },
      ] },
      { title: t('الليزر والقص', 'Laser & CNC'), items: [
        { label: t('صانع الصناديق', 'Box maker'), icon: 'box' },
        { label: t('ترتيب القطع', 'Nesting'), icon: 'layout-grid' },
        { label: t('المفصل المرن', 'Living hinge'), icon: 'align-justify' },
        { label: t('بطاقة اختبار القوة', 'Power test card'), icon: 'grid-3x3' },
      ] },
      { title: t('الأعمال', 'Business'), items: [{ label: t('عرض السعر', 'Job quote'), icon: 'receipt' }] },
    ],
    active: 3,
    title: t('صانع الصناديق', 'Box maker'),
    subtitle: t('صندوق بتعشيق الأسنان بمقاسك وسماكة خامتك، جاهز للقص.', 'A finger-joint box to your size and material, ready to cut.'),
    actions: [{ label: t('ترتيب على اللوح', 'Arrange on sheet'), icon: 'layout-grid' }, { label: t('تصدير DXF', 'Export DXF'), icon: 'download', primary: true }],
    tabs: [t('المخطط المسطح', 'Flat layout'), t('عرض ثلاثي الأبعاد', '3D view')],
    panelTitle: t('الإعدادات', 'Settings'),
    panel: [
      { title: t('المقاسات', 'Size'), fields: [
        { kind: 'segment', label: t('المقاسات', 'Dimensions are'), options: [t('داخلية', 'Inside'), t('خارجية', 'Outside')], active: 0 },
        { kind: 'number', label: t('العرض', 'Width'), value: '120', unit: 'mm' },
        { kind: 'number', label: t('العمق', 'Depth'), value: '80', unit: 'mm' },
        { kind: 'number', label: t('الارتفاع', 'Height'), value: '60', unit: 'mm' },
      ] },
      { title: t('الخامة', 'Material'), fields: [
        { kind: 'select', label: t('الخامة', 'Material'), value: t('بليود ٣ مم', 'Plywood 3 mm') },
        { kind: 'range', label: t('عرض الليزر (كيرف)', 'Kerf'), value: 15, min: 0, max: 40, unit: '× 0.01 mm' },
        { kind: 'toggle', label: t('غطاء منزلق', 'Sliding lid'), on: true },
      ] },
    ],
    stats: [{ label: t('القطع', 'Parts'), value: '6' }, { label: t('طول القص', 'Cut length'), value: '1.84', unit: 'm' }, { label: t('الزمن', 'Time'), value: '4:10' }, { label: t('اللوح', 'Sheet'), value: '300 × 200', unit: 'mm' }],
    status: t('ملفاتك لا تغادر جهازك', 'Your files never leave this device'),
    view: { kind: 'canvas', caption: t('أحمر للقص · أزرق للحفر', 'Red cuts · blue engraves'), size: '126 × 86 × 66 mm' },
  },

  construction: {
    name: t('مخطط الموقع', 'Site planner'),
    search: t('ابحث في المشاريع والمخططات', 'Search projects and drawings'),
    groups: [
      { title: t('المشروع', 'Project'), items: [
        { label: t('المخططات', 'Drawings'), icon: 'ruler' },
        { label: t('الكميات', 'Quantities'), icon: 'calculator' },
        { label: t('الجدول الزمني', 'Schedule'), icon: 'calendar-range' },
        { label: t('الموقع اليومي', 'Site diary'), icon: 'clipboard-list' },
      ] },
      { title: t('الفريق', 'Team'), items: [{ label: t('المقاولون', 'Contractors'), icon: 'hard-hat' }, { label: t('الموردون', 'Suppliers'), icon: 'truck' }] },
    ],
    active: 0,
    title: t('فيلا الريحان · الطابق الأرضي', 'Al Rayhan villa · ground floor'),
    subtitle: t('مخطط بمقياس ١:١٠٠ مع حساب المساحات والكميات مباشرة.', 'A 1:100 plan with areas and quantities worked out as you draw.'),
    actions: [{ label: t('طبقات', 'Layers'), icon: 'layers' }, { label: t('مشاركة المخطط', 'Share drawing'), icon: 'share-2', primary: true }],
    tabs: [t('المسقط', 'Plan'), t('الواجهة', 'Elevation'), t('المقطع', 'Section')],
    panelTitle: t('الغرفة المحددة', 'Selected room'),
    panel: [
      { title: t('غرفة المعيشة', 'Living room'), fields: [
        { kind: 'number', label: t('الطول', 'Length'), value: '6.20', unit: 'm' },
        { kind: 'number', label: t('العرض', 'Width'), value: '4.80', unit: 'm' },
        { kind: 'select', label: t('الأرضية', 'Flooring'), value: t('بلاط بورسلان ٦٠×٦٠', 'Porcelain 60×60') },
      ] },
      { title: t('العرض', 'Display'), fields: [
        { kind: 'toggle', label: t('الأبعاد', 'Dimensions'), on: true },
        { kind: 'toggle', label: t('الأثاث', 'Furniture'), on: false },
        { kind: 'chips', label: t('الطبقات', 'Layers'), options: [t('جدران', 'Walls'), t('أبواب', 'Doors'), t('كهرباء', 'Electric'), t('صحي', 'Plumbing')], active: [0, 1] },
      ] },
    ],
    stats: [{ label: t('المساحة', 'Area'), value: '186', unit: 'm²' }, { label: t('البلاط', 'Tiles'), value: '548' }, { label: t('الإسمنت', 'Cement'), value: '42', unit: 't' }, { label: t('التكلفة', 'Cost'), value: '312k', unit: '₪' }],
    status: t('آخر حفظ قبل دقيقتين · المهندسة رنا', 'Saved two minutes ago · Eng. Rana'),
    view: { kind: 'plan', caption: t('مقياس ١:١٠٠', 'Scale 1:100'), rooms: [
      { label: t('المعيشة', 'Living'), x: 0, y: 0, w: 62, h: 48 }, { label: t('المطبخ', 'Kitchen'), x: 62, y: 0, w: 38, h: 30 },
      { label: t('السفرة', 'Dining'), x: 62, y: 30, w: 38, h: 18 }, { label: t('نوم ١', 'Bed 1'), x: 0, y: 48, w: 40, h: 52 },
      { label: t('حمام', 'Bath'), x: 40, y: 48, w: 22, h: 24 }, { label: t('مدخل', 'Hall'), x: 40, y: 72, w: 22, h: 28 }, { label: t('نوم ٢', 'Bed 2'), x: 62, y: 48, w: 38, h: 52 },
    ] },
  },

  restaurant: {
    name: t('شاشة المطبخ', 'Kitchen display'),
    search: t('ابحث برقم الطلب أو الطاولة', 'Search by order or table'),
    groups: [
      { title: t('الخدمة', 'Service'), items: [
        { label: t('الطلبات', 'Orders'), icon: 'chef-hat', badge: '9' },
        { label: t('الطاولات', 'Tables'), icon: 'armchair' },
        { label: t('التوصيل', 'Delivery'), icon: 'bike', badge: '3' },
      ] },
      { title: t('الإدارة', 'Manage'), items: [{ label: t('القائمة', 'Menu'), icon: 'book-open' }, { label: t('المخزون', 'Stock'), icon: 'package' }, { label: t('التقارير', 'Reports'), icon: 'chart-column' }] },
    ],
    active: 0,
    title: t('طلبات الليلة', 'Tonight\'s orders'),
    subtitle: t('كل طلب بطاقة تنتقل من الاستلام إلى التحضير إلى التسليم.', 'Every order is a card that moves from new to cooking to ready.'),
    actions: [{ label: t('إيقاف الطلبات', 'Pause orders'), icon: 'pause' }, { label: t('طلب جديد', 'New order'), icon: 'plus', primary: true }],
    tabs: [t('الكل', 'All'), t('صالة', 'Dine-in'), t('سفري', 'Takeaway')],
    panelTitle: t('الطلب #٢٠٤', 'Order #204'),
    panel: [
      { title: t('طاولة ٧ · ٤ أشخاص', 'Table 7 · 4 guests'), fields: [
        { kind: 'text', label: t('مسخّن × ٢', 'Musakhan × 2'), value: t('بلا بصل لطبق واحد', 'No onion on one') },
        { kind: 'text', label: t('فتّوش × ١', 'Fattoush × 1'), value: t('الصلصة جانباً', 'Dressing on the side') },
        { kind: 'toggle', label: t('أولوية', 'Rush'), on: true },
      ] },
      { title: t('التحضير', 'Prep'), fields: [
        { kind: 'range', label: t('الوقت المتوقع', 'Estimated time'), value: 18, min: 5, max: 45, unit: 'min' },
        { kind: 'segment', label: t('المحطة', 'Station'), options: [t('فرن', 'Oven'), t('شواء', 'Grill'), t('بارد', 'Cold')], active: 0 },
      ] },
    ],
    stats: [{ label: t('مفتوحة', 'Open'), value: '9' }, { label: t('متوسط التحضير', 'Avg prep'), value: '14', unit: 'min' }, { label: t('متأخرة', 'Late'), value: '1' }, { label: t('مبيعات الليلة', 'Tonight'), value: '4,820', unit: '₪' }],
    status: t('الفرن ١ و٢ يعملان · الشواء مزدحم', 'Ovens 1 and 2 on · grill busy'),
    view: { kind: 'kanban', columns: [
      { title: t('جديد', 'New'), tone: 'info', cards: [
        { title: t('#٢٠٧ · طاولة ٣', '#207 · Table 3'), meta: t('منسف، حمّص، عصير ليمون', 'Mansaf, hummus, lemonade'), tag: t('صالة', 'Dine-in') },
        { title: t('#٢٠٨ · توصيل', '#208 · Delivery'), meta: t('مشاوي مشكّلة × ٢', 'Mixed grill × 2'), tag: t('توصيل', 'Delivery') },
      ] },
      { title: t('قيد التحضير', 'Cooking'), tone: 'warn', cards: [
        { title: t('#٢٠٤ · طاولة ٧', '#204 · Table 7'), meta: t('مسخّن × ٢، فتّوش', 'Musakhan × 2, fattoush'), tag: t('أولوية', 'Rush'), who: 'Kh' },
        { title: t('#٢٠٥ · سفري', '#205 · Takeaway'), meta: t('مقلوبة، متبّل', 'Maqluba, moutabal'), who: 'Ra' },
        { title: t('#٢٠٦ · طاولة ١١', '#206 · Table 11'), meta: t('كبّة، سلطة الموسم', 'Kibbeh, season\'s salad'), who: 'Kh' },
      ] },
      { title: t('جاهز', 'Ready'), tone: 'ok', cards: [
        { title: t('#٢٠٢ · طاولة ٤', '#202 · Table 4'), meta: t('فتّة، حمّص بلحمة', 'Fatteh, hummus with lamb'), tag: t('للتقديم', 'Serve') },
      ] },
      { title: t('سُلّم', 'Served'), tone: 'muted', cards: [
        { title: t('#٢٠١ · طاولة ٢', '#201 · Table 2'), meta: t('أُغلق ٨:١٢ م', 'Closed 8:12 pm') },
      ] },
    ] },
  },

  law: {
    name: t('ملفات القضايا', 'Case files'),
    search: t('ابحث برقم القضية أو الموكّل', 'Search by case or client'),
    groups: [
      { title: t('المكتب', 'Practice'), items: [
        { label: t('القضايا', 'Cases'), icon: 'scale', badge: '38' },
        { label: t('الجلسات', 'Hearings'), icon: 'gavel' },
        { label: t('الموكّلون', 'Clients'), icon: 'users' },
        { label: t('المستندات', 'Documents'), icon: 'file-text' },
      ] },
      { title: t('المالية', 'Finance'), items: [{ label: t('الأتعاب', 'Fees'), icon: 'wallet' }, { label: t('الساعات', 'Hours'), icon: 'timer' }] },
    ],
    active: 0,
    title: t('القضايا المفتوحة', 'Open cases'),
    subtitle: t('٣٨ قضية، مرتبة حسب أقرب جلسة.', '38 cases, sorted by the next hearing.'),
    actions: [{ label: t('تصفية', 'Filter'), icon: 'list-filter' }, { label: t('قضية جديدة', 'New case'), icon: 'plus', primary: true }],
    tabs: [t('الكل', 'All'), t('تجاري', 'Commercial'), t('عمالي', 'Labour'), t('عقاري', 'Property')],
    panelTitle: t('القضية ٢٠٢٦/١٤٧', 'Case 2026/147'),
    panel: [
      { title: t('شركة الندى ضد مورّد', 'Al-Nada Co. v. supplier'), fields: [
        { kind: 'select', label: t('المحكمة', 'Court'), value: t('بداية رام الله', 'Ramallah first instance') },
        { kind: 'text', label: t('الجلسة القادمة', 'Next hearing'), value: t('الثلاثاء ١٤ أكتوبر، ١٠:٠٠ ص', 'Tue 14 Oct, 10:00 am') },
        { kind: 'text', label: t('المحامي المسؤول', 'Lead counsel'), value: t('أ. سامر خوري', 'Samer Khoury') },
      ] },
      { title: t('المهام', 'Tasks'), fields: [
        { kind: 'toggle', label: t('تقديم المذكرة الجوابية', 'File the reply brief'), on: true },
        { kind: 'toggle', label: t('استدعاء الشاهد', 'Summon the witness'), on: false },
      ] },
    ],
    stats: [{ label: t('مفتوحة', 'Open'), value: '38' }, { label: t('جلسات هذا الأسبوع', 'Hearings this week'), value: '7' }, { label: t('ساعات مسجّلة', 'Billed hours'), value: '126' }, { label: t('نسبة الكسب', 'Win rate'), value: '81', unit: '%' }],
    status: t('مزامنة مع تقويم المحاكم صباح اليوم', 'Synced with the court calendar this morning'),
    view: { kind: 'table', columns: [t('القضية', 'Case'), t('الموكّل', 'Client'), t('النوع', 'Type'), t('الجلسة القادمة', 'Next hearing')], rows: [
      { cells: ['2026/147', t('شركة الندى', 'Al-Nada Co.'), t('تجاري', 'Commercial'), t('١٤ أكتوبر', '14 Oct')], status: { label: t('مذكرة', 'Brief due'), tone: 'warn' } },
      { cells: ['2026/139', t('رامي سعادة', 'Rami Saadeh'), t('عمالي', 'Labour'), t('١٦ أكتوبر', '16 Oct')], status: { label: t('جاهزة', 'Ready'), tone: 'ok' } },
      { cells: ['2026/121', t('ورثة الحاج يوسف', 'Heirs of Haj Yousef'), t('عقاري', 'Property'), t('٢٠ أكتوبر', '20 Oct')], status: { label: t('خبرة فنية', 'Expert report'), tone: 'info' } },
      { cells: ['2025/388', t('مصنع الكرمل', 'Carmel factory'), t('تجاري', 'Commercial'), t('٢٣ أكتوبر', '23 Oct')], status: { label: t('تسوية', 'Settling'), tone: 'accent' } },
      { cells: ['2025/301', t('هبة الأحمد', 'Hiba Al-Ahmad'), t('أحوال', 'Family'), t('٢٨ أكتوبر', '28 Oct')], status: { label: t('مؤجلة', 'Adjourned'), tone: 'muted' } },
    ] },
  },

  clinic: {
    name: t('المواعيد', 'Appointments'),
    search: t('ابحث عن مريض', 'Find a patient'),
    groups: [
      { title: t('العيادة', 'Clinic'), items: [
        { label: t('التقويم', 'Calendar'), icon: 'calendar-days' },
        { label: t('المرضى', 'Patients'), icon: 'contact' },
        { label: t('غرفة الانتظار', 'Waiting room'), icon: 'armchair', badge: '4' },
      ] },
      { title: t('الإدارة', 'Admin'), items: [{ label: t('الفواتير', 'Billing'), icon: 'receipt' }, { label: t('الرسائل', 'Reminders'), icon: 'message-circle' }] },
    ],
    active: 0,
    title: t('أسبوع ١٢ أكتوبر', 'Week of 12 October'),
    subtitle: t('٣ أطباء · ٤١ موعداً · فترتان متاحتان يوم الخميس.', '3 dentists · 41 appointments · two free slots on Thursday.'),
    actions: [{ label: t('اليوم', 'Today'), icon: 'calendar-check' }, { label: t('موعد جديد', 'New appointment'), icon: 'plus', primary: true }],
    tabs: [t('يوم', 'Day'), t('أسبوع', 'Week'), t('شهر', 'Month')],
    panelTitle: t('حجز موعد', 'Book an appointment'),
    panel: [
      { title: t('المريض', 'Patient'), fields: [
        { kind: 'text', label: t('الاسم', 'Name'), value: t('ليان منصور', 'Layan Mansour') },
        { kind: 'select', label: t('الإجراء', 'Treatment'), value: t('تنظيف وفحص', 'Clean and check-up') },
        { kind: 'segment', label: t('المدة', 'Length'), options: [t('٣٠ د', '30 min'), t('٤٥ د', '45 min'), t('ساعة', '1 h')], active: 1 },
      ] },
      { title: t('التذكير', 'Reminder'), fields: [
        { kind: 'toggle', label: t('رسالة واتساب قبل يوم', 'WhatsApp a day before'), on: true },
        { kind: 'toggle', label: t('اتصال قبل ساعة', 'Call an hour before'), on: false },
      ] },
    ],
    stats: [{ label: t('مواعيد', 'Booked'), value: '41' }, { label: t('حضور', 'Showed up'), value: '94', unit: '%' }, { label: t('متاحة', 'Free slots'), value: '6' }, { label: t('متوسط الانتظار', 'Avg wait'), value: '7', unit: 'min' }],
    status: t('أُرسلت ١٢ رسالة تذكير اليوم', '12 reminders sent today'),
    view: { kind: 'week', days: DAYS, from: 9, to: 17, events: [
      { day: 0, at: 9, len: 1, title: t('تنظيف', 'Cleaning'), who: t('د. سارة', 'Dr Sara'), tone: 'info' },
      { day: 0, at: 11, len: 1.5, title: t('حشوة', 'Filling'), who: t('د. أنس', 'Dr Anas'), tone: 'accent' },
      { day: 1, at: 10, len: 2, title: t('علاج عصب', 'Root canal'), who: t('د. أنس', 'Dr Anas'), tone: 'warn' },
      { day: 1, at: 14, len: 1, title: t('فحص أطفال', 'Child check-up'), who: t('د. سارة', 'Dr Sara'), tone: 'ok' },
      { day: 2, at: 9.5, len: 1, title: t('تبييض', 'Whitening'), who: t('د. منى', 'Dr Mona'), tone: 'accent' },
      { day: 2, at: 13, len: 1.5, title: t('تقويم', 'Braces'), who: t('د. منى', 'Dr Mona'), tone: 'info' },
      { day: 3, at: 11, len: 1, title: t('تنظيف', 'Cleaning'), who: t('د. سارة', 'Dr Sara'), tone: 'info' },
      { day: 3, at: 15, len: 1, title: t('خلع', 'Extraction'), who: t('د. أنس', 'Dr Anas'), tone: 'warn' },
      { day: 4, at: 10, len: 1, title: t('فحص', 'Check-up'), who: t('د. منى', 'Dr Mona'), tone: 'ok' },
    ] },
  },

  hotel: {
    name: t('مكتب الاستقبال', 'Front desk'),
    search: t('ابحث عن ضيف أو حجز', 'Find a guest or booking'),
    groups: [
      { title: t('الإقامة', 'Stays'), items: [
        { label: t('لوحة الغرف', 'Room board'), icon: 'bed-double' },
        { label: t('الوصول اليوم', 'Arrivals'), icon: 'log-in', badge: '6' },
        { label: t('المغادرة', 'Departures'), icon: 'log-out', badge: '4' },
        { label: t('التنظيف', 'Housekeeping'), icon: 'sparkles' },
      ] },
      { title: t('المبيعات', 'Sales'), items: [{ label: t('الأسعار', 'Rates'), icon: 'tag' }, { label: t('القنوات', 'Channels'), icon: 'globe' }] },
    ],
    active: 0,
    title: t('لوحة الغرف · أكتوبر', 'Room board · October'),
    subtitle: t('كل سطر غرفة، وكل شريط إقامة. اسحب الشريط لتغيير الغرفة أو المدة.', 'Each row is a room and each bar a stay. Drag a bar to move the room or the nights.'),
    actions: [{ label: t('إقفال الغرف', 'Block rooms'), icon: 'lock' }, { label: t('حجز جديد', 'New booking'), icon: 'plus', primary: true }],
    tabs: [t('أسبوعان', 'Two weeks'), t('شهر', 'Month')],
    panelTitle: t('حجز رقم ٨٨١٢', 'Booking 8812'),
    panel: [
      { title: t('عائلة الخطيب', 'The Khatib family'), fields: [
        { kind: 'text', label: t('الإقامة', 'Stay'), value: t('١٤–١٨ أكتوبر · ٤ ليالٍ', '14–18 Oct · 4 nights') },
        { kind: 'select', label: t('الغرفة', 'Room'), value: t('١٠٤ · مطلة على البحر', '104 · Sea view') },
        { kind: 'segment', label: t('الوجبات', 'Board'), options: [t('فطور', 'B&B'), t('نصف', 'Half'), t('كامل', 'Full')], active: 0 },
      ] },
      { title: t('الدفع', 'Payment'), fields: [
        { kind: 'number', label: t('المبلغ', 'Total'), value: '2,640', unit: '₪' },
        { kind: 'toggle', label: t('عربون مدفوع', 'Deposit paid'), on: true },
      ] },
    ],
    stats: [{ label: t('الإشغال', 'Occupancy'), value: '86', unit: '%' }, { label: t('وصول', 'Arrivals'), value: '6' }, { label: t('متوسط الليلة', 'Avg rate'), value: '610', unit: '₪' }, { label: t('غرف جاهزة', 'Rooms ready'), value: '11/14' }],
    status: t('آخر تحديث من القنوات قبل ٣ دقائق', 'Channels updated three minutes ago'),
    view: { kind: 'timeline', lanes: ['101', '102', '103', '104', '201', '202', '203'].map(n => t(n, n)), slots: Array.from({ length: 12 }, (_, i) => t(String(12 + i), String(12 + i))), bars: [
      { lane: 0, from: 0, to: 3, label: t('النابلسي', 'Nabulsi'), tone: 'info' }, { lane: 0, from: 4, to: 9, label: t('مجموعة سياحية', 'Tour group'), tone: 'accent' },
      { lane: 1, from: 1, to: 5, label: t('دانة', 'Dana'), tone: 'ok' }, { lane: 2, from: 0, to: 2, label: t('صيانة', 'Repairs'), tone: 'muted' },
      { lane: 2, from: 3, to: 8, label: t('شهر عسل', 'Honeymoon'), tone: 'accent' }, { lane: 3, from: 2, to: 6, label: t('الخطيب', 'Khatib'), tone: 'warn' },
      { lane: 4, from: 0, to: 6, label: t('مؤتمر', 'Conference'), tone: 'info' }, { lane: 5, from: 5, to: 11, label: t('عائلة عودة', 'Odeh family'), tone: 'ok' },
      { lane: 6, from: 1, to: 4, label: t('سامي', 'Sami'), tone: 'info' }, { lane: 6, from: 7, to: 10, label: t('هالة', 'Hala'), tone: 'ok' },
    ] },
  },

  boutique: {
    name: t('الكتالوج والمخزون', 'Catalogue & stock'),
    search: t('ابحث عن قطعة أو مقاس', 'Search a piece or size'),
    groups: [
      { title: t('المتجر', 'Shop'), items: [
        { label: t('المنتجات', 'Products'), icon: 'shirt' },
        { label: t('الطلبات', 'Orders'), icon: 'shopping-bag', badge: '12' },
        { label: t('العملاء', 'Customers'), icon: 'users' },
      ] },
      { title: t('المحل', 'Store'), items: [{ label: t('المخزون', 'Stock'), icon: 'package' }, { label: t('الخصومات', 'Discounts'), icon: 'percent' }] },
    ],
    active: 0,
    title: t('مجموعة الخريف', 'Autumn collection'),
    subtitle: t('٢٤ قطعة · ٣ قطع أوشكت على النفاد.', '24 pieces · three almost sold out.'),
    actions: [{ label: t('استيراد', 'Import'), icon: 'upload' }, { label: t('منتج جديد', 'New product'), icon: 'plus', primary: true }],
    tabs: [t('الكل', 'All'), t('معروض', 'Live'), t('مسودة', 'Draft')],
    panelTitle: t('تعديل القطعة', 'Edit piece'),
    panel: [
      { title: t('ثوب مطرّز باليد', 'Hand-embroidered thobe'), fields: [
        { kind: 'number', label: t('السعر', 'Price'), value: '420', unit: '₪' },
        { kind: 'chips', label: t('المقاسات', 'Sizes'), options: ['S', 'M', 'L', 'XL'].map(s => t(s, s)), active: [0, 1, 2] },
        { kind: 'select', label: t('القماش', 'Fabric'), value: t('كتان طبيعي', 'Natural linen') },
      ] },
      { title: t('العرض', 'Visibility'), fields: [
        { kind: 'toggle', label: t('معروض في المتجر', 'Live in the shop'), on: true },
        { kind: 'toggle', label: t('ضمن التوصيات', 'In recommendations'), on: true },
      ] },
    ],
    stats: [{ label: t('القطع', 'Pieces'), value: '24' }, { label: t('مبيعات الأسبوع', 'Week sales'), value: '7,350', unit: '₪' }, { label: t('على وشك النفاد', 'Low stock'), value: '3' }, { label: t('مرتجعات', 'Returns'), value: '2', unit: '%' }],
    status: t('المتجر الإلكتروني متزامن مع المحل', 'The online shop is in step with the store'),
    view: { kind: 'grid', tiles: [
      { title: t('ثوب مطرّز', 'Embroidered thobe'), meta: t('٨ قطع', '8 in stock'), price: '420 ₪', img: 758, badge: t('الأكثر طلباً', 'Best seller') },
      { title: t('شال صوف', 'Wool shawl'), meta: t('قطعتان', '2 left'), price: '180 ₪', img: 1059, badge: t('ينفد', 'Low') },
      { title: t('قميص كتان', 'Linen shirt'), meta: t('١٤ قطعة', '14 in stock'), price: '210 ₪', img: 535 },
      { title: t('حقيبة جلد', 'Leather bag'), meta: t('٥ قطع', '5 in stock'), price: '340 ₪', img: 26 },
      { title: t('سترة قصيرة', 'Cropped jacket'), meta: t('قطعة واحدة', '1 left'), price: '390 ₪', img: 604, badge: t('ينفد', 'Low') },
      { title: t('وشاح حرير', 'Silk scarf'), meta: t('١١ قطعة', '11 in stock'), price: '120 ₪', img: 21 },
    ] },
  },

  software: {
    name: t('لوحة القياس', 'Insights'),
    search: t('ابحث في التقارير', 'Search reports'),
    groups: [
      { title: t('المنتج', 'Product'), items: [
        { label: t('نظرة عامة', 'Overview'), icon: 'layout-dashboard' },
        { label: t('المستخدمون', 'Users'), icon: 'users' },
        { label: t('الإيرادات', 'Revenue'), icon: 'trending-up' },
        { label: t('الأحداث', 'Events'), icon: 'activity' },
      ] },
      { title: t('الإعدادات', 'Settings'), items: [{ label: t('التنبيهات', 'Alerts'), icon: 'bell', badge: '2' }, { label: t('التكامل', 'Integrations'), icon: 'plug' }] },
    ],
    active: 0,
    title: t('نظرة عامة', 'Overview'),
    subtitle: t('آخر ١٢ شهراً، كل الخطط.', 'The last 12 months, all plans.'),
    actions: [{ label: t('تصدير', 'Export'), icon: 'download' }, { label: t('مشاركة التقرير', 'Share report'), icon: 'share-2', primary: true }],
    tabs: [t('٧ أيام', '7 days'), t('٣٠ يوماً', '30 days'), t('١٢ شهراً', '12 months')],
    panelTitle: t('الفلاتر', 'Filters'),
    panel: [
      { title: t('الشريحة', 'Segment'), fields: [
        { kind: 'chips', label: t('الخطة', 'Plan'), options: [t('مجانية', 'Free'), t('فريق', 'Team'), t('شركات', 'Business')], active: [1, 2] },
        { kind: 'select', label: t('المنطقة', 'Region'), value: t('الشرق الأوسط', 'Middle East') },
        { kind: 'toggle', label: t('استبعاد الموظفين', 'Exclude staff'), on: true },
      ] },
      { title: t('المقارنة', 'Compare'), fields: [{ kind: 'segment', label: t('مقابل', 'Against'), options: [t('العام الماضي', 'Last year'), t('الهدف', 'Target')], active: 0 }] },
    ],
    stats: [{ label: t('الإيراد الشهري', 'MRR'), value: '$48.2k' }, { label: t('مستخدمون نشطون', 'Active users'), value: '12,940' }, { label: t('التحويل', 'Conversion'), value: '4.8', unit: '%' }, { label: t('الإلغاء', 'Churn'), value: '1.9', unit: '%' }],
    status: t('البيانات حتى منتصف الليل', 'Data up to midnight'),
    view: { kind: 'dashboard', chart: t('الإيراد الشهري', 'Monthly revenue'), months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map(m => t(m, m)), series: [22, 24, 23, 27, 29, 31, 30, 34, 37, 40, 44, 48], series2: [18, 19, 21, 20, 23, 24, 26, 25, 28, 30, 31, 33], legend: [t('هذا العام', 'This year'), t('العام الماضي', 'Last year')], list: t('أكبر القنوات', 'Top channels'), rows: [
      { label: t('بحث مباشر', 'Organic search'), value: '38%', share: 0.38 }, { label: t('إحالات', 'Referrals'), value: '24%', share: 0.24 },
      { label: t('النشرة البريدية', 'Newsletter'), value: '19%', share: 0.19 }, { label: t('شركاء', 'Partners'), value: '11%', share: 0.11 },
    ] },
  },

  photographer: {
    name: t('غرفة الفرز', 'Culling room'),
    search: t('ابحث في الجلسات', 'Search shoots'),
    groups: [
      { title: t('المكتبة', 'Library'), items: [
        { label: t('كل الصور', 'All photos'), icon: 'images' },
        { label: t('المختارة', 'Picks'), icon: 'star', badge: '86' },
        { label: t('المرفوضة', 'Rejects'), icon: 'circle-x' },
      ] },
      { title: t('الجلسات', 'Shoots'), items: [{ label: t('زفاف رام الله', 'Ramallah wedding'), icon: 'heart' }, { label: t('حملة مقهى', 'Cafe campaign'), icon: 'coffee' }, { label: t('بورتريه', 'Portraits'), icon: 'user-round' }] },
    ],
    active: 3,
    title: t('زفاف رام الله · ٦٤٠ صورة', 'Ramallah wedding · 640 photos'),
    subtitle: t('قيّم بالأرقام ١–٥، واختر بحرف P، وارفض بحرف X.', 'Rate with 1–5, pick with P, reject with X.'),
    actions: [{ label: t('مقارنة', 'Compare'), icon: 'columns-2' }, { label: t('تسليم للعميل', 'Deliver to client'), icon: 'send', primary: true }],
    tabs: [t('شبكة', 'Grid'), t('مكبّر', 'Loupe'), t('مقارنة', 'Survey')],
    panelTitle: t('الصورة المحددة', 'Selected photo'),
    panel: [
      { title: t('IMG_4182.CR3', 'IMG_4182.CR3'), fields: [
        { kind: 'text', label: t('العدسة', 'Lens'), value: t('٨٥ مم f/1.4', '85 mm f/1.4') },
        { kind: 'text', label: t('التعريض', 'Exposure'), value: t('١/٥٠٠ · ISO ٢٠٠', '1/500 · ISO 200') },
      ] },
      { title: t('تعديل سريع', 'Quick develop'), fields: [
        { kind: 'range', label: t('التعريض', 'Exposure'), value: 3, min: -10, max: 10 },
        { kind: 'range', label: t('الدفء', 'Warmth'), value: 6, min: -10, max: 10 },
        { kind: 'toggle', label: t('تطبيق على المجموعة', 'Apply to the set'), on: false },
      ] },
    ],
    stats: [{ label: t('مختارة', 'Picks'), value: '86' }, { label: t('مرفوضة', 'Rejects'), value: '212' }, { label: t('باقية', 'Left'), value: '342' }, { label: t('التسليم', 'Due'), value: '3', unit: t('أيام', 'days') }],
    status: t('النسخ الاحتياطي على القرص الخارجي مكتمل', 'Backup to the external drive complete'),
    view: { kind: 'gallery', photos: [
      { img: 1027, rating: 5, flag: 'pick' }, { img: 1015, rating: 3 }, { img: 996, rating: 4, flag: 'pick' }, { img: 1016, rating: 2, flag: 'reject' },
      { img: 1004, rating: 4 }, { img: 901, rating: 5, flag: 'pick' }, { img: 797, rating: 1, flag: 'reject' }, { img: 791, rating: 3 },
      { img: 979, rating: 4 }, { img: 906, rating: 5, flag: 'pick' }, { img: 823, rating: 2 }, { img: 435, rating: 3 },
    ] },
  },

  academy: {
    name: t('محرر الدروس', 'Lesson editor'),
    search: t('ابحث في المساقات', 'Search courses'),
    groups: [
      { title: t('المساق: تصميم الجرافيك', 'Course: Graphic design'), items: [
        { label: t('١. أساسيات الألوان', '1. Colour basics'), icon: 'palette' },
        { label: t('٢. الخطوط العربية', '2. Arabic type'), icon: 'type' },
        { label: t('٣. الشبكات والتخطيط', '3. Grids and layout'), icon: 'grid-2x2' },
        { label: t('٤. مشروع التخرج', '4. Final project'), icon: 'graduation-cap' },
      ] },
      { title: t('الأكاديمية', 'Academy'), items: [{ label: t('الطلاب', 'Students'), icon: 'users', badge: '64' }, { label: t('الواجبات', 'Assignments'), icon: 'clipboard-check' }] },
    ],
    active: 1,
    title: t('الدرس ٢: الخطوط العربية', 'Lesson 2: Arabic type'),
    subtitle: t('مسودة · يُنشر للطلاب يوم الأحد.', 'Draft · goes out to students on Sunday.'),
    actions: [{ label: t('معاينة كطالب', 'Preview as student'), icon: 'eye' }, { label: t('نشر الدرس', 'Publish lesson'), icon: 'send', primary: true }],
    tabs: [t('المحتوى', 'Content'), t('الاختبار', 'Quiz'), t('الملفات', 'Files')],
    panelTitle: t('إعدادات الدرس', 'Lesson settings'),
    panel: [
      { title: t('الوصول', 'Access'), fields: [
        { kind: 'select', label: t('المجموعة', 'Group'), value: t('دفعة خريف ٢٠٢٦', 'Autumn 2026 cohort') },
        { kind: 'segment', label: t('الظهور', 'Visible'), options: [t('الكل', 'Everyone'), t('بعد الدرس ١', 'After lesson 1')], active: 1 },
      ] },
      { title: t('التقييم', 'Grading'), fields: [
        { kind: 'range', label: t('درجة النجاح', 'Pass mark'), value: 70, min: 50, max: 100, unit: '%' },
        { kind: 'toggle', label: t('السماح بإعادة الاختبار', 'Allow retakes'), on: true },
      ] },
    ],
    stats: [{ label: t('مدة القراءة', 'Reading time'), value: '12', unit: 'min' }, { label: t('أسئلة', 'Questions'), value: '5' }, { label: t('أكملوا الدرس ١', 'Finished lesson 1'), value: '52/64' }, { label: t('متوسط الدرجات', 'Avg score'), value: '84', unit: '%' }],
    status: t('حُفظت المسودة تلقائياً', 'Draft saved automatically'),
    view: { kind: 'document', blocks: [
      { kind: 'h', text: t('لماذا يختلف الخط العربي؟', 'Why is Arabic type different?') },
      { kind: 'p', text: t('الحروف العربية تتصل، وشكل الحرف يتغيّر بحسب موقعه في الكلمة. لذلك يُصمَّم الخط العربي كنظام متكامل لا كحروف منفصلة.', 'Arabic letters join, and a letter changes shape with its place in the word. So an Arabic typeface is designed as a whole system, not as separate letters.') },
      { kind: 'media', img: 534, caption: t('نسخ وكوفي ورقعة: ثلاثة أنماط على السطر نفسه.', 'Naskh, Kufi and Ruqaa: three styles on one line.') },
      { kind: 'list', items: [t('اختر خطاً للعناوين وآخر للنص.', 'Pick one face for headings and one for text.'), t('اترك مسافة أسطر أكبر من اللاتيني.', 'Give lines more leading than Latin.'), t('تجنّب تمطيط الحروف لملء السطر.', 'Avoid stretching letters to fill a line.')] },
      { kind: 'quiz', q: t('أي خط يناسب نص قراءة طويل؟', 'Which face suits long reading?'), options: [t('النسخ', 'Naskh'), t('الديواني', 'Diwani'), t('الكوفي المربع', 'Square Kufi')], answer: 0 },
    ] },
  },

  conference: {
    name: t('برنامج المؤتمر', 'Programme planner'),
    search: t('ابحث عن متحدث أو جلسة', 'Find a speaker or session'),
    groups: [
      { title: t('الفعالية', 'Event'), items: [
        { label: t('البرنامج', 'Programme'), icon: 'calendar-range' },
        { label: t('المتحدثون', 'Speakers'), icon: 'mic', badge: '32' },
        { label: t('التذاكر', 'Tickets'), icon: 'ticket' },
        { label: t('تسجيل الحضور', 'Check-in'), icon: 'scan-line' },
      ] },
      { title: t('الرعاة', 'Partners'), items: [{ label: t('الرعاة', 'Sponsors'), icon: 'handshake' }, { label: t('المعرض', 'Expo'), icon: 'store' }] },
    ],
    active: 0,
    title: t('اليوم الأول · ٣ قاعات', 'Day one · three halls'),
    subtitle: t('اسحب الجلسة إلى قاعة أو وقت آخر؛ التعارضات تظهر بالأحمر.', 'Drag a session to another hall or time; clashes show in red.'),
    actions: [{ label: t('طباعة البرنامج', 'Print programme'), icon: 'printer' }, { label: t('جلسة جديدة', 'New session'), icon: 'plus', primary: true }],
    tabs: [t('اليوم ١', 'Day 1'), t('اليوم ٢', 'Day 2')],
    panelTitle: t('الجلسة المحددة', 'Selected session'),
    panel: [
      { title: t('مستقبل المدن الذكية', 'The future of smart cities'), fields: [
        { kind: 'select', label: t('القاعة', 'Hall'), value: t('القاعة الكبرى', 'Main hall') },
        { kind: 'text', label: t('المتحدث', 'Speaker'), value: t('م. ريم العلي', 'Eng. Reem Al-Ali') },
        { kind: 'segment', label: t('الشكل', 'Format'), options: [t('محاضرة', 'Talk'), t('ندوة', 'Panel'), t('ورشة', 'Workshop')], active: 0 },
      ] },
      { title: t('البث', 'Streaming'), fields: [{ kind: 'toggle', label: t('بث مباشر', 'Live stream'), on: true }, { kind: 'toggle', label: t('ترجمة فورية', 'Interpretation'), on: true }] },
    ],
    stats: [{ label: t('تذاكر مباعة', 'Tickets sold'), value: '1,180' }, { label: t('جلسات', 'Sessions'), value: '27' }, { label: t('متحدثون', 'Speakers'), value: '32' }, { label: t('تعارضات', 'Clashes'), value: '1' }],
    status: t('آخر نشر للبرنامج: صباح اليوم', 'Programme last published this morning'),
    view: { kind: 'timeline', lanes: [t('القاعة الكبرى', 'Main hall'), t('قاعة الإبداع', 'Studio'), t('قاعة الورش', 'Workshop room')], slots: ['9', '10', '11', '12', '13', '14', '15', '16'].map(h => t(`${h}:00`, `${h}:00`)), bars: [
      { lane: 0, from: 0, to: 1, label: t('الافتتاح', 'Opening'), tone: 'accent' }, { lane: 0, from: 1, to: 2.5, label: t('المدن الذكية', 'Smart cities'), tone: 'info' },
      { lane: 0, from: 3, to: 4, label: t('استراحة الغداء', 'Lunch'), tone: 'muted' }, { lane: 0, from: 4.5, to: 6, label: t('ندوة الاستثمار', 'Investment panel'), tone: 'info' },
      { lane: 1, from: 1, to: 2, label: t('تصميم الخدمات', 'Service design'), tone: 'ok' }, { lane: 1, from: 2, to: 3.5, label: t('الذكاء الاصطناعي', 'AI in practice'), tone: 'warn' },
      { lane: 1, from: 5, to: 7, label: t('عروض الشركات الناشئة', 'Startup pitches'), tone: 'ok' },
      { lane: 2, from: 1.5, to: 3.5, label: t('ورشة البيانات', 'Data workshop'), tone: 'accent' }, { lane: 2, from: 4.5, to: 6.5, label: t('ورشة القيادة', 'Leadership workshop'), tone: 'info' },
    ] },
  },

  agency: {
    name: t('سير العمل', 'Studio flow'),
    search: t('ابحث في المهام والعملاء', 'Search tasks and clients'),
    groups: [
      { title: t('الاستوديو', 'Studio'), items: [
        { label: t('لوحة المشاريع', 'Project board'), icon: 'kanban' },
        { label: t('العملاء', 'Clients'), icon: 'briefcase' },
        { label: t('الفريق', 'Team'), icon: 'users' },
      ] },
      { title: t('الوقت والمال', 'Time & money'), items: [{ label: t('الساعات', 'Timesheets'), icon: 'clock' }, { label: t('الفواتير', 'Invoices'), icon: 'file-text', badge: '3' }] },
    ],
    active: 0,
    title: t('هوية مقهى «ريحان»', 'Rayhan cafe identity'),
    subtitle: t('١٤ مهمة · التسليم بعد ٩ أيام.', '14 tasks · due in nine days.'),
    actions: [{ label: t('مشاركة مع العميل', 'Share with client'), icon: 'link' }, { label: t('مهمة جديدة', 'New task'), icon: 'plus', primary: true }],
    tabs: [t('لوحة', 'Board'), t('قائمة', 'List'), t('جدول زمني', 'Timeline')],
    panelTitle: t('تفاصيل المهمة', 'Task details'),
    panel: [
      { title: t('تصميم الشعار النهائي', 'Final logo'), fields: [
        { kind: 'select', label: t('المسؤول', 'Owner'), value: t('نور · مصممة', 'Nour · designer') },
        { kind: 'text', label: t('الموعد', 'Due'), value: t('الخميس ١٦ أكتوبر', 'Thu 16 Oct') },
        { kind: 'chips', label: t('الوسوم', 'Tags'), options: [t('شعار', 'Logo'), t('مراجعة', 'Review'), t('عاجل', 'Urgent')], active: [0, 1] },
      ] },
      { title: t('الوقت', 'Time'), fields: [{ kind: 'range', label: t('التقدّم', 'Progress'), value: 70, min: 0, max: 100, unit: '%' }, { kind: 'toggle', label: t('يحتاج موافقة العميل', 'Needs client sign-off'), on: true }] },
    ],
    stats: [{ label: t('مهام', 'Tasks'), value: '14' }, { label: t('منجزة', 'Done'), value: '6' }, { label: t('ساعات', 'Hours'), value: '58' }, { label: t('الميزانية', 'Budget'), value: '72', unit: '%' }],
    status: t('العميل شاهد آخر تحديث', 'The client has seen the latest update'),
    view: { kind: 'kanban', columns: [
      { title: t('للعمل', 'To do'), tone: 'muted', cards: [
        { title: t('قوائم الطعام', 'Menu boards'), meta: t('٣ مقاسات', 'Three sizes'), who: 'Sa' },
        { title: t('أكواب وتغليف', 'Cups and packaging'), meta: t('بانتظار المقاسات', 'Waiting for sizes'), who: 'No' },
      ] },
      { title: t('قيد العمل', 'Doing'), tone: 'info', cards: [
        { title: t('الشعار النهائي', 'Final logo'), meta: t('٧٠٪', '70%'), tag: t('مراجعة', 'Review'), who: 'No' },
        { title: t('لوحة الألوان', 'Colour palette'), meta: t('خياران', 'Two options'), who: 'Ah' },
      ] },
      { title: t('مراجعة العميل', 'Client review'), tone: 'warn', cards: [{ title: t('الخط العربي للعلامة', 'Arabic wordmark'), meta: t('أُرسلت أمس', 'Sent yesterday'), tag: t('عاجل', 'Urgent'), who: 'Ah' }] },
      { title: t('منجز', 'Done'), tone: 'ok', cards: [{ title: t('بحث المنافسين', 'Competitor research'), meta: t('٢٠ مقهى', '20 cafes'), who: 'Sa' }, { title: t('لوحة الإلهام', 'Moodboard'), meta: t('معتمدة', 'Approved'), who: 'No' }] },
    ] },
  },
};

export function app(id: ProfileId): AppContent {
  const found = APPS[id];
  if (!found) throw new Error(`No app for "${id}"`);
  return found;
}
