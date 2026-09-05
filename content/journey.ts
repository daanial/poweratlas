export type SiteLink = {
  href: string;
  labelFa: string;
  labelEn: string;
  descFa: string;
  minutesFa: string | null;
};

/** Ordered guided path. About and Glossary stay off this list as reference. */
export const journeySteps: readonly SiteLink[] = [
  {
    href: "/experience",
    labelFa: "تجربه",
    labelEn: "Experience",
    descFa: "مسیر هدایت‌شده؛ از برچسب نظام تا جریان واقعی قدرت.",
    minutesFa: "۱۰ تا ۳۰ دقیقه",
  },
  {
    href: "/atlas",
    labelFa: "اطلس",
    labelEn: "Atlas",
    descFa: "کاوش آزاد نقشهٔ نهادها و جریان‌های قدرت.",
    minutesFa: "حدود ۵ دقیقه",
  },
  {
    href: "/laboratory",
    labelFa: "آزمایشگاه",
    labelEn: "Laboratory",
    descFa: "قواعد را خودت بچین، اثر انگشت قدرتش را ببین، و در شش بحران آزمایشش کن.",
    minutesFa: "حدود ۱۰ دقیقه",
  },
  {
    href: "/countries",
    labelFa: "مقایسه کشورها",
    labelEn: "Countries",
    descFa: "اثر انگشت نهادی کشورها را کنار هم ببین.",
    minutesFa: "حدود ۵ دقیقه",
  },
] as const;

export const referenceLinks: readonly SiteLink[] = [
  {
    href: "/glossary",
    labelFa: "واژه‌نامه",
    labelEn: "Glossary",
    descFa: "سی اصطلاح برای خواندن نقشهٔ قدرت.",
    minutesFa: "مرجع",
  },
  {
    href: "/about",
    labelFa: "درباره",
    labelEn: "About",
    descFa: "اصل بی‌طرفی و منابع مفهومی.",
    minutesFa: "مرجع",
  },
] as const;

export const homeLink: SiteLink = {
  href: "/",
  labelFa: "خانه",
  labelEn: "Home",
  descFa: "مقدمهٔ تصویری و انتخاب مسیر.",
  minutesFa: null,
};

export const navLinks: readonly SiteLink[] = [
  homeLink,
  ...journeySteps,
  ...referenceLinks,
];

export function journeyStepFor(
  href: string,
): { stepIndex: number; stepTotal: number; labelFa: string } | undefined {
  const index = journeySteps.findIndex(
    (step) => href === step.href || href.startsWith(`${step.href}/`),
  );
  if (index < 0) return undefined;
  const step = journeySteps[index];
  if (!step) return undefined;
  return {
    stepIndex: index + 1,
    stepTotal: journeySteps.length,
    labelFa: step.labelFa,
  };
}

export function continuationFor(href: string): {
  primary: SiteLink;
  secondaryHref: string;
  secondaryLabelFa: string;
} {
  const index = journeySteps.findIndex((step) => step.href === href);
  if (index >= 0 && index < journeySteps.length - 1) {
    const next = journeySteps[index + 1];
    if (next) {
      return {
        primary: next,
        secondaryHref: "/experience",
        secondaryLabelFa: "بازگشت به مسیر",
      };
    }
  }
  if (href === "/countries") {
    const glossary = referenceLinks[0];
    return {
      primary: glossary ?? journeySteps[0]!,
      secondaryHref: "/experience",
      secondaryLabelFa: "بازگشت به مسیر",
    };
  }
  return {
    primary: journeySteps[0]!,
    secondaryHref: "/atlas",
    secondaryLabelFa: "بازگشت به مسیر",
  };
}

export const journeyCopy = {
  skipIntro: "رد شدن از مقدمه",
  continueCta: "ادامه بده",
  startCta: "شروع تجربه",
  atlasCta: "مستقیم وارد اطلس شو",
  overviewTitle: "از کجا شروع کنیم؟",
  overviewLead:
    "چهار مسیر اصلی، به‌ترتیب پیشنهادشده. واژه‌نامه و درباره برای مراجعهٔ بعدی‌اند.",
  referenceTitle: "درباره و واژه‌نامه",
  referenceDesc: "اصل بی‌طرفی، منابع، و سی اصطلاح برای خواندن بقیهٔ سایت.",
  continueHintShort: "مسیر ۱۰ دقیقه‌ای را از همان‌جا ادامه بده.",
  continueHintFull: "مسیر ۳۰ دقیقه‌ای را از همان‌جا ادامه بده.",
} as const;
