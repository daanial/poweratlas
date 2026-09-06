import type { PowerMapEdge, PowerMapNode } from "./types";

/** Full-screen Power Map nodes (layout in 0–100 space). */
export const powerMapNodes: PowerMapNode[] = [
  {
    id: "people",
    x: 50,
    y: 8,
    labelFa: "مردم",
    labelEn: "People",
    questionsFa: [
      "مردم از چه مسیری بر قدرت اثر می‌گذارند؟",
      "آیا فشار عمومی به تغییر تصمیم منجر می‌شود؟",
    ],
    explanationFa:
      "منبع مشروعیت و فشار سیاسی. بدون کانال واقعی، «مردم» روی کاغذ می‌مانند.",
  },
  {
    id: "elections",
    x: 50,
    y: 22,
    labelFa: "انتخابات",
    labelEn: "Elections",
    questionsFa: [
      "چه کسی می‌تواند نامزد شود؟",
      "آیا نتیجه می‌تواند قدرت را جابه‌جا کند؟",
    ],
    explanationFa:
      "ابزار گزینش و گردش. معنایش به رقابت، اطلاعات و اجرای نتیجه وابسته است.",
  },
  {
    id: "parliament",
    x: 22,
    y: 38,
    labelFa: "پارلمان",
    labelEn: "Parliament",
    questionsFa: [
      "چه کسی پارلمان را انتخاب می‌کند؟",
      "آیا پارلمان می‌تواند دولت را برکنار کند؟",
      "آیا پارلمان خودش مستقل است؟",
    ],
    explanationFa:
      "نهاد قانون‌گذاری و نظارت. قدرت واقعی‌اش از ابزار برکناری و کنترل بودجه می‌آید.",
  },
  {
    id: "government",
    x: 78,
    y: 38,
    labelFa: "دولت",
    labelEn: "Government",
    questionsFa: [
      "دولت به چه کسی پاسخ می‌دهد؟",
      "چه کسی می‌تواند تصمیم اجرایی را متوقف کند؟",
    ],
    explanationFa:
      "دستگاه اجرا. بدون نظارت، اختیار اجرایی سریع متمرکز می‌شود.",
  },
  {
    id: "president",
    x: 88,
    y: 22,
    labelFa: "رئیس‌جمهور",
    labelEn: "President",
    questionsFa: [
      "رئیس‌جمهور چگونه انتخاب می‌شود؟",
      "آیا عنوان با اختیار واقعی یکی است؟",
    ],
    explanationFa:
      "مقام ریاست ممکن است تشریفاتی، اجرایی یا ترکیبی باشد. عنوان به‌تنهایی قدرت را ثابت نمی‌کند.",
  },
  {
    id: "primeMinister",
    x: 68,
    y: 52,
    labelFa: "نخست‌وزیر",
    labelEn: "Prime Minister",
    questionsFa: [
      "نخست‌وزیر به پارلمان وابسته است یا به رئیس‌جمهور؟",
      "چگونه برکنار می‌شود؟",
    ],
    explanationFa:
      "اغلب رأس دولت در نظام‌های پارلمانی یا نیمه‌ریاستی؛ بقایش معمولاً به حمایت مجلس گره خورده است.",
  },
  {
    id: "monarch",
    x: 12,
    y: 22,
    labelFa: "پادشاه",
    labelEn: "Monarch",
    questionsFa: [
      "اختیار سلطنت محدود است یا گسترده؟",
      "چه نهادی می‌تواند پادشاه را محدود کند؟",
    ],
    explanationFa:
      "مقام موروثی. می‌تواند نماد وحدت باشد یا محور تصمیم؛ اندازهٔ قدرت جدا از عنوان است.",
  },
  {
    id: "courts",
    x: 28,
    y: 68,
    labelFa: "دادگاه",
    labelEn: "Courts",
    questionsFa: [
      "آیا دادگاه می‌تواند به قدرت «نه» بگوید؟",
      "قضات چگونه منصوب و عزل می‌شوند؟",
    ],
    explanationFa:
      "بازبینی قانونی اعمال حکومت. استقلال یعنی امکان ایستادن در برابر قوهٔ اجرایی.",
  },
  {
    id: "constitution",
    x: 50,
    y: 88,
    labelFa: "قانون اساسی",
    labelEn: "Constitution",
    questionsFa: [
      "چه کسی قانون اساسی را تفسیر می‌کند؟",
      "تغییر قواعد چقدر سخت است؟",
    ],
    explanationFa:
      "چارچوب قواعد. ارزشش به متن نیست؛ به نهادهایی است که بتوانند آن را اجرا کنند.",
  },
  {
    id: "parties",
    x: 35,
    y: 28,
    labelFa: "احزاب",
    labelEn: "Parties",
    questionsFa: [
      "آیا بیش از یک حزب مسیر رسیدن به قدرت دارد؟",
      "انضباط حزبی چه قدرتی دارد؟",
    ],
    explanationFa:
      "سازمان‌دهی رقابت و انضباط نمایندگان. می‌توانند متکثر باشند یا کانال انحصاری.",
  },
  {
    id: "media",
    x: 72,
    y: 68,
    labelFa: "رسانه",
    labelEn: "Media",
    questionsFa: [
      "چه کسی جریان اطلاعات را کنترل می‌کند؟",
      "آیا انتقاد هزینه‌بر است؟",
    ],
    explanationFa:
      "کانال اطلاعات و نظارت غیررسمی. وابستگی رسانه‌ای، پاسخ‌گویی را تضعیف می‌کند.",
  },
  {
    id: "military",
    x: 88,
    y: 78,
    labelFa: "ارتش",
    labelEn: "Military",
    questionsFa: [
      "نیروی مسلح تابع کیست؟",
      "آیا ارتش در سیاست حق وتو دارد؟",
    ],
    explanationFa:
      "ابزار اجبار مشروع در دولت مدرن. ورودش به سیاست، نقشهٔ قدرت را جابه‌جا می‌کند.",
  },
  {
    id: "independentBodies",
    x: 12,
    y: 78,
    labelFa: "نهادهای مستقل",
    labelEn: "Independent bodies",
    questionsFa: [
      "کمیسیون‌ها و نهادهای ناظر چقدر مصون‌اند؟",
      "بودجه و عزل‌شان دست کیست؟",
    ],
    explanationFa:
      "نهادهای تخصصی (انتخابات، مبارزه با فساد، تنظیم‌گری) که می‌توانند قوهٔ اجرایی را محدود کنند.",
  },
  {
    id: "civilSociety",
    x: 50,
    y: 52,
    labelFa: "جامعه مدنی",
    labelEn: "Civil society",
    questionsFa: [
      "سازمان‌های مستقل چقدر آزادی عمل دارند؟",
      "آیا می‌توانند ائتلاف فشار بسازند؟",
    ],
    explanationFa:
      "اتحادیه‌ها، انجمن‌ها و شبکه‌های داوطلبانه میان فرد و دولت. فضای‌شان بر هزینهٔ تمرکز قدرت اثر می‌گذارد.",
  },
];

