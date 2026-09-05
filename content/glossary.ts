import type { GlossaryTerm } from "./types";

export const glossary: GlossaryTerm[] = [
  {
    id: "separation-of-powers",
    termFa: "تفکیک قوا",
    termEn: "Separation of powers",
    shortDefFa:
      "تقسیم اختیار میان قوهٔ مقننه، مجریه و قضائیه برای جلوگیری از تمرکز قدرت در یک نهاد.",
    relatedConceptIds: ["parliament", "government", "courts"],
  },
  {
    id: "federalism",
    termFa: "فدرالیسم",
    termEn: "Federalism",
    shortDefFa:
      "تقسیم رسمی اختیار میان دولت مرکزی و واحدهای منطقه‌ای که هرکدام حوزهٔ مستقل تصمیم‌گیری دارند.",
  },
  {
    id: "proportional-representation",
    termFa: "نظام تناسبی",
    termEn: "Proportional representation",
    shortDefFa:
      "سیستم انتخاباتی که کرسی‌های مجلس را متناسب با سهم آرای هر حزب تقسیم می‌کند.",
    relatedConceptIds: ["elections", "parties"],
  },
  {
    id: "fptp",
    termFa: "نظام اکثریتی (اکثریت نسبی)",
    termEn: "First-past-the-post",
    shortDefFa:
      "کاندیدای دارای بیشترین رأی در هر حوزه برنده می‌شود، حتی بدون اکثریت مطلق.",
    relatedConceptIds: ["elections"],
  },
  {
    id: "no-confidence-vote",
    termFa: "رأی عدم اعتماد",
    termEn: "Vote of no confidence",
    shortDefFa: "ابزار پارلمانی برای برکناری دولت با رأی اکثریت نمایندگان.",
    relatedConceptIds: ["parliament", "government"],
  },
  {
    id: "judicial-review",
    termFa: "بازبینی قضایی",
    termEn: "Judicial review",
    shortDefFa:
      "اختیار دادگاه برای باطل کردن قانون یا اقدام دولتی مغایر با قانون اساسی.",
    relatedConceptIds: ["courts", "constitution"],
  },
  {
    id: "veto-player",
    termFa: "بازیگر وتو",
    termEn: "Veto player",
    shortDefFa:
      "هر نهاد یا فرد که می‌تواند مانع تغییر وضع موجود شود؛ افزایش شمار این بازیگران، تغییر سیاست را دشوارتر می‌کند.",
  },
  {
    id: "executive-aggrandizement",
    termFa: "تمرکزگرایی اجرایی",
    termEn: "Executive aggrandizement",
    shortDefFa:
      "تضعیف تدریجی نظارت‌ها توسط قوهٔ مجریهٔ منتخب، بدون کودتا یا لغو رسمی انتخابات.",
    relatedConceptIds: ["government", "president"],
  },
  {
    id: "competitive-authoritarianism",
    termFa: "اقتدارگرایی رقابتی",
    termEn: "Competitive authoritarianism",
    shortDefFa:
      "نظامی با انتخابات چندحزبی واقعی که میدان رقابت به‌شدت به نفع حزب حاکم کج است.",
    relatedConceptIds: ["elections", "parties"],
  },
  {
    id: "democratic-backsliding",
    termFa: "افول دموکراتیک",
    termEn: "Democratic backsliding",
    shortDefFa:
      "کاهش تدریجی کیفیت دموکراسی از درون، معمولاً با حفظ ظاهر نهادهای انتخاباتی.",
  },
  {
    id: "ceremonial-head-of-state",
    termFa: "رئیس تشریفاتی",
    termEn: "Ceremonial head of state",
    shortDefFa: "مقامی با کارکرد نمادین که اختیار اجرایی روزمره ندارد.",
    relatedConceptIds: ["president"],
  },
  {
    id: "minority-government",
    termFa: "دولت اقلیت",
    termEn: "Minority government",
    shortDefFa:
      "دولتی که بدون اکثریت مطلق در پارلمان، با تحمل ضمنی احزاب دیگر ادامه می‌یابد.",
    relatedConceptIds: ["government", "parliament"],
  },
  {
    id: "governing-coalition",
    termFa: "ائتلاف حاکم",
    termEn: "Governing coalition",
    shortDefFa: "اتحاد چند حزب برای تشکیل اکثریت پارلمانی و دولت مشترک.",
    relatedConceptIds: ["parties", "government"],
  },
  {
    id: "dissolution-of-parliament",
    termFa: "انحلال مجلس",
    termEn: "Dissolution of parliament",
    shortDefFa: "پایان زودهنگام دورهٔ مجلس و فراخوان انتخابات جدید.",
    relatedConceptIds: ["parliament", "elections"],
  },
  {
    id: "impeachment",
    termFa: "استیضاح",
    termEn: "Impeachment",
    shortDefFa:
      "فرایند رسمی اتهام و برکناری یک مقام (اغلب رئیس‌جمهور) توسط مجلس یا نهاد ویژه.",
    relatedConceptIds: ["parliament", "president"],
  },
  {
    id: "executive-decree",
    termFa: "حکم اجرایی",
    termEn: "Executive order / decree",
    shortDefFa:
      "دستور رئیس کشور یا دولت که بدون تصویب مجلس اجرا می‌شود؛ حدودش نظام به نظام فرق دارد.",
    relatedConceptIds: ["government"],
  },
  {
    id: "electoral-threshold",
    termFa: "آستانهٔ انتخاباتی",
    termEn: "Electoral threshold",
    shortDefFa:
      "حداقل درصد آرای لازم برای ورود حزب به مجلس در نظام تناسبی.",
    relatedConceptIds: ["elections", "parties"],
  },
  {
    id: "alternation-in-power",
    termFa: "جابه‌جایی قدرت",
    termEn: "Alternation in power",
    shortDefFa:
      "انتقال واقعی قدرت اجرایی از یک حزب/فرد به رقیب از طریق انتخابات.",
    relatedConceptIds: ["elections"],
  },
  {
    id: "independent-oversight-body",
    termFa: "نهاد ناظر مستقل",
    termEn: "Independent oversight body",
    shortDefFa:
      "سازمان تخصصی (کمیسیون انتخابات، دیوان محاسبات، نهاد ضدفساد) که باید فارغ از فشار سیاسی روزمره کار کند.",
  },
  {
    id: "state-vs-public-media",
    termFa: "رسانهٔ دولتی در برابر رسانهٔ عمومی",
    termEn: "State media vs. public broadcaster",
    shortDefFa:
      "رسانهٔ دولتی مستقیماً زیر کنترل دولت است؛ رسانهٔ عمومی با تأمین مالی مستقل و هیئت نظارتی بی‌طرف اداره می‌شود.",
    relatedConceptIds: ["media"],
  },
  {
    id: "civilian-control",
    termFa: "کنترل غیرنظامی بر ارتش",
    termEn: "Civilian control of the military",
    shortDefFa:
      "اصل اینکه تصمیم نهایی دربارهٔ کاربرد نیروی مسلح با مقام‌های منتخب غیرنظامی باشد.",
    relatedConceptIds: ["military"],
  },
  {
    id: "self-coup",
    termFa: "کودتای خزنده",
    termEn: "Self-coup (autogolpe)",
    shortDefFa:
      "تصرف قدرت فوق‌قانونی توسط مقامی که خودش از مسیر قانونی به قدرت رسیده، مثلاً منحل‌کردن غیرقانونی مجلس.",
    relatedConceptIds: ["president", "parliament"],
  },
  {
    id: "legitimacy",
    termFa: "مشروعیت",
    termEn: "Legitimacy",
    shortDefFa:
      "پذیرش عمومی حق حکومت‌کردن یک نهاد یا فرد، فارغ از مسیر رسیدنش به قدرت.",
    relatedConceptIds: ["people"],
  },
  {
    id: "rule-of-law",
    termFa: "حاکمیت قانون",
    termEn: "Rule of law",
    shortDefFa:
      "اصل اینکه هیچ فرد یا نهادی — از جمله حکومت — بالاتر از قانون نیست.",
    relatedConceptIds: ["courts", "constitution"],
  },
  {
    id: "ethnic-federalism",
    termFa: "فدرالیسم قومی",
    termEn: "Ethnic federalism",
    shortDefFa:
      "تقسیم واحدهای فدرال بر اساس مرزهای قومی/زبانی به‌جای مرزهای اداری صرف.",
  },
  {
    id: "bicameral",
    termFa: "قوهٔ مقننهٔ دو مجلسی",
    termEn: "Bicameral legislature",
    shortDefFa:
      "مجلسی متشکل از دو اتاق که معمولاً هرکدام اختیارات متفاوتی دارند.",
    relatedConceptIds: ["parliament"],
  },
  {
    id: "parliamentary-immunity",
    termFa: "مصونیت پارلمانی",
    termEn: "Parliamentary immunity",
    shortDefFa:
      "حفاظت قانونی نمایندگان از پیگرد قضایی برای اقدامات مرتبط با وظیفهٔ نمایندگی.",
    relatedConceptIds: ["parliament"],
  },
  {
    id: "referendum",
    termFa: "رفراندوم",
    termEn: "Referendum",
    shortDefFa:
      "رأی‌گیری مستقیم مردم روی یک پرسش سیاستی یا قانون اساسی مشخص، جدا از انتخاب نماینده.",
    relatedConceptIds: ["people", "constitution"],
  },
  {
    id: "intra-party-competition",
    termFa: "رقابت درون‌حزبی",
    termEn: "Intra-party competition",
    shortDefFa:
      "رقابت جناح‌ها یا کاندیداهای مختلف درون یک حزب واحد برای کسب مقام یا نامزدی.",
    relatedConceptIds: ["parties"],
  },
  {
    id: "institutional-capture",
    termFa: "مصادرهٔ نهادی",
    termEn: "Institutional capture",
    shortDefFa:
      "روندی که در آن نهاد ناظر (دادگاه، رسانه، کمیسیون انتخابات) عملاً کنترلش به دست بازیگری می‌افتد که باید نظارتش کند.",
    relatedConceptIds: ["courts", "media", "elections"],
  },
];

export const glossaryById: Record<string, GlossaryTerm> = Object.fromEntries(
  glossary.map((t) => [t.id, t]),
);
