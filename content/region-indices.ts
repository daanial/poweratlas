import type {
  RegionIndexCountry,
  RegionIndexLayer,
  RegionIndexLayerId,
} from "./types";

/** Freedom House 2026 + World Bank WGI 2024 for Iran, land neighbors, and Gulf states. */
export const regionIndexCountries: RegionIndexCountry[] = [
  {
    id: "iran",
    iso3: "IRN",
    nameFa: "ایران",
    nameEn: "Iran",
    fhScore: 10,
    fhStatus: "not-free",
    wgiStability: -1.58,
    wgiRegulatoryQuality: -1.51,
    noteFa:
      "حقوق سیاسی پایین است؛ ثبات و فضای سرمایه‌گذاری نیز ضعیف‌اند — تنش خارجی و تحریم هر دو را تشدید می‌کنند.",
  },
  {
    id: "iraq",
    iso3: "IRQ",
    nameFa: "عراق",
    nameEn: "Iraq",
    fhScore: 31,
    fhStatus: "not-free",
    wgiStability: -2.06,
    wgiRegulatoryQuality: -1.03,
    noteFa:
      "رقابت انتخاباتی از بسیاری همسایگان خلیج بیشتر است، اما خشونت و شبه‌نظامیان ثبات را بسیار پایین نگه می‌دارند.",
  },
  {
    id: "turkey",
    iso3: "TUR",
    nameFa: "ترکیه",
    nameEn: "Turkey",
    fhScore: 32,
    fhStatus: "not-free",
    wgiStability: -0.97,
    wgiRegulatoryQuality: -0.21,
    noteFa:
      "آزادی سیاسی در میانهٔ پایین این نقشه است؛ ثبات و تنظیم‌گری نزدیک به میانهٔ منطقه می‌مانند.",
  },
  {
    id: "afghanistan",
    iso3: "AFG",
    nameFa: "افغانستان",
    nameEn: "Afghanistan",
    fhScore: 8,
    fhStatus: "not-free",
    wgiStability: -2.21,
    wgiRegulatoryQuality: -1.54,
    noteFa:
      "پایین‌ترین ثبات سیاسی این نقشه؛ حقوق سیاسی و فضای سرمایه‌گذاری نیز در قعر قرار دارند.",
  },
  {
    id: "pakistan",
    iso3: "PAK",
    nameFa: "پاکستان",
    nameEn: "Pakistan",
    fhScore: 32,
    fhStatus: "partly-free",
    wgiStability: -2.06,
    wgiRegulatoryQuality: -0.79,
    noteFa:
      "آزادی سیاسی نسبتاً بالاتر از بسیاری همسایگان است، اما ثبات به‌خاطر خشونت داخلی بسیار ضعیف می‌ماند.",
  },
  {
    id: "armenia",
    iso3: "ARM",
    nameFa: "ارمنستان",
    nameEn: "Armenia",
    fhScore: 54,
    fhStatus: "partly-free",
    wgiStability: -0.72,
    wgiRegulatoryQuality: 0.14,
    noteFa:
      "تنها کشور «نسبتاً آزاد» این نقشه؛ ثبات سیاسی‌اش از پادشاهی‌های خلیج ضعیف‌تر است.",
  },
  {
    id: "azerbaijan",
    iso3: "AZE",
    nameFa: "جمهوری آذربایجان",
    nameEn: "Azerbaijan",
    fhScore: 6,
    fhStatus: "not-free",
    wgiStability: -0.14,
    wgiRegulatoryQuality: 0.13,
    noteFa:
      "حقوق سیاسی از پایین‌ترین‌هاست؛ ثبات و تنظیم‌گری نزدیک به میانهٔ منطقه می‌مانند.",
  },
  {
    id: "turkmenistan",
    iso3: "TKM",
    nameFa: "ترکمنستان",
    nameEn: "Turkmenistan",
    fhScore: 1,
    fhStatus: "not-free",
    wgiStability: 0.25,
    wgiRegulatoryQuality: -1.69,
    noteFa:
      "کمترین نمرهٔ آزادی سیاسی؛ ثبات نسبی اقتدارگرایانه، فضای سرمایه‌گذاری بسیار ضعیف.",
  },
  {
    id: "kuwait",
    iso3: "KWT",
    nameFa: "کویت",
    nameEn: "Kuwait",
    fhScore: 30,
    fhStatus: "not-free",
    wgiStability: 0.29,
    wgiRegulatoryQuality: 0.4,
    noteFa:
      "آزادی سیاسی بالاتر از دیگر کشورهای شورای همکاری؛ ثبات و سرمایه‌گذاری در میانهٔ خلیج.",
  },
  {
    id: "saudi-arabia",
    iso3: "SAU",
    nameFa: "عربستان سعودی",
    nameEn: "Saudi Arabia",
    fhScore: 9,
    fhStatus: "not-free",
    wgiStability: -0.05,
    wgiRegulatoryQuality: 0.71,
    noteFa:
      "حقوق سیاسی بسیار پایین؛ ثبات نزدیک به میانگین جهانی و کیفیت تنظیم‌گری نسبتاً قوی.",
  },
  {
    id: "bahrain",
    iso3: "BHR",
    nameFa: "بحرین",
    nameEn: "Bahrain",
    fhScore: 12,
    fhStatus: "not-free",
    wgiStability: -0.28,
    wgiRegulatoryQuality: 0.95,
    noteFa:
      "حقوق سیاسی پایین؛ فضای سرمایه‌گذاری از قوی‌ترین‌های خلیج است و ثبات در میانه.",
  },
  {
    id: "qatar",
    iso3: "QAT",
    nameFa: "قطر",
    nameEn: "Qatar",
    fhScore: 25,
    fhStatus: "not-free",
    wgiStability: 0.95,
    wgiRegulatoryQuality: 0.97,
    noteFa:
      "الگوی خلیج: آزادی سیاسی پایین، بالاترین ثبات این نقشه، و تنظیم‌گری قوی.",
  },
  {
    id: "united-arab-emirates",
    iso3: "ARE",
    nameFa: "امارات متحدهٔ عربی",
    nameEn: "United Arab Emirates",
    mapLabelFa: "امارات",
    fhScore: 18,
    fhStatus: "not-free",
    wgiStability: 0.79,
    wgiRegulatoryQuality: 1.13,
    noteFa:
      "حقوق سیاسی پایین؛ بالاترین کیفیت تنظیم‌گری این نقشه و ثبات بالا.",
  },
  {
    id: "oman",
    iso3: "OMN",
    nameFa: "عمان",
    nameEn: "Oman",
    fhScore: 24,
    fhStatus: "not-free",
    wgiStability: 0.63,
    wgiRegulatoryQuality: 0.69,
    noteFa:
      "آزادی سیاسی پایین؛ ثبات و فضای سرمایه‌گذاری هر دو در ردهٔ بالای خلیج‌اند.",
  },
];