export const powerMapEdges: PowerMapEdge[] = [
  {
    id: "people-elections",
    from: "people",
    to: "elections",
    kind: "votes",
    labelFa: "رأی",
  },
  {
    id: "elections-parliament",
    from: "elections",
    to: "parliament",
    kind: "votes",
    labelFa: "نمایندگی",
  },
  {
    id: "elections-president",
    from: "elections",
    to: "president",
    kind: "votes",
    labelFa: "انتخاب",
  },
  {
    id: "parliament-government",
    from: "parliament",
    to: "government",
    kind: "authority",
    labelFa: "اعتماد / قانون",
  },
  {
    id: "government-parliament",
    from: "government",
    to: "parliament",
    kind: "accountability",
    labelFa: "پاسخ‌گویی",
  },
  {
    id: "parliament-pm",
    from: "parliament",
    to: "primeMinister",
    kind: "authority",
    labelFa: "انتخاب / برکناری",
  },
  {
    id: "president-government",
    from: "president",
    to: "government",
    kind: "authority",
    labelFa: "هدایت اجرایی",
  },
  {
    id: "president-pm",
    from: "president",
    to: "primeMinister",
    kind: "authority",
    labelFa: "انتصاب / تنش",
  },
  {
    id: "pm-government",
    from: "primeMinister",
    to: "government",
    kind: "authority",
    labelFa: "ریاست دولت",
  },
  {
    id: "monarch-government",
    from: "monarch",
    to: "government",
    kind: "authority",
    labelFa: "تشریفات یا اختیار",
  },
  {
    id: "constitution-parliament",
    from: "constitution",
    to: "parliament",
    kind: "authority",
    labelFa: "حدود اختیارات",
  },
  {
    id: "constitution-government",
    from: "constitution",
    to: "government",
    kind: "authority",
    labelFa: "حدود اختیارات",
  },
  {
    id: "constitution-courts",
    from: "constitution",
    to: "courts",
    kind: "authority",
    labelFa: "معیار داوری",
  },
  {
    id: "courts-government",
    from: "courts",
    to: "government",
    kind: "accountability",
    labelFa: "بازبینی",
  },
  {
    id: "courts-parliament",
    from: "courts",
    to: "parliament",
    kind: "accountability",
    labelFa: "بازبینی",
  },
  {
    id: "parties-elections",
    from: "parties",
    to: "elections",
    kind: "information",
    labelFa: "نامزد و برنامه",
  },
  {
    id: "parties-parliament",
    from: "parties",
    to: "parliament",
    kind: "authority",
    labelFa: "انضباط",
  },
  {
    id: "media-people",
    from: "media",
    to: "people",
    kind: "information",
    labelFa: "خبر و نقد",
  },
  {
    id: "media-government",
    from: "media",
    to: "government",
    kind: "accountability",
    labelFa: "نظارت",
  },
  {
    id: "military-government",
    from: "military",
    to: "government",
    kind: "coercion",
    labelFa: "اجبار / نفوذ",
  },
  {
    id: "government-military",
    from: "government",
    to: "military",
    kind: "authority",
    labelFa: "فرماندهی",
  },
  {
    id: "independent-elections",
    from: "independentBodies",
    to: "elections",
    kind: "authority",
    labelFa: "نظارت برگزاری",
  },
  {
    id: "civil-people",
    from: "civilSociety",
    to: "people",
    kind: "information",
    labelFa: "سازمان‌دهی",
  },
  {
    id: "civil-government",
    from: "civilSociety",
    to: "government",
    kind: "accountability",
    labelFa: "فشار",
  },
  {
    id: "people-civil",
    from: "people",
    to: "civilSociety",
    kind: "votes",
    labelFa: "عضویت / حمایت",
  },

  // Removal / veto layer: who can end another actor's hold on power, not
  // just who oversees or answers to whom. A node with no incoming edge
  // here is the practical answer to "چه کسی می‌تواند به این نه بگوید؟".
  {
    id: "parliament-government-removal",
    from: "parliament",
    to: "government",
    kind: "removal",
    labelFa: "رأی عدم اعتماد",
  },
  {
    id: "parliament-pm-removal",
    from: "parliament",
    to: "primeMinister",
    kind: "removal",
    labelFa: "رأی عدم اعتماد",
  },
  {
    id: "parliament-president-removal",
    from: "parliament",
    to: "president",
    kind: "removal",
    labelFa: "استیضاح",
  },
  {
    id: "parliament-courts-removal",
    from: "parliament",
    to: "courts",
    kind: "removal",
    labelFa: "استیضاح قضات",
  },
  {
    id: "president-pm-removal",
    from: "president",
    to: "primeMinister",
    kind: "removal",
    labelFa: "عزل",
  },
  {
    id: "president-government-removal",
    from: "president",
    to: "government",
    kind: "removal",
    labelFa: "عزل دولت",
  },
  {
    id: "courts-government-removal",
    from: "courts",
    to: "government",
    kind: "removal",
    labelFa: "ابطال حکم اجرایی",
  },
  {
    id: "courts-parliament-removal",
    from: "courts",
    to: "parliament",
    kind: "removal",
    labelFa: "ابطال مصوبه",
  },
  {
    id: "military-government-removal",
    from: "military",
    to: "government",
    kind: "removal",
    labelFa: "کودتا",
  },
  {
    id: "independent-elections-removal",
    from: "independentBodies",
    to: "elections",
    kind: "removal",
    labelFa: "رد صلاحیت / ابطال نتیجه",
  },
];

/** Node ids checked for "no one can formally end this actor's tenure" —
 * limited to actors that actually hold power, not sources of legitimacy
 * (people, elections, parties, media, civil society) or the rulebook itself. */
export const removalCheckNodeIds: readonly string[] = [
  "government",
  "president",
  "primeMinister",
  "monarch",
  "parliament",
  "courts",
  "military",
];

export const powerMapNodesById: Record<string, PowerMapNode> =
  Object.fromEntries(powerMapNodes.map((n) => [n.id, n]));
