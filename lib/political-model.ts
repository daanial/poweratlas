import type { ConstitutionConfig } from "@/content/builder";
import { countries } from "@/content/countries";
import { historicalCountries } from "@/content/countries-historical";
import type { FingerprintAxisId } from "@/content/types";
import { clamp } from "@/lib/visualization-utils";

export type { ConstitutionConfig };

export type Fingerprint = Record<FingerprintAxisId, number>;

function legislatureStrength(legislature: string): number {
  if (legislature.includes("strong")) return 0.85;
  if (legislature.includes("balanced")) return 0.55;
  return 0.28;
}

function electionCompetition(elections: string): number {
  switch (elections) {
    case "proportional":
      return 0.88;
    case "mixed":
      return 0.8;
    case "fptp":
      return 0.72;
    case "limited":
      return 0.35;
    case "none":
      return 0.08;
    default:
      return 0.5;
  }
}

function judiciaryScore(judiciary: string): number {
  switch (judiciary) {
    case "independent":
      return 0.88;
    case "partial":
      return 0.5;
    case "dependent":
      return 0.18;
    default:
      return 0.4;
  }
}

function constitutionScore(constitution: string): number {
  switch (constitution) {
    case "entrenched":
      return 0.85;
    case "moderate":
      return 0.6;
    case "flexible":
      return 0.3;
    default:
      return 0.5;
  }
}

function territoryScore(territory: string): number {
  switch (territory) {
    case "decentralized":
      return 0.9;
    case "federal":
      return 0.75;
    case "unitary":
      return 0.3;
    default:
      return 0.4;
  }
}

function mediaScore(media: string): number {
  switch (media) {
    case "independent":
      return 0.85;
    case "restricted":
      return 0.4;
    case "state":
      return 0.12;
    default:
      return 0.4;
  }
}

function emergencyConcentrationBoost(emergency: string): number {
  switch (emergency) {
    case "strong":
      return 0.22;
    case "moderate":
      return 0.1;
    case "weak":
      return 0;
    default:
      return 0.08;
  }
}

/** Map builder choices to a multidimensional 0–1 fingerprint (not a democracy score). */
export function computeFingerprint(config: ConstitutionConfig): Fingerprint {
  const leg = legislatureStrength(config.legislature);
  const elect = electionCompetition(config.elections);
  const jud = judiciaryScore(config.judiciary);
  const constn = constitutionScore(config.constitution);
  const terr = territoryScore(config.territory);
  const med = mediaScore(config.media);
  const emergBoost = emergencyConcentrationBoost(config.emergency);

  const fusedExecutive =
    config.headOfGovernment === "president" ||
    (config.headOfState === "president" &&
      config.headOfGovernment === "president");
  const parliamentary =
    config.headOfGovernment === "primeMinister" &&
    config.selection === "parliamentary";
  const hereditary = config.selection === "hereditary";
  const councilExec = config.headOfGovernment === "council";

  let executiveConcentration = 0.45;
  if (fusedExecutive) executiveConcentration = 0.72;
  if (parliamentary) executiveConcentration = 0.42;
  if (councilExec) executiveConcentration = 0.28;
  if (hereditary && config.headOfState === "monarch") {
    executiveConcentration = Math.max(executiveConcentration, 0.55);
  }
  executiveConcentration = clamp(
    executiveConcentration + emergBoost - leg * 0.25,
    0,
    1,
  );

  const partyCompetition =
    config.elections === "none"
      ? 0.08
      : config.elections === "limited"
        ? 0.32
        : elect * 0.9;

  const leadershipTurnover = clamp(
    elect * 0.55 +
      (parliamentary ? 0.25 : 0.1) +
      (hereditary ? -0.2 : 0.1) -
      emergBoost * 0.4,
    0,
    1,
  );

  const civilianControl = clamp(
    0.55 + jud * 0.2 + leg * 0.15 - emergBoost * 0.35,
    0,
    1,
  );

  const accountability = clamp(
    leg * 0.25 + jud * 0.25 + med * 0.2 + elect * 0.2 + constn * 0.1,
    0,
    1,
  );

  return {
    executiveConcentration,
    legislativeStrength: leg,
    judicialIndependence: jud,
    electoralCompetition: elect,
    decentralization: terr,
    constitutionalConstraints: constn,
    mediaIndependence: med,
    leadershipTurnover,
    partyCompetition,
    civilianControl,
    accountability,
  };
}