export const regionIndexCountriesById: Record<string, RegionIndexCountry> =
  Object.fromEntries(regionIndexCountries.map((c) => [c.id, c]));

export const regionIndexCountriesByIso3: Record<string, RegionIndexCountry> =
  Object.fromEntries(regionIndexCountries.map((c) => [c.iso3, c]));

export const regionIndexLayers: RegionIndexLayer[] = [
  {
    id: "politicalFreedom",
    labelFa: "آزادی سیاسی",
    labelEn: "Political freedom",
    shortFa: "نمرهٔ آزادی جهانی فریدم‌هاوس، ۲۰۲۶",
    unitFa: "۰ تا ۱۰۰",
  },
  {
    id: "politicalStability",
    labelFa: "ثبات سیاسی",
    labelEn: "Political stability",
    shortFa: "ثبات سیاسی و نبود خشونت/تروریسم، بانک جهانی ۲۰۲۴",
    unitFa: "حدود ۲٫۵− تا ۲٫۵+",
  },
  {
    id: "investmentClimate",
    labelFa: "فضای سرمایه‌گذاری",
    labelEn: "Investment climate",
    shortFa: "کیفیت تنظیم‌گری بانک جهانی، ۲۰۲۴",
    unitFa: "حدود ۲٫۵− تا ۲٫۵+",
  },
];

export const regionIndexLayersById: Record<
  RegionIndexLayerId,
  RegionIndexLayer
> = Object.fromEntries(regionIndexLayers.map((l) => [l.id, l])) as Record<
  RegionIndexLayerId,
  RegionIndexLayer
>;

export const REGION_INDEX_SOURCE_IDS = [
  "freedom-house-country-reports",
  "world-bank-wgi",
  "v-dem-codebook",
] as const;

export const regionMapCopy = {
  eyebrowFa: "سه لایه، نه یک نمره",
  titleFa: "نقشهٔ همسایگان: سه لایه، نه یک نمره",
  titleEn: "Neighborhood map",
  introFa:
    "این نقشه اثر انگشت نهادی سازوکار قدرت نیست. هر رنگ از یک شاخص خارجی می‌آید. لایه را عوض کنید: پادشاهی‌های خلیج معمولاً آزادی سیاسی پایین و ثبات و فضای سرمایه‌گذاری بالا دارند؛ ارمنستان در حقوق سیاسی استثناست؛ افغانستان، عراق و پاکستان بیشتر به‌خاطر خشونت، نه فقط نوع رژیم، در ثبات ضعیف‌اند.",
  layersExplainerFa:
    "آزادی سیاسی نمرهٔ فریدم‌هاوس برای سال تقویمی ۲۰۲۵ است. ثبات سیاسی احتمال بی‌ثباتی خشونت‌آمیز را می‌سنجد. فضای سرمایه‌گذاری همان «کیفیت تنظیم‌گری» بانک جهانی است: توانایی دولت در وضع سیاست‌هایی که بخش خصوصی را ممکن می‌کند — نه حجم سرمایه‌گذاری خارجی و نه رتبهٔ بورس.",
  caveatFa:
    "ناشران و سال‌ها فرق دارند. تحریم و درگیری اندازه‌گیری فضای سرمایه‌گذاری ایران و افغانستان را مخدوش می‌کند. شاخص‌های بانک جهانی ادراک‌محورند و بازهٔ خطا دارند. رنگ تیره‌تر یعنی نمرهٔ بالاتر در همان لایه، نه «کشور بهتر».",
  legendLowFa: "کم",
  legendHighFa: "زیاد",
  tableCaptionFa: "همان سه شاخص، به صورت جدول",
} as const;

export const fhStatusLabelFa: Record<RegionIndexCountry["fhStatus"], string> = {
  free: "آزاد",
  "partly-free": "نسبتاً آزاد",
  "not-free": "غیرآزاد",
};

export function regionIndexValue(
  country: RegionIndexCountry,
  layer: RegionIndexLayerId,
): number {
  if (layer === "politicalFreedom") return country.fhScore;
  if (layer === "politicalStability") return country.wgiStability;
  return country.wgiRegulatoryQuality;
}

/** Map fill only. Display the native score, not this 0–1 value. */
export function regionIndexNormalized(
  country: RegionIndexCountry,
  layer: RegionIndexLayerId,
): number {
  const value = regionIndexValue(country, layer);
  if (layer === "politicalFreedom") return value / 100;
  return (value + 2.5) / 5;
}
