import type { BuilderOption, FingerprintAxis } from "./types";

export interface BuilderStep {
  id: string;
  key: keyof ConstitutionConfig;
  titleFa: string;
  titleEn: string;
  leadFa?: string;
  options: BuilderOption[];
}

/** Selection ids chosen in the constitution builder. */
export interface ConstitutionConfig {
  headOfState: string;
  headOfGovernment: string;
  selection: string;
  legislature: string;
  elections: string;
  judiciary: string;
  constitution: string;
  territory: string;
  media: string;
  emergency: string;
}

export const builderSteps: BuilderStep[] = [
  {
    id: "01",
    key: "headOfState",
    titleFa: "رئیس کشور",
    titleEn: "Head of State",
    options: [
      { id: "monarch", labelFa: "پادشاه / ملکه", labelEn: "Monarch" },
      { id: "president", labelFa: "رئیس‌جمهور", labelEn: "President" },
      { id: "council", labelFa: "شورا", labelEn: "Council" },
      { id: "none", labelFa: "بدون مقام جدا", labelEn: "None" },
    ],
  },
  {
    id: "02",
    key: "headOfGovernment",
    titleFa: "رئیس دولت",
    titleEn: "Head of Government",
    options: [
      { id: "primeMinister", labelFa: "نخست‌وزیر", labelEn: "Prime Minister" },
      { id: "president", labelFa: "رئیس‌جمهور", labelEn: "President" },
      { id: "council", labelFa: "شورا", labelEn: "Council" },
    ],
  },
  {
    id: "03",
    key: "selection",
    titleFa: "گزینش رئیس کشور یا رئیس دولت",
    titleEn: "How the head of state or government is chosen",
    leadFa:
      "مقام موروثی و انتخاب مستقیم یا غیرمستقیم معمولاً رئیس کشور را تعیین می‌کنند؛ انتخاب پارلمانی هم رئیس دولت را.",
    options: [
      {
        id: "hereditary",
        labelFa: "موروثی",
        labelEn: "Hereditary",
        descFa:
          "مقام از راه تبار و جانشینی خانوادگی منتقل می‌شود؛ مردم در انتخاب آن نقشی ندارند.",
      },
      {
        id: "direct",
        labelFa: "انتخاب مستقیم",
        labelEn: "Direct election",
        descFa:
          "مردم مستقیماً به خود آن مقام رأی می‌دهند — معمولاً رئیس کشور، مثل رئیس‌جمهور منتخب.",
      },
      {
        id: "indirect",
        labelFa: "انتخاب غیرمستقیم",
        labelEn: "Indirect election",
        descFa:
          "هیئت یا مجلسی که خودش منتخب مردم است این مقام را برمی‌گزیند؛ مردم مستقیماً به آن فرد رأی نمی‌دهند.",
      },
      {
        id: "parliamentary",
        labelFa: "انتخاب پارلمانی",
        labelEn: "Parliamentary selection",
        descFa:
          "اکثریت مجلس رئیس دولت — معمولاً نخست‌وزیر — را تعیین یا تأیید می‌کند.",
      },
      {
        id: "appointment",
        labelFa: "انتصاب",
        labelEn: "Appointment",
        descFa:
          "یک فرد یا نهاد، بدون هیچ رقابت انتخاباتی، این مقام را منصوب می‌کند.",
      },
    ],
  },
  {
    id: "04",
    key: "legislature",
    titleFa: "قوهٔ مقننه",
    titleEn: "Legislature",
    options: [
      {
        id: "unicameral-weak",
        labelFa: "تک‌مجلسی · ضعیف",
        labelEn: "One chamber · Weak",
      },
      {
        id: "unicameral-balanced",
        labelFa: "تک‌مجلسی · متعادل",
        labelEn: "One chamber · Balanced",
      },
      {
        id: "unicameral-strong",
        labelFa: "تک‌مجلسی · قوی",
        labelEn: "One chamber · Strong",
      },
      {
        id: "bicameral-weak",
        labelFa: "دو مجلسی · ضعیف",
        labelEn: "Two chambers · Weak",
      },
      {
        id: "bicameral-balanced",
        labelFa: "دو مجلسی · متعادل",
        labelEn: "Two chambers · Balanced",
      },
      {
        id: "bicameral-strong",
        labelFa: "دو مجلسی · قوی",
        labelEn: "Two chambers · Strong",
      },
    ],
  },
  {
    id: "05",
    key: "elections",
    titleFa: "انتخابات",
    titleEn: "Elections",
    leadFa:
      "نظام‌های اکثریتی، تناسبی و مختلط تعیین می‌کنند که رأی مردم چگونه به کرسی تبدیل می‌شود؛ دو گزینهٔ آخر می‌گویند میدان رقابت اصلاً تا چه اندازه باز است.",
    options: [
      {
        id: "fptp",
        labelFa: "اکثریتی",
        labelEn: "First-past-the-post",
        descFa:
          "در هر حوزه، هرکس بیشترین رأی را بیاورد برنده است — حتی بدون اکثریت مطلق. نتیجه معمولاً تقویت دو حزب بزرگ است و سهم کرسی‌ها می‌تواند از سهم آرا فاصله بگیرد.",
      },
      {
        id: "proportional",
        labelFa: "تناسبی",
        labelEn: "Proportional",
        descFa:
          "کرسی‌ها تقریباً به نسبت آرای هر حزب تقسیم می‌شوند. احزاب کوچک‌تر هم شانس ورود دارند و دولت‌ها بیشتر ائتلافی‌اند.",
      },
      {
        id: "mixed",
        labelFa: "مختلط",
        labelEn: "Mixed",
        descFa:
          "بخشی از نمایندگان از حوزه‌های انتخابیه می‌آیند و بخشی از فهرست‌های حزبی. نتیجه جایی میان نظام اکثریتی و تناسبی می‌ایستد؛ گاهی فهرست حزبی نابرابری حوزه‌ها را جبران می‌کند و گاهی نه.",
      },
      {
        id: "limited",
        labelFa: "رقابت محدود",
        labelEn: "Limited competition",
        descFa:
          "انتخابات چندحزبی برگزار می‌شود، اما میدان با ابزار قانون، رسانه و نظارت به سود حاکم شیب دارد. جابه‌جایی قدرت ناممکن نیست، اما دشوار است.",
      },
      {
        id: "none",
        labelFa: "بدون رقابت واقعی",
        labelEn: "No competitive elections",
        descFa:
          "ممکن است ظاهر انتخابات برپا باشد، اما نتیجه تقریباً از پیش معلوم است. قدرت از راه رأی رقابتی دست‌به‌دست نمی‌شود.",
      },
    ],
  },
  {
    id: "06",
    key: "judiciary",
    titleFa: "قوهٔ قضائیه",
    titleEn: "Judiciary",
    options: [
      { id: "dependent", labelFa: "وابسته", labelEn: "Dependent" },
      {
        id: "partial",
        labelFa: "نیمه‌مستقل",
        labelEn: "Partially independent",
      },
      {
        id: "independent",
        labelFa: "قوی و مستقل",
        labelEn: "Strongly independent",
      },
    ],
  },
  {
    id: "07",
    key: "constitution",
    titleFa: "قانون اساسی",
    titleEn: "Constitution",
    options: [
      { id: "flexible", labelFa: "انعطاف‌پذیر", labelEn: "Flexible" },
      {
        id: "moderate",
        labelFa: "نسبتاً سخت",
        labelEn: "Moderately entrenched",
      },
      {
        id: "entrenched",
        labelFa: "بسیار سخت",
        labelEn: "Strongly entrenched",
      },
    ],
  },
  {
    id: "08",
    key: "territory",
    titleFa: "ساختار سرزمینی",
    titleEn: "Territorial structure",
    options: [
      { id: "unitary", labelFa: "واحد", labelEn: "Unitary" },
      { id: "federal", labelFa: "فدرال", labelEn: "Federal" },
      {
        id: "decentralized",
        labelFa: "بسیار تمرکززدایی‌شده",
        labelEn: "Highly decentralized",
      },
    ],
  },
  {
    id: "09",
    key: "media",
    titleFa: "رسانه",
    titleEn: "Media",
    options: [
      {
        id: "state",
        labelFa: "تحت کنترل دولت",
        labelEn: "State-controlled",
      },
      { id: "restricted", labelFa: "محدود", labelEn: "Restricted" },
      { id: "independent", labelFa: "مستقل", labelEn: "Independent" },
    ],
  },
  {
    id: "10",
    key: "emergency",
    titleFa: "اختیارات اضطراری",
    titleEn: "Emergency powers",
    options: [
      { id: "weak", labelFa: "ضعیف", labelEn: "Weak" },
      { id: "moderate", labelFa: "متوسط", labelEn: "Moderate" },
      { id: "strong", labelFa: "قوی", labelEn: "Strong" },
    ],
  },
];