export function classifySystem(config: ConstitutionConfig): {
  titleFa: string;
  titleEn: string;
} {
  const partsFa: string[] = [];
  const partsEn: string[] = [];

  if (config.headOfState === "monarch") {
    partsFa.push("پادشاهی");
    partsEn.push("Monarchical");
  } else if (config.headOfState === "council") {
    partsFa.push("شورایی");
    partsEn.push("Council-based");
  } else {
    partsFa.push("جمهوری");
    partsEn.push("Republican");
  }

  const fused =
    config.headOfGovernment === "president" &&
    (config.headOfState === "president" || config.headOfState === "none");
  const parliamentary =
    config.headOfGovernment === "primeMinister" &&
    (config.selection === "parliamentary" || config.headOfState === "monarch");
  const semi =
    config.headOfState === "president" &&
    config.headOfGovernment === "primeMinister" &&
    (config.selection === "direct" || config.selection === "indirect");

  if (fused) {
    partsFa.push("ریاستی");
    partsEn.push("presidential");
  } else if (semi) {
    partsFa.push("نیمه‌ریاستی");
    partsEn.push("semi-presidential");
  } else if (parliamentary || config.headOfGovernment === "primeMinister") {
    partsFa.push("پارلمانی");
    partsEn.push("parliamentary");
  } else if (config.headOfGovernment === "council") {
    partsFa.push("اجماعی");
    partsEn.push("collegial");
  }

  if (config.territory === "federal") {
    partsFa.push("فدرال");
    partsEn.push("federal");
  } else if (config.territory === "decentralized") {
    partsFa.push("تمرکززدایی‌شده");
    partsEn.push("decentralized");
  }

  return {
    titleFa: partsFa.join(" "),
    titleEn: partsEn.join(" "),
  };
}

export function computeTradeoffs(config: ConstitutionConfig): {
  strengthsFa: string[];
  vulnerabilitiesFa: string[];
  openQuestionsFa: string[];
} {
  const fp = computeFingerprint(config);
  const strengthsFa: string[] = [];
  const vulnerabilitiesFa: string[] = [];
  const openQuestionsFa: string[] = [];

  if (fp.executiveConcentration >= 0.6) {
    strengthsFa.push("تصمیم‌گیری در قوهٔ اجرایی سریع‌تر و یکدست‌تر پیش می‌رود.");
    vulnerabilitiesFa.push(
      "وقتی اختیار در یک نقطه متمرکز است، هر اشتباه یا سوءاستفاده در رأس، هزینهٔ سنگین‌تری دارد.",
    );
  } else {
    strengthsFa.push("قدرت اجرایی میان چند نهاد پخش شده و بن‌بست، نتیجهٔ طراحی است نه یک اتفاق.");
    vulnerabilitiesFa.push(
      "هماهنگی میان نهادها کند می‌شود و معلوم نیست مسئولیت هر تصمیم با کیست.",
    );
  }

  if (fp.legislativeStrength >= 0.55) {
    strengthsFa.push("مجلس ابزار واقعی برای مهار یا برکناری دولت در اختیار دارد.");
  } else {
    strengthsFa.push(
      "دولت می‌تواند سیاست‌هایش را بدون چانه‌زنی دائمی پیش ببرد.",
    );
  }

  if (fp.judicialIndependence < 0.6) {
    vulnerabilitiesFa.push(
      "دستگاه قضایی ضعیف، بازبینی حقوقی تصمیم‌های حکومت را بی‌اثر می‌کند.",
    );
  }

  if (fp.electoralCompetition < 0.4) {
    vulnerabilitiesFa.push(
      "وقتی رقابت انتخاباتی محدود است، جابه‌جایی قدرت از پیش معلوم و مسیر آن بسته می‌شود.",
    );
  }

  if (config.emergency === "strong") {
    vulnerabilitiesFa.push(
      "اختیارات اضطراری گسترده می‌تواند نظارت‌های همیشگی را موقتاً کنار بگذارد.",
    );
  }

  if (fp.decentralization >= 0.7) {
    strengthsFa.push("واحدهای محلی یا ایالتی حوزهٔ سیاست‌گذاری مستقل خود را دارند.");
  }

  while (strengthsFa.length < 3) {
    if (fp.mediaIndependence >= 0.6 && !strengthsFa.some((s) => s.includes("رسانه"))) {
      strengthsFa.push("رسانهٔ مستقل، یک کانال نظارت غیررسمی را باز نگه می‌دارد.");
    } else if (
      fp.constitutionalConstraints >= 0.55 &&
      !strengthsFa.some((s) => s.includes("قواعد"))
    ) {
      strengthsFa.push("تغییر قواعد بازی بدون اکثریت ویژه دشوار است.");
    } else {
      strengthsFa.push("در شرایط عادی، این طراحی مسیر تصمیم‌گیری روشنی دارد.");
    }
  }

  while (vulnerabilitiesFa.length < 3) {
    if (
      fp.accountability < 0.5 &&
      !vulnerabilitiesFa.some((s) => s.includes("پاسخ‌گویی"))
    ) {
      vulnerabilitiesFa.push(
        "برای تصمیم‌های بزرگ، مسیر روشنی برای پاسخ‌گویی به مردم وجود ندارد.",
      );
    } else if (
      config.media !== "independent" &&
      !vulnerabilitiesFa.some((s) => s.includes("رسانه"))
    ) {
      vulnerabilitiesFa.push(
        "وقتی رسانه کنترل یا محدود می‌شود، پنهان‌کاری برای حکومت ارزان تمام می‌شود.",
      );
    } else if (!vulnerabilitiesFa.some((s) => s.includes("بحران"))) {
      vulnerabilitiesFa.push(
        "در بحران، کشمکش میان سرعت تصمیم‌گیری و نظارت نهادی بالا می‌گیرد.",
      );
    } else {
      vulnerabilitiesFa.push(
        "اگر نظارت‌ها فقط روی کاغذ باشند، قدرت در عمل سریع‌تر متمرکز می‌شود.",
      );
    }
  }

  openQuestionsFa.push(
    "در عمل کدام نهاد می‌تواند به قوهٔ اجرایی «نه» بگوید و آن «نه» را به کرسی بنشاند؟",
  );
  openQuestionsFa.push(
    "آیا اختیارات اضطراری مهلت و بازبینی واقعی دارند، یا فقط روی کاغذ؟",
  );
  openQuestionsFa.push(
    "جابه‌جایی قدرت به رقابت نهادی بستگی دارد یا به ارادهٔ کسی که در قدرت است؟",
  );

  return {
    strengthsFa: strengthsFa.slice(0, 3),
    vulnerabilitiesFa: vulnerabilitiesFa.slice(0, 3),
    openQuestionsFa: openQuestionsFa.slice(0, 3),
  };
}

