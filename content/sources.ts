import type { ContentSource } from "./types";

/** Stub scholarly / primary / dataset labels for eventual citation wiring. */
export const sources: ContentSource[] = [
  {
    id: "linz-stepan-problems",
    titleFa: "مسائل گذار دموکراتیک و تثبیت",
    titleEn: "Problems of Democratic Transition and Consolidation (Linz & Stepan)",
    type: "scholarly",
    noteFa: "چارچوب مقایسهٔ رژیم‌ها و نهادهای محدودکنندهٔ قدرت اجرایی.",
  },
  {
    id: "lijphart-patterns",
    titleFa: "الگوهای دموکراسی",
    titleEn: "Patterns of Democracy (Lijphart)",
    type: "scholarly",
    noteFa: "تمایز نظام‌های اکثریتی و توافقی؛ قدرت قانون‌گذاری و تمرکز اجرایی.",
  },
  {
    id: "shugart-carey-presidents",
    titleFa: "رئیسان‌جمهور و مجالس",
    titleEn: "Presidents and Assemblies (Shugart & Carey)",
    type: "scholarly",
    noteFa: "طبقه‌بندی ریاستی، پارلمانی و نیمه‌ریاستی بر اساس رابطهٔ قوا.",
  },
  {
    id: "elkins-ginsburg-melton",
    titleFa: "پایداری قوانین اساسی",
    titleEn: "The Endurance of National Constitutions (Elkins, Ginsburg & Melton)",
    type: "scholarly",
    noteFa: "تفاوت متن قانون اساسی با سازوکارهای اجرایی شدن آن.",
  },
  {
    id: "v-dem-codebook",
    titleFa: "کدبوک دموکراسی‌های متنوع (V-Dem)",
    titleEn: "V-Dem Codebook",
    type: "dataset",
    noteFa: "شاخص‌های چندبُعدی رقابت انتخاباتی، رسانه و محدودیت اجرایی.",
    url: "https://www.v-dem.net/data/the-v-dem-dataset/",
  },
  {
    id: "polity-iv-manual",
    titleFa: "راهنمای پروژهٔ پالیتی",
    titleEn: "Polity Project User Manual",
    type: "dataset",
    noteFa: "مقیاس‌های تاریخی رقابت سیاسی و محدودیت قدرت اجرایی.",
  },
  {
    id: "us-constitution",
    titleFa: "قانون اساسی ایالات متحده",
    titleEn: "Constitution of the United States",
    type: "primary",
    noteFa: "نمونهٔ متن اولیه برای تفکیک قوا و فدرالیسم.",
    url: "https://www.archives.gov/founding-docs/constitution",
  },
  {
    id: "german-gg",
    titleFa: "قانون اساسی آلمان (Grundgesetz)",
    titleEn: "Basic Law for the Federal Republic of Germany",
    type: "primary",
    noteFa: "نمونهٔ جمهوری پارلمانی فدرال با دادگاه قانون اساسی قوی.",
    url: "https://www.gesetze-im-internet.de/gg/",
  },
  {
    id: "tsebelis-veto-players",
    titleFa: "بازیگران وتو",
    titleEn: "Veto Players: How Political Institutions Work (Tsebelis)",
    type: "scholarly",
    noteFa:
      "چارچوب تحلیل نهادها بر اساس شمار و فاصلهٔ ایدئولوژیک بازیگرانی که می‌توانند مانع تغییر وضع موجود شوند.",
    url: "https://press.princeton.edu/books/paperback/9780691099897/veto-players",
  },
  {
    id: "levitsky-way-competitive-authoritarianism",
    titleFa: "اقتدارگرایی رقابتی",
    titleEn:
      "Competitive Authoritarianism: Hybrid Regimes after the Cold War (Levitsky & Way)",
    type: "scholarly",
    noteFa:
      "چارچوب تمایز نظام‌های ترکیبی که انتخابات رقابتی واقعی برگزار می‌کنند اما اساساً اقتدارگرا می‌مانند.",
    url: "https://www.cambridge.org/core/books/competitive-authoritarianism/",
  },
  {
    id: "bermeo-democratic-backsliding",
    titleFa: "افول دموکراتیک",
    titleEn: "On Democratic Backsliding (Bermeo)",
    type: "scholarly",
    noteFa:
      "مفهوم «تمرکزگرایی اجرایی» به‌عنوان شکل غالب افول دموکراتیک معاصر، در تمایز با کودتای کلاسیک.",
    url: "https://www.journalofdemocracy.org/articles/on-democratic-backsliding/",
  },
  {
    id: "freedom-house-country-reports",
    titleFa: "گزارش‌های سالانهٔ کشوری فریدم‌هاوس",
    titleEn: "Freedom in the World — Country Reports (Freedom House)",
    type: "dataset",
    noteFa:
      "ارزیابی سالانهٔ حقوق سیاسی و آزادی‌های مدنی به تفکیک کشور؛ منبع تکمیلی برای V-Dem.",
    url: "https://freedomhouse.org/countries/freedom-world/scores",
  },
];

export const sourcesById: Record<string, ContentSource> = Object.fromEntries(
  sources.map((s) => [s.id, s]),
);
