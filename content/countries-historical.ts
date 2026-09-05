import type { FingerprintAxisId, HistoricalCountrySystem } from "./types";

type Fingerprint = Record<FingerprintAxisId, number>;

function fp(partial: Fingerprint): Fingerprint {
  return partial;
}

/** Historical time-slices paired with current-day countries via parentCountryId. */
export const historicalCountries: HistoricalCountrySystem[] = [
  {
    id: "germany-weimar",
    parentCountryId: "germany",
    nameFa: "آلمان",
    nameEn: "Germany",
    eraLabelFa: "جمهوری وایمار",
    eraLabelEn: "Weimar Republic",
    yearRangeFa: "۱۹۱۹–۱۹۳۳",
    keyEventFa:
      "اصل ۴۸ قانون اساسی وایمار به رئیس‌جمهور اجازهٔ حکمرانی با فرمان اضطراری می‌داد؛ در سال‌های پایانی جمهوری این ابزار از «اقدام استثنائی» به روش عادی حکمرانی تبدیل شد و راه را برای تصرف کامل قدرت باز کرد — در حالی که انتخابات رقابتی و تناسبی همچنان برگزار می‌شد.",
    headOfState: "رئیس‌جمهور",
    headOfGovernment: "صدراعظم",
    executiveType: "نیمه‌ریاستی با اختیارات اضطراری گسترده برای رئیس‌جمهور",
    legislature: "تک‌مجلسی (رایشستاگ)، تناسبی و به‌شدت چندحزبی",
    electoralSystem: "تناسبی",
    territorialStructure: "فدرال",
    judicialIndependence: "رسمی مستقل؛ در عمل با اغماض نسبت به خشونت راست‌گرا",
    politicalCompetition: "بسیار رقابتی تا واپسین ماه‌ها",
    fingerprint: fp({
      executiveConcentration: 0.55,
      legislativeStrength: 0.4,
      judicialIndependence: 0.5,
      electoralCompetition: 0.75,
      decentralization: 0.55,
      constitutionalConstraints: 0.3,
      mediaIndependence: 0.55,
      leadershipTurnover: 0.35,
      partyCompetition: 0.7,
      civilianControl: 0.45,
      accountability: 0.35,
    }),
    sourceIds: ["german-gg"],
  },
  {
    id: "france-fourth-republic",
    parentCountryId: "france",
    nameFa: "فرانسه",
    nameEn: "France",
    eraLabelFa: "جمهوری چهارم",
    eraLabelEn: "Fourth Republic",
    yearRangeFa: "۱۹۴۶–۱۹۵۸",
    keyEventFa:
      "قوهٔ مجریه چنان ضعیف بود که در ۱۲ سال ۲۴ دولت روی کار آمد و سقوط کرد؛ بحران استقلال الجزایر و شورش نظامیان در ۱۹۵۸ نهایتاً حکومت را ساقط کرد و راه بازگشت دوگل و نگارش قانون اساسی جدید (جمهوری پنجم، نیمه‌ریاستی) را باز کرد.",
    headOfState: "رئیس‌جمهور (عمدتاً تشریفاتی)",
    headOfGovernment: "رئیس‌الوزرا",
    executiveType: "پارلمانی؛ دولت‌ها به‌شدت ناپایدار",
    legislature: "مجلس ملی قدرتمند اما به‌شدت چندپاره",
    electoralSystem: "تناسبی",
    territorialStructure: "واحد",
    judicialIndependence: "متوسط",
    politicalCompetition: "رقابتی و چندحزبی",
    fingerprint: fp({
      executiveConcentration: 0.25,
      legislativeStrength: 0.68,
      judicialIndependence: 0.55,
      electoralCompetition: 0.78,
      decentralization: 0.35,
      constitutionalConstraints: 0.5,
      mediaIndependence: 0.65,
      leadershipTurnover: 0.92,
      partyCompetition: 0.75,
      civilianControl: 0.55,
      accountability: 0.5,
    }),
    sourceIds: ["shugart-carey-presidents"],
  },
  {
    id: "turkey-pre-2017",
    parentCountryId: "turkey",
    nameFa: "ترکیه",
    nameEn: "Turkey",
    eraLabelFa: "پیش از اصلاح قانون اساسی",
    eraLabelEn: "Pre-2017 (parliamentary system)",
    yearRangeFa: "پیش از ۲۰۱۷",
    keyEventFa:
      "رفراندوم آوریل ۲۰۱۷ با اکثریتی باریک (۵۱.۴٪) نظام را از پارلمانی به ریاستی تغییر داد: پست نخست‌وزیری حذف شد، حق طرح استیضاح از مجلس گرفته شد و رئیس‌جمهور اختیار انتصاب مستقیم کابینه و وابستگی حزبی یافت.",
    headOfState: "رئیس‌جمهور (عمدتاً تشریفاتی پیش از ۲۰۱۴)",
    headOfGovernment: "نخست‌وزیر",
    executiveType: "پارلمانی",
    legislature: "تک‌مجلسی؛ اختیار استیضاح دولت داشت",
    electoralSystem: "تناسبی با آستانه",
    territorialStructure: "واحد",
    judicialIndependence: "متوسط",
    politicalCompetition: "رقابتی",
    fingerprint: fp({
      executiveConcentration: 0.55,
      legislativeStrength: 0.55,
      judicialIndependence: 0.55,
      electoralCompetition: 0.72,
      decentralization: 0.3,
      constitutionalConstraints: 0.5,
      mediaIndependence: 0.45,
      leadershipTurnover: 0.5,
      partyCompetition: 0.65,
      civilianControl: 0.6,
      accountability: 0.5,
    }),
    sourceIds: ["v-dem-codebook"],
  },
  {
    id: "south-korea-military-era",
    parentCountryId: "south-korea",
    nameFa: "کره جنوبی",
    nameEn: "South Korea",
    eraLabelFa: "دورهٔ حکومت نظامی",
    eraLabelEn: "Military-backed rule",
    yearRangeFa: "۱۹۶۱–۱۹۸۷",
    keyEventFa:
      "پس از کودتای ۱۹۶۱، قانون اساسی یوشین (۱۹۷۲) انتخاب مستقیم رئیس‌جمهور را لغو کرد و محدودیت دورهٔ ریاست را برداشت. حکومت نظامی تا خیزش دموکراتیک ژوئن ۱۹۸۷ و بازگرداندن انتخابات مستقیم ادامه یافت.",
    headOfState: "رئیس‌جمهور (با پیشینهٔ کودتای نظامی)",
    headOfGovernment: "رئیس‌جمهور",
    executiveType: "ریاستی با پشتوانهٔ مستقیم نظامی",
    legislature: "ضعیف و عمدتاً تأییدکننده",
    electoralSystem: "انتخابات مدیریت‌شده",
    territorialStructure: "واحد",
    judicialIndependence: "محدود",
    politicalCompetition: "به‌شدت محدود؛ انتخابات مدیریت‌شده",
    fingerprint: fp({
      executiveConcentration: 0.85,
      legislativeStrength: 0.2,
      judicialIndependence: 0.25,
      electoralCompetition: 0.25,
      decentralization: 0.2,
      constitutionalConstraints: 0.2,
      mediaIndependence: 0.2,
      leadershipTurnover: 0.15,
      partyCompetition: 0.3,
      civilianControl: 0.1,
      accountability: 0.2,
    }),
    sourceIds: ["v-dem-codebook"],
  },
];

export const historicalByParentId: Record<string, HistoricalCountrySystem[]> =
  historicalCountries.reduce(
    (acc, era) => {
      const list = acc[era.parentCountryId] ?? [];
      list.push(era);
      acc[era.parentCountryId] = list;
      return acc;
    },
    {} as Record<string, HistoricalCountrySystem[]>,
  );
