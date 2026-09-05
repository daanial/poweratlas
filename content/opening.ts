export interface OpeningStage {
  id: string;
  labelFa: string;
  labelEn: string;
}

export interface DiagramRelation {
  from: string;
  to: string;
  labelFa: string;
}

export interface DiagramNode {
  id: string;
  labelFa: string;
  labelEn: string;
  explanationFa: string;
  /** Approximate layout in viewBox space (0–100). Desktop uses x/y; mobile stacks by order. */
  x: number;
  y: number;
  role: "people" | "institution" | "law";
}

export const site = {
  titleFa: "سازوکار قدرت",
  titleEn: "The Machinery of Power",
  subtitleFa: "چگونه قدرت ساخته می‌شود، تقسیم می‌شود و محدود می‌شود؟",
  descriptionFa:
    "تجربه‌ای تعاملی برای فهمیدن اینکه قدرت سیاسی چگونه میان مردم و نهادها حرکت می‌کند.",
} as const;

export const openingStages: OpeningStage[] = [
  { id: "people", labelFa: "مردم", labelEn: "People" },
  { id: "choice", labelFa: "انتخاب", labelEn: "Choice" },
  { id: "institution", labelFa: "نهاد", labelEn: "Institution" },
  { id: "law", labelFa: "قانون", labelEn: "Law" },
  { id: "power", labelFa: "قدرت", labelEn: "Power" },
];

export const openingCopy = {
  heroWord: "قدرت",
  heroWordEn: "Power",
  question: "اما قدرت دست کیست؟",
  questionEn: "But who actually holds power?",
  scrollHint: "به پایین بروید",
  skipIntro: "رد شدن از مقدمه",
  diagramIntro: "قدرت در یک نقطه نمی‌ماند؛ میان نهادها جریان پیدا می‌کند.",
  reducedMotionNote:
    "نسخهٔ کم‌حرکت: همان مسیر مفهومی بدون پین و اسکرول‌محوری.",
} as const;

export const diagramNodes: DiagramNode[] = [
  {
    id: "people",
    labelFa: "مردم",
    labelEn: "People",
    explanationFa:
      "منبع مشروعیت و فشار سیاسی. بدون مسیر واقعی برای اثرگذاری، «مردم» روی کاغذ می‌مانند.",
    x: 50,
    y: 12,
    role: "people",
  },
  {
    id: "parliament",
    labelFa: "پارلمان",
    labelEn: "Parliament",
    explanationFa:
      "نهاد قانون‌گذاری که می‌تواند دولت را محدود کند یا، در برخی نظام‌ها، دولت را برکنار کند.",
    x: 22,
    y: 42,
    role: "institution",
  },
  {
    id: "government",
    labelFa: "دولت",
    labelEn: "Government",
    explanationFa:
      "دستگاه اجرایی که تصمیم‌ها را اجرا می‌کند. قدرت اجرایی بدون نظارت سریع متمرکز می‌شود.",
    x: 78,
    y: 42,
    role: "institution",
  },
  {
    id: "court",
    labelFa: "دادگاه",
    labelEn: "Courts",
    explanationFa:
      "می‌تواند اعمال حکومت را با قانون بسنجد. استقلال قضایی یعنی امکان گفتن «نه» به قدرت.",
    x: 28,
    y: 78,
    role: "institution",
  },
  {
    id: "constitution",
    labelFa: "قانون اساسی",
    labelEn: "Constitution",
    explanationFa:
      "چارچوب قواعد. ارزش آن به متن نیست؛ به نهادهایی است که بتوانند آن را اجرا کنند.",
    x: 72,
    y: 78,
    role: "law",
  },
];

export const diagramRelations: DiagramRelation[] = [
  { from: "people", to: "parliament", labelFa: "نمایندگی / رأی" },
  { from: "people", to: "government", labelFa: "انتخاب یا فشار" },
  { from: "parliament", to: "government", labelFa: "محدودسازی / اعتماد" },
  { from: "government", to: "parliament", labelFa: "پیشنهاد قانون / پاسخ‌گویی" },
  { from: "constitution", to: "parliament", labelFa: "حدود اختیارات" },
  { from: "constitution", to: "government", labelFa: "حدود اختیارات" },
  { from: "constitution", to: "court", labelFa: "معیار داوری" },
  { from: "court", to: "government", labelFa: "بازبینی قانونی" },
  { from: "court", to: "parliament", labelFa: "بازبینی قانونی" },
];

/** Highlight map: which edges light up when a node is focused */
export const nodeFocusEdges: Record<string, Array<[string, string]>> = {
  people: [
    ["people", "parliament"],
    ["people", "government"],
  ],
  parliament: [
    ["people", "parliament"],
    ["parliament", "government"],
    ["government", "parliament"],
    ["constitution", "parliament"],
    ["court", "parliament"],
  ],
  government: [
    ["people", "government"],
    ["parliament", "government"],
    ["government", "parliament"],
    ["constitution", "government"],
    ["court", "government"],
  ],
  court: [
    ["constitution", "court"],
    ["court", "government"],
    ["court", "parliament"],
  ],
  constitution: [
    ["constitution", "parliament"],
    ["constitution", "government"],
    ["constitution", "court"],
  ],
};
