import type { ConstitutionConfig } from "@/content/builder";
import { crisesById } from "@/content/crises";

export interface CrisisResolution {
  consequenceFa: string;
  lessonFa: string;
}

function legislatureStrong(config: ConstitutionConfig): boolean {
  return config.legislature.includes("strong");
}

function legislatureWeak(config: ConstitutionConfig): boolean {
  return config.legislature.includes("weak");
}

function judiciaryStrong(config: ConstitutionConfig): boolean {
  return config.judiciary === "independent";
}

function judiciaryWeak(config: ConstitutionConfig): boolean {
  return config.judiciary === "dependent";
}

function emergencyStrong(config: ConstitutionConfig): boolean {
  return config.emergency === "strong";
}

function tailor(
  base: string,
  config: ConstitutionConfig,
  crisisId: string,
): string {
  const notes: string[] = [];

  if (crisisId === "pm-loses-parliament") {
    if (legislatureStrong(config)) {
      notes.push(
        "در طراحی شما مجلس ابزار قدرتمندی در اختیار دارد؛ بنابراین رأی عدم اعتماد یا تشکیل دولت تازه محتمل‌تر است.",
      );
    } else if (legislatureWeak(config)) {
      notes.push(
        "با مجلس ضعیف، فشار پارلمانی بیشتر نمادین می‌ماند، مگر آنکه بازیگران بیرونی برای دولت هزینه بسازند.",
      );
    }
  }

  if (crisisId === "president-rejects-election") {
    if (judiciaryStrong(config)) {
      notes.push(
        "در طراحی شما دستگاه قضایی مستقل است و همین احتمال یک داوری معتبر را بالا می‌برد — به شرطی که حکم دادگاه واقعاً اجرا شود.",
      );
    } else if (judiciaryWeak(config)) {
      notes.push(
        "دستگاه قضایی وابسته بعید است بتواند انتقال قدرت را در برابر مقام مستقر تضمین کند.",
      );
    }
    if (emergencyStrong(config)) {
      notes.push(
        "اختیارات اضطراری گسترده، ماندن در مقام تا زمان «حل مسئله» را آسان می‌کند.",
      );
    }
  }

  if (crisisId === "emergency-powers") {
    if (emergencyStrong(config)) {
      notes.push(
        "اختیارات اضطراری گسترده در طراحی شما، مهلت‌گذاری و بازبینی دوره‌ای را شکننده می‌کند.",
      );
    } else if (config.emergency === "weak") {
      notes.push(
        "اختیارات اضطراری محدود، گسترش قدرت دولت را به اجازهٔ صریح نهادهای دیگر وابسته می‌کند.",
      );
    }
    if (judiciaryStrong(config) && legislatureStrong(config)) {
      notes.push(
        "ترکیب دستگاه قضایی مستقل و مجلس قوی، دو لایهٔ بازدارنده در برابر گسترش وضعیت اضطراری می‌سازد.",
      );
    }
  }

  if (crisisId === "contested-referendum") {
    if (judiciaryStrong(config)) {
      notes.push(
        "در طراحی شما دستگاه قضایی مستقل است و همین احتمال یک بازرسی معتبر از نتایج را بالا می‌برد.",
      );
    } else if (judiciaryWeak(config)) {
      notes.push(
        "دستگاه قضایی وابسته بعید است نتیجهٔ همه‌پرسی را برخلاف خواست دولت اعلام کند.",
      );
    }
    if (config.media === "independent") {
      notes.push(
        "رسانهٔ مستقل، هزینهٔ طرح پرسش گمراه‌کننده و دسترسی نابرابر به تبلیغات را بالا می‌برد.",
      );
    }
  }

  if (crisisId === "secession-crisis") {
    if (config.territory === "federal" || config.territory === "decentralized") {
      notes.push(
        "ساختار فدرال یا تمرکززدایی‌شده در طراحی شما، مذاکره بر سر خودمختاری را واقعی‌تر می‌کند.",
      );
    } else if (config.territory === "unitary") {
      notes.push(
        "ساختار بسیط، مذاکره را شکننده و سرکوب از سوی مرکز را از نظر حقوقی آسان‌تر می‌کند.",
      );
    }
    if (judiciaryStrong(config)) {
      notes.push(
        "دادگاه قانون اساسیِ مستقل می‌تواند مسیر قانونی همه‌پرسی‌های آینده را مشخص کند.",
      );
    }
  }

  if (crisisId === "leader-prosecution") {
    if (judiciaryStrong(config)) {
      notes.push(
        "دستگاه قضایی مستقل در طراحی شما، ادامهٔ دادرسی را معتبرتر و گسترش مصونیت را پرهزینه‌تر می‌کند.",
      );
    } else if (judiciaryWeak(config)) {
      notes.push(
        "دستگاه قضایی وابسته یا پرونده را می‌بندد یا آن را به ابزار تسویه‌حساب سیاسی تبدیل می‌کند.",
      );
    }
    if (legislatureStrong(config)) {
      notes.push(
        "مجلس قوی هم می‌تواند مصونیت را تصویب کند و هم هزینهٔ سیاسی حمایت از رهبر را بالا ببرد.",
      );
    }
  }

  if (notes.length === 0) return base;
  return `${base} ${notes.join(" ")}`;
}

/** Resolve a crisis choice against the visitor's constitution config. */
export function resolveCrisis(
  config: ConstitutionConfig,
  crisisId: string,
  choiceId: string,
): CrisisResolution {
  const crisis = crisesById[crisisId];
  if (!crisis) {
    return {
      consequenceFa: "این سناریو هنوز در نسخهٔ فعلی تعریف نشده است.",
      lessonFa: "بحران تنها وقتی چیزی به ما می‌آموزد که قواعد نهادی روشن باشند.",
    };
  }

  const choice = crisis.choices.find((c) => c.id === choiceId);
  if (!choice) {
    return {
      consequenceFa: "این گزینه در این سناریو وجود ندارد.",
      lessonFa: crisis.institutionalLessonFa,
    };
  }

  return {
    consequenceFa: tailor(choice.consequenceFa, config, crisisId),
    lessonFa: crisis.institutionalLessonFa,
  };
}