/**
 * Node size multipliers for a gravity / concentration visualization.
 * Higher concentration enlarges executive-adjacent nodes and shrinks checks.
 */
export function computeConcentrationWeights(
  concentration: number,
): Record<string, number> {
  const c = clamp(concentration, 0, 1);
  const exec = 0.7 + c * 0.9;
  const check = 1.15 - c * 0.55;
  const people = 1.05 - c * 0.25;

  return {
    people,
    elections: check,
    parliament: check,
    government: exec,
    president: exec,
    primeMinister: 0.85 + c * 0.45,
    monarch: 0.8 + c * 0.4,
    courts: check,
    constitution: 1.0 - c * 0.2,
    parties: 0.95 - c * 0.15,
    media: check,
    military: 0.9 + c * 0.35,
    independentBodies: check,
    civilSociety: people,
  };
}

export interface NearestCountryMatch {
  id: string;
  nameFa: string;
  nameEn: string;
  /** 0–1; 1 means an identical fingerprint. */
  similarity: number;
  /** Set for a historical time-slice (e.g. Weimar Germany) rather than a current-day country. */
  eraLabelFa?: string;
}

const FINGERPRINT_AXIS_COUNT = 11;
// Max possible Euclidean distance across 11 axes each bounded to [0, 1].
const MAX_FINGERPRINT_DISTANCE = Math.sqrt(FINGERPRINT_AXIS_COUNT);

function fingerprintDistance(a: Fingerprint, b: Fingerprint): number {
  const axes = Object.keys(a) as FingerprintAxisId[];
  const sumSquares = axes.reduce((sum, axis) => {
    const diff = a[axis] - b[axis];
    return sum + diff * diff;
  }, 0);
  return Math.sqrt(sumSquares);
}

/**
 * Nearest real-world (or historical) countries to a builder fingerprint, by
 * Euclidean distance across all 11 axes. Purely descriptive — closeness in
 * institutional shape, not an endorsement or a moral ranking.
 */
export function findNearestCountries(
  fingerprint: Fingerprint,
  count = 3,
): NearestCountryMatch[] {
  const candidates = [
    ...countries.map((c) => ({
      id: c.id,
      nameFa: c.nameFa,
      nameEn: c.nameEn,
      fingerprint: c.fingerprint,
      eraLabelFa: undefined as string | undefined,
    })),
    ...historicalCountries.map((c) => ({
      id: c.id,
      nameFa: c.nameFa,
      nameEn: c.nameEn,
      fingerprint: c.fingerprint,
      eraLabelFa: c.eraLabelFa as string | undefined,
    })),
  ];

  return candidates
    .map((c) => ({
      id: c.id,
      nameFa: c.nameFa,
      nameEn: c.nameEn,
      eraLabelFa: c.eraLabelFa,
      similarity: clamp(
        1 - fingerprintDistance(fingerprint, c.fingerprint) / MAX_FINGERPRINT_DISTANCE,
        0,
        1,
      ),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, count);
}