/** First five steps are the required path; the rest sit behind "قواعد بیشتر". */
export const CORE_STEP_COUNT = 5;

export const coreBuilderSteps = builderSteps.slice(0, CORE_STEP_COUNT);
export const extraBuilderSteps = builderSteps.slice(CORE_STEP_COUNT);

/** Balanced parliamentary-leaning default for first load. */
export const defaultConfig: ConstitutionConfig = {
  headOfState: "president",
  headOfGovernment: "primeMinister",
  selection: "parliamentary",
  legislature: "bicameral-balanced",
  elections: "proportional",
  judiciary: "independent",
  constitution: "moderate",
  territory: "federal",
  media: "independent",
  emergency: "moderate",
};

export const fingerprintAxes: FingerprintAxis[] = [
  {
    id: "executiveConcentration",
    labelFa: "تمرکز قدرت اجرایی",
    labelEn: "Executive concentration",
  },
  {
    id: "legislativeStrength",
    labelFa: "قدرت قانون‌گذاری",
    labelEn: "Legislative strength",
  },
  {
    id: "judicialIndependence",
    labelFa: "استقلال قضایی",
    labelEn: "Judicial independence",
  },
  {
    id: "electoralCompetition",
    labelFa: "رقابت انتخاباتی",
    labelEn: "Electoral competition",
  },
  {
    id: "decentralization",
    labelFa: "تمرکززدایی",
    labelEn: "Decentralization",
  },
  {
    id: "constitutionalConstraints",
    labelFa: "محدودیت‌های قانون اساسی",
    labelEn: "Constitutional constraints",
  },
  {
    id: "mediaIndependence",
    labelFa: "استقلال رسانه",
    labelEn: "Media independence",
  },
  {
    id: "leadershipTurnover",
    labelFa: "گردش رهبری",
    labelEn: "Leadership turnover",
  },
  {
    id: "partyCompetition",
    labelFa: "رقابت حزبی",
    labelEn: "Party competition",
  },
  {
    id: "civilianControl",
    labelFa: "کنترل غیرنظامی بر نیروهای مسلح",
    labelEn: "Civilian control",
  },
  {
    id: "accountability",
    labelFa: "پاسخ‌گویی",
    labelEn: "Accountability",
  },
];

export const builderStepsByKey: Record<
  keyof ConstitutionConfig,
  BuilderStep
> = Object.fromEntries(builderSteps.map((s) => [s.key, s])) as Record<
  keyof ConstitutionConfig,
  BuilderStep
>;
